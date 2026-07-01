import { cn } from "@/lib/cn";

/** The swipe-to-finish review card: a scene preview + keep / redo actions. */
export function SwipeCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-cream/10 bg-charcoal-700/50 p-3",
        className
      )}
    >
      <div className="relative aspect-video overflow-hidden rounded-lg bg-charcoal-900">
        <div className="absolute inset-0 bg-gradient-to-br from-cream/[0.07] to-transparent" />
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-cream/30"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path d="M8 5v14l11-7z" fill="currentColor" />
        </svg>
        <span className="absolute left-2 top-2 rounded bg-charcoal-900/70 px-1.5 py-0.5 font-mono text-[0.55rem] text-sage-400">
          Voiceover · your voice
        </span>
        <span className="tnum absolute bottom-2 right-2 rounded bg-charcoal-900/70 px-1.5 py-0.5 font-mono text-[0.55rem] text-cream/60">
          Scene 03 · 00:12
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-terracotta/40 px-3 py-1.5 text-[0.72rem] font-medium text-terracotta-400">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Redo
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sage px-3.5 py-1.5 text-[0.72rem] font-semibold text-cream">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 12.5l4.2 4.2L19 7"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Keep
        </span>
      </div>
    </div>
  );
}
