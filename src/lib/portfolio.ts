/**
 * Portfolio page content — sourced from "Cybrix Social Media Marketing
 * Portfolio.pdf". Figures are copied as written in the PDF; metrics the PDF
 * doesn't give are simply left out (never estimated).
 */

export const PORTFOLIO_INTRO =
  "A complete social media ecosystem built for brands that want consistent growth.";

/** Page 2 — the ecosystem diagram, top tier first. */
export const ECOSYSTEM_TIERS: string[][] = [
  ["Social Media Strategy"],
  ["Organic Content Strategy", "Trend-Based Content Research"],
  ["Community Management", "Content Planning & Scheduling", "Organic Growth Systems"],
  ["Monthly Performance Reporting", "Cross-platform Optimization"],
];

/** Page 3. */
export const PLATFORMS = ["Facebook", "Instagram", "LinkedIn", "TikTok", "YouTube"] as const;
export type Platform = (typeof PLATFORMS)[number];

/** Page 4. */
export const STRATEGY = {
  title: "Social Media Strategy",
  lead: "A customized strategy for each brand that includes:",
  steps: [
    "Audience persona mapping",
    "Competitive and trend analysis",
    "Content pillars and messaging direction",
    "Channel distribution strategy",
    "Posting frequency and timings",
    "Brand voice and tone development",
  ],
};

export type SupportService = { title: string; lead: string; points: string[] };

/** Pages 5–11. */
export const SUPPORT_SERVICES: SupportService[] = [
  {
    title: "Organic Content Strategy",
    lead: "Creating content that feels natural, engaging, and platform-ready:",
    points: [
      "Storytelling + educational + value-driven formats",
      "Platform-specific content types",
      "Campaign-based content planning",
      "Visual + copy direction",
    ],
  },
  {
    title: "Trend-Based Research & Strategy",
    lead: "Staying ahead of the algorithm with trends that matter:",
    points: [
      "Real-time insights to leverage what's working now",
      "Daily/weekly trend scanning on TikTok & Instagram",
      "Adapting trends to each brand's niche",
      "Creating timely, culturally relevant content",
      "Testing new formats for higher reach",
    ],
  },
  {
    title: "Community Management",
    lead: "Human-first engagement and brand presence:",
    points: [
      "Responding to comments, messages, and queries",
      "Building connection with followers",
      "Managing negative feedback professionally",
      "Maintaining brand personality across interactions",
      "Monitoring brand mentions & user sentiment",
    ],
  },
  {
    title: "Content Planning & Scheduling",
    lead: "A structured monthly calendar that keeps your brand active and consistent:",
    points: [
      "Monthly content calendars",
      "Seasonal and event-based planning",
      "Optimized posting frequency for every platform",
      "Scheduling via tools like Meta Planner, Buffer, Later, Notion",
      "Asset management and timeline coordination",
    ],
  },
  {
    title: "Organic Growth Systems",
    lead: "Organic growth through methods that actually work in 2026:",
    points: [
      "Content consistency and relevancy",
      "Reels/TikTok short-form momentum",
      "Community engagement loops",
      "Data-backed content refinement",
      "Cross-platform amplification",
      "SEO-optimized captions and hashtags",
    ],
  },
  {
    title: "Monthly Performance Reporting",
    lead: "Transparent and insight-driven monthly performance reports:",
    points: [
      "Clear month-to-month reporting to track growth and engagement",
      "Breakdowns of key metrics across all platforms",
      "Insights on content performance and audience behavior",
      "Actionable recommendations for next-month improvements",
      "Data-backed decisions to refine strategy and maintain steady growth",
    ],
  },
  {
    title: "Cross-platform Optimization",
    lead: "Tailored content and strategy for each platform's unique audience behavior:",
    points: [
      "Platform-first content formatting and messaging",
      "Optimizing posting times based on audience activity",
      "Adjusting hooks, CTAs, and storytelling for each channel",
      "Adapting trends for brand-safe, platform-relevant execution",
      "Maintaining consistent brand identity while refining content per platform",
      "Ensuring seamless user experience across Meta, Instagram, LinkedIn, and TikTok",
    ],
  },
];

