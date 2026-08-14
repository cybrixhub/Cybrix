/**
 * Rotating circular seal — "CYBRIX · SOCIAL & CONTENT · EST. 2012".
 * Pure CSS rotation; decorative only.
 */
export default function Stamp({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 120 120"
        className="h-28 w-28 animate-[spin_26s_linear_infinite]"
      >
        <defs>
          <path
            id="stamp-circle"
            d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0" 
          />
        </defs>
        <text
          fill="currentColor"
          fontSize="10.5"
          letterSpacing="2.6"
          style={{ fontFamily: "var(--font-mono)", textTransform: "uppercase" }}
        >
          <textPath href="#stamp-circle">
            Cybrix · social &amp; content · EST. 2012·
          </textPath>
        </text>
        <circle cx="60" cy="60" r="5" fill="currentColor" />
      </svg>
    </div>
  );
}
