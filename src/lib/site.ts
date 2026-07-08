/**
 * Cybrix — central site content.
 * Edit copy, services, work and contact details here in one place.
 */

export const SITE = {
  name: "Cybrix",
  legalName: "Cybrix Studio",
  tagline: "Make your startup impossible to ignore.",
  description:
    "The social & content studio behind startups that punch above their size. We turn attention into pipeline — not vanity metrics.",
  /** Update this to your live domain before deploying. */
  url: "https://cybrix.uk",
  /** Placeholder — point this at your real inbox before launch. */
  email: "hello@cybrix.uk",
  phone: "+1 (555) 012-3456",
  location: "Remote · Working worldwide",
  ogImage: "/opengraph-image",
  established: "2020",
} as const;

export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

// Replace these with your real profile URLs before launch.
export const SOCIALS: { label: string; href: string; handle: string }[] = [
  { label: "Instagram", href: "https://instagram.com/cybrix", handle: "@cybrix" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/cybrix",
    handle: "/cybrix",
  },
  { label: "X", href: "https://x.com/cybrix", handle: "@cybrix" },
];

/** Rotating capability ticker (the editorial marquee).
 *  Interleaves packaged offerings (bigger, brand-y) with the tactics that
 *  actually make them up (mono-styled by the Ticker component). */
export const TICKER: string[] = [
  "Admission Booster",
  "Social media",
  "Deal Drive · Real Estate",
  "Content strategy",
  "Healthcare Revenue Engine",
  "SEO",
  "Personal Branding",
  "Newsletters",
  "Trust-Building",
  "Paid social",
  "Zero to Hero",
  "Ghostwriting",
  "AI Voice Bot",
  "Short-form video",
  "WhatsApp Chat Bot",
];

/** Proof points shown inside the hero. */
export type Stat = { value: string; label: string };

export const HERO_STATS: Stat[] = [
  { value: "3.4×", label: "average pipeline growth" },
  { value: "68%", label: "lift in qualified replies" },
  { value: "4.9/5", label: "founder satisfaction" },
];

/** The big track-record band. */
export const TRACK_RECORD: Stat[] = [
  { value: "120+", label: "founders backed" },
  { value: "18M+", label: "impressions driven" },
  { value: "$40M+", label: "raised by clients" },
  { value: "6yrs", label: "compounding" },
];

/** From-the-founder video panel (drop your real video in /public). */
export const FOUNDER = {
  kicker: "From the founder",
  blurb: "Two minutes on how we actually think about growth.",
  duration: "02:14",
  file: "founder-intro.mp4",
  name: "A. Rahman",
  role: "Founder",
} as const;

/** What Cybrix actually sells — grouped by intent. */
export type ServiceItem = {
  name: string;
  tagline: string;
  bullets?: string[];
};

export type ServiceGroup = {
  number: string;
  kicker: string;
  title: string;
  intro: string;
  items: ServiceItem[];
};

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    number: "01",
    kicker: "Your growth plan",
    title: "Vertical-tuned playbooks.",
    intro:
      "Five plans, each built for a specific industry we've moved the numbers in. Pick the one that matches where you sell — we bring the strategy, creative and channels already dialed in.",
    items: [
      {
        name: "Admission Booster",
        tagline:
          "Fill your classrooms with the students you actually want — schools, coaching centers, ed-tech.",
        bullets: [
          "Local + intent SEO",
          "Season-timed ad campaigns",
          "Lead-gen landing pages",
          "Enrollment nurture flows",
        ],
      },
      {
        name: "Deal Drive · Real Estate",
        tagline:
          "Turn listings into signed offers, faster — for agents, brokerages and developers.",
        bullets: [
          "Geo-targeted paid social",
          "Listing SEO + Google Business",
          "Virtual tour content",
          "Buyer-side lead nurture",
        ],
      },
      {
        name: "Healthcare Revenue Engine",
        tagline:
          "A steady flow of qualified patients, month over month — clinics and private practice.",
        bullets: [
          "Local medical SEO",
          "Compliance-safe funnels",
          "Booking automation",
          "Review + reputation ops",
        ],
      },
      {
        name: "Personal Branding",
        tagline:
          "Become the founder your industry follows, not scrolls past.",
        bullets: [
          "LinkedIn ghostwriting",
          "Short-form video system",
          "PR + podcast positioning",
          "Executive content calendar",
        ],
      },
      {
        name: "Trust-Building",
        tagline:
          "Reviews, testimonials and social proof that close the deal for you.",
        bullets: [
          "Review generation flows",
          "Case study production",
          "Testimonial video shoots",
          "Media placements",
        ],
      },
    ],
  },
  {
    number: "02",
    kicker: "Automated systems",
    title: "Engines that run themselves.",
    intro:
      "Set-and-forget systems that handle the repeatable work — capture, qualify, book, follow up — so you stay in your genius zone and never miss a lead.",
    items: [
      {
        name: "Zero to Hero",
        tagline:
          "Brand, site, socials and content library — launched end-to-end in weeks.",
        bullets: [
          "Brand identity + guidelines",
          "SEO-first website build",
          "Social channel setup",
          "First-30-days content bank",
        ],
      },
      {
        name: "AI Voice Bot",
        tagline:
          "Never miss a call, never miss a lead. 24/7 answering that sounds human.",
        bullets: [
          "24/7 inbound handling",
          "Appointment booking",
          "Lead qualification",
          "CRM sync",
        ],
      },
      {
        name: "WhatsApp Chat Bot",
        tagline:
          "Instant replies where your customers already are — straight into your pipeline.",
        bullets: [
          "Auto-reply + FAQ",
          "Lead capture forms",
          "Booking + payment links",
          "CRM + sheet sync",
        ],
      },
    ],
  },
];

