"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function getSessionUser(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/(?:^|;\s*)admin-session=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "⊞" },
  { href: "/admin/content", label: "Content", icon: "✎" },
  { href: "/admin/work", label: "Work", icon: "◈" },
  { href: "/admin/bookings", label: "Bookings", icon: "◷" },
  { href: "/admin/leads", label: "Leads", icon: "◎" },
  { href: "/admin/sourcing", label: "Sourcing", icon: "◉" },
  { href: "/admin/campaigns", label: "Campaigns", icon: "◒" },
];

const PAGE_LABELS: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/content": "Content",
  "/admin/work": "Work",
  "/admin/bookings": "Bookings",
  "/admin/leads": "Leads",
  "/admin/sourcing": "Sourcing",
  "/admin/campaigns": "Campaigns",
};

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState("");
  useEffect(() => { setUser(getSessionUser()); }, []);

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-paper text-ink">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 flex w-56 flex-col border-r border-line bg-paper-2">
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <Image src="/brand/cybrix-mark.png" alt="Cybrix" width={40} height={40} className="h-9 w-auto" />
          <div>
            <p className="text-sm font-semibold text-ink leading-tight">Cybrix</p>
            <p className="kicker text-muted" style={{ fontSize: "0.6rem" }}>Studio Admin</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV.map((item) => {
            const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded px-3 py-2 text-sm transition-colors ${
                  active ? "bg-navy text-white" : "text-ink-soft hover:bg-paper-3 hover:text-ink"
                }`}
              >
                <span className="w-4 text-center font-mono text-xs opacity-70">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-line px-3 py-3 space-y-1">
          {user && (
            <div className="flex items-center gap-3 px-3 py-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy text-[0.6rem] font-bold text-white uppercase">
                {user[0]}
              </span>
              <span className="text-sm text-ink-soft truncate">{user}</span>
            </div>
          )}
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded px-3 py-2 text-sm text-ink-soft hover:bg-paper-3 hover:text-ink transition-colors"
          >
            <span className="w-4 text-center font-mono text-xs opacity-70">↗</span>
            View site
          </a>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded px-3 py-2 text-sm text-muted hover:bg-paper-3 hover:text-red-500 transition-colors"
          >
            <span className="w-4 text-center font-mono text-xs opacity-70">⏻</span>
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="ml-56 flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex h-14 items-center border-b border-line bg-black/80 px-6 backdrop-blur-sm">
          <div className="h-0.5 absolute inset-x-0 top-0 bg-gradient-to-r from-navy via-teal-bright to-navy" />
          <span className="kicker text-muted">
            {PAGE_LABELS[pathname] ?? pathname.split("/").pop()}
          </span>
        </header>
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
