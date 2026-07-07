import Image from "next/image";
import Reveal from "./Reveal";
import { COLLAGE } from "@/lib/site";

/** Deterministic pseudo-random (stable across server/client renders). */
function hash(n: number) {
  const s = Math.sin(n * 91.7) * 43758.5453;
  return s - Math.floor(s);
}

/** Scattered pixel marks, like ink misregistration on a press sheet. */
function PixelGlitch({
  className = "",
  seed = 1,
}: {
  className?: string;
  seed?: number;
}) {
  const cells: React.ReactNode[] = [];
  for (let i = 0; i < 110; i++) {
    const r = hash(i * seed);
    if (r < 0.45) continue;
    const x = Math.floor(hash(i * seed + 1) * 55) * 4;
    const y = Math.floor(hash(i * seed + 2) * 11) * 4;
    const w = 2 + Math.floor(hash(i * seed + 3) * 3) * 2;
    cells.push(
      <rect
        key={i}
        x={x}
        y={y}
        width={w}
        height={3}
        opacity={0.35 + 0.6 * hash(i * seed + 4)}
      />,
    );
  }
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 44"
      className={`fill-current ${className}`}
    >
      {cells}
    </svg>
  );
}

/**
 * "From the studio floor" — tilted photo plates with mono captions, press
 * glitch marks and a stitched brand patch (the sondaven culture collage).
 */
export default function Collage() {
  return (
    <section
      aria-label="From the studio floor"
      className="relative overflow-hidden bg-paper py-24 sm:py-32"
    >
      <PixelGlitch
        seed={3}
        className="absolute right-6 top-10 hidden w-56 text-ink/70 md:block"
      />
      <PixelGlitch
        seed={7}
        className="absolute bottom-12 left-4 hidden w-72 text-ink/60 md:block"
      />

      <div className="container-x relative z-10">
        <Reveal>
          <span className="kicker text-oxblood-bright">
            From the studio floor
          </span>
        </Reveal>
        <h2
          data-split
          className="split-parent mt-4 max-w-xl font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl"
        >
          Craft you can <em className="italic">see</em>.
        </h2>

        <div className="mt-16 flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Plate one */}
          <Reveal className="lg:-rotate-3 lg:mt-6">
            <figure className="w-72 bg-paper-2 p-3 pb-4 shadow-[0_30px_60px_-30px_rgba(36,30,22,0.55)] sm:w-80">
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-line">
                <Image
                  src={COLLAGE[0].image}
                  alt={COLLAGE[0].alt}
                  fill
                  sizes="(max-width: 640px) 288px, 320px"
                  quality={75}
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between gap-3">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-soft">
                  {COLLAGE[0].caption}
                </span>
                <a
                  href="#work"
                  aria-label="See the work"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line-strong font-mono text-sm text-ink transition-colors hover:bg-oxblood hover:border-oxblood hover:text-[#f7efe4]"
                >
                  +
                </a>
              </figcaption>
            </figure>
          </Reveal>

          {/* Plate two */}
          <Reveal delay={90} className="lg:rotate-2 lg:-mt-2">
            <figure className="w-72 bg-paper-2 p-3 pb-4 shadow-[0_30px_60px_-30px_rgba(36,30,22,0.55)] sm:w-80">
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-line">
                <Image
                  src={COLLAGE[1].image}
                  alt={COLLAGE[1].alt}
                  fill
                  sizes="(max-width: 640px) 288px, 320px"
                  quality={75}
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between gap-3">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-soft">
                  {COLLAGE[1].caption}
                </span>
                <a
                  href="#book"
                  aria-label="Book a call"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line-strong font-mono text-sm text-ink transition-colors hover:bg-oxblood hover:border-oxblood hover:text-[#f7efe4]"
                >
                  +
                </a>
              </figcaption>
            </figure>
          </Reveal>

          {/* Stitched brand patch */}
          <Reveal delay={160} className="lg:rotate-[3.5deg] lg:mt-14">
            <div
              aria-hidden="true"
              className="relative grid h-56 w-64 place-items-center overflow-hidden rounded-md bg-oxblood-deep shadow-[inset_0_2px_14px_rgba(0,0,0,0.55),0_24px_48px_-24px_rgba(36,30,22,0.6)]"
            >
              <div className="bg-noise absolute inset-0 opacity-25" />
              <div className="absolute inset-2 rounded-sm border-2 border-dashed border-[#f2d9c4]/50" />
              <div className="relative text-center">
                <p className="font-display text-4xl font-semibold italic text-[#f7efe4]">
                  Cybrix<span className="not-italic text-amber">.</span>
                </p>
                <p className="kicker mt-2 text-[#e8c9b4]">
                  Studio · est. 2020
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
