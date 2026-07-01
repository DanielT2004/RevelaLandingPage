import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./icons";

/** Benefit-led card for the features bento. `wide` spans two columns and can
 *  hold a larger visual (children) below the copy. */
export function FeatureCard({
  icon,
  title,
  body,
  wide = false,
  children,
  className,
}: {
  icon: IconName;
  title: string;
  body: string;
  wide?: boolean;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border border-charcoal/8 bg-cream-50 p-6 transition-colors hover:border-charcoal/15",
        wide && "sm:col-span-2",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-terracotta-50 text-terracotta-600">
          <Icon name={icon} size={21} />
        </span>
        <h3 className="font-display text-lg font-semibold text-charcoal">
          {title}
        </h3>
      </div>
      <p className="mt-3 text-[0.98rem] leading-relaxed text-warmgray">{body}</p>
      {children ? <div className="mt-5">{children}</div> : null}
    </div>
  );
}
