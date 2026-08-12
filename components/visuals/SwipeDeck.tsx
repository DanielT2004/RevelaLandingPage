"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
  useTransform,
  useReducedMotion,
  type AnimationPlaybackControls,
  type PanInfo,
  type Variants,
} from "framer-motion";
import { PhoneFrame } from "./PhoneFrame";
import { Waveform } from "./Waveform";
import { ClipArt } from "./ClipArt";
import { useInView } from "@/components/motion/useInView";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import {
  TRY_SWIPE,
  type ClipTone,
  type ClipVerdict,
  type DeckNiche,
  type DemoClip,
} from "@/lib/site";

/** The four real sort actions: swipe → keep / ← cut; hook & B-roll via buttons. */
export type Decision = "keep" | "cut" | "hook" | "broll";

const THRESHOLD = 90;
const EASE = [0.22, 1, 0.36, 1] as const;

/** Verdict-chip colour, matching the app: sage = keep, terracotta = cut,
 *  ochre = "your call" / B-roll. */
const toneChip: Record<ClipTone, string> = {
  sage: "bg-sage text-cream",
  terracotta: "bg-terracotta text-cream",
  ochre: "bg-ochre text-cream",
};

function VerdictIcon({ verdict }: { verdict: ClipVerdict }) {
  const common = { width: 9, height: 9, viewBox: "0 0 24 24", "aria-hidden": true };
  switch (verdict) {
    case "Strong keep":
      return (
        <svg {...common} fill="currentColor">
          <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2l-6.1 3.4 1.4-6.8L2.2 9.1l6.9-.8z" />
        </svg>
      );
    case "Keeper":
      return (
        <svg {...common} fill="none">
          <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "Your call":
      return (
        <svg {...common} fill="none">
          <path d="M9 9a3 3 0 1 1 4.2 2.8c-.9.4-1.2 1-1.2 2M12 17.5v.1" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    default: // Suggested cut — scissors
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <circle cx="6.5" cy="6.5" r="2.5" />
          <circle cx="6.5" cy="17.5" r="2.5" />
          <path d="M8.7 8.2L20 19M8.7 15.8L20 5" />
        </svg>
      );
  }
}

/** One triage card. Only the top card is draggable and shows keep/cut stamps. */
function DeckCard({
  clip,
  index,
  isTop,
  genre,
  demo,
  onDecide,
  onInteract,
}: {
  clip: DemoClip;
  index: number;
  isTop: boolean;
  genre: DeckNiche;
  /** Play the one-time teaching nudge (top card, first view, pre-interaction). */
  demo: boolean;
  onDecide: (d: Decision) => void;
  onInteract: () => void;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], reduce ? [0, 0] : [-12, 12]);
  const keepOpacity = useTransform(x, [24, 110], [0, 1]);
  const cutOpacity = useTransform(x, [-110, -24], [1, 0]);
  // Idle edge pills fade out the moment the card is grabbed.
  const pillOpacity = useTransform(x, (v) => Math.max(0, 1 - Math.abs(v) / 50));

  // Auto-nudge: tilt right (flash KEEP), back, tilt left (flash CUT), settle —
  // demonstrating the gesture + direction + colour. Re-arms every few seconds
  // while the visitor hasn't interacted (the app's own behavior); stops for
  // good the moment they take over. Skipped under reduced motion.
  const demoControls = useRef<AnimationPlaybackControls | null>(null);
  useEffect(() => {
    if (reduce || !demo) {
      demoControls.current?.stop();
      return;
    }
    const play = (delay: number) => {
      demoControls.current = animate(x, [0, 52, 0, -52, 0], {
        duration: 2.6,
        times: [0, 0.22, 0.46, 0.72, 1],
        ease: "easeInOut",
        delay,
      });
    };
    play(0.7);
    const id = setInterval(() => play(0), 3800);
    return () => {
      clearInterval(id);
      demoControls.current?.stop();
    };
  }, [demo, reduce, x]);

  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x > THRESHOLD) onDecide("keep");
    else if (info.offset.x < -THRESHOLD) onDecide("cut");
  }

  const exitVariants: Variants = {
    exit: (dir: Decision) => ({
      x: dir === "cut" ? -620 : dir === "keep" ? 620 : 0,
      y: dir === "hook" ? -620 : dir === "broll" ? 620 : 0,
      opacity: 0,
      rotate: dir === "cut" ? -18 : dir === "keep" ? 18 : 0,
      transition: { duration: 0.35, ease: EASE },
    }),
  };

  return (
    <motion.div
      className="absolute inset-0"
      style={{ x, rotate, zIndex: 10 - index }}
      variants={exitVariants}
      exit="exit"
      initial={isTop ? false : { scale: 0.94, y: 14, opacity: 0.85 }}
      animate={
        isTop
          ? { scale: 1, y: 0, opacity: 1 }
          : { scale: 0.94, y: 14, opacity: 0.85 }
      }
      transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
      drag={isTop ? "x" : false}
      dragSnapToOrigin
      dragElastic={0.55}
      dragConstraints={{ left: 0, right: 0 }}
      onDragStart={isTop ? onInteract : undefined}
      onDragEnd={isTop ? onDragEnd : undefined}
      whileTap={isTop ? { cursor: "grabbing" } : undefined}
    >
      <div
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-2xl border border-cream/10 bg-charcoal-700 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.7)]",
          isTop && "cursor-grab"
        )}
      >
        {/* Hero — the clip preview, like the app's looping player */}
        <div className="relative flex-1 overflow-hidden bg-charcoal-900">
          {/* The footage itself — a close-up of a person, cropped by the panel
              edges, so the card reads as a real clip and not an empty player.
              Only the top card loops. Drawn BEFORE the wash: the art uses
              charcoal-900 fills to occlude, which must match the bare panel. */}
          <div className="absolute inset-0">
            <ClipArt scene={clip.scene} genre={genre} animate={isTop} />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cream/[0.08] to-transparent" />
          {/* Top scrim: the head now sits behind the verdict and HOOK pills. */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-charcoal-900/70 to-transparent" />
          <Waveform
            bars={36}
            className="absolute inset-x-3 bottom-8 h-4 text-cream/15"
          />

          {/* AI verdict chip — the app's read on this clip */}
          <span
            className={cn(
              "absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.55rem] font-semibold",
              toneChip[clip.tone]
            )}
          >
            <VerdictIcon verdict={clip.verdict} />
            {clip.verdict}
          </span>

          {/* Caption — serif italic over a bottom gradient, like the app */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal-900/90 to-transparent px-2.5 pb-2 pt-5">
            <span className="font-display text-[0.72rem] italic text-cream/90">
              {clip.label}
            </span>
          </div>

          {/* Idle edge pills — the app's own affordance: each pinned to the
              edge you swipe toward, fading as the card is grabbed. */}
          {isTop && (
            <motion.div
              style={{ opacity: pillOpacity }}
              className="pointer-events-none absolute inset-0 z-10"
              aria-hidden
            >
              <span className="absolute right-2.5 top-2.5 rounded-full bg-charcoal-900/60 px-2 py-0.5 font-mono text-[0.5rem] font-bold uppercase tracking-[0.08em] text-cream/90">
                ↑ {TRY_SWIPE.hookLabel}
              </span>
              <span className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-charcoal-900/60 px-2 py-0.5 font-mono text-[0.5rem] font-bold uppercase tracking-[0.08em] text-cream/90">
                ← {TRY_SWIPE.cutLabel}
              </span>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-charcoal-900/60 px-2 py-0.5 font-mono text-[0.5rem] font-bold uppercase tracking-[0.08em] text-cream/90">
                {TRY_SWIPE.keepLabel} →
              </span>
              <span className="absolute bottom-9 left-1/2 -translate-x-1/2 rounded-full bg-charcoal-900/60 px-2 py-0.5 font-mono text-[0.5rem] font-bold uppercase tracking-[0.08em] text-cream/90">
                ↓ {TRY_SWIPE.brollLabel}
              </span>
            </motion.div>
          )}

          {/* Ghost touch-point — rides INSIDE the card, so the re-arming
              nudge makes it read as a finger dragging the card left/right.
              Chevrons echo the verdict colors. Gone on first interaction. */}
          {isTop && demo && (
            <motion.div
              style={{ opacity: pillOpacity }}
              className="pointer-events-none absolute inset-0 z-20 grid place-items-center"
              aria-hidden
            >
              <div className="flex items-center gap-4">
                <svg className="hint-nudge-left text-terracotta-400" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="relative grid h-14 w-14 place-items-center">
                  {/* Breathing touch ripple */}
                  <motion.span
                    animate={reduce ? undefined : { scale: [1, 1.25, 1], opacity: [0.5, 0.15, 0.5] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-full border-2 border-cream/70"
                  />
                  <span className="absolute inset-3 rounded-full bg-cream/25 backdrop-blur-[1px]" />
                  {/* Pointing hand */}
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="relative text-cream drop-shadow">
                    <path
                      d="M9 11V4.5a1.5 1.5 0 0 1 3 0V10m0 0V8.5a1.5 1.5 0 0 1 3 0V10m0 0v-.5a1.5 1.5 0 0 1 3 0V11m0 0a1.5 1.5 0 0 1 3 0v4a6 6 0 0 1-6 6h-1.8a6 6 0 0 1-4.6-2.15L5.2 15.6a1.6 1.6 0 0 1 2.45-2.06L9 15V11z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <svg className="hint-nudge-right text-sage-400" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>
          )}

          {/* Drag stamps (top card only) */}
          {isTop && (
            <>
              <motion.span
                style={{ opacity: keepOpacity }}
                className="absolute right-3 top-8 rotate-12 rounded-md border-2 border-sage-400 px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wide text-sage-400"
              >
                Keep
              </motion.span>
              <motion.span
                style={{ opacity: cutOpacity }}
                className="absolute left-3 top-8 -rotate-12 rounded-md border-2 border-terracotta-400 px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wide text-terracotta-400"
              >
                Cut
              </motion.span>
            </>
          )}
        </div>

        {/* Footer — scene chip, duration, and the app's one-line reason note */}
        <div className="space-y-1.5 p-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-full bg-terracotta/15 px-2 py-0.5 text-[0.55rem] font-semibold text-terracotta-400">
              {clip.scene}
            </span>
            <span className="tnum font-mono text-[0.6rem] text-cream/55">
              {clip.dur}s
            </span>
          </div>
          <div className="flex items-start gap-1.5 rounded-lg bg-cream/[0.06] px-2 py-1.5">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta-400" />
            <span className="text-[0.6rem] leading-snug text-cream/65">
              {clip.reason}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/** Circular sort button, mirroring the app's action row under the deck. */
function ActionButton({
  label,
  onClick,
  className,
  big = false,
  children,
}: {
  label: string;
  onClick: () => void;
  className: string;
  big?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-center gap-1"
    >
      <span
        className={cn(
          "grid place-items-center rounded-full transition-transform group-active:scale-90",
          big ? "h-11 w-11" : "h-9 w-9",
          className
        )}
      >
        {children}
      </span>
      <span className="font-mono text-[0.5rem] uppercase tracking-[0.08em] text-cream/50">
        {label}
      </span>
    </button>
  );
}

export function SwipeDeck({
  clips: CLIPS,
  project,
  genre,
  initialInteracted = false,
  onDecide,
  onReset,
  belowPhone,
}: {
  clips: readonly DemoClip[];
  project: string;
  /** Picks the prop the figure in each clip preview is holding. */
  genre: DeckNiche;
  /** True when this deck was reached by switching genre — skips the
   *  one-time teaching nudge (it already played on the first deck). */
  initialInteracted?: boolean;
  /** Mirrors each sort decision up (drives the SpineStrip consequence rail). */
  onDecide?: (d: Decision, clipIndex: number) => void;
  onReset?: () => void;
  /** Rendered between the phone and the done-CTA (the SpineStrip). */
  belowPhone?: React.ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [exitDir, setExitDir] = useState<Decision>("keep");
  const [flash, setFlash] = useState<{ id: number; d: Decision } | null>(null);
  const [announce, setAnnounce] = useState("");
  const [interacted, setInteracted] = useState(initialInteracted);

  // Trigger the teaching nudge only once the deck is actually on screen.
  const { ref, inView } = useInView<HTMLDivElement>({ amount: 0.6 });

  const done = index >= CLIPS.length;
  const cutCount = decisions.filter((d) => d === "cut").length;
  const keptCount = decisions.filter((d) => d === "keep" || d === "hook").length;
  const brollCount = decisions.filter((d) => d === "broll").length;
  const hookSet = decisions.includes("hook");
  const cutSeconds = CLIPS.reduce(
    (s, c, i) =>
      decisions[i] === "keep" || decisions[i] === "hook" ? s + c.dur : s,
    0
  );

  function markInteracted() {
    setInteracted(true);
  }

  function decide(d: Decision) {
    if (done) return;
    setInteracted(true);
    const clip = CLIPS[index];
    setExitDir(d);
    setFlash({ id: index, d });
    setDecisions((prev) => [...prev, d]);
    onDecide?.(d, index);
    const verb =
      d === "keep"
        ? "kept"
        : d === "cut"
          ? "cut"
          : d === "hook"
            ? "set as your hook"
            : "sent to B-roll";
    setAnnounce(`${clip.label} ${verb}. ${index + 1} of ${CLIPS.length}.`);
    setIndex((i) => i + 1);
  }

  function reset() {
    setIndex(0);
    setDecisions([]);
    setFlash(null);
    setInteracted(true); // don't re-run the nudge on replay
    setAnnounce("Deck reset.");
    onReset?.();
  }

  // Commit flash — the app's big circular confirmation badge.
  const flashStyle: Record<Decision, { bg: string; glyph: React.ReactNode }> = {
    keep: {
      bg: "bg-sage",
      glyph: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    cut: {
      bg: "bg-terracotta",
      glyph: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      ),
    },
    hook: {
      bg: "bg-charcoal-900",
      glyph: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2l-6.1 3.4 1.4-6.8L2.2 9.1l6.9-.8z" />
        </svg>
      ),
    },
    broll: {
      bg: "bg-ochre",
      glyph: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="4" y="4" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M9 20h9a2 2 0 0 0 2-2V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  };

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[300px]">
      {/* Discoverability chip — cold visitors don't know cards are swipeable.
          Gone the moment they interact. */}
      {!interacted && !done && (
        <div className="pointer-events-none absolute -top-3 left-1/2 z-30 -translate-x-1/2 animate-pulse whitespace-nowrap rounded-full bg-terracotta px-3 py-1 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-cream shadow-[0_8px_20px_-8px_rgba(181,101,74,0.8)]">
        👆 {TRY_SWIPE.tryIt}
        </div>
      )}
      <PhoneFrame>
        <div className="flex h-full flex-col px-3 pb-3 pt-8">
          {/* Editor shell header: home · project title · export */}
          <div className="flex items-center justify-between">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-cream/10 text-cream/60">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-[0.62rem] font-medium text-cream/85">
              {project}
            </span>
            <span className="rounded-md bg-terracotta px-2 py-1 text-[0.55rem] font-semibold text-cream">
              Export
            </span>
          </div>

          {/* Stage switcher: Sort · Arrange · Polish */}
          <div className="mt-2 flex gap-1 rounded-xl bg-cream/[0.06] p-1">
            {TRY_SWIPE.stages.map((stage, i) => (
              <span
                key={stage}
                className={cn(
                  "flex flex-1 items-center justify-center gap-1 rounded-lg py-1 text-[0.55rem]",
                  i === 0
                    ? "bg-charcoal-700 font-semibold text-cream shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
                    : "text-cream/40"
                )}
              >
                {i === 0 &&
                  (done ? (
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" aria-hidden className="text-sage-400">
                      <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <span className="h-1 w-1 rounded-full bg-terracotta-400" />
                  ))}
                {stage}
              </span>
            ))}
          </div>

          {/* Review progress + cut tray */}
          <div className="mt-2.5 flex items-center justify-between">
            <span className="font-mono text-[0.55rem] text-cream/55">
              {done
                ? `${CLIPS.length}/${CLIPS.length} sorted`
                : `Reviewing · ${index + 1} of ${CLIPS.length}`}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-cream/10 px-2 py-0.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden className="text-cream/60">
                <path d="M4 12l2-6h12l2 6v6H4zM4 12h5a3 3 0 0 0 6 0h5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              </svg>
              <span className="font-mono text-[0.5rem] uppercase tracking-[0.08em] text-cream/60">
                {TRY_SWIPE.trayLabel}
              </span>
              {cutCount > 0 && (
                <span className="tnum grid h-3.5 min-w-3.5 place-items-center rounded-full bg-terracotta px-0.5 font-mono text-[0.5rem] font-semibold text-cream">
                  {cutCount}
                </span>
              )}
            </span>
          </div>

          {/* Deck / done summary */}
          <div className="relative mt-2 flex-1">
            <AnimatePresence custom={exitDir} initial={false}>
              {!done &&
                CLIPS.map((clip, i) => {
                  if (i < index || i > index + 1) return null;
                  return (
                    <DeckCard
                      key={i}
                      clip={clip}
                      index={i}
                      isTop={i === index}
                      genre={genre}
                      demo={i === 0 && inView && !interacted}
                      onDecide={decide}
                      onInteract={markInteracted}
                    />
                  );
                })}
            </AnimatePresence>

            {/* Commit flash badge, like the app's ✓ / ✕ / ★ confirmation */}
            <AnimatePresence>
              {flash && (
                <motion.div
                  key={flash.id}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 1.08] }}
                  transition={{ duration: 0.55, times: [0, 0.3, 1], ease: "easeOut" }}
                  onAnimationComplete={() =>
                    setFlash((f) => (f?.id === flash.id ? null : f))
                  }
                  className="pointer-events-none absolute inset-0 z-20 grid place-items-center"
                >
                  <span
                    className={cn(
                      "grid h-16 w-16 place-items-center rounded-full text-cream shadow-[0_10px_30px_rgba(0,0,0,0.4)]",
                      flashStyle[flash.d].bg
                    )}
                  >
                    {flashStyle[flash.d].glyph}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {done && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex h-full flex-col items-center justify-center gap-2.5 px-3 text-center"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage text-cream">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M5 12.5l4.2 4.2L19 7"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <p className="font-display text-xl font-semibold text-cream">
                  {TRY_SWIPE.doneTitle}
                </p>
                <p className="text-[0.8rem] leading-relaxed text-cream/60">
                  All {CLIPS.length} clips sorted — your cut is ~{cutSeconds}s.
                </p>
                <div className="flex flex-wrap justify-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.08em]">
                  <span className="rounded-full bg-sage/20 px-2 py-1 text-sage-400">
                    Kept {keptCount}
                  </span>
                  <span className="rounded-full bg-terracotta/20 px-2 py-1 text-terracotta-400">
                    Cut {cutCount}
                  </span>
                  {hookSet && (
                    <span className="rounded-full bg-cream/10 px-2 py-1 text-cream/70">
                      ★ Hook set
                    </span>
                  )}
                  {brollCount > 0 && (
                    <span className="rounded-full bg-ochre/25 px-2 py-1 text-ochre-400">
                      B-roll {brollCount}
                    </span>
                  )}
                </div>
                <a
                  href="#waitlist"
                  className="mt-1 rounded-full bg-terracotta px-4 py-2 text-[0.7rem] font-semibold text-cream transition-colors hover:bg-terracotta-600"
                >
                  {TRY_SWIPE.exportCta}
                </a>
              </motion.div>
            )}
          </div>

          {/* Sort actions — the app's real button row: Cut · Hook · B-roll · Keep */}
          {!done && (
            <div className="mt-2.5 flex items-start justify-center gap-4">
              <ActionButton
                label={TRY_SWIPE.cutLabel}
                onClick={() => decide("cut")}
                className="border border-terracotta-400/50 bg-cream/[0.06] text-terracotta-400"
                big
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </ActionButton>
              <ActionButton
                label={TRY_SWIPE.hookLabel}
                onClick={() => decide("hook")}
                className="bg-cream/15 text-cream"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 19V5M6 11l6-6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </ActionButton>
              <ActionButton
                label={TRY_SWIPE.brollLabel}
                onClick={() => decide("broll")}
                className="bg-ochre text-cream"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="4" y="4" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M9 20h9a2 2 0 0 0 2-2V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </ActionButton>
              <ActionButton
                label={TRY_SWIPE.keepLabel}
                onClick={() => decide("keep")}
                className="bg-sage text-cream"
                big
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </ActionButton>
            </div>
          )}
        </div>
      </PhoneFrame>

      {/* The consequence rail (SpineStrip) — every swipe visibly lands here */}
      {belowPhone}

      {/* Waitlist CTA once sorted */}
      {done && (
        <div className="mt-6 flex flex-col items-center gap-3">
          <a href="#waitlist" className={buttonClasses("primary", "lg")}>
            {TRY_SWIPE.doneCta}
          </a>
          <button
            type="button"
            onClick={reset}
            className="text-sm text-cream/60 underline-offset-4 transition-colors hover:text-cream hover:underline"
          >
            {TRY_SWIPE.replay}
          </button>
        </div>
      )}

      {/* Screen-reader progress */}
      <p className="sr-only" role="status" aria-live="polite">
        {announce}
      </p>
    </div>
  );
}
