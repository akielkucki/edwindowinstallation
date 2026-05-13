import {
  Ruler,
  Hammer,
  ClipboardCheck,
  Sparkles,
  Frame,
  Sun,
  Wind,
  Home as HomeIcon,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

/*
 * Content lives in one place so sections can be reordered or repurposed
 * without touching JSX. Add a project, add a service — no other edits
 * required.
 */

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Approach", href: "/#approach" },
  { label: "Windows", href: "/#window-types" },
  { label: "Projects", href: "/#projects" },
  { label: "My List", href: "/design" },
  { label: "Contact", href: "/#quote" },
];

export type ProcessStep = {
  icon: LucideIcon;
  title: string;
  body: string;
};
export type FAQ = {
  question: string;
  answer: string;
};

export const processSteps: ProcessStep[] = [
  {
    icon: Ruler,
    title: "Precise Measurement",
    body: "Every opening is measured by hand, twice. We catch out-of-square frames before the order goes in — not on installation day.",
  },
  {
    icon: ClipboardCheck,
    title: "No-Pressure Consultation",
    body: "We sit down at your kitchen table, walk through every option, and explain trade-offs honestly. No sales script, no upsells.",
  },
  {
    icon: Hammer,
    title: "Meticulous Installation",
    body: "We protect your floors, mind your landscaping, and shim every frame plumb. We finish one window completely before starting the next.",
  },
  {
    icon: Sparkles,
    title: "Walk-Through & Cleanup",
    body: "You inspect every window with us. We haul away every scrap of debris. Your home looks better than when we arrived.",
  },
];

export type Service = {
  icon: LucideIcon;
  title: string;
  body: string;
};

export const services: Service[] = [
  {
    icon: Frame,
    title: "Double-Hung Windows",
    body: "Classic profile, modern weatherproofing. Both sashes tilt for easy cleaning.",
  },
  {
    icon: Sun,
    title: "Bay & Bow Windows",
    body: "Custom-built bay seats and structural support — we treat them as architecture, not just glass.",
  },
  {
    icon: Wind,
    title: "Casement & Awning",
    body: "Tight seals, smooth cranks. The right choice for hard-to-reach spaces.",
  },
  {
    icon: HomeIcon,
    title: "Picture Windows",
    body: "Maximum view, minimum frame. Triple-pane options for premium insulation.",
  },
  {
    icon: ShieldCheck,
    title: "Energy-Efficient Glass",
    body: "Low-E coatings, argon fill, warm-edge spacers. Real savings on real bills.",
  },
  {
    icon: Sparkles,
    title: "Historic Restoration",
    body: "Sash replacements that respect original sightlines — common in older homes here.",
  },
];

export type Project = {
  title: string;
  location: string;
  year: string;
  scope: string;
  description: string;
  image: string;
  category: string;
};

export const projects: Project[] = [
  {
    title: "Restored 1920s Craftsman",
    location: "Maplewood, NJ",
    year: "2024",
    scope: "18 windows · Wood-clad frames · Custom sash profiles",
    description:
      "Period-correct sash replacements that preserved original sightlines and trim while bringing R-value into the modern era.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    category: "Historic Restoration",
  },
  {
    title: "Whole-House Energy Retrofit",
    location: "Westfield, NJ",
    year: "2024",
    scope: "24 windows · Fibrex frames · Triple-pane low-E",
    description:
      "Drafty 1960s split-level transformed into a tight envelope. First-winter heating bills dropped 38%.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
    category: "Whole-House",
  },
  {
    title: "Lakefront Bay Window",
    location: "Summit, NJ",
    year: "2023",
    scope: "Custom bay · Engineered seat · Copper flashing",
    description:
      "Replaced a tired flat picture window with a structural bay that opened the dining room toward the water.",
    image:
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=1600&q=80",
    category: "Specialty",
  },
  {
    title: "Modern Farmhouse Build",
    location: "Chatham, NJ",
    year: "2023",
    scope: "32 windows · Black aluminum-clad · New construction",
    description:
      "Coordinated directly with the builder from rough-opening sizing through punch-list. Zero callbacks.",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80",
    category: "New Construction",
  },
  {
    title: "Tudor Casement Refresh",
    location: "South Orange, NJ",
    year: "2023",
    scope: "12 leaded-glass casements · Restoration-grade hardware",
    description:
      "Salvaged original leaded glass into new energy-efficient casements. The home looks unchanged from the street.",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
    category: "Historic Restoration",
  },
  {
    title: "Sunroom Wall of Glass",
    location: "Millburn, NJ",
    year: "2022",
    scope: "9 picture units · Floor-to-ceiling · Argon-filled",
    description:
      "Engineered an unbroken expanse of glass for an addition with no horizontal mullions to interrupt the view.",
    image:
      "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=1600&q=80",
    category: "Specialty",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  location: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "They were the only contractor who actually measured every opening before quoting. Three other companies eyeballed it. The install was spotless.",
    name: "Margaret H.",
    location: "Restored 1920s craftsman · Maplewood",
  },
  {
    quote:
      "Took longer than competitors quoted, but you can tell the difference standing in the rooms now. No drafts, no rattle, perfect lines.",
    name: "David & Anne R.",
    location: "Whole-house energy retrofit · Westfield",
  },
  {
    quote:
      "Ed himself walked us through each window before they left. Found one tiny scratch — they ordered a replacement sash without us even asking.",
    name: "Jonathan K.",
    location: "Bay window · Summit",
  },
];
export const faqs: FAQ[] = [
  {
    question: "What's the difference between a double-hung and a single-hung window?",
    answer: "Double-hung windows are the most common in the market. They're the most expensive, but they're the most durable.",
  },
  {
    question: "How long does it take to install a window?",
    answer: "It depends on the size and complexity of the window, but most installations take between 4 and 8 hours per window.",
  },
  {
    question: "Do you offer financing?",
    answer: "Yes, we offer a 10% down payment on all projects. We'll pay the rest in full after the first month.",
  },
  {
    question: "What if I have a question about a specific project?",
    answer: "Feel free to reach out to us at <EMAIL> and we'll be happy to answer your questions.",
  },
  {
    question: "What if I have a question about the service?",
    answer: "We're here to help! Reach out to us at <EMAIL> and we'll be happy to answer your questions.",
  }

]
export const serviceAreas = [
  "Maplewood",
  "Westfield",
  "Summit",
  "Millburn",
  "South Orange",
  "Chatham",
  "Madison",
  "Cranford",
];
