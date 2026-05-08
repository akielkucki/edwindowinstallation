"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { SpecValues } from "./windowOptions";
import type { WindowTypeSlug } from "./windowTypes";

/*
 * WindowListContext
 *
 * Customer's saved-window list. Persisted to localStorage so a refresh
 * (or coming back tomorrow) doesn't lose work, and exposed via context
 * so the lead-form on the homepage can pull the same list when the
 * user finally sends a quote request.
 *
 * The shape is intentionally generic — `spec` is `SpecValues` — so
 * adding a new option in windowOptions.ts doesn't require touching this
 * file. Stored items also carry a snapshot of their createdAt timestamp
 * so old saved items can be sorted / aged-out without inferring it.
 */

export type SavedWindow = {
  id: string;
  slug: WindowTypeSlug;
  createdAt: number;
  spec: SpecValues;
};

type WindowListContextValue = {
  items: SavedWindow[];
  hydrated: boolean;
  add: (slug: WindowTypeSlug, spec: SpecValues) => SavedWindow;
  update: (id: string, spec: SpecValues) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "ed-window-list-v1";

const WindowListContext = createContext<WindowListContextValue | null>(null);

function makeId() {
  return `w_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function readFromStorage(): SavedWindow[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as SavedWindow[];
  } catch {
    return [];
  }
}

function writeToStorage(items: SavedWindow[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* quota exceeded or storage disabled — fall through silently */
  }
}

export function WindowListProvider({ children }: { children: ReactNode }) {
  /* Start empty so SSR and first client paint match. Hydrate from
     storage in an effect so we never produce a hydration mismatch. */
  const [items, setItems] = useState<SavedWindow[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readFromStorage());
    setHydrated(true);
  }, []);

  /* Sync any change back to storage AND across tabs. */
  useEffect(() => {
    if (!hydrated) return;
    writeToStorage(items);
  }, [items, hydrated]);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== STORAGE_KEY) return;
      setItems(readFromStorage());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const add = useCallback(
    (slug: WindowTypeSlug, spec: SpecValues): SavedWindow => {
      const item: SavedWindow = {
        id: makeId(),
        slug,
        createdAt: Date.now(),
        spec,
      };
      setItems((prev) => [...prev, item]);
      return item;
    },
    [],
  );

  const update = useCallback((id: string, spec: SpecValues) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, spec } : item)),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<WindowListContextValue>(
    () => ({ items, hydrated, add, update, remove, clear }),
    [items, hydrated, add, update, remove, clear],
  );

  return (
    <WindowListContext.Provider value={value}>
      {children}
    </WindowListContext.Provider>
  );
}

export function useWindowList(): WindowListContextValue {
  const ctx = useContext(WindowListContext);
  if (!ctx) {
    throw new Error(
      "useWindowList must be used inside <WindowListProvider> (added in app/layout.tsx).",
    );
  }
  return ctx;
}
