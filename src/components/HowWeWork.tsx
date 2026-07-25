const STEPS = [
  {
    number: "01",
    title: "We audit your world",
    summary: "We dig into your data to find the real gaps — not the ones you think you have.",
    bullets: [
      "Market & competitor analysis",
      "Audience behaviour insights",
      "Channel performance audit",
      "Funnel & conversion review",
      "Current content gaps",
    ],
    accent: "text-oxblood-bright",
    border: "border-oxblood/30",
    dot: "bg-oxblood",
    glow: "from-oxblood/10",
  },
  {
    number: "02",
    title: "We build the strategy",
    summary: "The right plan, mapped to your market — platform, message and format locked before anything ships.",
    bullets: [
      "Platform-specific content plan",
      "Messaging hierarchy",
      "90-day roadmap",
      "Creative direction & formats",
      "Posting & campaign calendar",
    ],
    accent: "text-amber",
    border: "border-amber/30",
    dot: "bg-amber",
    glow: "from-amber/10",
  },
  {
    number: "03",
    title: "We execute ruthlessly",
    summary: "Ads live, content shipping, SEO compounding — one team driving every channel.",
    bullets: [
      "High-converting ad creative",
      "Paid social & organic content",
      "SEO + short-form video",
      "Weekly A/B optimisation",
      "Bot & automation activation",
    ],
    accent: "text-teal-bright",
    border: "border-teal/30",
    dot: "bg-teal-bright",
    glow: "from-teal/10",
  },
  {
    number: "04",
    title: "We turn attention into pipeline",
    summary: "Leads qualified, calls booked, revenue tracked — not impressions, not likes.",
    bullets: [
      "Qualified lead capture",
      "CRM & WhatsApp sync",
      "Weekly performance reports",
      "Scale winners, kill waste",
      "Monthly strategic review",
    ],
    accent: "text-cream-soft",
    border: "border-navy-line",
    dot: "bg-navy",
    glow: "from-navy/20",
  },
] as const;

const PILLARS = [
  {
    icon: "◎",
    label: "Data-driven",
    note: "Decisions from real numbers, not gut feel.",
    color: "text-oxblood-bright",
  },
  {
    icon: "⊞",
    label: "Full-stack",
    note: "One team. Zero vendor coordination.",
    color: "text-amber",
  },
  {
    icon: "↑",
    label: "Built to compound",
    note: "Month 3 always beats month 1.",
    color: "text-teal-bright",
  },
  {
    icon: "◷",
    label: "Automated",
    note: "Systems that follow up while you sleep.",
    color: "text-ink-soft",
  },
  {
    icon: "◈",
    label: "No vanity metrics",
    note: "Pipeline or it didn't count.",
    color: "text-cream-soft",
  },
] as const;

export default function HowWeWork() {
  return (
    <section
      id="process"
      aria-label="How we work"
      className="bg-paper border-t border-line py-20 sm:py-28"
    >
      <div className="container-x">
        {/* Header */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="kicker text-muted">Our process</p>
            <h2 className="mt-2 font-display text-3xl font-medium leading-[1.05] tracking-tight text-balance sm:text-4xl md:text-5xl">
              Strategy to pipeline,{" "}
              <em className="italic text-oxblood-bright">no gaps.</em>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted text-pretty sm:text-right">
            Every engagement runs through the same four phases — built on six years of what actually moves numbers.
          </p>
        </div>

        {/* Steps grid */}
        <div className="mt-12 grid gap-px bg-line sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className={`group relative flex flex-col bg-paper-2 p-6 transition-colors duration-300 hover:bg-paper-3 sm:p-7`}
            >
              {/* Top gradient glow */}
              <div
                className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r ${step.glow} via-transparent to-transparent`}
              />

              {/* Step number */}
              <span
                className={`font-display text-5xl font-medium italic leading-none sm:text-6xl ${step.accent}`}
              >
                {step.number}
              </span>

              {/* Title */}
              <h3 className="mt-4 font-display text-xl font-medium leading-snug tracking-tight sm:text-2xl">
                {step.title}
              </h3>

              {/* Summary */}
              <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">
                {step.summary}
              </p>

              {/* Bullets */}
              <ul className="mt-5 space-y-2 border-t border-line pt-5">
                {step.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-ink-soft">
                    <span className={`mt-[0.35rem] h-1.5 w-1.5 shrink-0 rounded-full ${step.dot}`} />
                    {b}
                  </li>
                ))}
              </ul>

              {/* Arrow connector (desktop only — shows on all but last) */}
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute -right-3.5 top-8 z-10 hidden text-lg lg:block ${step.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              >
                →
              </span>
            </div>
          ))}
        </div>

        {/* Connector line between steps (desktop) */}
        <div className="mt-0 hidden lg:block" aria-hidden="true">
          <div className="relative h-px w-full bg-line">
            <div className="absolute inset-0 bg-gradient-to-r from-oxblood/40 via-amber/40 via-teal/40 to-navy/40" />
          </div>
        </div>

        {/* "Why it works" pillars */}
        <div className="mt-14 sm:mt-16">
          <p className="kicker text-muted">Why it works</p>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
            {PILLARS.map((p) => (
              <div
                key={p.label}
                className="rounded-md border border-line-strong/50 bg-paper-2 p-4 transition-colors hover:bg-paper-3 sm:p-5"
              >
                <span className={`text-xl ${p.color}`} aria-hidden="true">
                  {p.icon}
                </span>
                <p className={`mt-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] ${p.color}`}>
                  {p.label}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{p.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom pull-quote */}
        <div className="mt-14 border-t border-line pt-10 sm:mt-16">
          <blockquote className="mx-auto max-w-2xl text-center">
            <p className="font-display text-xl font-medium italic leading-snug text-ink-soft sm:text-2xl md:text-3xl">
              &ldquo;We don&rsquo;t just generate leads —{" "}
              <span className="text-oxblood-bright">we deliver clients ready to buy.&rdquo;</span>
            </p>
            <footer className="mt-4">
              <p className="kicker text-muted">A. Rahman · Founder, Cybrix</p>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
