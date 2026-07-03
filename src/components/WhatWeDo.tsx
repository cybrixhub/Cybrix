import { FLAGSHIPS } from "@/lib/site";

const PANEL_STYLES = [
  {
    section: "bg-espresso text-cream",
    line: "border-espresso-line",
    displayNumber: "text-oxblood-bright", // large text only (≥3:1 on espresso)
    pagination: "text-amber", // small text needs 4.5:1 on espresso
    arrow: "text-amber",
    muted: "text-cream-soft",
  },
  {
    section: "bg-oxblood text-[#f7efe4]",
    line: "border-[#f7efe4]/20",
    displayNumber: "text-[#f7efe4]",
    pagination: "text-[#f7efe4]",
    arrow: "text-[#e8c9b4]",
    muted: "text-[#eed9c8]/90",
  },
] as const;

/**
 * "What we do" — the lock section. Each chapter is a full-viewport sticky
 * panel; scrolling turns the page, the next chapter sliding over the last
 * (CSS sticky) while GSAP dims and settles the outgoing page.
 */
export default function WhatWeDo() {
  return (
    <section id="services" aria-label="What we do">
      <h2 className="sr-only">What we do</h2>
      {FLAGSHIPS.map((flagship, i) => {
        const s = PANEL_STYLES[i % PANEL_STYLES.length];
        return (
          <article
            key={flagship.number}
            className={`chapter-shadow sticky top-0 flex min-h-svh flex-col justify-center overflow-hidden ${s.section}`}
          >
            <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.06]" />
            {/* page-turn shade (driven by SmoothScroll) */}
            <div
              aria-hidden="true"
              className="js-panel-shade pointer-events-none absolute inset-0 z-20 bg-black opacity-0"
            />

            <div className="container-x relative z-10 py-24">
              <div
                className={`flex items-baseline justify-between border-b pb-5 ${s.line}`}
              >
                <span className="kicker">What we do</span>
                <span className="font-mono text-sm">
                  <span className={s.pagination}>{flagship.number}</span>
                  <span className={s.muted}>
                    {" "}
                    / {String(FLAGSHIPS.length).padStart(2, "0")}
                  </span>
                </span>
              </div>

              <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
                <div>
                  <span
                    aria-hidden="true"
                    className={`font-display text-7xl font-medium italic sm:text-8xl ${s.displayNumber}`}
                  >
                    {flagship.number}
                  </span>
                  <h3 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl">
                    {flagship.title}
                  </h3>
                  <p
                    className={`mt-6 max-w-xl text-lg leading-relaxed text-pretty ${s.muted}`}
                  >
                    {flagship.description}
                  </p>
                </div>

                <ul className={`self-end border-t ${s.line}`}>
                  {flagship.points.map((point) => (
                    <li
                      key={point}
                      className={`flex items-center gap-4 border-b py-4 ${s.line}`}
                    >
                      <span aria-hidden="true" className={s.arrow}>
                        →
                      </span>
                      <span className="text-base font-medium">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
