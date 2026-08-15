"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SplitText as SplitTextT } from "gsap/SplitText";
import { useIso } from "@/lib/useIso";

export default function SmoothScroll() {
  useIso(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);

    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    let lenis: Lenis | null = null;
    let raf: ((time: number) => void) | null = null;

    if (!isTouch) {
      lenis = new Lenis({
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      lenis.on("scroll", ScrollTrigger.update);
      raf = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

    const splits: SplitTextT[] = [];

    const ctx = gsap.context(() => {
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 90%",
        once: true,
        onEnter: (els) => {
          els.forEach((el) => {
            const delay = parseFloat((el as HTMLElement).dataset.revealDelay || "0");
            gsap.from(el, {
              opacity: 0,
              y: 24,
              duration: 0.75,
              ease: "power3.out",
              delay,
              onStart() { (el as HTMLElement).style.willChange = "transform, opacity"; },
              onComplete() { (el as HTMLElement).style.willChange = "auto"; },
            });
          });
        },
      });

      gsap.utils
        .toArray<SVGPathElement>(".js-flourish path")
        .forEach((path) => {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 0.9,
            ease: "power2.inOut",
            scrollTrigger: { trigger: path, start: "top 85%", once: true },
          });
        });

      // Chapter page-turn — all viewport sizes (panels are always sticky)
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

    let cancelled = false;
    Promise.all([
      document.fonts.ready,
      import("gsap/SplitText"),
    ]).then(([, mod]) => {
      if (cancelled) return;
      gsap.registerPlugin(mod.SplitText);
      ctx.add(() => {
        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          try {
            const split = new mod.SplitText(el, {
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
            // leave visible & unanimated
          }
        });
      });
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
      splits.forEach((s) => s.revert());
      ctx.revert();
      if (raf) gsap.ticker.remove(raf);
      if (lenis) lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
