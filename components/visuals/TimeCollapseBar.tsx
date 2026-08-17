"use client";

import { cn } from "@/lib/cn";
import { useInView } from "@/components/motion/useInView";

/**
 * A bar representing hours of manual editing that collapses to a small
 * terracotta sliver (≈10 min) when scrolled into view — the freed space reads
 * as time saved. Snaps to the collapsed state under reduced motion (transitions
 * and their delays are neutralized globally).
 *
 * `delayMs` nudges the collapse behind neighbouring motion — same idea as
 * CountUp's `play` escape hatch. Keep it short: the bar has to be moving by
 * the time a scrolling thumb carries it past.
 */
export function TimeCollapseBar({
  delayMs = 0,
  showLabels = true,
  className,
}: {
  delayMs?: number;
  /** Turn off when the surrounding block already names both sides, so the
   *  bar doesn't repeat "Editing by hand → With Revela" underneath it. */
  showLabels?: boolean;
  className?: string;
}) {
  // Fire early: the bar is short, so the hook's default -10% bottom margin
  // would hold it back nearly a full swipe-beat.
  const { ref, inView } = useInView<HTMLDivElement>({
    amount: 0.3,
    rootMargin: "0px",
  });
  const delay = { transitionDelay: `${delayMs}ms` };

  return (
    <div ref={ref} className={cn("w-full", className)}>
      {showLabels && (
        <div className="mb-2 flex items-center justify-between font-mono text-xs uppercase tracking-[0.12em]">
          {/* Label tracks the bar: it starts as the manual time, then reads as
              the Revela result once collapsed — so it never contradicts it. */}
          <span className="relative text-cream/50">
            <span
              style={delay}
              className={cn(
                "transition-opacity duration-500",
                inView ? "opacity-0" : "opacity-100"
              )}
            >
              Editing by hand
            </span>
            <span
              aria-hidden={!inView}
              style={delay}
              className={cn(
                "absolute left-0 top-0 text-terracotta-400 transition-opacity duration-500",
                inView ? "opacity-100" : "opacity-0"
              )}
            >
              With Revela
            </span>
          </span>
          <span className="text-sage-400">Time saved</span>
        </div>
      )}

      <div className="relative h-4 w-full overflow-hidden rounded-full bg-sage/15">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-terracotta transition-[width] duration-[900ms] ease-[var(--ease-inout)]"
          style={{ width: inView ? "7%" : "100%", ...delay }}
        />
      </div>

      <div className="mt-2.5 flex items-center justify-between">
        <span className="tnum font-mono text-sm font-medium text-terracotta-400">
          ≈ 10 min
        </span>
        <span className="rounded-full bg-sage/20 px-2.5 py-1 font-mono text-xs font-semibold text-sage-400">
          2h 37m saved
        </span>
      </div>
    </div>
  );
}
