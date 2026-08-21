"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Link from "next/link";

const DEFAULT_SUBJECT = "Quick idea for {company}";
const DEFAULT_BODY = `Hi {first_name},

I noticed {company} and think there's a real chance to lift your lead flow — Meta Ads that convert straight into booked calls, without the "traffic but no conversions" gap most agencies leave open.

Cybrix has built this exact loop for 120+ founders since 2020. Worth a 20-minute look?

Grab a slot: https://cal.com/cybrix-talha/30min

— Talha`;

export default function NewCampaign() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [subject, setSubject] = useState(DEFAULT_SUBJECT);
  const [body, setBody] = useState(DEFAULT_BODY);
  const [titles, setTitles] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const r = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          subject: subject.trim(),
          body: body.trim(),
          filter_source: "apollo",
          filter_status: "sourced",
          filter_titles: titles.trim() || null,
        }),
      });
      if (!r.ok) {
        const d = (await r.json().catch(() => ({}))) as { error?: string; detail?: string };
        setError(d.error ?? d.detail ?? `Failed (${r.status})`);
        return;
      }
      const created = (await r.json()) as { id: number };
      router.push(`/admin/campaigns/${created.id}`);
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <Link href="/admin/campaigns" className="kicker text-muted hover:text-ink">← Campaigns</Link>
        <h1 className="mt-3 font-display text-3xl italic text-ink">New campaign</h1>
      </div>

      <form onSubmit={onSubmit} className="space-y-5 rounded-md border border-line bg-paper-2 p-6">
        <label className="block">
          <span className="kicker text-muted mb-1.5 block">Internal name</span>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Aug 2026 — Pakistan consultants"
            className="input w-full"
          />
        </label>

        <label className="block">
          <span className="kicker text-muted mb-1.5 block">Filter by title contains (optional, comma-separated)</span>
          <input
            type="text"
            value={titles}
            onChange={(e) => setTitles(e.target.value)}
            placeholder="Founder, CEO, Partner"
            className="input w-full"
          />
          <span className="mt-1 block text-xs text-muted">
            Empty = every sourced Apollo lead. Case-insensitive substring match on the lead&apos;s job title.
          </span>
        </label>

        <label className="block">
          <span className="kicker text-muted mb-1.5 block">Subject</span>
          <input
            required
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="input w-full"
          />
        </label>

        <label className="block">
          <span className="kicker text-muted mb-1.5 block">Body</span>
          <textarea
            required
            rows={12}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="input w-full resize-y font-mono text-sm"
          />
          <span className="mt-1 block text-xs text-muted">
            Placeholders: <code>{"{first_name}"}</code>, <code>{"{last_name}"}</code>, <code>{"{title}"}</code>, <code>{"{company}"}</code>. Newlines become &lt;br/&gt;.
          </span>
        </label>

        {error && <p role="alert" className="text-sm font-medium text-red-500">{error}</p>}

        <div className="flex items-center justify-end gap-3">
          <Link href="/admin/campaigns" className="text-sm text-muted hover:text-ink">Cancel</Link>
          <button
            type="submit"
            disabled={saving}
            className="btn-ink btn-press border border-navy bg-navy px-5 py-2 text-sm font-semibold text-white [--ink-fill:var(--color-navy-2)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Creating…" : "Create campaign"}
          </button>
        </div>
      </form>
    </div>
  );
}
