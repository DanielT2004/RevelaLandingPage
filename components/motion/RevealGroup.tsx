"use client";

import { Children } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

/**
 * Wraps each child in a staggered <Reveal>. The container's className carries
 * the layout (e.g. a grid); each child becomes a direct, staggered grid item.
 */
export function RevealGroup({
  className,
  step = 70,
  maxStagger = 6,
  children,
}: {
  className?: string;
  step?: number;
  maxStagger?: number;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(className)}>
      {Children.map(children, (child, i) => (
        <Reveal delay={Math.min(i, maxStagger) * step}>{child}</Reveal>
      ))}
    </div>
  );
}
