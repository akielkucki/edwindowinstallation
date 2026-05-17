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
  DoorOpen,
  DoorClosed,
  PanelsTopLeft,
  Columns3,
  Banknote,
  Calculator,
  Award,
  Clock,
  type LucideIcon,
} from "lucide-react";

/*
 * Single source of truth for marketing content. Reorder, repurpose,
 * or rebrand without touching JSX.
 */

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Windows", href: "/#window-types" },
  { label: "Doors", href: "/#door-types" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Financing", href: "/#financing" },
  { label: "Projects", href: "/#projects" },
  { label: "Learn", href: "/learn" },
];

/* ─── Picture-based nav submenus ─────────────────────────────────── */

export type SubmenuTile = {
  title: string;
  description: string;
  href: string;
  image: string;
};

export const windowSubmenu: SubmenuTile[] = [
  {
    title: "Double-Hung",
    description: "The all-American classic. Both sashes tilt for easy cleaning.",
    href: "/#window-types",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Casement & Awning",
    description: "Crank open for full-screen airflow and an airtight seal.",
    href: "/#window-types",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Bay & Bow",
    description: "Architecture, not just glass — engineered to expand a room.",
    href: "/#window-types",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Picture & Specialty",
    description: "Maximum view, minimum frame. Custom shapes welcome.",
    href: "/#window-types",
    image:
      "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Sliding & Single-Hung",
    description: "Smooth-glide simplicity for hallways and tight spaces.",
    href: "/#window-types",
    image:
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Historic Restoration",
    description: "Period-correct sashes that preserve original sightlines.",
    href: "/#window-types",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80",
  },
];

export const doorSubmenu: SubmenuTile[] = [
  {
    title: "Sliding Patio",
    description: "Tandem rollers, multi-chambered frames, airtight interlock.",
    href: "/#door-types",
    image:
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "French Sliders",
    description: "French-door looks, slider footprint. Best of both worlds.",
    href: "/#door-types",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Hinged French",
    description: "Inswing or outswing with 5-point multi-point locking.",
    href: "/#door-types",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Fiberglass Entry",
    description: "Curb appeal that lasts decades. Foam-core, weatherproof.",
    href: "/#door-types",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80",
  },
];

export const pricingSubmenu: SubmenuTile[] = [
  {
    title: "Straightforward Pricing",
    description: "Three honest tiers, line-item written estimates.",
    href: "/#pricing",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "0% Financing",
    description: "12, 24, and 60-month plans — many qualify in minutes.",
    href: "/#financing",
    image:
      "https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Free In-Home Quote",
    description: "Hand-measured, walked through, no pressure ever.",
    href: "/#quote",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
  },
];

export const projectSubmenu: SubmenuTile[] = [
  {
    title: "Historic Craftsman",
    description: "18 windows · Wood-clad · Custom sash profiles · Maplewood",
    href: "/#projects",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Whole-House Retrofit",
    description: "24 windows · Triple-pane · 38% lower heating bills",
    href: "/#projects",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Lakefront Bay",
    description: "Engineered structural bay · Copper flashing · Summit",
    href: "/#projects",
    image:
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Modern Farmhouse",
    description: "32 black-clad units · New construction · Zero callbacks",
    href: "/#projects",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80",
  },
];

export function getSubmenu(label: string): SubmenuTile[] | null {
  switch (label) {
    case "Windows":
      return windowSubmenu;
    case "Doors":
      return doorSubmenu;
    case "Projects":
      return projectSubmenu;
    case "Pricing":
    case "Financing":
      return pricingSubmenu;
    default:
      return null;
  }
}

/* ─── Process ────────────────────────────────────────────────────── */

export type ProcessStep = {
  icon: LucideIcon;
  title: string;
  body: string;
};

export const processSteps: ProcessStep[] = [
  {
    icon: ClipboardCheck,
    title: "Free In-Home Quote",
    body: "We measure every opening by hand, walk every option with you, and leave a fixed-price written estimate — usually same-day.",
  },
  {
    icon: Calculator,
    title: "Transparent Pricing",
    body: "Three honest tiers. No mystery surcharges, no high-pressure 'today-only' games. What we quote is what you pay.",
  },
  {
    icon: Banknote,
    title: "Easy Financing",
    body: "0% for 12 months for qualified buyers, low-rate plans up to 60 months. Approval in minutes, no obligation.",
  },
  {
    icon: Hammer,
    title: "White-Glove Install",
    body: "Floors covered, landscaping minded, every frame shimmed plumb. Most homes done in 1–2 days. Lifetime workmanship warranty.",
  },
];

