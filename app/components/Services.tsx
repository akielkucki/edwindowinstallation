"use client";

import { motion } from "framer-motion";
import { fadeUp, inView, staggerContainer } from "../lib/animations";
import { services } from "../lib/content";

export function Services() {
  return (
    <section id="services" className="bg-slate-950 py-28 text-stone-50 sm:py-36">
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
              className="text-xs font-medium tracking-[0.22em] text-accent-300 uppercase"
            >
              Services
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-display text-4xl leading-tight font-semibold tracking-tight sm:text-5xl"
            >
              Every window we install is a window we&apos;d put in our own home.
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="max-w-md font-serif text-base leading-relaxed text-stone-300"
          >
            From historic sash restorations to full whole-house energy
            retrofits — if it has glass and a frame, we&apos;ve probably
            installed it the right way.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                variants={fadeUp}
                className="group relative flex flex-col rounded-sm border border-stone-50/10 bg-slate-900/40 p-8 transition-all duration-500 hover:border-accent-300/40 hover:bg-slate-900"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-stone-50/5 ring-1 ring-stone-50/10 transition-colors duration-500 group-hover:bg-accent-500/15 group-hover:ring-accent-300/40">
                  <Icon
                    className="h-6 w-6 text-accent-300"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-3 font-serif text-base leading-relaxed text-stone-300">
                  {service.body}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
