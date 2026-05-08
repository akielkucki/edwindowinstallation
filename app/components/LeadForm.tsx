"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  fadeIn,
  fadeUp,
  inView,
  staggerContainer,
} from "../lib/animations";
import { Field, inputClass, selectClass } from "./Field";
import { useWindowList } from "../lib/WindowListContext";
import { SavedWindowsList, serializeSavedList } from "./SavedWindowsList";

/*
 * Qualified lead form.
 *
 * The qualifying selects (window count, timeline, homeowner status) are
 * the point of the page — they filter serious leads from tire-kickers
 * without making the form feel like a survey.
 */

const reassurances = [
  "Free, in-home consultation",
  "Fixed-price written estimate — no surprises",
  "Lifetime workmanship guarantee on every install",
  "Fully licensed, bonded, and insured",
];

const homeownerOptions = [
  { value: "owner", label: "Yes, I own" },
  { value: "co-owner", label: "Co-owner / spouse" },
  { value: "other", label: "No — other" },
];

export function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const { items } = useWindowList();

  return (
    <section id="quote" className="relative bg-stone-100 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <LeftRail savedCount={items.length} />

          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="relative"
          >
            <div className="rounded-sm border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
              {submitted ? (
                <SubmittedState />
              ) : (
                <FormBody
                  savedListText={serializeSavedList(items)}
                  savedCount={items.length}
                  onSubmit={() => setSubmitted(true)}
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────── */

function LeftRail({ savedCount }: { savedCount: number }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className="flex flex-col"
    >
      <motion.span
        variants={fadeUp}
        className="text-xs font-medium tracking-[0.22em] text-accent-600 uppercase"
      >
        Request a Quote
      </motion.span>
      <motion.h2
        variants={fadeUp}
        className="mt-4 font-display text-4xl leading-tight font-semibold tracking-tight text-slate-900 sm:text-5xl"
      >
        Tell us about your project.
      </motion.h2>
      <motion.p
        variants={fadeUp}
        className="mt-6 font-serif text-lg leading-relaxed text-stone-700"
      >
        We respond to every quote request within one business day —
        usually faster. No call-center, no high-pressure visit. The
        owner reads every form himself.
      </motion.p>

      <motion.ul variants={staggerContainer} className="mt-10 space-y-4">
        {reassurances.map((item) => (
          <motion.li
            key={item}
            variants={fadeUp}
            className="flex items-start gap-3 text-base text-slate-800"
          >
            <CheckCircle2
              className="mt-0.5 h-5 w-5 shrink-0 text-accent-500"
              strokeWidth={1.75}
            />
            <span>{item}</span>
          </motion.li>
        ))}
      </motion.ul>

      {savedCount > 0 && (
        <motion.div variants={fadeUp} className="mt-10 border-t border-stone-200 pt-8">
          <p className="text-xs font-medium tracking-[0.22em] text-accent-600 uppercase">
            Configured · {savedCount}
          </p>
          <p className="mt-3 font-serif text-sm leading-relaxed text-stone-700">
            We&apos;ll include the full spec for every window you&apos;ve
            saved with your request — sizes, finishes, glass packages,
            grilles, the lot.
          </p>
          <div className="mt-5">
            <SavedWindowsList variant="compact" />
          </div>
          <Link
            href="/design"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 transition-colors hover:text-accent-600"
          >
            Edit list
            <ChevronRight className="h-4 w-4" />
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}

function FormBody({
  onSubmit,
  savedListText,
  savedCount,
}: {
  onSubmit: () => void;
  savedListText: string;
  savedCount: number;
}) {
  return (
    <form
      className="space-y-7"
      onSubmit={(e) => {
        e.preventDefault();
        /* The hidden field below carries the configured-window list.
           Replace with a real handler / server action — the FormData
           will already contain "saved-windows" with the full spec. */
        onSubmit();
      }}
    >
      {savedCount > 0 && (
        <div className="rounded-sm border border-accent-300 bg-accent-50 px-4 py-3 text-sm text-slate-900">
          <span className="font-semibold">
            {savedCount} configured window{savedCount === 1 ? "" : "s"}
          </span>{" "}
          will be sent with this request.
        </div>
      )}
      <input type="hidden" name="saved-windows" value={savedListText} />
      <input type="hidden" name="saved-windows-count" value={savedCount} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
          />
        </Field>
        <Field label="Phone" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Email" htmlFor="email">
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
        />
      </Field>

      <Field label="Property Address" htmlFor="address">
        <input
          id="address"
          name="address"
          type="text"
          autoComplete="street-address"
          placeholder="Street, City, ZIP"
          className={inputClass}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Number of Windows" htmlFor="window-count">
          <select
            id="window-count"
            name="window-count"
            required
            defaultValue=""
            className={selectClass}
          >
            <option value="" disabled>
              Select…
            </option>
            <option value="1-3">1 – 3 windows</option>
            <option value="4-7">4 – 7 windows</option>
            <option value="8-15">8 – 15 windows</option>
            <option value="16+">Whole-house (16+)</option>
          </select>
        </Field>

        <Field label="Project Timeline" htmlFor="timeline">
          <select
            id="timeline"
            name="timeline"
            required
            defaultValue=""
            className={selectClass}
          >
            <option value="" disabled>
              Select…
            </option>
            <option value="asap">As soon as possible</option>
            <option value="1-3-months">Within 1 – 3 months</option>
            <option value="3-6-months">3 – 6 months out</option>
            <option value="planning">Just planning ahead</option>
          </select>
        </Field>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium tracking-tight text-slate-900">
          Are you the homeowner?
        </legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {homeownerOptions.map((opt) => (
            <label
              key={opt.value}
              className="group relative flex cursor-pointer items-center gap-3 rounded-sm border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-slate-800 transition-colors duration-300 hover:border-stone-300 has-[:checked]:border-accent-500 has-[:checked]:bg-accent-50 has-[:checked]:text-slate-900"
            >
              <input
                type="radio"
                name="homeowner"
                value={opt.value}
                required
                className="h-4 w-4 accent-accent-500"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>

      <Field label="Anything we should know?" htmlFor="notes" optional>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Window styles you're considering, historic home, tight access, etc."
          className={`${inputClass} resize-none`}
        />
      </Field>

      <button
        type="submit"
        className="group inline-flex w-full items-center justify-center gap-2 rounded-sm bg-slate-900 px-6 py-4 text-base font-semibold text-stone-50 transition-all duration-300 hover:bg-slate-700"
      >
        Send My Quote Request
        <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      <p className="text-center text-xs text-stone-500">
        We never share your information. One thoughtful reply, no spam,
        no follow-up calls unless you want them.
      </p>
    </form>
  );
}

function SubmittedState() {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="show"
      className="flex flex-col items-start py-6"
    >
      <CheckCircle2
        className="h-10 w-10 text-accent-500"
        strokeWidth={1.5}
      />
      <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-slate-900">
        Thank you — we&apos;ll be in touch.
      </h3>
      <p className="mt-3 font-serif text-base text-stone-700">
        Your request is in. Ed personally reads every form and will reach
        out within one business day to schedule your free in-home estimate.
      </p>
    </motion.div>
  );
}
