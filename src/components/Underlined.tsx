import type { ReactNode } from "react";

/**
 * Italic serif emphasis with a hand-drawn underline that draws itself on
 * scroll (path animated globally in SmoothScroll via `.js-flourish`).
 * `tone` picks the flourish colour — amber for warm/editorial contexts,
 * teal for the logo-tuned "systems / tech" pages. Server-safe.
 */
export default function Underlined({
  children,
  tone = "amber",
}: {
  children: ReactNode;
  tone?: "amber" | "teal";
}) {
  return (
    <em className="relative inline-block italic">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 320 12"
        preserveAspectRatio="none"
        className={`js-flourish absolute -bottom-1.5 left-0 h-2 w-full ${
          tone === "teal" ? "text-teal-bright" : "text-amber"
        }`}
      >
        <path
          d="M2 9 C 60 3, 140 2, 318 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </em>
  );
}
