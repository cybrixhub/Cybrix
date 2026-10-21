import Reveal from "@/components/Reveal";
import Underlined from "@/components/Underlined";
import TornEdge from "@/components/TornEdge";
import BrandMark from "@/components/BrandMark";
import CaseStudies from "./CaseStudies";
import { CASE_STUDIES } from "@/lib/portfolio";

const SECTORS = Array.from(new Set(CASE_STUDIES.map((c) => c.sector)));
const REGIONS = Array.from(
  new Set(CASE_STUDIES.map((c) => c.region).filter((r): r is string => Boolean(r))),
);

/** PDF p. 16 (paid ads divider) + pp. 17–26 (real results). */
export default function PaidResults() {
  return (
    <>
      <TornEdge color="var(--color-navy)" className="-mb-px" />
      <section
        id="paid-ads"
        aria-labelledby="paid-title"
        className="relative overflow-hidden bg-navy py-24 text-white sm:py-32"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="bg-noise absolute inset-0 opacity-[0.06]" />
          <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3355A8]/35 blur-3xl" />
          <BrandMark className="absolute left-1/2 top-1/2 h-[80%] w-auto -translate-x-1/2 -translate-y-1/2 text-[#78efeb]/[0.06]" />
        </div>
        <span className="marginalia !text-[#B9CBE4]">vii · paid campaigns</span>

        <div className="container-x relative z-10 text-center">
          <Reveal>
            <span className="kicker text-[#78efeb]">Performance marketing</span>
          </Reveal>
          <h2
            id="paid-title"
            data-split
            className="split-parent mx-auto mt-5 max-w-3xl font-display text-5xl font-semibold tracking-tight text-balance sm:text-6xl md:text-7xl"
          >
            Paid Ad <Underlined>Campaigns</Underlined>
          </h2>
          <Reveal delay={120}>
            <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-[#B9CBE4] text-pretty">
              Meta ad campaigns across healthcare, home services and e-commerce —
              every figure below is taken from the campaign reports in our
              portfolio.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <dl className="mx-auto mt-12 grid max-w-2xl grid-cols-3 divide-x divide-white/15 rounded-xl border border-white/15 bg-white/[0.03]">
              <div className="px-3 py-5 sm:px-6">
                <dt className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[#B9CBE4] sm:text-[0.62rem]">
                  Campaigns
                </dt>
                <dd className="mt-1.5 font-display text-3xl font-semibold text-[#78efeb] sm:text-4xl">
                  {String(CASE_STUDIES.length).padStart(2, "0")}
                </dd>
              </div>
              <div className="px-3 py-5 sm:px-6">
                <dt className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[#B9CBE4] sm:text-[0.62rem]">
                  Sectors
                </dt>
                <dd className="mt-1.5 font-display text-3xl font-semibold text-[#78efeb] sm:text-4xl">
                  {String(SECTORS.length).padStart(2, "0")}
                </dd>
              </div>
              <div className="px-3 py-5 sm:px-6">
                <dt className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[#B9CBE4] sm:text-[0.62rem]">
                  Markets named
                </dt>
                <dd className="mt-2.5 font-display text-sm font-semibold leading-tight text-white sm:text-base">
                  {REGIONS.join(" · ")}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>
      <TornEdge color="var(--color-paper)" className="-mt-6 sm:-mt-7" />

      <section
        id="results"
        aria-labelledby="results-title"
        className="relative bg-paper pb-24 pt-16 sm:pb-32 sm:pt-20"
      >
        <span className="marginalia">viii · real results</span>
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Reveal>
                <span className="kicker text-navy">Real results</span>
              </Reveal>
              <h2
                id="results-title"
                data-split
                className="split-parent mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
              >
                Case studies, by the <Underlined>numbers</Underlined>.
              </h2>
            </div>
            <Reveal delay={100}>
              <p className="max-w-md text-base leading-relaxed text-ink-soft text-pretty">
                Figures appear exactly as reported. Where a metric wasn&rsquo;t
                reported, it&rsquo;s left out. Amounts marked R are shown in the
                currency of the original ad account.
              </p>
            </Reveal>
          </div>
          <div className="mt-12">
            <CaseStudies cases={CASE_STUDIES} />
          </div>
        </div>
      </section>
    </>
  );
}
