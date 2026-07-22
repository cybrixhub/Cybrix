import { SITE } from "@/lib/site";

export default function Bookings() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-3xl italic text-ink">Bookings</h1>
        <p className="mt-1 text-sm text-muted">
          Your Cal.com calendar — view upcoming bookings and manage availability.
        </p>
      </div>

      {/* Info bar */}
      <div className="flex items-center gap-4 rounded-md border border-line bg-paper-2 px-5 py-3">
        <div className="flex-1">
          <p className="kicker text-muted mb-0.5">Booking link</p>
          <a
            href={SITE.calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-teal-bright hover:underline"
          >
            {SITE.calendarUrl}
          </a>
        </div>
        <a
          href={SITE.calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ink btn-press inline-flex items-center gap-2 border border-navy bg-navy px-4 py-2 text-sm font-semibold text-cream [--ink-fill:var(--color-navy-2)]"
        >
          Open Cal.com ↗
        </a>
      </div>

      {/* Embedded calendar */}
      <div className="overflow-hidden rounded-md border border-line" style={{ height: 700 }}>
        <iframe
          src={SITE.calendarUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          title="Cybrix booking calendar"
          className="bg-paper"
        />
      </div>

      <p className="text-xs text-muted">
        To manage availability, notifications, and integrations — go to your{" "}
        <a
          href="https://app.cal.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-bright hover:underline"
        >
          Cal.com dashboard ↗
        </a>
      </p>
    </div>
  );
}