/** Page 12. */
export const CONTENT_PLAN = {
  image: "/portfolio/content-calendar.webp",
  width: 1120,
  height: 550,
  alt: "Monthly content calendar spreadsheet with daily content ideas and upload status for Instagram, TikTok, Facebook and YouTube",
  caption:
    "Monthly content calendar showing structured themes, hooks, and posting frequency tailored for the client's niche.",
};

export type Creative = {
  image: string;
  width: number;
  height: number;
  title: string;
  alt: string;
};

/** Pages 13–15. */
export const CREATIVES_CAPTION =
  "A glimpse of visual content crafted to match brand tone, trends, and platform style.";

export const CREATIVES: Creative[] = [
  {
    image: "/portfolio/creative-produce.webp",
    width: 1001,
    height: 428,
    title: "Fresh produce — product launch posts",
    alt: "Grid of ten social posts showcasing different mango varieties with prices",
  },
  {
    image: "/portfolio/creative-finance.webp",
    width: 441,
    height: 391,
    title: "Finance & trading education",
    alt: "Grid of Instagram posts and reel covers about investing, forex and crypto education",
  },
  {
    image: "/portfolio/creative-study-abroad.webp",
    width: 440,
    height: 395,
    title: "Study abroad consultancy",
    alt: "Grid of social posts promoting study destinations, university intakes and events",
  },
  {
    image: "/portfolio/creative-e-mobility.webp",
    width: 389,
    height: 429,
    title: "E-scooter & e-bike retail",
    alt: "Grid of product posts and promotions for electric scooters and e-bikes",
  },
];

export type CaseSector = "Healthcare" | "Home services" | "E-commerce";

export type CaseStudy = {
  id: string;
  niche: string;
  region?: string;
  sector: CaseSector;
  headline: { value: string; label: string };
  metrics: { label: string; value: string }[];
  note?: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  /** "summary" = figures from the slide's written summary; "report" = read off the Ads Manager screenshot. */
  source: "summary" | "report";
};

