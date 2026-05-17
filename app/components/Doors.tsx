"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check, ChevronRight } from "lucide-react";
import { doors } from "../lib/content";
import { fadeUp, inView, staggerContainer } from "../lib/animations";

export function Doors() {
  return (
    <section id="door-types" className="bg-stone-100 py-28 sm:py-36">
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
              className="text-xs font-medium tracking-[0.22em] text-accent-600 uppercase"
            >
              Doors
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-display text-4xl leading-tight font-semibold tracking-tight text-slate-900 sm:text-5xl"
            >
              Doors built to the same obsessive spec as our windows.
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="max-w-md font-serif text-base leading-relaxed text-stone-700"
          >
            We install the full Okna door lineup — patio sliders, French
            sliders, hinged French doors, and insulated entry systems —
            shimmed plumb, flashed properly, and weatherproofed for the
            long haul.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-16 grid gap-6 md:grid-cols-2"
        >
          {doors.map((door) => {
            const Icon = door.icon;
            return (
              <motion.article
                key={door.title}
                variants={fadeUp}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(6,17,42,0.30)]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={door.image}
                    alt={door.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/30 to-transparent" />
                  <span className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500 text-stone-50 shadow-lg">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-8 pt-6">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-slate-900">
                    {door.title}
                  </h3>
                  <p className="mt-3 font-serif text-base leading-relaxed text-stone-700">
                    {door.body}
                  </p>
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {door.details.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-2.5 font-serif text-sm leading-relaxed text-stone-600"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 flex-none text-accent-600"
                          strokeWidth={2.5}
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#quote"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 transition-colors hover:text-accent-600"
                  >
                    Quote this door
                    <ChevronRight className="h-3.5 w-3.5" />
                  </a>
                </div>
                <motion.span
                  aria-hidden
                  initial={false}
                  className="absolute bottom-0 left-0 h-[3px] w-0 bg-accent-500 transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
                />
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-14 flex flex-col items-center text-center"
        >
          <p className="font-serif text-base text-stone-600">
            Every door we hang is shimmed, flashed, and weather-sealed to the
            same standard as a structural window install.
          </p>
          <a
            href="/#quote"
            className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-stone-50 transition-colors duration-300 hover:bg-slate-700"
          >
            Talk through a door project
          </a>
        </motion.div>
      </div>
    </section>
  );
}
