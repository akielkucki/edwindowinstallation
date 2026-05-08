import type { Variants } from "framer-motion";

/*
 * Shared motion vocabulary.
 *
 * Deliberate, slow, decelerating — never bouncy. Adjust the constants
 * here to retune the pacing of every reveal across the site.
 */

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const DURATION_FAST = 0.45;
export const DURATION_BASE = 0.7;
export const DURATION_SLOW = 0.9;

/* Container that staggers its direct children. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

/* Standard reveal: fade + small upward drift. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_SLOW, ease: EASE_OUT },
  },
};

/* Pure opacity reveal — used where motion would feel busy. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: DURATION_SLOW, ease: EASE_OUT },
  },
};

/* Slow ken-burns-style scale-in for hero imagery. */
export const heroImageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.6, ease: EASE_OUT },
  },
};

/* Standard scroll-triggered viewport config. */
export const inView = { once: true, amount: 0.05 } as const;
