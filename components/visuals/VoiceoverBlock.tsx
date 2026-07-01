import { cn } from "@/lib/cn";
import { Waveform } from "./Waveform";

/**
 * Before/after "product screenshot" for the voiceover feature: a flat
 * talking-to-camera segment becomes your voice over crisp b-roll.
 * Renders its own dark panel so it reads as the app regardless of section bg.
 */
export function VoiceoverBlock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-charcoal/10 bg-charcoal-900 p-4 sm:p-5",
        className
      )}
    >
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        {/* Before — talking head */}
        <div className="flex-1 rounded-xl border border-cream/10 bg-charcoal-800 p-3">
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-cream/40">
            Talking to camera
          </span>
          <div className="mt-2 flex items-center gap-2">
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-charcoal-900">
              <svg
                viewBox="0 0 24 24"
                className="absolute inset-0 h-full w-full text-cream/25"
                fill="currentColor"
                aria-hidden
              >
                <circle cx="12" cy="9" r="3.4" />
                <path d="M5.5 19a6.5 6.5 0 0 1 13 0z" />
              </svg>
            </div>
            <div className="h-px flex-1 bg-cream/10" />
            <span className="tnum font-mono text-[0.58rem] text-cream/45">
              00:48
            </span>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center text-terracotta-400 sm:flex-col">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            className="rotate-90 sm:rotate-0"
          >
            <path
              d="M5 12h13M13 7l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* After — voiceover over b-roll */}
        <div className="flex-1 rounded-xl border border-sage-400/25 bg-charcoal-800 p-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-sage-400">
              Voiceover · your voice
            </span>
            <span className="tnum font-mono text-[0.58rem] text-cream/45">
              00:11
            </span>
          </div>
          <Waveform bars={34} className="mt-2 h-5 w-full text-sage-400/70" />
          <div className="mt-2 flex gap-1">
            <span className="h-6 flex-1 rounded bg-cream/[0.07]" />
            <span className="h-6 flex-1 rounded bg-cream/[0.07]" />
            <span className="h-6 flex-1 rounded bg-cream/[0.07]" />
            <span className="flex h-6 items-center rounded bg-terracotta/20 px-1.5 font-mono text-[0.5rem] uppercase text-terracotta-400">
              B-roll
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
