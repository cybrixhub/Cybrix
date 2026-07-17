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
  /** Replace with your Calendly/Cal.com booking URL before launch. */
  calendarUrl: "#",
} as const;

export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "Reviews", href: "/#reviews" },
  { label: "FAQ", href: "/#faq" },
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

/** What Cybrix actually sells — grouped by intent.
 *  `slug` is used for the /services/[slug] detail pages. */
export type ServiceItem = {
  slug: string;
  name: string;
  tagline: string;
  bullets?: string[];
  /* Detail-page fields (all optional; only rendered on /services/[slug]) */
  problem?: string;
  solution?: string;
  deliverables?: string[];
  process?: { step: string; title: string; description: string }[];
  fitFor?: string[];
  faqs?: { question: string; answer: string }[];
  relatedCase?: string;
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
        slug: "admission-booster",
        name: "Admission Booster",
        tagline:
          "Fill your classrooms with the students you actually want — schools, coaching centers, ed-tech.",
        bullets: [
          "Local + intent SEO",
          "Season-timed ad campaigns",
          "Lead-gen landing pages",
          "Enrollment nurture flows",
        ],
        problem:
          "Admission season is a scramble. Ad platforms feel expensive, your calendar is packed, and every enrollment is being fought over by three other institutions running the same generic Meta ads.",
        solution:
          "A vertical playbook that runs your admission funnel end-to-end — local SEO to season-timed campaigns to lead-nurture flows — so applications compound month over month instead of spiking and dying with each intake.",
        deliverables: [
          "Full local + intent SEO audit and implementation",
          "Season-timed Meta and Google campaigns (per program)",
          "Dedicated conversion-tuned landing pages",
          "Applicant email + SMS nurture automation",
          "Monthly performance report with next-play recommendations",
        ],
        process: [
          { step: "01", title: "Discovery", description: "Enrollment goals, historic intake data, current channels audit — done in the first week." },
          { step: "02", title: "SEO Foundation", description: "Google Business, program pages, schema, local citations. Ranking work that keeps paying." },
          { step: "03", title: "Campaigns Live", description: "Ads live within 10 days. Creative iterated weekly against CPL." },
          { step: "04", title: "Nurture Automation", description: "Every lead gets a sequence — email + SMS — right up to enrollment day." },
          { step: "05", title: "Scale", description: "Kill what's underperforming, double down on what's converting, report monthly." },
        ],
        fitFor: [
          "Schools & academies",
          "Coaching centers & test prep",
          "Ed-tech platforms",
          "Universities running specific programs",
        ],
        faqs: [
          {
            question: "When should we start relative to intake?",
            answer: "8–12 weeks before applications open. That gives SEO time to compound and lets us test creative before the season heat.",
          },
          {
            question: "What ad budget makes sense?",
            answer: "We usually start clients around $3–5K/month in ad spend on top of the service fee. The Meridian Podiatry case landed CPLs at $8–23 — comparable ratios apply for admissions.",
          },
          {
            question: "Do you need our historical enrollment data?",
            answer: "Helpful but not required. If you have past intake numbers by source we'll benchmark against them; if not, we set fresh baselines in month one.",
          },
        ],
      },
      {
        slug: "deal-drive",
        name: "Deal Drive · Real Estate",
        tagline:
          "Turn listings into signed offers, faster — for agents, brokerages and developers.",
        bullets: [
          "Geo-targeted paid social",
          "Listing SEO + Google Business",
          "Virtual tour content",
          "Buyer-side lead nurture",
        ],
        problem:
          "Listings sit. Open houses skew tire-kickers. The 3% deal you should be closing goes to whoever runs better ads. Referral pipelines are unreliable and MLS visibility isn't enough anymore.",
        solution:
          "Hyper-local paid social + listing SEO + a buyer-side nurture flow that pre-qualifies leads before they land on your calendar. Same tactics we used to close 195 qualified high-ticket leads for an Ottawa renovation firm at $41 CPL.",
        deliverables: [
          "Google Business optimization + local citation build",
          "Hyper-local Meta + Google campaigns per listing/segment",
          "Virtual tour content + short-form video for listings",
          "Buyer nurture sequences (email + SMS)",
          "Weekly performance snapshot + monthly deep-dive",
        ],
        process: [
          { step: "01", title: "Market Analysis", description: "Territory, buyer personas, listing gaps, competitor spend audit." },
          { step: "02", title: "Listings SEO", description: "Every listing tuned for search + Google Business polished for map presence." },
          { step: "03", title: "Campaign Launch", description: "Geo-targeted campaigns live inside two weeks with a cold-to-warm audience ladder." },
          { step: "04", title: "Nurture Activation", description: "Every lead enters an automated sequence with property matches + market updates." },
          { step: "05", title: "Iterate", description: "Kill weak audiences, scale winners, report on cost-per-showing and cost-per-offer." },
        ],
        fitFor: [
          "Independent realtors",
          "Brokerage teams",
          "Developers with new inventory",
          "High-ticket renovation & construction",
        ],
        faqs: [
          {
            question: "How local can you target?",
            answer: "Down to postal code + income bands + homeowner status. On the Ottawa high-ticket renovation account we filtered to $100K+ HHI homeowners in specific neighborhoods.",
          },
          {
            question: "What's a realistic cost-per-qualified-lead?",
            answer: "Depends on the price band. For premium construction we averaged $41. For mid-market listings, you can expect $8–25 CPL depending on market heat.",
          },
        ],
        relatedCase: "high-ticket-renovation-ottawa",
      },
      {
        slug: "healthcare-revenue-engine",
        name: "Healthcare Revenue Engine",
        tagline:
          "A steady flow of qualified patients, month over month — clinics and private practice.",
        bullets: [
          "Local medical SEO",
          "Compliance-safe funnels",
          "Booking automation",
          "Review + reputation ops",
        ],
        problem:
          "Word-of-mouth caps out. Insurance dictates rates. Meta and Google both throw compliance flags at half your creative. You need a steady inbound of qualified patients — without touching HIPAA and without spending nights fighting ad approvals.",
        solution:
          "Local medical SEO + compliance-safe funnels + booking automation. Patients find you, book themselves in, and leave a review — the same system that hit 1,926 leads at $8–$23 CPL for Meridian Podiatry across 16 concurrent campaigns.",
        deliverables: [
          "Google Business + local medical SEO",
          "HIPAA-safe ad creative + landing pages",
          "Dedicated booking pages per condition/service",
          "Review generation automation",
          "Reputation monitoring + response ops",
        ],
        process: [
          { step: "01", title: "Audit", description: "Current patient acquisition, review profile, compliance posture, competitor scan." },
          { step: "02", title: "Local Presence", description: "Google Business, condition-specific pages, medical schema, citation cleanup." },
          { step: "03", title: "Campaigns", description: "Compliance-reviewed creative live in weeks two to four. One campaign per treatment line." },
          { step: "04", title: "Booking Automation", description: "Every lead gets to a self-serve booking flow with reminders + no-show followup." },
          { step: "05", title: "Review Flywheel", description: "Automated post-visit review requests, response ops, and reputation monitoring." },
        ],
        fitFor: [
          "Multi-location clinics",
          "Chiropractic & podiatry",
          "Dental practices",
          "Med spas & aesthetics",
          "Private specialist practice",
        ],
        faqs: [
          {
            question: "How do you handle HIPAA + ad compliance?",
            answer: "We never touch PHI. Ad creative is reviewed against Meta + Google medical policies before it ships. All lead capture is compliance-safe by design.",
          },
          {
            question: "What kind of patient volume can we expect?",
            answer: "Meridian Podiatry hit 1,926 leads on $34K. Back In Motion Chiropractic hit 890+ on $38K. Your numbers depend on service line, geography and budget — we set realistic per-week targets in week one.",
          },
        ],
        relatedCase: "meridian-podiatry",
      },
      {
        slug: "personal-branding",
        name: "Personal Branding",
        tagline:
          "Become the founder your industry follows, not scrolls past.",
        bullets: [
          "LinkedIn ghostwriting",
          "Short-form video system",
          "PR + podcast positioning",
          "Executive content calendar",
        ],
        problem:
          "Your work is world-class. Your inbound pipeline doesn't know it. Every LinkedIn post you skip is a client who found the person who did post. You know you should be visible — you don't have hours a week to figure out what to say.",
        solution:
          "LinkedIn ghostwriting + short-form video system + PR positioning that makes you the founder your industry follows instead of scrolls past. Your voice, our production line.",
        deliverables: [
          "Weekly LinkedIn content plan (ghostwritten)",
          "Founder thought-leadership essays (monthly)",
          "Short-form video capture + production (bi-weekly)",
          "Podcast guest positioning + booking",
          "PR outreach for industry publications",
        ],
        process: [
          { step: "01", title: "Voice Audit", description: "1-hour interview + review of your existing content to lock the voice." },
          { step: "02", title: "Content Strategy", description: "12-week roadmap of themes, angles, and formats — mapped to your commercial goals." },
          { step: "03", title: "Ghost-drafted", description: "Every post drafted for your review + one-tap approval. Nothing goes live without you." },
          { step: "04", title: "Publish + Amplify", description: "Optimized posting, engagement pods, community response — the amplification layer most solo founders skip." },
          { step: "05", title: "Measure Inbound", description: "Track profile visits → DMs → calls booked, not just likes." },
        ],
        fitFor: [
          "Founders + CEOs",
          "C-suite executives",
          "Industry-recognized experts",
          "Consultants & solo operators",
        ],
        faqs: [
          {
            question: "Whose voice ends up in the writing?",
            answer: "Yours. We start with a voice audit interview and review your existing writing. Every draft is calibrated to how you actually talk. If it doesn't sound like you, we rewrite it.",
          },
          {
            question: "How much of my time does this take?",
            answer: "About 90 minutes a week — one voice call, quick approvals on drafts, and a short video capture session every fortnight. That's it.",
          },
        ],
      },
      {
        slug: "trust-building",
        name: "Trust-Building",
        tagline:
          "Reviews, testimonials and social proof that close the deal for you.",
        bullets: [
          "Review generation flows",
          "Case study production",
          "Testimonial video shoots",
          "Media placements",
        ],
        problem:
          "You're doing great work. Prospects can't tell. In a market of 10 competitors making the same claims, whoever has the most proof wins — and right now that's not you.",
        solution:
          "Systematic review generation + case study production + testimonial video shoots + media placements. Every closed client becomes a piece of proof that closes the next one.",
        deliverables: [
          "Automated review generation flows (Google, Trustpilot, industry-specific)",
          "3–5 written case studies per quarter",
          "Testimonial video production (2 clients per month)",
          "Media/podcast placement outreach",
          "Brand mention monitoring + response",
        ],
        process: [
          { step: "01", title: "Audit Existing Proof", description: "What testimonials, reviews, case studies you already have — most brands have more than they think." },
          { step: "02", title: "Set Up Review Flows", description: "Automated post-purchase / post-service review asks. This alone doubles review velocity for most clients." },
          { step: "03", title: "Case Study Production", description: "Interview → written case study → screenshot proof → published on your site and syndicated." },
          { step: "04", title: "Media Outreach", description: "Get you featured in industry publications, podcasts, and roundups." },
          { step: "05", title: "Ongoing Amplification", description: "Every new proof point becomes a paid + organic asset. Compound over time." },
        ],
        fitFor: [
          "Early-stage brands with new market entry",
          "Service businesses competing on reputation",
          "B2B software with long sales cycles",
          "Local businesses fighting for review dominance",
        ],
        faqs: [
          {
            question: "How is this different from just asking for reviews?",
            answer: "Ask-for-reviews works at ~10% response rates when done manually. Our automated flows, timed correctly with the customer journey, hit 40–60%. That's the difference between 5 new reviews a month and 50.",
          },
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
        slug: "zero-to-hero",
        name: "Zero to Hero",
        tagline:
          "Brand, site, socials and content library — launched end-to-end in weeks.",
        bullets: [
          "Brand identity + guidelines",
          "SEO-first website build",
          "Social channel setup",
          "First-30-days content bank",
        ],
        problem:
          "You have a product. You don't have a website, a brand, or a social presence. Launching without them means slower everything — sales, hiring, credibility. Coordinating five separate agencies to build them means slower still.",
        solution:
          "Brand + site + socials + a 30-day content library — built and launched end-to-end in weeks, not months. One team, one timeline, one launch date.",
        deliverables: [
          "Complete brand identity + usage guidelines",
          "SEO-first Next.js website (fast, Core Web Vitals green)",
          "Social channel setup (Instagram, LinkedIn, TikTok, X)",
          "First 30 days of ready-to-publish content",
          "Launch campaign to seed initial audience",
        ],
        process: [
          { step: "01", title: "Positioning Workshop", description: "2-hour session locks the brand promise, tone, target buyer, and category." },
          { step: "02", title: "Brand + Identity", description: "Logo, colors, type, voice guidelines. Delivered inside week 2." },
          { step: "03", title: "Website + Copy", description: "Full site copywritten and shipped inside week 3." },
          { step: "04", title: "Socials + First Content", description: "Channels set up + 30 days of content bank produced by end of week 4." },
          { step: "05", title: "Launch", description: "Coordinated multi-channel launch — paid seed + organic + email." },
        ],
        fitFor: [
          "New businesses launching",
          "Existing brands rebranding",
          "Founders entering a new market",
          "Product launches needing full-stack support",
        ],
        faqs: [
          {
            question: "How fast is 'weeks'?",
            answer: "Four weeks for a standard scope. Six if you need e-commerce or complex integrations. Faster than any five-agency alternative.",
          },
        ],
      },
      {
        slug: "ai-voice-bot",
        name: "AI Voice Bot",
        tagline:
          "Never miss a call, never miss a lead. 24/7 answering that sounds human.",
        bullets: [
          "24/7 inbound handling",
          "Appointment booking",
          "Lead qualification",
          "CRM sync",
        ],
        problem:
          "You miss 30–40% of your inbound calls. Every missed call is a lost lead. Hiring a receptionist costs $40K+/year — and you still lose calls overnight, on weekends, and during peak hours when the phone rings twice at once.",
        solution:
          "A 24/7 AI voice agent that answers, qualifies, books appointments, and syncs leads into your CRM. Sounds human, never sleeps, handles as many concurrent calls as you get.",
        deliverables: [
          "Voice bot setup on your existing phone number",
          "Conversational flow design (qualify → book → confirm)",
          "Calendar integration (Google, Outlook, or your booking tool)",
          "CRM sync (HubSpot, Pipedrive, Sheets — whatever you use)",
          "Custom voice + persona matched to your brand",
          "Monthly optimization based on transcripts",
        ],
        process: [
          { step: "01", title: "Call Flow Mapping", description: "We listen to your existing calls (recordings), map top questions, and design the conversation." },
          { step: "02", title: "Voice Design", description: "Pick or clone the voice, tune the persona, set escalation rules for when to route to human." },
          { step: "03", title: "Integration", description: "Calendar, CRM, and phone number wired up. Testing on a shadow line first." },
          { step: "04", title: "QA + Testing", description: "50+ test calls across scenarios. You approve the transcripts." },
          { step: "05", title: "Live + Refine", description: "Deployed. We tune the flow monthly based on real transcripts and missed intents." },
        ],
        fitFor: [
          "Healthcare practices (missed calls = lost patients)",
          "Real estate agents (leads call outside hours)",
          "Home service businesses (plumbers, electricians, HVAC)",
          "Anyone with high inbound call volume",
        ],
        faqs: [
          {
            question: "Will callers know it's a bot?",
            answer: "It introduces itself as an assistant. Modern voice AI is convincing enough that most callers don't care — they get their appointment booked and hang up satisfied.",
          },
          {
            question: "What happens for complex questions?",
            answer: "Escalation rules route to a human. You define what's in-scope for the bot; anything else forwards to your line or takes a message.",
          },
        ],
      },
      {
        slug: "whatsapp-chat-bot",
        name: "WhatsApp Chat Bot",
        tagline:
          "Instant replies where your customers already are — straight into your pipeline.",
        bullets: [
          "Auto-reply + FAQ",
          "Lead capture forms",
          "Booking + payment links",
          "CRM + sheet sync",
        ],
        problem:
          "Customers message on WhatsApp expecting instant responses. Waiting an hour = losing them to whoever replied first. But sitting on WhatsApp all day isn't your job — closing deals is.",
        solution:
          "Automated WhatsApp flow that instantly replies, qualifies, books, takes payment, and syncs to your pipeline — even when you're asleep. Human handoff for anything the bot can't handle.",
        deliverables: [
          "WhatsApp Business API setup + verification",
          "Multi-step conversation flows",
          "Booking + payment link integration",
          "CRM/sheet sync for every conversation",
          "Broadcast campaign setup",
          "Ongoing flow optimization",
        ],
        process: [
          { step: "01", title: "WhatsApp Verification", description: "Business API setup + Meta verification (takes 3–5 days on their end)." },
          { step: "02", title: "Flow Design", description: "Map top customer questions and design the qualification tree." },
          { step: "03", title: "Integrations", description: "Calendar for booking, Stripe/payment link for checkout, CRM for sync." },
          { step: "04", title: "Test + Launch", description: "Internal team tests every branch. Then you shadow it for a week." },
          { step: "05", title: "Ongoing Tuning", description: "Flow refined monthly based on where customers drop off." },
        ],
        fitFor: [
          "DTC brands with WhatsApp-first customers",
          "Real estate agents",
          "Coaches + course creators",
          "Restaurants + service businesses",
        ],
        faqs: [
          {
            question: "What's a realistic response-time improvement?",
            answer: "Manual: 30 minutes to 4 hours. Bot: under 5 seconds. On a metric that directly correlates with conversion, that's huge.",
          },
        ],
      },
    ],
  },
];

