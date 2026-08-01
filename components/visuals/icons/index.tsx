import {
  Scissors,
  AudioLines,
  Fingerprint,
  FolderInput,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";

export type IconName =
  | "hook"
  | "swipe"
  | "scissors"
  | "audio"
  | "fingerprint"
  | "export"
  | "repeat";

const lucideMap: Partial<Record<IconName, LucideIcon>> = {
  scissors: Scissors,
  audio: AudioLines,
  fingerprint: Fingerprint,
  export: FolderInput,
  repeat: RotateCcw,
};

const svgProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Custom "hook" mark — the attention hook Revela finds in your footage. */
function HookIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden
      {...svgProps}
    >
      <path d="M15 4.5v7a4.5 4.5 0 1 1-5-4.48" />
      <path d="M12.4 6.4 15 4l2.4 2.6" />
    </svg>
  );
}

/** Custom "swipe" mark — the swipe-to-finish editing gesture. */
function SwipeIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden
      {...svgProps}
    >
      <path d="M9 12h9" />
      <path d="M14.5 8.5 18 12l-3.5 3.5" />
      <path d="M6 12h.01M3.5 12h.01" opacity={0.55} />
    </svg>
  );
}

export function Icon({
  name,
  size = 24,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  if (name === "hook") return <HookIcon size={size} className={className} />;
  if (name === "swipe") return <SwipeIcon size={size} className={className} />;

  const L = lucideMap[name];
  if (!L) return null;
  return (
    <L
      width={size}
      height={size}
      strokeWidth={1.75}
      className={className}
      aria-hidden
    />
  );
}
