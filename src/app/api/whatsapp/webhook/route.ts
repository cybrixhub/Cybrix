// Meta Cloud API webhook receiver.
//
//   GET   → verify handshake (Meta calls this once when you register the URL)
//   POST  → message events (Meta calls this every time a visitor sends a message)
//
// Both must live at the exact same URL Meta has on file.
// We keep the receiver on Vercel so it's up whenever the site is up, then
// forward message payloads to the VPS backend where the real logic lives.

import { NextRequest, NextResponse } from "next/server";
import { apiUrl } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN ?? "";

// ─── GET — verification handshake ──────────────────────────────────────────
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const mode = params.get("hub.mode");
  const token = params.get("hub.verify_token");
  const challenge = params.get("hub.challenge");

  if (!VERIFY_TOKEN) {
    console.error("[wa/webhook] WHATSAPP_VERIFY_TOKEN not set");
    return new NextResponse("Not configured", { status: 500 });
  }
  if (mode === "subscribe" && token === VERIFY_TOKEN && challenge) {
    // Meta requires the raw challenge echoed as text/plain.
    return new NextResponse(challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }
  return new NextResponse("Forbidden", { status: 403 });
}

// ─── POST — inbound message events ─────────────────────────────────────────
// Meta payload shape (text messages only — media/reactions/status events skipped):
//   { object, entry: [{ changes: [{ value: {
//       contacts: [{ profile: { name }, wa_id }],
//       messages: [{ from, id, timestamp, type, text: { body } }]
//     }, field }] }] }
type MetaPayload = {
  object?: string;
  entry?: Array<{
    changes?: Array<{
      value?: {
        contacts?: Array<{ profile?: { name?: string }; wa_id?: string }>;
        messages?: Array<{
          from?: string;
          id?: string;
          type?: string;
          text?: { body?: string };
        }>;
      };
    }>;
  }>;
};

export async function POST(req: NextRequest) {
  let payload: MetaPayload;
  try {
    payload = (await req.json()) as MetaPayload;
  } catch {
    // Meta expects a 200 even on our-side parse errors; otherwise it retries.
    return NextResponse.json({ ok: true });
  }

  // Collect all text messages across the (usually single) entry/change nesting.
  const events: Array<{ from: string; id: string; body: string; name?: string }> = [];
  for (const entry of payload.entry ?? []) {
    for (const change of entry.changes ?? []) {
      const value = change.value ?? {};
      const contacts = value.contacts ?? [];
      const nameByWaId = new Map<string, string | undefined>();
      for (const c of contacts) {
        if (c.wa_id) nameByWaId.set(c.wa_id, c.profile?.name);
      }
      for (const m of value.messages ?? []) {
        if (m.type !== "text" || !m.from || !m.id || !m.text?.body) continue;
        events.push({
          from: m.from,
          id: m.id,
          body: m.text.body,
          name: nameByWaId.get(m.from),
        });
      }
    }
  }

  // Fire-and-forget to the backend — never block Meta's 200 on it.
  // If the backend is down we still return 200 to Meta so it doesn't retry-storm us.
  if (events.length > 0) {
    Promise.allSettled(
      events.map((e) =>
        fetch(apiUrl("/whatsapp/incoming"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            from_phone: e.from,
            body: e.body,
            wa_message_id: e.id,
            contact_name: e.name,
          }),
          signal: AbortSignal.timeout(8_000),
        }),
      ),
    ).catch((err) => console.error("[wa/webhook] backend forward failed:", err));
  }

  return NextResponse.json({ ok: true });
}
