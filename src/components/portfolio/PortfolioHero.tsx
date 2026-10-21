import Image from "next/image";
import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import Reveal from "@/components/Reveal";
import Underlined from "@/components/Underlined";
import { SITE } from "@/lib/site";
import {
  CASE_STUDIES,
  CREATIVES,
  ECOSYSTEM_TIERS,
  PLATFORMS,
  PORTFOLIO_INTRO,
} from "@/lib/portfolio";

const STATS = [
  { value: ECOSYSTEM_TIERS.flat().length, label: "Core services" },
  { value: PLATFORMS.length, label: "Platforms managed" },
  { value: CASE_STUDIES.length, label: "Paid campaigns" },
];

/** Fanned creative plates — the three portrait-ish previews from pp. 14–15. */
const FAN = [
  { creative: CREATIVES[2], className: "left-0 top-10 -rotate-[7deg]" },
  { creative: CREATIVES[3], className: "right-0 top-16 rotate-[6deg]" },
  { creative: CREATIVES[1], className: "left-1/2 top-0 -translate-x-1/2 rotate-[-1deg] z-10" },
];

export default function PortfolioHero() {
  return (
    <section
      aria-labelledby="portfolio-title"
      className="relative overflow-hidden bg-navy pb-20 pt-32 text-white sm:pb-28 sm:pt-40"
    >
      {/* Decorative ground — static, behind content */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-noise absolute inset-0 opacity-[0.07]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="absolute -left-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-[#78efeb]/10 blur-3xl" />
        <div className="absolute -right-24 -top-24 h-[22rem] w-[22rem] rounded-full bg-[#3355A8]/40 blur-3xl" />
        <BrandMark className="absolute -right-[8%] bottom-[-10%] h-[70vh] w-auto text-[#78efeb]/[0.07]" />
      </div>
      <span className="marginalia !text-[#B9CBE4]">portfolio · social media</span>

      <div className="container-x relative z-10 grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <div>
          <Reveal>
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[#B9CBE4]"
            >
              <Link href="/" className="transition-colors hover:text-[#78efeb]">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-white">
                Portfolio
              </span>
            </nav>
          </Reveal>

          <h1
            id="portfolio-title"
            data-split
            className="split-parent mt-6 max-w-3xl font-display text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            Social Media Marketing <Underlined>Portfolio</Underlined>
          </h1>

          <Reveal delay={120}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#B9CBE4] text-pretty sm:text-xl">
              {PORTFOLIO_INTRO}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={SITE.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="book"
                className="btn-ink btn-press inline-flex items-center gap-2 bg-[#78efeb] px-6 py-3.5 text-sm font-semibold text-navy [--ink-fill:#ffffff]"
              >
                Book a strategy call
              </a>
              <a
                href="#results"
                className="group inline-flex items-center gap-2 border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-[#78efeb] hover:text-[#78efeb]"
              >
                See real results
                <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5">
                  ↓
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <dl className="mt-12 grid max-w-xl grid-cols-3 divide-x divide-white/15 border-y border-white/15">
              {STATS.map((s) => (
                <div key={s.label} className="px-3 py-4 first:pl-0 sm:px-5">
                  <dt className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[#B9CBE4] sm:text-[0.62rem]">
                    {s.label}
                  </dt>
                  <dd className="mt-1.5 font-display text-3xl font-semibold text-[#78efeb] sm:text-4xl">
                    {String(s.value).padStart(2, "0")}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Creative fan — real previews from the portfolio */}
        <Reveal delay={160} className="relative mx-auto hidden h-[26rem] w-full max-w-[30rem] sm:block">
          {FAN.map(({ creative, className }) => (
            <div
              key={creative.image}
              className={`absolute w-[58%] rounded-md bg-white p-2 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.55)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 ${className}`}
            >
              <Image
                src={creative.image}
                width={creative.width}
                height={creative.height}
                alt={creative.alt}
                sizes="(max-width: 1024px) 50vw, 280px"
                priority
                className="h-auto w-full rounded-[3px]"
              />
              <p className="px-1 pb-0.5 pt-2 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-ink-soft">
                {creative.title}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
