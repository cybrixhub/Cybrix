"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { SERVICE_GROUPS } from "@/lib/site";

const PLANS = SERVICE_GROUPS.flatMap((g) =>
  g.items.map((item) => ({
    slug: item.slug,
    name: item.name,
    tagline: item.tagline,
    group: g.number,
    groupLabel: g.kicker,
  })),
);

export default function PlanVideos() {
  const [active, setActive] = useState(0);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.src = `/videos/${PLANS[0].slug}.mp4`;
    vid.load();
    vid.play().catch(() => {});
  }, []);

  function switchTo(idx: number) {
    if (idx === active) return;
    setActive(idx);
    setHasError(false);
    const vid = videoRef.current;
    if (!vid) return;
    vid.pause();
    vid.src = `/videos/${PLANS[idx].slug}.mp4`;
    vid.load();
    vid.play().catch(() => {});
  }

  const plan = PLANS[active];

  return (
    <section
      id="plans-video"
      aria-label="Plans in action"
      className="relative bg-navy py-24 text-cream sm:py-32"
    >
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.05]" />
      <span className="marginalia !text-[#b9cbe4]">plans — see them in action</span>

      <div className="container-x relative z-10">
        <Reveal>
          <span className="kicker text-teal-bright">What we build</span>
        </Reveal>
        <Reveal delay={80}>
          <h2
            data-split
            className="split-parent mt-4 max-w-xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-5xl"
          >
            Eight plans. See exactly how each one works.
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#b9cbe4] text-pretty">
            Pick any plan below — the video plays automatically and shows you
            what we deliver, step by step.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.7fr] lg:items-start lg:gap-10">
          {/* Left — plan selector */}
          <div className="space-y-8">
            {SERVICE_GROUPS.map((group) => (
              <div key={group.number}>
                <p className="mb-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#8ba0c0]">
                  {group.number} — {group.kicker}
                </p>
                <ul className="space-y-0.5">
                  {group.items.map((item) => {
                    const idx = PLANS.findIndex((p) => p.slug === item.slug);
                    const isActive = idx === active;
                    return (
                      <li key={item.slug}>
                        <button
                          type="button"
                          onClick={() => switchTo(idx)}
                          aria-pressed={isActive}
                          className={`group w-full rounded-md px-4 py-3 text-left transition-all duration-200 ${
                            isActive
                              ? "border-l-2 border-teal-bright bg-[#1b2c60] pl-3.5"
                              : "border-l-2 border-transparent hover:border-navy-line hover:bg-[#131f4a]"
                          }`}
                        >
                          <span
                            className={`block text-sm font-semibold leading-snug transition-colors ${
                              isActive
                                ? "text-teal-bright"
                                : "text-cream group-hover:text-teal-bright"
                            }`}
                          >
                            {item.name}
                          </span>
                          <span className="mt-0.5 block text-xs leading-snug text-[#8ba0c0]">
                            {item.tagline.split("—")[0].trim().slice(0, 60)}
                            {item.tagline.length > 60 ? "…" : ""}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Right — video plate */}
          <Reveal delay={60}>
            <div>
              <div className="overflow-hidden rounded-lg border border-navy-line bg-[#0a1230] shadow-[0_32px_64px_-24px_rgba(0,0,0,0.7)]">
                {/* Chrome bar */}
                <div className="flex items-center justify-between border-b border-navy-line bg-[#0e1640] px-4 py-2.5">
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full bg-teal-bright"
                    />
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[#8ba0c0]">
                      {plan.slug}.mp4
                    </span>
                  </span>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-[#8ba0c0]">
                    {plan.group === "01" ? "Growth Plan" : "Automated System"}
                  </span>
                </div>

                {/* Video */}
                <div className="relative aspect-video bg-[#060d20]">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    onError={() => setHasError(true)}
                    onCanPlay={() => setHasError(false)}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                      hasError ? "opacity-0" : "opacity-100"
                    }`}
                  />

                  {/* Placeholder shown when no file / on error */}
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${
                      hasError ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="grid h-16 w-16 place-items-center rounded-full border border-navy-line bg-navy">
                      <svg
                        width="16"
                        height="19"
                        viewBox="0 0 16 19"
                        fill="none"
                        className="ml-1 text-teal-bright"
                        aria-hidden="true"
                      >
                        <path d="M1 1.5 L15 9.5 L1 17.5 Z" fill="currentColor" />
                      </svg>
                    </div>
                    <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#8ba0c0]">
                      Drop /public/videos/{plan.slug}.mp4 to activate
                    </p>
                  </div>

                  {/* Caption overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#060d20]/90 to-transparent p-5">
                    <p className="font-display text-lg font-medium leading-snug">
                      {plan.name}
                    </p>
                    <p className="mt-1 text-sm text-[#b9cbe4]">{plan.tagline}</p>
                  </div>
                </div>
              </div>

              {/* Pill nav — mobile quick-switch */}
              <div className="mt-4 flex gap-1.5 overflow-x-auto pb-1 lg:hidden">
                {PLANS.map((p, i) => (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => switchTo(i)}
                    aria-pressed={i === active}
                    className={`shrink-0 rounded-full border px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] transition-colors ${
                      i === active
                        ? "border-teal-bright bg-teal-bright text-navy"
                        : "border-navy-line text-[#8ba0c0] hover:border-teal-bright hover:text-teal-bright"
                    }`}
                  >
                    {p.name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
