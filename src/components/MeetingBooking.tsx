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
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left — the offer */}
          <div>
            <Reveal>
              <span className="kicker text-teal-bright">Book a call</span>
            </Reveal>
            <Reveal delay={80}>
              <h2
                data-split
                className="split-parent mt-4 font-display text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl"
              >
                Grab a time that works.
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-[#b9cbe4] text-pretty">
                Pick a day and slot — we&rsquo;ll send a Google Meet link to your
                inbox. Thirty focused minutes on your growth, nothing to prep.
              </p>
            </Reveal>
            <ul className="mt-10 max-w-md">
              {PERKS.map((perk) => (
                <li
                  key={perk}
                  className="flex items-baseline gap-4 border-b border-navy-line py-3.5 first:border-t"
                >
                  <span aria-hidden="true" className="font-mono text-teal-bright">✓</span>
                  <span className="text-base">{perk}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Cal.com embed */}
          <Reveal delay={100}>
            <div className="overflow-hidden rounded-lg border border-navy-line shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)]">
              <iframe
                src="https://cal.com/cybrix-talha/30min?embed=true&theme=dark&layout=column_view&hideEventTypeDetails=true"
                className="w-full"
                style={{ height: 740, border: "none", display: "block" }}
                title="Book a strategy call with Cybrix"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
