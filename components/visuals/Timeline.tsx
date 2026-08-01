import { cn } from "@/lib/cn";

/** Kept moments only — tile width is proportional to duration, like the app's
 *  first-cut filmstrip. The hook moment opens the video. */
const MOMENTS: { w: number; t: string; hook?: boolean }[] = [
  { w: 15, t: "3s", hook: true },
  { w: 24, t: "6s" },
  { w: 14, t: "3s" },
  { w: 27, t: "7s" },
  { w: 20, t: "5s" },
];

/** The app's first-cut filmstrip (renders on dark surfaces): proportional
 *  moment tiles with duration chips and a terracotta ★ HOOK pennant over the
 *  opener — the recurring product motif. */
export function Timeline({
  showHook = true,
  showPlayhead = false,
  className,
}: {
  showHook?: boolean;
  showPlayhead?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      {showHook && (
        <div className="absolute -top-2 left-0 z-10 -translate-y-full">
          <span className="rounded-[0.35rem] bg-terracotta px-1.5 py-0.5 font-mono text-[0.55rem] font-semibold uppercase tracking-[0.1em] text-cream">
            ★ Hook
          </span>
          <span className="absolute left-2 top-full h-2 w-px bg-terracotta" />
        </div>
      )}

      <div className="relative flex h-12 items-stretch gap-1 rounded-lg bg-charcoal-900/70 p-1">
        {MOMENTS.map((m, i) => (
          <div
            key={i}
            style={{ flexBasis: `${m.w}%` }}
            className={cn(
              "relative overflow-hidden rounded-[0.3rem] bg-charcoal-700",
              m.hook && "ring-1 ring-inset ring-terracotta/70"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cream/[0.09] to-transparent" />
            <span className="tnum absolute bottom-0.5 right-1 font-mono text-[0.45rem] text-cream/50">
              {m.t}
            </span>
          </div>
        ))}
        {showPlayhead && (
          <span className="absolute inset-y-1 left-[38%] w-px bg-sage-400" aria-hidden />
        )}
        {/* Right-edge fade, like the app's strip */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-6 rounded-r-lg bg-gradient-to-l from-charcoal-900/70 to-transparent"
        />
      </div>

      <div className="mt-1.5 flex justify-between px-0.5 font-mono text-[0.55rem] text-cream/55">
        <span>5 moments</span>
        <span className="tnum">~00:24</span>
      </div>
    </div>
  );
}
