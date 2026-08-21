"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { WaMessage } from "@/lib/api";

export default function ThreadClient({
  phone,
  initialMessages,
  initialHumanTakeover,
}: {
  phone: string;
  initialMessages: WaMessage[];
  initialHumanTakeover: boolean;
}) {
  const [messages, setMessages] = useState<WaMessage[]>(initialMessages);
  const [humanTakeover, setHumanTakeover] = useState(initialHumanTakeover);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  async function toggleTakeover() {
    const next = !humanTakeover;
    setHumanTakeover(next); // optimistic
    try {
      const r = await fetch(`/api/whatsapp/conversation/${encodeURIComponent(phone)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ human_takeover: next }),
      });
      if (!r.ok) {
        setHumanTakeover(!next); // revert
        setError("Couldn't toggle takeover. Try again.");
      }
    } catch {
      setHumanTakeover(!next);
      setError("Network error toggling takeover.");
    }
  }

  async function sendReply(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = replyText.trim();
    if (!text) return;
    setSending(true);
    setError(null);
    try {
      const r = await fetch("/api/whatsapp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to_phone: phone, body: text }),
      });
      if (!r.ok) {
        const d = (await r.json().catch(() => ({}))) as { error?: string };
        setError(d.error ?? "Send failed.");
        return;
      }
      // Optimistically append — backend also persisted it, so next reload matches.
      setMessages((prev) => [
        ...prev,
        {
          id: -Date.now(),
          phone,
          direction: "out",
          body: text,
          sent_at: new Date().toISOString(),
        },
      ]);
      setReplyText("");
    } catch {
      setError("Network error sending reply.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <div className="mt-4 flex items-center gap-3 rounded-md border border-line bg-paper-2 px-4 py-3">
        <label className="flex cursor-pointer items-center gap-3 text-sm text-ink">
          <input
            type="checkbox"
            checked={humanTakeover}
            onChange={toggleTakeover}
            className="h-4 w-4"
          />
          <span>Human takeover — pause the auto-bot for this contact</span>
        </label>
      </div>

      {/* Thread */}
      <div className="mt-4 flex max-h-[60vh] flex-col gap-3 overflow-y-auto rounded-md border border-line bg-paper-2 p-4">
        {messages.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted">No messages yet.</p>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.direction === "out" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-lg px-4 py-2.5 text-sm ${
                  m.direction === "out"
                    ? "bg-navy text-white"
                    : "bg-paper-3 text-ink"
                }`}
              >
                <p className="whitespace-pre-wrap">{m.body}</p>
                <p
                  className={`mt-1 text-[0.6rem] uppercase tracking-wider ${
                    m.direction === "out" ? "text-white/50" : "text-muted"
                  }`}
                >
                  {m.direction === "out" ? "Sent" : "Received"} ·{" "}
                  {new Date(m.sent_at.endsWith("Z") ? m.sent_at : m.sent_at + "Z").toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Reply form */}
      <form onSubmit={sendReply} className="mt-4 flex gap-2">
        <input
          type="text"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder={humanTakeover ? "Write your reply…" : "Reply manually (bot is currently on)"}
          disabled={sending}
          className="input flex-1"
        />
        <button
          type="submit"
          disabled={sending || replyText.trim().length === 0}
          className="btn-ink btn-press border border-navy bg-navy px-5 py-2 text-sm font-semibold text-white [--ink-fill:var(--color-navy-2)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? "Sending…" : "Send"}
        </button>
      </form>
      {error && (
        <p role="alert" className="mt-2 text-xs font-medium text-red-500">
          {error}
        </p>
      )}
      {!humanTakeover && (
        <p className="mt-3 text-xs text-muted">
          Bot is on. Your reply will be sent but the bot will continue handling future messages
          unless you flip the toggle above.
        </p>
      )}
    </>
  );
}
