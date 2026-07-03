import { SITE } from "@/lib/site";

type LogoProps = {
  className?: string;
  /** Dot color utility — defaults to oxblood; pass e.g. "text-amber" on dark. */
  dotClass?: string;
};

/**
 * The wordmark: italic serif "Cybrix." — the full stop is the brand mark.
 * Inherits `currentColor`, so it works on parchment or espresso.
 */
export default function Logo({
  className = "",
  dotClass = "text-oxblood-bright",
}: LogoProps) {
  return (
    <span
      className={`font-display text-2xl font-semibold italic tracking-tight leading-none ${className}`}
    >
      {SITE.name}
      <span aria-hidden="true" className={`not-italic ${dotClass}`}>
        .
      </span>
    </span>
  );
}
