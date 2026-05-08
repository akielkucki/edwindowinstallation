import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronLeft } from "lucide-react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { WindowDesigner } from "../../components/WindowDesigner";
import { WindowAnatomy } from "../../components/WindowAnatomy";
import { findWindowType, windowTypes } from "../../lib/windowTypes";

/*
 * /design/[slug]
 *
 * One dynamic route serves every window type — generateStaticParams
 * pre-renders the eight known slugs at build time, and any unknown
 * slug 404s. Page composes:
 *
 *   1. Hero — name, tagline, elevation drawing
 *   2. WindowDesigner — interactive customization panel
 *   3. WindowAnatomy — labeled cross-section
 */

export function generateStaticParams() {
  return windowTypes.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata(
  props: PageProps<"/design/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const wt = findWindowType(slug);
  if (!wt) return { title: "Design — ED Window Installations" };
  return {
    title: `Design a ${wt.name} window — ED Window Installations`,
    description: wt.description,
  };
}

export default async function DesignWindowPage(
  props: PageProps<"/design/[slug]">,
) {
  const { slug } = await props.params;
  const windowType = findWindowType(slug);
  if (!windowType) notFound();

  const Preview = windowType.Preview;

  return (
    <>
      <Header />
      <main className="flex flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden bg-stone-50 pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Link
              href="/#window-types"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 transition-colors hover:text-slate-900"
            >
              <ChevronLeft className="h-4 w-4" />
              All window types
            </Link>

            <div className="mt-8 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
              <div>
                <span className="text-xs font-medium tracking-[0.22em] text-accent-600 uppercase">
                  {windowType.name} · Design
                </span>
                <h1 className="mt-4 font-display text-5xl leading-[1.05] font-semibold tracking-tight text-slate-900 sm:text-6xl">
                  {windowType.tagline}
                </h1>
                <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-stone-700">
                  {windowType.description}
                </p>
                <p className="mt-8 font-serif text-sm leading-relaxed text-stone-600">
                  <span className="font-medium text-slate-900">Best for: </span>
                  {windowType.bestFor}
                </p>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="relative w-full max-w-[280px] rounded-sm border border-stone-200 bg-white p-8 shadow-sm">
                  <Preview className="h-72 w-full text-slate-700" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Designer */}
        <section className="bg-stone-100 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Suspense fallback={<DesignerSkeleton />}>
              <WindowDesigner slug={windowType.slug} />
            </Suspense>
          </div>
        </section>

        {/* Anatomy */}
        <section className="bg-stone-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <WindowAnatomy slug={windowType.slug} />
          </div>
        </section>

        {/* Available product lines (re-uses the catalog data) */}
        <section className="border-t border-stone-200 bg-white py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div className="max-w-xl">
                <span className="text-xs font-medium tracking-[0.22em] text-accent-600 uppercase">
                  Product lines
                </span>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  {windowType.name} lines we install
                </h2>
                <p className="mt-3 font-serif text-sm leading-relaxed text-stone-600">
                  Note your preferred line in the configurator notes if
                  you have one in mind — we&apos;ll spec the matching
                  product on the formal estimate.
                </p>
              </div>
              <Link
                href="/#quote"
                className="inline-flex items-center gap-1.5 rounded-sm bg-slate-900 px-5 py-3 text-sm font-semibold text-stone-50 transition-colors hover:bg-accent-600"
              >
                Send me a quote
              </Link>
            </div>

            <ul className="mt-10 grid gap-px overflow-hidden rounded-sm bg-stone-200 sm:grid-cols-2 lg:grid-cols-4">
              {windowType.products.map((p) => (
                <li
                  key={p.name}
                  className="flex h-full flex-col bg-stone-50 p-6"
                >
                  <p className="font-display text-base font-semibold tracking-tight text-slate-900">
                    {p.name}
                  </p>
                  <p className="mt-1 font-serif text-sm text-stone-600">
                    {p.line}
                  </p>
                  <span className="mt-auto inline-flex w-fit items-center rounded-full border border-stone-300 px-2 py-0.5 pt-1 text-[10px] font-medium tracking-[0.15em] text-stone-600 uppercase">
                    {p.tier}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function DesignerSkeleton() {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-6">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-48 animate-pulse rounded-sm border border-stone-200 bg-white"
          />
        ))}
      </div>
      <div className="h-96 animate-pulse rounded-sm border border-stone-200 bg-white" />
    </div>
  );
}
