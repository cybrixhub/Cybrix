"use client";

import dynamic from "next/dynamic";

/**
 * Non-critical widgets — `ssr: false` is intentional here.
 *
 * These three don't contribute to LCP and their JS execution never needs
 * to happen inside the LCP window. Deferring them past hydration keeps
 * mobile TBT low (Lighthouse measured 1.5s TBT when they SSR'd; with
 * ssr:false the chunks parse *after* LCP fires, so they're out of the
 * observation window).
 *
 * Trade-off accepted: slight desktop TBT bump vs. huge mobile win.
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
