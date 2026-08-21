// POST /api/apollo/search — admin ICP search. Proxies to backend /apollo/search.
import { NextRequest, NextResponse } from "next/server";
import { apiUrl, CYBRIX_API_TOKEN } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!req.cookies.get("admin-session"))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const r = await fetch(apiUrl("/apollo/search"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CYBRIX_API_TOKEN}`,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(20_000),
  });
  const data = await r.json().catch(() => ({}));
  return NextResponse.json(data, { status: r.status });
}
