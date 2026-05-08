"use client";

import { motion } from "framer-motion";
import { fadeUp, inView, staggerContainer } from "../lib/animations";
import type { WindowTypeSlug } from "../lib/windowTypes";

/*
 * WindowAnatomy
 *
 * Annotated elevation that names the parts of a window for a homeowner
 * who's never had to talk about "stiles" and "muntins" before. Five
 * variants share one labeled-callout layout — the SVG geometry changes
 * per type but the typography, leader lines, and label boxes stay
 * consistent so it always reads like a single set of construction
 * drawings rather than a mood board.
 *
 * Each variant defines:
 *   - drawing: the elevation
 *   - labels:  { id, x, y, side, lines[] }   where (x,y) is the
 *              anchor point on the drawing, side picks left/right
 *              column for the label box, and lines[] is the text.
 */

type AnatomyLabel = {
  id: string;
  x: number;            // anchor on drawing
  y: number;
  side: "left" | "right";
  ly: number;           // y position of the label text on the side rail
  title: string;
  body: string;
};

type AnatomySpec = {
  /* SVG viewBox is shared across variants so the side rails always line
     up. The drawing is centered horizontally between the rails. */
  drawing: React.ReactNode;
  labels: AnatomyLabel[];
};

const VIEW_W = 720;
const VIEW_H = 520;
const LEFT_RAIL = 36;
const RIGHT_RAIL = VIEW_W - 36;

/* ── Drawing primitives ─────────────────────────────────────────── */

function Frame({ children }: { children: React.ReactNode }) {
  /* Window centered in the canvas. 280×420 inside; rails sit outside. */
  return (
    <g transform={`translate(${(VIEW_W - 280) / 2}, 50)`}>
      {/* Outer casing */}
      <rect
        x="-14"
        y="-14"
        width="308"
        height="448"
        fill="#fafaf9"
        stroke="#c9c3b8"
        strokeWidth="1"
      />
      {/* Sill shadow */}
      <rect
        x="-22"
        y="430"
        width="324"
        height="6"
        fill="#c9c3b8"
        opacity="0.8"
      />
      {/* Frame */}
      <rect
        x="0"
        y="0"
        width="280"
        height="420"
        fill="#ffffff"
        stroke="#1c2433"
        strokeWidth="1.5"
      />
      {children}
    </g>
  );
}

/* ── Variant: Hung (double-hung, single-hung, picture) ────────── */

