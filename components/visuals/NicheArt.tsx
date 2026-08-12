import { cn } from "@/lib/cn";
import type { NicheId } from "@/lib/site";

/**
 * Per-genre card art for "Who it's for". Two tiers, and the order matters:
 *
 *   1. A subject drawing — what you film. Recognisable in a glance, because
 *      visitors skim this grid rather than read six topic lines.
 *   2. A structure strip + short caption — what Revela understands about it.
 *      The caption is load-bearing: unlabelled bars beside a plate read as
 *      decoration, "Hook → verdict" reads as a claim.
 *
 * Server component — static SVG, no client JS, no hydration risk. Drawings
 * follow the icon system in ./icons (no fill, currentColor, round caps) at
 * strokeWidth 2 in a 48px box, which is optically equal to 1.75 at 24px.
 */

type Tone = "hook" | "verdict" | "cta" | "body";
type Segment = { w: number; h: number; tone: Tone };

const toneFill: Record<Tone, string> = {
  hook: "fill-terracotta",
  verdict: "fill-sage-400",
  cta: "fill-ochre-400",
  body: "fill-cream/25",
};

/* --- Tier 1: subject drawings -------------------------------------------
   Base stroke is inherited (cream/70); each drawing carries exactly one
   terracotta element so it has a focal point and stays on-brand. */

const ACCENT = "text-terracotta-400";

const drawings: Record<NicheId, React.ReactElement> = {
  // Bowl with steam — the steam is the accent.
  food: (
    <>
      <path d="M5 26h38" />
      <path d="M7 26c0 9 7.6 15 17 15s17-6 17-15" />
      <g className={ACCENT} stroke="currentColor">
        <path d="M18 7c-3 3 3 5 0 8" />
        <path d="M28 5c-3 3 3 5 0 8" />
      </g>
    </>
  ),
  // A serum bottle is the hero — the most instantly readable "product being
  // reviewed" — with a phone set behind and smaller, so the card still covers
  // tech and places without going abstract.
  reviews: (
    <>
      {/* Phone, behind and to the side. */}
      <rect x="30" y="16" width="13" height="25" rx="2.5" opacity={0.5} />
      <path d="M34 21h5" opacity={0.5} />
      <g className={ACCENT} stroke="currentColor">
        {/* Dropper bottle: shoulders, neck, cap. */}
        <path d="M12 22h10a4 4 0 0 1 4 4v11a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V26a4 4 0 0 1 4-4z" />
        <path d="M14 22v-4h6v4" />
        <path d="M15 12h4a1.5 1.5 0 0 1 1.5 1.5V18h-7v-4.5A1.5 1.5 0 0 1 15 12z" />
        <path d="M11.5 30h11" />
      </g>
    </>
  ),
  // Price tag — the tag itself is the accent, sparkle in the base stroke.
  promos: (
    <>
      <g className={ACCENT} stroke="currentColor">
        <path d="M25 5h16a2 2 0 0 1 2 2v16L23 43 5 25z" />
        <circle cx="36" cy="12" r="2.5" />
      </g>
      <path d="M12 6v6M9 9h6" />
    </>
  ),
  // Handheld camera — record dot is the accent.
  vlogs: (
    <>
      <rect x="6" y="15" width="27" height="19" rx="3" />
      <path d="M33 22l9-5v20l-9-5" />
      <g className={ACCENT} stroke="currentColor">
        <circle cx="14" cy="22" r="2.5" />
      </g>
    </>
  ),
  // Board on legs with a climbing line.
  teaching: (
    <>
      <rect x="5" y="7" width="38" height="27" rx="2.5" />
      <path d="M15 34l-4 8M33 34l4 8" />
      <g className={ACCENT} stroke="currentColor">
        <path d="M12 27l8-7 7 5 9-11" />
      </g>
    </>
  ),
  // Unknown: dashed frame around a question mark.
  other: (
    <>
      <rect x="6" y="8" width="36" height="32" rx="4" strokeDasharray="5 4" />
      <path d="M20 20a4.5 4.5 0 1 1 4.5 4.5V28" />
      <path d="M24.5 33v.5" />
    </>
  ),
};

/* --- Tier 2: structure strips -------------------------------------------
   Each genre's beat order as a silhouette. Deterministic arrays, no
   randomness — same SSR/hydration guarantee as Waveform. */

