"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SendControls({
  campaignId,
  status,
  pending,
}: {
  campaignId: number;
  status: string;
  pending: number;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(null);

  async function send(dryRun: boolean) {
    setBusy(true);
    setError(null);
    setFlash(null);
    try {
      const r = await fetch(
        `/api/campaigns/${campaignId}/send${dryRun ? "?dry_run=1" : ""}`,
        { method: "POST" },
      );
      const d = (await r.json().catch(() => ({}))) as {
        status?: string; eligible?: number; error?: string; dry_run?: boolean; resend_configured?: boolean;
      };
      if (!r.ok) {
        setError(d.error ?? `Failed (${r.status})`);
        return;
      }
      if (d.status === "empty") {
        setFlash("Nothing to send — no leads match the audience filter (or all already contacted).");
        return;
      }
      const kind = dryRun ? "Dry run" : "Send";
      const rc = d.resend_configured;
      setFlash(
        `${kind} queued for ${d.eligible} lead(s).` +
          (dryRun ? " No real email sent." : rc ? " Sending via Resend now." : " (Resend not configured on backend — running as dry-run.)"),
      );
      // Progress will show updated numbers on next refresh.
      setTimeout(() => router.refresh(), 2500);
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  }

  const disabled = busy || pending === 0 || status === "sending";

  return (
    <div className="rounded-md border border-line bg-paper-2 p-5">
      <p className="kicker text-muted mb-3">Send</p>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={disabled}
          onClick={() => send(true)}
          className="btn-ink btn-press border border-line bg-paper px-4 py-2 text-sm font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? "Working…" : `Dry run (${pending} pending)`}
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            if (confirm(`Send the campaign to ${pending} lead(s)? This will send real email.`)) send(false);
          }}
          className="btn-ink btn-press border border-teal-bright bg-teal-bright px-4 py-2 text-sm font-semibold text-navy disabled:cursor-not-allowed disabled:opacity-60"
        >
          Send for real
        </button>
        <button
          type="button"
          onClick={() => router.refresh()}
          className="text-sm text-muted underline underline-offset-4 hover:text-ink"
        >
          Refresh progress
        </button>
      </div>
      {pending === 0 && (
        <p className="mt-3 text-xs text-muted">
          Nothing pending. Source more leads (/admin/sourcing) that match the audience filter, or create a new campaign.
        </p>
      )}
      {error && <p role="alert" className="mt-3 text-sm font-medium text-red-500">{error}</p>}
      {flash && <p role="status" className="mt-3 text-sm font-medium text-teal-bright">{flash}</p>}
    </div>
  );
}
