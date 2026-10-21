import type { Platform } from "@/lib/portfolio";

/** Brand marks for the platforms we manage (nominative use). */
export const PLATFORM_COLORS: Record<Platform, string> = {
  Facebook: "#1877F2",
  Instagram: "#E4405F",
  LinkedIn: "#0A66C2",
  TikTok: "#111111",
  YouTube: "#FF0000",
};

const PATHS: Record<Platform, React.ReactNode> = {
  Facebook: (
    <path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z" />
  ),
  Instagram: (
    <>
      <path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm0 1.8A3.2 3.2 0 0 0 4.8 8v8A3.2 3.2 0 0 0 8 19.2h8a3.2 3.2 0 0 0 3.2-3.2V8A3.2 3.2 0 0 0 16 4.8H8Z" />
      <path d="M12 7.8A4.2 4.2 0 1 1 12 16.2 4.2 4.2 0 0 1 12 7.8Zm0 1.8a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8Z" />
      <circle cx="16.9" cy="7.1" r="1.2" />
    </>
  ),
  LinkedIn: (
    <path d="M4.5 3a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM3 8.5h3V21H3V8.5Zm5.5 0h2.9v1.7c.6-1 1.9-2 3.9-2 3 0 4.7 1.8 4.7 5.3V21h-3v-6.8c0-2-.8-3.1-2.4-3.1-1.6 0-2.6 1.1-2.6 3.1V21h-3.5V8.5Z" />
  ),
  TikTok: (
    <path d="M14.5 3h2.6c.3 2.2 1.7 3.7 3.9 4v2.7c-1.5 0-2.8-.5-3.9-1.3v5.9c0 3.7-2.5 6-5.9 6-3.2 0-5.7-2.3-5.7-5.4 0-3 2.4-5.3 5.6-5.3.4 0 .8 0 1.1.1v2.8c-.3-.1-.7-.2-1.1-.2-1.7 0-2.9 1.2-2.9 2.7 0 1.6 1.2 2.7 2.9 2.7 1.9 0 3.4-1.3 3.4-3.6V3Z" />
  ),
  YouTube: (
    <path d="M12 5.5c4 0 6.7.2 8 .6 1 .3 1.6 1 1.8 2 .2 1.2.2 2.6.2 3.9s0 2.7-.2 3.9c-.2 1-.8 1.7-1.8 2-1.3.4-4 .6-8 .6s-6.7-.2-8-.6c-1-.3-1.6-1-1.8-2C2 14.7 2 13.3 2 12s0-2.7.2-3.9c.2-1 .8-1.7 1.8-2 1.3-.4 4-.6 8-.6Zm-2 3.6v5.8l5.2-2.9L10 9.1Z" />
  ),
};

export default function PlatformIcon({
  name,
  className = "",
}: {
  name: Platform;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      {PATHS[name]}
    </svg>
  );
}
