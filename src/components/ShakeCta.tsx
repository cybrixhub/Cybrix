"use client";

import { useEffect, useRef } from "react";

/**
 * Wraps any children in a div that fires the shake-cta animation
 * 1 second after the element first enters the viewport — so it works
 * whether the CTA is above or below the fold.
 */
export default function ShakeCta({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const btn = el.querySelector("a, button") as HTMLElement | null;
        if (!btn) return;
        setTimeout(() => {
          btn.style.animation = "none";
          btn.offsetHeight; // force reflow to restart
          btn.style.animation = "shake-cta 0.7s ease-in-out 0s 3";
        }, 1000);
      },
      { threshold: 0.6 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{children}</div>;
}
