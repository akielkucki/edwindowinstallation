"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Check, ChevronRight, Plus } from "lucide-react";
import {
  fadeUp,
  inView,
  staggerContainer,
} from "../lib/animations";
import { inputClass, selectClass } from "./Field";
import { useWindowList } from "../lib/WindowListContext";
import {
  defaultSpecForType,
  labelFor,
  sectionsForType,
  type SpecValues,
} from "../lib/windowOptions";
import { findWindowType, type WindowType } from "../lib/windowTypes";

/*
 * WindowDesigner
 *
 * Type-aware customization panel. Reads the option schema for the
 * passed-in window type, renders inputs for every applicable option,
 * and on submit persists the result through the WindowListContext.
 *
 * Edit mode: ?edit=<savedId> in the URL pre-fills with that saved
 * item's spec and the Add button becomes Update. The same component
 * powers both because the form state shape is identical.
 */

export function WindowDesigner({ slug }: { slug: WindowType["slug"] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const windowType = findWindowType(slug);
  const { items, hydrated, add, update } = useWindowList();
  const editing = useMemo(
    () => (editId ? items.find((i) => i.id === editId) : undefined),
    [editId, items],
  );

  const sections = useMemo(() => sectionsForType(slug), [slug]);

  if (!windowType) return null;

  /* Form state. We initialize from defaults; if we land on an edit URL
     we sync the editing item's spec in once it's available (the list
     hydrates from localStorage on the client). */
  const [spec, setSpec] = useState<SpecValues>(() => defaultSpecForType(slug));
  const [justSavedId, setJustSavedId] = useState<string | null>(null);

  useEffect(() => {
    if (!hydrated) return;
    if (editing) {
      setSpec({ ...defaultSpecForType(slug), ...editing.spec });
    }
  }, [hydrated, editing, slug]);

  function setField(id: string, value: SpecValues[string]) {
    setSpec((prev) => ({ ...prev, [id]: value }));
  }

  function onSave() {
    if (editing) {
      update(editing.id, spec);
      setJustSavedId(editing.id);
    } else {
      const item = add(slug, spec);
      setJustSavedId(item.id);
      /* Reset form so they can add another of the same type quickly. */
      setSpec(defaultSpecForType(slug));
    }
  }

  /* If they save while in edit mode, return them to the list view. */
  useEffect(() => {
    if (justSavedId && editing) {
      const t = setTimeout(() => router.push("/design"), 700);
      return () => clearTimeout(t);
    }
  }, [justSavedId, editing, router]);

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className="relative"
    >
      <motion.div variants={fadeUp} className="max-w-2xl">
        <span className="text-xs font-medium tracking-[0.22em] text-accent-600 uppercase">
          Configure
        </span>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Spec it the way you want it.
        </h2>
        <p className="mt-4 font-serif text-base leading-relaxed text-stone-700">
          Walk through every choice we&apos;d ask you about during a
          consultation. Save as many windows as you have to spec — when
          you&apos;re ready for a quote, the whole list comes with you.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Form */}
        <motion.div variants={fadeUp} className="space-y-10">
          {sections.map((section) => (
            <section
              key={section.id}
              className="rounded-sm border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <header className="border-b border-stone-200 pb-4">
                <h3 className="font-display text-lg font-semibold tracking-tight text-slate-900">
                  {section.title}
                </h3>
                {section.blurb && (
                  <p className="mt-1.5 font-serif text-sm text-stone-600">
                    {section.blurb}
                  </p>
                )}
              </header>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {section.options.map((opt) => {
                  if (opt.kind === "select") {
                    return (
                      <DesignerField
                        key={opt.id}
                        label={opt.label}
                        hint={opt.hint}
                        htmlFor={opt.id}
                      >
                        <select
                          id={opt.id}
                          value={String(spec[opt.id] ?? opt.defaultValue)}
                          onChange={(e) => setField(opt.id, e.target.value)}
                          className={selectClass}
                        >
                          {opt.choices.map((c) => (
                            <option key={c.value} value={c.value}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                      </DesignerField>
                    );
                  }

                  if (opt.kind === "number") {
                    return (
                      <DesignerField
                        key={opt.id}
                        label={
                          opt.unit ? `${opt.label} (${opt.unit})` : opt.label
                        }
                        hint={opt.hint}
                        htmlFor={opt.id}
                      >
                        <input
                          id={opt.id}
                          type="number"
                          inputMode="decimal"
                          min={opt.min}
                          max={opt.max}
                          step={opt.step ?? 1}
                          value={Number(spec[opt.id] ?? opt.defaultValue)}
                          onChange={(e) =>
                            setField(opt.id, Number(e.target.value))
                          }
                          className={inputClass}
                        />
                      </DesignerField>
                    );
                  }

                  if (opt.kind === "text") {
                    return (
                      <DesignerField
                        key={opt.id}
                        label={opt.label}
                        hint={opt.hint}
                        htmlFor={opt.id}
                        wide
                      >
                        <input
                          id={opt.id}
                          type="text"
                          placeholder={opt.placeholder}
                          value={String(spec[opt.id] ?? "")}
                          onChange={(e) => setField(opt.id, e.target.value)}
                          className={inputClass}
                        />
                      </DesignerField>
                    );
                  }

                  /* toggle */
                  return (
                    <DesignerField
                      key={opt.id}
                      label={opt.label}
                      hint={opt.hint}
                      htmlFor={opt.id}
                      wide
                    >
                      <label
                        htmlFor={opt.id}
                        className="flex cursor-pointer items-center gap-3 rounded-sm border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-slate-800 transition-colors hover:border-stone-300 has-[:checked]:border-accent-500 has-[:checked]:bg-accent-50 has-[:checked]:text-slate-900"
                      >
                        <input
                          id={opt.id}
                          type="checkbox"
                          checked={Boolean(spec[opt.id] ?? false)}
                          onChange={(e) => setField(opt.id, e.target.checked)}
                          className="h-4 w-4 accent-accent-500"
                        />
                        Yes — include
                      </label>
                    </DesignerField>
                  );
                })}
              </div>
            </section>
          ))}
        </motion.div>

        {/* Summary rail */}
        <motion.aside variants={fadeUp} className="lg:sticky lg:top-32 lg:self-start">
          <SummaryCard
            windowType={windowType}
            spec={spec}
            editing={!!editing}
            onSave={onSave}
            justSavedId={justSavedId}
            onDismissSave={() => setJustSavedId(null)}
          />
        </motion.aside>
      </div>
    </motion.section>
  );
}

/* ── Field wrapper ──────────────────────────────────────────────── */

function DesignerField({
  label,
  hint,
  htmlFor,
  wide,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-2 ${wide ? "sm:col-span-2" : ""}`}>
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium tracking-tight text-slate-900"
      >
        {label}
      </label>
      {children}
      {hint && (
        <p className="font-serif text-xs leading-relaxed text-stone-500">
          {hint}
        </p>
      )}
    </div>
  );
}

/* ── Summary rail ───────────────────────────────────────────────── */

function SummaryCard({
  windowType,
  spec,
  editing,
  onSave,
  justSavedId,
  onDismissSave,
}: {
  windowType: WindowType;
  spec: SpecValues;
  editing: boolean;
  onSave: () => void;
  justSavedId: string | null;
  onDismissSave: () => void;
}) {
  const Preview = windowType.Preview;
  const sections = useMemo(
    () => sectionsForType(windowType.slug),
    [windowType.slug],
  );

  /* Collapse the spec back to display rows in section order. */
  const rows = useMemo(() => {
    const out: { label: string; value: string }[] = [];
    for (const section of sections) {
      for (const opt of section.options) {
        const raw = spec[opt.id];
        if (raw === undefined || raw === "") continue;
        let value: string;
        if (opt.kind === "select") {
          value = labelFor(opt.id, raw);
        } else if (opt.kind === "toggle") {
          if (!raw) continue;
          value = "Included";
        } else if (opt.kind === "number") {
          value = `${raw}${opt.unit ? ` ${opt.unit}` : ""}`;
        } else {
          value = String(raw);
        }
        out.push({ label: opt.label, value });
      }
    }
    return out;
  }, [sections, spec]);

  return (
    <div className="rounded-sm border border-stone-200 bg-white shadow-sm">
      <div className="flex items-center gap-4 border-b border-stone-200 px-6 py-5">
        <div className="h-16 w-12 shrink-0 text-slate-700">
          <Preview className="h-full w-full" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-[0.22em] text-accent-600 uppercase">
            Your spec
          </p>
          <p className="truncate font-display text-base font-semibold tracking-tight text-slate-900">
            {windowType.name}
          </p>
        </div>
      </div>

      <dl className="divide-y divide-stone-200 px-6 py-2 text-sm">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-4 py-2.5">
            <dt className="font-serif text-stone-500">{row.label}</dt>
            <dd className="text-right font-medium text-slate-900">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="border-t border-stone-200 p-6">
        <button
          type="button"
          onClick={onSave}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-sm bg-slate-900 px-5 py-3.5 text-sm font-semibold text-stone-50 transition-all duration-300 hover:bg-accent-600"
        >
          {editing ? (
            <>
              <Check className="h-4 w-4" />
              Update saved window
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Add to my list
            </>
          )}
        </button>

        <Link
          href="/design"
          className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-sm border border-stone-200 px-5 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-stone-100"
        >
          View saved list
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <AnimatePresence>
        {justSavedId && (
          <motion.div
            key={justSavedId}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onAnimationComplete={() => {
              if (!editing) {
                /* For new adds, auto-dismiss the toast after a moment. */
                window.setTimeout(onDismissSave, 1800);
              }
            }}
            className="mx-6 mb-6 flex items-center gap-3 rounded-sm border border-accent-300 bg-accent-50 px-4 py-3 text-sm text-slate-900"
          >
            <Check className="h-4 w-4 text-accent-600" />
            <span>
              {editing ? "Updated — taking you to your list…" : "Saved to your list."}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
