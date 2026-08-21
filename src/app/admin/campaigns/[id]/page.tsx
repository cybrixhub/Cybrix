import Link from "next/link";
import { notFound } from "next/navigation";
import { adminFetch, type Campaign } from "@/lib/api";
import SendControls from "./SendControls";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function fetchCampaign(id: string): Promise<Campaign | null> {
  try {
    const r = await adminFetch(`/campaigns/${encodeURIComponent(id)}`);
    if (r.status === 404) return null;
    if (!r.ok) throw new Error(`Backend ${r.status}`);
    return (await r.json()) as Campaign;
  } catch {
    return null;
  }
}

export default async function CampaignDetail(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const c = await fetchCampaign(id);
  if (!c) notFound();

  const total = c.total_sent + c.total_pending;
  const pct = total > 0 ? Math.round((c.total_sent / total) * 100) : 0;

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <Link href="/admin/campaigns" className="kicker text-muted hover:text-ink">← Campaigns</Link>
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-4">
          <h1 className="font-display text-3xl italic text-ink">{c.name}</h1>
          <span className="kicker text-muted">Created {c.created_at.slice(0, 10)}</span>
        </div>
      </div>

      {/* Progress card */}
      <div className="rounded-md border border-line bg-paper-2 p-5">
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <p className="kicker text-muted">Progress</p>
          <span className="kicker text-muted">Status: <span className="text-ink">{c.status}</span></span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-md border border-line bg-paper p-4">
            <p className="kicker text-muted">Sent</p>
            <p className="font-display text-2xl italic text-ink">{c.total_sent}</p>
          </div>
          <div className="rounded-md border border-line bg-paper p-4">
            <p className="kicker text-muted">Pending</p>
            <p className="font-display text-2xl italic text-ink">{c.total_pending}</p>
          </div>
          <div className="rounded-md border border-line bg-paper p-4">
            <p className="kicker text-muted">Replied</p>
            <p className="font-display text-2xl italic text-teal-bright">{c.total_replied}</p>
          </div>
        </div>
        {total > 0 && (
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-line">
            <div className="h-full bg-navy transition-all" style={{ width: `${pct}%` }} />
          </div>
        )}
      </div>

      {/* Audience */}
      <div className="rounded-md border border-line bg-paper-2 p-5 text-sm">
        <p className="kicker text-muted mb-2">Audience filter</p>
        <ul className="space-y-1 text-ink-soft">
          <li>Source: <strong className="text-ink">{c.filter_source}</strong></li>
          <li>Status: <strong className="text-ink">{c.filter_status}</strong></li>
          {c.filter_titles && <li>Title contains: <strong className="text-ink">{c.filter_titles}</strong></li>}
          {c.filter_locations && <li>Location: <strong className="text-ink">{c.filter_locations}</strong></li>}
        </ul>
      </div>

      {/* Template preview */}
      <div className="rounded-md border border-line bg-paper-2 p-5">
        <p className="kicker text-muted mb-2">Template</p>
        <p className="text-sm font-medium text-ink">{c.subject}</p>
        <pre className="mt-3 whitespace-pre-wrap font-mono text-xs text-ink-soft">{c.body}</pre>
      </div>

      {/* Send controls */}
      <SendControls campaignId={c.id} status={c.status} pending={c.total_pending} />
    </div>
  );
}
