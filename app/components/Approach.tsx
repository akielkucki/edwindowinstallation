"use client";

import { motion } from "framer-motion";
import { fadeUp, inView, staggerContainer } from "../lib/animations";
import { processSteps } from "../lib/content";

export function Approach() {
  return (
    <section id="approach" className="bg-stone-50 py-28 sm:py-36">
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
            Our Approach
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-display text-4xl leading-tight font-semibold tracking-tight text-slate-900 sm:text-5xl"
          >
            <motion.span
                whileInView={{fontWeight: [300,900]}}
                transition={{ease: "easeInOut", duration: 0.25}}
                viewport={{once: true}}

            >Hard Working.</motion.span>
            <br />
            <div>
              <motion.span whileInView={{color: ["#343434","#EE7722"]}} transition={{ease: "easeInOut", duration: 0.5, delay: 0.8}} viewport={{once: true}}>Attention</motion.span>&nbsp;to&nbsp;
              <motion.span whileInView={{color: ["#343434","#EE7722"]}} transition={{ease: "easeInOut", duration: 0.5, delay: 1.155}} viewport={{once: true}}>detail</motion.span>.
              <br/>
              <div className={"flex flex-col-reverse relative"}>
                <span className={""}>Detailed by nature</span>
                <motion.span whileInView={{width: ["0%","60.25%"]}} transition={{ease: "easeInOut", duration: 0.5, delay: 1.8}} viewport={{once: true}} className={"bg-black h-[5px] absolute bottom-1 left-1/5"}></motion.span>
              </div>
            </div>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 font-serif text-lg leading-relaxed text-stone-700"
          >
            Most window jobs are rushed in a single morning. Ours aren&apos;t.
            We&apos;d rather do four houses a week perfectly than ten houses
            a week passably — and the homes we&apos;ve installed for thirty
            years still seal tight, swing true, and look right.
          </motion.p>
        </motion.div>

        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-20 grid gap-px overflow-hidden rounded-sm bg-stone-200 sm:grid-cols-2 lg:grid-cols-4"
        >
          {processSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={step.title}
                variants={fadeUp}
                className="group relative flex flex-col bg-stone-50 p-8 transition-colors duration-500 hover:bg-white"
              >
                <span className="font-display text-sm font-medium tracking-[0.2em] text-stone-400">
                  0{i + 1}
                </span>
                <Icon
                  className="mt-6 h-8 w-8 text-accent-500 transition-transform duration-700 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-3 font-serif text-base leading-relaxed text-stone-600">
                  {step.body}
                </p>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}
