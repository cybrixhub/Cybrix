import { NAV_LINKS, SOCIALS, SITE, ALL_SERVICES, WORK } from "@/lib/site";
import Logo from "./Logo";
import ThreadScene from "./ThreadScene";
import WovenWordmark from "./WovenWordmark";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-[#0a1430]"
      />
      <ThreadScene color="#B9CBE4" alpha={0.15} rise={0.5} />
      <div className="container-x relative z-10 pb-10 pt-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-xl italic leading-snug text-[#dbe6f2]">
              Social &amp; content for startups that refuse to be ignored.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-4 sm:gap-x-14">
            <div>
              <h3 className="kicker text-[#b9cbe4]">Navigate</h3>
              <ul className="mt-4 space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-sm transition-colors hover:text-teal-bright">
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={SITE.calendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors hover:text-teal-bright"
                  >
                    Book a call
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="kicker text-[#b9cbe4]">Services</h3>
              <ul className="mt-4 space-y-2.5">
                {ALL_SERVICES.map((s) => (
                  <li key={s.slug}>
                    <a
                      href={`/services/${s.slug}`}
                      className="text-sm leading-snug transition-colors hover:text-teal-bright"
                    >
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="kicker text-[#b9cbe4]">Work</h3>
              <ul className="mt-4 space-y-2.5">
                {WORK.map((w) => (
                  <li key={w.slug}>
                    <a
                      href={`/work/${w.slug}`}
                      className="text-sm leading-snug transition-colors hover:text-teal-bright"
                    >
                      {w.client}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="kicker text-[#b9cbe4]">Follow</h3>
              <ul className="mt-4 space-y-2.5">
                {SOCIALS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm transition-colors hover:text-teal-bright"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Giant woven colophon wordmark */}
        <WovenWordmark
          text={`${SITE.name}.`}
          color="#FFFFFF"
          className="mt-14 h-[23vw] max-h-[20rem] w-full"
        />

        <div className="mt-10 flex flex-col gap-3 border-t border-white/20 pt-5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[#B9CBE4] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-white/85">
            <Logo variant="mono" className="!h-5 !w-[36px]" />
            <p>© {year} {SITE.legalName} — all rights reserved</p>
          </div>
          <a
            href={`mailto:${SITE.email}`}
            className="transition-colors hover:text-teal-bright"
          >
            {SITE.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
