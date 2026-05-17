"use client";

import { motion } from "framer-motion";
import { ChevronRight, Star, Quote } from "lucide-react";
import {
  fadeIn,
  fadeUp,
  inView,
  staggerContainer,
} from "../lib/animations";
import { testimonials, type Testimonial } from "../lib/content";
import { Marquee } from "@/components/ui/marquee";
import { NumberTicker } from "@/components/ui/number-ticker";
import { cn } from "@/lib/utils";

/*
 * TrustSignals — three featured reviews on top, an infinite Marquee
 * of secondary reviews below. Real Google Business Profile embed will
 * replace this when the embed becomes available.
 */

const marqueeReviews: Testimonial[] = [
  ...testimonials,
  {
    quote:
      "Quote on Monday, financing approved Tuesday, installed by Friday. Painless.",
    name: "Priya S.",
    location: "Whole-house · Madison",
  },
  {
    quote:
      "They protected the floors better than I do. Cleanup was immaculate.",
    name: "Robert C.",
    location: "12 windows · Cranford",
  },
  {
    quote:
      "Got three other quotes — none of them measured. Ed's came in fair and the work was beautiful.",
    name: "Lauren M.",
    location: "Picture window · Millburn",
  },
  {
    quote:
      "Bay window seat looks like it's been there forever. You'd never know it was new.",
    name: "Karim & Hannah B.",
    location: "Bay window · Summit",
  },
];

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
            What neighbors say
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
            <span className="font-display text-2xl font-semibold text-slate-900 tabular-nums">
              <NumberTicker value={4.9} decimals={1} />
            </span>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-accent-500 text-accent-500"
                />
              ))}
            </div>
            <span className="text-stone-600">
              on Google ·{" "}
              <NumberTicker value={200} suffix="+" className="font-semibold text-slate-900" />{" "}
              reviews
            </span>
          </motion.div>
        </motion.div>

        {/* Featured trio */}
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
              className="relative flex flex-col rounded-2xl border border-stone-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(6,17,42,0.25)]"
            >
              <Quote className="absolute -top-3 left-7 h-6 w-6 fill-accent-500 text-accent-500" strokeWidth={1.5} />
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

        {/* Continuously-scrolling secondary reviews */}
        <div className="relative mt-12">
          <Marquee pauseOnHover className="[--duration:55s] [--gap:1.5rem]">
            {marqueeReviews.map((r, i) => (
              <MarqueeCard key={`${r.name}-${i}`} review={r} />
            ))}
          </Marquee>
          <Marquee
            pauseOnHover
            reverse
            className="mt-4 [--duration:65s] [--gap:1.5rem]"
          >
            {[...marqueeReviews].reverse().map((r, i) => (
              <MarqueeCard key={`r-${r.name}-${i}`} review={r} muted />
            ))}
          </Marquee>
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-stone-50 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-stone-50 to-transparent" />
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-12 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors hover:text-accent-600"
          >
            Read all 200+ reviews on Google
            <ChevronRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function MarqueeCard({
  review,
  muted = false,
}: {
  review: Testimonial;
  muted?: boolean;
}) {
  return (
    <figure
      className={cn(
        "flex w-[340px] shrink-0 flex-col gap-3 rounded-xl border border-stone-200 bg-white p-5 shadow-sm",
        muted && "opacity-90",
      )}
    >
      <div className="flex items-center gap-2">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-3.5 w-3.5 fill-accent-500 text-accent-500"
            />
          ))}
        </div>
      </div>
      <blockquote className="font-serif text-sm leading-relaxed text-slate-800 line-clamp-3">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3 border-t border-stone-100 pt-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-500/15 text-xs font-semibold text-accent-600">
          {review.name
            .split(" ")
            .map((p) => p[0])
            .join("")
            .slice(0, 2)}
        </span>
        <div className="min-w-0">
          <div className="truncate text-xs font-semibold text-slate-900">
            {review.name}
          </div>
          <div className="truncate text-[11px] text-stone-500">
            {review.location}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}
