"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { formatClock } from "@/lib/time";

// The whole page maps to a 10-minute "edit" — scrolling scrubs the timeline.
const TOTAL_SECONDS = 600;

/**
 * A slim, non-interactive scrubber pinned to the bottom of the viewport. A
 * terracotta fill tracks page scroll and a playhead pill counts 0:00 → 10:00,
 * tying the whole scroll to the product's timeline metaphor. Removed entirely
 * under prefers-reduced-motion.
 */
export function ScrollScrubber() {
  const { scrollYProgress } = useScroll();
  const [time, setTime] = useState("0:00");
  // Gate on mount so SSR and first client render match (both null), then read
  // the media query directly — reliable where framer's hook lags emulation.
  const [enabled, setEnabled] = useState(false);
  const left = useTransform(scrollYProgress, [0, 1], ["2%", "98%"]);
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setTime(formatClock(v * TOTAL_SECONDS));
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="relative h-[3px] w-full bg-charcoal/10">
        <motion.div
          className="absolute inset-y-0 left-0 w-full origin-left bg-terracotta"
          style={{ scaleX }}
        />
      </div>
      <motion.div
        style={{ left, bottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
        className="absolute -translate-x-1/2"
      >
        <span className="flex items-center gap-1.5 rounded-full bg-charcoal-900/90 px-2 py-1 font-mono text-[0.55rem] font-semibold text-cream shadow-[0_6px_20px_-6px_rgba(0,0,0,0.6)] backdrop-blur sm:px-2.5 sm:text-[0.6rem]">
          <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
          <span className="tnum">{time}</span>
          <span className="text-cream/40">/ 10:00</span>
        </span>
      </motion.div>
    </div>
  );
}
