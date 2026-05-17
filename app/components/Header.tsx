"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Phone, Banknote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, getSubmenu, type NavLink, type SubmenuTile } from "../lib/content";
import { EASE_OUT } from "../lib/animations";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* ─── Desktop picture-based submenu ────────────────────────────── */

function PictureSubmenu({ items }: { items: SubmenuTile[] }) {
  const [hovered, setHovered] = useState<SubmenuTile>(items[0]);



  return (
    <div className="grid w-[680px] gap-3 p-3 sm:grid-cols-[260px_1fr]">
      <div className="flex flex-col gap-1">
        {items.map((item) => {
          const active = hovered.title === item.title;
          return (
            <Link
              key={item.title}
              href={item.href}
              onMouseEnter={() => setHovered(item)}
              className={cn(
                "group/item flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                active
                  ? "bg-accent-50 text-accent-700"
                  : "text-slate-900 hover:bg-stone-50",
              )}
            >
              <div className="min-w-0">
                <div className="font-display text-sm font-semibold tracking-tight">
                  {item.title}
                </div>
                <div className="mt-0.5 line-clamp-1 text-xs text-stone-500">
                  {item.description}
                </div>
              </div>
              <ChevronRight
                className={cn(
                  "h-4 w-4 shrink-0 transition-all",
                  active
                    ? "translate-x-0 text-accent-600 opacity-100"
                    : "-translate-x-1 text-stone-400 opacity-0",
                )}
              />
            </Link>
          );
        })}
      </div>

      <Link
        href={hovered.href}
        className="group relative block overflow-hidden rounded-lg"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-stone-100">
          <Image
            key={hovered.image}
            src={hovered.image}
            alt={hovered.title}
            fill
            sizes="400px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <div className="text-[10px] font-medium tracking-[0.22em] text-accent-300 uppercase">
              Explore
            </div>
            <div className="mt-1 font-display text-lg font-semibold tracking-tight text-stone-50">
              {hovered.title}
            </div>
            <div className="mt-1 line-clamp-2 text-xs text-stone-200">
              {hovered.description}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function DesktopDropdown({ item, isScrolled }: { item: NavLink; isScrolled: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const submenu = getSubmenu(item.label);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  if (!submenu) {
    return (
      <Link
        href={item.href}
        className={cn(
          "group relative text-sm font-medium transition-colors duration-200",
          isScrolled
            ? "text-slate-900 hover:text-accent-600"
            : "text-stone-50 hover:text-accent-300",
        )}
      >
        {item.label}
        <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent-500 transition-all duration-300 group-hover:w-full" />
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        type="button"
        aria-expanded={isOpen}
        className={cn(
          "inline-flex items-center gap-1 text-sm font-medium transition-colors duration-200",
          isScrolled
            ? "text-slate-900 hover:text-accent-600"
            : "text-stone-50 hover:text-accent-300",
        )}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
          strokeWidth={2}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
          >
            <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_30px_80px_-20px_rgba(6,17,42,0.30)]">
              <PictureSubmenu items={submenu} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Header shell ─────────────────────────────────────────────── */

/**
 * Only the landing page has a dark photographic hero that the header
 * overlaps. Every other route (e.g. /learn, /care, /design) renders
 * on a light background, so the header must always sit in its
 * "solid" state — otherwise white text disappears against the page.
 */
const TRANSPARENT_HERO_ROUTES = new Set<string>(["/"]);

export function Header() {
  const pathname = usePathname();
  const hasTransparentHero = TRANSPARENT_HERO_ROUTES.has(pathname ?? "/");

  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Force-solid styling whenever the page doesn't have a dark hero.
  const isScrolled = !hasTransparentHero || scrolledPastHero;

  useEffect(() => {
    // Only the landing page needs scroll tracking; on other routes the
    // header is permanently in its "solid" state via `isScrolled`.
    if (!hasTransparentHero) return;
    const handleScroll = () => setScrolledPastHero(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasTransparentHero]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Top finance ribbon — small but always there, drives the "go" feeling. */}
      <div className="relative z-[101] hidden overflow-hidden bg-slate-950 py-2 text-center sm:block">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(223,139,31,0.18),transparent_70%)]"
        />
        <span className="relative inline-flex items-center gap-2 text-xs font-medium tracking-tight text-stone-50">
          <Banknote className="h-3.5 w-3.5 text-accent-300" strokeWidth={2} />
          <AnimatedShinyText className="!mx-0">
            0% APR financing for 12 months · Free in-home quote · Lifetime workmanship warranty
          </AnimatedShinyText>
        </span>
      </div>

      <div className={`pointer-events-none fixed ${isScrolled ? "top-0" : "md:top-[4rem] top-[1rem]"} left-0 right-0 z-[100] flex justify-center px-4`}>
        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className={cn(
            "pointer-events-auto w-full transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ",
            isScrolled
              ? "mt-3 max-w-6xl rounded-full border border-stone-200 bg-white/90 shadow-[0_8px_32px_-12px_rgba(6,17,42,0.18)] backdrop-blur-xl"
              : "mt-0 max-w-7xl",
          )}
        >
          <div
            className={cn(
              "transition-all duration-500",
              isScrolled ? "px-4" : "px-6 lg:px-8",
            )}
          >
            <div
              className={cn(
                "flex items-center justify-between transition-all duration-500",
                isScrolled ? "h-14" : "",
              )}
            >
              <Link href="/" className="group flex items-center gap-3">
                <span
                  aria-hidden
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500 text-stone-50 font-display text-sm font-bold tracking-tight transition-all duration-500",
                    isScrolled ? "scale-90" : "",
                  )}
                >
                  ED
                </span>
                <span
                  className={cn(
                    "font-display font-bold tracking-tight transition-all duration-500",
                    isScrolled
                      ? "text-base text-slate-900"
                      : "text-lg text-stone-50",
                  )}
                >
                  E.D. Window Installations
                </span>
              </Link>

              <div className="hidden items-center gap-7 lg:flex">
                {navLinks.map((item) => (
                  <DesktopDropdown key={item.label} item={item} isScrolled={isScrolled} />
                ))}
                <Link
                  href="/#quote"
                  className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-accent-500 px-5 py-2 text-sm font-semibold text-stone-50 shadow-sm transition-colors duration-300 hover:bg-accent-600"
                >
                  <span className="absolute inset-0 shimmer-sweep opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="relative">Free Quote</span>
                  <ChevronRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative flex h-10 w-10 items-center justify-center lg:hidden"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <div className="flex flex-col gap-1.5">
                  <motion.span
                    animate={{
                      rotate: isMobileMenuOpen ? 45 : 0,
                      y: isMobileMenuOpen ? 6 : 0,
                      backgroundColor: isScrolled || isMobileMenuOpen ? "#06112a" : "#fbf8f1",
                    }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                    className="block h-0.5 w-6 origin-center"
                  />
                  <motion.span
                    animate={{
                      opacity: isMobileMenuOpen ? 0 : 1,
                      backgroundColor: isScrolled ? "#06112a" : "#fbf8f1",
                    }}
                    transition={{ duration: 0.2 }}
                    className="block h-0.5 w-6"
                  />
                  <motion.span
                    animate={{
                      rotate: isMobileMenuOpen ? -45 : 0,
                      y: isMobileMenuOpen ? -6 : 0,
                      backgroundColor: isScrolled || isMobileMenuOpen ? "#06112a" : "#fbf8f1",
                    }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                    className="block h-0.5 w-6 origin-center"
                  />
                </div>
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="fixed inset-0 z-40 overflow-y-auto bg-stone-50 lg:hidden"
          >
            <div className="mx-auto flex max-w-md flex-col gap-6 px-6 pt-24 pb-12">
              {navLinks.map((item, index) => {
                const submenu = getSubmenu(item.label);
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ delay: index * 0.05, duration: 0.35, ease: EASE_OUT }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-display text-2xl font-semibold text-slate-900"
                    >
                      {item.label}
                    </Link>
                    {submenu && (
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {submenu.slice(0, 4).map((sub) => (
                          <Link
                            key={sub.title}
                            href={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="relative overflow-hidden rounded-lg border border-stone-200 bg-white"
                          >
                            <div className="relative aspect-[4/3] w-full">
                              <Image
                                src={sub.image}
                                alt={sub.title}
                                fill
                                sizes="200px"
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                              <div className="absolute inset-x-0 bottom-0 p-2 text-xs font-semibold tracking-tight text-stone-50">
                                {sub.title}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href="/#quote"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-base font-semibold text-stone-50 transition-colors hover:bg-accent-600"
                >
                  Get Free Quote
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <a
                  href="tel:+15555550123"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium text-slate-900"
                >
                  <Phone className="h-4 w-4" strokeWidth={1.75} />
                  (555) 555-0123
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
