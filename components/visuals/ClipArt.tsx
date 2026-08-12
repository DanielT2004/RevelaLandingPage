import { cn } from "@/lib/cn";
import type { DeckNiche, Scene } from "@/lib/site";

/**
 * The clip preview inside a swipe card — framed as a shot, not an icon.
 *
 * The viewBox is portrait (4:5) and rendered with preserveAspectRatio="slice",
 * so the art COVERS the panel and is cropped by it. Shapes are deliberately
 * drawn past the viewBox edges (arms reach x=6 and x=114, shoulders run off
 * both sides); that overflow is what produces the edge-to-edge crop of a real
 * medium close-up. Draw inside the box and you get a small figure floating in
 * dead space.
 *
 * ONE stroke weight, ONE colour for the whole drawing. An earlier version used
 * three opacity tiers for depth and it just read as muddy shading at this size.
 *
 * The single exception — and the signature — is the hair: a solid marigold
 * afro, the same on every figure (picked from the hairstyle specimen sheet).
 * It's the one hit of colour in the deck, and it makes the cast feel drawn
 * rather than generated. Still faceless: the visitor is meant to see their
 * own footage here.
 *
 * `animate` is passed only for the top card of the stack; the cards behind
 * stay still. Every looping element carries `data-loop`, which
 * app/globals.css already disables under reduced motion.
 */

/**
 * The signature: a marigold afro. Solid fill, no stroke — it should read as
 * a shape, not a line. A cloud of circles around the crown, with a wedge
 * closing the gaps between them so the silhouette stays solid.
 */
function Hair({ cy }: { cy: number }) {
  // Hugs the skull rather than ballooning above it: the crown circle tops out
  // at cy-31 (y=15 on the Talking scene), clear of the frame edge and the
  // verdict/HOOK chips that overlay the top of the card.
  return (
    <g className="fill-marigold" stroke="none">
      <circle cx="60" cy={cy - 20} r="11" />
      <circle cx="47" cy={cy - 16} r="9.5" />
      <circle cx="73" cy={cy - 16} r="9.5" />
      <circle cx="39" cy={cy - 7} r="7.5" />
      <circle cx="81" cy={cy - 7} r="7.5" />
      <circle cx="37" cy={cy + 2} r="6" />
      <circle cx="83" cy={cy + 2} r="6" />
      <path
        d={`M37 ${cy + 2} L37 ${cy - 12} L60 ${cy - 27} L83 ${cy - 12}
            L83 ${cy + 2} A17 19 0 0 0 37 ${cy + 2} Z`}
      />
    </g>
  );
}

/**
 * Head, neck and shoulders. `cy` is the head centre.
 *
 * The shoulders slope out and run off the BOTTOM CORNERS of the frame — they
 * must not curve back in, or the silhouette closes into a blob. Forearms are
 * separate strokes laid in front, which is also what reads as "holding".
 */
function Bust({ cy = 46, forearms = true }: { cy?: number; forearms?: boolean }) {
  return (
    <>
      <ellipse cx="60" cy={cy} rx="17" ry="19" />
      <Hair cy={cy} />
      {/* Neck — joined to both head and shoulders, no floating gap. */}
      <path d={`M54 ${cy + 17}v12M66 ${cy + 17}v12`} />
      {/* Collar. */}
      <path d={`M50 ${cy + 29}L60 ${cy + 42}L70 ${cy + 29}`} />
      {/* Torso. The slope off the neck stays SHALLOW to the shoulder point,
          then turns down hard — curve it evenly and the silhouette becomes a
          dome. Shoulder points sit at x=20/100 so they reach the frame edges. */}
      <path
        d={`M50 ${cy + 30}C40 ${cy + 31} 28 ${cy + 34} 20 ${cy + 42}
            C12 ${cy + 50} 6 ${cy + 64} 4 ${cy + 80}
            C3 ${cy + 92} 2 ${cy + 100} 2 ${cy + 106}`}
      />
      <path
        d={`M70 ${cy + 30}C80 ${cy + 31} 92 ${cy + 34} 100 ${cy + 42}
            C108 ${cy + 50} 114 ${cy + 64} 116 ${cy + 80}
            C117 ${cy + 92} 118 ${cy + 100} 118 ${cy + 106}`}
      />
      {forearms && (
        <>
          <path
            d={`M14 ${cy + 106}C18 ${cy + 94} 26 ${cy + 86} 42 ${cy + 82}`}
          />
          <path
            d={`M106 ${cy + 106}C102 ${cy + 94} 94 ${cy + 86} 78 ${cy + 82}`}
          />
        </>
      )}
    </>
  );
}

/**
 * The thing being filmed, by deck genre.
 * "held" = cradled at chest height, toward camera.
 * "center" = the close-up insert, large and alone.
 */
