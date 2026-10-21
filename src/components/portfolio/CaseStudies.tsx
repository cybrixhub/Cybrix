"use client";

import { useState } from "react";
import ZoomImage from "./ZoomImage";
import type { CaseSector, CaseStudy } from "@/lib/portfolio";

const FILTERS: ("All" | CaseSector)[] = ["All", "Healthcare", "Home services", "E-commerce"];

export default function CaseStudies({ cases }: { cases: CaseStudy[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const shown = filter === "All" ? cases : cases.filter((c) => c.sector === filter);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter case studies by sector"
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {FILTERS.map((f) => {
          const count = f === "All" ? cases.length : cases.filter((c) => c.sector === f).length;
          const on = f === filter;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                on
                  ? "border-navy bg-navy text-white"
                  : "border-line-strong bg-white text-ink-soft hover:border-navy hover:text-navy"
              }`}
            >
              {f}
              <span className={`font-mono text-[0.65rem] ${on ? "text-[#78efeb]" : "text-muted"}`}>
                {String(count).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {shown.length} case {shown.length === 1 ? "study" : "studies"}
      </p>

      <ul className="mt-10 grid gap-6 md:grid-cols-2 md:gap-7">
        {shown.map((c, i) => (
          <li
            key={c.id}
            className="animate-[pf-fade-up_0.5s_cubic-bezier(0.16,1,0.3,1)_both]"
            style={{ animationDelay: `${Math.min(i, 6) * 50}ms` }}
          >
            <CaseCard c={c} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function CaseCard({ c }: { c: CaseStudy }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-line-strong bg-white shadow-[0_20px_40px_-28px_rgba(20,49,122,0.3)] transition-[box-shadow,transform] duration-500 hover:-translate-y-0.5 hover:shadow-[0_30px_56px_-28px_rgba(20,49,122,0.38)]">
      {/* Masthead */}
      <header className="relative overflow-hidden bg-navy px-6 pb-6 pt-5 text-white sm:px-7">
        <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.07]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-[#78efeb]/15 blur-2xl"
        />
        <div className="relative flex flex-wrap items-center justify-between gap-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#B9CBE4]">
          <span>{c.sector}</span>
          {c.region && (
            <span className="rounded-full border border-white/25 px-2.5 py-0.5 text-white">
              {c.region}
            </span>
          )}
        </div>
        <h3 className="relative mt-4 font-display text-xl font-semibold leading-snug tracking-tight text-balance sm:text-2xl">
          {c.niche}
        </h3>
        <p className="relative mt-4 flex items-baseline gap-3">
          <span className="font-display text-5xl font-semibold leading-none tracking-tight text-[#78efeb] sm:text-6xl">
            {c.headline.value}
          </span>
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[#B9CBE4]">
            {c.headline.label}
          </span>
        </p>
      </header>

      {/* Ledger */}
      <dl className="grid grid-cols-2 max-sm:[&>div:nth-child(2n)]:border-r-0 sm:grid-cols-3 sm:[&>div:nth-child(3n)]:border-r-0">
        {c.metrics.map((m) => (
          <div key={m.label} className="flex flex-col gap-1.5 border-b border-r border-line bg-white px-5 py-4">
            <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
              {m.label}
            </dt>
            <dd className="font-display text-base font-semibold tabular-nums text-navy sm:text-lg">
              {m.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-auto flex flex-col gap-4 p-5 sm:p-6">
        {c.note && <p className="text-sm leading-relaxed text-ink-soft">{c.note}</p>}
        <ZoomImage
          src={c.image}
          width={c.imageWidth}
          height={c.imageHeight}
          alt={`${c.niche}${c.region ? ` (${c.region})` : ""} — Meta Ads Manager report`}
          caption={`${c.niche}${c.region ? ` — ${c.region}` : ""}: Meta Ads Manager report from the Cybrix portfolio.`}
          sizes="(max-width: 768px) 90vw, 560px"
          className="h-28 rounded-md border border-line bg-paper-2"
          imageClassName="object-cover object-left-top"
        >
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
          <span className="pointer-events-none absolute bottom-2.5 left-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-navy">
            View Ads Manager report →
          </span>
        </ZoomImage>
        {c.source === "report" && (
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted">
            Figures as shown in the Ads Manager report
          </p>
        )}
      </div>
    </article>
  );
}
