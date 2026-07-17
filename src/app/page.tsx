import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import {
  ClientBeforeMain,
  ClientAfterMain,
} from "@/components/ClientWidgets";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Prologue from "@/components/Prologue";
import TornEdge from "@/components/TornEdge";
import FounderVideo from "@/components/FounderVideo";
import ShakeCta from "@/components/ShakeCta";
import { SITE } from "@/lib/site";
import Ticker from "@/components/Ticker";
import TrackRecord from "@/components/TrackRecord";
import WhatWeDo from "@/components/WhatWeDo";
import Factoids from "@/components/Factoids";
import Work from "@/components/Work";
import Reviews from "@/components/Reviews";
import Collage from "@/components/Collage";
import Faq from "@/components/Faq";
import CalBooking from "@/components/CalBooking";
import Book from "@/components/Book";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <ClientBeforeMain />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Hero />
        <Prologue />
        <TornEdge color="var(--color-paper)" className="-mt-6 sm:-mt-7" />
        <FounderVideo />
        <div className="bg-paper pb-12 text-center sm:pb-16">
          <ShakeCta>
            <a
              href={SITE.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="book"
              className="btn-ink btn-press inline-flex items-center gap-2 border border-navy bg-navy px-8 py-4 text-sm font-semibold text-cream [--ink-fill:var(--color-navy-2)]"
            >
              Book a strategy call
            </a>
          </ShakeCta>
        </div>
        <Ticker />
        <TrackRecord />
        <WhatWeDo />
        <Factoids />
        <Work />
        <Reviews />
        <Collage />
        <Faq />
        <TornEdge color="var(--color-navy)" className="-mb-px" />
        <section id="book" className="bg-espresso py-16 sm:py-20">
          <div className="container-x mb-10 text-center">
            <p className="kicker text-muted">Get started</p>
            <h2 className="mt-3 font-display text-3xl font-medium italic tracking-tight text-ink sm:text-4xl">
              Book a strategy call
            </h2>
            <p className="mt-3 text-sm text-ink-soft">
              30 minutes. No pitch, no pressure — just a plan.
            </p>
          </div>
          <CalBooking />
        </section>
        <TornEdge color="var(--color-espresso)" className="-mb-px" />
        <Book />
      </main>
      <ClientAfterMain />
      <Footer />
    </>
  );
}
