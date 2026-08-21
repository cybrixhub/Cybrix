// Cybrix API — the FastAPI backend on the VPS (n8n router in front of it for automations).
// Both env vars are SERVER-ONLY (no NEXT_PUBLIC_ prefix). The browser never sees them.

export const CYBRIX_API_URL = process.env.CYBRIX_API_URL ?? "";
export const CYBRIX_API_TOKEN = process.env.CYBRIX_API_TOKEN ?? "";

export function apiUrl(path: string): string {
  if (!CYBRIX_API_URL) throw new Error("CYBRIX_API_URL not set");
  const base = CYBRIX_API_URL.replace(/\/+$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
}

/** Admin fetch — server-only. Attaches the bearer token. */
export async function adminFetch(path: string, init: RequestInit = {}): Promise<Response> {
  if (!CYBRIX_API_TOKEN) throw new Error("CYBRIX_API_TOKEN not set");
  return fetch(apiUrl(path), {
    ...init,
    headers: {
      ...(init.headers ?? {}),
      Authorization: `Bearer ${CYBRIX_API_TOKEN}`,
    },
    cache: "no-store",
  });
}

export type Lead = {
  id: number;
  name: string;
  email: string;
  company: string | null;
  message: string | null;
  source: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  status: "new" | "contacted" | "booked" | "lost" | "spam";
  notes: string | null;
  created_at: string;
};

export type LeadStats = {
  total: number;
  today: number;
  by_status: Record<string, number>;
};
