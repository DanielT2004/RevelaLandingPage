"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { useInView } from "./useInView";

/**
 * Fade + slide-up on scroll-in. Purely CSS-driven (see `.reveal` in globals.css):
 * this component only toggles `data-inview`. Content is visible without JS and
 * appears instantly under prefers-reduced-motion.
 */
export function Reveal({
  delay = 0,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const style = delay
    ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
    : undefined;

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      data-inview={inView ? "true" : "false"}
      style={style}
    >
      {children}
    </div>
  );
}
