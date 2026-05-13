"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Home as HomeIcon,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  User,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  EASE_OUT,
  fadeIn,
  fadeUp,
  inView,
  staggerContainer,
} from "../lib/animations";
import { useWindowList } from "../lib/WindowListContext";
import { Field, inputClass } from "./Field";
import { SavedWindowsList, serializeSavedList } from "./SavedWindowsList";

/*
 * Stepped lead form.
 *
 * Single source of truth (`form` state). Each step validates only the
 * fields it owns; "Next" is disabled until the current step is valid so
 * we never bounce a user back two screens with a generic error.
 *
 * Step transitions slide horizontally — direction tracked so prev goes
 * left-to-right and next goes right-to-left for natural directionality.
 */

type WindowCount = "" | "1-3" | "4-7" | "8-15" | "16+";
type Timeline = "" | "asap" | "1-3-months" | "3-6-months" | "planning";
type Homeowner = "" | "owner" | "co-owner" | "other";

type FormState = {
  windowCount: WindowCount;
  timeline: Timeline;
  name: string;
  phone: string;
  email: string;
  address: string;
  homeowner: Homeowner;
  notes: string;
};

const reassurances = [
  "Free, in-home consultation",
  "Fixed-price written estimate — no surprises",
  "Lifetime workmanship guarantee on every install",
  "Fully licensed, bonded, and insured",
];

const homeownerOptions: { value: Exclude<Homeowner, "">; label: string }[] = [
  { value: "owner", label: "Yes, I own" },
  { value: "co-owner", label: "Co-owner / spouse" },
  { value: "other", label: "No — other" },
];

const windowCountOptions: { value: Exclude<WindowCount, "">; label: string }[] =
  [
    { value: "1-3", label: "1 – 3 windows" },
    { value: "4-7", label: "4 – 7 windows" },
    { value: "8-15", label: "8 – 15 windows" },
    { value: "16+", label: "Whole-house (16+)" },
  ];

const timelineOptions: { value: Exclude<Timeline, "">; label: string }[] = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "Within 1 – 3 months" },
  { value: "3-6-months", label: "3 – 6 months out" },
  { value: "planning", label: "Just planning ahead" },
];

type StepMeta = {
  key: string;
  title: string;
  blurb: string;
  icon: LucideIcon;
};

const STEPS: StepMeta[] = [
  {
    key: "project",
    title: "Your project",
    blurb: "Two quick questions so we can size the visit right.",
    icon: HomeIcon,
  },
  {
    key: "contact",
    title: "How to reach you",
    blurb: "We never share this. One thoughtful reply, no spam.",
    icon: User,
  },
  {
    key: "property",
    title: "About the property",
    blurb: "Help us prepare before we visit.",
    icon: MapPin,
  },
  {
    key: "review",
    title: "Review & send",
    blurb: "Take one last look, then we'll be in touch within a business day.",
    icon: Sparkles,
  },
];

export function LeadForm() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({
    windowCount: "",
    timeline: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    homeowner: "",
    notes: "",
  });

  const { items } = useWindowList();
  const savedListText = useMemo(() => serializeSavedList(items), [items]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const isStepValid = (i: number) => {
    switch (i) {
      case 0:
        return form.windowCount !== "" && form.timeline !== "";
      case 1:
        return (
          form.name.trim().length > 1 &&
          /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) &&
          form.phone.trim().length >= 7
        );
      case 2:
        return form.homeowner !== "";
      default:
        return true;
    }
  };

  const next = () => {
    if (!isStepValid(step)) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

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
            <div className="rounded-sm border border-stone-200 bg-white shadow-sm">
              {submitted ? (
                <SubmittedState />
              ) : (
                <>
                  <ProgressRail step={step} />
                  <Stepper step={step} />

                  <div className="px-6 pb-8 sm:px-10 sm:pb-10">
                    {items.length > 0 && step === 0 && (
                      <div className="mb-6 rounded-sm border border-accent-300 bg-accent-50 px-4 py-3 text-sm text-slate-900">
                        <span className="font-semibold">
                          {items.length} configured window
                          {items.length === 1 ? "" : "s"}
                        </span>{" "}
                        will be sent with this request.
                      </div>
                    )}

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (step < STEPS.length - 1) {
                          next();
                          return;
                        }
                        setSubmitted(true);
                      }}
                    >
                      <input
                        type="hidden"
                        name="saved-windows"
                        value={savedListText}
                      />
                      <input
                        type="hidden"
                        name="saved-windows-count"
                        value={items.length}
                      />

                      <div className="relative overflow-hidden">
                        <AnimatePresence
                          mode="wait"
                          custom={direction}
                          initial={false}
                        >
                          <motion.div
                            key={STEPS[step].key}
                            custom={direction}
                            variants={{
                              enter: (d: 1 | -1) => ({
                                x: 24 * d,
                                opacity: 0,
                              }),
                              center: { x: 0, opacity: 1 },
                              exit: (d: 1 | -1) => ({
                                x: -24 * d,
                                opacity: 0,
                              }),
                            }}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.35, ease: EASE_OUT }}
                          >
                            <StepHeader meta={STEPS[step]} />
                            <div className="mt-7">
                              {step === 0 && (
                                <StepProject form={form} set={set} />
                              )}
                              {step === 1 && (
                                <StepContact form={form} set={set} />
                              )}
                              {step === 2 && (
                                <StepProperty form={form} set={set} />
                              )}
                              {step === 3 && (
                                <StepReview
                                  form={form}
                                  savedCount={items.length}
                                />
                              )}
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      <Controls
                        step={step}
                        canAdvance={isStepValid(step)}
                        onBack={back}
                      />
                    </form>
                  </div>
                </>
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
        Four short steps, about a minute. We respond within one business
        day — usually faster. The owner reads every form himself.
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
        <motion.div
          variants={fadeUp}
          className="mt-10 border-t border-stone-200 pt-8"
        >
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

