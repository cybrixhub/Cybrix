import Image from "next/image";
import Reveal from "./Reveal";
import ThreadScene from "./ThreadScene";
import { REVIEW_SCREENSHOTS, TESTIMONIALS } from "@/lib/site";

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

        {/* Real client results — mounted as editorial audit reports.
            Each dashboard sits inside a masthead + meta + citation frame
            so it reads like an official document, not a raw screenshot. */}
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {REVIEW_SCREENSHOTS.map((shot, i) => (
            <Reveal key={shot.src} delay={i * 70}>
              <figure className="group flex h-full flex-col overflow-hidden rounded-lg border border-cream/15 bg-paper-2 text-ink shadow-[0_18px_36px_-16px_rgba(0,0,0,0.55)]">
                {/* Masthead — dark bar, ledger-style number + amber rule */}
                <div className="relative bg-espresso px-4 pb-3 pt-3 text-cream">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-oxblood via-amber to-oxblood"
                  />
                  <div className="flex items-baseline justify-between font-mono text-[0.58rem] uppercase tracking-[0.18em] text-cream-soft">
                    <span>Cybrix · Campaign Audit</span>
                    <span>№ {String(i + 1).padStart(2, "0")} / {String(REVIEW_SCREENSHOTS.length).padStart(2, "0")}</span>
                  </div>
                </div>

                {/* Case meta — client, result, period */}
                <div className="border-b border-line-strong/60 bg-paper-2 px-4 py-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-base font-medium tracking-tight">
                      {shot.client}
                    </h3>
                    <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-muted">
                      {shot.vertical}
                    </span>
                  </div>
                  <p className="mt-1 font-display text-lg font-medium italic leading-tight text-oxblood-bright">
                    {shot.result}
                  </p>
                </div>

                {/* Dashboard plate — the actual screenshot */}
                <div className="relative aspect-[4/3] flex-1 overflow-hidden bg-white">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 380px"
                    quality={85}
                    className="object-contain object-top p-3 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </div>

                {/* Footer — source citation + verified stamp */}
                <div className="flex items-center justify-between gap-3 border-t border-line-strong/60 px-4 py-3 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ink-soft">
                  <span className="flex items-center gap-1.5">
                    <span aria-hidden="true" className="text-muted">Src /</span>
                    {shot.source}
                    {shot.period && (
                      <>
                        <span aria-hidden="true" className="text-muted">·</span>
                        <span>{shot.period}</span>
                      </>
                    )}
                  </span>
                  <span
                    className="flex items-center gap-1 text-oxblood-bright"
                    title="Verified from live account"
                  >
                    <span aria-hidden="true">✓</span>
                    Verified
                  </span>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
