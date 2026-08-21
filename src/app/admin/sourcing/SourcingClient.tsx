"use client";

import { useState, type FormEvent } from "react";
import type { ApolloPerson, ApolloSearchOut } from "@/lib/api";

export default function SourcingClient() {
  const [titles, setTitles] = useState("Founder, CEO, Managing Partner");
  const [locations, setLocations] = useState("Pakistan, United Arab Emirates");
  const [perPage, setPerPage] = useState(10);
  const [searching, setSearching] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const [results, setResults] = useState<ApolloSearchOut | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  async function onSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearching(true);
    setError(null);
    setFlash(null);
    try {
      const r = await fetch("/api/apollo/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titles: titles.split(",").map((t) => t.trim()).filter(Boolean),
          locations: locations.split(",").map((l) => l.trim()).filter(Boolean),
          per_page: perPage,
        }),
      });
      if (!r.ok) {
        const d = (await r.json().catch(() => ({}))) as { error?: string; detail?: string };
        setError(d.error ?? d.detail ?? `Search failed (${r.status})`);
        return;
      }
      const data = (await r.json()) as ApolloSearchOut;
      setResults(data);
      // Pre-select every result that has an email (no email = un-savable).
      setSelected(new Set(data.people.filter((p) => p.email).map((p) => p.apollo_id)));
    } catch {
      setError("Network error.");
    } finally {
      setSearching(false);
    }
  }

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function onSave() {
    if (!results) return;
    const people = results.people.filter((p) => selected.has(p.apollo_id));
    if (people.length === 0) return;
    setSaving(true);
    setError(null);
    setFlash(null);
    try {
      const r = await fetch("/api/apollo/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ people }),
      });
      if (!r.ok) {
        setError(`Save failed (${r.status})`);
        return;
      }
      const d = (await r.json()) as { saved: number; skipped_no_email: number };
      setFlash(`Saved ${d.saved} lead(s). ${d.skipped_no_email > 0 ? `${d.skipped_no_email} skipped (no email).` : ""}`);
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      {/* Search form */}
      <form onSubmit={onSearch} className="space-y-4 rounded-md border border-line bg-paper-2 p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="kicker text-muted mb-1.5 block">Job titles (comma-separated)</span>
            <input
              type="text"
              value={titles}
              onChange={(e) => setTitles(e.target.value)}
              placeholder="Founder, CEO, Managing Partner"
              className="input w-full"
            />
          </label>
          <label className="block">
            <span className="kicker text-muted mb-1.5 block">Locations (comma-separated)</span>
            <input
              type="text"
              value={locations}
              onChange={(e) => setLocations(e.target.value)}
              placeholder="Pakistan, United Arab Emirates"
              className="input w-full"
            />
          </label>
        </div>
        <div className="flex items-center justify-between gap-4">
          <label className="text-sm text-muted">
            Per page{" "}
            <input
              type="number"
              min={1}
              max={25}
              value={perPage}
              onChange={(e) => setPerPage(Math.max(1, Math.min(25, Number(e.target.value) || 1)))}
              className="input ml-2 w-16"
            />
          </label>
          <button
            type="submit"
            disabled={searching}
            className="btn-ink btn-press border border-navy bg-navy px-5 py-2 text-sm font-semibold text-white [--ink-fill:var(--color-navy-2)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {searching ? "Searching…" : "Search Apollo"}
          </button>
        </div>
      </form>

      {error && <p role="alert" className="text-sm font-medium text-red-500">{error}</p>}
      {flash && <p role="status" className="text-sm font-medium text-teal-bright">{flash}</p>}

      {/* Results */}
      {results && (
        <div className="rounded-md border border-line bg-paper-2">
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <p className="text-sm text-muted">
              <strong className="text-ink">{results.count}</strong> match{results.count !== 1 && "es"}
              {results.mock && (
                <span className="ml-2 rounded border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-amber-600">
                  MOCK · no Apollo key set
                </span>
              )}
            </p>
            <button
              type="button"
              onClick={onSave}
              disabled={saving || selected.size === 0}
              className="btn-ink btn-press border border-teal-bright bg-teal-bright px-4 py-2 text-sm font-semibold text-navy disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving…" : `Save ${selected.size} selected`}
            </button>
          </div>
          <table className="w-full text-sm">
            <thead className="border-b border-line bg-paper-3 text-left">
              <tr>
                <th className="w-10 px-3 py-2"></th>
                <th className="kicker text-muted px-3 py-2 font-normal">Name</th>
                <th className="kicker text-muted px-3 py-2 font-normal">Title</th>
                <th className="kicker text-muted px-3 py-2 font-normal">Company</th>
                <th className="kicker text-muted px-3 py-2 font-normal">Location</th>
                <th className="kicker text-muted px-3 py-2 font-normal">Email</th>
              </tr>
            </thead>
            <tbody>
              {results.people.map((p) => (
                <PersonRow
                  key={p.apollo_id}
                  p={p}
                  checked={selected.has(p.apollo_id)}
                  onToggle={() => toggle(p.apollo_id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function PersonRow({ p, checked, onToggle }: {
  p: ApolloPerson;
  checked: boolean;
  onToggle: () => void;
}) {
  const hasEmail = !!p.email;
  return (
    <tr className={`border-b border-line last:border-b-0 ${!hasEmail ? "opacity-50" : "hover:bg-paper-3/50"}`}>
      <td className="px-3 py-2.5">
        <input
          type="checkbox"
          checked={checked}
          disabled={!hasEmail}
          onChange={onToggle}
          aria-label={`Select ${p.name}`}
        />
      </td>
      <td className="px-3 py-2.5 font-medium text-ink">
        {p.linkedin_url ? (
          <a href={p.linkedin_url} target="_blank" rel="noopener noreferrer" className="hover:underline">{p.name}</a>
        ) : (
          p.name
        )}
      </td>
      <td className="px-3 py-2.5 text-ink-soft">{p.title ?? "—"}</td>
      <td className="px-3 py-2.5 text-ink-soft">{p.company ?? "—"}</td>
      <td className="px-3 py-2.5 text-xs text-muted">{p.location ?? "—"}</td>
      <td className="px-3 py-2.5 text-teal-bright">
        {p.email ?? <span className="text-xs italic text-muted">no email</span>}
      </td>
    </tr>
  );
}
