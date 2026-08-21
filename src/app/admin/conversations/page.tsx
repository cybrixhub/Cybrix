import Link from "next/link";
import { adminFetch, type Conversation } from "@/lib/api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function fetchConversations(): Promise<{ data?: Conversation[]; error?: string }> {
  try {
    const r = await adminFetch("/conversations?limit=100");
    if (!r.ok) return { error: `Backend returned ${r.status}` };
    return { data: (await r.json()) as Conversation[] };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Backend unreachable" };
  }
}

function formatWhen(iso: string): string {
  try {
    const d = new Date(iso.endsWith("Z") ? iso : iso + "Z");
    const diffMs = Date.now() - d.getTime();
    const mins = Math.round(diffMs / 60_000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.round(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.round(hours / 24)}d ago`;
  } catch {
    return iso;
  }
}

export default async function Conversations() {
  const { data: conversations, error } = await fetchConversations();
  const rows = conversations ?? [];

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-3xl italic text-ink">Conversations</h1>
        <p className="mt-1 text-sm text-muted">
          Inbound WhatsApp chats — the bot replies automatically unless you turn on human takeover.
        </p>
      </div>

      {error && (
        <div className="rounded-md border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-500">
          <p className="font-medium">Backend unreachable</p>
          <p className="mt-1 text-xs opacity-80">
            {error}. Check <code>CYBRIX_API_URL</code> + <code>CYBRIX_API_TOKEN</code>.
          </p>
        </div>
      )}

      {rows.length === 0 ? (
        <div className="rounded-md border border-line bg-paper-2 p-10 text-center">
          <p className="text-sm text-muted">
            {error
              ? "Can't load conversations until the backend is reachable."
              : "No WhatsApp conversations yet. New chats will appear here as they come in."}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-md border border-line bg-paper-2">
          <ul className="divide-y divide-line">
            {rows.map((c) => (
              <li key={c.phone}>
                <Link
                  href={`/admin/conversations/${encodeURIComponent(c.phone)}`}
                  className="flex items-start gap-4 px-5 py-4 transition-colors hover:bg-paper-3"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy text-sm font-semibold text-white">
                    {(c.name ?? c.phone).slice(0, 1).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="truncate font-medium text-ink">
                        {c.name ?? `+${c.phone}`}
                      </p>
                      <span className="shrink-0 text-xs text-muted">{formatWhen(c.last_seen)}</span>
                    </div>
                    <div className="mt-0.5 flex items-baseline gap-2">
                      {c.last_direction === "out" && (
                        <span aria-hidden="true" className="text-xs text-muted">↩</span>
                      )}
                      <p className="truncate text-sm text-ink-soft">
                        {c.last_message ?? "(no messages)"}
                      </p>
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[0.65rem] font-medium uppercase tracking-wider">
                      {c.human_takeover && (
                        <span className="rounded border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-amber-600">
                          Human takeover
                        </span>
                      )}
                      {c.lead_id && (
                        <span className="rounded border border-teal-bright/30 bg-teal-bright/15 px-2 py-0.5 text-teal-bright">
                          Lead #{c.lead_id}
                        </span>
                      )}
                    </div>
                  </div>
                  {c.unread_count > 0 && (
                    <div className="shrink-0 rounded-full bg-teal-bright px-2.5 py-1 text-[0.65rem] font-bold text-navy">
                      {c.unread_count}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
