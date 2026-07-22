"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "⊞" },
  { href: "/admin/content", label: "Content", icon: "✎" },
  { href: "/admin/work", label: "Work", icon: "◈" },
  { href: "/admin/bookings", label: "Bookings", icon: "◷" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-paper text-ink">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 flex w-56 flex-col border-r border-line bg-paper-2">
        {/* Brand */}
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <Image
            src="/brand/cybrix-mark.png"
            alt="Cybrix"
            width={40}
            height={40}
            className="h-9 w-auto"
          />
          <div>
            <p className="text-sm font-semibold text-ink leading-tight">Cybrix</p>
            <p className="kicker text-muted" style={{ fontSize: "0.6rem" }}>Studio Admin</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-navy text-cream"
                    : "text-ink-soft hover:bg-paper-3 hover:text-ink"
                }`}
              >
                <span className="w-4 text-center font-mono text-xs opacity-70">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-line px-3 py-3 space-y-1">
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
            className="flex w-full items-center gap-3 rounded px-3 py-2 text-sm text-muted hover:bg-paper-3 hover:text-oxblood-bright transition-colors"
          >
            <span className="w-4 text-center font-mono text-xs opacity-70">⏻</span>
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="ml-56 flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center border-b border-line bg-black/80 px-6 backdrop-blur-sm">
          <div className="h-0.5 absolute inset-x-0 top-0 bg-gradient-to-r from-navy via-teal-bright to-navy" />
          <span className="kicker text-muted capitalize">
            {pathname === "/admin"
              ? "Dashboard"
              : pathname.split("/").pop()}
          </span>
        </header>

        {/* Content */}
        <main className="flex-1 px-6 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
