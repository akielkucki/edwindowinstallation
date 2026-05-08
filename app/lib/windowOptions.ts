import type { WindowTypeSlug } from "./windowTypes";

/*
 * Configuration that drives the WindowDesigner panel.
 *
 * Every spec the customer can pick from lives here. Keeping it as
 * data — instead of hand-coded JSX per type — means we can render
 * one designer component for every window type, and adding a new
 * option later is one edit instead of nine.
 *
 * `appliesTo` lets a single section/option restrict itself to a
 * subset of types. Omit it to apply to every type.
 */

export type Choice = {
  value: string;
  label: string;
  hint?: string;
};

export type Option =
  | {
      kind: "select";
      id: string;
      label: string;
      hint?: string;
      choices: Choice[];
      defaultValue: string;
      appliesTo?: WindowTypeSlug[];
    }
  | {
      kind: "number";
      id: string;
      label: string;
      hint?: string;
      min: number;
      max: number;
      step?: number;
      unit?: string;
      defaultValue: number;
      appliesTo?: WindowTypeSlug[];
    }
  | {
      kind: "text";
      id: string;
      label: string;
      hint?: string;
      placeholder?: string;
      defaultValue: string;
      appliesTo?: WindowTypeSlug[];
    }
  | {
      kind: "toggle";
      id: string;
      label: string;
      hint?: string;
      defaultValue: boolean;
      appliesTo?: WindowTypeSlug[];
    };

export type Section = {
  id: string;
  title: string;
  blurb?: string;
  options: Option[];
};

/* ── Choices reused across sections ────────────────────────────────── */

const FRAME_MATERIALS: Choice[] = [
  { value: "vinyl", label: "Vinyl", hint: "Lowest cost, never paints" },
  { value: "fiberglass", label: "Fiberglass", hint: "Stable, paintable" },
  { value: "wood-clad", label: "Wood-clad", hint: "Real wood interior, low-maintenance exterior" },
  { value: "all-wood", label: "Solid Wood", hint: "Premium, period-correct" },
];

const INTERIOR_FINISHES: Choice[] = [
  { value: "white", label: "White (painted)" },
  { value: "almond", label: "Almond" },
  { value: "primed", label: "Primed for site paint" },
  { value: "natural-pine", label: "Natural pine" },
  { value: "natural-oak", label: "Natural oak" },
  { value: "stained-walnut", label: "Stained walnut" },
];

const EXTERIOR_COLORS: Choice[] = [
  { value: "white", label: "White" },
  { value: "almond", label: "Almond" },
  { value: "sandstone", label: "Sandstone" },
  { value: "clay", label: "Clay" },
  { value: "bronze", label: "Bronze" },
  { value: "black", label: "Black" },
  { value: "custom", label: "Custom color match" },
];

const GLASS_PACKAGES: Choice[] = [
  {
    value: "double-low-e",
    label: "Double-pane Low-E",
    hint: "Standard. Argon fill, warm-edge spacer.",
  },
  {
    value: "triple-low-e",
    label: "Triple-pane Low-E",
    hint: "+15% efficiency, recommended in cold climates.",
  },
  {
    value: "impact",
    label: "Impact / Hurricane",
    hint: "Laminated inner pane.",
  },
  {
    value: "tempered",
    label: "Tempered safety",
    hint: "Code-required near doors, tubs, stairs.",
  },
  {
    value: "obscure",
    label: "Obscure / privacy",
    hint: "Frosted, rain, or reed pattern.",
  },
];

const GRILLE_PATTERNS: Choice[] = [
  { value: "none", label: "No grilles" },
  { value: "colonial-6", label: "Colonial 6-over-6" },
  { value: "colonial-9", label: "Colonial 9-over-9" },
  { value: "prairie", label: "Prairie" },
  { value: "craftsman", label: "Craftsman top-only" },
  { value: "custom", label: "Custom layout" },
];

const GRILLE_TYPES: Choice[] = [
  {
    value: "between-glass",
    label: "Between glass",
    hint: "Easiest to clean, slimmest profile.",
  },
  {
    value: "sdl",
    label: "Simulated divided lite",
    hint: "Bars on both sides — period-correct look.",
  },
  {
    value: "tdl",
    label: "True divided lite",
    hint: "Each pane is real glass. Premium tier.",
  },
];

