"use client";

import { useEffect, useRef, useState } from "react";
import { TICKER } from "@/lib/site";
import { useMediaQuery, REDUCED_MOTION } from "@/lib/useMediaQuery";

/**
 * Espresso capability ticker — serif italic words with mono slashes.
 * JS-driven marquee: seamless loop, pause button (WCAG 2.2.2), pauses on
 * hover, and drags with momentum. Reduced motion renders it static.
 */
export default function Ticker() {
  const [paused, setPaused] = useState(false);
  const isStatic = useMediaQuery(REDUCED_MOTION);
  const viewport = useRef<HTMLDivElement | null>(null);
  const track = useRef<HTMLDivElement | null>(null);
  const state = useRef({
    x: 0,
    half: 0,
    velocity: 0,
    hovering: false,
    dragging: false,
    dragStartX: 0,
    dragStartOffset: 0,
    lastDragX: 0,
  });

  useEffect(() => {
    if (isStatic) return;

    const tr = track.current;
    const vp = viewport.current;
    if (!tr || !vp) return;
    const s = state.current;

    const measure = () => {
      s.half = tr.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(tr);

    const BASE_SPEED = 0.55; // px per frame at 60fps

    let rafId = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min((now - last) / (1000 / 60), 3); // frames elapsed
      last = now;

      if (!s.dragging) {
        if (Math.abs(s.velocity) > BASE_SPEED) {
          // glide out of a throw, then settle back to the base drift
          s.x += s.velocity * dt;
          s.velocity *= Math.pow(0.94, dt);
        } else if (!paused && !s.hovering) {
          s.x -= BASE_SPEED * dt;
        }
      }

      if (s.half > 0) {
        while (s.x <= -s.half) s.x += s.half;
        while (s.x > 0) s.x -= s.half;
      }
      tr.style.transform = `translateX(${s.x}px)`;
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const onEnter = () => (s.hovering = true);
    const onLeave = () => {
      s.hovering = false;
      s.dragging = false;
    };
    const onDown = (e: PointerEvent) => {
      s.dragging = true;
      s.velocity = 0;
      s.dragStartX = e.clientX;
      s.lastDragX = e.clientX;
      s.dragStartOffset = s.x;
      vp.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!s.dragging) return;
      s.velocity = (e.clientX - s.lastDragX) * 0.9;
      s.lastDragX = e.clientX;
      s.x = s.dragStartOffset + (e.clientX - s.dragStartX);
    };
    const onUp = () => {
      s.dragging = false;
    };

    vp.addEventListener("pointerenter", onEnter);
    vp.addEventListener("pointerleave", onLeave);
    vp.addEventListener("pointerdown", onDown);
    vp.addEventListener("pointermove", onMove);
    vp.addEventListener("pointerup", onUp);
    vp.addEventListener("pointercancel", onUp);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      vp.removeEventListener("pointerenter", onEnter);
      vp.removeEventListener("pointerleave", onLeave);
      vp.removeEventListener("pointerdown", onDown);
      vp.removeEventListener("pointermove", onMove);
      vp.removeEventListener("pointerup", onUp);
      vp.removeEventListener("pointercancel", onUp);
    };
  }, [paused, isStatic]);

  const items = isStatic ? TICKER : [...TICKER, ...TICKER];

  return (
    <section
      aria-label="What we do, at a glance"
      className="relative overflow-hidden border-y border-navy-line bg-navy py-5 text-white"
    >
      <div
        ref={viewport}
        data-cursor={isStatic ? undefined : "drag"}
        className={`${isStatic ? "" : "marquee-mask cursor-grab touch-pan-y select-none active:cursor-grabbing"}`}
      >
        <div
          ref={track}
          className={`flex items-baseline gap-8 ${
            isStatic ? "flex-wrap justify-center px-4" : "w-max"
          }`}
        >
          {items.map((item, i) => (
            <span
              key={`${item}-${i}`}
              aria-hidden={i >= TICKER.length}
              className="flex items-baseline gap-8 whitespace-nowrap"
            >
              <span
                className={`font-display text-2xl tracking-tight ${
                  ["text-white", "text-[#78efeb]", "text-[#B9CBE4]"][i % 3]
                }`}
              >
                {item}
              </span>
              <span className="font-mono text-sm text-[#78efeb]">/</span>
            </span>
          ))}
        </div>
      </div>

      {!isStatic && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="absolute bottom-1 right-2 z-10 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#B9CBE4] transition-colors hover:text-white"
        >
          {paused ? "▶ Play" : "❚❚ Pause"}
        </button>
      )}
    </section>
  );
}
