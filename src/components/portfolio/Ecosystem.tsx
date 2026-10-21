import Reveal from "@/components/Reveal";
import Underlined from "@/components/Underlined";
import { ECOSYSTEM_TIERS } from "@/lib/portfolio";

/** PDF p. 2 — the social media ecosystem, drawn as a tiered growth tree. */
/** Running 01–08 numbering across tiers. */
const TIER_OFFSETS = ECOSYSTEM_TIERS.map((_, t) =>
  ECOSYSTEM_TIERS.slice(0, t).reduce((sum, tier) => sum + tier.length, 0),
);

export default function Ecosystem() {
  return (
    <section
      id="what-we-do"
      aria-labelledby="ecosystem-title"
      className="relative overflow-hidden bg-paper py-24 sm:py-32"
    >
      <span className="marginalia">i · what we do</span>
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div>
            <Reveal>
              <span className="kicker text-navy">What we do</span>
            </Reveal>
            <h2
              id="ecosystem-title"
              data-split
              className="split-parent mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl"
            >
              A complete social media <Underlined>ecosystem</Underlined>
            </h2>
          </div>
          <Reveal delay={100}>
            <p className="max-w-md text-lg leading-relaxed text-ink-soft text-pretty">
              Built for brands that want consistent growth — every layer
              supports the one above it, all the way up to strategy.
            </p>
          </Reveal>
        </div>

        <Reveal delay={80} className="mt-12">
          <div className="relative overflow-hidden rounded-xl border border-line-strong bg-paper-2 px-4 py-10 sm:px-8 sm:py-12">
            <div
              aria-hidden="true"
              className="bg-grain pointer-events-none absolute inset-0"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-6 bottom-6 w-px -translate-x-1/2 bg-gradient-to-b from-[#78efeb] via-navy/25 to-transparent"
            />
            <ol className="relative flex flex-col items-center gap-7">
              {ECOSYSTEM_TIERS.map((tier, t) => (
                <li key={t} className="w-full">
                  <ul className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
                    {tier.map((item, i) => {
                      const n = TIER_OFFSETS[t] + i + 1;
                      const top = t === 0;
                      return (
                        <li
                          key={item}
                          className={`relative inline-flex items-center gap-2.5 rounded-2xl border sm:rounded-full px-4 py-2.5 text-sm font-semibold shadow-[0_8px_20px_-14px_rgba(20,49,122,0.45)] transition-transform duration-300 hover:-translate-y-0.5 sm:px-5 sm:text-[0.95rem] ${
                            top
                              ? "border-navy bg-navy text-white"
                              : "border-line-strong bg-white text-navy"
                          }`}
                        >
                          <span
                            className={`font-mono text-[0.6rem] tracking-[0.12em] ${
                              top ? "text-[#78efeb]" : "text-[#3DB5B0]"
                            }`}
                          >
                            {String(n).padStart(2, "0")}
                          </span>
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ol>
            <p className="relative mt-9 text-center font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
              ↑ Each layer builds toward strategy-led growth
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
