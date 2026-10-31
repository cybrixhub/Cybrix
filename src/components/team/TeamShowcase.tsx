"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import BrandMark from "@/components/BrandMark";
import Portrait from "./Portrait";
import { RoleIcon, RoleMotif } from "./RoleMotif";
import type { TeamMember } from "@/lib/team";

const SLIDE_MS = 5500; // equal display time for everyone
const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";
const TRANSITION_MS = 650;

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * One member at a time, every slide in an identical frame: same portrait
 * container, same type scale, same display time. Slides are stacked in one
 * grid cell; the incoming slide glides in from the direction of travel while
 * the outgoing one glides out and fades. Auto-advance pauses on
 * hover / focus / touch and while the tab is hidden. Reduced motion: no
 * auto-rotation and no slide animation.
 */
export default function TeamShowcase({ members }: { members: TeamMember[] }) {
  const count = members.length;
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const touchX = useRef<number | null>(null);
  const remaining = useRef(SLIDE_MS);
  const remainingFor = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    const vis = () => setTabHidden(document.hidden);
    sync();
    vis();
    mq.addEventListener("change", sync);
    document.addEventListener("visibilitychange", vis);
    return () => {
      mq.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  // Direction of travel (+1 forward, -1 back) and the slide that is leaving.
  const [dir, setDir] = useState(1);
  const [leaving, setLeaving] = useState<number | null>(null);

  const go = useCallback(
    (i: number, direction?: number) => {
      const target = ((i % count) + count) % count;
      if (target === index) return;
      setDir(direction ?? (target > index ? 1 : -1));
      setLeaving(index);
      setIndex(target);
    },
    [count, index],
  );
  const next = useCallback(() => go(index + 1, 1), [go, index]);
  const prev = useCallback(() => go(index - 1, -1), [go, index]);

  const paused = hovered || focused || reduced || tabHidden;

  // Auto-advance: a plain timer that keeps the remaining time across pauses,
  // so every member gets the same SLIDE_MS on screen. The progress bar below
  // mirrors it visually.
  useEffect(() => {
    if (remainingFor.current !== index) {
      remainingFor.current = index;
      remaining.current = SLIDE_MS;
    }
    if (paused) return;
    const start = performance.now();
    const id = window.setTimeout(next, remaining.current);
    return () => {
      window.clearTimeout(id);
      remaining.current = Math.max(0, remaining.current - (performance.now() - start));
    };
  }, [index, paused, next]);

  function onKeyDown(e: KeyboardEvent<HTMLElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  }

  const duration = reduced ? 0 : TRANSITION_MS;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Cybrix team"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
        setHovered(true);
      }}
      onTouchEnd={(e) => {
        const start = touchX.current;
        touchX.current = null;
        setHovered(false);
        if (start === null) return;
        const dx = e.changedTouches[0].clientX - start;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
      }}
      className="relative"
    >
      {/* Stage */}
      <div className="relative overflow-hidden rounded-2xl border border-line-strong bg-white shadow-[0_40px_80px_-48px_rgba(20,49,122,0.45)]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="bg-grain absolute inset-0" />
          <BrandMark className="absolute -bottom-16 -right-10 h-72 w-auto text-navy/[0.04]" />
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#78efeb]/10 blur-3xl" />
        </div>

        {/* All slides share one grid cell: the stage is always as tall as
            the tallest slide (no layout shift), and every transition is the
            same short slide + cross-fade whichever member you jump to. */}
        <div className="relative grid" aria-live={paused ? "polite" : "off"}>
          {members.map((m, i) => {
            const active = i === index;
            const offset = active ? 0 : i === leaving ? -dir * 8 : dir * 8;
            return (
              <article
                key={m.key}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}: ${m.name}, ${m.role}`}
                aria-hidden={!active}
                inert={!active}
                className="group grid w-full [grid-area:1/1] md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
                style={{
                  zIndex: active ? 2 : i === leaving ? 1 : 0,
                  opacity: active ? 1 : 0,
                  transform: `translate3d(${offset}%, 0, 0)`,
                  // Entering: keyframes from the side we're travelling from.
                  // Leaving: a transition out the other side. Others: parked.
                  animation:
                    active && leaving !== null && duration
                      ? `${dir > 0 ? "tm-enter-r" : "tm-enter-l"} ${duration}ms ${EASE} both`
                      : undefined,
                  transition:
                    i === leaving
                      ? `opacity ${duration}ms ease, transform ${duration}ms ${EASE}`
                      : "none",
                }}
              >
                {/* Portrait — identical frame for every member */}
                <div className="relative p-3 sm:p-4 md:p-5">
                  <div className="relative overflow-hidden rounded-xl">
                    <Portrait
                      member={m}
                      reveal={false}
                      sizes="(max-width: 768px) 92vw, 480px"
                      className="aspect-[4/5]"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-navy/45 to-transparent"
                    />
                    <span className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-navy shadow-[0_6px_16px_-6px_rgba(20,49,122,0.45)] backdrop-blur-sm">
                      <RoleIcon role={m.key} className="h-5 w-5" />
                    </span>
                  </div>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-1/2 hidden h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#78efeb]/60 to-transparent md:block"
                  />
                </div>

                {/* Details — same hierarchy for every member */}
                <div className="relative flex flex-col justify-center px-6 pb-8 pt-2 sm:px-8 md:py-12 md:pl-6 md:pr-12 lg:pr-16">
                  <div className="flex items-baseline gap-2 font-display font-semibold leading-none">
                    <span className="text-6xl tracking-tight text-navy/10 sm:text-7xl lg:text-8xl">
                      {pad(i + 1)}
                    </span>
                    <span className="font-mono text-xs tracking-[0.18em] text-muted">/ {pad(count)}</span>
                  </div>

                  <p className="mt-6 inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[#3DB5B0]">
                    <span aria-hidden="true" className="h-px w-6 bg-[#78efeb]" />
                    {m.role}
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-semibold leading-[1.08] tracking-tight text-navy text-balance sm:text-4xl lg:text-[2.75rem]">
                    {m.name}
                  </h3>
                  <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-soft text-pretty sm:text-lg">
                    {m.focus}
                  </p>
                  {m.bio && (
                    <p className="mt-3 max-w-lg text-base leading-relaxed text-ink text-pretty">{m.bio}</p>
                  )}

                  <ul className="mt-7 flex flex-wrap gap-2" aria-label="Focus areas">
                    {m.skills.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-line-strong bg-paper-2 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-soft"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex h-6 items-center border-t border-line pt-6">
                    <RoleMotif role={m.key} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="Choose a team member" className="grid grid-cols-5 gap-2 sm:flex sm:gap-3">
          {members.map((m, i) => {
            const active = i === index;
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show ${m.name}, ${m.role}`}
                aria-current={active ? "true" : undefined}
                className={`group relative flex min-w-0 flex-col items-start gap-2 rounded-lg px-1 pb-1 pt-2 text-left transition-colors duration-300 sm:w-28 ${
                  active ? "text-navy" : "text-muted hover:text-navy"
                }`}
              >
                <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-line-strong">
                  {active && (
                    <span
                      key={`${index}-${reduced}`}
                      className="absolute inset-0 origin-left rounded-full bg-[#3DB5B0]"
                      style={
                        reduced
                          ? undefined
                          : {
                              animation: `tm-progress ${SLIDE_MS}ms linear forwards`,
                              animationPlayState: paused ? "paused" : "running",
                            }
                      }
                    />
                  )}
                </span>
                <span className="font-mono text-[0.68rem] tracking-[0.16em]">{pad(i + 1)}</span>
                <span className="hidden w-full truncate text-xs font-medium sm:block">{m.name}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <span className="mr-1 font-mono text-[0.68rem] tracking-[0.16em] text-muted" aria-hidden="true">
            {pad(index + 1)} / {pad(count)}
          </span>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous team member"
            className="grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-white text-navy shadow-[0_6px_16px_-10px_rgba(20,49,122,0.4)] transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-white"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next team member"
            className="grid h-11 w-11 place-items-center rounded-full border border-navy bg-navy text-white shadow-[0_10px_22px_-10px_rgba(20,49,122,0.6)] transition-colors duration-300 hover:border-[#78efeb] hover:bg-[#78efeb] hover:text-navy"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
