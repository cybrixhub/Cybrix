import { adminFetch, type Lead, type LeadStats } from "@/lib/api";
import { SITE } from "@/lib/site";

// Always render fresh — no ISR, no cache.
export const dynamic = "force-dynamic";
export const revalidate = 0;

const LEAD_SOURCES = [
  { label: "Cal.com bookings", href: "https://app.cal.com/bookings/upcoming", desc: "Upcoming and past calls" },
  { label: "Vercel Analytics", href: "https://vercel.com/dashboard", desc: "Traffic, page views, conversions" },
  { label: "Meta Ads Manager", href: "https://adsmanager.facebook.com", desc: "Campaign leads & CPL" },
];

const STATUS_COLOR: Record<Lead["status"], string> = {
  new: "bg-teal-bright/15 text-teal-bright border-teal-bright/30",
  contacted: "bg-navy/10 text-navy border-navy/30",
  booked: "bg-green-500/15 text-green-600 border-green-500/30",
  lost: "bg-red-500/10 text-red-500 border-red-500/30",
  spam: "bg-muted/10 text-muted border-line",
};

type FetchResult<T> = { data: T; error?: undefined } | { data?: undefined; error: string };

async function fetchLeads(): Promise<FetchResult<Lead[]>> {
  try {
    const r = await adminFetch("/leads?limit=100");
    if (!r.ok) return { error: `Backend returned ${r.status}` };
    return { data: (await r.json()) as Lead[] };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Backend unreachable" };
  }
}

async function fetchStats(): Promise<FetchResult<LeadStats>> {
  try {
    const r = await adminFetch("/leads/stats");
    if (!r.ok) return { error: `Backend returned ${r.status}` };
    return { data: (await r.json()) as LeadStats };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Backend unreachable" };
  }
}

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-md border border-line bg-paper-2 p-5">
      <p className="kicker text-muted mb-2">{label}</p>
      <p className="font-display text-2xl italic text-ink">{value}</p>
      {sub && <p className="mt-1 text-xs text-muted">{sub}</p>}
    </div>
  );
}

function formatWhen(iso: string): string {
  try {
    const d = new Date(iso.endsWith("Z") ? iso : iso + "Z");
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const mins = Math.round(diffMs / 60_000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.round(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.round(hours / 24);
    if (days < 7) return `${days}d ago`;
    return d.toISOString().slice(0, 10);
  } catch {
    return iso;
  }
}

export default async function Leads() {
  const [leadsResult, statsResult] = await Promise.all([fetchLeads(), fetchStats()]);
  const leads = leadsResult.data ?? [];
  const stats = statsResult.data;
  const backendError = leadsResult.error ?? statsResult.error;

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <h1 className="font-display text-3xl italic text-ink">Leads</h1>
        <p className="mt-1 text-sm text-muted">
          Inbound leads from the site — form submissions, chat captures, all sources.
        </p>
      </div>

      {backendError && (
        <div className="rounded-md border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-500">
          <p className="font-medium">Backend unreachable</p>
          <p className="mt-1 text-xs opacity-80">
            {backendError}. Check that <code>CYBRIX_API_URL</code> and{" "}
            <code>CYBRIX_API_TOKEN</code> are set in Vercel and the VPS backend is up.
          </p>
        </div>
      )}

      {/* Live pipeline stats from the backend */}
      {stats && (
        <section>
          <p className="kicker text-muted mb-3">Pipeline this month</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard label="Total leads" value={stats.total} sub="all time" />
            <StatCard label="Today" value={stats.today} sub="new this session" />
            <StatCard label="New" value={stats.by_status["new"] ?? 0} sub="untouched" />
            <StatCard label="Booked" value={stats.by_status["booked"] ?? 0} sub="on the calendar" />
          </div>
        </section>
      )}

      {/* Real leads table */}
      <section>
        <p className="kicker text-muted mb-3">Recent leads ({leads.length})</p>
        {leads.length === 0 ? (
          <div className="rounded-md border border-line bg-paper-2 p-10 text-center">
            <p className="text-sm text-muted">
              {backendError
                ? "Can't load leads until the backend is reachable."
                : "No leads yet. New form submissions and chat captures will appear here."}
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-md border border-line bg-paper-2">
            <table className="w-full text-sm">
              <thead className="border-b border-line bg-paper-3">
                <tr className="text-left">
                  <th className="kicker text-muted px-4 py-3 font-normal">When</th>
                  <th className="kicker text-muted px-4 py-3 font-normal">Name</th>
                  <th className="kicker text-muted px-4 py-3 font-normal">Email</th>
                  <th className="kicker text-muted px-4 py-3 font-normal">Company</th>
                  <th className="kicker text-muted px-4 py-3 font-normal">Message</th>
                  <th className="kicker text-muted px-4 py-3 font-normal">Source</th>
                  <th className="kicker text-muted px-4 py-3 font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-line last:border-b-0 hover:bg-paper-3/50">
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-muted">{formatWhen(lead.created_at)}</td>
                    <td className="px-4 py-3 font-medium text-ink">{lead.name}</td>
                    <td className="px-4 py-3 text-teal-bright">
                      <a href={`mailto:${lead.email}`} className="hover:underline">{lead.email}</a>
                    </td>
                    <td className="px-4 py-3 text-ink-soft">{lead.company || "—"}</td>
                    <td className="px-4 py-3 text-ink-soft max-w-xs truncate" title={lead.message ?? undefined}>
                      {lead.message || "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted">
                      {lead.utm_source ? `${lead.source} · ${lead.utm_source}` : lead.source}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded border px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider ${STATUS_COLOR[lead.status]}`}>
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* External dashboards — unchanged from the old page */}
      <section>
        <p className="kicker text-muted mb-3">External sources</p>
        <div className="space-y-2">
          {LEAD_SOURCES.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-md border border-line bg-paper-2 px-5 py-4 transition-colors hover:border-line-strong hover:bg-paper-3"
            >
              <div>
                <p className="text-sm font-medium text-ink">{s.label}</p>
                <p className="text-xs text-muted">{s.desc}</p>
              </div>
              <span className="text-muted text-sm">↗</span>
            </a>
          ))}
        </div>
      </section>

      {/* Booking link */}
      <section>
        <p className="kicker text-muted mb-3">Your booking link</p>
        <div className="rounded-md border border-line bg-paper-2 px-5 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-ink">{SITE.calendarUrl}</p>
            <p className="text-xs text-muted mt-0.5">Share this to capture inbound calls</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <a
              href={SITE.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ink btn-press border border-navy bg-navy px-4 py-2 text-sm font-semibold text-white [--ink-fill:var(--color-navy-2)]"
            >
              Open ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
