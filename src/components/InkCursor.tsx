"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  useMediaQuery,
  FINE_POINTER,
  REDUCED_MOTION,
} from "@/lib/useMediaQuery";

/**
 * An ink-dot cursor companion (the native cursor stays). Follows the pointer
 * with a soft lag; over any element with `data-cursor="LABEL"` it grows into
 * an espresso pill showing the mono label (VIEW / PLAY / DRAG / BOOK…).
 * Desktop fine-pointers only; skipped under reduced motion.
 */
export default function InkCursor() {
  const finePointer = useMediaQuery(FINE_POINTER);
  const reducedMotion = useMediaQuery(REDUCED_MOTION);
  const enabled = finePointer && !reducedMotion;
  const [label, setLabel] = useState<string | null>(null);
  const wrap = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const node = wrap.current;
    if (!node) return;

    const xTo = gsap.quickTo(node, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(node, "y", { duration: 0.35, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.(
        "[data-cursor]",
      ) as HTMLElement | null;
      setLabel(target?.dataset.cursor || null);
    };

    // The page scrolls under a stationary pointer; drop the label so it
    // can't go stale over an element that scrolled away.
    const onScroll = () => setLabel(null);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("scroll", onScroll);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[75]"
    >
      <div
        className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300 ${
          label
            ? "h-16 w-16 bg-white/95 text-navy shadow-[0_4px_12px_rgba(20,49,122,0.15)]"
            : "h-2.5 w-2.5 bg-navy"
        }`}
      >
        {label && (
          <span className="font-mono text-[0.55rem] font-medium uppercase tracking-[0.18em]">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
