/** Coordination between the Preloader overlay and the Hero entrance. */

export const PRELOADER_KEY = "cybrix-preloader-shown";

/** Seconds the hero timeline waits when the preloader will play. */
export const PRELOADER_HERO_DELAY = 1.35;

/**
 * True when the letterpress preloader will run on this load.
 * Client-only; call from effects. The preloader writes the session flag
 * only after it finishes, so all components mounting in the same commit
 * read a consistent answer.
 */
export function willPreload(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return false;
  try {
    return !window.sessionStorage.getItem(PRELOADER_KEY);
  } catch {
    return false;
  }
}
