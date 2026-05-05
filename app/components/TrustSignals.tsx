"use client";

import { motion } from "framer-motion";
import { ChevronRight, Star } from "lucide-react";
import {
  fadeIn,
  fadeUp,
  inView,
  staggerContainer,
} from "../lib/animations";
import { testimonials } from "../lib/content";

/*
 * Trust signals
 *
 * The Google Business Profile widget will replace the testimonial grid
 * once the embed is supplied. Until then, the static quotes below act
 * as a placeholder shaped like the real widget output.
 */

export function TrustSignals() {
  return (
    <section id="reviews" className="bg-stone-50 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
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
            What Neighbors Say
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-display text-4xl leading-tight font-semibold tracking-tight text-slate-900 sm:text-5xl"
          >
            Reviewed where it matters.
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm shadow-sm"
          >
            <span className="font-display text-2xl font-semibold text-slate-900">
              4.9
            </span>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-accent-300 text-accent-300"
                />
              ))}
            </div>
            <span className="text-stone-600">on Google · 200+ reviews</span>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-16 grid gap-6 lg:grid-cols-3"
        >
          {testimonials.map((r) => (
            <motion.figure
              key={r.name}
              variants={fadeUp}
              className="flex flex-col rounded-sm border border-stone-200 bg-white p-8 shadow-sm"
            >
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-accent-500 text-accent-500"
                  />
                ))}
              </div>
              <blockquote className="mt-5 font-serif text-base leading-relaxed text-slate-800">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-stone-200 pt-5">
                <div className="text-sm font-semibold text-slate-900">
                  {r.name}
                </div>
                <div className="text-xs text-stone-500">{r.location}</div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-12 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
          >
            Read all 200+ reviews on Google
            <ChevronRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
