import { useEffect, useLayoutEffect } from "react";

/** useLayoutEffect on the client, useEffect on the server — avoids SSR warnings. */
export const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;
