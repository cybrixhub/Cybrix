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
import Ticker from "@/components/Ticker";
import TrackRecord from "@/components/TrackRecord";
import WhatWeDo from "@/components/WhatWeDo";
import PlanVideos from "@/components/PlanVideos";
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
        <PlanVideos />
        <Ticker />
        <TrackRecord />
        <WhatWeDo />
        <Factoids />
        <Work />
        <Reviews />
        <Collage />
        <Faq />
        <TornEdge color="var(--color-navy)" className="-mb-px" />
        <MeetingBooking />
        <TornEdge color="var(--color-espresso)" className="-mb-px" />
        <Book />
      </main>
      <ClientAfterMain />
      <Footer />
    </>
  );
}
