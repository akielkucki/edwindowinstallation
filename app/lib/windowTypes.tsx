import type { FC, ReactNode } from "react";

/*
 * Shared window-type catalog.
 *
 * The landing page drawer (WindowPreviews) and the /design/[slug]
 * configurator both need to walk this list — pulling it out of
 * WindowPreviews so we have a single source of truth.
 *
 * The Preview SVGs live alongside the data because the elevation is
 * conceptually part of the type definition: each type has a specific
 * canonical drawing.
 */

export type ProductTier = "Standard" | "Premium" | "Signature";

export type Product = {
  name: string;
  line: string;
  tier: ProductTier;
};

export type WindowTypeSlug =
  | "double-hung"
  | "single-hung"
  | "casement"
  | "awning"
  | "slider"
  | "picture"
  | "bay-bow"
  | "specialty";

export type WindowType = {
  slug: WindowTypeSlug;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  bestFor: string;
  image: string;
  products: Product[];
  Preview: FC<{ className?: string }>;
};

/* ── Preview elevations ────────────────────────────────────────────── */

const SVG_STROKE = "currentColor";

function FrameBase({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 100 130"
      fill="none"
      stroke={SVG_STROKE}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className="h-full w-full"
      aria-hidden
    >
      <rect
        x="6"
        y="6"
        width="88"
        height="118"
        strokeWidth="1.25"
        className="opacity-70"
      />
      <line
        x1="6"
        y1="124"
        x2="94"
        y2="124"
        strokeWidth="2"
        className="opacity-60"
      />
      {children}
    </svg>
  );
}

export function DoubleHungPreview({ className }: { className?: string }) {
  return (
    <div className={className}>
      <FrameBase>
        <rect x="12" y="12" width="76" height="50" strokeWidth="1" />
        <rect x="12" y="64" width="76" height="54" strokeWidth="1" />
        <line x1="50" y1="12" x2="50" y2="62" strokeWidth="0.6" className="opacity-50" />
        <line x1="50" y1="64" x2="50" y2="118" strokeWidth="0.6" className="opacity-50" />
        <path d="M22 38 L22 26 M18 30 L22 26 L26 30" strokeWidth="0.9" />
        <path d="M22 80 L22 96 M18 92 L22 96 L26 92" strokeWidth="0.9" />
      </FrameBase>
    </div>
  );
}

export function SingleHungPreview({ className }: { className?: string }) {
  return (
    <div className={className}>
      <FrameBase>
        <rect x="12" y="12" width="76" height="50" strokeWidth="1" />
        <rect x="12" y="64" width="76" height="54" strokeWidth="1" />
        <line x1="50" y1="12" x2="50" y2="62" strokeWidth="0.6" className="opacity-50" />
        <path d="M22 80 L22 96 M18 92 L22 96 L26 92" strokeWidth="0.9" />
      </FrameBase>
    </div>
  );
}

export function CasementPreview({ className }: { className?: string }) {
  return (
    <div className={className}>
      <FrameBase>
        <rect x="12" y="12" width="76" height="106" strokeWidth="1" />
        <circle cx="88" cy="22" r="1.4" fill={SVG_STROKE} stroke="none" />
        <circle cx="88" cy="108" r="1.4" fill={SVG_STROKE} stroke="none" />
        <line
          x1="12"
          y1="118"
          x2="88"
          y2="65"
          strokeWidth="0.6"
          className="opacity-40"
          strokeDasharray="2 2"
        />
        <line
          x1="12"
          y1="12"
          x2="88"
          y2="65"
          strokeWidth="0.6"
          className="opacity-40"
          strokeDasharray="2 2"
        />
        <circle cx="20" cy="65" r="2" strokeWidth="0.9" />
      </FrameBase>
    </div>
  );
}

