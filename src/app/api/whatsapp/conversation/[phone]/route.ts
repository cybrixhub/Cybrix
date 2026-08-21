// PATCH /api/whatsapp/conversation/[phone] — toggle human_takeover.

import { NextRequest, NextResponse } from "next/server";
import { apiUrl, CYBRIX_API_TOKEN } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ phone: string }> },
) {
  const session = req.cookies.get("admin-session");
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { phone } = await ctx.params;
  let body: { human_takeover?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const r = await fetch(apiUrl(`/conversations/${encodeURIComponent(phone)}`), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CYBRIX_API_TOKEN}`,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(10_000),
  });
  const data = await r.json().catch(() => ({}));
  return NextResponse.json(data, { status: r.status });
}
