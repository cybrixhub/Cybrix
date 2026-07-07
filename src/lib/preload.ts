/** Coordination between the Preloader overlay and the Hero entrance. */

export const PRELOADER_KEY = "cybrix-preloader-shown";

/** Seconds the hero timeline waits when the preloader will play. */
export const PRELOADER_HERO_DELAY = 1.35;

/**
 * True when the letterpress preloader will run on this load.
 *
 * Opt-in: the preloader now only plays when the URL contains `?intro=1`
 * (or `#intro`) — this keeps first-visit LCP fast for organic traffic while
 * still letting us share a cinematic-intro link for pitches. Reduced motion
 * and same-session return visits always skip.
 */
export function willPreload(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return false;
  try {
    if (window.sessionStorage.getItem(PRELOADER_KEY)) return false;
  } catch {
    /* private mode — treat as first visit */
  }
  const p = new URLSearchParams(window.location.search);
  return p.get("intro") === "1" || window.location.hash === "#intro";
}
