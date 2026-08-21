// Cybrix API — the FastAPI backend on the VPS (n8n router in front of it for automations).
// CYBRIX_API_URL and CYBRIX_API_TOKEN are SERVER-ONLY (no NEXT_PUBLIC_ prefix).
// The browser never sees them.
//
// NOTE: this file also ships from feat/lead-capture-backend (Phase 1) and
// feat/whatsapp-bot (Phase 2). Identical bytes across all three so git can
// merge cleanly whichever PR lands last.

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

// ─── Leads (Phase 1) ───────────────────────────────────────────────────────
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
  status: "sourced" | "new" | "contacted" | "replied" | "booked" | "lost" | "spam";
  notes: string | null;
  first_name: string | null;
  last_name: string | null;
  title: string | null;
  linkedin_url: string | null;
  apollo_id: string | null;
  created_at: string;
};

export type LeadStats = {
  total: number;
  today: number;
  by_status: Record<string, number>;
};

// ─── WhatsApp conversations (Phase 2) ──────────────────────────────────────
export type Conversation = {
  phone: string;
  name: string | null;
  first_seen: string;
  last_seen: string;
  unread_count: number;
  human_takeover: boolean;
  lead_id: number | null;
  last_message: string | null;
  last_direction: "in" | "out" | null;
};

export type WaMessage = {
  id: number;
  phone: string;
  direction: "in" | "out";
  body: string;
  sent_at: string;
};

// ─── Apollo + Campaigns (Phase 3) ──────────────────────────────────────────
export type ApolloPerson = {
  apollo_id: string;
  name: string;
  first_name: string | null;
  last_name: string | null;
  title: string | null;
  email: string | null;
  linkedin_url: string | null;
  company: string | null;
  location: string | null;
};

export type ApolloSearchOut = {
  count: number;
  people: ApolloPerson[];
  mock: boolean;
};

export type Campaign = {
  id: number;
  name: string;
  subject: string;
  body: string;
  filter_source: string;
  filter_status: string;
  filter_titles: string | null;
  filter_locations: string | null;
  status: "draft" | "sending" | "sent" | "paused";
  created_at: string;
  total_sent: number;
  total_pending: number;
  total_replied: number;
};
