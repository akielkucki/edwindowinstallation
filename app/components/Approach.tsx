"use client";

import { motion } from "framer-motion";
import { fadeUp, inView, staggerContainer } from "../lib/animations";
import { processSteps } from "../lib/content";
import { MagicCard } from "@/components/ui/magic-card";

/*
 * "How we work" — four-step process with a graphic feel. Tiles
 * sit on a glass-blueprint background to evoke craftsmanship.
 */

export function Approach() {
  return (
    <section
      id="approach"
      className="relative isolate overflow-hidden bg-stone-50 py-28 sm:py-36"
    >
      {/* Subtle blueprint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,17,42,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(6,17,42,0.6) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
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
            How we work
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-display text-4xl leading-tight font-semibold tracking-tight text-slate-900 sm:text-5xl"
          >
            Easy to start.
            <br />
            <span className="text-accent-600">
              Even easier to live with.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 font-serif text-lg leading-relaxed text-stone-700"
          >
            Quote on Monday, financing approved by Tuesday, install
            wrapped by next week. We&apos;ve been doing this for thirty
            years — every detail has a process, and every process is
            built around keeping your life uninterrupted.
          </motion.p>
        </motion.div>

        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {processSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.li key={step.title} variants={fadeUp} className="h-full">
                <MagicCard
                  className="h-full border border-stone-200 bg-white"
                  gradientColor="#df8b1f"
                  gradientFrom="#df8b1f"
                  gradientTo="#1f97b1"
                >
                  <div className="flex h-full flex-col p-8">
                    <span className="font-display text-sm font-medium tracking-[0.2em] text-stone-400 tabular-nums">
                      0{i + 1}
                    </span>
                    <span className="mt-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/10 text-accent-600 ring-1 ring-accent-300/40 transition-all duration-500 group-hover:bg-accent-500 group-hover:text-stone-50">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </span>
                    <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-3 font-serif text-base leading-relaxed text-stone-600">
                      {step.body}
                    </p>
                  </div>
                </MagicCard>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}