/** Convenience accessor — flatten all services for detail-page routing. */
export const ALL_SERVICES: ServiceItem[] = SERVICE_GROUPS.flatMap((g) => g.items);

export function findService(slug: string): ServiceItem | undefined {
  return ALL_SERVICES.find((s) => s.slug === slug);
}

/**
 * Case studies — metrics pulled from Meta / Ads Manager reports we ran.
 * Screenshots at /public/case-results/. Slug is used for /work/[slug]
 * detail pages.
 */
export type Project = {
  slug: string;
  client: string;
  category: string;
  result: string;
  summary: string;
  tags: string[];
  /* Detail-page fields */
  challenge?: string;
  approach?: string;
  metrics?: { label: string; value: string }[];
  screenshots?: string[];
  services?: string[]; // slugs into ALL_SERVICES
  quote?: { text: string; author: string; role: string };
};

export const WORK: Project[] = [
  {
    slug: "skincare-dtc-canada",
    client: "Skincare DTC",
    category: "Beauty · Canada",
    result: "3,868 leads on $43K spend",
    summary:
      "5.4M impressions and 484K link clicks across a seven-campaign paid-social program — driving qualified skincare leads at CPLs from $0.43 to $92 depending on funnel stage.",
    tags: ["Paid Social", "Meta", "DTC"],
    challenge:
      "Established DTC skincare brand growing organically at a healthy clip. Wanted to accelerate lead-gen for a new product line without cannibalizing existing acquisition — and without inflating blended CPL across the account.",
    approach:
      "Seven parallel campaigns across cold, warm, and remarketing audiences. Aggressive creative testing — hook-first video, static comparison ads, UGC testimonials. Dedicated lead-gen landing pages per audience segment so the message-market match stayed tight all the way through the funnel.",
    metrics: [
      { label: "Total leads", value: "3,868" },
      { label: "Total spend", value: "$43,653" },
      { label: "Impressions", value: "5.4M" },
      { label: "Link clicks", value: "484,450" },
      { label: "Blended CPL", value: "$11.29" },
      { label: "Reach", value: "2.85M" },
    ],
    screenshots: ["/case-results/case-07.png"],
    services: ["personal-branding", "trust-building"],
  },
  {
    slug: "meridian-podiatry",
    client: "Meridian Podiatry Network",
    category: "Healthcare · Canada",
    result: "1,926 leads at $8–$23 CPL",
    summary:
      "16 concurrent campaigns across a podiatry network — toe fungus, heel pain, minimally-invasive surgery — spending $34K to hit nearly 2M in reach and half a million link clicks.",
    tags: ["Paid Social", "Healthcare", "Local"],
    challenge:
      "Multi-location podiatry group offering 16 different treatment lines — toe fungus, heel pain, minimally-invasive surgery, plantar warts. Every location competing for the same local search terms. Meta's medical policy kept flagging generic creative.",
    approach:
      "16 concurrent hyper-targeted campaigns — one per treatment × location. $20/day daily budgets to force efficiency. Aggressive audience narrowing to only high-intent local prospects. Landing pages tuned per condition (not per location) so patients self-selected into their treatment path.",
    metrics: [
      { label: "Total leads", value: "1,926" },
      { label: "Total spend", value: "$34,015" },
      { label: "CPL range", value: "$8.55–$23.36" },
      { label: "Reach", value: "1.96M" },
      { label: "Impressions", value: "5.4M" },
      { label: "Link clicks", value: "467,420" },
    ],
    screenshots: ["/case-results/case-01.png"],
    services: ["healthcare-revenue-engine"],
  },
  {
    slug: "grocery-ecomm",
    client: "Grocery E-commerce",
    category: "E-commerce · Retail",
    result: "74.94× average ROAS",
    summary:
      "R441,073 in tracked conversion value from R5,885 in ad spend across three catalogue and image ad sets — a purchase-optimized structure that cleared 502 purchases in 30 days.",
    tags: ["Paid Social", "Ecommerce", "ROAS"],
    challenge:
      "Grocery ecomm brand competing with big-box retailers on delivery convenience. Needed proof that Meta ads could deliver retail-grade ROAS on thin grocery margins — where a bad ROAS number kills the P&L.",
    approach:
      "Purchase-optimized catalogue campaigns. Three ad sets — Single Images, Catalogue Sales, Posts Sales. Broad audiences with the pixel doing the targeting work. Purchase optimization event with high-frequency creative refresh (weekly). Prospect + retarget mix tuned to maximize repeat-purchase value.",
    metrics: [
      { label: "Total spend", value: "R5,885" },
      { label: "Conversion value", value: "R441,073" },
      { label: "Average ROAS", value: "74.94×" },
      { label: "Purchases", value: "502" },
      { label: "Cost per purchase", value: "R11.72" },
      { label: "Reach", value: "22,226" },
    ],
    screenshots: ["/case-results/case-06.png"],
    services: ["zero-to-hero"],
  },
  {
    slug: "back-in-motion-chiropractic",
    client: "Back In Motion Chiropractic",
    category: "Healthcare · Canada",
    result: "890+ leads · $38K spend",
    summary:
      "14 campaigns spanning StemWave promotions, injury lead-gen and awareness — 302K reach, 1.08M impressions and a $27 blended CPL across the top three ad sets.",
    tags: ["Paid Social", "Healthcare", "Local"],
    challenge:
      "Established chiropractic practice pushing a new StemWave regenerative therapy. Needed to educate the market on an unfamiliar treatment AND convert unfamiliar prospects into booked appointments — two very different jobs on two very different funnel stages.",
    approach:
      "14 campaigns split across education (video views), consideration (traffic), and conversion (leads). Testimonial-driven creative — patients on camera explaining the treatment in their own words. Location targeting inside a 20-mile radius of the practice, layered with injury + wellness interest audiences.",
    metrics: [
      { label: "Total leads", value: "890+" },
      { label: "Total spend", value: "$38,194" },
      { label: "Reach", value: "302,670" },
      { label: "Impressions", value: "1.08M" },
      { label: "Top-3 blended CPL", value: "$27" },
      { label: "Campaigns", value: "14" },
    ],
    screenshots: ["/case-results/case-02.png"],
    services: ["healthcare-revenue-engine", "trust-building"],
  },
  {
    slug: "high-ticket-renovation-ottawa",
    client: "High-Ticket Renovation",
    category: "Real Estate · Ottawa",
    result: "195 qualified leads at $41 CPL",
    summary:
      "Interest-based paid social targeting Ottawa homeowners for premium construction and renovation — $8,043 spend, 119K reach, a five-ad-set structure with a cold-to-warm audience ladder.",
    tags: ["Paid Social", "Real Estate", "High-Ticket"],
    challenge:
      "High-ticket construction firm. Deals worth $50K–$500K each. Traditional lead-gen produced tire-kickers who wanted a $5K bathroom refresh. Needed a system that pre-qualified for budget and intent before the lead hit the sales team's calendar.",
    approach:
      "Interest-based paid social layered with income + homeowner filters. Five-ad-set audience ladder from cold to warm to remarketing. Long-form landing page with qualification questions built-in — anyone not fitting the budget profile was politely redirected to a lower-tier partner.",
    metrics: [
      { label: "Qualified leads", value: "195" },
      { label: "Total spend", value: "$8,043" },
      { label: "CPL", value: "$41" },
      { label: "Reach", value: "119,000" },
      { label: "Impressions", value: "504,000" },
      { label: "Ad sets", value: "5" },
    ],
    screenshots: ["/case-results/case-10.png"],
    services: ["deal-drive", "trust-building"],
  },
  {
    slug: "fashion-apparel-dtc",
    client: "Fashion Apparel DTC",
    category: "E-commerce · Fashion",
    result: "9.66× average ROAS",
    summary:
      "R299,470 in purchase conversion value from R31K spend across six ad sets — 167 purchases at a blended R185 CPA on a purchase-optimized catalogue campaign.",
    tags: ["Paid Social", "Ecommerce", "Fashion"],
    challenge:
      "Fashion DTC brand launching a seasonal collection. Needed to scale ROAS on a purchase-optimized campaign without inflating CPA — a common failure mode when you push spend on a hot creative and audience saturation kicks in.",
    approach:
      "Purchase-optimized catalogue campaign with six ad sets. Broad + interest-layered targeting to hedge against saturation. High-frequency creative refresh (every 5 days) with hook-first video variants. Aggressive kill rules on ad sets that dropped below a 4× ROAS threshold.",
    metrics: [
      { label: "Total spend", value: "R31,014" },
      { label: "Conversion value", value: "R299,470" },
      { label: "Average ROAS", value: "9.66×" },
      { label: "Purchases", value: "167" },
      { label: "Cost per purchase", value: "R185.72" },
      { label: "AOV", value: "R1,793" },
    ],
    screenshots: ["/case-results/case-03.png"],
    services: ["zero-to-hero"],
  },
];