const strips: Record<NicheId, readonly Segment[]> = {
  // Opens on the hook, coasts, lands hard on the verdict.
  food: [
    { w: 16, h: 16, tone: "hook" },
    { w: 12, h: 6, tone: "body" },
    { w: 12, h: 6, tone: "body" },
    { w: 14, h: 9, tone: "body" },
    { w: 16, h: 12, tone: "body" },
    { w: 22, h: 19, tone: "verdict" },
  ],
  // Hook, then it argues — back and forth — then calls it.
  reviews: [
    { w: 16, h: 16, tone: "hook" },
    { w: 11, h: 14, tone: "body" },
    { w: 11, h: 6, tone: "body" },
    { w: 11, h: 14, tone: "body" },
    { w: 11, h: 6, tone: "body" },
    { w: 11, h: 14, tone: "body" },
    { w: 20, h: 11, tone: "verdict" },
  ],
  // Hook, steady product beats, flares into the call-to-action.
  promos: [
    { w: 16, h: 16, tone: "hook" },
    { w: 13, h: 8, tone: "body" },
    { w: 13, h: 8, tone: "body" },
    { w: 13, h: 8, tone: "body" },
    { w: 13, h: 8, tone: "body" },
    { w: 26, h: 20, tone: "cta" },
  ],
  // No single payoff — it just flows. Deliberately flat.
  vlogs: [
    { w: 14, h: 10, tone: "body" },
    { w: 14, h: 10, tone: "body" },
    { w: 14, h: 10, tone: "body" },
    { w: 14, h: 10, tone: "body" },
    { w: 14, h: 10, tone: "body" },
    { w: 14, h: 10, tone: "body" },
    { w: 14, h: 10, tone: "body" },
  ],
  // Builds. Each beat sits on the one before it.
  teaching: [
    { w: 15, h: 5, tone: "body" },
    { w: 15, h: 8, tone: "body" },
    { w: 15, h: 11, tone: "body" },
    { w: 15, h: 14, tone: "body" },
    { w: 15, h: 17, tone: "body" },
    { w: 15, h: 20, tone: "verdict" },
  ],
  // Unknown shape — see the dashed special case in Strip below.
  other: [],
};

const captions: Record<NicheId, string> = {
  food: "Hook → verdict",
  reviews: "Pro / con → call",
  promos: "Hook → CTA",
  vlogs: "Moment → moment",
  teaching: "Step by step",
  other: "You tell us",
};

const GAP = 4;
const STRIP_H = 20;

function Strip({ variant }: { variant: NicheId }) {
  const segments = strips[variant];

  // "Something else" has no known shape — say so rather than invent one.
  if (segments.length === 0) {
    return (
      <svg
        viewBox="0 0 120 20"
        preserveAspectRatio="none"
        className="h-3 w-full"
        aria-hidden
      >
        <rect
          x="1"
          y="1"
          width="118"
          height="18"
          rx="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 5"
          className="text-cream/25"
        />
      </svg>
    );
  }

  const total =
    segments.reduce((sum, s) => sum + s.w, 0) + GAP * (segments.length - 1);
  let x = 0;

  return (
    <svg
      viewBox={`0 0 ${total} ${STRIP_H}`}
      preserveAspectRatio="none"
      className="h-3 w-full"
      aria-hidden
    >
      {segments.map((s, i) => {
        const rect = (
          <rect
            key={i}
            x={x}
            y={STRIP_H - s.h}
            width={s.w}
            height={s.h}
            rx={1.5}
            className={cn(
              toneFill[s.tone],
              // The hook segment answers the card's hover.
              s.tone === "hook" &&
                "transition-colors duration-200 group-hover:fill-terracotta-400"
            )}
          />
        );
        x += s.w + GAP;
        return rect;
      })}
    </svg>
  );
}

export function NicheArt({
  variant,
  muted = false,
  className,
}: {
  variant: NicheId;
  /** Dims the whole block for "coming soon" lanes, so live lanes look live. */
  muted?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(muted && "opacity-45", className)}>
      <svg
        viewBox="0 0 48 48"
        className="h-12 w-12 text-cream/70"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {drawings[variant]}
      </svg>

      <div className="mt-5 w-full max-w-[11rem]">
        <Strip variant={variant} />
        <p className="mt-2 font-mono text-[0.55rem] font-medium uppercase tracking-[0.1em] text-cream/45">
          {captions[variant]}
        </p>
      </div>
    </div>
  );
}
