"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { TRY_SWIPE, type DemoClip } from "@/lib/site";
import type { Decision } from "./SwipeDeck";

const SPRING = { type: "spring", stiffness: 300, damping: 24 } as const;

/**
 * The consequence rail under the demo deck — a web port of the app's
 * onboarding SpineStripView. Every sort visibly lands: keeps append as
 * tiles, the hook inserts at the FRONT wearing a pennant, cuts fly into the
 * tray counter, B-roll stacks in its own overlay lane — narrated by the
 * app's coach lines.
 */
export function SpineStrip({
  clips,
  decisions,
}: {
  clips: readonly DemoClip[];
  decisions: readonly Decision[];
}) {
  const hookIdx: number[] = [];
  const keepIdx: number[] = [];
  const brollIdx: number[] = [];
  decisions.forEach((d, i) => {
    if (d === "hook") hookIdx.push(i);
    else if (d === "keep") keepIdx.push(i);
    else if (d === "broll") brollIdx.push(i);
  });
  // Hook always opens the cut, even when chosen after other keeps.
  const spine = [...hookIdx, ...keepIdx];
  const cutCount = decisions.length - spine.length - brollIdx.length;
  const undecided = clips.length - decisions.length;
  const done = decisions.length >= clips.length;
  const last = decisions[decisions.length - 1];
  const coach = done
    ? TRY_SWIPE.doneBody
    : last
      ? TRY_SWIPE.coach[last]
      : TRY_SWIPE.coach.idle;

  return (
    <div className="relative mt-5">
      {/* Header: label + tray counter */}
      <div className="flex h-5 items-center justify-between">
        <span className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.18em] text-cream/50">
          {TRY_SWIPE.spineLabel}
        </span>
        <AnimatePresence>
          {cutCount > 0 && (
            <motion.span
              key="tray"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={SPRING}
              className="flex items-center gap-1.5 rounded-full bg-cream/10 px-2 py-0.5"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden className="text-cream/60">
                <path d="M4 12l2-6h12l2 6v6H4zM4 12h5a3 3 0 0 0 6 0h5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              </svg>
              <motion.span
                key={cutCount}
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                transition={SPRING}
                className="tnum font-mono text-[0.55rem] font-semibold text-terracotta-400"
              >
                {cutCount}
              </motion.span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Cut flight — a transient tile shrinking into the tray */}
      <AnimatePresence>
        {last === "cut" && (
          <motion.div
            key={decisions.length}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{ opacity: 0, x: 118, y: -30, scale: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeIn" }}
            className="pointer-events-none absolute left-1/2 top-8 z-10 h-9 w-6 overflow-hidden rounded-[0.3rem] border border-terracotta/60 bg-charcoal-700"
          >
            {clips[decisions.length - 1]?.photo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={clips[decisions.length - 1].photo}
                alt=""
                draggable={false}
                className="h-full w-full select-none object-cover"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lane 1 — the cut spine (hook first, dashed slots for the undecided) */}
      <LayoutGroup>
        <div className="mt-3.5 flex items-center gap-1.5">
          {spine.map((clipIdx) => {
            const isHook = decisions[clipIdx] === "hook";
            return (
              <motion.div
                layout
                key={clipIdx}
                initial={{ y: -14, scale: 0.6, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                transition={SPRING}
                className={cn(
                  "relative h-11 w-7 overflow-hidden rounded-[0.3rem] border bg-charcoal-700",
                  isHook ? "border-terracotta" : "border-cream/15"
                )}
              >
                {clips[clipIdx].photo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={clips[clipIdx].photo}
                    alt=""
                    draggable={false}
                    className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
                  />
                )}
                <div className="absolute inset-0 rounded-[0.3rem] bg-gradient-to-br from-cream/[0.09] to-transparent" />
                {isHook && (
                  <span className="absolute -top-[0.95rem] left-0 whitespace-nowrap rounded-[0.25rem] bg-terracotta px-1 py-px font-mono text-[0.45rem] font-semibold uppercase tracking-[0.08em] text-cream">
                    ★ Hook
                  </span>
                )}
              </motion.div>
            );
          })}
          {Array.from({ length: undecided }).map((_, i) => (
            <motion.div
              layout
              key={`slot-${i}`}
              className="h-11 w-7 rounded-[0.3rem] border border-dashed border-cream/20"
            />
          ))}
        </div>

        {/* Lane 2 — B-roll overlay */}
        <div className="mt-2 flex h-8 items-center gap-1.5 pl-9">
          <span
            className={cn(
              "font-mono text-[0.5rem] font-bold uppercase tracking-[0.14em] transition-colors",
              brollIdx.length ? "text-ochre-400" : "text-cream/25"
            )}
          >
            {TRY_SWIPE.brollLabel}
          </span>
          {brollIdx.map((clipIdx) => (
            <motion.div
              layout
              key={clipIdx}
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={SPRING}
              className="relative h-8 w-6 overflow-hidden rounded-[0.3rem] border border-ochre/60 bg-charcoal-700"
            >
              {clips[clipIdx].photo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={clips[clipIdx].photo}
                  alt=""
                  draggable={false}
                  className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
                />
              )}
              <div className="absolute inset-0 rounded-[0.3rem] bg-gradient-to-br from-cream/[0.09] to-transparent" />
            </motion.div>
          ))}
        </div>
      </LayoutGroup>

      {/* Coach line — the app's consequence narration */}
      <p
        aria-live="polite"
        className="mt-3 min-h-[2.4rem] text-center font-display text-[0.82rem] italic leading-snug text-cream/60"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={coach}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="inline-block"
          >
            {coach}
          </motion.span>
        </AnimatePresence>
      </p>
    </div>
  );
}
