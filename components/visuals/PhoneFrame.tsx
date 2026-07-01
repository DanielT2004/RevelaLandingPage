import { cn } from "@/lib/cn";

/** Charcoal device frame. Reserves aspect ratio to avoid layout shift. */
export function PhoneFrame({
  children,
  className,
  screenClassName,
}: {
  children: React.ReactNode;
  className?: string;
  screenClassName?: string;
}) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[300px]", className)}>
      <div className="relative aspect-[9/19.5] rounded-[2.6rem] border border-charcoal/10 bg-charcoal-900 p-2.5 shadow-[0_40px_80px_-40px_rgba(27,24,21,0.7)]">
        <div
          className={cn(
            "relative h-full w-full overflow-hidden rounded-[2rem] bg-charcoal-800",
            screenClassName
          )}
        >
          {/* Dynamic island */}
          <div className="pointer-events-none absolute left-1/2 top-2.5 z-20 h-[1.15rem] w-[4.5rem] -translate-x-1/2 rounded-full bg-charcoal-900" />
          {/* Cream glass highlight */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-cream/[0.05] via-transparent to-transparent"
          />
          {children}
        </div>
      </div>
    </div>
  );
}
