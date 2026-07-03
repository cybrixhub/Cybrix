/**
 * Deckle/torn-paper divider. Renders a jagged strip in the NEXT section's
 * color; place it with a negative top margin so it tears into the section
 * above.
 */
export default function TornEdge({
  color,
  className = "",
}: {
  color: string;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={`relative z-10 ${className}`}>
      <svg
        viewBox="0 0 1200 26"
        preserveAspectRatio="none"
        className="block h-6 w-full sm:h-7"
      >
        <path
          fill={color}
          d="M0 26 L0 14 L34 11 L61 16 L92 8 L128 13 L163 6 L201 15 L238 9 L272 17 L305 7 L344 12 L381 5 L419 14 L452 8 L488 16 L523 6 L561 13 L598 9 L634 17 L668 7 L705 12 L741 5 L778 15 L812 9 L848 16 L884 6 L921 13 L957 8 L994 15 L1028 7 L1065 12 L1101 5 L1138 14 L1172 9 L1200 13 L1200 26 Z"
        />
      </svg>
    </div>
  );
}
