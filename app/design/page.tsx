import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SavedWindowsList } from "../components/SavedWindowsList";

/*
 * /design
 *
 * Index page for everything the customer has saved during a session.
 * Server-rendered shell — the list itself is a client component that
 * reads from WindowListContext (localStorage-backed).
 */

export const metadata: Metadata = {
  title: "Your saved windows — ED Window Installations",
  description:
    "Review the windows you've configured. Edit specs, add more, or send the whole list with your quote request.",
};

export default function DesignIndexPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <section className="bg-stone-50 pt-32 pb-12 sm:pt-40 sm:pb-16">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <Link
              href="/#window-types"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 transition-colors hover:text-slate-900"
            >
              <ChevronLeft className="h-4 w-4" />
              Browse window types
            </Link>

            <div className="mt-8">
              <span className="text-xs font-medium tracking-[0.22em] text-accent-600 uppercase">
                Your list
              </span>
              <h1 className="mt-3 font-display text-4xl leading-tight font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Saved windows.
              </h1>
              <p className="mt-4 max-w-2xl font-serif text-base leading-relaxed text-stone-700">
                Every window you configure lives here until you send it.
                Edit any one to change a spec, remove anything you change
                your mind on, then head over to the quote form whenever
                you&apos;re ready — we&apos;ll bring this list along.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-stone-50 pb-24 sm:pb-32">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <SavedWindowsList variant="full" />

            <div className="mt-12 flex flex-col items-start gap-3 border-t border-stone-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-serif text-sm text-stone-600">
                Done configuring? Send the list with your quote request.
              </p>
              <Link
                href="/#quote"
                className="group inline-flex items-center gap-2 rounded-sm bg-slate-900 px-5 py-3 text-sm font-semibold text-stone-50 transition-colors duration-300 hover:bg-accent-600"
              >
                Continue to quote
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