/* ──────────────────────────────────────────────────────────────────── */

function ProgressRail({ step }: { step: number }) {
  const pct = ((step + 1) / STEPS.length) * 100;
  return (
    <div className="h-1 w-full overflow-hidden bg-stone-100">
      <motion.div
        className="h-full bg-accent-500"
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      />
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <ol className="flex items-center justify-between gap-2 border-b border-stone-200 px-6 py-5 sm:px-10">
      {STEPS.map((s, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <li
            key={s.key}
            className="flex min-w-0 flex-1 items-center gap-2"
            aria-current={active ? "step" : undefined}
          >
            <motion.span
              initial={false}
              animate={{
                backgroundColor: done
                  ? "var(--accent-500)"
                  : active
                    ? "var(--slate-900)"
                    : "var(--stone-200)",
                color:
                  done || active ? "var(--stone-50)" : "var(--stone-500)",
                scale: active ? 1.05 : 1,
              }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular-nums"
            >
              {done ? <CheckCircle2 className="h-4 w-4" strokeWidth={2} /> : i + 1}
            </motion.span>
            <span
              className={`hidden truncate text-xs font-medium tracking-tight sm:block ${
                active ? "text-slate-900" : "text-stone-500"
              }`}
            >
              {s.title}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function StepHeader({ meta }: { meta: StepMeta }) {
  const Icon = meta.icon;
  return (
    <div className="flex items-start gap-4">
      <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-accent-500/10 text-accent-600 ring-1 ring-accent-300/40">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <div className="pt-1">
        <h3 className="font-display text-2xl font-semibold tracking-tight text-slate-900">
          {meta.title}
        </h3>
        <p className="mt-1 font-serif text-sm leading-relaxed text-stone-600">
          {meta.blurb}
        </p>
      </div>
    </div>
  );
}

/* ─── Steps ────────────────────────────────────────────────────────── */

type StepProps = {
  form: FormState;
  set: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
};

function StepProject({ form, set }: StepProps) {
  return (
    <div className="space-y-7">
      <fieldset className="space-y-3">
        <legend className="text-sm font-medium tracking-tight text-slate-900">
          How many windows?
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {windowCountOptions.map((opt) => (
            <ChoiceTile
              key={opt.value}
              name="window-count"
              value={opt.value}
              label={opt.label}
              selected={form.windowCount === opt.value}
              onSelect={() => set("windowCount", opt.value)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium tracking-tight text-slate-900">
          When would you like the work done?
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {timelineOptions.map((opt) => (
            <ChoiceTile
              key={opt.value}
              name="timeline"
              value={opt.value}
              label={opt.label}
              selected={form.timeline === opt.value}
              onSelect={() => set("timeline", opt.value)}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
}

function StepContact({ form, set }: StepProps) {
  return (
    <div className="space-y-5">
      <Field label="Full name" htmlFor="name">
        <div className="relative">
          <User
            className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-stone-400"
            strokeWidth={1.75}
          />
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className={`${inputClass} pl-10`}
          />
        </div>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone" htmlFor="phone">
          <div className="relative">
            <Phone
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-stone-400"
              strokeWidth={1.75}
            />
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              className={`${inputClass} pl-10`}
            />
          </div>
        </Field>
        <Field label="Email" htmlFor="email">
          <div className="relative">
            <Mail
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-stone-400"
              strokeWidth={1.75}
            />
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className={`${inputClass} pl-10`}
            />
          </div>
        </Field>
      </div>
    </div>
  );
}

function StepProperty({ form, set }: StepProps) {
  return (
    <div className="space-y-7">
      <Field label="Property address" htmlFor="address" optional>
        <div className="relative">
          <MapPin
            className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-stone-400"
            strokeWidth={1.75}
          />
          <input
            id="address"
            name="address"
            type="text"
            autoComplete="street-address"
            placeholder="Street, City, ZIP"
            value={form.address}
            onChange={(e) => set("address", e.target.value)}
            className={`${inputClass} pl-10`}
          />
        </div>
      </Field>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium tracking-tight text-slate-900">
          Are you the homeowner?
        </legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {homeownerOptions.map((opt) => (
            <ChoiceTile
              key={opt.value}
              name="homeowner"
              value={opt.value}
              label={opt.label}
              selected={form.homeowner === opt.value}
              onSelect={() => set("homeowner", opt.value)}
            />
          ))}
        </div>
      </fieldset>

      <Field label="Anything we should know?" htmlFor="notes" optional>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Window styles you're considering, historic home, tight access, etc."
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </Field>

    </div>
  );
}

function StepReview({
  form,
  savedCount,
}: {
  form: FormState;
  savedCount: number;
}) {
  const windowCountLabel =
    windowCountOptions.find((o) => o.value === form.windowCount)?.label ?? "—";
  const timelineLabel =
    timelineOptions.find((o) => o.value === form.timeline)?.label ?? "—";
  const homeownerLabel =
    homeownerOptions.find((o) => o.value === form.homeowner)?.label ?? "—";

  return (
    <div className="space-y-6">
      <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
        <SummaryItem label="Number of windows" value={windowCountLabel} />
        <SummaryItem label="Timeline" value={timelineLabel} />
        <SummaryItem label="Name" value={form.name || "—"} />
        <SummaryItem
          label="Contact"
          value={[form.email, form.phone].filter(Boolean).join(" · ") || "—"}
        />
        <SummaryItem
          label="Address"
          value={form.address || "Not provided"}
          full
        />
        <SummaryItem label="Homeowner" value={homeownerLabel} />
        {savedCount > 0 && (
          <SummaryItem
            label="Configured windows"
            value={`${savedCount} attached`}
          />
        )}
        {form.notes && (
          <SummaryItem label="Notes" value={form.notes} full />
        )}
      </dl>

      <p className="rounded-sm border border-stone-200 bg-stone-50 px-4 py-3 text-xs text-stone-600">
        We never share your information. One thoughtful reply, no spam,
        no follow-up calls unless you want them.
      </p>
    </div>
  );
}

function SummaryItem({
  label,
  value,
  full,
}: {
  label: string;
  value: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <dt className="text-[11px] font-medium tracking-[0.18em] text-stone-400 uppercase">
        {label}
      </dt>
      <dd className="mt-1 font-serif text-base leading-relaxed text-slate-900">
        {value}
      </dd>
    </div>
  );
}

/* ─── Bits ────────────────────────────────────────────────────────── */

function ChoiceTile({
  name,
  value,
  label,
  selected,
  onSelect,
}: {
  name: string;
  value: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <label
      className={`group relative flex cursor-pointer items-center gap-3 rounded-sm border bg-stone-50 px-4 py-3 text-sm transition-colors duration-300 ${
        selected
          ? "border-accent-500 bg-accent-50 text-slate-900"
          : "border-stone-200 text-slate-800 hover:border-stone-300"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={selected}
        onChange={onSelect}
        className="h-4 w-4 accent-accent-500"
      />
      {label}
    </label>
  );
}

function Controls({
  step,
  canAdvance,
  onBack,
}: {
  step: number;
  canAdvance: boolean;
  onBack: () => void;
}) {
  const isLast = step === STEPS.length - 1;
  return (
    <div className="mt-9 flex items-center justify-between gap-4">
      <button
        type="button"
        onClick={onBack}
        disabled={step === 0}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:text-slate-900 disabled:cursor-not-allowed disabled:text-stone-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <button
        type="submit"
        disabled={!canAdvance}
        className="group inline-flex items-center justify-center gap-2 rounded-sm bg-slate-900 px-6 py-3.5 text-sm font-semibold text-stone-50 transition-all duration-300 hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-stone-300"
      >
        {isLast ? "Send my quote request" : "Continue"}
        <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}

function SubmittedState() {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="show"
      className="flex flex-col items-start px-8 py-12 sm:px-10"
    >
      <CheckCircle2 className="h-10 w-10 text-accent-500" strokeWidth={1.5} />
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
