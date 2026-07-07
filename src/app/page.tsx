import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Prologue from "@/components/Prologue";
import TornEdge from "@/components/TornEdge";
import FounderVideo from "@/components/FounderVideo";
import Ticker from "@/components/Ticker";
import TrackRecord from "@/components/TrackRecord";
import WhatWeDo from "@/components/WhatWeDo";
import Factoids from "@/components/Factoids";
import Work from "@/components/Work";
import Reviews from "@/components/Reviews";
import Collage from "@/components/Collage";
import Faq from "@/components/Faq";
import Book from "@/components/Book";
import Footer from "@/components/Footer";

/**
 * Non-critical widgets — code-split so they don't bloat the initial bundle,
 * but SSR-kept so their chunks stream in parallel with the main hydration
 * pass (avoids extra post-hydration parse events that hurt desktop TBT).
 * All three render null or hidden state on the server, so no visual diff.
 */
const Preloader = dynamic(() => import("@/components/Preloader"));
const InkCursor = dynamic(() => import("@/components/InkCursor"));
const FloatingCta = dynamic(() => import("@/components/FloatingCta"));

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Preloader />
      <InkCursor />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Hero />
        <Prologue />
        <TornEdge color="var(--color-paper)" className="-mt-6 sm:-mt-7" />
        <FounderVideo />
        <Ticker />
        <TrackRecord />
        <WhatWeDo />
        <Factoids />
        <Work />
        <Reviews />
        <Collage />
        <Faq />
        <TornEdge color="var(--color-espresso)" className="-mb-px" />
        <Book />
      </main>
      <FloatingCta />
      <Footer />
    </>
  );
}