export function AwningPreview({ className }: { className?: string }) {
  return (
    <div className={className}>
      <FrameBase>
        <rect x="12" y="40" width="76" height="50" strokeWidth="1" />
        <circle cx="22" cy="40" r="1.4" fill={SVG_STROKE} stroke="none" />
        <circle cx="78" cy="40" r="1.4" fill={SVG_STROKE} stroke="none" />
        <line
          x1="12"
          y1="90"
          x2="50"
          y2="40"
          strokeWidth="0.6"
          className="opacity-40"
          strokeDasharray="2 2"
        />
        <line
          x1="88"
          y1="90"
          x2="50"
          y2="40"
          strokeWidth="0.6"
          className="opacity-40"
          strokeDasharray="2 2"
        />
        <path d="M50 102 L50 114 M46 110 L50 114 L54 110" strokeWidth="0.9" />
      </FrameBase>
    </div>
  );
}

export function SliderPreview({ className }: { className?: string }) {
  return (
    <div className={className}>
      <FrameBase>
        <rect x="12" y="32" width="76" height="66" strokeWidth="1" />
        <line x1="50" y1="32" x2="50" y2="98" strokeWidth="1" />
        <path d="M28 65 L18 65 M22 61 L18 65 L22 69" strokeWidth="0.9" />
        <path d="M72 65 L82 65 M78 61 L82 65 L78 69" strokeWidth="0.9" />
        <line x1="12" y1="98" x2="88" y2="98" strokeWidth="1.6" />
      </FrameBase>
    </div>
  );
}

export function PicturePreview({ className }: { className?: string }) {
  return (
    <div className={className}>
      <FrameBase>
        <rect x="12" y="12" width="76" height="106" strokeWidth="1" />
        <line x1="50" y1="12" x2="50" y2="118" strokeWidth="0.5" className="opacity-30" />
        <line x1="12" y1="65" x2="88" y2="65" strokeWidth="0.5" className="opacity-30" />
      </FrameBase>
    </div>
  );
}

export function BayPreview({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 100 130"
        fill="none"
        stroke={SVG_STROKE}
        className="h-full w-full"
        aria-hidden
      >
        <path
          d="M10 100 L26 50 L74 50 L90 100 Z"
          strokeWidth="1.25"
          className="opacity-80"
        />
        <line x1="26" y1="50" x2="74" y2="50" strokeWidth="1" />
        <line x1="10" y1="100" x2="26" y2="50" strokeWidth="1" />
        <line x1="74" y1="50" x2="90" y2="100" strokeWidth="1" />
        <line x1="10" y1="100" x2="90" y2="100" strokeWidth="2" />
        <line
          x1="26"
          y1="50"
          x2="26"
          y2="100"
          strokeWidth="0.5"
          strokeDasharray="2 2"
          className="opacity-40"
        />
        <line
          x1="74"
          y1="50"
          x2="74"
          y2="100"
          strokeWidth="0.5"
          strokeDasharray="2 2"
          className="opacity-40"
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="100"
          strokeWidth="0.5"
          strokeDasharray="2 2"
          className="opacity-30"
        />
      </svg>
    </div>
  );
}

export function SpecialtyPreview({ className }: { className?: string }) {
  return (
    <div className={className}>
      <FrameBase>
        <path d="M12 65 A38 38 0 0 1 88 65 L88 118 L12 118 Z" strokeWidth="1" />
        <line x1="50" y1="27" x2="50" y2="118" strokeWidth="0.5" className="opacity-30" />
        <line x1="12" y1="65" x2="88" y2="65" strokeWidth="0.5" className="opacity-30" />
      </FrameBase>
    </div>
  );
}

/* ── Catalog ───────────────────────────────────────────────────────── */

