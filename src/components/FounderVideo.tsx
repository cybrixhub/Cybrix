import Reveal from "./Reveal";
import { FOUNDER } from "@/lib/site";

/**
 * "From the founder" — an editorial video plate. Ships as a styled
 * placeholder; drop `founder-intro.mp4` into /public and swap the inner
 * div for a <video> element when ready.
 */
export default function FounderVideo() {
  return (
    <section
      id="founder"
      aria-label="From the founder"
      className="relative bg-paper py-20 sm:py-28"
    >
      <span className="marginalia">fig. 01 — the founder</span>
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Reveal>
              <span className="kicker text-oxblood-bright">{FOUNDER.kicker}</span>
            </Reveal>
            <h2
              data-split
              className="split-parent mt-4 font-display text-3xl font-medium leading-snug tracking-tight text-balance sm:text-4xl"
            >
              Two minutes on how we <em className="italic">actually</em> think
              about growth.
            </h2>
            <Reveal delay={120}>
              <p className="mt-5 font-display italic text-muted">
                — {FOUNDER.name}, {FOUNDER.role}
              </p>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <figure className="group" data-cursor="play">
              {/* Mono chrome bar */}
              <div className="flex items-center justify-between rounded-t-lg border border-b-0 border-line-strong bg-blush px-4 py-2.5">
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full bg-oxblood"
                  />
                  <span className="kicker text-ink-soft">{FOUNDER.file}</span>
                </span>
                <span className="kicker text-ink-soft">{FOUNDER.duration}</span>
              </div>
              {/* Video plate — swap for <video> when the file exists */}
              <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-b-lg border border-line-strong bg-espresso">
                <div className="bg-grain absolute inset-0 opacity-20" />
                <div className="relative flex flex-col items-center gap-4">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-[#f7efe4] text-espresso transition-transform duration-300 group-hover:scale-110">
                    <svg
                      width="18"
                      height="20"
                      viewBox="0 0 18 20"
                      aria-hidden="true"
                    >
                      <path d="M1 1.5 L17 10 L1 18.5 Z" fill="currentColor" />
                    </svg>
                  </span>
                  <span className="kicker text-cream-soft">
                    Drop in your founder video
                  </span>
                </div>
              </div>
              <figcaption className="sr-only">
                Founder introduction video, {FOUNDER.duration}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
