/**
 * Cybrix brand mark — a stylized nod to the logo's inverted "glitch" triangle.
 * Inherits `currentColor` so it can be tinted teal (tech contexts) or cream.
 * Purely decorative; always render behind content with a low opacity.
 */
export default function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 104"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* outer inverted triangle */}
      <path
        d="M8 12 H112 L60 96 Z"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* glitch shards — offset segments echoing the logo's fractured edge */}
      <path
        d="M30 32 H94"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M40 56 H72"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.32"
      />
    </svg>
  );
}
