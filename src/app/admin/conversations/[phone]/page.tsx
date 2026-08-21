import Link from "next/link";
import { notFound } from "next/navigation";
import { adminFetch, type Conversation, type WaMessage } from "@/lib/api";
import ThreadClient from "./ThreadClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function fetchThread(phone: string): Promise<{
  conversation: Conversation | null;
  messages: WaMessage[];
  error?: string;
}> {
  try {
    const [convRes, msgsRes] = await Promise.all([
      adminFetch("/conversations?limit=200"),
      adminFetch(`/conversations/${encodeURIComponent(phone)}/messages`),
    ]);
    if (!msgsRes.ok) return { conversation: null, messages: [], error: `Backend ${msgsRes.status}` };
    const all = (await convRes.json().catch(() => [])) as Conversation[];
    const conv = all.find((c) => c.phone === phone) ?? null;
    const messages = (await msgsRes.json()) as WaMessage[];
    return { conversation: conv, messages };
  } catch (e) {
    return { conversation: null, messages: [], error: e instanceof Error ? e.message : "unreachable" };
  }
}

export default async function ConversationThread(props: { params: Promise<{ phone: string }> }) {
  const { phone } = await props.params;
  const { conversation, messages, error } = await fetchThread(phone);

  if (error && messages.length === 0 && !conversation) {
    // Genuine backend error — show it rather than a stale 404.
    return (
      <div className="max-w-3xl">
        <Link href="/admin/conversations" className="kicker text-muted hover:text-ink">← Back</Link>
        <div className="mt-6 rounded-md border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-500">
          Backend unreachable: {error}
        </div>
      </div>
    );
  }
  if (!conversation && messages.length === 0) notFound();

  return (
    <div className="max-w-3xl">
      <Link href="/admin/conversations" className="kicker text-muted hover:text-ink">← All conversations</Link>
      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl italic text-ink">
            {conversation?.name ?? `+${phone}`}
          </h1>
          <p className="mt-0.5 text-xs text-muted">
            +{phone} · first seen {conversation?.first_seen.slice(0, 10) ?? "—"}
          </p>
        </div>
      </div>

      <ThreadClient
        phone={phone}
        initialMessages={messages}
        initialHumanTakeover={conversation?.human_takeover ?? false}
      />
    </div>
  );
}
