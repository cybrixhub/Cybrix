import Link from "next/link";
import Reveal from "@/components/Reveal";
import Underlined from "@/components/Underlined";
import BrandMark from "@/components/BrandMark";
import { SITE } from "@/lib/site";
import { PORTFOLIO_CTA } from "@/lib/portfolio";

/**
 * PDF p. 27. `id="book"` lets the header's "Book a call" anchor land here on
 * this page, the same way it lands on the booking section on the homepage.
 */
export default function PortfolioCta() {
  return (
    <section
      id="book"
      aria-labelledby="cta-title"
      className="relative overflow-hidden bg-navy py-28 text-white sm:py-36"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-noise absolute inset-0 opacity-[0.06]" />
        <div className="absolute -left-24 bottom-0 h-[24rem] w-[24rem] rounded-full bg-[#78efeb]/10 blur-3xl" />
        <BrandMark className="absolute -right-[6%] top-1/2 h-[64vh] w-auto -translate-y-1/2 text-[#78efeb]/[0.08]" />
      </div>
      <span className="marginalia !text-[#B9CBE4]">ix · let&rsquo;s talk</span>

      <div className="container-x relative z-10 max-w-4xl text-center">
        <Reveal>
          <span className="kicker text-[#78efeb]">{PORTFOLIO_CTA.question}</span>
        </Reveal>
        <h2
          id="cta-title"
          data-split
          className="split-parent mx-auto mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl"
        >
          Let&rsquo;s Build Your Social <Underlined>Presence</Underlined>
        </h2>
        <Reveal delay={120}>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-[#B9CBE4] text-pretty sm:text-xl">
            {PORTFOLIO_CTA.copy}
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href={SITE.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="book"
              className="btn-ink btn-press inline-flex items-center gap-2 bg-[#78efeb] px-7 py-4 text-sm font-semibold text-navy [--ink-fill:#ffffff]"
            >
              Book a strategy call
            </a>
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 border border-white/30 px-7 py-4 text-sm font-semibold text-white transition-colors hover:border-[#78efeb] hover:text-[#78efeb]"
            >
              Explore our services
            </Link>
          </div>
        </Reveal>
        <Reveal delay={260}>
          <p className="mt-6 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#B9CBE4]">
            Free 30-minute call · Google Meet
          </p>
        </Reveal>
      </div>
    </section>
  );
}
