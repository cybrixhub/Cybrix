import { SITE } from "@/lib/site";

const LEAD_SOURCES = [
  { label: "Cal.com bookings", href: "https://app.cal.com/bookings/upcoming", desc: "Upcoming and past calls" },
  { label: "Vercel Analytics", href: "https://vercel.com/dashboard", desc: "Traffic, page views, conversions" },
  { label: "Meta Ads Manager", href: "https://adsmanager.facebook.com", desc: "Campaign leads & CPL" },
];

function InfoCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-md border border-line bg-paper-2 p-5">
      <p className="kicker text-muted mb-2">{label}</p>
      <p className="font-display text-2xl italic text-ink">{value}</p>
      {sub && <p className="mt-1 text-xs text-muted">{sub}</p>}
    </div>
  );
}

export default function Leads() {
  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="font-display text-3xl italic text-ink">Leads</h1>
        <p className="mt-1 text-sm text-muted">
          Pipeline overview — bookings, inbound, and ad-generated leads.
        </p>
      </div>

      {/* Lifetime stats from site.ts */}
      <section>
        <p className="kicker text-muted mb-3">Lifetime track record</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <InfoCard label="Founders backed" value="120+" sub="since 2020" />
          <InfoCard label="Impressions" value="18M+" sub="across all channels" />
          <InfoCard label="Raised by clients" value="$40M+" sub="post-engagement" />
          <InfoCard label="Years operating" value="6" sub="compounding" />
        </div>
      </section>

      {/* Quick links to external dashboards */}
      <section>
        <p className="kicker text-muted mb-3">Lead sources</p>
        <div className="space-y-2">
          {LEAD_SOURCES.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-md border border-line bg-paper-2 px-5 py-4 transition-colors hover:border-line-strong hover:bg-paper-3"
            >
              <div>
                <p className="text-sm font-medium text-ink">{s.label}</p>
                <p className="text-xs text-muted">{s.desc}</p>
              </div>
              <span className="text-muted text-sm">↗</span>
            </a>
          ))}
        </div>
      </section>

      {/* Booking link */}
      <section>
        <p className="kicker text-muted mb-3">Your booking link</p>
        <div className="rounded-md border border-line bg-paper-2 px-5 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-ink">{SITE.calendarUrl}</p>
            <p className="text-xs text-muted mt-0.5">Share this to capture inbound calls</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <a
              href={SITE.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ink btn-press border border-navy bg-navy px-4 py-2 text-sm font-semibold text-white [--ink-fill:var(--color-navy-2)]"
            >
              Open ↗
            </a>
          </div>
        </div>
      </section>

      {/* Contact info */}
      <section>
        <p className="kicker text-muted mb-3">Inbound email</p>
        <div className="rounded-md border border-line bg-paper-2 px-5 py-4">
          <p className="text-sm font-medium text-ink">{SITE.email}</p>
          <p className="text-xs text-muted mt-0.5">Direct enquiries land here</p>
        </div>
      </section>
    </div>
  );
}
