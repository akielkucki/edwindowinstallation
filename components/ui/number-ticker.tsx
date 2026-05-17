"use client";

import { useInView } from "framer-motion";
import { useRef, type CSSProperties } from "react";
import CountUp from "react-countup";

import { cn } from "@/lib/utils";

interface NumberTickerProps {
  value: number;
  /** Optional starting value. */
  startValue?: number;
  /** Animation duration in seconds. */
  duration?: number;
  /** Decimal places. */
  decimals?: number;
  /** String prepended to the animated number, e.g. "$". */
  prefix?: string;
  /** String appended to the animated number, e.g. "%" or "k". */
  suffix?: string;
  /** Direction of the count. */
  direction?: "up" | "down";
  /** Class passthrough. */
  className?: string;
  /** Inline style passthrough. */
  style?: CSSProperties;
}

/**
 * Counts a number up (or down) when it scrolls into view. Wraps
 * `react-countup` and only fires once per mount, so revisiting the
 * section doesn't replay the animation.
 */
export function NumberTicker({
  value,
  startValue,
  duration = 1.6,
  decimals = 0,
  prefix,
  suffix,
  direction = "up",
  className,
  style,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  const start =
    startValue ?? (direction === "down" ? value : 0);
  const end = direction === "down" ? 0 : value;

  return (
    <span
      ref={ref}
      style={style}
      className={cn("inline-block tabular-nums", className)}
    >
      {prefix}
      {inView ? (
        <CountUp
          start={start}
          end={end}
          duration={duration}
          decimals={decimals}
          separator=","
        />
      ) : (
        start.toLocaleString()
      )}
      {suffix}
    </span>
  );
}
