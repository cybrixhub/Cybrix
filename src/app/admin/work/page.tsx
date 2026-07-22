"use client";

import { useState } from "react";
import { WORK, type Project } from "@/lib/site";

type Draft = Pick<Project, "slug" | "client" | "category" | "result" | "summary" | "tags">;

const empty: Draft = {
  slug: "",
  client: "",
  category: "",
  result: "",
  summary: "",
  tags: [],
};

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block kicker text-muted">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="input resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input"
        />
      )}
    </div>
  );
}

export default function WorkManager() {
  const [items, setItems] = useState<Draft[]>(
    WORK.map((w) => ({
      slug: w.slug,
      client: w.client,
      category: w.category,
      result: w.result,
      summary: w.summary,
      tags: [...w.tags],
    }))
  );
  const [editing, setEditing] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState<Draft>({ ...empty });
  const [saved, setSaved] = useState(false);

  function openEdit(i: number) {
    setDraft({ ...items[i] });
    setEditing(i);
    setAdding(false);
  }

  function openAdd() {
    setDraft({ ...empty });
    setAdding(true);
    setEditing(null);
  }

  function cancel() {
    setEditing(null);
    setAdding(false);
  }

  function save() {
    if (adding) {
      setItems([...items, draft]);
    } else if (editing !== null) {
      setItems(items.map((x, i) => (i === editing ? draft : x)));
    }
    localStorage.setItem("cybrix-work-draft", JSON.stringify(items, null, 2));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    cancel();
  }

  function remove(i: number) {
    setItems(items.filter((_, j) => j !== i));
    cancel();
  }

  function exportDraft() {
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cybrix-work-draft.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  const form = editing !== null || adding;

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl italic text-ink">Work</h1>
          <p className="mt-1 text-sm text-muted">
            Manage case studies. Export JSON to apply changes to{" "}
            <code className="font-mono text-xs text-teal-bright">site.ts</code>.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={exportDraft}
            className="btn-ink btn-press inline-flex items-center gap-2 border border-line-strong bg-paper-2 px-4 py-2 text-sm text-ink [--ink-fill:var(--color-paper-3)]"
          >
            Export JSON
          </button>
          <button
            onClick={openAdd}
            className="btn-ink btn-press inline-flex items-center gap-2 border border-navy bg-navy px-4 py-2 text-sm font-semibold text-cream [--ink-fill:var(--color-navy-2)]"
          >
            + Add case study
          </button>
        </div>
      </div>

      {saved && (
        <p className="text-sm text-teal-bright">Changes saved to draft ✓</p>
      )}

      {/* Edit/Add form */}
      {form && (
        <div className="rounded-md border border-teal-bright/30 bg-paper-2 p-5 space-y-4">
          <p className="kicker text-muted">{adding ? "New case study" : `Editing: ${draft.client}`}</p>
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Client"
              value={draft.client}
              onChange={(v) => setDraft({ ...draft, client: v })}
            />
            <Field
              label="Slug"
              value={draft.slug}
              onChange={(v) => setDraft({ ...draft, slug: v })}
            />
            <Field
              label="Category"
              value={draft.category}
              onChange={(v) => setDraft({ ...draft, category: v })}
            />
            <Field
              label="Result"
              value={draft.result}
              onChange={(v) => setDraft({ ...draft, result: v })}
            />
          </div>
          <Field
            label="Summary"
            value={draft.summary}
            onChange={(v) => setDraft({ ...draft, summary: v })}
            multiline
          />
          <div>
            <label className="mb-1 block kicker text-muted">Tags (comma-separated)</label>
            <input
              type="text"
              value={draft.tags.join(", ")}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                })
              }
              className="input"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={save}
              className="btn-ink btn-press border border-navy bg-navy px-4 py-2 text-sm font-semibold text-cream [--ink-fill:var(--color-navy-2)]"
            >
              Save
            </button>
            <button
              onClick={cancel}
              className="px-4 py-2 text-sm text-muted hover:text-ink transition-colors"
            >
              Cancel
            </button>
            {editing !== null && (
              <button
                onClick={() => remove(editing)}
                className="ml-auto px-4 py-2 text-sm text-oxblood-bright hover:underline"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-md border border-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-paper-3 text-left">
              <th className="px-4 py-2.5 kicker text-muted font-normal">Client</th>
              <th className="px-4 py-2.5 kicker text-muted font-normal">Category</th>
              <th className="px-4 py-2.5 kicker text-muted font-normal">Result</th>
              <th className="px-4 py-2.5 kicker text-muted font-normal">Tags</th>
              <th className="px-4 py-2.5 kicker text-muted font-normal" />
            </tr>
          </thead>
          <tbody>
            {items.map((w, i) => (
              <tr
                key={w.slug}
                className={`border-b border-line last:border-0 ${
                  editing === i ? "bg-navy/10" : i % 2 === 0 ? "bg-paper-2" : "bg-paper"
                }`}
              >
                <td className="px-4 py-3 font-medium text-ink">{w.client}</td>
                <td className="px-4 py-3 text-muted">{w.category}</td>
                <td className="px-4 py-3 text-teal-bright">{w.result}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {w.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded px-1.5 py-0.5 text-[0.65rem] bg-paper-3 text-muted border border-line"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <a
                      href={`/work/${w.slug}`}
                      target="_blank"
                      className="text-xs text-muted hover:text-ink transition-colors"
                    >
                      View ↗
                    </a>
                    <button
                      onClick={() => openEdit(i)}
                      className="text-xs text-muted hover:text-ink transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
