import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronLeft,
  ShieldCheck,
  Sparkles,
  Wrench,
  Phone,
  CalendarClock,
  CheckCircle2,
} from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Care & Warranty — ED Window Installations",
  description:
    "How to keep your new windows looking and performing their best, plus the details of our 5-year workmanship warranty.",
};

const careTips = [
  {
    icon: Sparkles,
    title: "Clean glass twice a year",
    body: "A microfiber cloth and a 50/50 mix of distilled water and white vinegar is all you need. Avoid ammonia cleaners on Low-E coated glass — they degrade the coating over time.",
  },
  {
    icon: Wrench,
    title: "Lubricate moving parts annually",
    body: "A drop of dry silicone (not WD-40, not grease) on tracks, hinges, and locking points each spring keeps every sash gliding the way it did the day we installed it.",
  },
  {
    icon: ShieldCheck,
    title: "Inspect weatherstripping every fall",
    body: "Run your hand along the perimeter seal. If it feels brittle, cracked, or you can see daylight, call us — replacements are inexpensive and we keep them in stock.",
  },
  {
    icon: CalendarClock,
    title: "Vacuum tracks each season",
    body: "Dirt and grit in the tracks is the #1 cause of premature roller and balance wear. Two minutes with a brush attachment keeps the mechanism alive for decades.",
  },
];

const warrantyHighlights = [
  "5-year workmanship warranty on every install we perform",
  "Covers shimming, flashing, fastening, and weather sealing",
  "Lifetime manufacturer warranty on glass seal failure (transferable on most product lines)",
  "20-year warranty on vinyl frames and welded corners",
  "10-year warranty on hardware, balances, and locks",
  "Free first-year tune-up visit on any whole-house install",
];

export default function CarePage() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <section className="bg-stone-50 pt-32 pb-12 sm:pt-40 sm:pb-16">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 transition-colors hover:text-slate-900"
            >
              <ChevronLeft className="h-4 w-4" />
              Back home
            </Link>

            <div className="mt-8 max-w-3xl">
              <span className="text-xs font-medium tracking-[0.22em] text-accent-600 uppercase">
                Care &amp; Warranty
              </span>
              <h1 className="mt-3 font-display text-4xl leading-tight font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Built to last. Backed for years.
              </h1>
              <p className="mt-6 font-serif text-lg leading-relaxed text-stone-700">
                Our windows and doors are engineered for decades of trouble-free
                operation — but a few simple habits keep them looking and
                performing like the day they went in. And every install we do is
                covered by our 5-year workmanship warranty, on top of the
                manufacturer&apos;s product warranty.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <div className="max-w-2xl">
              <span className="text-xs font-medium tracking-[0.22em] text-accent-600 uppercase">
                Care guide
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Four habits that add a decade of life.
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {careTips.map((tip) => {
                const Icon = tip.icon;
                return (
                  <article
                    key={tip.title}
                    className="rounded-sm border border-stone-200 bg-stone-50 p-7"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-accent-500/10 text-accent-600 ring-1 ring-accent-300/40">
                        <Icon className="h-5 w-5" strokeWidth={1.5} />
                      </span>
                      <h3 className="font-display text-lg font-semibold tracking-tight text-slate-900">
                        {tip.title}
                      </h3>
                    </div>
                    <p className="mt-4 font-serif text-base leading-relaxed text-stone-700">
                      {tip.body}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-24 text-stone-50 sm:py-28">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
              <div>
                <span className="text-xs font-medium tracking-[0.22em] text-accent-300 uppercase">
                  Our promise
                </span>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  5-year workmanship warranty.
                </h2>
                <p className="mt-6 font-serif text-base leading-relaxed text-stone-300">
                  If anything we did with our hands fails inside five years —
                  a leak around a flashed sill, a shim that settled, a piece of
                  trim that pulled away — we come back and make it right at no
                  cost. No deductible. No fine print. No phone tree.
                </p>
                <a
                  href="tel:+15555550123"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-stone-50 transition-colors duration-300 hover:bg-accent-600"
                >
                  <Phone className="h-4 w-4" strokeWidth={2} />
                  Call us — (555) 555-0123
                </a>
              </div>

              <ul className="flex flex-col gap-4">
                {warrantyHighlights.map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-3 rounded-sm border border-stone-50/10 bg-slate-900/40 p-5"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 flex-none text-accent-300"
                      strokeWidth={1.75}
                    />
                    <span className="font-serif text-base leading-relaxed text-stone-200">
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-stone-50 py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Have a question about a window we installed?
            </h2>
            <p className="mt-5 font-serif text-base leading-relaxed text-stone-700">
              We answer the phone. We answer email. If something isn&apos;t right,
              we want to know — and we&apos;ll come look at it.
            </p>
            <Link
              href="/#quote"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-stone-50 transition-colors duration-300 hover:bg-slate-700"
            >
              Get in touch
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
