import Link from "next/link";
import { SERVICE_GROUPS } from "@/lib/site";
import BrandMark from "./BrandMark";

const PANEL_STYLES = [
  {
    // Growth plans — light editorial (the human, strategy-led work)
    section: "bg-paper text-ink",
    line: "border-line-strong",
    displayNumber: "text-navy",
    pagination: "text-navy",
    arrow: "text-[#3DB5B0]",
    muted: "text-ink-soft",
    itemBg: "bg-white",
    itemBorder: "border-line",
    itemHover: "hover:bg-paper-2",
    mark: "text-navy/[0.03]",
  },
  {
    // Automated systems — dark navy + teal (the tech, engine-led work)
    section: "bg-navy text-white",
    line: "border-white/15",
    displayNumber: "text-[#78efeb]",
    pagination: "text-[#78efeb]",
    arrow: "text-[#78efeb]",
    muted: "text-[#B9CBE4]",
    itemBg: "bg-navy-2",
    itemBorder: "border-[#78efeb]/25",
    itemHover: "hover:bg-[#1b2c60]",
    mark: "text-[#78efeb]/10",
  },
] as const;

export default function WhatWeDo() {
  return (
    <section id="services" aria-label="What we do">
      <h2 className="sr-only">What we do</h2>
      {SERVICE_GROUPS.map((group, i) => {
        const s = PANEL_STYLES[i % PANEL_STYLES.length];
        return (
          <article
            key={group.number}
            className={`chapter-shadow sticky top-0 flex min-h-svh flex-col justify-center ${s.section}`}
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="bg-noise absolute inset-0 opacity-[0.06]" />
              <BrandMark
                className={`absolute -right-[7%] top-1/2 z-0 h-[54vh] w-auto -translate-y-1/2 ${s.mark}`}
              />
              <div
                aria-hidden="true"
                className="js-panel-shade absolute inset-0 z-20 bg-black opacity-0"
              />
            </div>

            <div className="container-x relative z-10 py-8 md:py-16">
              <div
                className={`flex items-baseline justify-between border-b pb-3 md:pb-5 ${s.line}`}
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

              <div className="mt-4 grid gap-6 md:mt-10 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
                {/* Left — the group intro (desktop only; mobile shows items only) */}
                <div className="hidden md:block md:sticky md:top-24 md:self-start">
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
                        <div className="flex items-start justify-between gap-4 py-3">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-baseline gap-3">
                              <span
                                className={`font-mono text-[0.65rem] uppercase tracking-[0.16em] ${s.muted}`}
                              >
                                {String(idx + 1).padStart(2, "0")}
                              </span>
                              <h4 className="font-display text-lg font-medium tracking-tight md:text-xl">
                                {item.name}
                              </h4>
                            </div>
                            <p
                              className={`mt-1 pl-8 text-sm leading-relaxed line-clamp-1 md:line-clamp-none ${s.muted}`}
                            >
                              {item.tagline}
                            </p>
                          </div>
                          <span
                            aria-hidden="true"
                            className={`mt-1 shrink-0 text-base transition-transform duration-300 group-hover/item:translate-x-1 ${s.arrow}`}
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
