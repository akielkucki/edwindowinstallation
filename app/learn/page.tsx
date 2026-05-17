import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Layers,
  Thermometer,
  Sun,
  Volume2,
  Shield,
  Wind,
  AlertTriangle,
  Wrench,
} from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Learn about windows — ED Window Installations",
  description:
    "A plain-English guide to how modern windows work, what the ratings mean, and the signs your home is ready for replacement.",
};

const ratings = [
  {
    icon: Thermometer,
    label: "U-Factor",
    body: "Measures how well a window keeps heat in. Lower is better. Most modern double-pane Low-E windows fall between 0.27 and 0.32.",
  },
  {
    icon: Sun,
    label: "SHGC",
    body: "Solar Heat Gain Coefficient — how much sun-heat passes through. Lower numbers cool a sun-exposed room; higher numbers help passive solar in shaded northern rooms.",
  },
  {
    icon: Layers,
    label: "VT",
    body: "Visible Transmittance — how much daylight comes through. Higher VT means a brighter room without turning on lights during the day.",
  },
  {
    icon: Wind,
    label: "Air Leakage",
    body: "Cubic feet of air per minute squeezing past the seals. Anything under 0.30 is excellent. Old single-pane windows often clock in 5–10x higher.",
  },
];

const anatomy = [
  {
    title: "Frame & sash",
    body: "The skeleton of the window. Modern frames use multi-chambered vinyl, fiberglass, or wood-clad construction with foam-filled cavities — far stiffer and more insulating than a hollow aluminum frame from the 1970s.",
  },
  {
    title: "Insulated glass unit (IGU)",
    body: "Two or three panes of glass sealed around a warm-edge spacer with argon or krypton gas in the cavities. The gas is denser than air, so it slows heat transfer between panes.",
  },
  {
    title: "Low-E coating",
    body: "A microscopically thin metallic layer on one of the glass surfaces. It's invisible, it doesn't tint the view, and it reflects radiant heat — keeping winter warmth in and summer sun out.",
  },
  {
    title: "Weatherstripping & seals",
    body: "Triple weatherstripping around every operable sash, plus a continuous flexible seal at the meeting rail. This is what kills the drafts you used to feel from the couch.",
  },
];

const signs = [
  {
    icon: AlertTriangle,
    title: "Condensation between the panes",
    body: "Fog or moisture trapped inside the IGU means the seal has failed. The window is no longer insulating — it's just two panes of glass.",
  },
  {
    icon: Wind,
    title: "Drafts when the window is closed",
    body: "Hold a candle near the perimeter on a windy day. If the flame moves, the weatherstripping is shot.",
  },
  {
    icon: Volume2,
    title: "You hear traffic in the bedroom",
    body: "Modern dual- and triple-pane glass cuts perceived outside noise dramatically. If your house is loud inside, the windows are working against you.",
  },
  {
    icon: Wrench,
    title: "Sashes that stick or won't lock",
    body: "Painted shut, broken balances, warped frames — beyond annoying, this is a fire-egress and security issue.",
  },
  {
    icon: Shield,
    title: "Visible rot, soft sills, or peeling paint",
    body: "Once water has gotten into the frame, you're losing structure on top of energy. Replacement is cheaper than the slow repair cycle.",
  },
  {
    icon: Thermometer,
    title: "Heating bills that climb every winter",
    body: "Old windows degrade slowly. If your bills keep creeping while your habits stay the same, the envelope is the most likely culprit.",
  },
];

export default function LearnPage() {
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
                Learn
              </span>
              <h1 className="mt-3 font-display text-4xl leading-tight font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Windows, in plain English.
              </h1>
              <p className="mt-6 font-serif text-lg leading-relaxed text-stone-700">
                Replacement windows are one of the biggest upgrades most
                homeowners ever make to their house — and the industry loves
                to bury the decision in jargon. This page is the opposite of
                that. Here&apos;s what&apos;s actually inside a modern window,
                what the ratings mean, and how to tell when yours have given up.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <div className="max-w-2xl">
              <span className="text-xs font-medium tracking-[0.22em] text-accent-600 uppercase">
                What&apos;s inside
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Anatomy of a modern window.
              </h2>
              <p className="mt-5 font-serif text-base leading-relaxed text-stone-700">
                A window is a system, not a sheet of glass. Four components do
                the heavy lifting:
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {anatomy.map((part) => (
                <article
                  key={part.title}
                  className="rounded-sm border border-stone-200 bg-stone-50 p-7"
                >
                  <h3 className="font-display text-lg font-semibold tracking-tight text-slate-900">
                    {part.title}
                  </h3>
                  <p className="mt-3 font-serif text-base leading-relaxed text-stone-700">
                    {part.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-24 text-stone-50 sm:py-28">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <div className="max-w-2xl">
              <span className="text-xs font-medium tracking-[0.22em] text-accent-300 uppercase">
                The ratings that matter
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Four numbers on the NFRC sticker.
              </h2>
              <p className="mt-5 font-serif text-base leading-relaxed text-stone-300">
                Every window sold in the US carries a National Fenestration
                Rating Council label. Here&apos;s what those numbers mean for
                your house.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {ratings.map((r) => {
                const Icon = r.icon;
                return (
                  <article
                    key={r.label}
                    className="rounded-sm border border-stone-50/10 bg-slate-900/40 p-7"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-accent-500/15 text-accent-300 ring-1 ring-accent-300/40">
                        <Icon className="h-5 w-5" strokeWidth={1.5} />
                      </span>
                      <h3 className="font-display text-lg font-semibold tracking-tight">
                        {r.label}
                      </h3>
                    </div>
                    <p className="mt-4 font-serif text-base leading-relaxed text-stone-300">
                      {r.body}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-stone-100 py-24 sm:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <div className="max-w-2xl">
              <span className="text-xs font-medium tracking-[0.22em] text-accent-600 uppercase">
                Time to replace?
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Six signs your windows are done.
              </h2>
              <p className="mt-5 font-serif text-base leading-relaxed text-stone-700">
                Old windows rarely fail dramatically. They just slowly cost you
                more every month. If two or more of these match your house,
                it&apos;s probably time.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {signs.map((sign) => {
                const Icon = sign.icon;
                return (
                  <article
                    key={sign.title}
                    className="rounded-sm border border-stone-200 bg-white p-7"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-accent-500/10 text-accent-600 ring-1 ring-accent-300/40">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-slate-900">
                      {sign.title}
                    </h3>
                    <p className="mt-3 font-serif text-sm leading-relaxed text-stone-600">
                      {sign.body}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-stone-50 py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Ready to talk specifics?
            </h2>
            <p className="mt-5 font-serif text-base leading-relaxed text-stone-700">
              We&apos;ll walk your house, measure every opening, and recommend
              the right window for each room — no upsell, no scripted pitch.
            </p>
            <Link
              href="/#quote"
              className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-stone-50 transition-colors duration-300 hover:bg-slate-700"
            >
              Request a quote
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
