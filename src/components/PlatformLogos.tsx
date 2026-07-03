/**
 * Monochrome platform marks (nominative use — the channels we run).
 * Server component; the hero staggers its children in on load.
 */

const MARKS: { name: string; path: React.ReactNode }[] = [
  {
    name: "Meta",
    path: (
      <path d="M6.7 6.5C4 6.5 2 9 2 12s2 5.5 4.5 5.5c2.2 0 3.6-1.8 5.5-5 1.9 3.2 3.3 5 5.5 5C20 17.5 22 15 22 12s-2-5.5-4.7-5.5c-2 0-3.5 1.7-5.3 4.7C10.2 8.2 8.7 6.5 6.7 6.5Zm0 2c1.2 0 2.4 1.5 4.1 4.4-1.5 2.5-2.7 3.6-4.1 3.6C5.2 16.5 4 14.6 4 12s1.2-3.5 2.7-3.5Zm10.6 0c1.5 0 2.7 1.9 2.7 3.5s-1.2 4.5-2.7 4.5c-1.4 0-2.6-1.1-4.1-3.6 1.7-2.9 2.9-4.4 4.1-4.4Z" />
    ),
  },
  {
    name: "Instagram",
    path: (
      <>
        <path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm0 1.8A3.2 3.2 0 0 0 4.8 8v8A3.2 3.2 0 0 0 8 19.2h8a3.2 3.2 0 0 0 3.2-3.2V8A3.2 3.2 0 0 0 16 4.8H8Z" />
        <path d="M12 7.8A4.2 4.2 0 1 1 12 16.2 4.2 4.2 0 0 1 12 7.8Zm0 1.8a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8Z" />
        <circle cx="16.9" cy="7.1" r="1.2" />
      </>
    ),
  },
  {
    name: "TikTok",
    path: (
      <path d="M14.5 3h2.6c.3 2.2 1.7 3.7 3.9 4v2.7c-1.5 0-2.8-.5-3.9-1.3v5.9c0 3.7-2.5 6-5.9 6-3.2 0-5.7-2.3-5.7-5.4 0-3 2.4-5.3 5.6-5.3.4 0 .8 0 1.1.1v2.8c-.3-.1-.7-.2-1.1-.2-1.7 0-2.9 1.2-2.9 2.7 0 1.6 1.2 2.7 2.9 2.7 1.9 0 3.4-1.3 3.4-3.6V3Z" />
    ),
  },
  {
    name: "LinkedIn",
    path: (
      <path d="M4.5 3a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM3 8.5h3V21H3V8.5Zm5.5 0h2.9v1.7c.6-1 1.9-2 3.9-2 3 0 4.7 1.8 4.7 5.3V21h-3v-6.8c0-2-.8-3.1-2.4-3.1-1.6 0-2.6 1.1-2.6 3.1V21h-3.5V8.5Z" />
    ),
  },
  {
    name: "X",
    path: (
      <path d="M3 3h4.6l5 6.6L18.2 3H21l-7 8.5L21.4 21h-4.6l-5.4-7.1L5.6 21H3l7.5-9.1L3 3Z" />
    ),
  },
  {
    name: "YouTube",
    path: (
      <path d="M12 5.5c4 0 6.7.2 8 .6 1 .3 1.6 1 1.8 2 .2 1.2.2 2.6.2 3.9s0 2.7-.2 3.9c-.2 1-.8 1.7-1.8 2-1.3.4-4 .6-8 .6s-6.7-.2-8-.6c-1-.3-1.6-1-1.8-2C2 14.7 2 13.3 2 12s0-2.7.2-3.9c.2-1 .8-1.7 1.8-2 1.3-.4 4-.6 8-.6Zm-2 3.6v5.8l5.2-2.9L10 9.1Z" />
    ),
  },
];

export default function PlatformLogos({
  className = "",
  ...rest
}: { className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className} {...rest}>
      <span className="sr-only">
        We grow brands on Meta, Instagram, TikTok, LinkedIn, X and YouTube.
      </span>
      {MARKS.map((mark) => (
        <span
          key={mark.name}
          title={mark.name}
          className="text-[#f7efe4]/65 transition-colors hover:text-[#f7efe4]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="h-5 w-5 sm:h-6 sm:w-6"
          >
            {mark.path}
          </svg>
        </span>
      ))}
    </div>
  );
}