const HARDWARE_FINISHES: Choice[] = [
  { value: "matte-black", label: "Matte black" },
  { value: "oil-rubbed-bronze", label: "Oil-rubbed bronze" },
  { value: "antique-brass", label: "Antique brass" },
  { value: "brushed-nickel", label: "Brushed nickel" },
  { value: "polished-chrome", label: "Polished chrome" },
  { value: "white", label: "White" },
];

const SCREEN_TYPES: Choice[] = [
  { value: "full", label: "Full screen" },
  { value: "half", label: "Half screen" },
  { value: "none", label: "No screen" },
];

const ENERGY_ZONES: Choice[] = [
  { value: "northern", label: "Northern (cold)" },
  { value: "north-central", label: "North-Central" },
  { value: "south-central", label: "South-Central" },
  { value: "southern", label: "Southern (hot)" },
];

const ROOMS: Choice[] = [
  { value: "kitchen", label: "Kitchen" },
  { value: "primary-bedroom", label: "Primary bedroom" },
  { value: "bedroom", label: "Bedroom" },
  { value: "bathroom", label: "Bathroom" },
  { value: "living-room", label: "Living room" },
  { value: "dining-room", label: "Dining room" },
  { value: "family-room", label: "Family room" },
  { value: "office", label: "Office / study" },
  { value: "stairwell", label: "Stairwell" },
  { value: "basement", label: "Basement" },
  { value: "other", label: "Other" },
];

/* ── Section schema ────────────────────────────────────────────────── */

