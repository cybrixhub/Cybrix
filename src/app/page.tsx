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
import HowWeWork from "@/components/HowWeWork";
import Factoids from "@/components/Factoids";
import Work from "@/components/Work";
import Reviews from "@/components/Reviews";
import Collage from "@/components/Collage";
import Faq from "@/components/Faq";
import MeetingBooking from "@/components/MeetingBooking";
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
        <HowWeWork />
        <Factoids />
        <Work />
        <Reviews />
        <Collage />
        <Faq />
        <MeetingBooking />
        <TornEdge color="var(--color-espresso)" className="-mb-px" />
        <Book />
      </main>
      <ClientAfterMain />
      <Footer />
    </>
  );
}
