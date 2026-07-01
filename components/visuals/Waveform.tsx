import { cn } from "@/lib/cn";

// Deterministic bar pattern (no randomness → no SSR/hydration mismatch).
const PATTERN = [
  5, 9, 6, 12, 7, 4, 10, 14, 8, 5, 11, 6, 9, 13, 7, 4, 8, 12, 6, 10, 5, 9, 7,
  11, 6, 4, 10, 8, 13, 7, 5, 9, 6, 12, 8, 4, 11, 7, 10, 6,
];

export function Waveform({
  bars = 32,
  className,
}: {
  bars?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${bars * 3} 16`}
      preserveAspectRatio="none"
      className={cn(className)}
      aria-hidden
    >
      {Array.from({ length: bars }).map((_, i) => {
        const h = PATTERN[i % PATTERN.length];
        return (
          <rect
            key={i}
            x={i * 3}
            y={(16 - h) / 2}
            width={1.6}
            height={h}
            rx={0.8}
            fill="currentColor"
          />
        );
      })}
    </svg>
  );
}
