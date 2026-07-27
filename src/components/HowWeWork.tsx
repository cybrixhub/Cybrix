const STEPS = [
  {
    number: "01",
    color: "#14317a",
    bg: "#FFFFFF",
    accent: "#14317a",
    label: "Audit",
    title: "We analyse your data",
    bullets: [
      "Market & competitor analysis",
      "Audience behaviour insight",
      "Past campaign performance",
      "Website & funnel review",
      "Lead source evaluation",
    ],
    blurb: "We dig deep to find the real opportunities — not the obvious ones.",
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="h-8 w-8">
        <circle cx="19" cy="19" r="10" stroke="currentColor" strokeWidth="2.5" />
        <line x1="26.5" y1="26.5" x2="37" y2="37" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="14" y1="19" x2="24" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="19" y1="14" x2="19" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "02",
    color: "#1B3D8F",
    bg: "#E4EAF5",
    accent: "#1B3D8F",
    label: "Strategy",
    title: "We build the content plan",
    bullets: [
      "Audience-focused messaging",
      "Content pillars & topics",
      "Platform-wise content plan",
      "Creative direction & formats",
      "Posting & campaign calendar",
    ],
    blurb: "The right content, for the right audience, at the right time.",
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="h-8 w-8">
        <rect x="7" y="5" width="24" height="30" rx="2.5" stroke="currentColor" strokeWidth="2.5" />
        <line x1="13" y1="14" x2="25" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="13" y1="20" x2="25" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="13" y1="26" x2="20" y2="26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M27 28 l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="31" y1="24" x2="31" y2="39" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "03",
    color: "#3DB5B0",
    bg: "#D6F5F3",
    accent: "#3DB5B0",
    label: "Launch",
    title: "We launch your ad strategy",
    bullets: [
      "High-converting ad creatives",
      "Precise audience targeting",
      "Campaign structure & funnel",
      "A/B testing & optimisation",
      "Budget allocation plan",
    ],
    blurb: "Smart ads that attract, engage and convert the right clients.",
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="h-8 w-8">
        <circle cx="22" cy="22" r="14" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="22" cy="22" r="8" stroke="currentColor" strokeWidth="2" />
        <circle cx="22" cy="22" r="2.5" fill="currentColor" />
        <line x1="32" y1="12" x2="37" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M33 7 h4 v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "04",
    color: "#0D2563",
    bg: "#0D2563",
    accent: "#78efeb",
    dark: true,
    label: "Pipeline",
    title: "We activate your systems",
    bullets: [
      "Lead capture integration",
      "WhatsApp & CRM sync",
      "Tracking & pixel setup",
      "Automated follow-ups",
      "Weekly performance reports",
    ],
    blurb: "Seamless integration for smooth lead flow and real-time tracking.",
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="h-8 w-8">
        <rect x="4" y="6" width="36" height="26" rx="2.5" stroke="currentColor" strokeWidth="2.5" />
        <line x1="4" y1="36" x2="40" y2="36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="15" y1="36" x2="15" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="29" y1="36" x2="29" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 24 l6-8 5 4 5-10 6 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
] as const;

const FUNNEL = [
  {
    label: "Lead Capture",
    note: "Leads come through ads, site & other channels",
    color: "#14317a",
    width: "w-full",
  },
  {
    label: "Lead Qualification",
    note: "We filter & qualify genuine prospects",
    color: "#1B3D8F",
    width: "w-[85%]",
  },
  {
    label: "Strategy Call",
    note: "Our team connects & nurtures the lead",
    color: "#3DB5B0",
    width: "w-[65%]",
  },
  {
    label: "Signed Client",
    note: "Only serious & budget-ready clients move forward",
    color: "#0D2563",
    width: "w-[42%]",
  },
] as const;

const PILLARS = [
  { icon: "◎", label: "Data-Driven", note: "Real numbers, not gut feel.", color: "#14317a" },
  { icon: "◈", label: "Audience-First", note: "Built around your exact buyer.", color: "#1B3D8F" },
  { icon: "↑", label: "Higher Conversions", note: "Better targeting, better results.", color: "#3DB5B0" },
  { icon: "⚙", label: "Automated", note: "Save time with smart follow-ups.", color: "#0D2563" },
  { icon: "⊞", label: "Scalable Growth", note: "A system built to compound.", color: "#14317a" },
] as const;

function ArrowRight({ color }: { color: string }) {
  return (
    <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 lg:flex">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="15" fill="#FFFFFF" stroke={color} strokeWidth="1.5" />
        <path d="M11 16h10M17 12l4 4-4 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function HowWeWork() {
  return (
    <section
      id="process"
      aria-label="How we work"
      className="overflow-hidden bg-paper-2 py-20 sm:py-28"
    >
      <div className="container-x">

        {/* Header */}
        <div className="mb-12 text-center sm:mb-16">
          <p className="kicker text-muted">Our proven process</p>
          <h2 className="mt-3 font-display text-4xl font-medium italic leading-tight tracking-tight text-balance sm:text-5xl">
            Strategy to pipeline.{" "}
            <span className="not-italic text-[#78efeb]">No gaps.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted">
            Every engagement runs the same four phases — built on six years of what actually moves numbers.
          </p>
        </div>

        {/* 4-Step Process Row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:gap-x-0">
          {STEPS.map((step, i) => (
            <div key={step.number} className="relative lg:px-3 first:lg:pl-0 last:lg:pr-0">
              {/* Connector arrow */}
              {i < STEPS.length - 1 && <ArrowRight color={step.color} />}

              {/* Card */}
              <div
                className={`flex h-full flex-col overflow-hidden rounded-xl border p-5 shadow-md transition-transform duration-300 hover:-translate-y-1 sm:p-6 ${
                  "dark" in step && step.dark
                    ? "border-white/10 shadow-[0_8px_24px_rgba(13,37,99,0.35)]"
                    : "border-line-strong/60 shadow-[0_4px_16px_rgba(20,49,122,0.08)]"
                }`}
                style={{
                  backgroundColor: step.bg,
                  borderTopWidth: "4px",
                  borderTopColor: step.accent,
                }}
              >
                {/* Step circle + icon */}
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: "dark" in step && step.dark ? step.accent : step.color }}
                  >
                    {step.number}
                  </div>
                  <div style={{ color: "dark" in step && step.dark ? step.accent : step.color }}>{step.icon}</div>
                </div>

                {/* Title */}
                <p
                  className="mb-1 font-mono text-[0.6rem] uppercase tracking-[0.14em]"
                  style={{ color: "dark" in step && step.dark ? step.accent : step.color }}
                >
                  {step.label}
                </p>
                <h3
                  className={`font-display text-lg font-medium leading-snug tracking-tight sm:text-xl ${
                    "dark" in step && step.dark ? "text-white" : "text-navy"
                  }`}
                >
                  {step.title}
                </h3>

                {/* Bullets */}
                <ul className={`mt-4 flex-1 space-y-2 border-t pt-4 ${
                  "dark" in step && step.dark ? "border-white/15" : "border-line-strong/40"
                }`}>
                  {step.bullets.map((b) => (
                    <li
                      key={b}
                      className={`flex items-start gap-2 text-sm ${
                        "dark" in step && step.dark ? "text-[#B9CBE4]" : "text-ink-soft"
                      }`}
                    >
                      <span
                        className="mt-[0.3rem] h-1 w-1 shrink-0 rounded-full"
                        style={{ backgroundColor: "dark" in step && step.dark ? step.accent : step.color }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Blurb */}
                <p
                  className={`mt-4 rounded-lg border px-3 py-2.5 text-xs leading-relaxed italic ${
                    "dark" in step && step.dark
                      ? "border-white/10 bg-white/5 text-[#8ba0c0]"
                      : "border-line-strong/40 bg-white/60 text-muted"
                  }`}
                >
                  {step.blurb}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lead Funnel */}
        <div className="mt-16 sm:mt-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-12">

            {/* Left label */}
            <div className="hidden lg:block">
              <p className="kicker text-muted">Every lead we send you is</p>
              <h3 className="mt-2 font-display text-3xl font-medium italic leading-tight text-navy">
                Qualified &amp; ready<br />to move forward.
              </h3>
              <div className="mt-6 space-y-2">
                {["Genuine interest in your service", "Right budget & timeline", "Documents & profile evaluated", "Ready to take next step"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-ink-soft">
                    <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-[#3DB5B0]">
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Funnel */}
            <div className="flex flex-col items-center gap-1">
              <p className="mb-3 kicker text-muted text-center">Lead qualification funnel</p>
              {FUNNEL.map((f, i) => (
                <div key={f.label} className={`relative flex flex-col items-center ${f.width}`}>
                  <div
                    className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-center"
                    style={{ backgroundColor: `${f.color}15`, border: `1px solid ${f.color}35` }}
                  >
                    <div
                      className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.12em]"
                      style={{ color: f.color }}
                    >
                      {f.label}
                    </div>
                    <div className="text-xs text-muted hidden sm:block">{f.note}</div>
                  </div>
                  {i < FUNNEL.length - 1 && (
                    <div className="flex h-5 w-5 items-center justify-center">
                      <svg viewBox="0 0 16 16" className="h-4 w-4 text-muted">
                        <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right label (mobile shows below) */}
            <div className="lg:hidden mt-6">
              <p className="kicker text-muted">Every lead we send you is</p>
              <h3 className="mt-2 font-display text-3xl font-medium italic leading-tight text-navy">
                Qualified &amp; ready to move forward.
              </h3>
              <div className="mt-6 space-y-2">
                {["Genuine interest in your service", "Right budget & timeline", "Documents & profile evaluated", "Ready to take next step"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-ink-soft">
                    <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-[#3DB5B0]">
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right stats */}
            <div className="hidden lg:flex flex-col gap-4">
              {[
                { value: "120+", label: "founders backed", color: "#14317a" },
                { value: "18M+", label: "impressions driven", color: "#1B3D8F" },
                { value: "$40M+", label: "raised by clients", color: "#3DB5B0" },
                { value: "6 yrs", label: "compounding results", color: "#0D2563" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-4 rounded-lg border border-line-strong/50 bg-white px-5 py-4">
                  <span className="font-display text-2xl font-medium italic" style={{ color: s.color }}>
                    {s.value}
                  </span>
                  <span className="text-sm text-muted">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why it works */}
        <div className="mt-16 sm:mt-20">
          <div className="mb-6 text-center">
            <p className="kicker text-muted">Why it works</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
            {PILLARS.map((p) => (
              <div
                key={p.label}
                className="flex flex-col items-center rounded-xl border border-line-strong/50 bg-white px-4 py-5 text-center transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-line-strong/60 text-lg" style={{ color: p.color }}>
                  {p.icon}
                </div>
                <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.14em]" style={{ color: p.color }}>
                  {p.label}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{p.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-14 flex flex-col items-center gap-4 rounded-xl border border-line-strong/60 bg-navy px-6 py-8 text-center sm:mt-16">
          <p className="font-display text-2xl font-medium italic text-white sm:text-3xl">
            We don&rsquo;t just generate leads —
            <span className="text-[#78efeb]"> we deliver clients ready to buy.</span>
          </p>
          <p className="kicker text-[#B9CBE4]">A. Rahman · Founder, Cybrix</p>
          <a
            href="https://cal.com/cybrix-talha/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ink btn-press mt-2 inline-flex items-center gap-2 border border-[#78efeb] bg-[#78efeb] px-7 py-3 text-sm font-semibold text-navy [--ink-fill:var(--color-navy)]"
          >
            Book a strategy call →
          </a>
        </div>

      </div>
    </section>
  );
}
