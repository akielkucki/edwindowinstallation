"use client";

import { useEffect, useState, type FC, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, ChevronRight, X } from "lucide-react";
import {
  EASE_OUT,
  fadeUp,
  inView,
  staggerContainer,
} from "../lib/animations";

/*
 * WindowPreviews
 *
 * Visual catalog of window operating types. Each card shows a hand-drawn
 * SVG elevation of the window — sashes, hinge points, swing direction —
 * so a homeowner can recognize the shape at a glance. Clicking a card
 * opens a right-side drawer with a photograph, full description, and a
 * "Browse all products" grid of available product lines for that type.
 *
 * The drawer is a custom build (no shadcn/magic-ui dependency) so it
 * inherits the same motion grammar and palette as the rest of the page.
 */

type Product = {
  name: string;
  line: string;
  tier: "Standard" | "Premium" | "Signature";
};

type WindowType = {
  slug: string;
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
      {/* Outer casing */}
      <rect
        x="6"
        y="6"
        width="88"
        height="118"
        strokeWidth="1.25"
        className="opacity-70"
      />
      {/* Inner sill shadow */}
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

function DoubleHungPreview({ className }: { className?: string }) {
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

function SingleHungPreview({ className }: { className?: string }) {
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

function CasementPreview({ className }: { className?: string }) {
  return (
    <div className={className}>
      <FrameBase>
        <rect x="12" y="12" width="76" height="106" strokeWidth="1" />
        {/* Hinge marks on right */}
        <circle cx="88" cy="22" r="1.4" fill={SVG_STROKE} stroke="none" />
        <circle cx="88" cy="108" r="1.4" fill={SVG_STROKE} stroke="none" />
        {/* Swing diagonal */}
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
        {/* Crank handle */}
        <circle cx="20" cy="65" r="2" strokeWidth="0.9" />
      </FrameBase>
    </div>
  );
}

function AwningPreview({ className }: { className?: string }) {
  return (
    <div className={className}>
      <FrameBase>
        <rect x="12" y="40" width="76" height="50" strokeWidth="1" />
        {/* Hinge marks on top */}
        <circle cx="22" cy="40" r="1.4" fill={SVG_STROKE} stroke="none" />
        <circle cx="78" cy="40" r="1.4" fill={SVG_STROKE} stroke="none" />
        {/* Swing diagonals */}
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

function SliderPreview({ className }: { className?: string }) {
  return (
    <div className={className}>
      <FrameBase>
        <rect x="12" y="32" width="76" height="66" strokeWidth="1" />
        <line x1="50" y1="32" x2="50" y2="98" strokeWidth="1" />
        <path
          d="M28 65 L18 65 M22 61 L18 65 L22 69"
          strokeWidth="0.9"
        />
        <path
          d="M72 65 L82 65 M78 61 L82 65 L78 69"
          strokeWidth="0.9"
        />
        <line x1="12" y1="98" x2="88" y2="98" strokeWidth="1.6" />
      </FrameBase>
    </div>
  );
}

function PicturePreview({ className }: { className?: string }) {
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

function BayPreview({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 100 130"
        fill="none"
        stroke={SVG_STROKE}
        className="h-full w-full"
        aria-hidden
      >
        {/* Plan view of a bay: three panels at angles */}
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

function SpecialtyPreview({ className }: { className?: string }) {
  return (
    <div className={className}>
      <FrameBase>
        <path
          d="M12 65 A38 38 0 0 1 88 65 L88 118 L12 118 Z"
          strokeWidth="1"
        />
        <line x1="50" y1="27" x2="50" y2="118" strokeWidth="0.5" className="opacity-30" />
        <line x1="12" y1="65" x2="88" y2="65" strokeWidth="0.5" className="opacity-30" />
      </FrameBase>
    </div>
  );
}

/* ── Catalog ───────────────────────────────────────────────────────── */

const windowTypes: WindowType[] = [
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

/* ── Main component ────────────────────────────────────────────────── */

export function WindowPreviews() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const active = windowTypes.find((w) => w.slug === activeSlug) ?? null;

  return (
    <section id="window-types" className="bg-stone-50 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end"
        >
          <div className="max-w-2xl">
            <motion.span
              variants={fadeUp}
              className="text-xs font-medium tracking-[0.22em] text-accent-600 uppercase"
            >
              Window Types
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-display text-4xl leading-tight font-semibold tracking-tight text-slate-900 sm:text-5xl"
            >
              Know what you&apos;re looking at before you ask for a quote.
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="max-w-md font-serif text-base leading-relaxed text-stone-700"
          >
            Every operating type we install, drawn the way an architect would
            draw it. Tap any window to see how it works, where it belongs, and
            which product lines we trust to build it.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-16 grid gap-px overflow-hidden rounded-sm bg-stone-200 sm:grid-cols-2 lg:grid-cols-4"
        >
          {windowTypes.map((w) => (
            <PreviewCard
              key={w.slug}
              window={w}
              onOpen={() => setActiveSlug(w.slug)}
            />
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 font-serif text-sm text-stone-500"
        >
          Don&apos;t see a shape you have in mind? We&apos;ve installed enough
          one-off geometry over thirty years that the answer is almost always
          yes — send us a photo.
        </motion.p>
      </div>

      <WindowDrawer active={active} onClose={() => setActiveSlug(null)} />
    </section>
  );
}

/* ── Preview card ──────────────────────────────────────────────────── */

function PreviewCard({
  window: w,
  onOpen,
}: {
  window: WindowType;
  onOpen: () => void;
}) {
  const Preview = w.Preview;
  return (
    <motion.button
      variants={fadeUp}
      onClick={onOpen}
      className="group relative flex flex-col bg-stone-50 p-8 text-left transition-colors duration-500 hover:bg-white focus:bg-white focus:outline-none"
      aria-label={`Learn more about ${w.name} windows`}
    >
      <div className="relative mx-auto flex aspect-[4/5] w-full max-w-[180px] items-center justify-center text-slate-700 transition-transform duration-700 group-hover:-translate-y-1">
        <div className="absolute inset-x-2 bottom-0 h-1.5 rounded-sm bg-stone-200/70" />
        <Preview className="h-full w-full" />
      </div>

      <div className="mt-8 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-lg font-semibold tracking-tight text-slate-900">
          {w.name}
        </h3>
        <ArrowUpRight
          className="h-4 w-4 text-stone-400 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-500"
          strokeWidth={1.5}
        />
      </div>
      <p className="mt-1 font-serif text-sm leading-relaxed text-stone-600">
        {w.tagline}
      </p>
      <p className="mt-1 font-serif text-sm leading-relaxed text-black opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="before:content-['Tap'] md:before:content-['Click']"/>&nbsp;to view more details
      </p>
    </motion.button>
  );
}

/* ── Drawer ────────────────────────────────────────────────────────── */

function WindowDrawer({
  active,
  onClose,
}: {
  active: WindowType | null;
  onClose: () => void;
}) {
  /* Body scroll lock + ESC to close. */
  useEffect(() => {
    if (!active) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, onClose]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="window-drawer"
          className="fixed inset-0 z-50"
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="absolute inset-0 cursor-default bg-slate-950/55 backdrop-blur-sm"
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          />

          {/* Panel */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="window-drawer-title"
            className="absolute inset-y-0 right-0 flex w-full max-w-[640px] flex-col bg-stone-50 shadow-2xl"
            variants={{
              hidden: { x: "100%" },
              show: { x: 0 },
            }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
          >
            <DrawerContent active={active} onClose={onClose} />
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DrawerContent({
  active,
  onClose,
}: {
  active: WindowType;
  onClose: () => void;
}) {
  const Preview = active.Preview;
  return (
    <div className="flex h-full flex-col overflow-y-auto">
      {/* Header bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-200 bg-stone-50/90 px-6 py-4 backdrop-blur sm:px-10">
        <span className="text-xs font-medium tracking-[0.22em] text-accent-600 uppercase">
          {active.name}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-9 w-9 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-200 hover:text-slate-900"
        >
          <X className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 px-6 pb-12 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.15 }}
          className="pt-8"
        >
          <h2
            id="window-drawer-title"
            className="font-display text-3xl leading-tight font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            {active.tagline}
          </h2>
          <p className="mt-5 font-serif text-base leading-relaxed text-stone-700">
            {active.description}
          </p>
        </motion.div>

        {/* Preview image + elevation diagram */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.25 }}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto]"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-stone-200 sm:aspect-[3/2]">
            <Image
              src={active.image}
              alt={`${active.name} window installation`}
              fill
              sizes="(min-width: 640px) 480px, 100vw"
              className="object-cover"
            />
            <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-stone-50/95 px-3 py-1 text-xs font-medium tracking-tight text-slate-900 shadow-sm backdrop-blur">
              In place
            </span>
          </div>
          <div className="flex h-full items-center justify-center rounded-sm border border-stone-200 bg-white p-6 sm:w-32">
            <Preview className="h-32 w-full text-slate-700 sm:h-40" />
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.35 }}
          className="mt-12"
        >
          <h3 className="font-display text-sm font-semibold tracking-[0.18em] text-stone-500 uppercase">
            What you get
          </h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {active.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-3 font-serif text-sm leading-relaxed text-stone-700"
              >
                <span className="mt-2 inline-block h-1 w-3 shrink-0 bg-accent-500" />
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-stone-200 pt-5 font-serif text-sm text-stone-600">
            <span className="font-medium text-slate-900">Best for: </span>
            {active.bestFor}
          </p>
        </motion.div>

        {/* Browse all products */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.45 }}
          className="mt-14 border-t border-stone-200 pt-10"
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="text-xs font-medium tracking-[0.22em] text-accent-600 uppercase">
                Browse all products
              </span>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-slate-900">
                {active.name} lines we install
              </h3>
            </div>
            <a
              href="#quote"
              className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-slate-900 transition-colors hover:text-accent-600 sm:inline-flex"
            >
              Compare
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <ul className="mt-6 grid gap-px overflow-hidden rounded-sm bg-stone-200 sm:grid-cols-2">
            {active.products.map((p) => (
              <li key={p.name}>
                <a
                  href="#quote"
                  className="group flex h-full items-start justify-between gap-4 bg-stone-50 p-5 transition-colors duration-300 hover:bg-white"
                >
                  <div>
                    <p className="font-display text-base font-semibold tracking-tight text-slate-900">
                      {p.name}
                    </p>
                    <p className="mt-1 font-serif text-sm text-stone-600">
                      {p.line}
                    </p>
                    <span className="mt-3 inline-flex items-center rounded-full border border-stone-300 px-2 py-0.5 text-[10px] font-medium tracking-[0.15em] text-stone-600 uppercase">
                      {p.tier}
                    </span>
                  </div>
                  <ChevronRight
                    className="mt-1 h-4 w-4 shrink-0 text-stone-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent-500"
                    strokeWidth={1.5}
                  />
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#quote"
            onClick={onClose}
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-slate-900 px-5 py-3 text-sm font-semibold text-stone-50 transition-colors duration-300 hover:bg-accent-600"
          >
            Get a quote on {active.name.toLowerCase()} windows
            <ChevronRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
