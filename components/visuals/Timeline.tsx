import { cn } from "@/lib/cn";

type Tone = "hook" | "keep" | "cut";

const SEGMENTS: { w: number; tone: Tone }[] = [
  { w: 17, tone: "hook" },
  { w: 24, tone: "keep" },
  { w: 8, tone: "cut" },
  { w: 21, tone: "keep" },
  { w: 9, tone: "cut" },
  { w: 21, tone: "keep" },
];

const toneClass: Record<Tone, string> = {
  hook: "bg-terracotta",
  keep: "bg-cream/20",
  cut: "bg-cream/[0.06] [background-image:repeating-linear-gradient(45deg,transparent,transparent_3px,rgba(247,243,236,0.08)_3px,rgba(247,243,236,0.08)_6px)]",
};

/** Editor timeline strip (renders on dark surfaces). Shows a terracotta HOOK
 *  flag and dimmed "cut" segments — the recurring product motif. */
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
            Hook
          </span>
          <span className="absolute left-2 top-full h-2 w-px bg-terracotta" />
        </div>
      )}

      <div className="relative flex h-9 items-stretch gap-1 rounded-lg bg-charcoal-900/70 p-1">
        {SEGMENTS.map((seg, i) => (
          <div
            key={i}
            style={{ flexBasis: `${seg.w}%` }}
            className={cn("rounded-[0.3rem]", toneClass[seg.tone])}
          />
        ))}
        {showPlayhead && (
          <span className="absolute inset-y-1 left-[38%] w-px bg-sage-400" aria-hidden />
        )}
      </div>

      <div className="mt-1.5 flex justify-between px-0.5 font-mono text-[0.55rem] text-cream/55">
        <span className="tnum">00:00</span>
        <span className="tnum">00:24</span>
      </div>
    </div>
  );
}
