"use client";

import { useEffect, useRef, useState } from "react";

type WovenWordmarkProps = {
  text?: string;
  /** Thread color. */
  color?: string;
  className?: string;
};

import { hash } from "@/lib/hash";

/**
 * Giant display type rendered as woven vertical threads (the sondaven.com
 * wordmark treatment): the glyphs are sampled from canvas text, then redrawn
 * as strands whose ends fray and shimmer. Decorative only — pair it with real
 * text for assistive tech. Falls back to plain text if sampling fails.
 */
export default function WovenWordmark({
  text = "Cybrix.",
  color = "#f7efe4",
  className = "",
}: WovenWordmarkProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setFailed(true);
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Cap at 1.5 — matches ThreadScene; beyond that the gain is invisible
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let raf = 0;
    let last = 0;
    let visible = true;
    let strands: { x: number; top: number; bottom: number; edge: boolean }[] =
      [];
    let width = 0;
    let height = 0;
    let cancelled = false;

    const STEP = 4; // px between threads

    const sample = () => {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      // Scale backing store for retina; drawing stays in CSS px via setTransform
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // next/font renames the family — read the real one off the host.
      const family = getComputedStyle(host).fontFamily || "Georgia, serif";

      const off = document.createElement("canvas");
      off.width = width;
      off.height = height;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) throw new Error("no 2d context");

      // Size the type to span the full width, like a masthead — capped so
      // italic descenders never clip at the canvas bottom.
      octx.font = `italic 500 100px ${family}`;
      const measured = octx.measureText(text).width || 1;
      const fontSize = Math.min(height * 0.8, (100 * (width * 0.94)) / measured);
      octx.font = `italic 500 ${fontSize}px ${family}`;
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillStyle = "#fff";
      octx.fillText(text, width / 2, height * 0.5);

      // Every contiguous vertical run per column becomes its own strand,
      // so counters and letter shapes survive the weave.
      const data = octx.getImageData(0, 0, width, height).data;
      strands = [];
      for (let x = 0; x < width; x += STEP) {
        let runStart = -1;
        for (let y = 0; y <= height; y += 2) {
          const on =
            y < height && data[(y * width + x) * 4 + 3] > 100;
          if (on && runStart < 0) runStart = y;
          if (!on && runStart >= 0) {
            if (y - runStart > 3) {
              strands.push({
                x,
                top: runStart,
                bottom: y,
                // outer edges of the glyph fray; inner edges stay crisp
                edge: runStart < 4 || y > height - 6,
              });
            }
            runStart = -1;
          }
        }
      }
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = color;
      ctx.lineWidth = STEP - 1.5;
      for (let i = 0; i < strands.length; i++) {
        const s = strands[i];
        const r = hash(i, 311.7);
        // frayed, shimmering thread ends
        const fray = reduce ? 0 : 5 * Math.sin(t * 0.002 + i * 0.7) * (0.3 + r);
        const drop =
          hash(i * 3.7, 311.7) > 0.96 ? height * 0.03 * hash(i * 1.3, 311.7) : 0;
        ctx.globalAlpha = 0.82 + 0.18 * r;
        ctx.beginPath();
        ctx.moveTo(s.x + 0.5, Math.max(0, s.top - Math.abs(fray) * 0.4));
        ctx.lineTo(
          s.x + 0.5,
          Math.min(height, s.bottom + Math.abs(fray) + drop),
        );
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || now - last < 115) return; // ~9fps loom shimmer
      last = now;
      draw(now);
    };

    const start = async () => {
      try {
        await document.fonts.ready;
        if (cancelled) return;
        sample();
        draw(0);
        if (!reduce) raf = requestAnimationFrame(loop);
      } catch {
        setFailed(true);
      }
    };

    start();

    const ro = new ResizeObserver(() => {
      if (cancelled) return;
      try {
        sample();
        draw(last);
      } catch {
        setFailed(true);
      }
    });
    ro.observe(host);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(host);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [text, color]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={`pointer-events-none relative select-none font-display ${className}`}
    >
      {failed ? (
        <span
          className="block text-center font-display font-medium italic leading-[0.85]"
          style={{ color, fontSize: "min(20vw, 16rem)" }}
        >
          {text}
        </span>
      ) : (
        <canvas ref={canvasRef} className="block h-full w-full" />
      )}
    </div>
  );
}