/** Pages 17–26. Existing Ads Manager captures in /case-results match each slide. */
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "podiatry-canada",
    niche: "Podiatry",
    region: "Canada",
    sector: "Healthcare",
    headline: { value: "1,926", label: "Leads" },
    metrics: [
      { label: "Cost per lead", value: "$8.55 – $23.36" },
      { label: "Total spend", value: "$34,015.58" },
      { label: "Reach", value: "1,963,445" },
      { label: "Impressions", value: "5,418,266" },
      { label: "Link clicks", value: "467,420" },
    ],
    image: "/case-results/case-01.png",
    imageWidth: 2048,
    imageHeight: 910,
    source: "summary",
  },
  {
    id: "skin-care-canada",
    niche: "Skin Care",
    region: "Canada",
    sector: "E-commerce",
    headline: { value: "3,868", label: "Leads" },
    metrics: [
      { label: "Cost per lead", value: "$0.43 – $92.83" },
      { label: "Total spend", value: "$43,653.57" },
      { label: "Reach", value: "2,851,734" },
      { label: "Impressions", value: "5,418,266" },
      { label: "Link clicks", value: "484,450" },
    ],
    image: "/case-results/case-07.png",
    imageWidth: 2048,
    imageHeight: 866,
    source: "summary",
  },
  {
    id: "chiropractic-canada",
    niche: "Chiropractic",
    region: "Canada",
    sector: "Healthcare",
    headline: { value: "890+", label: "Leads" },
    metrics: [
      { label: "Cost per lead", value: "$20 – $30 avg" },
      { label: "Total spend", value: "$38,194.72" },
      { label: "Reach", value: "302,670" },
      { label: "Impressions", value: "1,088,381" },
      { label: "Link clicks", value: "302,670" },
    ],
    image: "/case-results/case-02.png",
    imageWidth: 2048,
    imageHeight: 1007,
    source: "summary",
  },
  {
    id: "chiropractic-local",
    niche: "Chiropractic",
    sector: "Healthcare",
    headline: { value: "114", label: "Leads" },
    metrics: [
      { label: "Cost per lead", value: "$19 – $105.91" },
      { label: "Total spend", value: "$3,723.94" },
      { label: "Reach", value: "46,370" },
      { label: "Impressions", value: "125,417" },
      { label: "Link clicks", value: "11,409" },
    ],
    image: "/case-results/case-05.png",
    imageWidth: 2048,
    imageHeight: 658,
    source: "summary",
  },
  {
    id: "renovation-construction-canada",
    niche: "High-Ticket Renovation & Construction",
    region: "Canada",
    sector: "Home services",
    headline: { value: "195", label: "Leads" },
    metrics: [
      { label: "Cost per lead", value: "$41" },
      { label: "Total spend", value: "$8,043" },
      { label: "Reach", value: "119,000" },
      { label: "Impressions", value: "504,000" },
      { label: "Link clicks", value: "5,232" },
    ],
    note: "Targeted homeowners in Ottawa interested in high-end construction and renovation services.",
    image: "/case-results/case-10.png",
    imageWidth: 1232,
    imageHeight: 427,
    source: "summary",
  },
  {
    id: "home-improvement-australia",
    niche: "Home Improvement — Renovation",
    region: "Australia",
    sector: "Home services",
    headline: { value: "127", label: "Leads" },
    metrics: [
      { label: "Cost per lead", value: "$51.24" },
      { label: "Total spend", value: "$6,507" },
      { label: "Reach", value: "65,605" },
      { label: "Impressions", value: "298,422" },
      { label: "Link clicks", value: "1,493" },
    ],
    image: "/case-results/case-09.png",
    imageWidth: 1227,
    imageHeight: 246,
    source: "summary",
  },
  {
    id: "home-renovation-canada",
    niche: "Home Renovation Services",
    region: "Canada",
    sector: "Home services",
    headline: { value: "110", label: "Leads" },
    metrics: [
      { label: "Cost per lead", value: "$89" },
      { label: "Total spend", value: "$9,810" },
      { label: "Reach", value: "64,483" },
      { label: "Impressions", value: "267,990" },
      { label: "Link clicks", value: "1,754" },
    ],
    image: "/case-results/case-08.png",
    imageWidth: 786,
    imageHeight: 430,
    source: "summary",
  },
  {
    id: "marine-books-charts",
    niche: "Marine Books & Nautical Charts",
    sector: "E-commerce",
    headline: { value: "69", label: "Website purchases" },
    metrics: [
      { label: "Cost per purchase", value: "$25.99" },
      { label: "Amount spent", value: "$1,792.99" },
      { label: "Reach", value: "28,931" },
      { label: "Impressions", value: "151,173" },
    ],
    note: "A tricky niche. Reporting period Dec 1, 2024 – Feb 28, 2025.",
    image: "/case-results/case-04.png",
    imageWidth: 1260,
    imageHeight: 485,
    source: "report",
  },
  {
    id: "grocery-store",
    niche: "Grocery Store",
    sector: "E-commerce",
    headline: { value: "74.94", label: "Average ROAS" },
    metrics: [
      { label: "Website purchases", value: "502" },
      { label: "Cost per purchase", value: "R11.72" },
      { label: "Amount spent", value: "R5,885.69" },
      { label: "Purchase value", value: "R441,073.29" },
      { label: "Reach", value: "22,226" },
      { label: "Impressions", value: "226,324" },
    ],
    note: "Reporting period Jun 1 – Jun 30, 2024.",
    image: "/case-results/case-06.png",
    imageWidth: 1389,
    imageHeight: 406,
    source: "report",
  },
  {
    id: "fashion-apparel",
    niche: "Fashion Branded Apparel",
    sector: "E-commerce",
    headline: { value: "9.67", label: "ROAS" },
    metrics: [
      { label: "Purchases", value: "167" },
      { label: "Cost per purchase", value: "R185.72" },
      { label: "Amount spent", value: "R31,014.99" },
      { label: "Purchase value", value: "R299,470.00" },
      { label: "Reach", value: "297,966" },
      { label: "Impressions", value: "1,030,411" },
    ],
    image: "/case-results/case-03.png",
    imageWidth: 796,
    imageHeight: 373,
    source: "report",
  },
];

/** Page 27. */
export const PORTFOLIO_CTA = {
  title: "Let's Build Your Social Presence",
  question: "Ready to grow consistently across social platforms?",
  copy: "Let's build a strategy that elevates your brand, strengthens your community, and increases your visibility organically.",
};
