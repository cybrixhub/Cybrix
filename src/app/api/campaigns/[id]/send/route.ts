// POST /api/campaigns/[id]/send — trigger first-touch send. ?dry_run=1 supported.
import { NextRequest, NextResponse } from "next/server";
import { apiUrl, CYBRIX_API_TOKEN } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  if (!req.cookies.get("admin-session"))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const dry = req.nextUrl.searchParams.get("dry_run") === "1";
  const r = await fetch(
    apiUrl(`/campaigns/${encodeURIComponent(id)}/send${dry ? "?dry_run=true" : ""}`),
    {
      method: "POST",
      headers: { Authorization: `Bearer ${CYBRIX_API_TOKEN}` },
      signal: AbortSignal.timeout(10_000),
    },
  );
  const data = await r.json().catch(() => ({}));
  return NextResponse.json(data, { status: r.status });
}
