"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * Pins the How-It-Works steps for a stretch of scroll and deals the three
 * cards out one at a time — scrolling scrubs the edit instead of sliding past
 * it. Steps accumulate left→right on md+; below md the cards overlay and swap
 * (three panels don't fit one phone screen). The section heading stays in
 * normal flow above and scrolls away as the pin engages, so the pinned
 * viewport only has to fit the cards. All geometry and per-part motion live
 * in CSS (`.pin-*`, globals.css); this component only maps scroll progress to
 * an active index and drives the terracotta rail.
 *
 * Steps arrive as server-rendered children. No-JS and reduced motion both
 * degrade to the static stacked section via the `.js` scoping and the
 * reduced-motion overrides in globals.css.
 */
export function PinnedSteps({ steps }: { steps: React.ReactNode[] }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // Hydration-safe reduce handling: the server always renders the scroll-
  // driven style; only after mount may reduced-motion pin the rail full.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  // Step thresholds: 01 dwells to 0.33, 02 to 0.66, 03 through the tail so
  // the settled grid is what unpins. Reversing scroll disassembles in order.
  const stepAt = (v: number) => (v < 0.33 ? 0 : v < 0.66 ? 1 : 2);
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(stepAt(v)));
  // Seed on mount so a mid-section reload lands on the right step.
  useEffect(() => setActive(stepAt(scrollYProgress.get())), [scrollYProgress]);

  // Rail fill reaches each node's centre exactly as its step activates.
  const fill = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 0.8],
    [0.16667, 0.5, 0.83333, 1]
  );
  const railStyle = (axis: "scaleX" | "scaleY") =>
    mounted && reduce ? { [axis]: 1 } : { [axis]: fill };

  // Column centres for a 3-up grid.
  const nodes = [16.667, 50, 83.333];

  return (
    <div ref={outerRef} className="pin-outer mt-10 md:mt-14">
      <div className="pin-inner">
        <div className="relative mb-10 hidden h-px w-full bg-charcoal/10 md:block">
          <motion.div
            className="absolute inset-y-0 left-0 w-full origin-left bg-terracotta"
            style={railStyle("scaleX")}
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
          {/* Vertical rail beside the mobile card — same progress, same
              metaphor, rotated 90°. */}
          <div
            aria-hidden
            className="absolute bottom-2 left-1 top-2 w-[2px] rounded-full bg-charcoal/10 md:hidden"
          >
            <motion.div
              className="absolute inset-x-0 top-0 h-full origin-top bg-terracotta"
              style={railStyle("scaleY")}
            />
          </div>

          <div className="pin-grid grid gap-8 pl-8 md:grid-cols-3 md:pl-0">
            {steps.map((step, i) => (
              <div
                key={i}
                className="pin-card"
                data-state={
                  i < active ? "past" : i === active ? "active" : "future"
                }
              >
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
