"use client";

import {
    AnimatePresence,
    motion,
    type MotionValue, useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import { ChevronRight, Frame, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "../lib/content";
import { EASE_OUT } from "../lib/animations";
import Image from "next/image";

/*
 * Dynamic-Island header.
 *
 * Architecture: every visual property of the chrome is derived from a
 * single spring-smoothed `progress` motion value (0 → 1) computed from
 * `scrollY`. There is no React `useState` flip and no per-component
 * `transition` tween — every animatable style samples the same source
 * on every frame, which guarantees lockstep motion. That removes the
 * snap that came from individual tweens finishing on different frames
 * or from `AnimatePresence` collapsing `width: "auto"` next to a
 * flex sibling.
 *
 * Hidden elements (subtitle, phone link) collapse via numeric width
 * and margin to 0 with overflow-hidden — siblings then translate
 * continuously rather than reflowing.
 */

const SCROLL_RANGE = [0, 80] as const;
const COMPACT_MAX_WIDTH = 960;
const FULL_MAX_WIDTH = 9999;

/* Over-damped spring smooths sparse scroll events without overshoot. */
const PROGRESS_SPRING = { stiffness: 250, damping: 40, mass: 0.6 } as const;

/* Color stops live in one place so designers can retune in one read. */
const COLOR = {
  shellBgExpanded: "rgba(250, 250, 249, 0.85)",
  shellBgCompact: "rgba(11, 20, 40, 0.78)",
  shellShadowExpanded: "0 1px 0 0 rgba(0, 0, 0, 0.06)",
  shellShadowCompact:
    "0 18px 50px -20px rgba(11, 20, 40, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.06) inset",
  markBgExpanded: "#0b1428",
  markBgCompact: "#fafaf9",
  markFgExpanded: "#fafaf9",
  markFgCompact: "#0b1428",
  textExpanded: "#1c2433",
  textCompact: "#fafaf9",
  navExpanded: "#334155",
  navCompact: "#e7e5e4",
  phoneExpanded: "#334155",
  phoneCompact: "#e7e5e4",
  triggerBgExpanded: "rgba(15, 23, 42, 0.05)",
  triggerBgCompact: "rgba(250, 250, 249, 0.10)",
  triggerFgExpanded: "#0f172a",
  triggerFgCompact: "#fafaf9",
} as const;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const rawProgress = useTransform(scrollY, [...SCROLL_RANGE], [0, 1], {
    clamp: true,
  });
  const progress = useSpring(rawProgress, PROGRESS_SPRING);

  /* Body scroll lock while the fullscreen menu is open. */
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  /* ── Outer wrapper paddings ─────────────────────────────────────── */
  const wrapperPaddingTop = useTransform(progress, [0, 1], [0, 14]);
  const wrapperPaddingX = useTransform(progress, [0, 1], [0, 16]);

  /* ── Shell shape + skin ────────────────────────────────────────── */
  const shellMaxWidth = useTransform(
    progress,
    [0, 1],
    [FULL_MAX_WIDTH, COMPACT_MAX_WIDTH],
  );
  const shellBorderRadius = useTransform(progress, [0, 1], [0, 999]);
  const shellHeight = useTransform(progress, [0, 1], [80, 58]);
  const shellPaddingLeft = useTransform(progress, [0, 1], [24, 20]);
  const shellPaddingRight = useTransform(progress, [0, 1], [24, 20]);
  const shellBackground = useTransform(
    progress,
    [0, 1],
    [COLOR.shellBgExpanded, COLOR.shellBgCompact],
  );
  const shellShadow = useTransform(
    progress,
    [0, 1],
    [COLOR.shellShadowExpanded, COLOR.shellShadowCompact],
  );


  return (
    <>
      <motion.header
        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center"
        style={{
          paddingTop: wrapperPaddingTop,
          paddingLeft: wrapperPaddingX,
          paddingRight: wrapperPaddingX,
        }}
      >
        <motion.div
          className="pointer-events-auto relative flex w-full items-center justify-between gap-4 backdrop-blur-xl"
          style={{
            maxWidth: shellMaxWidth,
            borderRadius: shellBorderRadius,
            height: shellHeight,
            paddingLeft: shellPaddingLeft,
            paddingRight: shellPaddingRight,
            backgroundColor: shellBackground,
            boxShadow: shellShadow,
          }}
        >
          <Logo progress={progress} />
          <DesktopNav progress={progress} />
          <DesktopActions progress={progress} />
          <MobileTrigger
            progress={progress}
            open={menuOpen}
            onToggle={() => setMenuOpen((v) => !v)}
          />
        </motion.div>
      </motion.header>

      <MobileSheet open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────── */

function Logo({ progress }: { progress: MotionValue<number> }) {
  const markBg = useTransform(
    progress,
    [0, 1],
    [COLOR.markBgExpanded, COLOR.markBgCompact],
  );
  const markFg = useTransform(
    progress,
    [0, 1],
    [COLOR.markFgExpanded, COLOR.markFgCompact],
  );
  const markSize = useTransform(progress, [0, 1], [40, 36]);

  const wordmarkSize = useTransform(progress, [0, 1], [16, 14]);
  const wordmarkColor = useTransform(
    progress,
    [0, 1],
    [COLOR.textExpanded, COLOR.textCompact],
  );

  /* Subtitle collapses with numeric height + opacity. Faster opacity
     ramp (clears by 50% progress) so it doesn't ghost into the dark
     capsule background. */
  const subtitleHeight = useTransform(progress, [0, 1], [14, 0]);
  const subtitleOpacity = useTransform(progress, [0, 0.5], [1, 0]);
    const [aligned,setAligned] = useState<boolean>(false);
    useMotionValueEvent(progress, "change", (latest) => {
        setAligned(latest > 0.5);
    });
  return (
    <a href="#top" className="flex items-center gap-3">
      <motion.div
        className="flex relative items-center justify-center rounded-sm"
        style={{
          backgroundColor: markBg,
          color: markFg,
          height: markSize,
          width: markSize,
        }}
      >
        <Image width={500} height={500} src={"/logo.jpg"} alt={"E.D Remodeling logo"} loading={"eager"} className={`object-cover ${aligned ? 'rounded-full' : 'rounded-none'}`}/>
      </motion.div>

      <div className="flex flex-col leading-none">
        <motion.span
          className="font-semibold tracking-tight whitespace-nowrap"
          style={{ fontSize: wordmarkSize, color: wordmarkColor }}
        >
          ED Window Installations
        </motion.span>
        <motion.span
          className="overflow-hidden text-xs tracking-[0.18em] text-stone-500 uppercase whitespace-nowrap"
          style={{ height: subtitleHeight, opacity: subtitleOpacity }}
        >
          Craftsmanship · Since 1998
        </motion.span>
      </div>
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────────── */

function DesktopNav({ progress }: { progress: MotionValue<number> }) {
  const color = useTransform(
    progress,
    [0, 1],
    [COLOR.navExpanded, COLOR.navCompact],
  );
    const [aligned,setAligned] = useState<boolean>(false);
    useMotionValueEvent(progress, "change", (latest) => {
        setAligned(latest > 0.5);
    });
  return (
    <motion.nav layout className="hidden gap-8 md:flex"   style={{
        justifyContent: aligned ? "start" : "center",
    }}
                transition={{
                        layout: {
                            duration: 0.35,
                            ease: "easeInOut",
                        }
                    }}
    >
      {navLinks.map((link) => (
        <motion.a
          key={link.href}
          href={link.href}
          style={{ color }}
          className="text-sm font-medium whitespace-nowrap transition-opacity duration-300 hover:opacity-70"
        >
          {link.label}
        </motion.a>
      ))}
    </motion.nav>
  );
}

/* ─────────────────────────────────────────────────────────────────── */

function DesktopActions({ progress }: { progress: MotionValue<number> }) {
  /* Phone link: numeric width + marginRight to 0, opacity to 0 by 40%
     progress. Sibling CTA translates smoothly inward as both shrink. */
  const phoneOpacity = useTransform(progress, [0, 0.4], [1, 0]);
  const phoneWidth = useTransform(progress, [0, 1], [156, 0]);
  const phoneMargin = useTransform(progress, [0, 1], [12, 0]);
  const phoneColor = useTransform(
    progress,
    [0, 1],
    [COLOR.phoneExpanded, COLOR.phoneCompact],
  );

  const ctaPaddingY = useTransform(progress, [0, 1], [10, 8]);
  const ctaPaddingX = useTransform(progress, [0, 1], [20, 16]);

  return (
    /* No `gap-*` on the parent — phone link controls its own
       marginRight so the spacing collapses with it. */
    <div className="hidden items-center md:flex">
      <motion.a
        href="tel:+15555550123"
        className="flex items-center gap-2 overflow-hidden text-sm font-medium whitespace-nowrap"
        style={{
          opacity: phoneOpacity,
          width: phoneWidth,
          marginRight: phoneMargin,
          color: phoneColor,
        }}
      >
        <Phone className="h-4 w-4 shrink-0" strokeWidth={1.75} />
        (555) 555-0123
      </motion.a>

      <motion.a
        href="#quote"
        className="group inline-flex items-center gap-1.5 rounded-full bg-accent-500 text-sm font-semibold whitespace-nowrap text-stone-50 shadow-sm transition-colors duration-300 hover:bg-accent-600"
        style={{
          paddingTop: ctaPaddingY,
          paddingBottom: ctaPaddingY,
          paddingLeft: ctaPaddingX,
          paddingRight: ctaPaddingX,
        }}
      >
        Get a Quote
        <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </motion.a>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────── */

function MobileTrigger({
  progress,
  open,
  onToggle,
}: {
  progress: MotionValue<number>;
  open: boolean;
  onToggle: () => void;
}) {
  const bg = useTransform(
    progress,
    [0, 1],
    [COLOR.triggerBgExpanded, COLOR.triggerBgCompact],
  );
  const fg = useTransform(
    progress,
    [0, 1],
    [COLOR.triggerFgExpanded, COLOR.triggerFgCompact],
  );

  return (
    <motion.button
      onClick={onToggle}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      style={{ color: fg }}
      className={`flex h-10 w-12 items-center justify-center md:hidden ${open && "bg-transparent"}`}
    >
            <div className={"flex flex-col justify-between gap-1"}>
                <span className={`w-4 h-[1px] bg-black transition-transform duration-300 ${open ? "translate-y-[5px] rotate-45" : "rotate-0"}`}></span>
                <span className={`w-4 h-[1px] bg-black transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`}></span>
                <span className={`w-4 h-[1px] bg-black transition-transform duration-300 ${open ? "-translate-y-[5px] -rotate-45" : "rotate-0"}`}></span>
            </div>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────────────── */

/*
 * Fullscreen mobile menu.
 *
 * Sits at z-40 so the header's close button (z-50) stays tappable.
 * Body scroll is locked from the parent. Links stagger in after the
 * panel finishes its fade so the entry feels intentional.
 */
function MobileSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="sheet"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="fixed inset-0 z-40 flex flex-col bg-stone-50 md:hidden"
        >
          <div className="flex flex-1 flex-col px-8 pt-28 pb-12">
            <nav className="flex flex-col">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.18 + i * 0.07,
                    ease: EASE_OUT,
                  }}
                  className="flex items-center justify-between border-b border-stone-200 py-6 font-display text-3xl font-semibold tracking-tight text-slate-900 transition-colors hover:text-accent-600"
                >
                  {link.label}
                  <ChevronRight
                    className="h-5 w-5 text-stone-400"
                    strokeWidth={1.5}
                  />
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, delay: 0.55, ease: EASE_OUT }}
              className="mt-auto flex flex-col gap-3 pt-12"
            >
              <a
                href="#quote"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-accent-500 px-5 py-4 text-base font-semibold text-stone-50 transition-colors hover:bg-accent-600"
              >
                Get a Quote
                <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="tel:+15555550123"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-stone-200 px-5 py-4 text-base font-medium text-slate-900 transition-colors hover:bg-stone-100"
              >
                <Phone className="h-4 w-4" strokeWidth={1.75} />
                (555) 555-0123
              </a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
