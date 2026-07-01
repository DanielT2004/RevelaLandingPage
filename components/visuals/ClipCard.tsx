import { cn } from "@/lib/cn";
import { Waveform } from "./Waveform";

/** A raw-clip row: mono timecode + waveform + abstract (never food) thumbnail. */
export function ClipCard({
  label = "CLIP",
  index,
  time = "00:04.2",
  dimmed = false,
  className,
}: {
  label?: string;
  index?: string;
  time?: string;
  dimmed?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border border-cream/10 bg-charcoal-700/50 p-2.5 transition-opacity",
        dimmed && "opacity-35",
        className
      )}
    >
      <div className="relative h-11 w-14 shrink-0 overflow-hidden rounded-md bg-charcoal-900">
        <div className="absolute inset-0 bg-gradient-to-br from-cream/[0.07] to-transparent" />
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-cream/35"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path d="M8 5v14l11-7z" fill="currentColor" />
        </svg>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-cream/55">
            {label}
            {index ? ` ${index}` : ""}
          </span>
          <span className="tnum font-mono text-[0.6rem] text-cream/55">
            {time}
          </span>
        </div>
        <Waveform bars={30} className="mt-1.5 h-4 w-full text-cream/25" />
      </div>
    </div>
  );
}
