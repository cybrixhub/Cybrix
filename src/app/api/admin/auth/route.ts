import { NextRequest, NextResponse } from "next/server";

const PASSWORD = process.env.ADMIN_PASSWORD ?? "cybrix2024";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (password !== PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin-session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("admin-session");
  return res;
}
