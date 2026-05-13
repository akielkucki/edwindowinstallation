"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Phone } from "lucide-react";
import { navLinks, services, projects, type NavLink } from "../lib/content";
import { EASE_OUT } from "../lib/animations";

/* Tiny class-merger so we don't need a clsx dep. */
function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

type SubmenuItem = { title: string; description: string; href: string };

function getSubmenuItems(label: string): SubmenuItem[] | null {
  if (label === "Windows") {
    return services.slice(0, 6).map((s) => ({
      title: s.title,
      description: s.body,
      href: "/#window-types",
    }));
  }
  if (label === "Projects") {
    return projects.slice(0, 4).map((p) => ({
      title: p.title,
      description: `${p.category} · ${p.location}`,
      href: "/#projects",
    }));
  }
  return null;
}

function DesktopDropdown({ item }: { item: NavLink }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const submenu = getSubmenuItems(item.label);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  if (!submenu) {
    return (
      <a
        href={item.href}
        className="group relative text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-slate-900"
      >
        {item.label}
        <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent-500 transition-all duration-300 group-hover:w-full" />
      </a>
    );
  }

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        type="button"
        aria-expanded={isOpen}
        className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-slate-900"
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
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
          >
            <div className="min-w-[320px] overflow-hidden rounded-2xl border border-stone-200 bg-white p-2 shadow-[0_20px_60px_-20px_rgba(20,17,13,0.18)]">
              {submenu.map((sub) => (
                <a
                  key={sub.title}
                  href={sub.href}
                  className="group/item block rounded-xl px-3 py-2.5 transition-colors hover:bg-stone-50"
                >
                  <div className="font-display text-sm font-semibold tracking-tight text-slate-900 transition-colors group-hover/item:text-accent-600">
                    {sub.title}
                  </div>
                  <div className="mt-0.5 line-clamp-1 text-xs text-stone-500">
                    {sub.description}
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center px-4">
        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className={cn(
            "pointer-events-auto w-full transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
            isScrolled
              ? "mt-3 max-w-5xl rounded-full border border-stone-200 bg-white/85 shadow-[0_8px_32px_-12px_rgba(20,17,13,0.12)] backdrop-blur-xl"
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
                isScrolled ? "h-14" : "h-20",
              )}
            >
              <a href="/" className="group flex items-center gap-2">
                <span
                  className={cn(
                    "font-display font-bold tracking-tight text-slate-900 transition-all duration-500",
                    isScrolled ? "text-base" : "text-xl",
                  )}
                >
                  ED Window Installations
                </span>
              </a>

              <div className="hidden items-center gap-7 md:flex">
                {navLinks.map((item) => (
                  <DesktopDropdown key={item.label} item={item} />
                ))}
                <a
                  href="/#quote"
                  className="group inline-flex items-center gap-1.5 rounded-full bg-accent-500 px-5 py-2 text-sm font-semibold text-stone-50 shadow-sm transition-colors duration-300 hover:bg-accent-600"
                >
                  Get Quote
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </div>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative flex h-10 w-10 items-center justify-center md:hidden"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <div className="flex flex-col gap-1.5">
                  <motion.span
                    animate={{
                      rotate: isMobileMenuOpen ? 45 : 0,
                      y: isMobileMenuOpen ? 6 : 0,
                    }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                    className="block h-0.5 w-6 origin-center bg-slate-900"
                  />
                  <motion.span
                    animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                    className="block h-0.5 w-6 bg-slate-900"
                  />
                  <motion.span
                    animate={{
                      rotate: isMobileMenuOpen ? -45 : 0,
                      y: isMobileMenuOpen ? -6 : 0,
                    }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                    className="block h-0.5 w-6 origin-center bg-slate-900"
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
            className="fixed inset-0 z-40 bg-stone-50/98 backdrop-blur-lg md:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-6">
              {navLinks.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{
                    delay: index * 0.06,
                    duration: 0.4,
                    ease: EASE_OUT,
                  }}
                  className="font-display text-3xl font-medium text-slate-900 transition-colors hover:text-accent-600"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ delay: 0.35, duration: 0.4, ease: EASE_OUT }}
                className="mt-4 flex flex-col items-center gap-4"
              >
                <a
                  href="/#quote"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-base font-semibold text-stone-50 transition-colors hover:bg-accent-600"
                >
                  Get Quote
                  <ChevronRight className="h-4 w-4" />
                </a>
                <a
                  href="tel:+15555550123"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-700"
                >
                  <Phone className="h-4 w-4" strokeWidth={1.75} />
                  (555) 555-0123
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