/* ─── Services ───────────────────────────────────────────────────── */

export type Service = {
  icon: LucideIcon;
  title: string;
  body: string;
  image: string;
};

export const services: Service[] = [
  {
    icon: Frame,
    title: "Double-Hung Windows",
    body: "Classic profile, modern weatherproofing. Both sashes tilt for easy cleaning.",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    icon: Sun,
    title: "Bay & Bow Windows",
    body: "Custom-built bay seats and structural support — architecture, not just glass.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    icon: Wind,
    title: "Casement & Awning",
    body: "Tight seals, smooth cranks. The right choice for hard-to-reach spaces.",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
  },
  {
    icon: HomeIcon,
    title: "Picture Windows",
    body: "Maximum view, minimum frame. Triple-pane options for premium insulation.",
    image:
      "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=1200&q=80",
  },
  {
    icon: ShieldCheck,
    title: "Energy-Star Glass",
    body: "Low-E coatings, argon fill, warm-edge spacers. Real savings on real bills.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    icon: Sparkles,
    title: "Historic Restoration",
    body: "Sash replacements that respect original sightlines and trim.",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
  },
];

/* ─── Projects ───────────────────────────────────────────────────── */

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

/* ─── Testimonials ──────────────────────────────────────────────── */

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
      "0% financing for 18 months made the whole thing painless. Heating bill is down a third and the upstairs bedrooms are finally quiet.",
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

/* ─── FAQ ───────────────────────────────────────────────────────── */

export type FAQ = {
  question: string;
  answer: string;
};

export const faqs: FAQ[] = [
  {
    question: "My windows still open and close — why would I replace them?",
    answer:
      "A window doesn't fail dramatically; it bleeds. Failed seals let air leak even when latched, single-pane glass invites condensation and rot, and tired weatherstripping turns every cold morning into a heating bill. Most homeowners are surprised how much quieter, brighter, and warmer a room feels the day a modern window goes in — and how steadily the energy savings show up on the monthly bill.",
  },
  {
    question: "Do you offer financing?",
    answer:
      "Yes — 0% APR for 12 months for qualified buyers, plus low fixed-rate plans up to 60 months. Soft-credit pre-qualification takes about two minutes and doesn't affect your score. Request a financing quote from any page and we'll send your options.",
  },
  {
    question: "What does a typical project cost?",
    answer:
      "A standard double-hung runs $900–$1,400 installed. A large picture window that needs structural work (new header, framing, drywall, exterior finish) runs $4,000–$10,000+. Bay or bow windows with support cables typically come in at $4,000–$12,000+. Whole-house replacements (10–25 windows) generally land between $15,000 and $40,000 depending on size, glass package, and frame material. Every quote is a fixed price in writing — no add-ons on install day.",
  },
  {
    question: "How long does the install take?",
    answer:
      "Most full-house projects are complete in 1–2 days. Standard-size units take 45–90 minutes each. Your home is buttoned up every night — no plastic sheeting and rotating crews for a week.",
  },
  {
    question: "How much can I really save on energy bills?",
    answer:
      "Replacing single-pane or worn double-pane units with Energy-Star rated, low-E, argon-filled glass typically reduces heating and cooling costs by 25–40%. A drafty 1960s home loses 25–30% of its heating energy through its windows alone.",
  },
  {
    question: "What's the warranty?",
    answer:
      "Lifetime workmanship warranty on every installation, plus the manufacturer's lifetime glass and frame warranty (transferable to the next homeowner). We answer the phone in year ten.",
  },
];

/* ─── Doors ─────────────────────────────────────────────────────── */

export type Door = {
  icon: LucideIcon;
  title: string;
  body: string;
  details: string[];
  image: string;
};

export const doors: Door[] = [
  {
    icon: PanelsTopLeft,
    title: "Sliding Patio Doors",
    body: "Smooth-glide tandem rollers and a heavy-duty interlock — the workhorse of the patio door world.",
    details: [
      "2-, 3-, and 4-panel configurations",
      "Foam-filled frames, multi-chambered profile",
      "Triple weatherstripping for an airtight seal",
    ],
    image:
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80",
  },
  {
    icon: Columns3,
    title: "French Sliding Doors",
    body: "The look of a hinged French door with the floor-saving footprint of a slider. The best of both worlds.",
    details: [
      "Wide stiles and rails for a true French look",
      "Internal grilles or simulated divided lites",
      "Slim, sightline-friendly meeting rail",
    ],
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
  },
  {
    icon: DoorOpen,
    title: "Hinged French Doors",
    body: "Inswing or outswing French doors with a true 5-point multi-point lock and an adjustable astragal.",
    details: [
      "Single or double active configurations",
      "Multi-point locking for security and weather seal",
      "ADA-compliant low-profile sill option",
    ],
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    icon: DoorClosed,
    title: "Entry Doors",
    body: "Insulated fiberglass and steel entry systems engineered for curb appeal and decades of weather.",
    details: [
      "Smooth or wood-grain fiberglass skins",
      "Polyurethane foam core for high R-value",
      "Sidelites, transoms, and decorative glass options",
    ],
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
  },
];

