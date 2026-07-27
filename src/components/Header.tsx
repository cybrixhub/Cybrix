"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { NAV_LINKS, SITE } from "@/lib/site";

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
      className={`fixed inset-x-0 top-0 z-50 bg-white/96 text-[#1E293B] backdrop-blur-sm transition-shadow duration-300 ${
        scrolled
          ? "shadow-[0_1px_0_var(--color-line),0_8px_24px_-12px_rgba(20,49,122,0.12)]"
          : "shadow-[0_4px_16px_-10px_rgba(20,49,122,0.08)]"
      }`}
    >
      <div
        aria-hidden="true"
        className="h-0.5 bg-gradient-to-r from-navy via-[#78efeb] to-navy"
      />
      <div
        className={`container-x flex items-center justify-between border-b transition-all duration-300 ${
          scrolled ? "h-14" : "h-16"
        }`}
        style={{ borderColor: "rgba(20,49,122,0.08)" }}
      >
        <a
          href="/"
          aria-label="Cybrix — home"
          className="flex items-center gap-3"
        >
          <Image
            src="/brand/cybrix-mark.png"
            alt="Cybrix"
            width={120}
            height={120}
            priority
            sizes="64px"
            className="h-14 w-auto sm:h-16"
          />
          <span className="kicker hidden text-muted lg:inline">
            [ est. {SITE.established} ]
          </span>
        </a>

        <nav
          className="hidden items-start gap-6 self-stretch md:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link, i) => {
            const t = [
              { tint: "bg-paper-2", angle: "-3.5deg", string: 11 },
              { tint: "bg-blush", angle: "2.6deg", string: 18 },
              { tint: "bg-butter", angle: "-2.2deg", string: 8 },
              { tint: "bg-paper-3", angle: "3.2deg", string: 15 },
            ][i % 4];
            return (
              <a
                key={link.href}
                href={link.href}
                style={{ rotate: t.angle, animationDelay: `${i * 0.7}s` }}
                className="hover-swing animate-sway group flex flex-col items-center"
              >
                <span
                  aria-hidden="true"
                  className="-mt-px h-1.5 w-1.5 rounded-full bg-navy shadow-[0_1px_1px_rgba(20,49,122,0.25)]"
                />
                <span
                  aria-hidden="true"
                  className="w-px bg-navy/40"
                  style={{ height: t.string }}
                />
                <span
                  className={`relative rounded-b-md rounded-t-[3px] border border-line-strong px-3.5 pb-1.5 pt-2.5 font-display text-[0.85rem] font-medium italic leading-none text-navy shadow-[0_4px_10px_-4px_rgba(20,49,122,0.12)] transition-all duration-200 group-hover:border-navy group-hover:text-[#0D2563] group-hover:shadow-[0_6px_14px_-4px_rgba(20,49,122,0.18)] ${t.tint}`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-1 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-white ring-1 ring-navy/30"
                  />
                  {link.label}
                </span>
              </a>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <a
            href={SITE.calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="book"
            className="btn-ink btn-press inline-flex items-center gap-2 bg-[#78efeb] px-5 py-2.5 text-sm font-semibold text-navy shadow-[0_6px_16px_-6px_rgba(120,239,235,0.5)] [--ink-fill:var(--color-navy)] hover:text-white"
          >
            Book a call
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center text-navy md:hidden"
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

      <div
        id="mobile-menu"
        inert={!open}
        aria-hidden={!open}
        className={`overflow-hidden bg-white text-[#1E293B] md:hidden ${
          open ? "max-h-[420px] border-b border-line" : "max-h-0"
        } transition-all duration-300 ease-out`}
      >
        <div className="min-h-0 overflow-hidden bg-white">
        <nav className="container-x flex flex-col py-4" aria-label="Mobile">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline justify-between border-b border-line py-3.5 font-display text-xl italic text-navy"
            >
              {link.label}
              <span className="kicker text-muted">
                0{i + 1}
              </span>
            </a>
          ))}
          <a
            href={SITE.calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex items-center justify-center bg-[#78efeb] px-5 py-3 text-sm font-semibold text-navy"
          >
            Book a call
          </a>
        </nav>
        </div>
      </div>
    </header>
  );
}
