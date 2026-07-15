"use client";

import { useEffect, useMemo, useState } from "react";
import Reveal from "./Reveal";
import BrandMark from "./BrandMark";
import { SITE } from "@/lib/site";

const SLOTS = ["10:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"];
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const PERKS = [
  "30-minute strategy call, free",
  "Google Meet link — sent to your inbox",
  "Come with goals, leave with a plan",
  "No pitch, no pressure",
];

type Day = { y: number; m: number; d: number };

/**
 * Scheduling section — pick a weekday + slot, then hand off to email with the
 * choice pre-filled (same mailto pattern as the contact form; no backend, no
 * third-party embed, so it stays inside the site's strict CSP). The real
 * "today" is only resolved after mount to avoid a build-date hydration
 * mismatch — until then every day renders disabled, matching the server HTML.
 */
export default function MeetingBooking() {
  const [today, setToday] = useState<Day | null>(null);
  const [view, setView] = useState<{ y: number; m: number } | null>(null);
  const [picked, setPicked] = useState<Day | null>(null);
  const [slot, setSlot] = useState("");

  useEffect(() => {
    const n = new Date();
    setToday({ y: n.getFullYear(), m: n.getMonth(), d: n.getDate() });
    setView({ y: n.getFullYear(), m: n.getMonth() });
  }, []);

  const cells = useMemo(() => {
    if (!view) return [];
    const firstDow = new Date(view.y, view.m, 1).getDay();
    const total = new Date(view.y, view.m + 1, 0).getDate();
    const arr: (number | null)[] = Array.from({ length: firstDow }, () => null);
    for (let d = 1; d <= total; d++) arr.push(d);
    return arr;
  }, [view]);

  const monthsAhead = today && view
    ? (view.y - today.y) * 12 + (view.m - today.m)
    : 0;
  const atStart = monthsAhead <= 0;
  const atEnd = monthsAhead >= 3;

  function isDisabled(d: number) {
    if (!today || !view) return true;
    const dow = new Date(view.y, view.m, d).getDay();
    if (dow === 0 || dow === 6) return true;
    if (view.y < today.y) return true;
    if (view.y === today.y && view.m < today.m) return true;
    if (view.y === today.y && view.m === today.m && d < today.d) return true;
    return false;
  }

  function shiftMonth(delta: number) {
    setView((v) => {
      if (!v) return v;
      const m = v.m + delta;
      return { y: v.y + Math.floor(m / 12), m: ((m % 12) + 12) % 12 };
    });
  }

  const isPicked = (d: number) =>
    !!picked && !!view && picked.d === d && picked.m === view.m && picked.y === view.y;

  const pickedLabel = picked
    ? `${MONTHS[picked.m]} ${picked.d}, ${picked.y}`
    : null;

  function book() {
    if (!picked || !slot) return;
    const subject = `Strategy call — ${pickedLabel} at ${slot}`;
    const body = [
      "I'd like to book a 30-minute strategy call.",
      "",
      `Date: ${pickedLabel}`,
      `Time: ${slot}`,
      "",
      "Name: ",
      "Company: ",
      "What I want to grow: ",
    ].join("\n");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section
      id="schedule"
      aria-label="Schedule a call"
      className="relative overflow-hidden bg-navy py-24 text-cream sm:py-32"
    >
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.06]" />
      <BrandMark className="pointer-events-none absolute -right-[6%] top-1/2 z-0 h-[52vh] w-auto -translate-y-1/2 text-teal/10" />
      <span className="marginalia !text-[#b9cbe4]">appointments — pick a slot</span>

      <div className="container-x relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left — the offer */}
          <div>
            <Reveal>
              <span className="kicker text-teal-bright">Book a call</span>
            </Reveal>
            <Reveal delay={80}>
              <h2
                data-split
                className="split-parent mt-4 font-display text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl"
              >
                Grab a time that works.
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-[#b9cbe4] text-pretty">
                Pick a day and slot — we&rsquo;ll send a Google Meet link to your
                inbox. Thirty focused minutes on your growth, nothing to prep.
              </p>
            </Reveal>
            <ul className="mt-10 max-w-md">
              {PERKS.map((perk) => (
                <li
                  key={perk}
                  className="flex items-baseline gap-4 border-b border-navy-line py-3.5 first:border-t"
                >
                  <span aria-hidden="true" className="font-mono text-teal-bright">
                    ✓
                  </span>
                  <span className="text-base">{perk}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — the scheduler plate */}
          <Reveal delay={100}>
            <div className="rounded-lg border border-navy-line bg-navy-2 p-6 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)] sm:p-8">
              <h3 className="font-display text-2xl font-medium tracking-tight">
                Select date &amp; time
              </h3>
              <p className="mt-1.5 text-sm text-[#8ba0c0]">
                Weekdays only · times shown in your local zone.
              </p>

              {/* Month nav */}
              <div className="mt-7 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => shiftMonth(-1)}
                  disabled={atStart}
                  aria-label="Previous month"
                  className="grid h-9 w-9 place-items-center rounded-md border border-navy-line text-lg text-cream transition-colors hover:border-teal-bright hover:text-teal-bright disabled:opacity-25 disabled:hover:border-navy-line disabled:hover:text-cream"
                >
                  ←
                </button>
                <span className="font-display text-lg font-medium">
                  {view ? `${MONTHS[view.m]} ${view.y}` : "—"}
                </span>
                <button
                  type="button"
                  onClick={() => shiftMonth(1)}
                  disabled={atEnd}
                  aria-label="Next month"
                  className="grid h-9 w-9 place-items-center rounded-md border border-navy-line text-lg text-cream transition-colors hover:border-teal-bright hover:text-teal-bright disabled:opacity-25 disabled:hover:border-navy-line disabled:hover:text-cream"
                >
                  →
                </button>
              </div>

              {/* Weekday header */}
              <div className="mt-6 grid grid-cols-7 gap-1.5 text-center font-mono text-[0.6rem] uppercase tracking-[0.1em] text-[#8ba0c0]">
                {WEEKDAYS.map((w) => (
                  <div key={w}>{w}</div>
                ))}
              </div>

              {/* Date grid */}
              <div className="mt-2 grid grid-cols-7 gap-1.5">
                {cells.map((d, i) =>
                  d === null ? (
                    <div key={`b${i}`} />
                  ) : (
                    <button
                      key={d}
                      type="button"
                      disabled={isDisabled(d)}
                      aria-pressed={isPicked(d)}
                      aria-label={view ? `${MONTHS[view.m]} ${d}, ${view.y}` : `Day ${d}`}
                      onClick={() => view && setPicked({ y: view.y, m: view.m, d })}
                      className={`h-10 rounded-md font-mono text-sm transition-colors ${
                        isPicked(d)
                          ? "bg-teal-bright font-semibold text-navy"
                          : isDisabled(d)
                            ? "cursor-not-allowed text-[#46587a]"
                            : "bg-navy text-cream hover:bg-[#1b2c60] hover:text-teal-bright"
                      }`}
                    >
                      {d}
                    </button>
                  ),
                )}
              </div>

              {/* Slots */}
              <h4 className="mt-8 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#8ba0c0]">
                Available slots
              </h4>
              <div className="mt-3 grid grid-cols-2 gap-2.5">
                {SLOTS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={slot === s}
                    onClick={() => setSlot(s)}
                    className={`rounded-md border py-2.5 font-mono text-sm transition-colors ${
                      slot === s
                        ? "border-teal-bright bg-teal-bright font-semibold text-navy"
                        : "border-navy-line text-cream hover:border-teal-bright hover:text-teal-bright"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Summary + CTA */}
              <div className="mt-7 flex flex-wrap items-baseline justify-between gap-2 border-t border-navy-line pt-5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[#8ba0c0]">
                <span>
                  {pickedLabel ? (
                    <span className="text-teal-bright">{pickedLabel}</span>
                  ) : (
                    "Pick a date"
                  )}
                </span>
                <span>
                  {slot ? (
                    <span className="text-teal-bright">{slot}</span>
                  ) : (
                    "Pick a slot"
                  )}
                </span>
              </div>

              <button
                type="button"
                onClick={book}
                disabled={!picked || !slot}
                data-cursor="book"
                className={`btn-press mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md py-3.5 text-sm font-semibold transition-colors ${
                  !picked || !slot
                    ? "cursor-not-allowed bg-navy text-[#46587a]"
                    : "bg-teal-bright text-navy hover:bg-[#8ff0e0]"
                }`}
              >
                Book my Google Meet
              </button>
              <p className="mt-4 text-center font-mono text-[0.6rem] uppercase tracking-[0.12em] text-[#8ba0c0]">
                Confirmation + Meet link sent by email
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
