"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { formatClock } from "@/lib/time";
import { useInView } from "@/components/motion/useInView";

/**
 * rAF number transition. Counts from → to when scrolled into view (or when the
 * optional `play` prop flips true). Snaps to `to` under prefers-reduced-motion.
 */
export function CountUp({
  from,
  to,
  durationMs = 1600,
  format = "clock",
  play,
  className,
}: {
  from: number;
  to: number;
  durationMs?: number;
  format?: "clock" | "int";
  play?: boolean;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>({ amount: 0.4 });
  const active = play ?? inView;
  const [value, setValue] = useState(from);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setValue(to);
      return;
    }

    let raf = 0;
    let startTs = 0;
    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const p = Math.min(1, (ts - startTs) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(from + (to - from) * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, from, to, durationMs]);

  const text =
    format === "clock" ? formatClock(value) : Math.round(value).toLocaleString();

  return (
    <span ref={ref} className={cn("tnum", className)}>
      {text}
    </span>
  );
}
