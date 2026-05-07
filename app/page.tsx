import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Approach } from "./components/Approach";
import { Services } from "./components/Services";
import { Projects } from "./components/Projects";
import { LeadForm } from "./components/LeadForm";
import { TrustSignals } from "./components/TrustSignals";
import { Footer } from "./components/Footer";
import {WindowPreviews} from "@/app/components/WiindowPreviews";

/*
 * Landing page composition.
 *
 * This file stays a Server Component — every interactive section
 * declares its own `"use client"` boundary so JS only ships where it's
 * actually needed.
 */

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <Hero />
        <Approach />
          <WindowPreviews/>
        <Services />
        <Projects />
        <LeadForm />
        <TrustSignals />
      </main>
      <Footer />
    </>
  );
}
