"use client";

import { useState } from "react";
import Image from "next/image";
import Stamp from "./Stamp";
import { FACTOIDS } from "@/lib/site";

export default function Factoids() {
  const [index, setIndex] = useState(0);
  const count = FACTOIDS.length;
  const slide = FACTOIDS[index];

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count);

  return (
    <section
      aria-label="Why founders pick Cybrix"
      aria-roledescription="carousel"
      className="relative overflow-hidden bg-navy text-white"
    >
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.05]" />

      <div className="relative lg:grid lg:grid-cols-[1fr_19rem_1fr] xl:grid-cols-[1fr_21rem_1fr]">
        <div className="relative z-10 flex flex-col justify-center px-5 py-16 sm:px-10 lg:min-h-[80vh] lg:py-24 lg:pr-12 xl:pl-16">
          <span className="kicker text-[#78efeb]">Why founders pick us</span>
          <h2 className="mt-4 max-w-sm font-display text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-5xl">
            The Cybrix <em className="italic">effect</em>.
          </h2>
          <p className="mt-5 max-w-xs text-base leading-relaxed text-[#B9CBE4] text-pretty">
            No decks that go nowhere. No six-week onboarding. The engine starts
            fast and every piece feeds pipeline.
          </p>
          <div className="mt-10 text-[#B9CBE4]">
            <Stamp />
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-navy" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-butter" />
          <div className="relative z-10 flex h-full items-center py-16">
            <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/20 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.4)]">
              {FACTOIDS.map((f, i) => (
                <Image
                  key={f.image}
                  src={f.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 0px, (max-width: 1280px) 304px, 336px"
                  quality={75}
                  className={`object-cover transition-all duration-700 ease-out ${
                    i === index ? "scale-100 opacity-100" : "scale-105 opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col justify-center bg-butter px-5 py-16 text-navy sm:px-10 lg:min-h-[80vh] lg:py-24 lg:pl-12 xl:pr-16">
          <div aria-live="polite" className="text-center lg:text-left">
            <p className="font-display leading-none tracking-tight">
              <span className="text-[6rem] font-medium sm:text-[8.5rem]">
                {slide.value}
              </span>
              <span className="ml-1 align-baseline font-display text-3xl font-medium uppercase sm:text-4xl">
                {slide.unit}.
              </span>
            </p>
            <p className="kicker mt-8 !text-[0.78rem] text-navy">
              {slide.title}
            </p>
            <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-ink-soft lg:mx-0">
              {slide.note}
            </p>
          </div>

          <div className="mt-12 flex items-center justify-between">
            <span className="font-mono text-sm tabular-nums text-ink-soft">
              {index + 1}&ensp;|&ensp;{count}
            </span>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous"
                className="btn-press grid h-11 w-11 place-items-center rounded-full border border-navy/30 text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
              >
                <span aria-hidden="true">‹</span>
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next"
                className="btn-press grid h-11 w-11 place-items-center rounded-full border border-navy/30 text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
              >
                <span aria-hidden="true">›</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-4 px-5 pb-14 lg:hidden">
        <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden border border-white/15">
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            sizes="(max-width: 640px) 100vw, 448px"
            quality={75}
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
