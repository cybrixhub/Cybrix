type ProcessStep = { step: string; title: string; description: string };

// ─── Per-service icon sets (5 icons each, matching step order) ────────────────

const ICONS: Record<string, React.ReactNode[]> = {

  "admission-booster": [
    // 01 Discovery — clipboard with data
    <svg key="i" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <rect x="8" y="7" width="22" height="28" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M15 4h8v5h-8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <line x1="13" y1="17" x2="25" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="13" y1="22" x2="25" y2="22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="13" y1="27" x2="19" y2="27" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>,
    // 02 SEO Foundation — globe with search lens
    <svg key="ii" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <circle cx="17" cy="17" r="11" stroke="currentColor" strokeWidth="2"/>
      <path d="M6 17h22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M17 6c-3 3.5-4 7-4 11s1 7.5 4 11" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M17 6c3 3.5 4 7 4 11s-1 7.5-4 11" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="25" y1="25" x2="33" y2="33" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>,
    // 03 Campaigns Live — megaphone with signal
    <svg key="iii" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <path d="M8 16h5l13-7v18L13 21H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M13 21v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M29 13a6 6 0 0 1 0 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M32 10a10 10 0 0 1 0 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>,
    // 04 Nurture Automation — envelope with arrows
    <svg key="iv" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <rect x="4" y="11" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M4 13l11 8 11-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M33 20a6 6 0 1 0-1.8 4.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M31 16v4h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    // 05 Scale — bar chart rising
    <svg key="v" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <rect x="5" y="26" width="7" height="9" rx="1" stroke="currentColor" strokeWidth="2"/>
      <rect x="16" y="18" width="7" height="17" rx="1" stroke="currentColor" strokeWidth="2"/>
      <rect x="27" y="10" width="7" height="25" rx="1" stroke="currentColor" strokeWidth="2"/>
      <path d="M30 6l4 4-4 4M34 10H22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
  ],

  "deal-drive": [
    // 01 Market Analysis — map with pins
    <svg key="i" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <path d="M5 8l10 4 10-4 10 4v20l-10-4-10 4-10-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <line x1="15" y1="12" x2="15" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="25" y1="8" x2="25" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="20" cy="20" r="2.5" fill="currentColor"/>
    </svg>,
    // 02 Listings SEO — house with magnifying glass
    <svg key="ii" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <path d="M6 18L20 7l14 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 16v14h8v-8h4v8h8V16" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="31" cy="30" r="4" stroke="currentColor" strokeWidth="2"/>
      <line x1="34" y1="33" x2="37" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>,
    // 03 Campaign Launch — location pin + people
    <svg key="iii" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <path d="M20 4a10 10 0 0 1 10 10c0 7-10 20-10 20S10 21 10 14A10 10 0 0 1 20 4z" stroke="currentColor" strokeWidth="2"/>
      <circle cx="20" cy="14" r="3.5" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M8 36c0-4 5-6 9-6s9 2 9 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="17" cy="27" r="3" stroke="currentColor" strokeWidth="1.8"/>
    </svg>,
    // 04 Nurture Activation — phone with notification bubble
    <svg key="iv" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <rect x="10" y="5" width="16" height="28" rx="3" stroke="currentColor" strokeWidth="2"/>
      <circle cx="18" cy="30" r="1.5" fill="currentColor"/>
      <path d="M14 10h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="28" cy="9" r="5" stroke="currentColor" strokeWidth="2"/>
      <line x1="28" y1="7" x2="28" y2="9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="28" cy="11.5" r="0.8" fill="currentColor"/>
    </svg>,
    // 05 Iterate — circular refresh arrows
    <svg key="v" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <path d="M20 8a12 12 0 0 1 12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M32 20a12 12 0 0 1-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 32a12 12 0 0 1-12-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 20a12 12 0 0 1 8-11.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M23 4l-3 4 4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
  ],

  "healthcare-revenue-engine": [
    // 01 Audit — stethoscope
    <svg key="i" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <path d="M10 6v12a8 8 0 0 0 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="26" cy="28" r="6" stroke="currentColor" strokeWidth="2"/>
      <line x1="26" y1="25" x2="26" y2="28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="26" cy="29.5" r="1" fill="currentColor"/>
      <circle cx="10" cy="5" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="18" cy="5" r="2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>,
    // 02 Local Presence — map pin with medical cross
    <svg key="ii" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <path d="M20 4a10 10 0 0 1 10 10c0 7-10 20-10 20S10 21 10 14A10 10 0 0 1 20 4z" stroke="currentColor" strokeWidth="2"/>
      <line x1="20" y1="10" x2="20" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="16" y1="14" x2="24" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>,
    // 03 Campaigns — shield with checkmark (compliance safe)
    <svg key="iii" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <path d="M20 4l14 5v10c0 8-6 14-14 17C12 33 6 27 6 19V9z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M13 20l5 5 9-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    // 04 Booking Automation — calendar with tick
    <svg key="iv" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <rect x="5" y="8" width="30" height="26" rx="2" stroke="currentColor" strokeWidth="2"/>
      <line x1="5" y1="16" x2="35" y2="16" stroke="currentColor" strokeWidth="2"/>
      <line x1="13" y1="4" x2="13" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="27" y1="4" x2="27" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M13 25l5 5 9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    // 05 Review Flywheel — star with circular arrow
    <svg key="v" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <path d="M20 6l3.5 7 7.5 1-5.5 5 1.5 8L20 23l-7 4 1.5-8-5.5-5 7.5-1z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M34 28a12 12 0 0 1-16.5 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M32 24l2 4-4 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
  ],

  "personal-branding": [
    // 01 Voice Audit — microphone
    <svg key="i" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <rect x="14" y="4" width="12" height="18" rx="6" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 20a12 12 0 0 0 24 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="20" y1="32" x2="20" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="14" y1="38" x2="26" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>,
    // 02 Content Strategy — calendar with roadmap dots
    <svg key="ii" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <rect x="5" y="8" width="30" height="26" rx="2" stroke="currentColor" strokeWidth="2"/>
      <line x1="5" y1="16" x2="35" y2="16" stroke="currentColor" strokeWidth="2"/>
      <line x1="13" y1="4" x2="13" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="27" y1="4" x2="27" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="24" r="2" fill="currentColor"/>
      <circle cx="20" cy="24" r="2" fill="currentColor"/>
      <circle cx="28" cy="24" r="2" fill="currentColor"/>
      <circle cx="12" cy="30" r="2" fill="currentColor"/>
      <circle cx="20" cy="30" r="2" fill="currentColor"/>
    </svg>,
    // 03 Ghost-drafted — pen nib writing
    <svg key="iii" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <path d="M10 30L6 34l4-1 1-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M10 30L28 12l4 4L14 34z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M24 8l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M22 10l-2-2 4-4 4 4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <line x1="6" y1="36" x2="20" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>,
    // 04 Publish + Amplify — broadcast waves from tower
    <svg key="iv" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <line x1="20" y1="18" x2="20" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="14" y1="34" x2="26" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="20" cy="14" r="4" stroke="currentColor" strokeWidth="2"/>
      <path d="M9 8a14 14 0 0 1 22 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M13 12a8 8 0 0 1 14 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>,
    // 05 Measure Inbound — chart with person silhouette
    <svg key="v" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <path d="M5 30 L12 20 L18 24 L25 13 L34 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="34" cy="9" r="4" stroke="currentColor" strokeWidth="2"/>
      <path d="M29 36c0-4 2-6 5-6s5 2 5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>,
  ],

  "trust-building": [
    // 01 Audit Existing Proof — document with magnifying glass
    <svg key="i" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <rect x="6" y="5" width="20" height="26" rx="2" stroke="currentColor" strokeWidth="2"/>
      <line x1="11" y1="13" x2="21" y2="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="11" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="11" y1="23" x2="17" y2="23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="29" cy="28" r="7" stroke="currentColor" strokeWidth="2"/>
      <line x1="34" y1="33" x2="38" y2="37" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>,
    // 02 Review Flows — 3 stars in a row
    <svg key="ii" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <path d="M8 9l1.5 3H13l-2.5 2 1 3L9 15.5 6.5 17l1-3L5 12h3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M20 6l2 4.5H27l-4 3 1.5 4.5L20 15.5 15.5 18l1.5-4.5-4-3h5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M32 9l1.5 3H37l-2.5 2 1 3L33 15.5 30.5 17l1-3L29 12h3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M5 24 Q20 30 35 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M5 28 Q20 34 35 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>,
    // 03 Case Study Production — open book / document
    <svg key="iii" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <path d="M20 10V34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 10C17 7 9 7 5 9v22c4-2 12-2 15 0" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M20 10c3-3 11-3 15-1v22c-4-2-12-2-15 0" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M25 14l6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M25 19l6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>,
    // 04 Media Outreach — broadcast / newspaper
    <svg key="iv" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <rect x="4" y="10" width="26" height="22" rx="2" stroke="currentColor" strokeWidth="2"/>
      <rect x="8" y="14" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.8"/>
      <line x1="21" y1="14" x2="26" y2="14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="21" y1="18" x2="26" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="8" y1="26" x2="26" y2="26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M33 14a4 4 0 0 1 0 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M35 10a8 8 0 0 1 0 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>,
    // 05 Amplification — megaphone with growth arrow
    <svg key="v" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <path d="M8 17h5l12-8v18L13 21H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M13 21v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M27 22l9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M30 13h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
  ],

  "zero-to-hero": [
    // 01 Positioning Workshop — lightbulb
    <svg key="i" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <path d="M20 6a10 10 0 0 1 6 18v4H14v-4A10 10 0 0 1 20 6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <line x1="14" y1="32" x2="26" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="16" y1="36" x2="24" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="20" y1="10" x2="20" y2="14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M15 15l2 2M25 15l-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>,
    // 02 Brand + Identity — diamond / gem
    <svg key="ii" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <path d="M20 6l14 10-14 20L6 16z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M6 16h28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 8l8 8 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    // 03 Website + Copy — laptop / monitor
    <svg key="iii" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <rect x="5" y="8" width="30" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
      <line x1="1" y1="30" x2="39" y2="30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M15 34h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="10" y1="14" x2="20" y2="14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="10" y1="18" x2="24" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="10" y1="22" x2="17" y2="22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>,
    // 04 Socials + Content — phone with apps grid
    <svg key="iv" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <rect x="11" y="4" width="18" height="32" rx="3" stroke="currentColor" strokeWidth="2"/>
      <circle cx="20" cy="32" r="1.5" fill="currentColor"/>
      <rect x="14" y="10" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="21" y="10" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="14" y="18" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="21" y="18" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    </svg>,
    // 05 Launch — rocket
    <svg key="v" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <path d="M20 4s10 4 10 14c0 3-1.5 6-3.5 8.5L20 34l-6.5-7.5C11.5 24 10 21 10 18 10 8 20 4 20 4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="20" cy="17" r="3" stroke="currentColor" strokeWidth="2"/>
      <path d="M13.5 26.5L8 32M26.5 26.5L32 32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M10 30l-4 2 1-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M30 30l4 2-1-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
  ],

  "ai-voice-bot": [
    // 01 Call Flow Mapping — phone with branches
    <svg key="i" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <path d="M8 6h8l2 6-4 2a16 16 0 0 0 8 8l2-4 6 2v8c-12 2-24-10-22-22z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <line x1="26" y1="12" x2="36" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="26" y1="12" x2="26" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="36" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="26" cy="25" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="26" y1="22" x2="26" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>,
    // 02 Voice Design — sound waveform
    <svg key="ii" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <line x1="4" y1="20" x2="4" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="9" y1="16" x2="9" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="14" y1="10" x2="14" y2="30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="20" y1="6" x2="20" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="26" y1="10" x2="26" y2="30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="31" y1="16" x2="31" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="36" y1="18" x2="36" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>,
    // 03 Integration — plug and socket
    <svg key="iii" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <rect x="14" y="8" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
      <line x1="17" y1="4" x2="17" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="23" y1="4" x2="23" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 16H8a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <line x1="20" y1="26" x2="20" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="16" y1="36" x2="24" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>,
    // 04 QA + Testing — checklist with tick
    <svg key="iv" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <rect x="7" y="5" width="22" height="30" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M14 4h8v5h-8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M12 17l3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 27l3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="31" cy="31" r="6" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2"/>
      <path d="M28 31l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    // 05 Live + Refine — headphones with settings gear
    <svg key="v" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <path d="M8 22v-4a12 12 0 0 1 24 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <rect x="4" y="20" width="7" height="10" rx="3" stroke="currentColor" strokeWidth="2"/>
      <rect x="29" y="20" width="7" height="10" rx="3" stroke="currentColor" strokeWidth="2"/>
      <circle cx="32" cy="34" r="4" stroke="currentColor" strokeWidth="2"/>
      <circle cx="32" cy="34" r="1.2" fill="currentColor"/>
      <line x1="32" y1="29" x2="32" y2="30.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="32" y1="37.5" x2="32" y2="39" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>,
  ],

  "whatsapp-chat-bot": [
    // 01 WhatsApp Verification — chat bubble with tick
    <svg key="i" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <path d="M5 6h30a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H12l-7 6V8a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M13 18l5 5 10-10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    // 02 Flow Design — decision diamond with arrows
    <svg key="ii" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <path d="M20 6l12 12-12 12L8 18z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <line x1="32" y1="18" x2="38" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M35 15l3 3-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="20" y1="30" x2="20" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M17 33l3 3 3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    // 03 Integrations — three connected nodes
    <svg key="iii" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <circle cx="20" cy="10" r="5" stroke="currentColor" strokeWidth="2"/>
      <circle cx="8" cy="30" r="5" stroke="currentColor" strokeWidth="2"/>
      <circle cx="32" cy="30" r="5" stroke="currentColor" strokeWidth="2"/>
      <line x1="15" y1="14" x2="10" y2="26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="25" y1="14" x2="30" y2="26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="13" y1="30" x2="27" y2="30" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>,
    // 04 Test + Launch — send arrow in chat bubble
    <svg key="iv" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <path d="M5 6h30a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H12l-7 6V8a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M10 18l20 0M24 12l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    // 05 Ongoing Tuning — wrench with chat bubble
    <svg key="v" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <path d="M26 6a8 8 0 0 0-8 9l-12 12 4 4 12-12a8 8 0 0 0 9-8 8 8 0 0 0-1-3l-4 4-3-3 4-4A8 8 0 0 0 26 6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M29 24h6a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3l-3 3v-3h-3a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>,
  ],
};

