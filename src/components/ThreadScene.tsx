"use client";

import { useEffect, useRef } from "react";

type ThreadSceneProps = {
  className?: string;
  /** Thread color (any CSS color). */
  color?: string;
  /** Overall opacity of the scene. */
  alpha?: number;
  /** 0–1: how tall the woven hills rise from the bottom. */
  rise?: number;
};

/** Deterministic pseudo-random from an integer (stable across frames). */
function hash(n: number) {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
}

/**
 * Woven-thread landscape (inspired by sondaven.com): the background is drawn
 * as dense vertical strands — rolling hills rising from the bottom, sparse
 * threads hanging from the sky — shimmering gently like fabric on a loom.
 * Pauses offscreen; renders a single static frame under reduced motion.
 */
export default function ThreadScene({
  className = "",
  color = "#f7efe4",
  alpha = 0.5,
  rise = 0.34,
}: ThreadSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let raf = 0;
    let last = 0;
    let visible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const hillTop = (x: number) => {
      const base =
        0.5 * Math.sin(x * 0.0015 + 1.7) +
        0.3 * Math.sin(x * 0.004 + 0.4) +
        0.2 * Math.sin(x * 0.011 + 2.9);
      return height * (1 - rise * (0.62 + 0.38 * base));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;

      const step = 5;
      for (let x = 0; x <= width; x += step) {
        const column = x / step;
        const r = hash(column);
        // occasional "loose thread" columns read as loom glitches
        const glitch = hash(column * 7.3) > 0.975 ? 30 * hash(column * 3.1) : 0;
        const sway = reduce
          ? 0
          : 5 * Math.sin(t * 0.0012 + column * 0.55) * hash(column + 9);

        // ground weave — rises from the bottom to the hill line
        const top = hillTop(x) + sway * 2 - glitch;
        ctx.globalAlpha = alpha * (0.55 + 0.45 * hash(column + 4));
        ctx.beginPath();
        ctx.moveTo(x + 0.5, height);
        ctx.lineTo(x + 0.5, top);
        ctx.stroke();

        // sparse sky threads hanging from the top edge
        if (r > 0.62) {
          const len = 6 + 44 * hash(column + 2) + sway;
          ctx.globalAlpha = alpha * 0.4;
          ctx.beginPath();
          ctx.moveTo(x + 0.5, 0);
          ctx.lineTo(x + 0.5, len);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || now - last < 130) return; // ~8fps — loom-like, cheap
      last = now;
      draw(now);
    };

    resize();
    draw(0);

    const ro = new ResizeObserver(() => {
      resize();
      draw(last);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    if (!reduce) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [color, alpha, rise]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
