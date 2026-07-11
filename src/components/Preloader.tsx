"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { PRELOADER_KEY, willPreload } from "@/lib/preload";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Letterpress intro: the wordmark stamps into a parchment sheet, which then
 * lifts away. Plays once per session; skipped under reduced motion.
 */
export default function Preloader() {
  const [show, setShow] = useState(false);
  const root = useRef<HTMLDivElement | null>(null);

  useIso(() => {
    if (!willPreload()) return;
    setShow(true);
  }, []);

  useIso(() => {
    if (!show) return;
    const node = root.current;
    if (!node) return;

    const finish = () => {
      try {
        window.sessionStorage.setItem(PRELOADER_KEY, "1");
      } catch {
        /* private mode — just let it replay */
      }
      setShow(false);
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finish });
      tl.fromTo(
        '[data-p="mark"]',
        { opacity: 0, scale: 1.08, filter: "blur(6px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.65,
          ease: "power2.out",
        },
      )
        .fromTo(
          '[data-p="kicker"]',
          { opacity: 0, letterSpacing: "0.5em" },
          {
            opacity: 1,
            letterSpacing: "0.22em",
            duration: 0.55,
            ease: "power2.out",
          },
          "-=0.35",
        )
        .to(node, {
          yPercent: -100,
          duration: 0.7,
          ease: "expo.inOut",
          delay: 0.25,
        });
    }, root);

    return () => ctx.revert();
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-paper"
    >
      <div className="bg-grain absolute inset-0 opacity-40" />
      <span
        data-p="mark"
        className="relative font-display text-6xl font-semibold italic tracking-tight text-ink sm:text-7xl"
      >
        Cybrix<span className="not-italic text-teal-bright">.</span>
      </span>
      <span
        data-p="kicker"
        className="kicker relative mt-5 text-muted"
      >
        Social &amp; content studio
      </span>
    </div>
  );
}
