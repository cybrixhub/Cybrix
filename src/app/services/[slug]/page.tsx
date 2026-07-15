import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Underlined from "@/components/Underlined";
import TornEdge from "@/components/TornEdge";
import ServiceVideo from "@/components/ServiceVideo";
import {
  ALL_SERVICES,
  SERVICE_GROUPS,
  SITE,
  findService,
  findWork,
} from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return ALL_SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.tagline,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} — ${SITE.name}`,
      description: service.tagline,
      url: `${SITE.url}/services/${service.slug}`,
      type: "article",
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  const group = SERVICE_GROUPS.find((g) =>
    g.items.some((i) => i.slug === service.slug),
  );
  const positionInGroup = group?.items.findIndex((i) => i.slug === service.slug);
  const related = service.relatedCase ? findWork(service.relatedCase) : undefined;

  // Automated Systems (group 02) wear the logo's navy+teal; Growth Plans stay
  // warm. One accent object keeps the whole page committed to its temperature.
  const isTech = group?.number === "02";
  const a = isTech
    ? {
        tone: "teal" as const,
        link: "hover:text-teal-bright",
        name: "text-teal-bright",
        kicker: "text-teal-bright",
        num1: "text-teal-bright",
        num2: "text-teal",
        dot: "bg-teal-bright",
        seeHover: "group-hover:border-teal-bright group-hover:text-teal-bright",
        cta: "border-navy bg-navy text-cream shadow-[0_10px_20px_-8px_rgba(14,26,58,0.85)] [--ink-fill:var(--color-navy-2)]",
        procTorn: "var(--color-navy)",
        procSection: "bg-navy text-cream",
        procMarg: "!text-[#b9cbe4]",
        procCard: "border-teal/20 bg-navy-2 hover:bg-[#1b2c60]",
        procGhost: "text-teal/10",
        procText: "text-[#b9cbe4]",
        relPlate: "bg-navy",
        ctaBtn: "border-teal-bright bg-teal-bright text-navy [--ink-fill:#8ff0e0]",
        ctaSecHover: "hover:border-teal-bright hover:text-teal-bright",
      }
    : {
        tone: "amber" as const,
        link: "hover:text-amber",
        name: "text-oxblood-bright",
        kicker: "text-amber",
        num1: "text-oxblood-bright",
        num2: "text-amber",
        dot: "bg-oxblood-bright",
        seeHover: "group-hover:border-amber group-hover:text-amber",
        cta: "border-oxblood bg-oxblood text-[#f7efe4] shadow-[0_10px_20px_-8px_rgba(143,45,45,0.7)] [--ink-fill:var(--color-oxblood-deep)]",
        procTorn: "var(--color-oxblood)",
        procSection: "bg-oxblood text-[#f7efe4]",
        procMarg: "!text-[#eed9c8]/90",
        procCard: "border-[#f7efe4]/15 bg-[#7a2424] hover:bg-[#6d1e1e]",
        procGhost: "text-[#f7efe4]/10",
        procText: "text-[#eed9c8]/90",
        relPlate: "bg-oxblood",
        ctaBtn: "border-amber bg-amber text-espresso [--ink-fill:#e5b562]",
        ctaSecHover: "hover:border-amber hover:text-amber",
      };

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {/* Editorial hero — parchment, kicker, giant italic display */}
        <section
          aria-label={`${service.name} — overview`}
          className="relative overflow-hidden bg-paper pt-32 pb-24 text-ink sm:pt-40 sm:pb-32"
        >
          <span className="marginalia">
            {group?.kicker} · {String((positionInGroup ?? 0) + 1).padStart(2, "0")} / {String(group?.items.length ?? 0).padStart(2, "0")}
          </span>

          <div className="container-x">
            <Reveal>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
                <Link href="/#services" className={a.link}>
                  Services
                </Link>
                <span aria-hidden="true">/</span>
                <span className={a.name}>{service.name}</span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1
                data-split
                className="split-parent mt-6 max-w-4xl font-display text-5xl font-medium leading-[1.02] tracking-tight text-balance sm:text-6xl md:text-7xl"
              >
                {service.name.split(" ").slice(0, -1).join(" ")}{" "}
                <Underlined tone={a.tone}>
                  {service.name.split(" ").slice(-1)[0]}
                </Underlined>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-ink-soft sm:text-xl">
                {service.tagline}
              </p>
            </Reveal>

            {service.bullets && (
              <Reveal delay={200}>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {service.bullets.map((b) => (
                    <li
                      key={b}
                      className="rounded-full border border-line-strong bg-paper-2 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-ink-soft"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            <Reveal delay={260}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/#book"
                  data-cursor="book"
                  className={`btn-ink btn-press inline-flex items-center gap-2 border px-6 py-3 text-sm font-semibold ${a.cta}`}
                >
                  Book a strategy call
                </Link>
                <a
                  href="#deliverables"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-ink"
                >
                  <span className={`border-b border-ink/30 transition-colors ${a.seeHover}`}>
                    See what&rsquo;s included
                  </span>
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Service overview video — auto-plays on load; drop the file to activate */}
        <ServiceVideo slug={service.slug} name={service.name} />

        {/* Problem / Solution — split editorial spread on espresso */}
        {(service.problem || service.solution) && (
          <>
            <TornEdge color="var(--color-espresso)" className="-mb-px" />
            <section
              aria-label="Problem and solution"
              className="relative overflow-hidden bg-espresso py-24 text-cream sm:py-32"
            >
              <span className="marginalia !text-cream-soft">
                ch. i · the problem we solve
              </span>
              <div className="container-x relative z-10">
                <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
                  {service.problem && (
                    <Reveal>
                      <div>
                        <span
                          aria-hidden="true"
                          className={`font-display text-6xl font-medium italic leading-none sm:text-7xl ${a.num1}`}
                        >
                          01
                        </span>
                        <span className={`kicker mt-4 block ${a.kicker}`}>
                          The problem
                        </span>
                        <p className="mt-5 font-display text-2xl font-medium leading-[1.25] tracking-tight text-balance sm:text-3xl">
                          {service.problem}
                        </p>
                      </div>
                    </Reveal>
                  )}
                  {service.solution && (
                    <Reveal delay={100}>
                      <div>
                        <span
                          aria-hidden="true"
                          className={`font-display text-6xl font-medium italic leading-none sm:text-7xl ${a.num2}`}
                        >
                          02
                        </span>
                        <span className={`kicker mt-4 block ${a.kicker}`}>
                          What we do
                        </span>
                        <p className="mt-5 font-display text-2xl font-medium leading-[1.25] tracking-tight text-balance sm:text-3xl">
                          {service.solution}
                        </p>
                      </div>
                    </Reveal>
                  )}
                </div>
              </div>
            </section>
            <TornEdge color="var(--color-paper)" className="-mt-6 sm:-mt-7" />
          </>
        )}

        {/* Deliverables — editorial index */}
        {service.deliverables && service.deliverables.length > 0 && (
          <section
            id="deliverables"
            aria-label="Deliverables"
            className="relative bg-paper py-24 sm:py-32"
          >
            <span className="marginalia">index · what you get</span>
            <div className="container-x">
              <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                <div>
                  <Reveal>
                    <span className={`kicker ${a.name}`}>
                      Deliverables
                    </span>
                  </Reveal>
                  <Reveal delay={80}>
                    <h2
                      data-split
                      className="split-parent mt-4 font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl"
                    >
                      What you actually{" "}
                      <Underlined tone={a.tone}>get</Underlined>.
                    </h2>
                  </Reveal>
                  <Reveal delay={140}>
                    <p className="mt-5 max-w-md text-base leading-relaxed text-pretty text-ink-soft">
                      Every engagement runs on a fixed scope. No sneaky add-ons,
                      no month-two surprises.
                    </p>
                  </Reveal>
                </div>
                <ol className="self-start border-t border-line-strong">
                  {service.deliverables.map((item, idx) => (
                    <Reveal key={item} delay={idx * 40}>
                      <li className="group flex gap-5 border-b border-line py-5 transition-colors hover:bg-paper-2/60">
                        <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-lg font-medium leading-snug tracking-tight sm:text-xl">
                          {item}
                        </span>
                      </li>
                    </Reveal>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        )}

        {/* Process — numbered chapter cards on oxblood */}
        {service.process && service.process.length > 0 && (
          <>
            <TornEdge color={a.procTorn} className="-mb-px" />
            <section
              aria-label="Our process"
              className={`relative overflow-hidden py-24 sm:py-32 ${a.procSection}`}
            >
              <span className={`marginalia ${a.procMarg}`}>
                ch. ii · the method
              </span>
              <div className="container-x relative z-10">
                <div className="max-w-3xl">
                  <Reveal>
                    <span className={`kicker ${a.kicker}`}>The process</span>
                  </Reveal>
                  <Reveal delay={80}>
                    <h2
                      data-split
                      className="split-parent mt-4 font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl"
                    >
                      How we run it, week by week.
                    </h2>
                  </Reveal>
                </div>
                <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {service.process.map((step, idx) => (
                    <Reveal key={step.step} delay={idx * 60}>
                      <li className={`group relative h-full overflow-hidden rounded-md border p-6 transition-colors ${a.procCard}`}>
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none absolute -right-4 -top-3 select-none font-display text-8xl font-medium italic leading-none ${a.procGhost}`}
                        >
                          {step.step}
                        </span>
                        <span className={`relative font-mono text-[0.65rem] uppercase tracking-[0.18em] ${a.kicker}`}>
                          Step {step.step}
                        </span>
                        <h3 className="relative mt-3 font-display text-xl font-medium tracking-tight sm:text-2xl">
                          {step.title}
                        </h3>
                        <p className={`relative mt-3 text-sm leading-relaxed ${a.procText}`}>
                          {step.description}
                        </p>
                      </li>
                    </Reveal>
                  ))}
                </ol>
              </div>
            </section>
            <TornEdge color="var(--color-paper)" className="-mt-6 sm:-mt-7" />
          </>
        )}

        {/* Fit For + Related case — two-up parchment */}
        {(service.fitFor?.length || related) && (
          <section
            aria-label="Fit and related work"
            className="relative bg-paper py-24 sm:py-32"
          >
            <span className="marginalia">colophon · fit &amp; proof</span>
            <div className="container-x">
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
                {service.fitFor && service.fitFor.length > 0 && (
                  <Reveal>
                    <div className="h-full rounded-md border border-line-strong bg-paper-2 p-8 sm:p-10">
                      <span className={`kicker ${a.name}`}>Fit for</span>
                      <h3 className="mt-3 font-display text-2xl font-medium tracking-tight sm:text-3xl">
                        This is built for you if…
                      </h3>
                      <ul className="mt-6 space-y-3">
                        {service.fitFor.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-3 text-base leading-relaxed text-ink-soft"
                          >
                            <span
                              aria-hidden="true"
                              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${a.dot}`}
                            />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                )}

                {related && (
                  <Reveal delay={80}>
                    <Link
                      href={`/work/${related.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-md border border-line-strong bg-espresso text-cream transition-shadow hover:shadow-[0_20px_44px_-20px_rgba(36,30,22,0.65)]"
                    >
                      <div className={`relative overflow-hidden p-8 sm:p-10 ${a.relPlate}`}>
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -bottom-6 right-4 select-none font-display text-8xl font-medium italic leading-none text-[#f7efe4]/10"
                        >
                          {related.slug.charAt(0).toUpperCase()}
                        </span>
                        <span className={`kicker ${a.kicker}`}>Proof · case study</span>
                        <p className="mt-4 font-display text-3xl font-medium italic leading-tight text-[#f7efe4] sm:text-4xl">
                          {related.result}
                        </p>
                      </div>
                      <div className="flex flex-1 flex-col p-6 sm:p-8">
                        <h3 className="font-display text-xl font-medium tracking-tight sm:text-2xl">
                          {related.client}
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-cream-soft">
                          {related.summary}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-amber transition-transform group-hover:translate-x-1">
                          Read the case study →
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                )}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {service.faqs && service.faqs.length > 0 && (
          <section
            aria-label="Frequently asked questions"
            className="relative bg-paper-2 py-24 sm:py-32"
          >
            <span className="marginalia">appendix · questions</span>
            <div className="container-x">
              <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
                <div>
                  <Reveal>
                    <span className={`kicker ${a.name}`}>FAQ</span>
                  </Reveal>
                  <Reveal delay={80}>
                    <h2
                      data-split
                      className="split-parent mt-4 font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl"
                    >
                      Answered before you ask.
                    </h2>
                  </Reveal>
                </div>
                <ol className="self-start border-t border-line-strong">
                  {service.faqs.map((f, idx) => (
                    <Reveal key={f.question} delay={idx * 60}>
                      <li className="border-b border-line py-6">
                        <div className="flex items-start gap-4">
                          <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
                            Q · {String(idx + 1).padStart(2, "0")}
                          </span>
                          <h3 className="font-display text-xl font-medium leading-snug tracking-tight sm:text-2xl">
                            {f.question}
                          </h3>
                        </div>
                        <p className="mt-3 pl-[3.75rem] text-base leading-relaxed text-ink-soft">
                          {f.answer}
                        </p>
                      </li>
                    </Reveal>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        )}

        {/* Closing CTA — mirrors book section brevity */}
        <TornEdge color="var(--color-espresso)" className="-mb-px" />
        <section
          aria-label="Get started"
          className="relative overflow-hidden bg-espresso py-24 text-cream sm:py-28"
        >
          <div className="container-x relative z-10">
            <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
              <Reveal>
                <div>
                  <span className={`kicker ${a.kicker}`}>Ready to start?</span>
                  <h2
                    data-split
                    className="split-parent mt-4 font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl md:text-6xl"
                  >
                    Let&rsquo;s map your growth.
                  </h2>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-cream-soft sm:text-lg">
                    A free 30-minute strategy call on Google Meet. Come with
                    your goals; leave with a plan.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="flex flex-wrap gap-4 lg:justify-end">
                  <Link
                    href="/#book"
                    data-cursor="book"
                    className={`btn-ink btn-press inline-flex items-center gap-2 border px-6 py-3 text-sm font-semibold ${a.ctaBtn}`}
                  >
                    Book a call
                  </Link>
                  <Link
                    href="/#services"
                    className={`inline-flex items-center gap-2 border border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition-colors ${a.ctaSecHover}`}
                  >
                    ← All services
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
