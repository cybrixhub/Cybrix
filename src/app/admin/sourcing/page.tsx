import SourcingClient from "./SourcingClient";

export const dynamic = "force-dynamic";

export default function Sourcing() {
  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="font-display text-3xl italic text-ink">Sourcing</h1>
        <p className="mt-1 text-sm text-muted">
          Search Apollo by ICP, preview matches, save the ones you want to reach out to.
        </p>
      </div>
      <SourcingClient />
    </div>
  );
}
