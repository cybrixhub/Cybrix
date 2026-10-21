"use client";

import { useRef, useState, type ReactNode } from "react";
import Image from "next/image";

/**
 * Thumbnail that opens the full image in a native <dialog> lightbox.
 * The dialog handles focus trapping and Esc; `data-lenis-prevent` keeps
 * smooth-scroll from moving the page behind it.
 */
export default function ZoomImage({
  src,
  width,
  height,
  alt,
  caption,
  sizes,
  className = "",
  imageClassName = "",
  children,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  /** Optional overlay content rendered inside the trigger. */
  children?: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  // Full-size image mounts on first open (eager), so closed dialogs cost nothing.
  const [opened, setOpened] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpened(true);
          dialogRef.current?.showModal();
        }}
        aria-label={`Enlarge: ${alt}`}
        data-cursor="view"
        className={`group/zoom relative block w-full cursor-zoom-in overflow-hidden text-left ${className}`}
      >
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          sizes={sizes}
          className={`h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/zoom:scale-[1.02] ${imageClassName}`}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-navy/85 text-sm text-white opacity-0 shadow-[0_6px_16px_-6px_rgba(20,49,122,0.5)] transition-opacity duration-300 group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100"
        >
          ⤢
        </span>
        {children}
      </button>

      <dialog
        ref={dialogRef}
        data-lenis-prevent
        aria-label={alt}
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        className="m-auto max-h-[92svh] w-[min(96vw,1200px)] max-w-none overflow-auto bg-transparent p-0 backdrop:bg-[#0b1a44]/85 backdrop:backdrop-blur-sm open:animate-[pf-zoom-in_0.35s_cubic-bezier(0.16,1,0.3,1)]"
      >
        <figure className="relative rounded-md bg-white p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] sm:p-3">
          {opened ? (
            <Image
              src={src}
              width={width}
              height={height}
              alt={alt}
              sizes="(max-width: 1240px) 96vw, 1200px"
              loading="eager"
              className="h-auto w-full rounded-[3px]"
            />
          ) : (
            <div style={{ aspectRatio: `${width} / ${height}` }} />
          )}
          <figcaption className="flex items-start justify-between gap-4 px-1 pb-1 pt-3">
            <span className="text-sm leading-relaxed text-ink-soft">
              {caption ?? alt}
            </span>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="shrink-0 rounded-full border border-line-strong px-3.5 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
              autoFocus
            >
              Close ✕
            </button>
          </figcaption>
        </figure>
      </dialog>
    </>
  );
}
