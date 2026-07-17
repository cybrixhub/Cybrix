"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "./Magnetic";
import PlatformLogos from "./PlatformLogos";
import Stamp from "./Stamp";
import ThreadScene from "./ThreadScene";
import WovenWordmark from "./WovenWordmark";
import { FOUNDER, SITE } from "@/lib/site";
import { willPreload, PRELOADER_HERO_DELAY } from "@/lib/preload";
import { useIso } from "@/lib/useIso";

export default function Hero() {
  const root = useRef<HTMLDivElement | null>(null);

  useIso(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: willPreload() ? PRELOADER_HERO_DELAY : 0,
      });
      tl.from(
        '[data-h="kicker"]',
        { opacity: 0, y: 14, duration: 0.55 },
        0.15,
      )
        .from(
          ".hero-line > span",
          { yPercent: 118, duration: 1.0, stagger: 0.12 },
          0.3,
        )
        .from(
          '[data-h="flourish"]',
          { scaleX: 0, transformOrigin: "left center", duration: 0.7 },
          1.1,
        )
        .from('[data-h="sub"]', { opacity: 0, y: 20, duration: 0.7 }, 1.0)
        .from(
          '[data-h="cta"]',
          { opacity: 0, y: 16, duration: 0.55, stagger: 0.08 },
          1.2,
        )
        .from('[data-h="cta-note"]', { opacity: 0, y: 10, duration: 0.5 }, 1.35)
        .from(
          '[data-h="logos"] > span:not(.sr-only)',
          { opacity: 0, y: 14, duration: 0.5, stagger: 0.06 },
          1.45,
        )
        .fromTo(
          '[data-h="bgimg"]',
          { scale: 1.15, opacity: 0 },
          { scale: 1.0, opacity: 1, duration: 2.4, ease: "expo.out" },
          0,
        )
        .from('[data-h="meta"]', { opacity: 0, y: 14, duration: 0.6 }, 1.55)
        .from(
          '[data-h="wordmark"]',
          { opacity: 0, yPercent: 60, duration: 1.1, ease: "power2.out" },
          1.65,
        )
        .from('[data-h="stamp"]', { opacity: 0, duration: 0.8 }, 1.8);

      // Exit: the hero mats into the black surround; the plate photo pulls
      // back inside its frame.
      const scrub = {
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };
      gsap.to('[data-h="frame"]', {
        scale: 0.93,
        borderRadius: 24,
        ease: "none",
        scrollTrigger: scrub,
      });
      // No image scale on scroll — the frame's 0.93 mat does the exit motion.
      gsap.to('[data-h="content"]', {
        yPercent: 8,
        ease: "none",
        scrollTrigger: scrub,
      });
      gsap.to('[data-h="veil"]', {
        opacity: 0.5,
        ease: "none",
        scrollTrigger: scrub,
      });

      // Ambient: the softbox glow breathes across the dark stage.
      gsap.to('[data-h="glow"]', {
        xPercent: -20,
        yPercent: 10,
        opacity: 0.4,
        duration: 9,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="relative bg-[#0f0c08] text-[#f7efe4]"
    >
      {/* Everything lives inside the frame so the scroll-out can mat it */}
      <div
        data-h="frame"
        className="relative overflow-hidden bg-[#14100b] will-change-transform"
      >
        {/* full-bleed backdrop photo — natural framing, no CSS zoom */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <Image
            src="/hero-bg.jpg"
            alt=""
            data-h="bgimg"
            fill
            priority
            sizes="100vw"
            quality={78}
            className="object-cover"
          />
          {/* copy shade — dark only where the text sits, fully transparent on the right so the photo pops */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0c08]/85 via-[#0f0c08]/25 to-transparent" />
          {/* bottom fade into the strip */}
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-[#0f0c08]" />
        </div>
        {/* breathing softbox glow */}
        <div
          data-h="glow"
          aria-hidden="true"
          className="pointer-events-none absolute -top-[24%] left-[58%] h-[70vw] w-[70vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(60,111,224,0.26),rgba(60,111,224,0.06)_45%,transparent_72%)] opacity-30 will-change-transform"
        />
        {/* cool counter-glow — a low teal wash under the pitch so the hero
            carries the logo's cyan, not only the warm studio light */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[12%] -left-[8%] h-[52vw] w-[52vw] rounded-full bg-[radial-gradient(closest-side,rgba(123,229,216,0.16),rgba(123,229,216,0.05)_50%,transparent_72%)] opacity-70"
        />
        {/* the woven landscape */}
        <ThreadScene color="#f2d9c4" alpha={0.14} rise={0.3} />
        {/* scroll-exit veil */}
        <div
          data-h="veil"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 bg-black opacity-0"
        />

        <div
          data-h="content"
          className="relative z-10 flex min-h-svh flex-col pt-24 sm:pt-28"
        >
          {/* Left-aligned pitch over the full-bleed backdrop */}
          <div className="container-x flex flex-1 items-center py-10">
            <div className="max-w-2xl">
              <span data-h="kicker" className="kicker text-[#e8c9b4]">
                Social &amp; content studio — for startups
              </span>

              <h1 className="mt-6 font-display text-[11.5vw] font-medium leading-[1.02] tracking-[-0.015em] sm:text-6xl xl:text-7xl">
                <span className="hero-line line-clip block">
                  <span className="block">Make your startup</span>
                </span>
                <span className="hero-line line-clip block">
                  <span className="block">
                    <em className="relative inline-block pr-1 italic">
                      impossible to ignore
                      <span className="not-italic">.</span>
                      <svg
                        data-h="flourish"
                        aria-hidden="true"
                        viewBox="0 0 320 12"
                        preserveAspectRatio="none"
                        className="absolute -bottom-2 left-0 h-2.5 w-[calc(100%-0.4em)] text-teal-bright sm:-bottom-3"
                      >
                        <path
                          d="M2 9 C 60 3, 140 2, 318 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </em>
                  </span>
                </span>
              </h1>

              <p
                data-h="sub"
                className="mt-7 max-w-lg text-lg leading-relaxed text-[#e5d5c2]/90 text-pretty"
              >
                Cybrix is the social &amp; content studio behind startups that
                punch above their size. We turn attention into pipeline — not
                vanity metrics.
              </p>

              <div
                data-h="cta"
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <Magnetic>
                  <a
                    href={SITE.calendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="book"
                    className="btn-ink btn-press inline-flex items-center justify-center gap-2 bg-navy px-8 py-4 text-sm font-semibold text-cream shadow-[0_14px_28px_-12px_rgba(14,26,58,0.85)] [--ink-fill:var(--color-navy-2)]"
                  >
                    Book a strategy call
                  </a>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <a
                    href="#work"
                    data-cursor="view"
                    className="btn-ink btn-press inline-flex items-center justify-center gap-2 border border-[#f7efe4]/30 bg-[#f7efe4]/5 px-8 py-4 text-sm font-semibold text-[#f7efe4] [--ink-fill:#f7efe4] hover:text-espresso focus-visible:text-espresso"
                  >
                    See the work <span aria-hidden="true">→</span>
                  </a>
                </Magnetic>
              </div>

              <p
                data-h="cta-note"
                className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#e8c9b4]"
              >
                Free 30-minute call · leave with a plan · no pitch
              </p>

              <PlatformLogos
                data-h="logos"
                className="mt-9 flex items-center gap-5 sm:gap-6"
              />
            </div>
          </div>

          {/* Bottom strip — rating, teasers, video card */}
          <div data-h="meta" className="container-x">
            <div className="grid grid-cols-1 items-center gap-4 border-t border-[#f7efe4]/12 py-4 sm:grid-cols-[auto_1fr_auto]">
              {/* rating */}
              <div className="flex items-baseline gap-3">
                <span aria-hidden="true" className="text-sm text-amber">
                  ★★★★★
                </span>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#e8c9b4]">
                  4.9/5 · 120+ founders
                </span>
              </div>

              {/* teaser cards */}
              <div className="hidden items-center justify-center gap-3 md:flex">
                <a
                  href="#services"
                  className="group flex items-center gap-3 rounded-md border border-[#f7efe4]/12 bg-[#f7efe4]/[0.04] px-4 py-2.5 transition-colors hover:border-[#f7efe4]/30 hover:bg-[#f7efe4]/[0.08]"
                >
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[#e8c9b4]">
                    48hrs — brief to first drop
                  </span>
                  <span aria-hidden="true" className="text-teal-bright">
                    →
                  </span>
                </a>
                <a
                  href="#work"
                  className="group hidden items-center gap-3 rounded-md border border-[#f7efe4]/12 bg-[#f7efe4]/[0.04] px-4 py-2.5 transition-colors hover:border-[#f7efe4]/30 hover:bg-[#f7efe4]/[0.08] xl:flex"
                >
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[#e8c9b4]">
                    Cases — numbers we&apos;re proud of
                  </span>
                  <span aria-hidden="true" className="text-teal-bright">
                    →
                  </span>
                </a>
              </div>

              {/* video card */}
              <a
                href="#founder"
                data-cursor="play"
                className="group flex items-center gap-3 justify-self-start rounded-md border border-[#f7efe4]/12 bg-[#f7efe4]/[0.04] p-1.5 pr-4 transition-colors hover:border-[#f7efe4]/30 hover:bg-[#f7efe4]/[0.08] sm:justify-self-end"
              >
                <span className="relative block h-12 w-16 overflow-hidden rounded">
                  <Image
                    src="/img/factoid-studio.jpg"
                    alt=""
                    fill
                    sizes="64px"
                    quality={70}
                    className="object-cover"
                  />
                  <span className="absolute inset-0 grid place-items-center bg-black/35">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-[#f7efe4] text-espresso transition-transform duration-300 group-hover:scale-110">
                      <svg width="8" height="10" viewBox="0 0 8 10" aria-hidden="true">
                        <path d="M0.5 0.8 L7.5 5 L0.5 9.2 Z" fill="currentColor" />
                      </svg>
                    </span>
                  </span>
                </span>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] leading-relaxed text-[#e8c9b4]">
                  {FOUNDER.kicker}
                  <br />
                  <span className="text-[#f7efe4]">{FOUNDER.duration}</span>
                </span>
              </a>
            </div>
          </div>

          {/* Giant woven wordmark, with the cue and seal anchored to it */}
          <div data-h="wordmark" className="relative mt-2 pb-4 sm:pb-6">
            <span
              aria-hidden="true"
              className="kicker absolute -top-3 left-5 hidden items-center gap-3 text-[#e8c9b4] lg:flex"
            >
              Scroll
              <span className="inline-block h-9 w-px bg-[#f7efe4]/40" />
            </span>
            <div
              data-h="stamp"
              className="absolute -top-20 right-6 z-10 hidden text-[#e8c9b4] lg:block"
            >
              <Stamp />
            </div>
            <WovenWordmark
              text={`${SITE.name}.`}
              color="#f7efe4"
              className="h-[21vw] max-h-[19rem] w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
