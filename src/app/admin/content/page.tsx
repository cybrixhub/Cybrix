"use client";

import { useState } from "react";
import { SITE, TRACK_RECORD, FAQS, BOOK, TESTIMONIALS } from "@/lib/site";

type Tab = "site" | "track" | "testimonials" | "faqs" | "book";

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

export default function ContentEditor() {
  const [tab, setTab] = useState<Tab>("site");
  const [saved, setSaved] = useState(false);

  // Site fields
  const [tagline, setTagline] = useState(SITE.tagline);
  const [description, setDescription] = useState(SITE.description);
  const [email, setEmail] = useState(SITE.email);
  const [calUrl, setCalUrl] = useState(SITE.calendarUrl);

  // Track record
  const [track, setTrack] = useState(TRACK_RECORD.map((s) => ({ ...s })));

  // FAQs
  const [faqs, setFaqs] = useState(FAQS.map((f) => ({ ...f })));

  // Testimonials
  const [testimonials, setTestimonials] = useState(TESTIMONIALS.map((t) => ({ ...t })));

  // Book section
  const [bookCopy, setBookCopy] = useState(BOOK.copy);
  const [bookChecks, setBookChecks] = useState([...BOOK.checkmarks]);

  function handleSave() {
    const draft = {
      site: { tagline, description, email, calendarUrl: calUrl },
      trackRecord: track,
      testimonials,
      faqs,
      book: { copy: bookCopy, checkmarks: bookChecks },
    };
    localStorage.setItem("cybrix-content-draft", JSON.stringify(draft, null, 2));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function exportDraft() {
    const raw = localStorage.getItem("cybrix-content-draft") ?? "No draft saved yet.";
    const blob = new Blob([raw], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cybrix-content-draft.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  const TABS: { key: Tab; label: string }[] = [
    { key: "site", label: "Site info" },
    { key: "track", label: "Track record" },
    { key: "testimonials", label: "Testimonials" },
    { key: "faqs", label: "FAQs" },
    { key: "book", label: "Booking" },
  ];

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl italic text-ink">Content</h1>
          <p className="mt-1 text-sm text-muted">
            Edit site copy. Changes save to your browser — download JSON to apply to{" "}
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
            onClick={handleSave}
            className="btn-ink btn-press inline-flex items-center gap-2 border border-navy bg-navy px-4 py-2 text-sm font-semibold text-cream [--ink-fill:var(--color-navy-2)]"
          >
            {saved ? "Saved ✓" : "Save draft"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-line">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm transition-colors ${
              tab === t.key
                ? "border-b-2 border-teal-bright text-ink"
                : "text-muted hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Site info */}
      {tab === "site" && (
        <div className="space-y-4">
          <Field label="Tagline" value={tagline} onChange={setTagline} />
          <Field label="Description" value={description} onChange={setDescription} multiline />
          <Field label="Email" value={email} onChange={setEmail} />
          <Field label="Cal.com URL" value={calUrl} onChange={setCalUrl} />
        </div>
      )}

      {/* Track record */}
      {tab === "track" && (
        <div className="space-y-4">
          {track.map((stat, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex-1">
                <Field
                  label="Value"
                  value={stat.value}
                  onChange={(v) =>
                    setTrack(track.map((s, j) => (j === i ? { ...s, value: v } : s)))
                  }
                />
              </div>
              <div className="flex-1">
                <Field
                  label="Label"
                  value={stat.label}
                  onChange={(v) =>
                    setTrack(track.map((s, j) => (j === i ? { ...s, label: v } : s)))
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Testimonials */}
      {tab === "testimonials" && (
        <div className="space-y-6">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-md border border-line bg-paper-2 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="kicker text-muted">
                  Testimonial {i + 1}{t.lead ? " · Lead quote" : ""}
                </span>
                <button
                  onClick={() => setTestimonials(testimonials.filter((_, j) => j !== i))}
                  className="text-xs text-oxblood-bright hover:underline"
                >
                  Remove
                </button>
              </div>
              <Field
                label="Quote"
                value={t.quote}
                onChange={(v) => setTestimonials(testimonials.map((x, j) => j === i ? { ...x, quote: v } : x))}
                multiline
              />
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="Name / Title"
                  value={t.name}
                  onChange={(v) => setTestimonials(testimonials.map((x, j) => j === i ? { ...x, name: v } : x))}
                />
                <Field
                  label="Role / Company"
                  value={t.role}
                  onChange={(v) => setTestimonials(testimonials.map((x, j) => j === i ? { ...x, role: v } : x))}
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!t.lead}
                  onChange={(e) => setTestimonials(testimonials.map((x, j) => j === i ? { ...x, lead: e.target.checked } : x))}
                  className="accent-teal-bright"
                />
                <span className="text-sm text-muted">Feature as lead quote (extra large)</span>
              </label>
            </div>
          ))}
          <button
            onClick={() => setTestimonials([...testimonials, { quote: "", name: "", role: "" }])}
            className="text-sm text-teal-bright hover:underline"
          >
            + Add testimonial
          </button>
        </div>
      )}

      {/* FAQs */}
      {tab === "faqs" && (
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-md border border-line bg-paper-2 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="kicker text-muted">FAQ {i + 1}</span>
                <button
                  onClick={() => setFaqs(faqs.filter((_, j) => j !== i))}
                  className="text-xs text-oxblood-bright hover:underline"
                >
                  Remove
                </button>
              </div>
              <Field
                label="Question"
                value={faq.question}
                onChange={(v) =>
                  setFaqs(faqs.map((f, j) => (j === i ? { ...f, question: v } : f)))
                }
              />
              <Field
                label="Answer"
                value={faq.answer}
                onChange={(v) =>
                  setFaqs(faqs.map((f, j) => (j === i ? { ...f, answer: v } : f)))
                }
                multiline
              />
            </div>
          ))}
          <button
            onClick={() => setFaqs([...faqs, { question: "", answer: "" }])}
            className="text-sm text-teal-bright hover:underline"
          >
            + Add FAQ
          </button>
        </div>
      )}

      {/* Book */}
      {tab === "book" && (
        <div className="space-y-4">
          <Field label="Booking copy" value={bookCopy} onChange={setBookCopy} multiline />
          <div>
            <p className="kicker text-muted mb-2">Checkmarks</p>
            <div className="space-y-2">
              {bookChecks.map((c, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={c}
                    onChange={(e) =>
                      setBookChecks(bookChecks.map((x, j) => (j === i ? e.target.value : x)))
                    }
                    className="input flex-1"
                  />
                  <button
                    onClick={() => setBookChecks(bookChecks.filter((_, j) => j !== i))}
                    className="px-3 text-muted hover:text-oxblood-bright transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                onClick={() => setBookChecks([...bookChecks, ""])}
                className="text-sm text-teal-bright hover:underline"
              >
                + Add item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
