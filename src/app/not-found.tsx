import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = { title: "404 — Page not found" };

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        id="main"
        tabIndex={-1}
        className="flex min-h-svh flex-col items-center justify-center bg-paper px-6 pb-24 pt-32 text-center text-ink outline-none"
      >
        <span
          aria-hidden="true"
          className="font-display text-[20vw] font-medium italic leading-none tracking-tight text-line-strong sm:text-[12rem]"
        >
          404
        </span>
        <h1 className="mt-4 font-display text-3xl font-medium tracking-tight sm:text-4xl">
          Page not found.
        </h1>
        <p className="mt-4 max-w-sm text-base leading-relaxed text-ink-soft">
          That URL doesn&rsquo;t exist — it may have moved, been removed, or
          you might have a typo.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="btn-ink btn-press inline-flex items-center gap-2 border border-navy bg-navy px-6 py-3 text-sm font-semibold text-cream [--ink-fill:var(--color-navy-2)]"
          >
            ← Back to home
          </Link>
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 border border-line-strong px-6 py-3 text-sm font-semibold text-ink-soft transition-colors hover:border-teal-bright hover:text-teal-bright"
          >
            See our services
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
