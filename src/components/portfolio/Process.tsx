import Reveal from "@/components/Reveal";
import Underlined from "@/components/Underlined";
import TornEdge from "@/components/TornEdge";
import ServiceTabs from "./ServiceTabs";
import { STRATEGY, SUPPORT_SERVICES } from "@/lib/portfolio";

/** PDF p. 4 (strategy steps) + pp. 5–11 (supporting services). */
export default function Process() {
  return (
    <>
      <section
        id="process"
        aria-labelledby="process-title"
        className="relative overflow-hidden bg-navy py-24 text-white sm:py-32"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="bg-noise absolute inset-0 opacity-[0.06]" />
          <div className="absolute -right-32 top-10 h-[26rem] w-[26rem] rounded-full bg-[#78efeb]/[0.08] blur-3xl" />
        </div>
        <span className="marginalia !text-[#B9CBE4]">iii · our process</span>

        <div className="container-x relative z-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Reveal>
                <span className="kicker text-[#78efeb]">Our process</span>
              </Reveal>
              <h2
                id="process-title"
                data-split
                className="split-parent mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl"
              >
                {STRATEGY.title}
              </h2>
            </div>
            <Reveal delay={100}>
              <p className="max-w-sm text-lg leading-relaxed text-[#B9CBE4] text-pretty">
                {STRATEGY.lead}
              </p>
            </Reveal>
          </div>

          <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STRATEGY.steps.map((step, i) => (
              <Reveal key={step} as="li" delay={(i % 3) * 70}>
                <div className="group relative flex h-full min-h-[11rem] flex-col justify-between overflow-hidden rounded-xl border border-white/12 bg-navy-2/70 p-6 transition-colors duration-500 hover:border-[#78efeb]/50 sm:p-7">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-6 right-2 select-none font-display text-[7rem] font-semibold leading-none text-white/[0.04] transition-colors duration-500 group-hover:text-[#78efeb]/[0.08]"
                  >
                    {i + 1}
                  </span>
                  <span className="relative inline-flex w-fit items-center gap-2 rounded-full bg-[#78efeb]/12 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[#78efeb]">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="relative mt-8 font-display text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl">
                    {step}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
      <TornEdge color="var(--color-paper-2)" className="-mt-6 sm:-mt-7" />

      <section
        aria-labelledby="services-title"
        className="relative bg-paper-2 pb-24 pt-16 sm:pb-32 sm:pt-20"
      >
        <span className="marginalia">iv · services</span>
        <div className="container-x">
          <div className="max-w-2xl">
            <Reveal>
              <span className="kicker text-navy">Supporting services</span>
            </Reveal>
            <h2
              id="services-title"
              data-split
              className="split-parent mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
            >
              Strategy, <Underlined>put to work</Underlined>.
            </h2>
            <Reveal delay={100}>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft text-pretty">
                Seven services carry the strategy into day-to-day execution.
                Pick one to see what&rsquo;s included.
              </p>
            </Reveal>
          </div>
          <Reveal delay={60} className="mt-12">
            <ServiceTabs services={SUPPORT_SERVICES} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