export function findWork(slug: string): Project | undefined {
  return WORK.find((w) => w.slug === slug);
}

/** Screenshot proof-plates rendered in the Reviews section as editorial
 *  audit reports (masthead + meta + screenshot + source citation). */
export type ReviewShot = {
  src: string;
  alt: string;
  client: string;
  vertical: string;
  result: string;
  source: string;
  period?: string;
};

export const REVIEW_SCREENSHOTS: ReviewShot[] = [
  {
    src: "/case-results/case-07.png",
    alt: "Skincare campaign dashboard — 3,868 leads on $43,653 spend across seven campaigns",
    client: "Skincare DTC",
    vertical: "Beauty · Canada",
    result: "3,868 leads · $43K spend",
    source: "Meta Ads Manager",
    period: "Jun 2023 – Sep 2025",
  },
  {
    src: "/case-results/case-06.png",
    alt: "Grocery e-commerce campaign dashboard — 74.94× average purchase ROAS",
    client: "Grocery E-commerce",
    vertical: "Retail · ZA",
    result: "74.94× average ROAS",
    source: "Meta Ads Manager",
    period: "June 2024",
  },
  {
    src: "/case-results/case-01.png",
    alt: "Podiatry campaign dashboard — 1,926 leads across 16 campaigns at $8.55–$23.36 CPL",
    client: "Meridian Podiatry",
    vertical: "Healthcare · Canada",
    result: "1,926 leads at $8–$23 CPL",
    source: "Meta Ads Manager",
    period: "Dec 2022 – Jan 2026",
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
