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
import { useInView } from "@/components/motion/useInView";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { TRY_SWIPE } from "@/lib/site";

type Decision = "keep" | "cut";
type Clip = (typeof TRY_SWIPE.clips)[number];

const CLIPS = TRY_SWIPE.clips;
const THRESHOLD = 90;
const EASE = [0.22, 1, 0.36, 1] as const;

/** One clip card. Only the top card is draggable and shows keep/cut stamps. */
function DeckCard({
  clip,
  index,
  isTop,
  demo,
  onDecide,
  onInteract,
}: {
  clip: Clip;
  index: number;
  isTop: boolean;
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

  // Auto-nudge: tilt right (flash KEEP), back, tilt left (flash CUT), settle —
  // demonstrating the gesture + direction + colour. Runs once, stops the moment
  // the user takes over. Skipped under reduced motion.
  const demoStarted = useRef(false);
  const demoControls = useRef<AnimationPlaybackControls | null>(null);
  useEffect(() => {
    if (reduce) return;
    if (!demo) {
      demoControls.current?.stop();
      return;
    }
    if (demoStarted.current) return;
    demoStarted.current = true;
    demoControls.current = animate(x, [0, 52, 0, -52, 0], {
      duration: 2.6,
      times: [0, 0.22, 0.46, 0.72, 1],
      ease: "easeInOut",
      delay: 0.7,
    });
    return () => demoControls.current?.stop();
  }, [demo, reduce, x]);

  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x > THRESHOLD) onDecide("keep");
    else if (info.offset.x < -THRESHOLD) onDecide("cut");
  }

  const exitVariants: Variants = {
    exit: (dir: Decision) => ({
      x: dir === "cut" ? -620 : 620,
      opacity: 0,
      rotate: dir === "cut" ? -18 : 18,
      transition: { duration: reduce ? 0 : 0.35, ease: EASE },
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
          "flex h-full flex-col overflow-hidden rounded-2xl border border-cream/10 bg-charcoal-700 p-3 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.7)]",
          isTop && "cursor-grab"
        )}
      >
        {/* Clip preview */}
        <div className="relative flex-1 overflow-hidden rounded-xl bg-charcoal-900">
          <div className="absolute inset-0 bg-gradient-to-br from-cream/[0.08] to-transparent" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-cream/30">
            <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          </div>
          <span className="absolute left-2.5 top-2.5 rounded bg-charcoal-900/70 px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-cream/60">
            Clip {String(index + 1).padStart(2, "0")}
          </span>
          <span className="tnum absolute bottom-2.5 right-2.5 rounded bg-charcoal-900/70 px-1.5 py-0.5 font-mono text-[0.55rem] text-cream/60">
            {clip.time}
          </span>
          <Waveform
            bars={36}
            className="absolute inset-x-3 bottom-3 h-5 text-cream/20"
          />

          {/* Drag stamps (top card only) */}
          {isTop && (
            <>
              <motion.span
                style={{ opacity: keepOpacity }}
                className="absolute right-3 top-3 rotate-12 rounded-md border-2 border-sage-400 px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wide text-sage-400"
              >
                Keep
              </motion.span>
              <motion.span
                style={{ opacity: cutOpacity }}
                className="absolute left-3 top-3 -rotate-12 rounded-md border-2 border-terracotta-400 px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wide text-terracotta-400"
              >
                Cut
              </motion.span>
            </>
          )}
        </div>

        {/* Caption */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="truncate text-sm font-medium text-cream">
            {clip.label}
          </span>
          <span className="shrink-0 rounded-full bg-cream/10 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-cream/60">
            {clip.hint}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function SwipeDeck() {
  const [index, setIndex] = useState(0);
  const [kept, setKept] = useState(0);
  const [exitDir, setExitDir] = useState<Decision>("keep");
  const [announce, setAnnounce] = useState("");
  const [interacted, setInteracted] = useState(false);

  // Trigger the teaching nudge only once the deck is actually on screen.
  const { ref, inView } = useInView<HTMLDivElement>({ amount: 0.6 });

  const done = index >= CLIPS.length;

  function markInteracted() {
    setInteracted(true);
  }

  function decide(d: Decision) {
    if (done) return;
    setInteracted(true);
    const clip = CLIPS[index];
    setExitDir(d);
    if (d === "keep") setKept((k) => k + 1);
    setAnnounce(
      `${clip.label} ${d === "keep" ? "kept" : "cut"}. ${index + 1} of ${CLIPS.length}.`
    );
    setIndex((i) => i + 1);
  }

  function reset() {
    setIndex(0);
    setKept(0);
    setInteracted(true); // don't re-run the nudge on replay
    setAnnounce("Deck reset.");
  }

  return (
    <div ref={ref} className="mx-auto w-full max-w-[300px]">
      <PhoneFrame>
        <div className="flex h-full flex-col px-3 pb-4 pt-9">
          {/* App bar */}
          <div className="flex items-center justify-between">
            <span className="font-display text-sm font-semibold text-cream">
              Segma
            </span>
            <span className="tnum rounded-full bg-cream/10 px-2 py-0.5 font-mono text-[0.55rem] font-medium text-cream/60">
              {done ? `${CLIPS.length}/${CLIPS.length}` : `${index + 1}/${CLIPS.length}`}
            </span>
          </div>

          {/* Deck / done summary */}
          <div className="relative mt-3 flex-1">
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
                      demo={i === 0 && inView && !interacted}
                      onDecide={decide}
                      onInteract={markInteracted}
                    />
                  );
                })}
            </AnimatePresence>

            {done && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex h-full flex-col items-center justify-center gap-3 px-3 text-center"
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
                <p className="text-sm leading-relaxed text-cream/60">
                  {TRY_SWIPE.doneBody}
                </p>
                <div className="mt-1 flex gap-2 font-mono text-[0.6rem] uppercase tracking-[0.08em]">
                  <span className="rounded-full bg-sage/20 px-2.5 py-1 text-sage-400">
                    Kept {kept}
                  </span>
                  <span className="rounded-full bg-terracotta/20 px-2.5 py-1 text-terracotta-400">
                    Cut {CLIPS.length - kept}
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Affordance hint — pulsing directional cues that reinforce the
              gesture even after the one-time nudge. */}
          {!done && (
            <div className="mt-2 flex items-center justify-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.1em]">
              <span className="flex items-center gap-1 text-terracotta-400">
                <svg className="hint-nudge-left" width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M14 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Cut
              </span>
              <span className="text-cream/30">swipe</span>
              <span className="flex items-center gap-1 text-sage-400">
                Keep
                <svg className="hint-nudge-right" width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M10 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          )}
        </div>
      </PhoneFrame>

      {/* Controls — real buttons, the accessible + no-drag path */}
      <div className="mt-6">
        {done ? (
          <div className="flex flex-col items-center gap-3">
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
        ) : (
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => decide("cut")}
              className="inline-flex items-center gap-2 rounded-full border border-terracotta-400/50 px-6 py-3 text-sm font-semibold text-terracotta-400 transition-colors hover:border-terracotta-400 hover:bg-terracotta/10"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
              {TRY_SWIPE.cutLabel}
            </button>
            <button
              type="button"
              onClick={() => decide("keep")}
              className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-sage-600"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {TRY_SWIPE.keepLabel}
            </button>
          </div>
        )}
      </div>

      {/* Screen-reader progress */}
      <p className="sr-only" role="status" aria-live="polite">
        {announce}
      </p>
    </div>
  );
}