function Prop({ genre, mode }: { genre: DeckNiche; mode: "held" | "center" }) {
  const held = mode === "held";
  // Filled with the panel colour so the prop sits IN FRONT of the body —
  // without it the torso and collar lines show straight through it.
  const solid = "fill-charcoal-900";
  if (genre === "food") {
    return held ? (
      <>
        <ellipse cx="60" cy="124" rx="34" ry="10" className={solid} />
        <ellipse cx="60" cy="122" rx="20" ry="6" />
        <path d="M48 118c4-10 7-14 12-14s8 4 12 14" />
      </>
    ) : (
      <>
        <ellipse cx="60" cy="96" rx="45" ry="14" className={solid} />
        <ellipse cx="60" cy="93" rx="26" ry="8" />
        <path d="M45 89c4-12 9-18 15-18s11 6 15 18" />
      </>
    );
  }
  if (genre === "reviews") {
    return held ? (
      <>
        <rect x="41" y="100" width="38" height="30" rx="3" className={solid} />
        <path d="M47 108h14" />
      </>
    ) : (
      <>
        <rect x="30" y="42" width="60" height="78" rx="5" className={solid} />
        <path d="M42 58h24" />
        <path d="M42 104h36" />
      </>
    );
  }
  return held ? (
    <>
      <rect x="49" y="104" width="22" height="28" rx="3" className={solid} />
      <path d="M54 104v-9h12v9" className={solid} />
      <path d="M53 119h14" />
    </>
  ) : (
    <>
      <rect x="40" y="58" width="40" height="60" rx="7" className={solid} />
      <path d="M50 58V40h20v18" className={solid} />
      <path d="M48 86h24" />
    </>
  );
}

/** Crop marks near the frame corners — the Revela mark's own language. */
function CropMarks() {
  return <path d="M10 28V14h14M110 28V14H96M10 122v14h14M110 122v14H96" />;
}

const scenes: Record<
  Scene,
  (genre: DeckNiche, animate: boolean) => React.ReactNode
> = {
  // To camera, presenting the thing at chest height.
  Talking: (genre, animate) => (
    <g
      data-loop={animate || undefined}
      className={animate ? "clip-bob" : undefined}
    >
      <Bust />
      <Prop genre={genre} mode="held" />
    </g>
  ),

  // At the stove: torso behind, pan spanning the frame in front, steam rising.
  Cooking: (_genre, animate) => (
    <>
      <Bust cy={34} forearms={false} />
      <g
        className={cn(animate && "clip-steam")}
        data-loop={animate || undefined}
      >
        <path d="M40 96c-4 4 4 7 0 11" />
        <path d="M60 90c-4 4 4 7 0 11" />
        <path d="M80 96c-4 4 4 7 0 11" />
      </g>
      {/* Shallow skillet, filled so the body reads as being behind it. Sits
          high enough to clear the caption scrim at the bottom of the panel. */}
      <path
        d="M-8 108h136v2c0 15-12 25-30 25H22c-18 0-30-10-30-25z"
        className="fill-charcoal-900"
      />
    </>
  ),

  // Insert from above: the plate fills the width, chopsticks from the corner.
  Plating: (_genre, animate) => (
    <>
      <ellipse cx="60" cy="112" rx="50" ry="17" className="fill-charcoal-900" />
      <ellipse cx="60" cy="109" rx="30" ry="10" />
      <path d="M44 104c5-14 10-21 16-21s11 7 16 21" />
      <g
        className={cn(animate && "clip-drift")}
        data-loop={animate || undefined}
      >
        {/* Chopsticks. A drawn hand at this size turns into a goblet. */}
        <path d="M128 4L70 78" />
        <path d="M140 20L78 84" />
        <circle cx="72" cy="84" r="4" />
      </g>
    </>
  ),

  // Caught mid-reaction: head high, hands up at both frame edges.
  Reaction: (_genre, animate) => (
    <g
      data-loop={animate || undefined}
      className={animate ? "clip-pop" : undefined}
    >
      <Bust cy={54} forearms={false} />
      {/* Hands thrown up beside the head. */}
      <path d="M6 150C4 130 10 116 22 110" />
      <path d="M114 150C116 130 110 116 98 110" />
      <path d="M28 22l-9-9M18 44l-11-5M20 66l-11 4" />
      <path d="M92 22l9-9M102 44l11-5M100 66l11 4" />
    </g>
  ),

  // Insert shot: the product alone, large, inside crop marks.
  "B-roll": (genre, animate) => (
    <>
      <CropMarks />
      <g
        className={cn(animate && "clip-drift")}
        data-loop={animate || undefined}
      >
        <Prop genre={genre} mode="center" />
      </g>
    </>
  ),

  // Device large and cropped by the right edge, tapped from below.
  Demo: (_genre, animate) => (
    <>
      <rect x="14" y="38" width="106" height="68" rx="5" />
      <path d="M60 106v16M32 128h56" />
      <path d="M130 158L94 104" />
      <g className={cn(animate && "clip-tap")} data-loop={animate || undefined}>
        <circle cx="92" cy="100" r="4" />
        <path d="M102 88a18 18 0 0 1 5 13" />
        <path d="M112 76a30 30 0 0 1 7 22" />
      </g>
    </>
  ),
};

export function ClipArt({
  scene,
  genre,
  animate = false,
  className,
}: {
  scene: Scene;
  genre: DeckNiche;
  animate?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 150"
      // "slice" makes the art cover and crop rather than letterbox. It scales
      // uniformly, so nothing distorts and stroke weights stay even.
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full text-cream/70", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {scenes[scene](genre, animate)}
    </svg>
  );
}