export const windowTypes: WindowType[] = [
  {
    slug: "double-hung",
    name: "Double-Hung",
    tagline: "The American classic.",
    description:
      "Two vertically operating sashes — the top drops, the bottom rises — with both tilting inward for cleaning from inside. The most versatile profile we install: at home on a 1910 colonial or a 2024 farmhouse, and the easiest to source replacement parts for thirty years from now.",
    features: [
      "Both sashes operate independently for adjustable airflow",
      "Tilt-in design for cleaning without ladders",
      "Period-correct sightlines for historic homes",
      "Widest range of grille and trim options",
    ],
    bestFor: "Bedrooms, living rooms, traditional facades.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    products: [
      { name: "Andersen 400 Series", line: "Wood-clad", tier: "Premium" },
      { name: "Marvin Elevate", line: "Fiberglass-clad wood", tier: "Signature" },
      { name: "Pella Lifestyle", line: "Wood interior", tier: "Premium" },
      { name: "ProVia Endure", line: "Vinyl", tier: "Standard" },
    ],
    Preview: DoubleHungPreview,
  },
  {
    slug: "single-hung",
    name: "Single-Hung",
    tagline: "Quieter, tighter, simpler.",
    description:
      "Identical look to a double-hung from the street, but with a fixed upper sash. Fewer moving parts means a tighter air seal and a lower price tag — a smart pick for upper floors and rooms where you only ever open the bottom anyway.",
    features: [
      "Fixed upper sash for a tighter weather seal",
      "Lower cost than double-hung at the same quality grade",
      "Same exterior profile — interchangeable in mixed elevations",
      "Ideal where a top operating sash is unreachable",
    ],
    bestFor: "Second-story bedrooms, stairwells, narrow hallways.",
    image:
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1600&q=80",
    products: [
      { name: "Andersen 100 Series", line: "Fibrex", tier: "Standard" },
      { name: "Pella 250 Series", line: "Vinyl", tier: "Standard" },
      { name: "Marvin Essential", line: "Fiberglass", tier: "Premium" },
    ],
    Preview: SingleHungPreview,
  },
  {
    slug: "casement",
    name: "Casement",
    tagline: "Tightest seal we install.",
    description:
      "Hinged at the side, cranked open with a handle. The sash pulls into the frame as it closes, compressing the weatherstrip on all four sides — the closest thing to a hermetically sealed window in residential construction. Catches a side breeze better than any other style.",
    features: [
      "Compression seal on all four sides — exceptional air tightness",
      "Catches side breezes through cross-ventilation",
      "Egress-rated sizes available for bedrooms",
      "Multi-point lock standard",
    ],
    bestFor: "Kitchens over sinks, modern facades, hard-to-reach openings.",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80",
    products: [
      { name: "Marvin Signature Ultimate", line: "Wood", tier: "Signature" },
      { name: "Andersen A-Series", line: "Fibrex/wood", tier: "Signature" },
      { name: "Pella Reserve", line: "Wood", tier: "Signature" },
      { name: "ProVia Aspect", line: "Vinyl", tier: "Standard" },
    ],
    Preview: CasementPreview,
  },
  {
    slug: "awning",
    name: "Awning",
    tagline: "Open in the rain.",
    description:
      "Hinged at the top, swings out at the bottom. The sash itself becomes a small awning that sheds rain, so the window can stay cracked for ventilation through a passing storm. We pair them with picture units to stack ventilation under a fixed view.",
    features: [
      "Sheds rain while open — ventilate during storms",
      "Pairs cleanly above or below picture windows",
      "Higher placement for privacy without sacrificing airflow",
      "Tight compression seal like a casement",
    ],
    bestFor: "Bathrooms, basements, above kitchen counters, paired stacks.",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
    products: [
      { name: "Andersen A-Series", line: "Fibrex/wood", tier: "Signature" },
      { name: "Marvin Elevate", line: "Fiberglass-clad", tier: "Premium" },
      { name: "Pella Impervia", line: "Fiberglass", tier: "Premium" },
    ],
    Preview: AwningPreview,
  },
  {
    slug: "slider",
    name: "Sliding",
    tagline: "Horizontal openings, low profile.",
    description:
      "One or both sashes glide horizontally on a track — no swing arc, no protruding crank. A clean answer for wide, short openings where a hung window would feel cramped. The ranch-house and mid-century go-to.",
    features: [
      "No exterior swing — safe near walkways and patios",
      "Wide openings without vertical mullions in the view",
      "Easy to operate with one hand",
      "Lift-out sashes for full cleaning",
    ],
    bestFor: "Egress over a patio, ranch-style homes, basement well-windows.",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80",
    products: [
      { name: "Milgard Tuscany", line: "Vinyl", tier: "Premium" },
      { name: "Andersen 100 Series", line: "Fibrex", tier: "Standard" },
      { name: "ProVia Endure", line: "Vinyl", tier: "Standard" },
    ],
    Preview: SliderPreview,
  },
  {
    slug: "picture",
    name: "Picture",
    tagline: "Maximum view, minimum frame.",
    description:
      "A fixed pane that doesn’t open, framed as thinly as the structure allows. Because nothing operates, every dollar of the budget goes into the glass — triple-pane low-E, argon fill, warm-edge spacers — for the best thermal performance per square foot of any window we install.",
    features: [
      "Highest energy performance per square foot",
      "Largest available sizes — full walls of glass",
      "Slimmest sightlines, no operating hardware",
      "Best choice for the centerpiece of a room",
    ],
    bestFor: "Living-room focal points, stairwell glazing, sunroom walls.",
    image:
      "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=1600&q=80",
    products: [
      { name: "Marvin Signature Ultimate", line: "Wood", tier: "Signature" },
      { name: "Andersen E-Series", line: "Aluminum-clad wood", tier: "Signature" },
      { name: "Pella Reserve", line: "Wood", tier: "Signature" },
    ],
    Preview: PicturePreview,
  },
  {
    slug: "bay-bow",
    name: "Bay & Bow",
    tagline: "Architecture, not just glass.",
    description:
      "A bay projects outward in three faceted panels; a bow curves through four or five. Both add interior square footage, a built-in seat, and a dramatic shift in how a room reads. We treat the head, seat, and structural support as a custom carpentry project — because that’s what they are.",
    features: [
      "Adds interior floor area and a built-in seat",
      "Three- or five-panel configurations",
      "Engineered support — head plate, knee braces, copper flashing",
      "Mix of operating casements and a fixed center unit",
    ],
    bestFor: "Dining rooms, primary bedrooms, lake- or garden-facing walls.",
    image:
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=1600&q=80",
    products: [
      { name: "Marvin Signature Ultimate", line: "Wood, custom build", tier: "Signature" },
      { name: "Andersen 400 Series", line: "Wood-clad", tier: "Premium" },
      { name: "Pella Architect Series", line: "Wood", tier: "Signature" },
    ],
    Preview: BayPreview,
  },
  {
    slug: "specialty",
    name: "Specialty Shapes",
    tagline: "Arched, round, geometric.",
    description:
      "Half-rounds, full circles, octagons, trapezoids, eyebrow arches — the windows that define a facade. We mill custom jambs and trim to match the original architecture, then partner with the manufacturer’s custom shop on the unit itself. Slow lead times; once-in-a-house results.",
    features: [
      "Custom jamb extensions and casing milled in-shop",
      "Matched to original architectural detail on historic homes",
      "Available in fixed or operating configurations",
      "Period-correct grille patterns and divided lites",
    ],
    bestFor: "Gable ends, transoms, Victorian and Tudor restorations.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
    products: [
      { name: "Marvin Signature Ultimate", line: "Custom shapes", tier: "Signature" },
      { name: "Andersen E-Series", line: "Aluminum-clad wood", tier: "Signature" },
      { name: "Kolbe Heritage", line: "Wood", tier: "Signature" },
    ],
    Preview: SpecialtyPreview,
  },
];

export function findWindowType(slug: string): WindowType | undefined {
  return windowTypes.find((w) => w.slug === slug);
}
