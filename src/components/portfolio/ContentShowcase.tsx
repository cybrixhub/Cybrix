import Reveal from "@/components/Reveal";
import Underlined from "@/components/Underlined";
import ZoomImage from "./ZoomImage";
import { CONTENT_PLAN, CREATIVES, CREATIVES_CAPTION } from "@/lib/portfolio";

/** PDF p. 12 (content plan) + pp. 13–15 (posts & designs). */
export default function ContentShowcase() {
  const [wide, ...rest] = CREATIVES;
  return (
    <>
      <section
        id="content-plan"
        aria-labelledby="plan-title"
        className="relative overflow-hidden bg-paper py-24 sm:py-32"
      >
        <span className="marginalia">v · content plan</span>
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Reveal>
                <span className="kicker text-navy">Content plan preview</span>
              </Reveal>
              <h2
                id="plan-title"
                data-split
                className="split-parent mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
              >
                Every post, <Underlined>planned</Underlined>.
              </h2>
            </div>
            <Reveal delay={100}>
              <p className="max-w-md text-base leading-relaxed text-ink-soft text-pretty sm:text-lg">
                {CONTENT_PLAN.caption}
              </p>
            </Reveal>
          </div>

          <Reveal delay={80} className="mt-12">
            <figure className="relative">
              <div className="relative overflow-hidden rounded-xl border border-line-strong bg-white shadow-[0_40px_80px_-40px_rgba(20,49,122,0.4)]">
                <div className="flex items-center gap-2 border-b border-line bg-paper-2 px-4 py-2.5">
                  <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
                  <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
                  <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
                  <span className="ml-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                    Monthly content calendar
                  </span>
                </div>
                <ZoomImage
                  src={CONTENT_PLAN.image}
                  width={CONTENT_PLAN.width}
                  height={CONTENT_PLAN.height}
                  alt={CONTENT_PLAN.alt}
                  caption={CONTENT_PLAN.caption}
                  sizes="(max-width: 1240px) 94vw, 1150px"
                  imageClassName="h-auto"
                />
              </div>
              <figcaption className="relative mt-4 text-center font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                Tap to enlarge · themes, hooks and posting status per platform
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section
        id="creatives"
        aria-labelledby="creatives-title"
        className="relative overflow-hidden border-t border-line bg-paper-2 py-24 sm:py-32"
      >
        <span className="marginalia">vi · posts &amp; designs</span>
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Reveal>
                <span className="kicker text-navy">Posts &amp; designs previews</span>
              </Reveal>
              <h2
                id="creatives-title"
                data-split
                className="split-parent mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
              >
                Creative that fits the feed.
              </h2>
            </div>
            <Reveal delay={100}>
              <p className="max-w-md text-base leading-relaxed text-ink-soft text-pretty sm:text-lg">
                {CREATIVES_CAPTION}
              </p>
            </Reveal>
          </div>

          <ul className="mt-12 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            <Reveal as="li" className="sm:col-span-2">
              <GalleryTile creative={wide} sizes="(max-width: 1024px) 94vw, 760px" />
            </Reveal>
            {rest.map((c, i) => (
              <Reveal key={c.image} as="li" delay={(i + 1) * 70}>
                <GalleryTile creative={c} sizes="(max-width: 640px) 94vw, (max-width: 1024px) 46vw, 370px" />
              </Reveal>
            ))}
            <Reveal as="li" delay={280} className="sm:self-stretch">
              <div className="relative flex h-full min-h-[14rem] flex-col justify-between overflow-hidden rounded-xl bg-navy p-7 text-white">
                <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.07]" />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-[#78efeb]/15 blur-2xl"
                />
                <span className="relative kicker kicker-bare text-[#78efeb]">
                  {String(CREATIVES.length).padStart(2, "0")} creative sets
                </span>
                <p className="relative mt-6 font-display text-2xl font-semibold leading-snug tracking-tight">
                  Brand tone, trends and platform style — designed in.
                </p>
                <span className="relative mt-6 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#B9CBE4]">
                  Select any set to view it full-size
                </span>
              </div>
            </Reveal>
          </ul>
        </div>
      </section>
    </>
  );
}

function GalleryTile({
  creative,
  sizes,
}: {
  creative: (typeof CREATIVES)[number];
  sizes: string;
}) {
  return (
    <figure className="group rounded-xl border border-line-strong bg-white p-2.5 shadow-[0_20px_40px_-28px_rgba(20,49,122,0.35)] transition-shadow duration-500 hover:shadow-[0_30px_56px_-28px_rgba(20,49,122,0.45)]">
      <ZoomImage
        src={creative.image}
        width={creative.width}
        height={creative.height}
        alt={creative.alt}
        caption={`${creative.title} — ${CREATIVES_CAPTION}`}
        sizes={sizes}
        className="rounded-md"
        imageClassName="h-auto"
      />
      <figcaption className="flex items-center justify-between gap-3 px-1.5 pb-1 pt-3">
        <span className="font-display text-base font-semibold tracking-tight text-navy">
          {creative.title}
        </span>
        <span aria-hidden="true" className="font-mono text-xs text-[#3DB5B0] transition-transform duration-300 group-hover:translate-x-0.5">
          ⤢
        </span>
      </figcaption>
    </figure>
  );
}
