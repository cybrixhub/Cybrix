"use client";

import { useEffect, useRef, useState } from "react";

export default function ServiceVideo({ slug, name }: { slug: string; name: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [missing, setMissing] = useState(false);

 useEffect(() => {
  const vid = videoRef.current;

  if (slug !== "admission-booster" && vid) {
    vid.play().catch(() => {});
  }
}, [slug]);

  const isYoutube = true;

  return (
    <div className="container-x py-16 sm:py-20">
      <div className="overflow-hidden rounded-lg border border-line-strong shadow-[0_24px_56px_-24px_rgba(20,49,122,0.15)]">
        {/* Chrome bar */}
        <div className="flex items-center justify-between border-b border-line-strong bg-blush px-3 py-2 sm:px-4 sm:py-2.5">
          <span className="flex min-w-0 items-center gap-2">
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 rounded-full bg-teal-bright"
            />
            <span className="truncate font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-soft">
              {isYoutube ? "YouTube Video" : `${slug}.mp4`}
            </span>
          </span>

          <span className="ml-3 shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted">
            Service overview
          </span>
        </div>

        {/* Video */}
        <div className="relative aspect-video bg-navy">
          {isYoutube ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/8QD2faW2aMI"
              title="Admission Booster"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <>
              <video
                ref={videoRef}
                src={`/videos/${slug}.mp4`}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onError={() => setMissing(true)}
                onCanPlay={() => setMissing(false)}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                  missing ? "opacity-0" : "opacity-100"
                }`}
              />

              {/* Placeholder */}
              <div
                aria-hidden="true"
                className={`absolute inset-0 flex flex-col items-center justify-center gap-5 transition-opacity duration-300 ${
                  missing ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="bg-grain absolute inset-0 opacity-20" />

                <div className="relative flex flex-col items-center gap-4 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-white text-navy">
                    <svg
                      width="16"
                      height="19"
                      viewBox="0 0 16 19"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M1 1.5 L15 9.5 L1 17.5 Z" fill="currentColor" />
                    </svg>
                  </span>

                  <p className="font-display text-lg font-medium italic text-[#B9CBE4]">
                    {name} — overview video
                  </p>

                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#8ba0c0]">
                    <span className="sm:hidden">Video coming soon</span>
                    <span className="hidden sm:inline">
                      Drop /public/videos/{slug}.mp4 to activate
                    </span>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}