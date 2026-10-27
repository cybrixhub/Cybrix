import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import Reveal from "@/components/Reveal";
import Underlined from "@/components/Underlined";
import Portrait from "./Portrait";
import { RoleIcon } from "./RoleMotif";
import { TEAM } from "@/lib/team";

/**
 * Editorial hero: headline + the wider team on the left, the CEO's portrait
 * in a layered frame on the right. Decoration is static or very slow, sits
 * behind content, and every looping motion is gated by `motion-safe:`.
 */
export default function TeamHero() {
  const [ceo, ...rest] = TEAM;
  return (
    <section
      aria-labelledby="team-title"
      className="relative overflow-hidden bg-navy pb-24 pt-32 text-white sm:pb-32 sm:pt-40"
    >
      {/* Layered ground */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-noise absolute inset-0 opacity-[0.07]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:28px_28px] [mask-image:linear-gradient(105deg,black_20%,transparent_70%)]" />
        <div className="absolute -left-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-[#78efeb]/[0.09] blur-3xl motion-safe:animate-[tm-drift_20s_ease-in-out_infinite_alternate]" />
        <div className="absolute right-[-8rem] top-[-6rem] h-[30rem] w-[30rem] rounded-full bg-[#3355A8]/50 blur-3xl motion-safe:animate-[tm-drift_24s_ease-in-out_infinite_alternate-reverse]" />
        {/* Fine lines */}
        <div className="absolute inset-y-0 left-[58%] hidden w-px bg-gradient-to-b from-transparent via-white/10 to-transparent lg:block" />
        <div className="absolute inset-x-0 top-[62%] h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
      </div>
      <span className="marginalia !text-[#B9CBE4]">the people · cybrix</span>

      <div className="container-x relative z-10 grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        {/* Copy */}
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
                Team
              </span>
            </nav>
          </Reveal>

          <h1
            id="team-title"
            data-split
            className="split-parent mt-7 max-w-3xl font-display text-[2.8rem] font-semibold leading-[1] tracking-tight text-balance sm:text-6xl lg:text-[4.6rem]"
          >
            The People Behind <Underlined>Cybrix</Underlined>
          </h1>

          <Reveal delay={120}>
            <p className="mt-8 max-w-lg border-l-2 border-[#78efeb]/60 pl-5 text-lg leading-relaxed text-[#B9CBE4] text-pretty sm:text-xl">
              Different strengths. One vision. Building smarter digital
              experiences together.
            </p>
          </Reveal>

          {/* The wider team — so nobody reads as secondary */}
          <Reveal delay={200}>
            <ul className="mt-12 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4" aria-label="The team">
              {rest.map((m) => (
                <li key={m.key}>
                  <a
                    href="#team"
                    className="group flex flex-col gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] p-2 transition-colors duration-300 hover:border-[#78efeb]/50 hover:bg-white/[0.06]"
                  >
                    <Portrait member={m} sizes="140px" className="aspect-square rounded-lg" />
                    <span className="flex flex-col gap-1 px-0.5 pb-0.5">
                      <span className="break-words text-[0.74rem] font-semibold leading-snug text-white">
                        {m.name}
                      </span>
                      <span className="break-words text-[0.64rem] leading-snug text-[#78efeb]/90">
                        {m.role}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={260}>
            <a
              href="#team"
              className="group mt-10 inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-white/80 transition-colors hover:text-[#78efeb]"
            >
              Meet the full team
              <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
          </Reveal>
        </div>

        {/* CEO feature */}
        <Reveal delay={120} className="relative mx-auto w-full max-w-[26rem] lg:max-w-none">
          <div className="group relative">
            {/* Geometry behind the frame */}
            <div aria-hidden="true" className="pointer-events-none absolute -inset-10 sm:-inset-14">
              <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full text-[#78efeb]" fill="none" stroke="currentColor">
                <circle cx="200" cy="200" r="196" strokeOpacity="0.12" strokeDasharray="2 7" className="origin-center motion-safe:animate-[tm-spin_120s_linear_infinite]" />
                <circle cx="200" cy="200" r="170" strokeOpacity="0.08" />
                <path
                  d="M60 330 L200 60 L340 330 Z"
                  strokeOpacity="0.16"
                  strokeDasharray="900"
                  strokeDashoffset="900"
                  className="motion-safe:animate-[tm-draw_2.4s_0.4s_cubic-bezier(0.16,1,0.3,1)_forwards] motion-reduce:[stroke-dashoffset:0]"
                />
              </svg>
              <div className="absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#78efeb]/[0.12] blur-3xl" />
            </div>
            <BrandMark className="pointer-events-none absolute -right-6 -top-8 z-0 h-24 w-auto text-[#78efeb]/25" />

            {/* Offset plate + frame */}
            <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl border border-[#78efeb]/40" />
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-navy-2 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.65)]">
              <Portrait
                member={ceo}
                priority
                sizes="(max-width: 1024px) 90vw, 460px"
                className="aspect-[4/5]"
              />
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                <div>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#78efeb]">
                    {ceo.role} · Leadership
                  </p>
                  <p className="mt-1.5 font-display text-2xl font-semibold tracking-tight">
                    {ceo.name}
                  </p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/25 text-[#78efeb]">
                  <RoleIcon role={ceo.key} className="h-5 w-5" />
                </span>
              </div>
            </div>

            {/* Floating count chip */}
            <div className="absolute -left-4 top-8 z-10 rounded-xl border border-white/15 bg-navy/80 px-4 py-3 shadow-[0_18px_36px_-18px_rgba(0,0,0,0.6)] backdrop-blur-md motion-safe:animate-[tm-float_9s_ease-in-out_infinite] sm:-left-8">
              <p className="font-display text-2xl font-semibold leading-none text-[#78efeb]">
                {String(TEAM.length).padStart(2, "0")}
              </p>
              <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-[#B9CBE4]">
                Specialists · one team
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
