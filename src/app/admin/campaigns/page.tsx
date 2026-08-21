import Link from "next/link";
import { adminFetch, type Campaign } from "@/lib/api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const STATUS_BADGE: Record<Campaign["status"], string> = {
  draft: "bg-muted/10 text-muted border-line",
  sending: "bg-amber-500/10 text-amber-600 border-amber-500/30",
  sent: "bg-green-500/15 text-green-600 border-green-500/30",
  paused: "bg-red-500/10 text-red-500 border-red-500/30",
};

async function fetchCampaigns(): Promise<{ data?: Campaign[]; error?: string }> {
  try {
    const r = await adminFetch("/campaigns");
    if (!r.ok) return { error: `Backend returned ${r.status}` };
    return { data: (await r.json()) as Campaign[] };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Backend unreachable" };
  }
}

export default async function Campaigns() {
  const { data: campaigns, error } = await fetchCampaigns();
  const rows = campaigns ?? [];

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl italic text-ink">Campaigns</h1>
          <p className="mt-1 text-sm text-muted">
            Outbound sequences. Build one, target sourced leads, hit send.
          </p>
        </div>
        <Link
          href="/admin/campaigns/new"
          className="btn-ink btn-press border border-navy bg-navy px-4 py-2 text-sm font-semibold text-white [--ink-fill:var(--color-navy-2)]"
        >
          New campaign
        </Link>
      </div>

      {error && (
        <div className="rounded-md border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-500">
          <p className="font-medium">Backend unreachable</p>
          <p className="mt-1 text-xs opacity-80">{error}</p>
        </div>
      )}

      {rows.length === 0 ? (
        <div className="rounded-md border border-line bg-paper-2 p-10 text-center">
          <p className="text-sm text-muted">
            {error
              ? "Can't load campaigns until the backend is reachable."
              : "No campaigns yet. Source some leads on /admin/sourcing first, then build a campaign."}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-md border border-line bg-paper-2">
          <table className="w-full text-sm">
            <thead className="border-b border-line bg-paper-3 text-left">
              <tr>
                <th className="kicker text-muted px-4 py-3 font-normal">Name</th>
                <th className="kicker text-muted px-4 py-3 font-normal">Subject</th>
                <th className="kicker text-muted px-4 py-3 font-normal">Audience</th>
                <th className="kicker text-muted px-4 py-3 font-normal">Sent</th>
                <th className="kicker text-muted px-4 py-3 font-normal">Replied</th>
                <th className="kicker text-muted px-4 py-3 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id} className="border-b border-line last:border-b-0 hover:bg-paper-3/50">
                  <td className="px-4 py-3 font-medium text-ink">
                    <Link href={`/admin/campaigns/${c.id}`} className="hover:underline">{c.name}</Link>
                  </td>
                  <td className="px-4 py-3 max-w-xs truncate text-ink-soft" title={c.subject}>{c.subject}</td>
                  <td className="px-4 py-3 text-xs text-muted">
                    {c.filter_source}/{c.filter_status}
                    {c.filter_titles && <><br />titles: {c.filter_titles}</>}
                  </td>
                  <td className="px-4 py-3 font-mono text-sm">{c.total_sent}</td>
                  <td className="px-4 py-3 font-mono text-sm text-teal-bright">{c.total_replied}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded border px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider ${STATUS_BADGE[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
