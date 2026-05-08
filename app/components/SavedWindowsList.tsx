"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { useWindowList, type SavedWindow } from "../lib/WindowListContext";
import { findWindowType } from "../lib/windowTypes";
import { labelFor, sectionsForType } from "../lib/windowOptions";
import { fadeUp, inView, staggerContainer } from "../lib/animations";

/*
 * SavedWindowsList
 *
 * Reads from WindowListContext and renders each saved spec as a card.
 * Two presentations:
 *   - variant="full"    standalone page view (with edit/delete actions)
 *   - variant="compact" inline summary used inside the lead form
 */

export function SavedWindowsList({
  variant = "full",
}: {
  variant?: "full" | "compact";
}) {
  const { items, hydrated, remove } = useWindowList();

  if (!hydrated) {
    return (
      <div className="rounded-sm border border-stone-200 bg-white p-6 text-sm text-stone-500">
        Loading your saved windows…
      </div>
    );
  }

  if (items.length === 0) {
    return <EmptyState variant={variant} />;
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className={
        variant === "full"
          ? "grid gap-4 sm:grid-cols-2"
          : "space-y-3"
      }
    >
      <AnimatePresence initial={false}>
        {items.map((item) => (
          <SavedCard
            key={item.id}
            item={item}
            variant={variant}
            onRemove={() => remove(item.id)}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

function EmptyState({ variant }: { variant: "full" | "compact" }) {
  if (variant === "compact") {
    return (
      <div className="rounded-sm border border-dashed border-stone-300 bg-stone-50 px-4 py-5 text-sm text-stone-600">
        <p className="font-medium text-slate-900">No windows saved yet.</p>
        <p className="mt-1 font-serif text-xs">
          You can still send a quote request — or{" "}
          <Link
            href="/#window-types"
            className="font-medium text-accent-600 hover:underline"
          >
            spec a window first
          </Link>{" "}
          and we&apos;ll include the details.
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-start rounded-sm border border-dashed border-stone-300 bg-white p-10">
      <p className="font-display text-xl font-semibold tracking-tight text-slate-900">
        Nothing saved yet.
      </p>
      <p className="mt-2 max-w-md font-serif text-sm leading-relaxed text-stone-600">
        Pick a window type from the catalog and configure it — every
        save lands here. The list survives a refresh and follows you to
        the quote form when you&apos;re ready.
      </p>
      <Link
        href="/#window-types"
        className="mt-6 inline-flex items-center gap-2 rounded-sm bg-slate-900 px-5 py-3 text-sm font-semibold text-stone-50 transition-colors hover:bg-accent-600"
      >
        Browse window types
      </Link>
    </div>
  );
}

function SavedCard({
  item,
  variant,
  onRemove,
}: {
  item: SavedWindow;
  variant: "full" | "compact";
  onRemove: () => void;
}) {
  const wt = findWindowType(item.slug);
  if (!wt) return null;
  const Preview = wt.Preview;

  /* Pull a short list of "headline" details for the card preview. */
  const sections = sectionsForType(item.slug);
  const flat = sections.flatMap((s) => s.options);
  const detail = (id: string) => {
    const opt = flat.find((o) => o.id === id);
    if (!opt) return null;
    const raw = item.spec[id];
    if (raw === undefined || raw === "") return null;
    if (opt.kind === "select") return labelFor(id, raw);
    if (opt.kind === "number")
      return `${raw}${opt.unit ? ` ${opt.unit}` : ""}`;
    if (opt.kind === "toggle") return raw ? "Yes" : null;
    return String(raw);
  };

  const dims = `${detail("width") ?? "—"} × ${detail("height") ?? "—"}`;
  const room = detail("room");
  const qty = detail("quantity");
  const frame = detail("frameMaterial");
  const glass = detail("glassPackage");
  const grille = detail("grillePattern");

  if (variant === "compact") {
    return (
      <motion.div
        variants={fadeUp}
        layout
        exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
        className="flex items-center gap-4 rounded-sm border border-stone-200 bg-white px-4 py-3"
      >
        <div className="h-10 w-8 shrink-0 text-slate-700">
          <Preview className="h-full w-full" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-900">
            {wt.name} · {dims}
          </p>
          <p className="truncate font-serif text-xs text-stone-600">
            {[qty && `${qty}×`, room, frame, glass]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${wt.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-stone-100 hover:text-slate-900"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeUp}
      layout
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
      className="group flex flex-col rounded-sm border border-stone-200 bg-white p-6 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-12 shrink-0 text-slate-700">
            <Preview className="h-full w-full" />
          </div>
          <div>
            <p className="text-xs font-medium tracking-[0.22em] text-accent-600 uppercase">
              {wt.name}
            </p>
            <p className="mt-1 font-display text-lg font-semibold tracking-tight text-slate-900">
              {dims}
              {qty && Number(qty) > 1 ? (
                <span className="ml-2 font-serif text-sm font-normal text-stone-500">
                  × {qty}
                </span>
              ) : null}
            </p>
            {detail("label") && (
              <p className="mt-0.5 font-serif text-sm italic text-stone-500">
                {detail("label")}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Link
            href={`/design/${item.slug}?edit=${item.id}`}
            aria-label="Edit"
            className="flex h-9 w-9 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-100 hover:text-slate-900"
          >
            <Pencil className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove"
            className="flex h-9 w-9 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-stone-100 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-stone-200 pt-4 text-sm">
        {[
          ["Room", room],
          ["Frame", frame],
          ["Glass", glass],
          ["Grilles", grille],
        ].map(([label, value]) => (
          <div key={label} className="flex flex-col">
            <dt className="font-serif text-xs uppercase tracking-wider text-stone-500">
              {label}
            </dt>
            <dd className="mt-0.5 truncate text-slate-900">{value ?? "—"}</dd>
          </div>
        ))}
      </dl>
    </motion.div>
  );
}

/* Helper used by the lead form to serialize the list into a textarea. */
export function serializeSavedList(items: SavedWindow[]): string {
  if (items.length === 0) return "";
  return items
    .map((item, i) => {
      const wt = findWindowType(item.slug);
      const sections = sectionsForType(item.slug);
      const flat = sections.flatMap((s) => s.options);
      const lines = flat
        .map((opt) => {
          const raw = item.spec[opt.id];
          if (raw === undefined || raw === "") return null;
          let value: string;
          if (opt.kind === "select") value = labelFor(opt.id, raw);
          else if (opt.kind === "toggle")
            value = raw ? "Yes" : "No";
          else if (opt.kind === "number")
            value = `${raw}${opt.unit ? ` ${opt.unit}` : ""}`;
          else value = String(raw);
          return `  ${opt.label}: ${value}`;
        })
        .filter(Boolean)
        .join("\n");
      return `#${i + 1} ${wt?.name ?? item.slug}\n${lines}`;
    })
    .join("\n\n");
}
