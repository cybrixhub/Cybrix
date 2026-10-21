import Reveal from "@/components/Reveal";
import PlatformIcon, { PLATFORM_COLORS } from "./PlatformIcon";
import { PLATFORMS } from "@/lib/portfolio";

/** PDF p. 3 — platforms we manage. */
export default function Platforms() {
  return (
    <section
      aria-labelledby="platforms-title"
      className="relative overflow-hidden border-y border-line bg-paper-2 py-20 sm:py-28"
    >
      <span className="marginalia">ii · platforms</span>
      <div className="container-x">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal>
              <span className="kicker text-navy">Platforms we manage</span>
            </Reveal>
            <h2
              id="platforms-title"
              data-split
              className="split-parent mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
            >
              Five channels, one voice.
            </h2>
          </div>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {PLATFORMS.map((name, i) => (
            <Reveal
              key={name}
              as="li"
              delay={i * 60}
              className={i === PLATFORMS.length - 1 ? "col-span-2 sm:col-span-1" : ""}
            >
              <div
                style={{ ["--brand" as string]: PLATFORM_COLORS[name] }}
                className="group relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-xl border border-line-strong bg-white p-5 shadow-[0_14px_30px_-24px_rgba(20,49,122,0.35)] transition-all duration-500 hover:-translate-y-1 hover:border-[var(--brand)] hover:shadow-[0_24px_44px_-26px_rgba(20,49,122,0.45)] sm:p-6"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[var(--brand)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-15"
                />
                <div className="relative flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-navy text-white transition-colors duration-500 group-hover:bg-[var(--brand)] group-hover:text-white">
                    <PlatformIcon name={name} className="h-6 w-6" />
                  </span>
                  <span className="font-mono text-[0.62rem] tracking-[0.16em] text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="relative font-display text-xl font-semibold tracking-tight text-navy">
                  {name}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
