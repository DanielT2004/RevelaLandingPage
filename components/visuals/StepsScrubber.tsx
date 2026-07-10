"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * Wraps the three How-It-Works steps and threads a scroll-linked timeline above
 * them (desktop only): a terracotta line fills left→right as the section moves
 * through the viewport, with a node over each step — the page reads as scrubbing
 * an edit. The steps themselves are passed in as server-rendered children.
 * Under reduced motion the line simply shows full and static.
 */
export function StepsScrubber({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Column centres for a 3-up grid.
  const nodes = [16.667, 50, 83.333];

  return (
    <div ref={ref} className="mt-14">
      <div className="relative mb-10 hidden h-px w-full bg-charcoal/10 md:block">
        <motion.div
          className="absolute inset-y-0 left-0 w-full origin-left bg-terracotta"
          style={reduce ? { scaleX: 1 } : { scaleX }}
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
      {children}
    </div>
  );
}
