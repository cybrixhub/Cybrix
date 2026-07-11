"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SplitText as SplitTextT } from "gsap/SplitText";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const QUOTE =
  "“Attention is earned, never bought. In a feed full of noise, the startups that win are the ones with a voice worth remembering — we exist to build that voice, and to turn it into pipeline”";

/**
 * Manifesto prologue (the sondaven.com scroll-fill): a giant serif quote whose
 * characters brighten from dim to lit as you scroll through the section.
 */
export default function Prologue() {
  const root = useRef<HTMLElement | null>(null);
  const quoteRef = useRef<HTMLQuoteElement | null>(null);

  useIso(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // text stays fully lit

    gsap.registerPlugin(ScrollTrigger);

    let split: SplitTextT | null = null;
    let cancelled = false;
    const ctx = gsap.context(() => {}, root);

    Promise.all([document.fonts.ready, import("gsap/SplitText")]).then(
      ([, mod]) => {
        if (cancelled || !quoteRef.current) return;
        gsap.registerPlugin(mod.SplitText);
        ctx.add(() => {
        try {
          split = new mod.SplitText(quoteRef.current, { type: "words,chars" });
          gsap.fromTo(
            split.chars,
            { opacity: 0.13 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.4,
              scrollTrigger: {
                trigger: root.current,
                start: "top 72%",
                end: "bottom 60%",
                scrub: true,
              },
            },
          );
          ScrollTrigger.refresh();
        } catch {
          /* leave the quote fully visible */
        }
        });
      },
    );

    return () => {
      cancelled = true;
      split?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      aria-label="Manifesto"
      className="relative overflow-hidden bg-espresso py-28 text-cream sm:py-40"
    >
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div className="container-x relative z-10 text-center">
        <p className="kicker text-teal-bright">
          <span aria-hidden="true">✦✦✦&ensp;</span>Prologue
          <span aria-hidden="true">&ensp;✦✦✦</span>
        </p>
        <blockquote
          ref={quoteRef}
          className="mx-auto mt-10 max-w-4xl font-display text-3xl font-medium uppercase leading-[1.25] tracking-[0.01em] text-balance sm:text-4xl md:text-[2.9rem]"
        >
          {QUOTE}
        </blockquote>
      </div>
    </section>
  );
}