function hungAnatomy(slug: WindowTypeSlug): AnatomySpec {
  const isPicture = slug === "picture";
  const isSingle = slug === "single-hung";

  return {
    drawing: (
      <Frame>
        {/* Top sash */}
        <rect
          x="14"
          y="14"
          width="252"
          height={isPicture ? 392 : 188}
          fill="#f1f4f9"
          stroke="#1c2433"
          strokeWidth="1"
        />
        {!isPicture && (
          <>
            {/* Bottom sash */}
            <rect
              x="14"
              y="218"
              width="252"
              height="188"
              fill="#f1f4f9"
              stroke="#1c2433"
              strokeWidth="1"
            />
            {/* Meeting rail */}
            <rect
              x="14"
              y="200"
              width="252"
              height="18"
              fill="#dde3ee"
              stroke="#1c2433"
              strokeWidth="1"
            />
            {/* Cam lock */}
            <rect
              x="130"
              y="204"
              width="20"
              height="10"
              fill="#b07f2c"
            />
            {/* Lift handle on bottom rail */}
            <rect
              x="120"
              y="392"
              width="40"
              height="6"
              fill="#b07f2c"
            />
            {!isSingle && (
              /* Top sash arrow */
              <path
                d="M 140 80 L 140 120 M 134 110 L 140 120 L 146 110"
                stroke="#7d756a"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="3 3"
              />
            )}
            {/* Bottom sash arrow */}
            <path
              d="M 140 290 L 140 250 M 134 260 L 140 250 L 146 260"
              stroke="#7d756a"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="3 3"
            />
          </>
        )}

        {/* Muntins on top sash (Colonial 6-light) */}
        <line x1="14" y1="78" x2="266" y2="78" stroke="#1c2433" strokeWidth="0.6" opacity="0.5" />
        <line x1="14" y1="142" x2="266" y2="142" stroke="#1c2433" strokeWidth="0.6" opacity="0.5" />
        <line x1="98" y1="14" x2="98" y2={isPicture ? 406 : 200} stroke="#1c2433" strokeWidth="0.6" opacity="0.5" />
        <line x1="182" y1="14" x2="182" y2={isPicture ? 406 : 200} stroke="#1c2433" strokeWidth="0.6" opacity="0.5" />
      </Frame>
    ),
    labels: isPicture
      ? [
          { id: "head", x: 360, y: 36, side: "left", ly: 70, title: "Head jamb", body: "Top horizontal frame member" },
          { id: "sill", x: 360, y: 480, side: "left", ly: 470, title: "Sill", body: "Sloped bottom — sheds water away from the wall" },
          { id: "stile", x: 224, y: 240, side: "right", ly: 120, title: "Stile", body: "Vertical sash member" },
          { id: "muntin", x: 322, y: 110, side: "right", ly: 250, title: "Muntin", body: "Bar dividing the glass into smaller lights" },
          { id: "glazing", x: 280, y: 320, side: "right", ly: 400, title: "Glazing", body: "Sealed insulating glass unit (IGU)" },
          { id: "casing", x: 200, y: 24, side: "left", ly: 200, title: "Casing", body: "Trim that covers the gap to the rough opening" },
          { id: "rail", x: 240, y: 270, side: "left", ly: 340, title: "Rail", body: "Horizontal sash member" },
        ]
      : [
          { id: "head", x: 360, y: 36, side: "left", ly: 70, title: "Head jamb", body: "Top horizontal frame member" },
          { id: "top-sash", x: 360, y: 110, side: "left", ly: 140, title: "Top sash", body: isSingle ? "Fixed in single-hung" : "Operates downward in double-hung" },
          { id: "meeting-rail", x: 360, y: 220, side: "left", ly: 215, title: "Meeting rail", body: "Where the two sashes meet — locks here" },
          { id: "cam-lock", x: 220, y: 218, side: "left", ly: 290, title: "Cam lock", body: "Pulls sashes tight against the weatherstrip" },
          { id: "bottom-sash", x: 360, y: 320, side: "left", ly: 360, title: "Bottom sash", body: "Lifts up to open" },
          { id: "lift", x: 220, y: 410, side: "left", ly: 430, title: "Lift handle", body: "Recessed pull cast into the bottom rail" },
          { id: "stile", x: 230, y: 110, side: "right", ly: 70, title: "Stile", body: "Vertical sash member" },
          { id: "muntin", x: 322, y: 110, side: "right", ly: 140, title: "Muntin", body: "Grille bar dividing the glass" },
          { id: "glazing", x: 280, y: 280, side: "right", ly: 220, title: "Glazing", body: "Insulating glass — typically Low-E argon-filled" },
          { id: "side-jamb", x: 360, y: 320, side: "right", ly: 360, title: "Side jamb", body: "Vertical frame the sash slides in" },
          { id: "sill", x: 360, y: 470, side: "right", ly: 430, title: "Sill", body: "Sloped — sheds water" },
        ],
  };
}

/* ── Variant: Crank (casement, awning) ─────────────────────────── */