/* ─── Pricing ───────────────────────────────────────────────────── */

export type PricingTier = {
  name: string;
  tagline: string;
  pricePerWindow: string;
  startingAt: string;
  bestFor: string;
  features: string[];
  highlighted?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    name: "Essential",
    tagline: "Standard double-hung, installed right.",
    pricePerWindow: "$900–$1,400",
    startingAt: "per window installed",
    bestFor: "Like-for-like double-hung replacements. Rental properties, single-window swaps.",
    features: [
      "Dual-pane low-E glass, argon fill",
      "Vinyl frame, white interior + exterior",
      "Tilt-in sashes for easy cleaning",
      "Lifetime manufacturer warranty",
      "Standard install: shimmed, foam-sealed, trimmed",
    ],
  },
  {
    name: "Signature",
    tagline: "Our most popular package.",
    pricePerWindow: "$1,500–$2,400",
    startingAt: "per window installed",
    bestFor: "Whole-house upgrades that need to look great and last decades.",
    features: [
      "Triple-pane low-E with two argon chambers",
      "Color-matched interior + 14 exterior colors",
      "Foam-filled chambers for max R-value",
      "Custom grille patterns & hardware finishes",
      "White-glove install + lifetime workmanship",
    ],
    highlighted: true,
  },
  {
    name: "Heritage",
    tagline: "Structural, custom, restoration-grade.",
    pricePerWindow: "$5,500+",
    startingAt: "installed (large picture, bay & bow)",
    bestFor: "Large picture windows requiring structural work, bay & bow, historic restorations.",
    features: [
      "Solid wood interior, aluminum-clad exterior",
      "Triple-pane krypton-filled glass package",
      "Custom framing, header & structural support",
      "True divided lites or SDL with spacers",
      "Permit handling, drywall & trim integration",
    ],
  },
];

export type PricingFact = {
  icon: LucideIcon;
  label: string;
  detail: string;
};

export const pricingFacts: PricingFact[] = [
  {
    icon: ClipboardCheck,
    label: "Fixed-price written estimate",
    detail: "What we quote is what you pay. No add-ons on install day.",
  },
  {
    icon: Award,
    label: "Lifetime workmanship warranty",
    detail: "Transferable to the next homeowner. We answer the phone in year ten.",
  },
  {
    icon: Clock,
    label: "Most homes done in 1–2 days",
    detail: "Buttoned up every night. No plastic-sheeting marathons.",
  },
];

/* ─── Financing ─────────────────────────────────────────────────── */

export type FinancingPlan = {
  name: string;
  termMonths: number;
  apr: string;
  /** Sample monthly payment shown on each plan card. Anchored to FINANCING_ANCHOR. */
  monthlyAtAnchor: string;
  description: string;
  badge?: string;
};

/** Dollar amount the per-plan monthly preview is calculated on. Typical mid-range project. */
export const FINANCING_ANCHOR = 15000;

export const financingPlans: FinancingPlan[] = [
  {
    name: "Same-as-Cash",
    termMonths: 12,
    apr: "0%",
    monthlyAtAnchor: "$1,250",
    description:
      "Pay it off within 12 months and you pay zero interest. Most popular for quick wins.",
    badge: "Most popular",
  },
  {
    name: "Comfort Plan",
    termMonths: 24,
    apr: "5.99%",
    monthlyAtAnchor: "$665",
    description:
      "Stretch over two years at a low fixed rate. Predictable monthly payment.",
  },
  {
    name: "Long Horizon",
    termMonths: 60,
    apr: "8.99%",
    monthlyAtAnchor: "$311",
    description:
      "Lowest monthly payment. Great for whole-house projects you want to fold into the budget.",
  },
];

export const financingFacts = [
  "Soft-credit pre-qualification in ~2 minutes — no impact to your score.",
  "Apply once, pick your plan after we finalize your quote.",
  "No prepayment penalties, ever.",
];

/* ─── Service areas ─────────────────────────────────────────────── */

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
