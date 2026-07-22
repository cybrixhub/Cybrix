import { WORK, SERVICE_GROUPS, FAQS, TESTIMONIALS, TRACK_RECORD } from "@/lib/site";
import Link from "next/link";

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-md border border-line bg-paper-2 p-5">
      <p className="kicker text-muted mb-2">{label}</p>
      <p className="font-display text-3xl italic text-ink">{value}</p>
      {sub && <p className="mt-1 text-xs text-muted">{sub}</p>}
    </div>
  );
}

export default function AdminDashboard() {
  const serviceCount = SERVICE_GROUPS.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="font-display text-3xl italic text-ink">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">Overview of your Cybrix site content.</p>
      </div>

      {/* Site stats */}
      <section>
        <p className="kicker text-muted mb-3">Track record</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {TRACK_RECORD.map((s) => (
            <StatCard key={s.label} label={s.label} value={s.value} />
          ))}
        </div>
      </section>

      {/* Content counts */}
      <section>
        <p className="kicker text-muted mb-3">Site content</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Services" value={serviceCount} sub={`${SERVICE_GROUPS.length} groups`} />
          <StatCard label="Case studies" value={WORK.length} />
          <StatCard label="Testimonials" value={TESTIMONIALS.length} />
          <StatCard label="FAQs" value={FAQS.length} />
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <p className="kicker text-muted mb-3">Quick actions</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/content"
            className="btn-ink btn-press inline-flex items-center gap-2 border border-navy bg-navy px-4 py-2 text-sm font-semibold text-cream [--ink-fill:var(--color-navy-2)]"
          >
            Edit site copy
          </Link>
          <Link
            href="/admin/work"
            className="btn-ink btn-press inline-flex items-center gap-2 border border-line-strong bg-paper-2 px-4 py-2 text-sm font-semibold text-ink [--ink-fill:var(--color-paper-3)]"
          >
            Manage work
          </Link>
          <Link
            href="/admin/bookings"
            className="btn-ink btn-press inline-flex items-center gap-2 border border-line-strong bg-paper-2 px-4 py-2 text-sm font-semibold text-ink [--ink-fill:var(--color-paper-3)]"
          >
            View bookings
          </Link>
        </div>
      </section>

      {/* Recent case studies */}
      <section>
        <p className="kicker text-muted mb-3">Case studies</p>
        <div className="overflow-hidden rounded-md border border-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-paper-3 text-left">
                <th className="px-4 py-2.5 kicker text-muted font-normal">Client</th>
                <th className="px-4 py-2.5 kicker text-muted font-normal">Category</th>
                <th className="px-4 py-2.5 kicker text-muted font-normal">Result</th>
                <th className="px-4 py-2.5 kicker text-muted font-normal" />
              </tr>
            </thead>
            <tbody>
              {WORK.map((w, i) => (
                <tr
                  key={w.slug}
                  className={`border-b border-line last:border-0 ${i % 2 === 0 ? "bg-paper-2" : "bg-paper"}`}
                >
                  <td className="px-4 py-3 font-medium text-ink">{w.client}</td>
                  <td className="px-4 py-3 text-muted">{w.category}</td>
                  <td className="px-4 py-3 text-teal-bright">{w.result}</td>
                  <td className="px-4 py-3 text-right">
                    <a
                      href={`/work/${w.slug}`}
                      target="_blank"
                      className="text-xs text-muted hover:text-ink transition-colors"
                    >
                      View ↗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
