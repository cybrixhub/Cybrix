"use client";

import { useEffect, useLayoutEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Global smooth-scroll + scroll-animation engine.
 * - Lenis smooth scrolling, driven by GSAP's ticker.
 * - `[data-reveal]`  → fade/rise on scroll (server components just add the attr)
 * - `[data-split]`   → masked line-by-line headline reveals (SplitText)
 * - `.js-flourish`   → hand-drawn underlines draw themselves on scroll
 * - `#services article` → page-turn dim + settle between sticky chapters
 * Fully disabled under prefers-reduced-motion; content stays visible.
 */
export default function SmoothScroll() {
  useIso(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const splits: SplitText[] = [];

    const ctx = gsap.context(() => {
      // --- simple rise reveals -------------------------------------------
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const delay = parseFloat(el.dataset.revealDelay || "0");
        gsap.from(el, {
          opacity: 0,
          y: 28,
          duration: 0.9,
          ease: "power3.out",
          delay,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // --- hand-drawn flourishes -----------------------------------------
      gsap.utils
        .toArray<SVGPathElement>(".js-flourish path")
        .forEach((path) => {
          const length = path.getTotalLength();
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 0.9,
            ease: "power2.inOut",
            scrollTrigger: { trigger: path, start: "top 85%", once: true },
          });
        });

      // --- chapter page-turn (sticky panels in #services) ----------------
      const panels = gsap.utils.toArray<HTMLElement>("#services article");
      panels.forEach((panel, i) => {
        const next = panels[i + 1];
        if (!next) return;
        const shade = panel.querySelector(".js-panel-shade");
        const trigger = {
          trigger: next,
          start: "top bottom",
          end: "top top",
          scrub: true,
        };
        gsap.to(panel, {
          scale: 0.965,
          transformOrigin: "center top",
          ease: "none",
          scrollTrigger: trigger,
        });
        if (shade) {
          gsap.to(shade, { opacity: 0.45, ease: "none", scrollTrigger: trigger });
        }
      });
    });

    // --- masked line reveals (after fonts load, so lines break correctly)
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx.add(() => {
        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          try {
            const split = new SplitText(el, {
              type: "lines",
              mask: "lines",
              linesClass: "split-line",
            });
            splits.push(split);
            gsap.from(split.lines, {
              yPercent: 112,
              duration: 0.85,
              stagger: 0.09,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 86%", once: true },
            });
          } catch {
            // If splitting fails, leave the element visible & unanimated.
          }
        });
        ScrollTrigger.refresh();
      });
    });

    ScrollTrigger.refresh();
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
      splits.forEach((s) => s.revert());
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
