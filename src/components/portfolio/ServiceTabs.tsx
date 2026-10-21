"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { SupportService } from "@/lib/portfolio";

/**
 * Supporting services (PDF pp. 5–11) as an accessible tab set: vertical list
 * on desktop, horizontally scrolling chips on mobile. Arrow keys move focus.
 */
export default function ServiceTabs({ services }: { services: SupportService[] }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const last = services.length - 1;
    let next = active;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    setActive(next);
    tabRefs.current[next]?.focus();
    tabRefs.current[next]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  const s = services[active];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
      <div
        role="tablist"
        aria-label="Supporting services"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-line-strong lg:px-0 lg:pb-0"
      >
        {services.map((service, i) => {
          const selected = i === active;
          return (
            <button
              key={service.title}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`group flex shrink-0 items-baseline gap-3 rounded-full border px-4 py-2.5 text-left transition-colors duration-300 lg:rounded-none lg:border-0 lg:border-b lg:border-line-strong lg:px-1 lg:py-4 ${
                selected
                  ? "border-navy bg-navy text-white lg:bg-transparent lg:text-navy"
                  : "border-line-strong bg-white text-ink-soft hover:text-navy lg:bg-transparent"
              }`}
            >
              <span
                className={`font-mono text-[0.65rem] tracking-[0.16em] ${
                  selected ? "text-[#78efeb] lg:text-[#3DB5B0]" : "text-muted"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="whitespace-nowrap font-display text-sm font-semibold lg:whitespace-normal lg:text-lg">
                {service.title}
              </span>
              <span
                aria-hidden="true"
                className={`ml-auto hidden text-[#3DB5B0] transition-all duration-300 lg:inline ${
                  selected ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
                }`}
              >
                →
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${active}`}
        tabIndex={0}
        className="relative overflow-hidden rounded-lg border border-line-strong bg-white p-6 shadow-[0_24px_48px_-28px_rgba(20,49,122,0.25)] sm:p-9 lg:min-h-[26rem]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-navy via-[#78efeb] to-navy"
        />
        <div key={active} className="animate-[pf-fade-up_0.45s_cubic-bezier(0.16,1,0.3,1)]">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
            Service {String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
          </span>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
            {s.title}
          </h3>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">{s.lead}</p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {s.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 rounded-md border border-line bg-paper-2 px-4 py-3.5 text-[0.95rem] leading-snug text-ink"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#78efeb]/25 font-mono text-[0.65rem] text-navy"
                >
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
