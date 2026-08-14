"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { NAV_LINKS, SITE } from "@/lib/site";

/**
 * Editorial masthead: parchment bar with a hairline rule, mono folio detail,
 * and a compact state once scrolled.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white text-[#14317A] backdrop-blur-sm transition-shadow duration-300 ${
        scrolled
          ? "shadow-[0_1px_0_var(--color-line-strong),0_14px_34px_-20px_rgba(36,30,22,0.45)]"
          : "shadow-[0_10px_28px_-22px_rgba(36,30,22,0.35)]"
      }`}
    >
      {/* gilded rail the tags hang from */}
      <div
        aria-hidden="true"
        className="h-0.5 bg-[#78EFEB]"
      />
      <div
        aria-hidden="true"
        className="bg-noise pointer-events-none absolute inset-0 opacity-[0.04]"
      />
      <div
        className={`container-x flex items-center justify-between border-b border-[#78EFEB]/30 transition-all duration-300 ${
  scrolled ? "h-20" : "h-20"
}`}
      >
        <a
  href="#top"
  aria-label="Cybrix — back to top"
  className="flex items-center gap-3" 
>
  <span className="scale-110 origin-left">
    <Logo />
  </span>
          <span className="kicker kicker-bare hidden text-[#14317A] lg:inline">
  [ est. {SITE.established} ]
</span>
        </a>

        {/* Hang-tag nav: each link dangles from the gilded rail on its own
            knotted string — tilted, tinted, idly swaying, swinging on touch. */}
        <nav
          className="hidden items-start gap-6 self-stretch md:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link, i) => {
  const tags = [
    { tint: "bg-[#14317A]", angle: "-3.5deg", string: 11 },
    { tint: "bg-[#14317A]", angle: "2.6deg", string: 18 },
    { tint: "bg-[#14317A]", angle: "-2.2deg", string: 8 },
    { tint: "bg-[#14317A]", angle: "3.2deg", string: 15 },
  ];

  const tag = tags[i % tags.length];

  return (
    <a
      key={link.href}
      href={link.href}
      style={{
        rotate: tag.angle,
        animationDelay: `${i * 0.7}s`,
      }}
      className="hover-swing animate-sway group flex flex-col items-center"
    >
      <span
        aria-hidden="true"
        className="-mt-px h-1.5 w-1.5 rounded-full bg-[#78EFEB] shadow-[0_1px_1px_rgba(36,30,22,0.4)]"
      />

      <span
        aria-hidden="true"
        className="w-px bg-[#8a6b46]"
        style={{ height: `${tag.string}px` }}
      />

      <span
        className={`relative rounded-b-md rounded-t-[3px] border border-line-strong px-3.5 pb-1.5 pt-2.5 font-display text-[0.85rem] font-medium italic leading-none text-white shadow-[0_6px_12px_-4px_rgba(36,30,22,0.35)] transition-all duration-200 group-hover:border-[#78EFEB] group-hover:text-[#78EFEB] group-hover:shadow-[0_9px_16px_-4px_rgba(36,30,22,0.45)] ${tag.tint}`}
      >
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-paper ring-1 ring-[#8a6b46]/70"
        />

        {link.label}
      </span>
    </a>
  );
})}
        </nav>

        <div className="hidden md:block">
          <a
            href="#book"
            data-cursor="book"
            className="btn-ink btn-press inline-flex items-center gap-2 border border-[#14317A] bg-[#14317A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#78EFEB] hover:text-[#14317A] hover:border-[#78EFEB] transition-all duration-300 shadow-[0_10px_20px_-8px_rgba(14,26,58,0.85)] [--ink-fill:#78EFEB]"
          >
            Book a call
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-current transition-all duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        inert={!open}
        aria-hidden={!open}
        className={`overflow-hidden bg-white text-[#14317A] md:hidden ${
          open ? "max-h-[420px] border-b border-line" : "max-h-0"
        } transition-all duration-300 ease-out`}
      >
        <nav className="container-x flex flex-col py-4" aria-label="Mobile">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline justify-between border-b border-line py-3.5 font-display text-xl italic text-white"
            >
              {link.label}
              <span className="kicker text-muted">
                0{i + 1}
              </span>
            </a>
          ))}
          <a
            href="#book"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex items-center justify-center bg-navy px-5 py-3 text-sm font-semibold text-cream"
          >
            Book a call
          </a>
        </nav>
      </div>
    </header>
  );
}
