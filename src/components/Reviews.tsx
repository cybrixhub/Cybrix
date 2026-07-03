import Reveal from "./Reveal";
import ThreadScene from "./ThreadScene";
import { TESTIMONIALS } from "@/lib/site";

/** Renders a quote with its final word set in italic amber. */
function EmQuote({ text }: { text: string }) {
  const match = text.match(/^([\s\S]*?)(\S+?)([.?!…]*)$/);
  if (!match) return <>{text}</>;
  return (
    <>
      {match[1]}
      <em className="italic text-amber">{match[2]}</em>
      {match[3]}
    </>
  );
}

/** What founders say — an espresso plate with parchment quote cards. */
export default function Reviews() {
  const lead = TESTIMONIALS.find((t) => t.lead) ?? TESTIMONIALS[0];
  const rest = TESTIMONIALS.filter((t) => t !== lead);

  return (
    <section
      id="reviews"
      aria-label="What founders say"
      className="relative overflow-hidden bg-espresso py-24 text-cream sm:py-32"
    >
      <ThreadScene color="#f2ecdd" alpha={0.1} rise={0.28} />
      <span className="marginalia !text-cream-soft">verbatim — client notes</span>
      <div className="container-x relative z-10">
        <Reveal>
          <span className="kicker text-amber">What founders say</span>
        </Reveal>

        {/* Lead pull-quote */}
        <Reveal delay={80}>
          <figure className="relative mt-10 max-w-4xl">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-4 -top-14 select-none font-display text-[10rem] italic leading-none text-cream/10 sm:-left-10"
            >
              &ldquo;
            </span>
            <blockquote
              data-split
              className="split-parent relative font-display text-3xl font-medium leading-[1.2] tracking-tight text-balance sm:text-4xl md:text-[2.75rem]"
            >
              <EmQuote text={lead.quote} />
            </blockquote>
            <figcaption className="kicker mt-7 text-[#cfe0d3]">
              — {lead.name}, {lead.role}
            </figcaption>
          </figure>
        </Reveal>

        {/* Supporting quote cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {rest.map((t, i) => (
            <Reveal key={t.quote} delay={i * 80}>
              <figure className="flex h-full flex-col rounded-lg border border-cream/15 bg-paper p-7 text-ink">
                <span
                  aria-hidden="true"
                  className="font-display text-4xl italic leading-none text-oxblood-bright"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-3 flex-1 font-display text-xl italic leading-relaxed text-ink-soft">
                  {t.quote}
                </blockquote>
                <figcaption className="kicker mt-5 border-t border-line pt-4 text-muted">
                  {t.name} · {t.role}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Screenshot plates */}
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Reveal key={i} delay={i * 70}>
              <div className="flex aspect-[4/3] items-center justify-center rounded-lg border border-dashed border-cream/40 p-6 text-center">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] leading-relaxed text-cream">
                  Client results screenshot
                  <br />— drag &amp; drop later
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
