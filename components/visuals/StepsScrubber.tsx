"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * Wraps the three How-It-Works steps and threads a scroll-linked timeline
 * through them: on md+ a terracotta line fills left→right above the columns;
 * below md the same progress drives a vertical rail beside the stacked steps
 * (a node per step lives in HowItWorks, aligned to this rail) — either way the
 * page reads as scrubbing an edit. The steps themselves are passed in as
 * server-rendered children. Under reduced motion the line shows full and static.
 */
export function StepsScrubber({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // Hydration-safe reduce handling: the server always renders the scroll-
  // driven style; only after mount may reduced-motion pin the line full.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scaleY = scaleX;

  // Column centres for a 3-up grid.
  const nodes = [16.667, 50, 83.333];

  return (
    <div ref={ref} className="mt-14">
      <div className="relative mb-10 hidden h-px w-full bg-charcoal/10 md:block">
        <motion.div
          className="absolute inset-y-0 left-0 w-full origin-left bg-terracotta"
          style={mounted && reduce ? { scaleX: 1 } : { scaleX }}
        />
        {nodes.map((left) => (
          <span
            key={left}
            className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream ring-2 ring-terracotta"
            style={{ left: `${left}%` }}
            aria-hidden
          />
        ))}
      </div>
      <div className="relative">
        {/* Vertical rail for the stacked mobile layout — same progress, same
            metaphor, rotated 90°. Step nodes are rendered by HowItWorks so
            they align with each card. */}
        <div
          aria-hidden
          className="absolute bottom-2 left-1 top-2 w-[2px] rounded-full bg-charcoal/10 md:hidden"
        >
          <motion.div
            className="absolute inset-x-0 top-0 h-full origin-top bg-terracotta"
            style={mounted && reduce ? { scaleY: 1 } : { scaleY }}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
