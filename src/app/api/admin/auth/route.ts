import { NextRequest, NextResponse } from "next/server";

type User = { username: string; password: string };

function getUsers(): User[] {
  // ADMIN_USERS env var: JSON array of {username, password}
  // e.g. [{"username":"rahman","password":"mypass"},{"username":"team","password":"pass2"}]
  if (process.env.ADMIN_USERS) {
    try {
      return JSON.parse(process.env.ADMIN_USERS) as User[];
    } catch {
      // fall through to legacy single-password
    }
  }
  // Legacy single-password fallback
  return [{ username: "admin", password: process.env.ADMIN_PASSWORD ?? "cybrix2024" }];
}

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const users = getUsers();
  const match = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!match) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true, username: match.username });
  res.cookies.set("admin-session", match.username, {
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
