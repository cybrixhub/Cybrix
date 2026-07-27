import Link from "next/link";
import Reveal from "./Reveal";
import Underlined from "./Underlined";
import { WORK, SITE } from "@/lib/site";

const COVERS = [
  {
    cover: "bg-navy",
    ink: "text-white",
    chip: "text-[#78efeb]",
    ghost: "text-[#78efeb]/10",
  },
  {
    cover: "bg-[#1B3D8F]",
    ink: "text-white",
    chip: "text-[#B9CBE4]",
    ghost: "text-white/10",
  },
  {
    cover: "bg-navy",
    ink: "text-white",
    chip: "text-[#78efeb]",
    ghost: "text-[#78efeb]/10",
  },
  {
    cover: "bg-[#0D2563]",
    ink: "text-white",
    chip: "text-[#78efeb]",
    ghost: "text-white/10",
  },
] as const;

function Peg({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute z-10 h-6 w-3.5 overflow-hidden rounded-[3px] bg-gradient-to-b from-[#78efeb] to-[#3DB5B0] shadow-[0_2px_3px_rgba(20,49,122,0.3)] ${className}`}
    >
      <span className="absolute bottom-0 left-1/2 top-[45%] w-[2px] -translate-x-1/2 bg-[#14317a]/40" />
      <span className="absolute left-1/2 top-1.5 h-1 w-1 -translate-x-1/2 rounded-full bg-[#14317a]/50" />
    </span>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative bg-paper py-24 sm:py-32">
      <span className="marginalia">index · selected work</span>
      <div className="container-x">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal>
              <span className="kicker text-navy">Selected work</span>
            </Reveal>
            <h2
              data-split
              className="split-parent mt-4 font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl"
            >
              Numbers we&apos;re <Underlined>proud</Underlined> of.
            </h2>
          </div>
          <Reveal delay={100}>
            <a
              href={SITE.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-ink"
            >
              <span className="border-b border-ink/30 transition-colors group-hover:border-navy group-hover:text-navy">
                Start yours
              </span>
              <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-16 sm:grid-cols-2">
          {WORK.map((project, i) => {
            const c = COVERS[i % COVERS.length];
            return (
              <Reveal key={project.client} delay={(i % 2) * 80}>
                <Link
                  href={`/work/${project.slug}`}
                  className="animate-sway relative block pt-12"
                  style={{ animationDelay: `${i * 0.9}s` }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-0 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#78efeb,#14317a_72%)] shadow-[0_2px_3px_rgba(20,49,122,0.35)]"
                  />
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 100 46"
                    preserveAspectRatio="none"
                    className="absolute inset-x-0 top-1 h-11 w-full"
                  >
                    <path
                      d="M50 4 Q27 33 5 44"
                      fill="none"
                      stroke="#14317a"
                      strokeOpacity="0.12"
                      strokeWidth="2.5"
                      vectorEffect="non-scaling-stroke"
                      transform="translate(0 1.5)"
                    />
                    <path
                      d="M50 4 Q73 33 95 44"
                      fill="none"
                      stroke="#14317a"
                      strokeOpacity="0.12"
                      strokeWidth="2.5"
                      vectorEffect="non-scaling-stroke"
                      transform="translate(0 1.5)"
                    />
                    <path
                      d="M50 4 Q27 33 5 44"
                      fill="none"
                      stroke="#14317a"
                      strokeWidth="1.6"
                      strokeOpacity="0.4"
                      strokeDasharray="5 1.5"
                      vectorEffect="non-scaling-stroke"
                    />
                    <path
                      d="M50 4 Q73 33 95 44"
                      fill="none"
                      stroke="#14317a"
                      strokeWidth="1.6"
                      strokeOpacity="0.4"
                      strokeDasharray="5 1.5"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                  <Peg className="left-[4%] top-9 -rotate-6" />
                  <Peg className="right-[4%] top-9 rotate-6" />

                  <article
                    data-cursor="view"
                    style={{ rotate: i % 2 ? "1deg" : "-1.2deg" }}
                    className="hover-swing group flex h-full flex-col overflow-hidden rounded-[4px] border border-line-strong bg-white p-2.5 shadow-[0_20px_40px_-20px_rgba(20,49,122,0.15)] transition-shadow duration-300 hover:shadow-[0_30px_50px_-20px_rgba(20,49,122,0.22)]"
                  >
                    <div
                      className={`relative overflow-hidden rounded-[2px] px-7 pb-8 pt-6 ${c.cover}`}
                    >
                      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.08]" />
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute -bottom-7 right-3 select-none font-display text-[7.5rem] font-medium italic leading-none ${c.ghost}`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="relative flex items-baseline justify-between">
                        <span
                          className={`font-mono text-[0.65rem] uppercase tracking-[0.18em] ${c.chip}`}
                        >
                          Case {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`font-mono text-[0.65rem] uppercase tracking-[0.18em] ${c.chip}`}
                        >
                          {project.category}
                        </span>
                      </div>
                      <p
                        className={`relative mt-6 font-display text-4xl font-medium italic leading-tight transition-transform duration-300 group-hover:-translate-y-0.5 sm:text-[2.6rem] ${c.ink}`}
                      >
                        {project.result}
                      </p>
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h3 className="font-display text-2xl font-medium tracking-tight text-navy">
                        {project.client}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                        {project.summary}
                      </p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-line-strong px-3 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-ink-soft"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 flex items-center justify-between border-t border-line pt-3 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                        <span>Cybrix studio · print {i + 1}/{WORK.length}</span>
                        <span
                          aria-hidden="true"
                          className="transition-colors group-hover:text-navy"
                        >
                          View case →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-8 text-center font-mono text-xs uppercase tracking-[0.14em] text-muted">
          Verified from live ad accounts · click any print for the full case
        </p>
      </div>
    </section>
  );
}
