"use client";

import { useEffect, useRef, useState } from "react";
import { TRACK_RECORD } from "@/lib/site";

function parseStat(value: string) {
  const match = value.match(/^([^\d]*)([\d.]+)(.*)$/);
  if (!match) return { prefix: "", target: 0, suffix: value, decimals: 0 };
  const numStr = match[2];
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return {
    prefix: match[1],
    target: parseFloat(numStr),
    suffix: match[3],
    decimals,
  };
}

function CountUp({ value }: { value: string }) {
  const { prefix, target, suffix, decimals } = parseStat(value);
  const [display, setDisplay] = useState(target);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    let rafId = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const duration = 1400;
        let startTime: number | null = null;
        setDisplay(0);

        const tick = (now: number) => {
          if (startTime === null) startTime = now;
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(target * eased);
          if (progress < 1) rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const CARD_STYLES = [
  { card: "bg-blush", number: "text-oxblood-bright", label: "text-ink-soft" },
  { card: "bg-espresso-2", number: "text-cream", label: "text-cream-soft" },
  { card: "bg-butter", number: "text-amber", label: "text-ink-soft" },
  { card: "bg-paper-2", number: "text-ink", label: "text-ink-soft" },
] as const;

export default function TrackRecord() {
  return (
    <section aria-label="Track record" className="bg-paper py-16 sm:py-20">
      <div className="container-x">
        <div className="flex items-baseline justify-between">
          <p className="kicker text-muted">Track record</p>
          <p className="kicker hidden text-muted sm:block">
            six years, counted honestly
          </p>
        </div>
        <dl className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {TRACK_RECORD.map((stat, i) => {
            const s = CARD_STYLES[i % CARD_STYLES.length];
            return (
              <div
                key={stat.label}
                className={`rounded-lg border border-line-strong/60 p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7 ${s.card}`}
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd
                  className={`font-display text-4xl font-medium tracking-tight sm:text-6xl ${s.number}`}
                >
                  <CountUp value={stat.value} />
                </dd>
                <p
                  className={`mt-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] ${s.label}`}
                >
                  {stat.label}
                </p>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
