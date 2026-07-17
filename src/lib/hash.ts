/** Deterministic pseudo-random from an integer, stable across server/client renders. */
export function hash(n: number, seed = 127.1) {
  const s = Math.sin(n * seed) * 43758.5453;
  return s - Math.floor(s);
}
