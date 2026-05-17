"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight, ShieldCheck, Star, Banknote, Clock } from "lucide-react";
import {
  fadeUp,
  heroImageReveal,
  staggerContainer,
} from "../lib/animations";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";

/*
 * Hero — graphic-driven, palette-anchored. The headline leads with
 * craftsmanship, the subhead with financing/transparency, and the
 * trust strip surfaces the proof points that drive call-to-action.
 */

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate -mt-[40px] overflow-hidden bg-slate-950 text-stone-50 sm:-mt-[44px]"
    >
      {/* Photo */}
      <motion.div
        variants={heroImageReveal}
        initial="hidden"
        animate="show"
        className="absolute inset-0 -z-10"
      >
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80"
          alt="Sunlit interior with a wall of newly installed picture windows"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/40" />
      </motion.div>

      {/* Soft copper glow accent — subtle excitement */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-20 h-[480px] w-[480px] rounded-full bg-accent-500/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-32 h-[420px] w-[420px] rounded-full bg-sky-500/20 blur-[120px]"
      />

      <div className="mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-6 pt-28 pb-24 sm:py-32 lg:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.div
            variants={fadeUp}
            className="group inline-flex items-center gap-2 rounded-full border border-accent-300/40 bg-accent-500/10 px-3.5 py-1.5 backdrop-blur-md transition-colors hover:bg-accent-500/15"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-accent-300 shadow-[0_0_8px_var(--accent-300)]" />
            <AnimatedShinyText className="text-[11px] font-medium tracking-[0.22em] uppercase text-accent-100">
              Family-owned · NJ · Since 1998
            </AnimatedShinyText>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-7 font-display text-5xl leading-[1.02] font-semibold tracking-tight text-stone-50 sm:text-6xl lg:text-7xl"
          >
            Brighter rooms.
            <br />
            Lower bills.
            <br />
            <span className="bg-gradient-to-r from-accent-300 via-accent-500 to-accent-300 bg-clip-text text-transparent">
              Windows done right.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-xl font-serif text-lg leading-relaxed text-stone-200 sm:text-xl"
          >
            Energy-Star windows and doors, installed by the same crew that
            measured them. Fixed-price written estimates,{" "}
            <span className="font-semibold text-accent-300">
              0% APR financing for 12 months
            </span>
            , and a lifetime workmanship warranty on every install.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#quote"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-accent-500 px-8 py-4 text-base font-semibold text-stone-50 shadow-lg shadow-accent-700/30 transition-all duration-300 hover:bg-accent-600 hover:shadow-xl hover:shadow-accent-700/40"
            >
              <span className="absolute inset-0 shimmer-sweep" />
              <span className="relative">Get Your Free Quote</span>
              <ChevronRight className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#financing"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-50/30 bg-stone-50/5 px-8 py-4 text-base font-medium text-stone-50 backdrop-blur transition-colors duration-300 hover:bg-stone-50/15"
            >
              <Banknote className="h-4 w-4 text-accent-300" strokeWidth={2} />
              See Financing Plans
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-12 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-3"
          >
            <TrustChip
              icon={<Star className="h-4 w-4 fill-accent-300 text-accent-300" />}
              primary="4.9★"
              secondary="200+ Google reviews"
            />
            <TrustChip
              icon={<ShieldCheck className="h-4 w-4 text-accent-300" />}
              primary="Lifetime"
              secondary="Workmanship warranty"
            />
            <TrustChip
              icon={<Banknote className="h-4 w-4 text-accent-300" />}
              primary="0% APR"
              secondary="12-month financing"
            />
            <TrustChip
              icon={<Clock className="h-4 w-4 text-accent-300" />}
              primary="1–2 days"
              secondary="Most installs"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustChip({
  icon,
  primary,
  secondary,
}: {
  icon: React.ReactNode;
  primary: string;
  secondary: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-stone-50/15 bg-slate-950/40 px-3 py-2 backdrop-blur-sm sm:border-0 sm:bg-transparent sm:p-0">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-500/15 ring-1 ring-accent-300/30 sm:h-6 sm:w-6">
        {icon}
      </span>
      <div className="leading-tight">
        <div className="text-sm font-semibold tracking-tight text-stone-50">
          {primary}
        </div>
        <div className="text-[11px] text-stone-300">{secondary}</div>
      </div>
    </div>
  );
}
