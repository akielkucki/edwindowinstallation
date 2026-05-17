"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { fadeUp, inView, staggerContainer } from "../lib/animations";
import { services } from "../lib/content";

/*
 * Services — image-led grid. Each card is a high-impact photo of
 * the window type with a glassy gradient and a small icon chip.
 */

export function Services() {
  return (
    <section
      id="window-types"
      className="relative isolate overflow-hidden bg-slate-950 py-28 text-stone-50 sm:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(108,194,212,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(108,194,212,0.6) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-20 h-[480px] w-[480px] rounded-full bg-accent-500/15 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
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
              Windows
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-display text-4xl leading-tight font-semibold tracking-tight sm:text-5xl"
            >
              The full lineup — every shape, every era, every budget.
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="max-w-md font-serif text-base leading-relaxed text-stone-300"
          >
            From historic sash restorations to whole-house energy retrofits,
            we install every major style at every quality tier — so the right
            answer for your home is always on the table.
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
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone-50/10 bg-slate-900/40 transition-all duration-500 hover:-translate-y-1 hover:border-accent-300/40 hover:shadow-[0_30px_80px_-30px_rgba(223,139,31,0.30)]"
              >
                <div className="relative aspect-[5/4] w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-slate-950/10" />
                  <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-500/90 text-stone-50 ring-1 ring-accent-300/40 backdrop-blur-sm">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 font-serif text-sm leading-relaxed text-stone-300">
                    {service.body}
                  </p>
                  <a
                    href="#quote"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-300 transition-colors hover:text-accent-100"
                  >
                    Quote this style
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
