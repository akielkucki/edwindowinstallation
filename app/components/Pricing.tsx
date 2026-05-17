"use client";

import { motion } from "framer-motion";
import { Check, ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { pricingTiers, pricingFacts, type PricingTier } from "../lib/content";
import { fadeUp, inView, staggerContainer } from "../lib/animations";
import { BorderBeam } from "@/components/ui/border-beam";

/*
 * Pricing — three honest tiers. Built around "no surprises":
 * a starting per-window price, a clearly labeled best-for, and a
 * full inclusion list. The middle tier is highlighted as the most
 * popular path so the visitor doesn't have to make a complex call.
 */

export function Pricing() {
  return (
    <section id="pricing" className="relative isolate overflow-hidden bg-stone-50 py-28 sm:py-36">
      {/* Decorative blueprint background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-[0.04]"
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
            Straightforward Pricing
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-display text-4xl leading-tight font-semibold tracking-tight text-slate-900 sm:text-5xl"
          >
            Three honest tiers.
            <br />
            <span className="text-accent-600">No mystery surcharges.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 font-serif text-lg leading-relaxed text-stone-700"
          >
            Most window companies hide the number. We lead with it.
            Pick the package that fits your home — every quote is a
            fixed price in writing, exactly the same dollar figure on
            install day.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-16 grid gap-6 lg:grid-cols-3"
        >
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.name} tier={tier} />
          ))}
        </motion.div>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-14 grid gap-4 rounded-2xl border border-stone-200 bg-white p-6 sm:grid-cols-3 sm:p-8"
        >
          {pricingFacts.map((f) => {
            const Icon = f.icon;
            return (
              <motion.li
                key={f.label}
                variants={fadeUp}
                className="flex items-start gap-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700 ring-1 ring-sky-300/40">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold tracking-tight text-slate-900">
                    {f.label}
                  </p>
                  <p className="mt-1 font-serif text-sm leading-relaxed text-stone-600">
                    {f.detail}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-12 flex flex-col items-center text-center"
        >
          <p className="font-serif text-base text-stone-700">
            Not sure where you land? Our in-home quote is free,
            takes about 45 minutes, and ends with a fixed-price spec sheet.
          </p>
          <a
            href="#quote"
            className="group mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-stone-50 transition-colors duration-300 hover:bg-slate-700"
          >
            Schedule My Free Quote
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function PricingCard({ tier }: { tier: PricingTier }) {
  const hl = tier.highlighted;
  return (
    <motion.article
      variants={fadeUp}
      className={[
        "group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-500",
        hl
          ? "border-accent-500 bg-slate-950 text-stone-50 shadow-[0_30px_80px_-30px_rgba(223,139,31,0.45)] lg:-translate-y-2"
          : "border-stone-200 bg-white text-slate-900 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(6,17,42,0.30)]",
      ].join(" ")}
    >
      {hl && (
        <>
          <BorderBeam size={140} duration={9} colorFrom="#df8b1f" colorTo="#f5b657" />
          <BorderBeam size={140} duration={9} delay={4.5} colorFrom="#1f97b1" colorTo="#6cc2d4" />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-20 h-[280px] w-[280px] rounded-full bg-accent-500/30 blur-[100px]"
          />
          <div className="absolute right-5 top-5 z-20 inline-flex items-center gap-1.5 rounded-full bg-accent-500 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase text-stone-50 shadow-lg">
            <Sparkles className="h-3 w-3" strokeWidth={2.5} />
            Most popular
          </div>
        </>
      )}

      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={tierImage(tier.name)}
          alt={tier.name}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className={[
            "absolute inset-0",
            hl
              ? "bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20"
              : "bg-gradient-to-t from-white via-white/40 to-transparent",
          ].join(" ")}
        />
      </div>

      <div className="relative flex flex-1 flex-col p-8">
        <h3
          className={[
            "font-display text-2xl font-semibold tracking-tight",
            hl ? "text-stone-50" : "text-slate-900",
          ].join(" ")}
        >
          {tier.name}
        </h3>
        <p
          className={[
            "mt-1.5 font-serif text-sm",
            hl ? "text-stone-300" : "text-stone-600",
          ].join(" ")}
        >
          {tier.tagline}
        </p>

        <div className="mt-6 flex items-center justify-center gap-2 w-full">
          <span
            className={[
              "font-display text-3xl font-semibold tracking-tight w-full",
              hl ? "text-accent-300" : "text-slate-900",
            ].join(" ")}
          >
            {tier.pricePerWindow}
          </span>
          <span
            className={[
              "text-xs",
              hl ? "text-stone-300" : "text-stone-500",
            ].join(" ")}
          >
            {tier.startingAt}
          </span>
        </div>

        <p
          className={[
            "mt-5 rounded-lg px-3 py-2 text-xs leading-relaxed",
            hl
              ? "bg-stone-50/10 text-stone-100"
              : "bg-stone-100 text-stone-700",
          ].join(" ")}
        >
          <span className="font-semibold">Best for: </span>
          {tier.bestFor}
        </p>

        <ul className="mt-6 flex flex-1 flex-col gap-3">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <span
                className={[
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                  hl
                    ? "bg-accent-500 text-stone-50"
                    : "bg-accent-50 text-accent-600",
                ].join(" ")}
              >
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span
                className={[
                  "font-serif text-sm leading-relaxed",
                  hl ? "text-stone-200" : "text-stone-700",
                ].join(" ")}
              >
                {f}
              </span>
            </li>
          ))}
        </ul>

        <a
          href="#quote"
          className={[
            "mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors",
            hl
              ? "bg-accent-500 text-stone-50 hover:bg-accent-600"
              : "bg-slate-900 text-stone-50 hover:bg-slate-700",
          ].join(" ")}
        >
          Quote this package
          <ChevronRight className="h-4 w-4" />
        </a>
      </div>
    </motion.article>
  );
}

function tierImage(name: string): string {
  switch (name) {
    case "Essential":
      return "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80";
    case "Signature":
      return "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=1400&q=80";
    case "Heritage":
      return "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=80";
    default:
      return "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80";
  }
}
