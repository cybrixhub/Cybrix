import Link from "next/link";
import { SERVICE_GROUPS } from "@/lib/site";
import BrandMark from "./BrandMark";

const PANEL_STYLES = [
  {
    // Growth plans — warm editorial (the human, strategy-led work)
    section: "bg-espresso text-cream",
    line: "border-espresso-line",
    displayNumber: "text-oxblood-bright",
    pagination: "text-amber",
    arrow: "text-amber",
    muted: "text-cream-soft",
    itemBg: "bg-espresso-2",
    itemBorder: "border-espresso-line",
    itemHover: "hover:bg-[#3a2f22]",
    mark: "text-cream/[0.05]",
  },
  {
    // Automated systems — the logo's navy+teal (the tech, engine-led work)
    section: "bg-navy text-cream",
    line: "border-navy-line",
    displayNumber: "text-teal-bright",
    pagination: "text-teal-bright",
    arrow: "text-teal-bright",
    muted: "text-[#b9cbe4]",
    itemBg: "bg-navy-2",
    itemBorder: "border-teal/25",
    itemHover: "hover:bg-[#1b2c60]",
    mark: "text-teal/10",
  },
] as const;

/**
 * "What we do" — the lock section. Each chapter is a full-viewport sticky
 * panel; scrolling turns the page. Each panel now holds a whole service
 * group (Growth Plans / Automated Systems) with its individual offerings
 * as inline cards.
 */
export default function WhatWeDo() {
  return (
    <section id="services" aria-label="What we do">
      <h2 className="sr-only">What we do</h2>
      {SERVICE_GROUPS.map((group, i) => {
        const s = PANEL_STYLES[i % PANEL_STYLES.length];
        return (
          <article
            key={group.number}
            className={`chapter-shadow sticky top-0 flex min-h-svh flex-col justify-center overflow-hidden ${s.section}`}
          >
            <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.06]" />
            <BrandMark
              className={`pointer-events-none absolute -right-[7%] top-1/2 z-0 h-[54vh] w-auto -translate-y-1/2 ${s.mark}`}
            />
            <div
              aria-hidden="true"
              className="js-panel-shade pointer-events-none absolute inset-0 z-20 bg-black opacity-0"
            />

            <div className="container-x relative z-10 py-20 sm:py-24">
              <div
                className={`flex items-baseline justify-between border-b pb-5 ${s.line}`}
              >
                <span className="kicker">{group.kicker}</span>
                <span className="font-mono text-sm">
                  <span className={s.pagination}>{group.number}</span>
                  <span className={s.muted}>
                    {" "}
                    / {String(SERVICE_GROUPS.length).padStart(2, "0")}
                  </span>
                </span>
              </div>

              <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
                {/* Left — the group intro */}
                <div className="lg:sticky lg:top-24 lg:self-start">
                  <span
                    aria-hidden="true"
                    className={`font-display text-6xl font-medium italic sm:text-7xl md:text-8xl ${s.displayNumber}`}
                  >
                    {group.number}
                  </span>
                  <h3 className="mt-4 font-display text-3xl font-medium leading-[1.05] tracking-tight text-balance sm:text-4xl md:text-5xl">
                    {group.title}
                  </h3>
                  <p
                    className={`mt-5 max-w-md text-base leading-relaxed text-pretty sm:text-lg ${s.muted}`}
                  >
                    {group.intro}
                  </p>
                </div>

                {/* Right — the individual offerings */}
                <ol className={`self-start border-t ${s.line}`}>
                  {group.items.map((item, idx) => (
                    <li
                      key={item.name}
                      className={`border-b ${s.line}`}
                    >
                      <Link
                        href={`/services/${item.slug}`}
                        className={`group/item block transition-colors duration-300 ${s.itemHover}`}
                      >
                        <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-baseline gap-3">
                              <span
                                className={`font-mono text-[0.65rem] uppercase tracking-[0.16em] ${s.muted}`}
                              >
                                {String(idx + 1).padStart(2, "0")}
                              </span>
                              <h4 className="font-display text-xl font-medium tracking-tight sm:text-2xl">
                                {item.name}
                              </h4>
                            </div>
                            <p
                              className={`mt-1.5 pl-8 text-sm leading-relaxed ${s.muted}`}
                            >
                              {item.tagline}
                            </p>
                            {item.bullets && (
                              <ul className="mt-3 flex flex-wrap gap-1.5 pl-8">
                                {item.bullets.map((b) => (
                                  <li
                                    key={b}
                                    className={`rounded-full border px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider ${s.itemBorder}`}
                                  >
                                    {b}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <span
                            aria-hidden="true"
                            className={`shrink-0 text-lg transition-transform duration-300 group-hover/item:translate-x-1 ${s.arrow}`}
                          >
                            →
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
