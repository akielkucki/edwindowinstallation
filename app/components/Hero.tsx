"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight, ShieldCheck, Star } from "lucide-react";
import {
  fadeUp,
  heroImageReveal,
  staggerContainer,
} from "../lib/animations";
import RatingBadge from "@/app/components/RatingBadge";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-slate-950 text-stone-50"
    >
      {/* Background image. Replace `src` with real photography. */}
      <motion.div
        variants={heroImageReveal}
        initial="hidden"
        animate="show"
        className="absolute inset-0 -z-10"
      >
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80"
          alt="Sunlit living room with newly installed picture windows"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/60 to-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
      </motion.div>

      <div className="mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-6 py-32 lg:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <RatingBadge/>
          <motion.h1
            variants={fadeUp}
            className="mt-8 font-display text-5xl leading-[1.05] font-semibold tracking-tight text-stone-50 sm:text-6xl lg:text-7xl"
          >
            Windows installed
            <br />
            <span className="text-accent-300">the way they should be.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-xl font-serif text-lg leading-relaxed text-stone-200 sm:text-xl"
          >
            Hard working. Detail-obsessed. Unhurried. We measure twice,
            install once, and finish every job like it&apos;s our own home —
            because for thirty years that&apos;s been the only standard we
            know.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href="#quote"
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-accent-500 px-8 py-4 text-base font-semibold text-stone-50 shadow-lg shadow-accent-700/20 transition-all duration-300 hover:bg-accent-600 hover:shadow-xl hover:shadow-accent-700/30"
            >
              Request Your Free Quote
              <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#approach"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-stone-50/25 px-8 py-4 text-base font-medium text-stone-50 transition-colors duration-300 hover:bg-stone-50/10"
            >
              See How We Work
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-stone-300"
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-accent-300 text-accent-300"
                  />
                ))}
              </div>
              <span className="font-medium text-stone-100">4.9</span>
              <span>· 200+ Google reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent-300" />
              Lifetime workmanship guarantee
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