function crankAnatomy(slug: WindowTypeSlug): AnatomySpec {
  const isAwning = slug === "awning";

  return {
    drawing: (
      <Frame>
        {/* Sash */}
        <rect
          x="14"
          y="14"
          width="252"
          height="392"
          fill="#f1f4f9"
          stroke="#1c2433"
          strokeWidth="1"
        />
        {/* Hinge marks */}
        {isAwning ? (
          <>
            <circle cx="34" cy="14" r="3" fill="#1c2433" />
            <circle cx="246" cy="14" r="3" fill="#1c2433" />
          </>
        ) : (
          <>
            <circle cx="266" cy="34" r="3" fill="#1c2433" />
            <circle cx="266" cy="386" r="3" fill="#1c2433" />
          </>
        )}
        {/* Operator (crank handle) at bottom-left of sash */}
        <rect x="14" y="384" width="56" height="14" fill="#dde3ee" stroke="#1c2433" strokeWidth="0.8" />
        <circle cx="42" cy="391" r="4" fill="#b07f2c" />
        {/* Multi-point lock keeper marks */}
        {!isAwning && (
          <>
            <rect x="14" y="80" width="6" height="14" fill="#b07f2c" opacity="0.7" />
            <rect x="14" y="320" width="6" height="14" fill="#b07f2c" opacity="0.7" />
          </>
        )}
        {/* Swing diagonals */}
        {isAwning ? (
          <>
            <line x1="14" y1="406" x2="140" y2="14" stroke="#7d756a" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.6" />
            <line x1="266" y1="406" x2="140" y2="14" stroke="#7d756a" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.6" />
          </>
        ) : (
          <>
            <line x1="14" y1="14" x2="266" y2="210" stroke="#7d756a" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.6" />
            <line x1="14" y1="406" x2="266" y2="210" stroke="#7d756a" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.6" />
          </>
        )}
      </Frame>
    ),
    labels: isAwning
      ? [
          { id: "hinge", x: 220, y: 60, side: "left", ly: 80, title: "Top hinges", body: "Sash pivots from the top — sheds rain while open" },
          { id: "head", x: 360, y: 36, side: "left", ly: 160, title: "Head jamb", body: "Top horizontal frame member" },
          { id: "sash", x: 360, y: 230, side: "left", ly: 250, title: "Sash", body: "The operating glazed unit" },
          { id: "operator", x: 220, y: 392, side: "left", ly: 420, title: "Crank operator", body: "Folding handle drives the scissor arm" },
          { id: "stile", x: 224, y: 200, side: "right", ly: 100, title: "Stile", body: "Vertical sash member" },
          { id: "rail", x: 240, y: 380, side: "right", ly: 200, title: "Bottom rail", body: "Horizontal sash member that swings outward" },
          { id: "weatherstrip", x: 280, y: 230, side: "right", ly: 320, title: "Weatherstrip", body: "Compresses on all four sides as the sash closes" },
          { id: "sill", x: 360, y: 480, side: "right", ly: 430, title: "Sill", body: "Sloped — sheds water" },
        ]
      : [
          { id: "hinge", x: 360, y: 36, side: "right", ly: 70, title: "Side hinges", body: "Top + bottom — sash pivots out from the right" },
          { id: "head", x: 360, y: 36, side: "left", ly: 70, title: "Head jamb", body: "Top horizontal frame member" },
          { id: "sash", x: 360, y: 200, side: "left", ly: 180, title: "Sash", body: "The operating glazed unit" },
          { id: "lock", x: 200, y: 80, side: "left", ly: 290, title: "Multi-point lock", body: "Two or three keepers pull the sash into the frame" },
          { id: "operator", x: 220, y: 392, side: "left", ly: 400, title: "Crank operator", body: "Folding handle drives the scissor arm" },
          { id: "weatherstrip", x: 280, y: 200, side: "right", ly: 200, title: "Compression weatherstrip", body: "Seals on all four sides — tightest seal we install" },
          { id: "egress", x: 280, y: 300, side: "right", ly: 320, title: "Egress clearance", body: "Bedroom code: 5.7 sq ft of clear opening" },
          { id: "sill", x: 360, y: 480, side: "right", ly: 430, title: "Sill", body: "Sloped — sheds water" },
        ],
  };
}

/* ── Variant: Slider ───────────────────────────────────────────── */

function sliderAnatomy(): AnatomySpec {
  return {
    drawing: (
      <Frame>
        {/* Two sashes side by side, top half empty for landscape feel */}
        <rect x="14" y="100" width="126" height="220" fill="#f1f4f9" stroke="#1c2433" strokeWidth="1" />
        <rect x="140" y="100" width="126" height="220" fill="#f1f4f9" stroke="#1c2433" strokeWidth="1" />
        {/* Track shadow at top and bottom */}
        <line x1="14" y1="100" x2="266" y2="100" stroke="#1c2433" strokeWidth="2.5" />
        <line x1="14" y1="320" x2="266" y2="320" stroke="#1c2433" strokeWidth="2.5" />
        {/* Direction arrows */}
        <path d="M 200 210 L 240 210 M 232 204 L 240 210 L 232 216" stroke="#7d756a" strokeWidth="1" fill="none" strokeLinecap="round" />
        {/* Latch where sashes meet */}
        <rect x="135" y="200" width="10" height="20" fill="#b07f2c" />
        {/* Trim head + sill shading above/below glass */}
        <rect x="0" y="0" width="280" height="100" fill="#f3f1ed" stroke="#1c2433" strokeWidth="1" />
        <rect x="0" y="320" width="280" height="100" fill="#f3f1ed" stroke="#1c2433" strokeWidth="1" />
      </Frame>
    ),
    labels: [
      { id: "head", x: 360, y: 36, side: "left", ly: 80, title: "Head jamb", body: "Top horizontal frame member with track" },
      { id: "fixed", x: 280, y: 210, side: "left", ly: 200, title: "Fixed sash", body: "Doesn't move — half the glass area" },
      { id: "operator", x: 360, y: 210, side: "right", ly: 200, title: "Operating sash", body: "Slides horizontally on the track" },
      { id: "track", x: 360, y: 320, side: "left", ly: 340, title: "Track", body: "Recessed bottom rail with rollers riding inside" },
      { id: "latch", x: 220, y: 210, side: "left", ly: 290, title: "Latch", body: "Where the two sashes meet at center" },
      { id: "stile", x: 224, y: 220, side: "right", ly: 110, title: "Stile", body: "Vertical sash member" },
      { id: "weep", x: 280, y: 320, side: "right", ly: 400, title: "Weep slots", body: "Drain water that gets past the sill" },
      { id: "sill", x: 360, y: 470, side: "right", ly: 460, title: "Sill", body: "Sloped, with weep slots out front" },
    ],
  };
}

