import Reveal from "./Reveal";
import Underlined from "./Underlined";
import { FAQS } from "@/lib/site";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function Faq() {
  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className="cv-auto bg-paper py-24 sm:py-32"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <Reveal>
              <span className="kicker text-oxblood-bright">FAQ</span>
            </Reveal>
            <h2
              data-split
              className="split-parent mt-4 font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl"
            >
              Fair <Underlined>questions</Underlined>, straight answers.
            </h2>
            <Reveal delay={120}>
              <p className="mt-5 text-lg leading-relaxed text-muted text-pretty">
                Still curious about something? Bring it to the call — we&apos;re
                happy to talk specifics.
              </p>
            </Reveal>
          </div>

          <div className="rounded-lg border border-line-strong/60 bg-paper-2 px-6 sm:px-8">
            {FAQS.map((faq, i) => (
              <Reveal key={faq.question} delay={(i % 2) * 60}>
                <details className="group border-b border-line py-5 last:border-b-0">
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4">
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-amber">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-xl font-medium tracking-tight">
                        {faq.question}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-mono text-lg text-amber transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-xl pl-8 text-base leading-relaxed text-muted">
                    {faq.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
