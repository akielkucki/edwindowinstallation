"use client";

import { faqs } from "@/app/lib/content";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";
import { fadeUp, inView, staggerContainer, EASE_OUT } from "../lib/animations";

export function FAQ() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-stone-50 py-28 sm:py-36">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
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
            Questions, answered
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-display text-4xl leading-tight font-semibold tracking-tight text-slate-900 sm:text-5xl"
          >
            The things homeowners ask us first.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 font-serif text-lg leading-relaxed text-stone-700"
          >
            Thirty years of conversations at kitchen tables — these come up the
            most. If yours isn&apos;t here, ask us at the quote.
          </motion.p>
        </motion.div>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-16 divide-y divide-stone-200 border-y border-stone-200"
        >
          {faqs.map((faq, index) => {
            const isOpen = expanded === index;
            return (
              <motion.li key={faq.question} variants={fadeUp}>
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  className="group flex w-full items-start justify-between gap-6 py-7 text-left transition-colors duration-300 hover:text-accent-600"
                >
                  <span className="flex items-baseline gap-5">
                    <span className="font-display text-sm font-medium tracking-[0.2em] text-stone-400 tabular-nums">
                      0{index + 1}
                    </span>
                    <span className="font-display text-lg font-semibold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-accent-600 sm:text-xl">
                      {faq.question}
                    </span>
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: EASE_OUT }}
                    className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-stone-300 text-stone-500 transition-colors duration-300 group-hover:border-accent-400 group-hover:text-accent-600"
                  >
                    <Plus className="h-4 w-4" strokeWidth={1.75} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${index}`}
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { height: "auto", opacity: 1 },
                        collapsed: { height: 0, opacity: 0 },
                      }}
                      transition={{
                        height: { duration: 0.5, ease: EASE_OUT },
                        opacity: { duration: 0.35, ease: EASE_OUT },
                      }}
                      className="overflow-hidden"
                    >
                      <motion.p
                        initial={{ y: -8 }}
                        animate={{ y: 0 }}
                        exit={{ y: -8 }}
                        transition={{ duration: 0.45, ease: EASE_OUT }}
                        className="ml-[3.25rem] max-w-2xl pr-12 pb-7 font-serif text-base leading-relaxed text-stone-600 sm:text-lg"
                      >
                        {faq.answer}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}