/* ── Variant: Bay/Bow (plan view) ─────────────────────────────── */

function bayAnatomy(): AnatomySpec {
  return {
    drawing: (
      <g transform={`translate(${(VIEW_W - 360) / 2}, 80)`}>
        {/* House wall — horizontal line */}
        <line x1="-30" y1="20" x2="0" y2="20" stroke="#1c2433" strokeWidth="2" />
        <line x1="360" y1="20" x2="390" y2="20" stroke="#1c2433" strokeWidth="2" />
        {/* Three-panel bay in plan */}
        <path
          d="M 0 20 L 60 200 L 300 200 L 360 20"
          fill="#f1f4f9"
          stroke="#1c2433"
          strokeWidth="1.5"
        />
        {/* Glass panel lines */}
        <line x1="0" y1="20" x2="60" y2="200" stroke="#1c2433" strokeWidth="1" />
        <line x1="60" y1="200" x2="300" y2="200" stroke="#1c2433" strokeWidth="1" />
        <line x1="300" y1="200" x2="360" y2="20" stroke="#1c2433" strokeWidth="1" />
        {/* Mullions */}
        <circle cx="60" cy="200" r="4" fill="#1c2433" />
        <circle cx="300" cy="200" r="4" fill="#1c2433" />
        {/* Seat board projection */}
        <rect x="20" y="220" width="320" height="14" fill="#dde3ee" stroke="#1c2433" strokeWidth="0.8" />
        {/* Knee braces */}
        <line x1="20" y1="234" x2="-10" y2="280" stroke="#1c2433" strokeWidth="1" />
        <line x1="340" y1="234" x2="370" y2="280" stroke="#1c2433" strokeWidth="1" />
        {/* Operating arrows on side casements */}
        <path d="M 22 80 L 50 110" stroke="#7d756a" strokeWidth="0.6" strokeDasharray="3 3" />
        <path d="M 338 80 L 310 110" stroke="#7d756a" strokeWidth="0.6" strokeDasharray="3 3" />
      </g>
    ),
    labels: [
      { id: "wall", x: 360, y: 100, side: "left", ly: 80, title: "Existing wall", body: "Bay or bow projects beyond the original wall line" },
      { id: "side", x: 320, y: 200, side: "left", ly: 180, title: "Side casements", body: "Operating sashes — typically casement or double-hung" },
      { id: "center", x: 540, y: 280, side: "right", ly: 200, title: "Center fixed unit", body: "Picture window — full panoramic view" },
      { id: "head", x: 360, y: 36, side: "right", ly: 80, title: "Head plate", body: "Engineered support concealed in the soffit" },
      { id: "seat", x: 360, y: 320, side: "left", ly: 320, title: "Seat board", body: "Solid hardwood across the projection — built-in bench" },
      { id: "brace", x: 200, y: 380, side: "right", ly: 320, title: "Knee braces", body: "Concealed brackets carry the load down to the wall" },
      { id: "flashing", x: 200, y: 100, side: "right", ly: 410, title: "Copper flashing", body: "Weather-cap over the bay roof — soldered seams" },
    ],
  };
}

/* ── Variant: Specialty (arched) ───────────────────────────────── */

