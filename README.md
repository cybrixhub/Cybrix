# Cybrix — Digital Growth Agency

A fast, SEO-first, single-page marketing site for the **Cybrix** digital marketing agency.
Built with Next.js 16 (App Router), React 19, Tailwind CSS v4 and TypeScript — clean, minimal, and fully static.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build (fully static)
npm run start    # serve the production build
npm run lint     # eslint
```

## Editing the content

**Almost everything lives in one file:** [`src/lib/site.ts`](src/lib/site.ts)

| What | Where |
| --- | --- |
| Agency name, tagline, email, phone, location, live URL | `SITE` |
| Navigation links | `NAV_LINKS` |
| Social links | `SOCIALS` |
| Services (the 6 cards) | `SERVICES` |
| Stats (the animated numbers) | `STATS` |
| Case studies / work | `WORK` *(currently placeholders — replace with real results)* |
| Process steps | `PROCESS` |
| Testimonials | `TESTIMONIALS` |
| FAQ | `FAQS` |

> **Before going live:** set `SITE.url` to your real domain. It's used for canonical URLs,
> Open Graph tags, the sitemap and robots.txt. It currently points at the placeholder
> `https://cybrix.agency`.

Design tokens (colors, fonts, radii) are defined in [`src/app/globals.css`](src/app/globals.css) under `@theme`.

## Structure

```
src/
  app/
    layout.tsx            # fonts, SEO metadata, Organization JSON-LD
    page.tsx              # composes the sections
    globals.css           # Tailwind v4 theme + utilities + animations
    sitemap.ts            # /sitemap.xml
    robots.ts             # /robots.txt
    manifest.ts           # PWA manifest
    icon.tsx              # generated favicon (next/og)
    opengraph-image.tsx   # generated social share image (next/og)
  components/             # one file per section + Header/Footer/Logo/Reveal
  lib/site.ts             # all content
```

## The contact form

The form in `Contact.tsx` opens the visitor's email client with a pre-filled message
(`mailto:`) — no backend required. To collect submissions server-side instead, wire the
`handleSubmit` function to a form service (Formspree, Resend, or a Next.js route handler).

## SEO & performance

- Static generation — every route prerenders to static HTML.
- `next/font` self-hosts Inter + Space Grotesk (no layout shift, no external requests).
- Full metadata: canonical, Open Graph, Twitter cards, generated OG image.
- Structured data: `ProfessionalService` (org) + `FAQPage`.
- `sitemap.xml`, `robots.txt`, web manifest, security headers.
- Semantic HTML, ARIA landmarks, keyboard-accessible nav, reduced-motion support.

## Deploy

Works on any static/Node host. Easiest is **Vercel**:

```bash
npx vercel
```

Or build and deploy the output to Netlify, Cloudflare Pages, etc.
