type ProcessStep = { step: string; title: string; description: string };

// One icon per step position (discovery → setup → launch → optimise → scale)
const ICONS = [
  // 01 Discovery
  <svg key="1" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
    <circle cx="17" cy="17" r="9" stroke="currentColor" strokeWidth="2.2" />
    <line x1="23.5" y1="23.5" x2="33" y2="33" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="12" y1="17" x2="22" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="17" y1="12" x2="17" y2="22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>,
  // 02 Setup / Foundation
  <svg key="2" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
    <rect x="5" y="26" width="30" height="6" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="9" y="16" width="22" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="13" y="7" width="14" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
  </svg>,
  // 03 Launch
  <svg key="3" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
    <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="2.2" />
    <circle cx="20" cy="20" r="6.5" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="20" cy="20" r="2" fill="currentColor" />
    <line x1="28" y1="12" x2="33" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M29 7h4v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // 04 Optimise
  <svg key="4" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
    <path d="M6 32 L12 22 L18 26 L25 14 L32 20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M29 8 L35 8 L35 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="34" y1="9" x2="26" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>,
  // 05 Scale / Review
  <svg key="5" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
    <path d="M20 4 L23.5 13.5 H34 L25.8 19.7 L29 29 L20 23.2 L11 29 L14.2 19.7 L6 13.5 H16.5 Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

function ArrowConnector({ color }: { color: string }) {
  return (
    <div className="absolute -right-3.5 top-8 z-10 hidden lg:flex items-center justify-center">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="13" fill="#171310" stroke={color} strokeWidth="1.5" opacity="0.8" />
        <path d="M9 14h10M15 10l4 4-4 4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function ServiceProcess({
  steps,
  isTech,
}: {
  steps: ProcessStep[];
  isTech: boolean;
}) {
  const colors = isTech
    ? {
        circle: "#6dd0c4",
        circleBg: "#0e2e33",
        circleText: "#171310",
        connector: "rgba(109,208,196,0.25)",
        card: "rgba(27,44,96,0.7)",
        cardBorder: "rgba(109,208,196,0.18)",
        blurb: "rgba(14,26,58,0.6)",
        text: "#b9cbe4",
        icon: "#6dd0c4",
        rail: "rgba(109,208,196,0.3)",
      }
    : {
        circle: "#c9772a",
        circleBg: "#3d2110",
        circleText: "#171310",
        connector: "rgba(201,119,42,0.25)",
        card: "rgba(90,28,28,0.6)",
        cardBorder: "rgba(201,119,42,0.2)",
        blurb: "rgba(80,20,20,0.5)",
        text: "#eed9c8",
        icon: "#c9772a",
        rail: "rgba(201,119,42,0.35)",
      };

  return (
    <div className="space-y-6">
      {/* Step cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {steps.map((step, i) => (
          <div key={step.step} className="relative flex flex-col">
            {/* Arrow between cards (desktop, not on last) */}
            {i < steps.length - 1 && (
              <ArrowConnector color={colors.circle} />
            )}

            {/* Card */}
            <div
              className="group flex h-full flex-col rounded-xl border p-5 transition-transform duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.cardBorder,
              }}
            >
              {/* Top row: numbered circle + icon */}
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-bold"
                  style={{ backgroundColor: colors.circle, color: colors.circleText }}
                >
                  {step.step}
                </div>
                <div style={{ color: colors.icon }}>
                  {ICONS[i % ICONS.length]}
                </div>
              </div>

              {/* Title */}
              <h3 className="font-display text-lg font-medium leading-snug tracking-tight text-cream sm:text-xl">
                {step.title}
              </h3>

              {/* Description */}
              <p
                className="mt-3 flex-1 text-sm leading-relaxed border-t pt-3"
                style={{ color: colors.text, borderColor: colors.connector }}
              >
                {step.description}
              </p>

              {/* Step marker */}
              <p
                className="mt-4 font-mono text-[0.55rem] uppercase tracking-[0.16em]"
                style={{ color: colors.circle, opacity: 0.7 }}
              >
                Step {step.step} / {String(steps.length).padStart(2, "0")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline rail */}
      <div
        className="relative hidden h-px w-full overflow-hidden rounded-full lg:block"
        style={{ backgroundColor: colors.rail }}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: "100%",
            background: `linear-gradient(to right, ${colors.circle}88, ${colors.circle}22)`,
          }}
        />
      </div>

      {/* Step labels below rail */}
      <div className="hidden grid-cols-5 lg:grid">
        {steps.map((step) => (
          <div key={step.step} className="flex flex-col items-center gap-1">
            <div
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: colors.circle }}
            />
            <span
              className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-center"
              style={{ color: colors.text, opacity: 0.6 }}
            >
              {step.title.split(" ").slice(0, 2).join(" ")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
