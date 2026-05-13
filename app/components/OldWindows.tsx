"use client";

import { motion } from "framer-motion";
import {
  Snowflake,
  Volume2,
  Droplets,
  ShieldAlert,
  Flame,
  Hammer,
  type LucideIcon,
} from "lucide-react";
import { fadeUp, inView, staggerContainer } from "../lib/animations";

/*
 * Why-replace section. Each card pairs the lived pain of an aging
 * window with the concrete improvement a modern replacement brings —
 * never abstract "energy savings" talk, always the thing a homeowner
 * actually notices on a January morning.
 */

type PainPoint = {
  icon: LucideIcon;
  pain: string;
  painDetail: string;
  fix: string;
  fixDetail: string;
};

const points: PainPoint[] = [
  {
    icon: Snowflake,
    pain: "Cold drafts you can feel from the couch",
    painDetail:
      "Failed weatherstripping and shrunken sash sealant let outside air in even when the window is latched. You burn fuel to heat air that's already leaving.",
    fix: "Tight, calibrated seals",
    fixDetail:
      "Modern weatherstripping, warm-edge spacers, and argon fill cut perceptible drafts to near zero. Most clients drop heating bills 25–40% after a whole-house replacement.",
  },
  {
    icon: Volume2,
    pain: "Street noise that wakes you up",
    painDetail:
      "Single-pane and tired double-pane units transmit traffic, mowers, and conversations straight into bedrooms.",
    fix: "Laminated, dual-pane acoustic glass",
    fixDetail:
      "A laminated interlayer plus an air gap can drop perceived outside noise by 50% or more. Light sleepers notice immediately.",
  },
  {
    icon: Droplets,
    pain: "Condensation and rotting sills",
    painDetail:
      "When inside glass runs cold, moisture beads on the pane, drips into the sill, and feeds rot in the frame and trim behind it.",
    fix: "Warm interior glass surface",
    fixDetail:
      "Low-E coatings and insulated frames keep interior glass within a few degrees of room temperature — no condensation, no rot, no peeling paint.",
  },
  {
    icon: Flame,
    pain: "Fabric and floors fading in the sun",
    painDetail:
      "Plain glass passes nearly all UV. Rugs bleach, sofas wash out, hardwood loses its color where the sun hits.",
    fix: "Low-E + UV-blocking coatings",
    fixDetail:
      "Modern coated glass blocks 75–95% of UV without tinting the view. The room still feels bright; the floors stop sun-bleaching.",
  },
  {
    icon: ShieldAlert,
    pain: "Sashes that stick or won't lock",
    painDetail:
      "Painted-shut sashes, broken balances, and warped frames mean some windows haven't actually opened in years — a real fire-egress and security problem.",
    fix: "Smooth operation, secure latches",
    fixDetail:
      "Every sash tilts in for cleaning, opens with one hand, and locks with positive engagement. Egress restored where it matters most.",
  },
  {
    icon: Hammer,
    pain: "Constant patch-and-paint maintenance",
    painDetail:
      "Wood sashes need scraping, glazing, and painting every few years. Aluminum storms corrode. The repair bill never really ends.",
    fix: "Decades of zero maintenance",
    fixDetail:
      "Modern clad frames and engineered finishes don't need painting. Wipe the glass twice a year and forget about them.",
  },
];

export function OldWindows() {
  return (
    <section className="bg-white py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span
            variants={fadeUp}
            className="text-xs font-medium tracking-[0.22em] text-accent-600 uppercase"
          >
            Why replace
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-display text-4xl leading-tight font-semibold tracking-tight text-slate-900 sm:text-5xl"
          >
            What old windows cost you — every day you keep them.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 font-serif text-lg leading-relaxed text-stone-700"
          >
            A tired window doesn&apos;t fail dramatically. It quietly bleeds
            heat, lets noise in, and asks for a little more paint every
            spring. Here&apos;s what stops the day a new one goes in.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-20 grid gap-8 md:grid-cols-2 lg:gap-10"
        >
          {points.map((point) => (
            <PainCard key={point.pain} point={point} />
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-16 flex flex-col items-center text-center"
        >
          <p className="font-serif text-base text-stone-600">
            A typical drafty 1960s home loses{" "}
            <span className="font-semibold text-slate-900">
              25–30% of its heating energy
            </span>{" "}
            through its windows alone.
          </p>
          <a
            href="/#quote"
            className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-stone-50 transition-colors duration-300 hover:bg-slate-700"
          >
            See what yours could save
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function PainCard({ point }: { point: PainPoint }) {
  const Icon = point.icon;
  return (
    <motion.article
      variants={fadeUp}
      className="group relative grid overflow-hidden rounded-sm border border-stone-200 bg-stone-50 transition-shadow duration-500 hover:shadow-[0_24px_60px_-30px_rgba(20,17,13,0.25)]"
    >
      {/* PAIN side */}
      <div className="relative px-7 py-7 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-stone-200/70 text-stone-500 transition-colors duration-500 group-hover:bg-stone-300/70">
            <Icon className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <span className="text-[11px] font-medium tracking-[0.22em] text-stone-400 uppercase">
            With old windows
          </span>
        </div>
        <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-stone-700 line-through decoration-stone-300 decoration-1 underline-offset-4">
          {point.pain}
        </h3>
        <p className="mt-3 font-serif text-sm leading-relaxed text-stone-500">
          {point.painDetail}
        </p>
      </div>

      {/* Dividing rule */}
      <div className="relative mx-7 border-t border-dashed border-stone-300 sm:mx-8" />

      {/* FIX side */}
      <div className="relative px-7 py-7 sm:px-8 bg-slate-950 ">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-accent-500/10 text-accent-600 ring-1 ring-accent-300/40 transition-all duration-500 group-hover:bg-accent-500/20">
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <span className="text-[11px] font-medium tracking-[0.22em] text-accent-600 uppercase">
            After we install
          </span>
        </div>
        <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-slate-900">
          {point.fix}
        </h3>
        <p className="mt-3 font-serif text-sm leading-relaxed text-stone-700">
          {point.fixDetail}
        </p>
      </div>

      {/* Subtle bottom accent that grows on hover */}
      <motion.span
        aria-hidden
        initial={false}
        className="absolute bottom-0 left-0 h-[3px] w-0 bg-accent-500 transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
      />
    </motion.article>
  );
}
