import Image from "next/image";
import Reveal from "./Reveal";
import ThreadScene from "./ThreadScene";
import { REVIEW_SCREENSHOTS, TESTIMONIALS } from "@/lib/site";

function EmQuote({ text }: { text: string }) {
  const match = text.match(/^([\s\S]*?)(\S+?)([.?!…]*)$/);
  if (!match) return <>{text}</>;
  return (
    <>
      {match[1]}
      <em className="italic text-[#78efeb]">{match[2]}</em>
      {match[3]}
    </>
  );
}

export default function Reviews() {
  const lead = TESTIMONIALS.find((t) => t.lead) ?? TESTIMONIALS[0];
  const rest = TESTIMONIALS.filter((t) => t !== lead);

  return (
    <section
      id="reviews"
      aria-label="What founders say"
      className="relative overflow-hidden bg-navy py-24 text-white sm:py-32"
    >
      <ThreadScene color="#B9CBE4" alpha={0.1} rise={0.28} />
      <span className="marginalia !text-[#B9CBE4]">verbatim — client notes</span>
      <div className="container-x relative z-10">
        <Reveal>
          <span className="kicker text-[#78efeb]">What founders say</span>
        </Reveal>

        <Reveal delay={80}>
          <figure className="relative mt-10 max-w-4xl">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-4 -top-14 select-none font-display text-[10rem] italic leading-none text-white/10 sm:-left-10"
            >
              &ldquo;
            </span>
            <blockquote
              data-split
              className="split-parent relative font-display text-3xl font-medium leading-[1.2] tracking-tight text-balance sm:text-4xl md:text-[2.75rem]"
            >
              <EmQuote text={lead.quote} />
            </blockquote>
            <figcaption className="kicker mt-7 text-[#78efeb]">
              — {lead.name}, {lead.role}
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {rest.map((t, i) => (
            <Reveal key={t.quote} delay={i * 80}>
              <figure className="flex h-full flex-col rounded-lg border border-white/15 bg-white p-7 text-navy">
                <span
                  aria-hidden="true"
                  className="font-display text-4xl italic leading-none text-navy"
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

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {REVIEW_SCREENSHOTS.map((shot, i) => (
            <Reveal key={shot.src} delay={i * 70}>
              <figure className="group flex h-full flex-col overflow-hidden rounded-lg border border-white/15 bg-white text-navy shadow-[0_18px_36px_-16px_rgba(0,0,0,0.2)]">
                <div className="relative bg-navy px-4 pb-3 pt-3 text-white">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-navy via-[#78efeb] to-navy"
                  />
                  <div className="flex items-baseline justify-between font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[#B9CBE4]">
                    <span>Cybrix · Campaign Audit</span>
                    <span>№ {String(i + 1).padStart(2, "0")} / {String(REVIEW_SCREENSHOTS.length).padStart(2, "0")}</span>
                  </div>
                </div>

                <div className="border-b border-line bg-paper-2 px-4 py-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-base font-medium tracking-tight">
                      {shot.client}
                    </h3>
                    <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-muted">
                      {shot.vertical}
                    </span>
                  </div>
                  <p className="mt-1 font-display text-lg font-medium italic leading-tight text-navy">
                    {shot.result}
                  </p>
                </div>

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

                <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ink-soft">
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
                    className="flex items-center gap-1 text-navy"
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
