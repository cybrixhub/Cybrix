import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TornEdge from "@/components/TornEdge";
import Reveal from "@/components/Reveal";
import TeamHero from "@/components/team/TeamHero";
import { TeamGrid } from "@/components/team/TeamCards";
import TeamCta from "@/components/team/TeamCta";
import { SITE } from "@/lib/site";
import { TEAM } from "@/lib/team";
import "./team.css";

const TITLE = "Our Team";
const DESCRIPTION =
  "Meet the people behind Cybrix — leadership, operations, marketing, video production and web experience. Different strengths, one vision.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/team" },
  openGraph: {
    title: `${TITLE} — ${SITE.name}`,
    description: DESCRIPTION,
    url: `${SITE.url}/team`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} — ${SITE.name}`,
    description: DESCRIPTION,
  },
};

export default function TeamPage() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <TeamHero />
        <TornEdge color="var(--color-paper-2)" className="-mt-6 sm:-mt-7" />

        <section
          id="team"
          aria-labelledby="team-grid-title"
          className="relative bg-paper-2 pb-24 pt-14 sm:pb-32 sm:pt-20"
        >
          <span className="marginalia">roster · {String(TEAM.length).padStart(2, "0")}</span>
          <div className="container-x">
            <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <Reveal>
                  <span className="kicker text-navy">The team</span>
                </Reveal>
                <h2
                  id="team-grid-title"
                  data-split
                  className="split-parent mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
                >
                  Five specialists, one growth team.
                </h2>
              </div>
              <Reveal delay={100}>
                <p className="max-w-md text-base leading-relaxed text-ink-soft text-pretty sm:text-lg">
                  From the first strategy call to the monthly report, these are
                  the people doing the work.
                </p>
              </Reveal>
            </div>
            <TeamGrid members={TEAM} />
          </div>
        </section>

        <TornEdge color="var(--color-navy)" className="-mb-px" />
        <TeamCta />
      </main>
      <Footer />
    </>
  );
}
