import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Underlined from "@/components/Underlined";
import TornEdge from "@/components/TornEdge";
import { WORK, SITE, findWork, findService } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return WORK.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = findWork(slug);
  if (!project) return {};
  return {
    title: `${project.client} — ${project.result}`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.client} · Case study — ${SITE.name}`,
      description: project.summary,
      url: `${SITE.url}/work/${project.slug}`,
      type: "article",
      images: project.screenshots?.length
        ? [{ url: project.screenshots[0] }]
        : undefined,
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = findWork(slug);
  if (!project) notFound();

  const idx = WORK.findIndex((w) => w.slug === project.slug);
  const otherCases = WORK.filter((w) => w.slug !== project.slug).slice(0, 2);
  const linkedServices = (project.services ?? [])
    .map((s) => findService(s))
    .filter((s): s is NonNullable<ReturnType<typeof findService>> => Boolean(s));

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {/* Editorial masthead hero */}
        <section
          aria-label={`${project.client} — case overview`}
          className="relative overflow-hidden bg-paper pt-32 pb-16 text-ink sm:pt-40 sm:pb-24"
        >
          <span className="marginalia">
            case {String(idx + 1).padStart(2, "0")} / {String(WORK.length).padStart(2, "0")}
          </span>

          <div className="container-x">
            <Reveal>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
                <Link href="/#work" className="hover:text-navy">
                  Work
                </Link>
                <span aria-hidden="true">/</span>
                <span className="text-navy">{project.client}</span>
              </div>
            </Reveal>

            <div className="mt-6 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
              <div>
                <Reveal delay={60}>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                      {project.category}
                    </span>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line-strong px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-ink-soft"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={100}>
                  <h1
                    data-split
                    className="split-parent mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.02] tracking-tight text-balance sm:text-5xl md:text-6xl"
                  >
                    {project.client}.
                  </h1>
                </Reveal>

                <Reveal delay={160}>
                  <p className="mt-5 max-w-2xl font-display text-2xl italic leading-tight text-navy sm:text-3xl">
                    <Underlined>{project.result}</Underlined>
                  </p>
                </Reveal>

                <Reveal delay={220}>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-ink-soft">
                    {project.summary}
                  </p>
                </Reveal>
              </div>

              {/* Case ID plate — masthead style */}
              <Reveal delay={80}>
                <div className="rounded-md border border-line-strong bg-paper-2 shadow-[0_18px_36px_-20px_rgba(20,49,122,0.2)]">
                  <div className="relative bg-navy px-5 pb-3 pt-3 text-white">
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-navy via-[#78efeb] to-navy"
                    />
                    <div className="flex items-baseline justify-between font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#B9CBE4]">
                      <span>Cybrix · Case Print</span>
                      <span>
                        № {String(idx + 1).padStart(2, "0")} /{" "}
                        {String(WORK.length).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <dl className="divide-y divide-line px-5 py-5 font-mono text-[0.72rem] uppercase tracking-[0.14em]">
                    <div className="flex items-baseline justify-between gap-4 py-2.5">
                      <dt className="text-muted">Client</dt>
                      <dd className="text-right text-ink">{project.client}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 py-2.5">
                      <dt className="text-muted">Vertical</dt>
                      <dd className="text-right text-ink">{project.category}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 py-2.5">
                      <dt className="text-muted">Headline</dt>
                      <dd className="text-right font-display text-sm italic normal-case tracking-normal text-navy">
                        {project.result}
                      </dd>
                    </div>
                    {linkedServices.length > 0 && (
                      <div className="flex items-baseline justify-between gap-4 py-2.5">
                        <dt className="text-muted">Services</dt>
                        <dd className="text-right text-ink normal-case tracking-normal">
                          {linkedServices.map((s) => s.name).join(", ")}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Metrics band — pulled numbers in ledger grid */}
        {project.metrics && project.metrics.length > 0 && (
          <>
            <TornEdge color="var(--color-navy)" className="-mb-px" />
            <section
              aria-label="Metrics"
              className="relative overflow-hidden bg-navy py-20 text-white sm:py-28"
            >
              <span className="marginalia !text-[#B9CBE4]">
                ledger · verified numbers
              </span>
              <div className="container-x relative z-10">
                <Reveal>
                  <span className="kicker text-[#78efeb]">The numbers</span>
                </Reveal>
                <Reveal delay={80}>
                  <h2
                    data-split
                    className="split-parent mt-4 max-w-3xl font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl"
                  >
                    Straight from Ads Manager.
                  </h2>
                </Reveal>

                <ul className="mt-12 grid gap-px overflow-hidden rounded-md border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
                  {project.metrics.map((m, i) => (
                    <Reveal key={m.label} delay={i * 40}>
                      <li className="flex h-full flex-col justify-between gap-4 bg-navy p-6 sm:p-8">
                        <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#B9CBE4]">
                          {m.label}
                        </span>
                        <span className="font-display text-4xl font-medium italic leading-none text-[#78efeb] sm:text-5xl">
                          {m.value}
                        </span>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </section>
            <TornEdge color="var(--color-paper)" className="-mt-6 sm:-mt-7" />
          </>
        )}

        {/* Challenge / Approach — editorial spread */}
        {(project.challenge || project.approach) && (
          <section
            aria-label="Challenge and approach"
            className="relative bg-paper py-24 sm:py-32"
          >
            <span className="marginalia">ch. i · the work</span>
            <div className="container-x">
              <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
                {project.challenge && (
                  <Reveal>
                    <div>
                      <span
                        aria-hidden="true"
                        className="font-display text-6xl font-medium italic leading-none text-navy sm:text-7xl"
                      >
                        01
                      </span>
                      <span className="kicker mt-4 block text-navy">
                        Challenge
                      </span>
                      <p className="mt-5 font-display text-xl font-medium leading-[1.35] tracking-tight text-balance text-ink sm:text-2xl">
                        {project.challenge}
                      </p>
                    </div>
                  </Reveal>
                )}
                {project.approach && (
                  <Reveal delay={100}>
                    <div>
                      <span
                        aria-hidden="true"
                        className="font-display text-6xl font-medium italic leading-none text-[#78efeb] sm:text-7xl"
                      >
                        02
                      </span>
                      <span className="kicker mt-4 block text-navy">
                        Approach
                      </span>
                      <p className="mt-5 font-display text-xl font-medium leading-[1.35] tracking-tight text-balance text-ink sm:text-2xl">
                        {project.approach}
                      </p>
                    </div>
                  </Reveal>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Screenshots — official-audit framed dashboards */}
        {project.screenshots && project.screenshots.length > 0 && (
          <section
            aria-label="Campaign audit"
            className="relative bg-paper-2 py-24 sm:py-32"
          >
            <span className="marginalia">exhibit · dashboard evidence</span>
            <div className="container-x">
              <div className="max-w-3xl">
                <Reveal>
                  <span className="kicker text-navy">
                    Campaign audit
                  </span>
                </Reveal>
                <Reveal delay={80}>
                  <h2
                    data-split
                    className="split-parent mt-4 font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl"
                  >
                    Straight from the live account.
                  </h2>
                </Reveal>
              </div>

              <div className="mt-12 grid gap-6 sm:grid-cols-2">
                {project.screenshots.map((src, i) => (
                  <Reveal key={src} delay={i * 80}>
                    <figure className="group flex h-full flex-col overflow-hidden rounded-lg border border-line-strong bg-paper text-ink shadow-[0_18px_36px_-16px_rgba(20,49,122,0.15)]">
                      <div className="relative bg-navy px-4 pb-3 pt-3 text-white">
                        <div
                          aria-hidden="true"
                          className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-navy via-[#78efeb] to-navy"
                        />
                        <div className="flex items-baseline justify-between font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[#B9CBE4]">
                          <span>Cybrix · Campaign Audit</span>
                          <span>
                            Ex. {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                      <div className="border-b border-line px-4 py-4">
                        <div className="flex items-baseline justify-between gap-3">
                          <h3 className="font-display text-base font-medium tracking-tight">
                            {project.client}
                          </h3>
                          <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-muted">
                            {project.category}
                          </span>
                        </div>
                        <p className="mt-1 font-display text-lg font-medium italic leading-tight text-navy">
                          {project.result}
                        </p>
                      </div>
                      <div className="relative aspect-[4/3] flex-1 overflow-hidden bg-white">
                        <Image
                          src={src}
                          alt={`${project.client} campaign dashboard — ${project.result}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
                          quality={85}
                          className="object-contain object-top p-3 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ink-soft">
                        <span className="flex items-center gap-1.5">
                          <span aria-hidden="true" className="text-muted">
                            Src /
                          </span>
                          Meta Ads Manager
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
        )}

        {/* Services used — link back into service pages */}
        {linkedServices.length > 0 && (
          <section
            aria-label="Services used"
            className="relative bg-paper py-24 sm:py-32"
          >
            <span className="marginalia">colophon · services applied</span>
            <div className="container-x">
              <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
                <div>
                  <Reveal>
                    <span className="kicker text-navy">
                      Services used
                    </span>
                  </Reveal>
                  <Reveal delay={80}>
                    <h2
                      data-split
                      className="split-parent mt-4 font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl"
                    >
                      The playbooks{" "}
                      <Underlined>we ran</Underlined>.
                    </h2>
                  </Reveal>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {linkedServices.map((s, i) => (
                    <Reveal key={s.slug} delay={i * 60}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="group flex h-full flex-col justify-between rounded-md border border-line-strong bg-paper-2 p-6 transition-colors hover:border-navy sm:p-7"
                      >
                        <div>
                          <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                            Growth playbook
                          </span>
                          <h3 className="mt-2 font-display text-xl font-medium tracking-tight sm:text-2xl">
                            {s.name}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                            {s.tagline}
                          </p>
                        </div>
                        <span
                          aria-hidden="true"
                          className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-navy transition-transform group-hover:translate-x-1"
                        >
                          See the service →
                        </span>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Other cases + CTA */}
        <TornEdge color="var(--color-navy)" className="-mb-px" />
        <section
          aria-label="More work and next steps"
          className="relative overflow-hidden bg-navy py-24 text-white sm:py-28"
        >
          <div className="container-x relative z-10">
            {otherCases.length > 0 && (
              <div className="mb-16">
                <Reveal>
                  <span className="kicker text-[#78efeb]">More work</span>
                </Reveal>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {otherCases.map((c, i) => (
                    <Reveal key={c.slug} delay={i * 80}>
                      <Link
                        href={`/work/${c.slug}`}
                        className="group flex h-full flex-col rounded-md border border-white/15 bg-[#1B3D8F] p-6 transition-colors hover:border-[#78efeb] sm:p-7"
                      >
                        <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#B9CBE4]">
                          {c.category}
                        </span>
                        <p className="mt-3 font-display text-2xl font-medium italic leading-tight text-[#78efeb] sm:text-3xl">
                          {c.result}
                        </p>
                        <h3 className="mt-4 font-display text-lg font-medium tracking-tight sm:text-xl">
                          {c.client}
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#B9CBE4]">
                          {c.summary}
                        </p>
                        <span
                          aria-hidden="true"
                          className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[#78efeb] transition-transform group-hover:translate-x-1"
                        >
                          Read case →
                        </span>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

            <div className="grid items-end gap-8 border-t border-white/15 pt-14 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
              <Reveal>
                <div>
                  <span className="kicker text-[#78efeb]">Ready to be next?</span>
                  <h2
                    data-split
                    className="split-parent mt-4 font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl md:text-6xl"
                  >
                    Let&rsquo;s map your growth.
                  </h2>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="flex flex-wrap gap-4 lg:justify-end">
                  <Link
                    href={SITE.calendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="book"
                    className="btn-ink btn-press inline-flex items-center gap-2 border border-[#78efeb] bg-[#78efeb] px-6 py-3 text-sm font-semibold text-navy [--ink-fill:#8ff0e0]"
                  >
                    Book a call
                  </Link>
                  <Link
                    href="/#work"
                    className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-[#78efeb] hover:text-[#78efeb]"
                  >
                    ← All work
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
