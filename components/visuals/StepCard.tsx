import { cn } from "@/lib/cn";

/** A How-It-Works column: a dark "screenshot" panel above a numbered step. */
export function StepCard({
  n,
  title,
  body,
  children,
  className,
}: {
  n: string;
  title: string;
  body: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      {/* Fixed panel height keeps all three step titles on the same baseline,
          regardless of how tall each mock is. */}
      <div className="relative mb-6 flex min-h-[17rem] items-center rounded-2xl border border-charcoal/8 bg-charcoal-900 p-3.5 shadow-[0_24px_50px_-30px_rgba(27,24,21,0.6)]">
        {children}
      </div>
      <div className="flex items-baseline gap-3">
        <span className="tnum font-mono text-sm font-semibold text-terracotta-600">
          {n}
        </span>
        <h3 className="font-display text-xl font-semibold text-charcoal">
          {title}
        </h3>
      </div>
      <p className="mt-2 max-w-xs text-[0.98rem] leading-relaxed text-warmgray">
        {body}
      </p>
    </div>
  );
}
