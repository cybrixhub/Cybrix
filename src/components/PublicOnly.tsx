"use client";

import { usePathname } from "next/navigation";

/** Renders children on public marketing pages only — hides on /admin/*. */
export default function PublicOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