function specialtyAnatomy(): AnatomySpec {
  return {
    drawing: (
      <Frame>
        <path
          d="M 14 200 A 126 126 0 0 1 266 200 L 266 406 L 14 406 Z"
          fill="#f1f4f9"
          stroke="#1c2433"
          strokeWidth="1"
        />
        {/* Radial muntins from center */}
        <line x1="140" y1="200" x2="140" y2="74" stroke="#1c2433" strokeWidth="0.6" opacity="0.5" />
        <line x1="140" y1="200" x2="51" y2="111" stroke="#1c2433" strokeWidth="0.6" opacity="0.5" />
        <line x1="140" y1="200" x2="229" y2="111" stroke="#1c2433" strokeWidth="0.6" opacity="0.5" />
        <line x1="140" y1="200" x2="14" y2="200" stroke="#1c2433" strokeWidth="0.6" opacity="0.5" />
        <line x1="140" y1="200" x2="266" y2="200" stroke="#1c2433" strokeWidth="0.6" opacity="0.5" />
        {/* Lower-section vertical muntin */}
        <line x1="140" y1="200" x2="140" y2="406" stroke="#1c2433" strokeWidth="0.6" opacity="0.5" />
      </Frame>
    ),
    labels: [
      { id: "arch", x: 360, y: 80, side: "left", ly: 80, title: "Arch top", body: "Half-round — milled from solid wood or laminated" },
      { id: "spring-line", x: 360, y: 240, side: "left", ly: 220, title: "Spring line", body: "Where the arch meets the vertical sides" },
      { id: "radial", x: 200, y: 130, side: "left", ly: 380, title: "Radial muntins", body: "Custom-cut to converge at the arch center" },
      { id: "extension", x: 360, y: 200, side: "right", ly: 80, title: "Custom jamb extension", body: "Milled in our shop to match historic profiles" },
      { id: "casing", x: 360, y: 100, side: "right", ly: 200, title: "Custom casing", body: "Period-correct molding to match the architecture" },
      { id: "lower", x: 360, y: 380, side: "right", ly: 320, title: "Lower section", body: "Fixed or operating, with full-divided lite options" },
      { id: "sill", x: 360, y: 480, side: "right", ly: 430, title: "Sill", body: "Sloped — sheds water" },
    ],
  };
}

/* ── Dispatcher ─────────────────────────────────────────────────── */

function specForSlug(slug: WindowTypeSlug): AnatomySpec {
  switch (slug) {
    case "double-hung":
    case "single-hung":
    case "picture":
      return hungAnatomy(slug);
    case "casement":
    case "awning":
      return crankAnatomy(slug);
    case "slider":
      return sliderAnatomy();
    case "bay-bow":
      return bayAnatomy();
    case "specialty":
      return specialtyAnatomy();
  }
}

/* ── Component ──────────────────────────────────────────────────── */

export function WindowAnatomy({ slug }: { slug: WindowTypeSlug }) {
  const { drawing, labels } = specForSlug(slug);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className="relative"
    >
      <motion.div variants={fadeUp} className="mb-8 max-w-2xl">
        <span className="text-xs font-medium tracking-[0.22em] text-accent-600 uppercase">
          Window Anatomy
        </span>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Know what you&apos;re asking for.
        </h2>
        <p className="mt-4 font-serif text-base leading-relaxed text-stone-700">
          A labeled cross-section of every part we install. When we talk
          about jambs, stiles, and meeting rails on the phone, this is
          the picture you can point at.
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="overflow-hidden rounded-sm border border-stone-200 bg-white p-4 shadow-sm sm:p-8"
      >
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="h-auto w-full"
          aria-label="Annotated window diagram"
        >
          {/* Soft graph-paper backdrop for the architectural feel. */}
          <defs>
            <pattern
              id="anatomy-grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="#e6e2dc"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width={VIEW_W} height={VIEW_H} fill="url(#anatomy-grid)" />

          {drawing}

          {/* Leader lines + label dots */}
          {labels.map((label) => {
            const railX = label.side === "left" ? LEFT_RAIL : RIGHT_RAIL;
            const textAnchor = label.side === "left" ? "start" : "end";
            const dx = label.side === "left" ? 8 : -8;
            return (
              <g key={label.id}>
                <line
                  x1={label.x}
                  y1={label.y}
                  x2={railX}
                  y2={label.ly}
                  stroke="#7d756a"
                  strokeWidth="0.6"
                />
                <circle cx={label.x} cy={label.y} r="3" fill="#b07f2c" />
                <text
                  x={railX + dx}
                  y={label.ly - 2}
                  textAnchor={textAnchor}
                  fontFamily="var(--font-inter)"
                  fontSize="11"
                  fontWeight="600"
                  fill="#1c2433"
                  className="uppercase tracking-wider"
                >
                  {label.title}
                </text>
                <text
                  x={railX + dx}
                  y={label.ly + 12}
                  textAnchor={textAnchor}
                  fontFamily="var(--font-source-serif)"
                  fontSize="10.5"
                  fill="#4a443c"
                >
                  {label.body}
                </text>
              </g>
            );
          })}
        </svg>
      </motion.div>
    </motion.div>
  );
}