export type Project = {
  client: string;
  category: string;
  result: string;
  summary: string;
  tags: string[];
};

/** Placeholder case studies — swap these for your real client results. */
export const WORK: Project[] = [
  {
    client: "Nova Skincare",
    category: "DTC · Beauty",
    result: "+240% organic traffic",
    summary:
      "Rebuilt the content engine and social presence, lifting organic traffic and revenue in six months.",
    tags: ["Content", "SEO", "Social"],
  },
  {
    client: "Peak Fitness",
    category: "Studio · Local",
    result: "3× membership sign-ups",
    summary:
      "A social-first campaign and landing funnel that tripled monthly membership sign-ups.",
    tags: ["Social", "Paid social"],
  },
  {
    client: "Lumen SaaS",
    category: "B2B · Software",
    result: "5× qualified leads",
    summary:
      "Founder-led content and SEO articles that multiplied inbound qualified leads.",
    tags: ["Ghostwriting", "SEO", "Newsletters"],
  },
  {
    client: "Ember Coffee",
    category: "E-commerce · F&B",
    result: "$480K tracked revenue",
    summary:
      "Full-funnel paid and organic program driving nearly half a million in tracked revenue.",
    tags: ["Paid social", "Short-form video"],
  },
];

/** Big-numeral benefit slides (the converting carousel). */
export type Factoid = {
  value: string;
  unit: string;
  title: string;
  note: string;
  image: string;
  alt: string;
};

export const FACTOIDS: Factoid[] = [
  {
    value: "48",
    unit: "hrs",
    title: "From brief to first drop",
    note: "Strategy on Monday, first content live by Wednesday. Momentum from week one.",
    image: "/img/factoid-camera.jpg",
    alt: "Studio camera on a tripod, ready to shoot",
  },
  {
    value: "5",
    unit: "days",
    title: "To your first growth play",
    note: "One play you can run immediately — shipped inside the first week.",
    image: "/img/factoid-console.jpg",
    alt: "Hands working a mixing console in a dark studio",
  },
  {
    value: "1",
    unit: "team",
    title: "Replaces five vendors",
    note: "Social, content, SEO, newsletters and video — one system, one point of contact.",
    image: "/img/factoid-desk.jpg",
    alt: "A founder working at a table",
  },
  {
    value: "100",
    unit: "%",
    title: "Channels you own",
    note: "Audiences and content that belong to you — not rented from an algorithm.",
    image: "/img/factoid-studio.jpg",
    alt: "A content studio set with backdrop and chair",
  },
];

/** Tilted photo collage ("from the studio floor"). */
export type CollageItem = { image: string; alt: string; caption: string };

export const COLLAGE: CollageItem[] = [
  {
    image: "/img/factoid-studio.jpg",
    alt: "A content studio set with backdrop and chair",
    caption: "Set day — short-form sprint",
  },
  {
    image: "/img/factoid-camera.jpg",
    alt: "Studio camera on a tripod",
    caption: "Every frame earns attention",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** The lead quote renders extra-large. */
  lead?: boolean;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Cybrix didn't just grow our numbers — they gave us a voice the market actually remembers.",
    name: "Founder & CEO",
    role: "Seed-stage SaaS",
    lead: true,
  },
  {
    quote:
      "Booked more qualified demos in one quarter than in the entire year before.",
    name: "Head of Growth",
    role: "DTC brand",
  },
  {
    quote:
      "The content engine basically runs itself now. Compounding, finally.",
    name: "Solo founder",
    role: "Fintech",
  },
];

/** The booking section. */
export const BOOK = {
  kicker: "Book",
  title: "Let's map your growth.",
  copy: "A free 30-minute strategy call on Google Meet. Come with your goals; leave with a plan.",
  checkmarks: [
    "A teardown of your current social & content",
    "One growth play you can run this week",
    "No pitch — no pressure",
  ],
} as const;

export type Faq = { question: string; answer: string };

export const FAQS: Faq[] = [
  {
    question: "Who do you work with?",
    answer:
      "Mostly startups and founder-led brands — pre-seed to Series B — that want their social and content to actually produce pipeline. If that's you, we'll get along.",
  },
  {
    question: "What exactly do you take off my plate?",
    answer:
      "Everything between strategy and publish: social media, content, SEO articles, founder ghostwriting, newsletters and short-form video — run as one system with one point of contact.",
  },
  {
    question: "How quickly will I see results?",
    answer:
      "Paid social can move within weeks. Organic and SEO compound over months — we set clear milestones so you always know what's working and what we're changing.",
  },
  {
    question: "How do we start?",
    answer:
      "Book the free strategy call. We'll tear down your current presence, hand you one play you can run immediately, and tell you honestly whether we're the right fit.",
  },
];