export const designerSections: Section[] = [
  {
    id: "placement",
    title: "Placement & Size",
    blurb:
      "Where this window lives and the rough opening dimensions. We'll confirm with field measurements before ordering.",
    options: [
      {
        kind: "select",
        id: "room",
        label: "Room",
        choices: ROOMS,
        defaultValue: "living-room",
      },
      {
        kind: "text",
        id: "label",
        label: "Label (optional)",
        placeholder: "e.g. Front-left, Bay #1",
        defaultValue: "",
      },
      {
        kind: "number",
        id: "width",
        label: "Width",
        unit: "in",
        min: 12,
        max: 144,
        step: 0.25,
        defaultValue: 36,
      },
      {
        kind: "number",
        id: "height",
        label: "Height",
        unit: "in",
        min: 12,
        max: 144,
        step: 0.25,
        defaultValue: 60,
      },
      {
        kind: "number",
        id: "quantity",
        label: "Quantity",
        min: 1,
        max: 50,
        step: 1,
        defaultValue: 1,
      },
    ],
  },
  {
    id: "frame",
    title: "Frame & Finish",
    blurb: "The structural material and the colors you'll see inside and out.",
    options: [
      {
        kind: "select",
        id: "frameMaterial",
        label: "Frame material",
        choices: FRAME_MATERIALS,
        defaultValue: "wood-clad",
      },
      {
        kind: "select",
        id: "interiorFinish",
        label: "Interior finish",
        choices: INTERIOR_FINISHES,
        defaultValue: "white",
      },
      {
        kind: "select",
        id: "exteriorColor",
        label: "Exterior color",
        choices: EXTERIOR_COLORS,
        defaultValue: "black",
      },
    ],
  },
  {
    id: "glass",
    title: "Glass Package",
    blurb:
      "Glass drives more of your energy bill than the frame does. Picking the right package per room matters.",
    options: [
      {
        kind: "select",
        id: "glassPackage",
        label: "Glass type",
        choices: GLASS_PACKAGES,
        defaultValue: "double-low-e",
      },
      {
        kind: "select",
        id: "energyZone",
        label: "Energy-rating zone",
        hint: "We'll match the right Low-E coating to your climate.",
        choices: ENERGY_ZONES,
        defaultValue: "north-central",
      },
      {
        kind: "toggle",
        id: "tempered",
        label: "Tempered safety glass",
        hint: "Required by code near doors, tubs, and stair landings.",
        defaultValue: false,
      },
    ],
  },
  {
    id: "grilles",
    title: "Grilles",
    blurb:
      "Grilles divide the glass into smaller panes — purely aesthetic on modern construction.",
    options: [
      {
        kind: "select",
        id: "grillePattern",
        label: "Pattern",
        choices: GRILLE_PATTERNS,
        defaultValue: "none",
      },
      {
        kind: "select",
        id: "grilleType",
        label: "Grille construction",
        hint: "Skip if you chose 'No grilles' above.",
        choices: GRILLE_TYPES,
        defaultValue: "between-glass",
      },
    ],
  },
  {
    id: "hardware",
    title: "Hardware & Screens",
    options: [
      {
        kind: "select",
        id: "hardwareFinish",
        label: "Hardware finish",
        choices: HARDWARE_FINISHES,
        defaultValue: "oil-rubbed-bronze",
      },
      {
        kind: "select",
        id: "screen",
        label: "Insect screen",
        choices: SCREEN_TYPES,
        defaultValue: "full",
        appliesTo: [
          "double-hung",
          "single-hung",
          "casement",
          "awning",
          "slider",
          "bay-bow",
        ],
      },
    ],
  },
  {
    id: "operation",
    title: "Operation",
    blurb: "Type-specific decisions about how the window opens.",
    options: [
      {
        kind: "select",
        id: "hingeSide",
        label: "Hinge side (viewed from outside)",
        choices: [
          { value: "left", label: "Left" },
          { value: "right", label: "Right" },
        ],
        defaultValue: "right",
        appliesTo: ["casement"],
      },
      {
        kind: "toggle",
        id: "egress",
        label: "Egress-rated opening",
        hint: "Code requires this for bedroom emergency exits.",
        defaultValue: false,
        appliesTo: ["casement", "slider"],
      },
      {
        kind: "select",
        id: "operatingSide",
        label: "Operating side",
        choices: [
          { value: "left", label: "Left slides" },
          { value: "right", label: "Right slides" },
          { value: "both", label: "Both slide (XOX)" },
        ],
        defaultValue: "right",
        appliesTo: ["slider"],
      },
      {
        kind: "select",
        id: "panels",
        label: "Number of panels",
        choices: [
          { value: "3", label: "3 panels (bay)" },
          { value: "4", label: "4 panels (bow)" },
          { value: "5", label: "5 panels (bow)" },
        ],
        defaultValue: "3",
        appliesTo: ["bay-bow"],
      },
      {
        kind: "toggle",
        id: "seatBoard",
        label: "Built-in seat board",
        hint: "We can add an oak or walnut seat across the projection.",
        defaultValue: true,
        appliesTo: ["bay-bow"],
      },
      {
        kind: "select",
        id: "shape",
        label: "Shape",
        choices: [
          { value: "half-round", label: "Half-round" },
          { value: "full-round", label: "Full circle" },
          { value: "octagon", label: "Octagon" },
          { value: "trapezoid", label: "Trapezoid" },
          { value: "eyebrow", label: "Eyebrow arch" },
          { value: "gothic", label: "Gothic / pointed" },
        ],
        defaultValue: "half-round",
        appliesTo: ["specialty"],
      },
    ],
  },
  {
    id: "notes",
    title: "Anything else?",
    options: [
      {
        kind: "text",
        id: "notes",
        label: "Notes for Ed",
        placeholder:
          "Historic match, tight access, lead-paint disclosure, anything we should know.",
        defaultValue: "",
      },
    ],
  },
];

/* ── Helpers ───────────────────────────────────────────────────────── */

export function sectionsForType(slug: WindowTypeSlug): Section[] {
  return designerSections
    .map((section) => ({
      ...section,
      options: section.options.filter(
        (opt) => !opt.appliesTo || opt.appliesTo.includes(slug),
      ),
    }))
    .filter((section) => section.options.length > 0);
}

export type SpecValues = Record<string, string | number | boolean>;

export function defaultSpecForType(slug: WindowTypeSlug): SpecValues {
  const out: SpecValues = {};
  for (const section of sectionsForType(slug)) {
    for (const opt of section.options) {
      out[opt.id] = opt.defaultValue;
    }
  }
  return out;
}

/* Look up a human-readable label for a stored value. */
export function labelFor(optionId: string, value: unknown): string {
  for (const section of designerSections) {
    for (const opt of section.options) {
      if (opt.id !== optionId) continue;
      if (opt.kind === "select") {
        const match = opt.choices.find((c) => c.value === value);
        if (match) return match.label;
      }
    }
  }
  return String(value);
}

export function findOption(optionId: string): Option | undefined {
  for (const section of designerSections) {
    const match = section.options.find((o) => o.id === optionId);
    if (match) return match;
  }
  return undefined;
}
