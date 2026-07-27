"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

/** Oxblood "Book a call" pill that fades in once past the hero. */
export default function FloatingCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={SITE.calendarUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      className={`fixed bottom-5 right-5 z-50 inline-flex items-center gap-2.5 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(14,26,58,0.7)] transition-all duration-500 hover:bg-navy-2 ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-bright opacity-80" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-bright" />
      </span>
      Book a call
    </a>
  );
}
