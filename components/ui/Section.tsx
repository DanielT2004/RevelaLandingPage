import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "cream" | "cream-alt" | "dark";

const toneClasses: Record<Tone, string> = {
  cream: "bg-cream text-charcoal",
  "cream-alt": "bg-cream-100 text-charcoal",
  dark: "on-dark bg-charcoal-900 text-cream",
};

/**
 * Semantic <section> with a labelled heading, vertical rhythm, and banding.
 * `labelledBy` must match the id of the section's heading for accessibility.
 */
export function Section({
  id,
  labelledBy,
  tone = "cream",
  className,
  containerClassName,
  children,
}: {
  id?: string;
  labelledBy?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative isolate scroll-mt-20 py-[var(--spacing-section)]",
        toneClasses[tone],
        className
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/** Small uppercase eyebrow label used above section headings. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-4 flex items-center gap-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-terracotta-600",
        className
      )}
    >
      <span aria-hidden className="h-px w-6 bg-terracotta/50" />
      {children}
    </p>
  );
}
