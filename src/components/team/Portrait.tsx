"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RoleIcon } from "./RoleMotif";
import type { TeamMember } from "@/lib/team";

/**
 * Team portrait: focal-point crop + optional zoom, a gentle hover zoom (via a
 * `group` ancestor), a clip-path reveal when scrolled into view, and a clean
 * monogram fallback if the image fails to load.
 *
 * The reveal only arms after mount and only when motion is allowed, so
 * server-rendered / no-JS / reduced-motion visitors always see the photo.
 */
export default function Portrait({
  member,
  sizes,
  priority = false,
  reveal = true,
  className = "",
}: {
  member: TeamMember;
  sizes: string;
  priority?: boolean;
  /** Scroll-in clip reveal; off for portraits that live in a carousel. */
  reveal?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);
  const [state, setState] = useState<"static" | "pending" | "shown">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el || !reveal) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    // Already on screen at load: leave it visible rather than hiding it.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    setState("pending");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    // Safety net: a portrait is never left hidden if the observer is slow.
    const fallback = window.setTimeout(() => {
      if (el.getBoundingClientRect().top < window.innerHeight) setState("shown");
    }, 1500);
    const onScroll = () => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        setState("shown");
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reveal]);

  const zoom = member.photo.zoom ?? 1;
  const words = member.name.trim().split(/\s+/);
  const initials = (
    words.length > 1 ? words[0][0] + words[words.length - 1][0] : words[0].slice(0, 2)
  ).toUpperCase();

  return (
    <div
      ref={ref}
      data-reveal-state={state}
      className={`tm-portrait @container relative overflow-hidden bg-navy-2 ${className}`}
    >
      {failed || !member.photo.src ? (
        <div
          role="img"
          aria-label={`${member.name}, ${member.role} — photo coming soon`}
          className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_20%,#1B3D8F,#14317a_70%)] pb-[12%] text-white @[9rem]:pb-[18%]"
        >
          <div className="flex flex-col items-center gap-1.5 @[9rem]:gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-[#78efeb]/40 text-[#78efeb] @[9rem]:h-16 @[9rem]:w-16">
              <RoleIcon role={member.key} className="h-4 w-4 @[9rem]:h-7 @[9rem]:w-7" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight @[9rem]:text-2xl">{initials}</span>
            <span className="hidden font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[#B9CBE4] @[9rem]:inline">
              Photo coming soon
            </span>
          </div>
        </div>
      ) : (
        <div className="tm-portrait-img absolute inset-0">
          <Image
            src={member.photo.src}
            alt={member.photo.alt}
            fill
            sizes={sizes}
            priority={priority}
            onError={() => setFailed(true)}
            style={{
              objectPosition: member.photo.position,
              transformOrigin: member.photo.position ?? "50% 30%",
              ["--tm-zoom" as string]: zoom,
            }}
            className="object-cover [scale:var(--tm-zoom)] transition-[scale] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[scale:calc(var(--tm-zoom)*1.05)]"
          />
        </div>
      )}
    </div>
  );
}