// Fallback generic icons
const FALLBACK_ICONS = [
  <svg key="f1" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
    <circle cx="17" cy="17" r="9" stroke="currentColor" strokeWidth="2.2"/>
    <line x1="23.5" y1="23.5" x2="33" y2="33" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>,
  <svg key="f2" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
    <rect x="5" y="26" width="30" height="6" rx="1.5" stroke="currentColor" strokeWidth="2"/>
    <rect x="9" y="16" width="22" height="7" rx="1.5" stroke="currentColor" strokeWidth="2"/>
    <rect x="13" y="7" width="14" height="7" rx="1.5" stroke="currentColor" strokeWidth="2"/>
  </svg>,
  <svg key="f3" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
    <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="2.2"/>
    <circle cx="20" cy="20" r="6.5" stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="20" cy="20" r="2" fill="currentColor"/>
  </svg>,
  <svg key="f4" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
    <path d="M6 32 L12 22 L18 26 L25 14 L32 20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  <svg key="f5" viewBox="0 0 40 40" fill="none" className="h-7 w-7">
    <path d="M20 4 L23.5 13.5 H34 L25.8 19.7 L29 29 L20 23.2 L11 29 L14.2 19.7 L6 13.5 H16.5 Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
];

// ─── Arrow connector ──────────────────────────────────────────────────────────

