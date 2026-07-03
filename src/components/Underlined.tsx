import type { ReactNode } from "react";

/**
 * Italic serif emphasis with a hand-drawn amber underline that draws itself
 * on scroll (path animated globally in SmoothScroll via `.js-flourish`).
 * Server-safe — no client JS of its own.
 */
export default function Underlined({ children }: { children: ReactNode }) {
  return (
    <em className="relative inline-block italic">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 320 12"
        preserveAspectRatio="none"
        className="js-flourish absolute -bottom-1.5 left-0 h-2 w-full text-amber"
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
