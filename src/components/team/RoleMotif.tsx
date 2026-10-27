import type { RoleKey } from "@/lib/team";

/** Small line icon per role (decorative). */
export function RoleIcon({ role, className = "" }: { role: RoleKey; className?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
  };
  switch (role) {
    case "ceo":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
        </svg>
      );
    case "md":
      return (
        <svg {...common}>
          <rect x="3.5" y="7" width="17" height="12.5" rx="2" />
          <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3.5 12.5h17" />
        </svg>
      );
    case "marketing":
      return (
        <svg {...common}>
          <path d="M4 19.5h16" />
          <path d="m5 15 4.5-4.5 3.5 3 6-6.5" />
          <path d="M15 7h4v4" />
        </svg>
      );
    case "video":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="13" height="12" rx="2" />
          <path d="m16 10.5 5-3v9l-5-3" />
        </svg>
      );
    case "web":
      return (
        <svg {...common}>
          <rect x="3" y="4.5" width="18" height="15" rx="2" />
          <path d="M3 8.5h18M6 6.5h.01M8.5 6.5h.01" />
          <path d="m10 12.5-2 2 2 2M14 12.5l2 2-2 2" />
        </svg>
      );
  }
}

/** A tiny role-specific vignette for the card footer. Purely decorative. */
export function RoleMotif({ role }: { role: RoleKey }) {
  const base = "pointer-events-none select-none";
  switch (role) {
    case "ceo":
      return (
        <div aria-hidden="true" className={`${base} flex items-end gap-1`}>
          {[30, 45, 40, 60, 72, 90].map((h, i) => (
            <span
              key={i}
              style={{ height: `${h * 0.28}px` }}
              className="w-1.5 rounded-sm bg-[#78efeb]/70 transition-colors duration-500 group-hover:bg-[#78efeb]"
            />
          ))}
        </div>
      );
    case "md":
      return (
        <div aria-hidden="true" className={`${base} flex w-24 flex-col gap-1`}>
          {["w-full", "w-3/4", "w-1/2"].map((w, i) => (
            <span key={i} className="h-1 rounded-full bg-line">
              <span
                className={`block h-full origin-left scale-x-90 rounded-full bg-navy/70 transition-transform duration-700 group-hover:scale-x-100 ${w}`}
              />
            </span>
          ))}
        </div>
      );
    case "marketing":
      return (
        <svg aria-hidden="true" viewBox="0 0 96 24" className={`${base} h-5 w-24 text-[#3DB5B0]`}>
          <path
            d="M2 20 L22 15 L38 17 L56 9 L72 11 L94 3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="94" cy="3" r="2.5" className="fill-navy" />
        </svg>
      );
    case "video":
      return (
        <div aria-hidden="true" className={`${base} relative flex h-3.5 w-28 gap-0.5`}>
          {["w-5", "w-8", "w-4", "w-7", "w-3"].map((w, i) => (
            <span
              key={i}
              className={`${w} rounded-[2px] ${i % 2 ? "bg-navy/25" : "bg-[#78efeb]/60"}`}
            />
          ))}
          <span className="absolute -top-0.5 bottom-[-2px] left-[40%] w-[2px] rounded-full bg-navy transition-[left] duration-700 group-hover:left-[70%]" />
        </div>
      );
    case "web":
      return (
        <div
          aria-hidden="true"
          className={`${base} flex h-5 w-24 flex-col overflow-hidden rounded-[3px] border border-line-strong bg-white`}
        >
          <span className="flex h-1.5 items-center gap-0.5 border-b border-line bg-paper-2 px-1">
            <span className="h-0.5 w-0.5 rounded-full bg-navy/40" />
            <span className="h-0.5 w-0.5 rounded-full bg-navy/40" />
          </span>
          <span className="flex flex-1 items-center gap-1 px-1.5">
            <span className="h-1 w-8 rounded-full bg-navy/60" />
            <span className="h-1.5 w-4 rounded-sm bg-[#78efeb] transition-[width] duration-500 group-hover:w-6" />
          </span>
        </div>
      );
  }
}