function ArrowConnector({ color }: { color: string }) {
  return (
    <div className="absolute -right-3.5 top-8 z-10 hidden lg:flex items-center justify-center">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="13" fill="#FFFFFF" stroke={color} strokeWidth="1.5" opacity="0.8"/>
        <path d="M9 14h10M15 10l4 4-4 4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ServiceProcess({
  steps,
  isTech,
  slug,
}: {
  steps: ProcessStep[];
  isTech: boolean;
  slug: string;
}) {
  const serviceIcons = ICONS[slug] ?? FALLBACK_ICONS;

  const colors = isTech
    ? {
        circle: "#78efeb",
        circleText: "#14317a",
        connector: "rgba(120,239,235,0.25)",
        card: "rgba(27,44,96,0.7)",
        cardBorder: "rgba(120,239,235,0.18)",
        text: "#B9CBE4",
        icon: "#78efeb",
        rail: "rgba(120,239,235,0.3)",
      }
    : {
        circle: "#14317a",
        circleText: "#FFFFFF",
        connector: "rgba(20,49,122,0.2)",
        card: "rgba(20,49,122,0.08)",
        cardBorder: "rgba(20,49,122,0.15)",
        text: "#64748B",
        icon: "#14317a",
        rail: "rgba(20,49,122,0.25)",
      };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {steps.map((step, i) => (
          <div key={step.step} className="relative flex flex-col">
            {i < steps.length - 1 && <ArrowConnector color={colors.circle} />}
            <div
              className="group flex h-full flex-col rounded-xl border p-5 transition-transform duration-300 hover:-translate-y-1"
              style={{ backgroundColor: colors.card, borderColor: colors.cardBorder }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-bold"
                  style={{ backgroundColor: colors.circle, color: colors.circleText }}
                >
                  {step.step}
                </div>
                <div style={{ color: colors.icon }}>{serviceIcons[i]}</div>
              </div>
              <h3 className="font-display text-lg font-medium leading-snug tracking-tight sm:text-xl">
                {step.title}
              </h3>
              <p
                className="mt-3 flex-1 text-sm leading-relaxed border-t pt-3"
                style={{ color: colors.text, borderColor: colors.connector }}
              >
                {step.description}
              </p>
              <p
                className="mt-4 font-mono text-[0.55rem] uppercase tracking-[0.16em]"
                style={{ color: colors.circle, opacity: 0.7 }}
              >
                Step {step.step} / {String(steps.length).padStart(2, "0")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline rail */}
      <div
        className="relative hidden h-px w-full overflow-hidden rounded-full lg:block"
        style={{ backgroundColor: colors.rail }}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: "100%", background: `linear-gradient(to right, ${colors.circle}88, ${colors.circle}22)` }}
        />
      </div>

      {/* Step label ticks */}
      <div className="hidden grid-cols-5 lg:grid">
        {steps.map((step) => (
          <div key={step.step} className="flex flex-col items-center gap-1">
            <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: colors.circle }} />
            <span
              className="text-center font-mono text-[0.55rem] uppercase tracking-[0.14em]"
              style={{ color: colors.text, opacity: 0.6 }}
            >
              {step.title.split(" ").slice(0, 2).join(" ")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
