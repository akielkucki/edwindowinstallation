import { type CSSProperties, type ComponentPropsWithoutRef, type FC } from "react";

import { cn } from "@/lib/utils";

interface AnimatedShinyTextProps extends ComponentPropsWithoutRef<"span"> {
  shimmerWidth?: number;
}

/**
 * Subtle, infinite shimmer that sweeps across child text.
 * Use sparingly — designed for a single accent line per section.
 */
export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
  ...props
}) => {
  return (
    <span
      style={
        {
          "--shiny-width": `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn(
        "mx-auto max-w-md text-stone-200/80",
        // Shimmer overlay
        "animate-shiny-text bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shiny-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",
        // Gradient
        "bg-gradient-to-r from-transparent via-white/90 via-50% to-transparent",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};
