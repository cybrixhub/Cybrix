const STEPS = [
  {
    week: "Week 1",
    number: "01",
    label: "Audit",
    title: "We pull everything apart.",
    body: "Ad account history, organic analytics, competitor spend data, funnel screenshots. Most brands find they've been running the same creative to five different audiences and wondering why CPL keeps climbing. We find the actual leak — not the obvious one.",
    deliverables: "Audit deck · competitor map · channel priority ranking",
    accent: "text-oxblood-bright",
    rule: "bg-oxblood/40",
  },
  {
    week: "Weeks 1–2",
    number: "02",
    label: "Strategy",
    title: "One plan. Nothing ships until it's locked.",
    body: "Platform prioritisation, content pillars, messaging hierarchy, paid social structure, 90-day roadmap. Changing direction mid-campaign costs twice as much as getting it right upfront — so we don't rush this part.",
    deliverables: "Strategy deck · 90-day roadmap · creative direction",
    accent: "text-amber",
    rule: "bg-amber/40",
  },
  {
    week: "Weeks 2–6",
    number: "03",
    label: "Execute",
    title: "Ads live in two weeks. Content ships from day one.",
    body: "We don't batch creative for a month then launch. We ship, test, kill what's losing, and double what's winning — every week. SEO compounds in the background. Video is in production by week three. Everything is moving.",
    deliverables: "Live ads · weekly optimisation · content calendar · video",
    accent: "text-teal-bright",
    rule: "bg-teal/40",
  },
  {
    week: "Ongoing",
    number: "04",
    label: "Pipeline",
    title: "Qualified means budget, intent, and timeline — all three.",
    body: "A lead who can't afford you isn't a lead. We filter for budget, intent and timeline before anything hits your calendar. You close. We keep the pipe full. Monthly review tells us what to scale, what to cut, and what's next.",
    deliverables: "Qualified leads · CRM sync · monthly strategy review",
    accent: "text-cream-soft",
    rule: "bg-ink/20",
  },
] as const;

export default function HowWeWork() {
  return (
    <section
      id="process"
      aria-label="How we work"
      className="bg-paper py-20 sm:py-28"
    >
      <div className="container-x">

        {/* Header */}
        <div className="border-b border-line pb-8 sm:pb-10">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="kicker text-muted">Process</p>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
              four phases · every engagement
            </p>
          </div>
          <h2 className="mt-4 font-display text-4xl font-medium italic leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl">
            Strategy to pipeline,{" "}
            <span className="not-italic text-oxblood-bright">no gaps.</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical timeline rail (desktop) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-[6.5rem] top-0 hidden w-px bg-line lg:block"
          />

          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className={`group relative grid gap-6 border-b border-line py-10 sm:py-12 lg:grid-cols-[7rem_1fr] lg:gap-14 ${
                i === STEPS.length - 1 ? "border-b-0" : ""
              }`}
            >
              {/* Left — number + timeline dot */}
              <div className="flex items-start gap-4 lg:flex-col lg:gap-3">
                {/* Timeline dot (desktop) */}
                <div
                  aria-hidden="true"
                  className="relative hidden lg:block"
                >
                  <div className={`absolute left-1/2 top-3 h-2 w-2 -translate-x-1/2 rounded-full ${step.rule} ring-2 ring-paper`} />
                </div>

                <div className="lg:pt-1">
                  <span
                    className={`block font-display text-5xl font-medium italic leading-none sm:text-6xl lg:text-7xl ${step.accent}`}
                  >
                    {step.number}
                  </span>
                  <span className="mt-1.5 block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                    {step.week}
                  </span>
                </div>
              </div>

              {/* Right — content */}
              <div className="min-w-0">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                    {step.label}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl md:text-4xl">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft text-pretty sm:text-lg">
                  {step.body}
                </p>
                <p className="mt-5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                  <span className={`mr-2 ${step.accent}`}>→</span>
                  {step.deliverables}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom editorial pull */}
        <div className="mt-12 border-t border-line pt-10 sm:mt-14">
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="font-display text-2xl font-medium italic leading-snug text-ink-soft sm:text-3xl">
                &ldquo;We&rsquo;ve run this system across 120+ founders — beauty, healthcare, real estate, SaaS. The phases don&rsquo;t change. The speed does.&rdquo;
              </p>
              <p className="mt-4 kicker text-muted">A. Rahman · Founder</p>
            </div>
            <div className="flex flex-col justify-end gap-4 border-t border-line pt-6 sm:border-l sm:border-t-0 sm:pl-10 sm:pt-0">
              {[
                { value: "48 hrs", note: "Brief to first content drop" },
                { value: "2 wks", note: "Ads live and spending" },
                { value: "Month 2", note: "When compounding kicks in" },
              ].map((f) => (
                <div key={f.value} className="flex items-baseline gap-3">
                  <span className="font-display text-2xl font-medium italic text-oxblood-bright">
                    {f.value}
                  </span>
                  <span className="text-sm text-muted">{f.note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
