import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "ghostDark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[transform,background-color,box-shadow] duration-200 ease-[var(--ease-revela)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-terracotta text-cream shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_8px_20px_-8px_rgba(181,101,74,0.6)] hover:bg-terracotta-600",
  ghost:
    "border border-charcoal/15 bg-transparent text-charcoal hover:border-charcoal/30 hover:bg-charcoal/[0.03]",
  ghostDark:
    "border border-cream/20 bg-transparent text-cream hover:border-cream/40 hover:bg-cream/[0.06]",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-[3.4rem] px-7 text-[1.02rem]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md") {
  return cn(base, variants[variant], sizes[size]);
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: {
  variant?: Variant;
  size?: Size;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(buttonClasses(variant, size), className)} {...props}>
      {children}
    </button>
  );
}
