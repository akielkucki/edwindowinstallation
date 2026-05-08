"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronRight, X } from "lucide-react";
import {
  EASE_OUT,
  fadeUp,
  inView,
  staggerContainer,
} from "../lib/animations";
import { windowTypes, type WindowType } from "../lib/windowTypes";

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

/* A static hand-drawn arrow with a sketchy, slightly-jittered ink line.
 * The roughness comes from an SVG turbulence/displacement filter rather
 * than a perfectly smooth bezier — gives it that "annotated by a person"
 * feel without animating anything. */
function HandDrawnArrow() {
  return (
    <svg
      viewBox="0 0 220 170"
      fill="none"
      stroke="currentColor"
      aria-hidden
      className="pointer-events-none absolute left-0 -top-36 h-36 w-44 text-stone-600/85 sm:left-2 sm:-top-40 sm:h-40 sm:w-56"
    >
      <defs>
        <filter id="hand-drawn-roughen" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.022"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.4" />
        </filter>
      </defs>

      {/* Whole arrow mirrored across the y-axis so the tail sits in the
          upper-right and the tip lands in the lower-left, pointing at
          the button below. */}
      <g transform="translate(220, 0) scale(-1, 1)">
        <g
          filter="url(#hand-drawn-roughen)"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Curving shaft — drawn as two slightly-offset passes so it
              reads as a real pen stroke rather than a CAD line. */}
          <path
            d="M 40 22 C 95 14, 175 38, 178 96 C 180 134, 152 156, 122 162"
            strokeWidth="2"
          />
          <path
            d="M 42 26 C 96 18, 171 42, 174 96 C 176 130, 150 152, 124 158"
            strokeWidth="1.1"
            opacity="0.55"
          />

          {/* Arrowhead as a single polyline so the apex stays a sharp
              point after the turbulence filter (both wings share one
              displaced vertex). */}
          <path
            d="M 110 146 L 122 162 L 138 152"
            strokeWidth="2"
            fill="none"
          />
        </g>
      </g>

      {/* Hand-lettered note — drawn upright on the upper-right, near the
          arrow's tail. Slight clockwise tilt for handwritten feel. */}
      <g transform="rotate(7 188 18)">
        <text
          x="148"
          y="20"
          fontFamily="ui-serif, Georgia, 'Times New Roman', serif"
          fontStyle="italic"
          fontSize="17"
          fontWeight="500"
          fill="currentColor"
        >
          try it!
        </text>
        <path
          d="M 148 26 C 164 23, 184 25, 200 24"
          stroke="currentColor"
          strokeWidth="1.1"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
          filter="url(#hand-drawn-roughen)"
        />
      </g>
    </svg>
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
        <div className="mt-20 relative ml-10">
          <HandDrawnArrow />
          <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
          >
            <Link
                href={`/design/${active.slug}`}
                onClick={onClose}
                className="block w-full text-center bg-gradient-to-r bg-cover from-amber-400 to-orange-600 p-5 rounded-2xl text-white font-black text-lg uppercase tracking-wider shadow-xl shadow-orange-500/40 border border-amber-300/40 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/60"
            >
              Click to design your window
            </Link>
          </motion.div>
        </div>

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
