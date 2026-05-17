"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface MagicCardProps {
  children?: ReactNode;
  className?: string;
  /** Radius (in px) of the spotlight that follows the cursor. */
  gradientSize?: number;
  /** Color of the spotlight gradient. */
  gradientColor?: string;
  /** Opacity of the spotlight. */
  gradientOpacity?: number;
  /** Edge accent color used when the card is at rest. */
  gradientFrom?: string;
  /** Edge accent color used when the card is at rest. */
  gradientTo?: string;
}

/**
 * A card surface that reveals a soft, cursor-tracking spotlight on
 * hover. The effect rides on top of whatever children you provide —
 * combine with your own background, padding, and content.
 */
export function MagicCard({
  children,
  className,
  gradientSize = 220,
  gradientColor = "#df8b1f",
  gradientOpacity = 0.18,
  gradientFrom = "#df8b1f",
  gradientTo = "#1f97b1",
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (cardRef.current) {
        const { left, top } = cardRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }
    },
    [mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [gradientSize, mouseX, mouseY]);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;
    node.addEventListener("mousemove", handleMouseMove);
    node.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      node.removeEventListener("mousemove", handleMouseMove);
      node.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative isolate overflow-hidden rounded-2xl",
        className,
      )}
    >
      {/* Resting border gradient */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-border opacity-30"
        style={
          {
            background: `linear-gradient(135deg, ${gradientFrom}55, transparent 40%, ${gradientTo}55)`,
          } as CSSProperties
        }
      />
      {/* Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 70%)`,
          opacity: gradientOpacity,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
