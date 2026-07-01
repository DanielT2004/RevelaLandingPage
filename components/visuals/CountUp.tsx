"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useInView } from "@/components/motion/useInView";

function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(sec).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${m}:${ss}`;
}

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
