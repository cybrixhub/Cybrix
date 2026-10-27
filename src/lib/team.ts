/**
 * Team page content — edit names, bios and photos here.
 *
 * Photos live in /public/team/. Mishal Fatima has none yet: an empty
 * `photo.src` renders the branded "photo coming soon" card. To add a photo,
 * drop it in /public/team/ and set `photo.src` to e.g. "/team/mishal-fatima.jpg"
 * (tune `position` / `zoom` if the crop needs it).
 *   position — focal point of the crop (CSS object-position)
 *   zoom     — optional extra zoom around that focal point (1 = none)
 */

export type RoleKey = "ceo" | "md" | "marketing" | "video" | "web";

export type TeamMember = {
  key: RoleKey;
  /** Placeholder — replace with the real name. */
  name: string;
  /** Exact role title shown on the page. */
  role: string;
  /** What this role owns at Cybrix (not a personal biography). */
  focus: string;
  /** Optional personal bio — left empty until real copy is provided. */
  bio?: string;
  skills: string[];
  photo: {
    src: string;
    alt: string;
    position?: string;
    zoom?: number;
    credit?: { name: string; url: string };
  };
};

export const TEAM: TeamMember[] = [
  {
    key: "ceo",
    name: "Talha Zubair Bin Zia",
    role: "CEO",
    focus: "Sets the company's vision and growth direction, and stays close to every client partnership.",
    bio: "",
    skills: ["Vision", "Leadership", "Partnerships"],
    photo: {
      src: "/team/talha-zubair-bin-zia.webp",
      alt: "Talha Zubair Bin Zia, CEO of Cybrix",
      position: "50% 25%",
    },
  },
  {
    key: "md",
    name: "Awais",
    role: "Managing Director",
    focus: "Runs day-to-day operations and keeps every engagement on time, on scope and on target.",
    bio: "",
    skills: ["Operations", "Delivery", "Client success"],
    photo: {
      src: "/team/awais.webp",
      alt: "Awais, Managing Director at Cybrix",
      position: "50% 16%",
      zoom: 1.2,
    },
  },
  {
    key: "marketing",
    name: "Muhammad Shahroz",
    role: "Marketing Director",
    focus: "Shapes the strategy behind every campaign — positioning, channels and the numbers that matter.",
    bio: "",
    skills: ["Strategy", "Campaigns", "Brand growth"],
    photo: {
      src: "/team/muhammad-shahroz.jpg",
      alt: "Muhammad Shahroz, Marketing Director at Cybrix",
      position: "48% 12%",
      zoom: 1.25,
    },
  },
  {
    key: "video",
    name: "Muhammad Arham Hussain",
    role: "Video Production Manager",
    focus: "Leads shoots and edits — turning ideas into reels, ads and stories built for the scroll.",
    bio: "",
    skills: ["Production", "Editing", "Motion"],
    photo: {
      src: "/team/muhammad-arham-hussain.jpg",
      alt: "Muhammad Arham Hussain, Video Production Manager at Cybrix",
      position: "50% 36%",
      zoom: 1.75,
    },
  },
  {
    key: "web",
    name: "Mishal Fatima",
    role: "Web Experience Specialist",
    focus: "Crafts the websites and landing pages where attention turns into enquiries.",
    bio: "",
    skills: ["UX", "Websites", "Landing pages"],
    photo: {
      // No photo yet — an empty src shows the branded "photo coming soon" card.
      src: "",
      alt: "Mishal Fatima, Web Experience Specialist at Cybrix",
    },
  },
];
