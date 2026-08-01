import { cn } from "@/lib/cn";

/** Brand mark — "The Frame": charcoal serif R on a cream tile with two
 *  terracotta crop marks. Geometry mirrors lib/logo.ts (the rasterization
 *  source for favicons + app icons); here the R is set in the site's real
 *  display face via --font-display, so the nav mark matches the wordmark. */
export function Logomark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        // Hairline + soft lift so the cream tile keeps an edge on cream
        // surfaces (nav); both are imperceptible on the dark footer.
        "inline-flex h-7 w-7 overflow-hidden rounded-[0.55rem] shadow-sm ring-1 ring-charcoal/15",
        className
      )}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <rect width="100" height="100" fill="#F7F3EC" />
        <text
          x="50"
          y="69"
          textAnchor="middle"
          fontWeight="700"
          fontSize="54"
          fill="#2E2A26"
          style={{ fontFamily: "var(--font-display)" }}
        >
          R
        </text>
        <path
          d="M21 35 L21 21 L35 21"
          fill="none"
          stroke="#B5654A"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M79 65 L79 79 L65 79"
          fill="none"
          stroke="#B5654A"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
