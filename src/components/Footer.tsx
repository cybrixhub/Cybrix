import { NAV_LINKS, SOCIALS, SITE } from "@/lib/site";
import ThreadScene from "./ThreadScene";
import WovenWordmark from "./WovenWordmark";

export default function Footer() {
  const year = 2026;

  return (
    <footer className="relative overflow-hidden bg-oxblood text-[#f7efe4]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-[#6d2222]"
      />
      <ThreadScene color="#f2d9c4" alpha={0.22} rise={0.5} />
      <div className="container-x relative z-10 pb-10 pt-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-xl italic leading-snug text-[#f2e3d4]">
              Social &amp; content for startups that refuse to be ignored.
            </p>
          </div>

          <div className="flex gap-14 sm:gap-20">
            <div>
              <h3 className="kicker text-[#e8c9b4]">Navigate</h3>
              <ul className="mt-4 space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors hover:text-amber"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#book"
                    className="text-sm transition-colors hover:text-amber"
                  >
                    Book a call
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="kicker text-[#e8c9b4]">Follow</h3>
              <ul className="mt-4 space-y-2.5">
                {SOCIALS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm transition-colors hover:text-amber"
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
          color="#f7efe4"
          className="mt-14 h-[23vw] max-h-[20rem] w-full"
        />

        <div className="mt-10 flex flex-col gap-2 border-t border-[#f7efe4]/20 pt-5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[#e8c9b4] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.legalName} — all rights reserved
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="transition-colors hover:text-amber"
          >
            {SITE.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
