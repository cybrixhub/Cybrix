import Link from "next/link";
import Reveal from "@/components/Reveal";
import Underlined from "@/components/Underlined";
import BrandMark from "@/components/BrandMark";
import { SITE } from "@/lib/site";

/** `id="book"` lets the header's "Book a call" anchor land here on this page. */
export default function TeamCta() {
  return (
    <section
      id="book"
      aria-labelledby="team-cta-title"
      className="relative overflow-hidden bg-navy py-24 text-white sm:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-noise absolute inset-0 opacity-[0.06]" />
        <div className="absolute -right-24 bottom-0 h-[22rem] w-[22rem] rounded-full bg-[#78efeb]/10 blur-3xl" />
        <BrandMark className="absolute -left-[6%] top-1/2 h-[56vh] w-auto -translate-y-1/2 text-[#78efeb]/[0.07]" />
      </div>
      <span className="marginalia !text-[#B9CBE4]">let&rsquo;s talk</span>

      <div className="container-x relative z-10 grid items-end gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <Reveal>
            <span className="kicker text-[#78efeb]">Work with us</span>
          </Reveal>
          <h2
            id="team-cta-title"
            data-split
            className="split-parent mt-5 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl"
          >
            Put this team on your <Underlined>growth</Underlined>.
          </h2>
          <Reveal delay={100}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#B9CBE4] text-pretty">
              Book a free 30-minute strategy call and meet the people who&rsquo;ll
              be working on your brand.
            </p>
          </Reveal>
        </div>
        <Reveal delay={160}>
          <div className="flex flex-wrap gap-3 lg:justify-end">
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
              href="/portfolio"
              className="inline-flex items-center gap-2 border border-white/30 px-7 py-4 text-sm font-semibold text-white transition-colors hover:border-[#78efeb] hover:text-[#78efeb]"
            >
              See our portfolio
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
