"use client";

import { motion, type MotionStyle, type Transition } from "framer-motion";

import { cn } from "@/lib/utils";

interface BorderBeamProps {
  /**
   * The size of the beam in pixels.
   * @default 50
   */
  size?: number;
  /**
   * The duration of the beam in seconds.
   * @default 6
   */
  duration?: number;
  /**
   * Animation delay in seconds.
   * @default 0
   */
  delay?: number;
  /**
   * Solid color for the leading edge of the beam.
   * @default "#df8b1f"
   */
  colorFrom?: string;
  /**
   * Solid color for the trailing edge of the beam (fades to transparent).
   * @default "#f5b657"
   */
  colorTo?: string;
  /**
   * Direction. `true` reverses the spin.
   */
  reverse?: boolean;
  /**
   * Where to start the beam on the perimeter, 0–100.
   */
  initialOffset?: number;
  /**
   * Custom inline style overrides.
   */
  style?: MotionStyle;
  /**
   * Class name passthrough.
   */
  className?: string;
  /**
   * Optional motion transition override.
   */
  transition?: Transition;
}

/**
 * Animated gradient line that traces the rounded border of its parent.
 *
 * Parent must be `position: relative` with `overflow: hidden` for the
 * beam to look correctly clipped.
 */
export function BorderBeam({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = "#df8b1f",
  colorTo = "#f5b657",
  transition,
  style,
  reverse = false,
  initialOffset = 0,
}: BorderBeamProps) {
  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
      <motion.div
        className={cn(
          "absolute aspect-square",
          "bg-gradient-to-l from-(--color-from) via-(--color-to) to-transparent",
          className,
        )}
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            "--color-from": colorFrom,
            "--color-to": colorTo,
            ...style,
          } as MotionStyle
        }
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
          ...transition,
        }}
      />
    </div>
  );
}
