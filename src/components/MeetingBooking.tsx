import Reveal from "./Reveal";
import BrandMark from "./BrandMark";

const PERKS = [
  "30-minute strategy call, free",
  "Google Meet link — sent to your inbox",
  "Come with goals, leave with a plan",
  "No pitch, no pressure",
];

export default function MeetingBooking() {
  return (
    <section
      id="book"
      aria-label="Schedule a call"
      className="relative overflow-hidden bg-navy py-24 text-cream sm:py-32"
    >
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.06]" />
      <BrandMark className="pointer-events-none absolute -right-[6%] top-1/2 z-0 h-[52vh] w-auto -translate-y-1/2 text-teal/10" />
      <span className="marginalia !text-[#b9cbe4]">appointments — pick a slot</span>

      <div className="container-x relative z-10">
        {/* Top — copy + perks */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="kicker text-teal-bright">Book a call</span>
          </Reveal>
          <Reveal delay={80}>
            <h2
              data-split
              className="split-parent mt-4 font-display text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-5xl"
            >
              Grab a time that works.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 text-lg leading-relaxed text-[#b9cbe4]">
              Pick a day and slot — we&rsquo;ll send a Google Meet link to your
              inbox. Thirty focused minutes on your growth, nothing to prep.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3 text-left sm:grid-cols-4">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-start gap-2 text-sm text-[#b9cbe4]">
                  <span aria-hidden="true" className="mt-0.5 font-mono text-teal-bright">✓</span>
                  {perk}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Calendar embed */}
        <Reveal delay={100}>
          <div className="mx-auto mt-12 max-w-xl overflow-hidden rounded-lg border border-navy-line shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)]">
            <iframe
              src="https://cal.com/cybrix-talha/30min?embed=true&theme=dark&layout=month_view&hideEventTypeDetails=true"
              className="w-full"
              style={{ height: 660, border: "none", display: "block" }}
              title="Book a strategy call with Cybrix"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
