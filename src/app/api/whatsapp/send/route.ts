// POST /api/whatsapp/send — admin manual reply. Proxies to backend /whatsapp/send
// with the bearer token attached server-side.
//
// Called from the admin thread page's Reply form (client component).
// Admin auth is enforced by middleware.ts (redirects to /admin/login without a session cookie).

import { NextRequest, NextResponse } from "next/server";
import { apiUrl, CYBRIX_API_TOKEN } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = req.cookies.get("admin-session");
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { to_phone?: string; body?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const to_phone = (body.to_phone ?? "").trim();
  const text = (body.body ?? "").trim();
  if (!to_phone) return NextResponse.json({ error: "to_phone required" }, { status: 400 });
  if (!text) return NextResponse.json({ error: "body required" }, { status: 400 });

  const r = await fetch(apiUrl("/whatsapp/send"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CYBRIX_API_TOKEN}`,
    },
    body: JSON.stringify({ to_phone, body: text }),
    signal: AbortSignal.timeout(15_000),
  });
  const data = await r.json().catch(() => ({}));
  return NextResponse.json(data, { status: r.status });
}
