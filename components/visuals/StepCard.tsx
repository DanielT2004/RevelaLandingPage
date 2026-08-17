import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { Icon, type IconName } from "@/components/visuals/icons";

/**
 * A How-It-Works column: a dark "screenshot" panel above a numbered step,
 * plus the capabilities that happen at that stage (these absorbed the old
 * standalone Features grid). Give every step the same number of caps —
 * uneven counts break the shared baseline the panel's min-height buys.
 *
 * `delay` staggers this whole step behind the previous one. Each part is
 * wrapped individually rather than the card as a whole, so the step assembles
 * panel-first instead of popping in at once — and so the outer and inner
 * slide transforms don't compound.
 *
 * `animate={false}` swaps the in-view Reveals for inert `.pin-part` wrappers
 * (same recipe in CSS) so a parent — the pinned How-It-Works — can trigger
 * the assembly itself via `.pin-card[data-state]` instead of the viewport.
 */
export function StepCard({
  n,
  title,
  body,
  caps,
  delay = 0,
  animate = true,
  children,
  className,
}: {
  n: string;
  title: string;
  body: string;
  caps?: readonly { icon: IconName; label: string }[];
  delay?: number;
  animate?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const Part = ({ d, children: part }: { d: number; children: React.ReactNode }) =>
    animate ? (
      <Reveal delay={d}>{part}</Reveal>
    ) : (
      <div
        className="pin-part"
        style={{ "--pin-delay": `${d}ms` } as React.CSSProperties}
      >
        {part}
      </div>
    );

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Fixed panel height keeps all three step titles on the same baseline,
          regardless of how tall each mock is. */}
      <Part d={delay}>
        <div className="relative mb-6 flex min-h-[17rem] items-center rounded-2xl border border-charcoal/8 bg-charcoal-900 p-3.5 shadow-[0_24px_50px_-30px_rgba(27,24,21,0.6)]">
          {children}
        </div>
      </Part>
      <Part d={delay + 130}>
        <div className="flex items-baseline gap-3">
          <span className="tnum font-mono text-sm font-semibold text-terracotta-600">
            {n}
          </span>
          <h3 className="font-display text-xl font-semibold text-charcoal">
            {title}
          </h3>
        </div>
      </Part>
      <Part d={delay + 190}>
        <p className="mt-2 max-w-xs text-[0.98rem] leading-relaxed text-warmgray">
          {body}
        </p>
      </Part>
      {caps && caps.length > 0 && (
        <Part d={delay + 250}>
          <ul className="mt-4 space-y-2">
            {caps.map((cap) => (
              <li key={cap.label} className="flex items-center gap-2.5">
                <Icon
                  name={cap.icon}
                  size={15}
                  className="shrink-0 text-terracotta-600"
                />
                <span className="text-sm font-medium text-charcoal/75">
                  {cap.label}
                </span>
              </li>
            ))}
          </ul>
        </Part>
      )}
    </div>
  );
}
