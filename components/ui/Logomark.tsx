import { cn } from "@/lib/cn";

/** Brand mark — a terracotta tile with a cream "S" and a crop-mark corner.
 *  Works on both cream and charcoal surfaces. */
export function Logomark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex h-7 w-7 items-center justify-center rounded-[0.55rem] bg-terracotta font-display text-sm font-bold text-cream",
        className
      )}
    >
      S
      <span className="absolute bottom-[3px] right-[3px] h-1.5 w-1.5 rounded-[2px] bg-cream/80" />
    </span>
  );
}
