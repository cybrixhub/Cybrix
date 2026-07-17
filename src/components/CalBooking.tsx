/* Cal.com inline embed — direct iframe, no JS dependency. */
export default function CalBooking() {
  return (
    <iframe
      src="https://cal.com/cybrix-talha/30min?embed=true&theme=dark&layout=month_view&hideEventTypeDetails=false"
      className="w-full"
      style={{ height: 680, border: "none", display: "block" }}
      title="Book a strategy call with Cybrix"
      loading="lazy"
    />
  );
}
