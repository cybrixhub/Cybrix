import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TornEdge from "@/components/TornEdge";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import Ecosystem from "@/components/portfolio/Ecosystem";
import Platforms from "@/components/portfolio/Platforms";
import Process from "@/components/portfolio/Process";
import ContentShowcase from "@/components/portfolio/ContentShowcase";
import PaidResults from "@/components/portfolio/PaidResults";
import PortfolioCta from "@/components/portfolio/PortfolioCta";
import { SITE } from "@/lib/site";
import { PORTFOLIO_INTRO } from "@/lib/portfolio";
import "./portfolio.css";

const TITLE = "Social Media Marketing Portfolio";
const DESCRIPTION = `${PORTFOLIO_INTRO} Strategy, content, community and paid campaigns — with real results from Canada, Australia and beyond.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: `${TITLE} — ${SITE.name}`,
    description: DESCRIPTION,
    url: `${SITE.url}/portfolio`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} — ${SITE.name}`,
    description: DESCRIPTION,
  },
};

export default function PortfolioPage() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <PortfolioHero />
        <TornEdge color="var(--color-paper)" className="-mt-6 sm:-mt-7" />
        <Ecosystem />
        <Platforms />
        <TornEdge color="var(--color-navy)" className="-mb-px" />
        <Process />
        <ContentShowcase />
        <PaidResults />
        <TornEdge color="var(--color-navy)" className="-mb-px" />
        <PortfolioCta />
      </main>
      <Footer />
    </>
  );
}
