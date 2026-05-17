import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Approach } from "./components/Approach";
import { Services } from "./components/Services";
import { Doors } from "./components/Doors";
import { Pricing } from "./components/Pricing";
import { Financing } from "./components/Financing";
import { OldWindows } from "./components/OldWindows";
import { UsVsThem } from "./components/UsVsThem";
import { Projects } from "./components/Projects";
import { FAQ } from "./components/FAQ";
import { LeadForm } from "./components/LeadForm";
import { TrustSignals } from "./components/TrustSignals";
import { Footer } from "./components/Footer";

/*
 * Landing page composition.
 *
 * Stays a Server Component — every interactive section declares its
 * own `"use client"` boundary so JS only ships where it's needed.
 *
 * Section order is a narrative:
 *   Hero            → Why us, fast
 *   Approach        → How easy this is
 *   OldWindows      → Why you'd replace at all (education)
 *   Services        → What we install (windows)
 *   Doors           → What we install (doors)
 *   Pricing         → Straightforward tiers
 *   Financing       → Affordability + financing quote form
 *   UsVsThem        → How we differ from volume contractors
 *   Projects        → Proof
 *   FAQ             → Objection handling
 *   LeadForm        → Free in-home quote conversion
 *   TrustSignals    → Reviews
 */

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <Hero />
        <Approach />
        <OldWindows />
        <Services />
        <Doors />
        <Pricing />
        <Financing />
        <UsVsThem />
        <Projects />
        <FAQ />
        <LeadForm />
        <TrustSignals />
      </main>
      <Footer />
    </>
  );
}
