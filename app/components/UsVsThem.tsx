"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { fadeUp, inView, staggerContainer } from "../lib/animations";

/*
 * Side-by-side comparison: how we work vs the high-volume "window
 * salesman" outfits. Every row is a real frustration our customers
 * have brought to the kitchen table over thirty years.
 */

type Row = {
  us: string;
  them: string;
};

const rows: Row[] = [
  {
    us: "Owner-led, four houses a week. The person measuring is the person installing.",
    them: "Commission sales reps. The crew that shows up has never seen your home.",
  },
  {
    us: "Every opening measured by hand, twice, before the order is placed.",
    them: "Eyeballed measurements off a clipboard. Out-of-square frames discovered on install day.",
  },
  {
    us: "Fixed-price written estimate, on paper, before you sign.",
    them: "“Today-only” pricing. Three-hour kitchen-table pitch. Add-ons on install day.",
  },
  {
    us: "Floors covered, landscaping minded, every frame shimmed plumb.",
    them: "Tarps thrown down. One crew banging through ten houses a week.",
  },
  {
    us: "One window finished completely — sashes hung, trim caulked, weep holes clear — before the next is started.",
    them: "Rip out all windows day one. Plastic sheeting for a week while crews rotate.",
  },
  {
    us: "Lifetime workmanship guarantee. We answer the phone in year ten.",
    them: "One-year labor warranty buried in fine print. Manufacturer-only after that.",
  },
  {
    us: "Walk-through inspection together. We don’t leave until you’ve signed off on every unit.",
    them: "Crew loads up and leaves. Punch-list calls go to a 1-800 number.",
  },
];

export function UsVsThem() {
  return (
    <section id="us-vs-them" className="bg-stone-100 py-28 sm:py-36">
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
            Why we&apos;re different
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-display text-4xl leading-tight font-semibold tracking-tight text-slate-900 sm:text-5xl"
          >
            The way it should be done — and the way it usually is.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 font-serif text-lg leading-relaxed text-stone-700"
          >
            You&apos;ll get three other quotes. We want you to. Here&apos;s
            what to listen for when you&apos;re comparing.
          </motion.p>
        </motion.div>

        {/* Column headers — sticky on desktop above the rows */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-16 hidden grid-cols-2 gap-px md:grid"
        >
          <motion.div
            variants={fadeUp}
            className="rounded-t-sm bg-slate-950 px-8 py-5 text-stone-50"
          >
            <p className="text-xs font-medium tracking-[0.22em] text-accent-300 uppercase">
              The ED way
            </p>
            <p className="mt-1 font-display text-xl font-semibold tracking-tight">
              How we work.
            </p>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="rounded-t-sm bg-stone-200 px-8 py-5"
          >
            <p className="text-xs font-medium tracking-[0.22em] text-stone-500 uppercase">
              Volume contractors
            </p>
            <p className="mt-1 font-display text-xl font-semibold tracking-tight text-stone-600">
              How they work.
            </p>
          </motion.div>
        </motion.div>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="md:mt-0 mt-12 overflow-hidden md:rounded-b-sm md:border md:border-stone-200"
        >
          {rows.map((row, i) => (
            <motion.li
              key={i}
              variants={fadeUp}
              className="grid gap-px bg-stone-200 md:grid-cols-2"
            >
              <ComparisonCell tone="us" text={row.us} index={i} />
              <ComparisonCell tone="them" text={row.them} index={i} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function ComparisonCell({
  tone,
  text,
  index,
}: {
  tone: "us" | "them";
  text: string;
  index: number;
}) {
  const isUs = tone === "us";
  return (
    <div
      className={`relative flex items-start gap-4 px-6 py-7 sm:px-8 ${
        isUs ? "bg-white" : "bg-stone-50"
      }`}
    >
      {/* Mobile-only tone tag, since columns stack */}
      <span
        className={`absolute -top-px right-3 px-2 py-0.5 text-[10px] font-medium tracking-[0.18em] uppercase md:hidden ${
          isUs ? "text-accent-600" : "text-stone-400"
        }`}
      >
        {isUs ? "Us" : "Them"}
      </span>

      <span
        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
          isUs
            ? "bg-accent-500 text-stone-50"
            : "bg-stone-200 text-stone-500"
        }`}
        aria-hidden
      >
        {isUs ? (
          <Check className="h-4 w-4" strokeWidth={2.25} />
        ) : (
          <X className="h-4 w-4" strokeWidth={2.25} />
        )}
      </span>

      <p
        className={`font-serif text-base leading-relaxed ${
          isUs ? "text-slate-900" : "text-stone-500"
        }`}
      >
        {index === 0 && (
          <span className="mr-2 inline-block font-display text-xs font-medium tracking-[0.2em] text-stone-400 tabular-nums">
            0{index + 1}
          </span>
        )}
        {text}
      </p>
    </div>
  );
}
