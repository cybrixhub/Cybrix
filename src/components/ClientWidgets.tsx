"use client";

import dynamic from "next/dynamic";

/**
 * Client-only shell for widgets that don't contribute to LCP or SEO.
 * Each is lazy-loaded (ssr: false) so they don't ship in the initial
 * JS payload — they hydrate after the critical route JS is on-screen.
 *
 * - Preloader: opt-in via ?intro=1, so 99% of loads it's dead code
 * - InkCursor: fine-pointer only, purely decorative
 * - FloatingCta: hidden until scroll past hero
 */
const Preloader = dynamic(() => import("./Preloader"), { ssr: false });
const InkCursor = dynamic(() => import("./InkCursor"), { ssr: false });
const FloatingCta = dynamic(() => import("./FloatingCta"), { ssr: false });

export function ClientBeforeMain() {
  return (
    <>
      <Preloader />
      <InkCursor />
    </>
  );
}

export function ClientAfterMain() {
  return <FloatingCta />;
}
