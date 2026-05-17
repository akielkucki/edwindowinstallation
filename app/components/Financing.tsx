"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import Image from "next/image";
import CountUp from "react-countup"
import {
  Banknote,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  TrendingDown,
  CircleStar,
} from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";
import {
  financingPlans,
  financingFacts,
  FINANCING_ANCHOR,
  type FinancingPlan,
} from "../lib/content";
import { fadeUp, inView, staggerContainer } from "../lib/animations";

/*
 * Financing — two panels.
 *   Left: plan cards + reassurance facts.
 *   Right: dedicated financing-quote form (project amount, term,
 *          contact). Submits to a thank-you state; replace with a
 *          real handler when the lender API lands.
 *
 * Live monthly-payment estimate updates as the user types — the
 * "$X / month" feels like an outcome, not a calculator gimmick.
 */

const PLAN_RATE: Record<number, number> = {
  12: 0,
  24: 0.0599,
  60: 0.0899,
};

function calcMonthly(amount: number, months: number): number {
  if (!amount || amount <= 0) return 0;
  const apr = PLAN_RATE[months] ?? 0;
  if (apr === 0) return amount / months;
  const r = apr / 12;
  return (amount * r) / (1 - Math.pow(1 + r, -months));
}

export function Financing() {
  return (
    <section
      id="financing"
      className="relative isolate overflow-hidden bg-slate-950 py-28 text-stone-50 sm:py-36"
    >
      {/* Soft aurora wash — replaces the previous grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(60% 40% at 15% 25%, rgba(223,139,31,0.22), transparent 70%), radial-gradient(50% 40% at 90% 80%, rgba(31,151,177,0.22), transparent 70%), radial-gradient(40% 30% at 60% 10%, rgba(245,182,87,0.18), transparent 70%)",
        }}
      />
      {/* Top-edge highlight that ties the section into the warm cream above */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-300/40 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="grid gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20"
        >
          {/* LEFT — Plans + facts */}
          <div>
            <motion.span
              variants={fadeUp}
              className="text-xs font-medium tracking-[0.22em] text-accent-300 uppercase"
            >
              Financing made easy
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-display text-4xl leading-tight font-semibold tracking-tight sm:text-5xl"
            >
              Beautiful windows now.
              <br />
              <span className="text-accent-300">Pay over time.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-stone-300"
            >
              We partner with Greensky and Service Finance to offer{" "}
              <span className="font-semibold text-accent-300">
                0% APR for 12 months
              </span>{" "}
              for qualified buyers and low-rate plans up to 60 months.
              Pre-qualify in about two minutes — soft credit pull only,
              no impact to your score.
            </motion.p>

            <motion.div
              variants={staggerContainer}
              className="mt-10 grid gap-4 sm:grid-cols-3"
            >
              {financingPlans.map((p) => (
                <PlanCard key={p.name} plan={p} />
              ))}
            </motion.div>

            <motion.ul
              variants={staggerContainer}
              className="mt-10 space-y-3"
            >
              {financingFacts.map((f) => (
                <motion.li
                  key={f}
                  variants={fadeUp}
                  className="flex items-start gap-3 text-sm text-stone-200"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent-300"
                    strokeWidth={1.75}
                  />
                  <span>{f}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* RIGHT — Financing quote form */}
          <motion.div variants={fadeUp}>
            <FinancingQuoteForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function PlanCard({ plan }: { plan: FinancingPlan }) {
  return (
    <motion.div
      variants={fadeUp}
      className={[
        "group relative overflow-hidden rounded-xl border p-5 backdrop-blur-sm transition-all duration-500",
        plan.badge
          ? "border-accent-300/60 bg-gradient-to-br from-accent-500/20 via-slate-900/60 to-slate-950/40 shadow-[0_20px_60px_-30px_rgba(223,139,31,0.45)]"
          : "border-stone-50/15 bg-slate-900/40 hover:-translate-y-0.5 hover:border-accent-300/40",
      ].join(" ")}
    >
      {plan.badge && (
        <>
          <BorderBeam size={70} duration={8} colorFrom="#df8b1f" colorTo="#f5b657" />
          <span className="absolute left-0 top-0 inline-flex items-center gap-1 rounded-br-md rounded-tl-xl bg-accent-500 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-stone-50">
            <CircleStar className="h-2.5 w-2.5" strokeWidth={3} />
            {plan.badge}
          </span>
        </>
      )}
      <div className={cn("font-display text-base font-semibold tracking-tight text-stone-50", plan.badge && "mt-4")}>
        {plan.name}
      </div>
      <div className="mt-1 text-xs text-stone-400">
        {plan.termMonths} months · {plan.apr} APR
      </div>
      <div className="mt-5">
        <div className="flex items-baseline gap-1.5">
          <span className="font-display text-3xl font-semibold tracking-tight text-accent-300">
            {plan.monthlyAtAnchor}
          </span>
          <span className="text-xs font-normal text-stone-400">/ mo</span>
        </div>
        <div className="mt-1 text-[10px] tracking-[0.18em] uppercase text-stone-400">
          on ${(FINANCING_ANCHOR / 1000).toLocaleString()}k project
        </div>
      </div>
      <p className="mt-4 font-serif text-xs leading-relaxed text-stone-300">
        {plan.description}
      </p>
    </motion.div>
  );
}

/* ─── Form ──────────────────────────────────────────────────────── */

function FinancingQuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [amount, setAmount] = useState<string>(String(FINANCING_ANCHOR));
  const [months, setMonths] = useState<12 | 24 | 60>(24);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");

  const numericAmount = useMemo(() => {
    const n = parseFloat((amount || "").replace(/[^\d.]/g, ""));
    return isNaN(n) ? 0 : n;
  }, [amount]);

  const monthly = useMemo(
    () => calcMonthly(numericAmount, months),
    [numericAmount, months],
  );

  const canSubmit =
    numericAmount > 0 &&
    name.trim().length > 1 &&
    phone.trim().length >= 7 &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-stone-50/15 bg-stone-50 text-slate-900 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
      {/* Hero image strip */}
      <div className="relative h-32 w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80"
          alt="A bright kitchen with new energy-efficient windows"
          fill
          sizes="600px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-stone-50/30 to-transparent" />
        <div className="absolute left-6 top-5 inline-flex items-center gap-2 rounded-full bg-slate-950/80 px-3 py-1.5 text-xs font-medium tracking-tight text-stone-50 backdrop-blur">
          <Banknote className="h-3.5 w-3.5 text-accent-300" />
          Get my financing quote
        </div>
      </div>

      <div className="px-7 pb-8 sm:px-9 sm:pb-10">
        {submitted ? (
          <SubmittedState monthly={monthly} months={months} />
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!canSubmit) return;
              setSubmitted(true);
            }}
          >
            <h3 className="font-display text-2xl font-semibold tracking-tight text-slate-900">
              See your monthly payment.
            </h3>
            <p className="mt-1.5 font-serif text-sm leading-relaxed text-stone-600">
              Tell us a few details and we&apos;ll send back a personalized
              plan with no impact to your credit.
            </p>

            {/* Live payment readout */}
            <div className="mt-6 rounded-xl border border-accent-300/50 bg-accent-50/60 p-5">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-accent-700">
                  Estimated payment
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-medium tracking-tight text-stone-600">
                  <TrendingDown className="h-3 w-3 text-accent-600" />
                  Lower with same-as-cash
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-4xl font-semibold tracking-tight text-slate-900 tabular-nums">
                  {monthly > 0 ? <><CountUp end={Math.round(monthly)} duration={1}/></> : <>$—</>}
                </span>
                <span className="text-sm text-stone-600">/ month</span>
                <span className="ml-auto text-xs font-medium tracking-tight text-stone-500">
                  {months} mo · {months === 12 ? "0%" : months === 24 ? "5.99%" : "8.99%"} APR
                </span>
              </div>
            </div>

            {/* Amount */}
            <FormBlock label="Estimated project amount" htmlFor="amount">
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
                  $
                </span>
                <input
                  id="amount"
                  inputMode="numeric"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 bg-white px-9 py-3 font-display text-base text-slate-900 tabular-nums outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-300/40"
                  placeholder="15,000"
                />
              </div>
            </FormBlock>

            {/* Term */}
            <FormBlock label="Term">
              <div className="grid grid-cols-3 gap-2">
                {[12, 24, 60].map((m) => {
                  const active = months === m;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMonths(m as 12 | 24 | 60)}
                      className={[
                        "rounded-lg border px-2 py-2.5 text-sm font-semibold transition",
                        active
                          ? "border-accent-500 bg-accent-500 text-stone-50 shadow-sm"
                          : "border-stone-300 bg-white text-slate-700 hover:border-stone-400",
                      ].join(" ")}
                    >
                      {m} mo
                      <span className="ml-1 text-[10px] font-normal opacity-80">
                        ({m === 12 ? "0%" : m === 24 ? "5.99%" : "8.99%"})
                      </span>
                    </button>
                  );
                })}
              </div>
            </FormBlock>

            <div className="mt-2 grid gap-4 sm:grid-cols-2">
              <FormBlock label="Full name" htmlFor="fin-name">
                <input
                  id="fin-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-300/40"
                />
              </FormBlock>
              <FormBlock label="ZIP" htmlFor="fin-zip">
                <input
                  id="fin-zip"
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  autoComplete="postal-code"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-300/40"
                />
              </FormBlock>
            </div>

            <div className="mt-2 grid gap-4 sm:grid-cols-2">
              <FormBlock label="Phone" htmlFor="fin-phone">
                <input
                  id="fin-phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-300/40"
                />
              </FormBlock>
              <FormBlock label="Email" htmlFor="fin-email">
                <input
                  id="fin-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-300/40"
                />
              </FormBlock>
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-4 text-sm font-semibold text-stone-50 shadow-md transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-stone-300"
            >
              Send my financing quote
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-stone-500">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-stone-400" strokeWidth={1.75} />
              Soft-credit pre-qualification only. We never share your details with
              third parties. Final terms subject to lender approval.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function FormBlock({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-[11px] font-medium tracking-[0.18em] uppercase text-stone-500"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function SubmittedState({
  monthly,
  months,
}: {
  monthly: number;
  months: number;
}) {
  return (
    <div className="flex flex-col items-start pt-2">
      <CheckCircle2 className="h-10 w-10 text-accent-500" strokeWidth={1.5} />
      <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-slate-900">
        You&apos;re pre-qualified to apply.
      </h3>
      <p className="mt-3 font-serif text-base leading-relaxed text-stone-700">
        Your estimated payment is{" "}
        <span className="font-semibold text-slate-900">
          ${Math.round(monthly).toLocaleString()} / month
        </span>{" "}
        over {months} months. We&apos;ll text and email a secure
        application link within one business hour — usually faster.
      </p>
      <a
        href="#quote"
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-stone-50 transition-colors hover:bg-slate-700"
      >
        Schedule my in-home quote next
        <ChevronRight className="h-4 w-4" />
      </a>
    </div>
  );
}
