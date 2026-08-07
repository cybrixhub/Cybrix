import type { NextConfig } from "next";

/**
 * Content Security Policy — static-site friendly.
 *
 * `'unsafe-inline'` on scripts is required for Next.js's hydration payload
 * (`__NEXT_DATA__`) and route manifests; on styles it's required for GSAP's
 * inline transform writes and React's `style` prop.
 *
 * Vercel Analytics endpoints (`va.vercel-scripts.com`, `vitals.vercel-insights.com`)
 * are allow-listed preemptively so enabling analytics later doesn't break CSP.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://app.cal.com https://www.youtube-nocookie.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cal.com https://app.cal.com",
  "font-src 'self' data:",
  "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://cal.com https://app.cal.com",
  "frame-src 'self' https://cal.com https://app.cal.com https://www.youtube.com https://www.youtube-nocookie.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' mailto:",
  "object-src 'none'",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  // DENY is stricter than SAMEORIGIN; CSP frame-ancestors 'none' backs it up.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=()",
  },
  { key: "Content-Security-Policy", value: csp },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Strip console.* from production bundles (keep error/warn for real issues)
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  // Better tree-shaking for GSAP's many submodule imports
  experimental: {
    optimizePackageImports: ["gsap"],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    // Our images don't change once deployed; cache aggressively at the edge.
    minimumCacheTTL: 31536000,
    // Allowed quality values (Next 16 requires an allow-list); each JPG
    // asset picks the smallest quality that still looks right for its role.
    qualities: [70, 75, 78, 85],
  },

  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },

      // Long-lived caches for immutable static assets
      {
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      {
        source: "/img/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      {
        source: "/brand/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      {
        source: "/case-results/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      {
        source: "/hero-bg.jpg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;