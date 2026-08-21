// POST /api/lead — thin proxy from the browser to the backend's /leads endpoint.
// Keeps CYBRIX_API_URL server-side (no CORS on the backend to worry about) and lets
// us validate + honeypot + carry UTMs without touching the browser bundle.

import { NextRequest, NextResponse } from "next/server";
import { apiUrl } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  // Honeypot — a real user won't fill this. Bots that spray forms usually will.
  website?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — silent success so bots don't retry.
  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ ok: true, id: 0 }, { status: 201 });
  }

  const name = (body.name ?? "").trim().slice(0, 200);
  const email = (body.email ?? "").trim().slice(0, 200);
  const company = (body.company ?? "").trim().slice(0, 200) || undefined;
  const message = (body.message ?? "").trim().slice(0, 5000) || undefined;

  if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });
  if (!email || !EMAIL_RE.test(email))
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });

  try {
    const upstream = await fetch(apiUrl("/leads"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        company,
        message,
        source: "website",
        utm_source: body.utm_source,
        utm_medium: body.utm_medium,
        utm_campaign: body.utm_campaign,
      }),
      // 10s ceiling — backend + n8n round-trip is usually <1s.
      signal: AbortSignal.timeout(10_000),
    });

    if (!upstream.ok) {
      const text = await upstream.text().catch(() => "");
      console.error(`[lead] backend ${upstream.status}: ${text}`);
      return NextResponse.json(
        { error: "Backend rejected the lead. Please try again in a minute." },
        { status: 502 }
      );
    }

    const created = await upstream.json();
    return NextResponse.json({ ok: true, id: created.id }, { status: 201 });
  } catch (e) {
    console.error("[lead] backend unreachable:", e);
    return NextResponse.json(
      { error: "Couldn't reach the backend. Please try again or email us directly." },
      { status: 503 }
    );
  }
}
