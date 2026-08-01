"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Waveform } from "./Waveform";
import { cn } from "@/lib/cn";

/**
 * The hero art — a web recreation of the app's onboarding "chaos → cut"
 * animation. Six scattered clips are read by a terracotta scan line (verdict
 * badges pop), then the keepers spring into a filmstrip with the hook at the
 * front while the cuts sink into a set-aside tray. Plays ONCE on load, then
 * holds the finished cut (late glances must never land on mid-chaos); a quiet
 * Replay re-runs it. Reduced motion renders the settled state directly.
 */

type Verdict = "keep" | "cut" | "hook";
type Tile = {
  verdict: Verdict;
  rot: number;
  chaos: { x: number; y: number };
  /** Position in the final strip (hook = 0); null = cut. */
  slot: number | null;
};

// Hand-authored chaos layout, ported from the app's ChaosToCutHero.
const TILES: Tile[] = [
  { verdict: "keep", rot: -13, chaos: { x: -104, y: -30 }, slot: 1 },
  { verdict: "hook", rot: 9, chaos: { x: -34, y: 24 }, slot: 0 },
  { verdict: "cut", rot: -6, chaos: { x: 22, y: -38 }, slot: null },
  { verdict: "keep", rot: 14, chaos: { x: 70, y: 20 }, slot: 2 },
  { verdict: "keep", rot: -9, chaos: { x: 122, y: -20 }, slot: 3 },
  { verdict: "cut", rot: 7, chaos: { x: -70, y: 44 }, slot: null },
];

/** Final filmstrip x for a slot (tiles 56px wide, 22px gaps, centered). */
const slotX = (slot: number) => -117 + slot * 78;
const STRIP_Y = 34;

// Beats: 0 chaos · 1 scan/read · 2 assemble · 3 settled.
const LABELS = [
  "Your raw clips",
  "Revela reads every second",
  "Your first cut",
  "Your first cut",
] as const;

const STEPS = [
  { n: "1", label: "Raw clips" },
  { n: "2", label: "Revela reads" },
  { n: "3", label: "Your first cut" },
] as const;

const SPRING = { type: "spring", stiffness: 260, damping: 24 } as const;

function VerdictBadge({ verdict, delay }: { verdict: Verdict; delay: number }) {
  const style =
    verdict === "keep"
      ? "bg-sage"
      : verdict === "cut"
        ? "bg-terracotta"
        : "bg-terracotta";
  return (
    <motion.span
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ ...SPRING, delay }}
      className={cn(
        "absolute -right-2 -top-2 z-10 grid h-6 w-6 place-items-center rounded-full text-cream shadow-md",
        style
      )}
    >
      {verdict === "keep" && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {verdict === "cut" && (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
          <circle cx="6.5" cy="6.5" r="2.5" />
          <circle cx="6.5" cy="17.5" r="2.5" />
          <path d="M8.7 8.2L20 19M8.7 15.8L20 5" />
        </svg>
      )}
      {verdict === "hook" && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2l-6.1 3.4 1.4-6.8L2.2 9.1l6.9-.8z" />
        </svg>
      )}
    </motion.span>
  );
}

export function ChaosToCutHero() {
  const reduce = useReducedMotion();
  const [beat, setBeat] = useState(0);
  const [run, setRun] = useState(0);
  // Hydration-safe reduce handling: the server always renders the beat-0
  // markup; only after mount may reduced-motion snap us to the settled state.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (reduce) {
      setBeat(3);
      return;
    }
    setBeat(0);
    const timers = [
      setTimeout(() => setBeat(1), 1000),
      setTimeout(() => setBeat(2), 2400),
      setTimeout(() => setBeat(3), 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [run, reduce]);

  /** True on reduce clients after mount — transitions collapse to 0s. */
  const instant = mounted && reduce === true;

  return (
    <div className="w-full select-none">
      {/* Label + time chip */}
      <div aria-hidden className="flex h-6 items-center justify-center gap-2">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={LABELS[beat]}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: instant ? 0 : 0.25 }}
            className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-warmgray"
          >
            {LABELS[beat]}
          </motion.span>
        </AnimatePresence>
        {beat >= 2 && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={instant ? { duration: 0 } : { ...SPRING, delay: 0.5 }}
            className="rounded-full bg-terracotta px-2 py-0.5 font-mono text-[0.58rem] font-semibold text-cream"
          >
            ~10 min
          </motion.span>
        )}
      </div>

      {/* The plane */}
      <div aria-hidden className="relative mx-auto mt-2 h-[280px] w-full max-w-[440px]">
        {/* Scan line */}
        {beat === 1 && !instant && (
          <motion.div
            initial={{ x: -230, opacity: 0 }}
            animate={{ x: 230, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.95, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 z-20 h-[210px] w-[2px] -translate-y-1/2 rounded-full bg-terracotta shadow-[0_0_18px_2px_rgba(181,101,74,0.5)]"
          />
        )}

        {TILES.map((t, i) => {
          const assembled = beat >= 2;
          const isCut = t.slot === null;
          const target = assembled
            ? isCut
              ? { x: t.chaos.x * 0.6 + 90, y: t.chaos.y + 96, rotate: t.rot, scale: 0.25, opacity: 0 }
              : { x: slotX(t.slot!), y: STRIP_Y, rotate: 0, scale: 1, opacity: 1 }
            : { x: t.chaos.x, y: t.chaos.y, rotate: t.rot, scale: 1, opacity: 1 };
          // Badge stagger follows the scan line's left→right pass.
          const badgeDelay = instant
            ? 0
            : beat === 1
              ? 0.12 + ((t.chaos.x + 120) / 240) * 0.75
              : 0;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={target}
              transition={
                instant
                  ? { duration: 0 }
                  : assembled
                    ? { ...SPRING, delay: isCut ? 0.05 : t.slot! * 0.07 }
                    : { ...SPRING, delay: i * 0.05 }
              }
              className="absolute left-1/2 top-1/2 -ml-7 -mt-[52px]"
            >
              <div
                className={cn(
                  "relative h-[104px] w-14 overflow-hidden rounded-lg border bg-charcoal-800 shadow-[0_16px_32px_-16px_rgba(27,24,21,0.5)]",
                  t.verdict === "hook" && beat >= 2
                    ? "border-terracotta"
                    : "border-charcoal-700"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cream/[0.09] to-transparent" />
                <Waveform bars={10} className="absolute inset-x-1.5 bottom-1.5 h-2.5 text-cream/20" />
                {/* Settled hook tile gets a breathing play badge. */}
                {t.verdict === "hook" && beat >= 3 && (
                  <motion.span
                    animate={instant ? undefined : { scale: [1, 1.12, 1] }}
                    transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-1/2 top-1/2 grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-charcoal-900/80 text-cream/80"
                  >
                    <svg width="9" height="9" viewBox="0 0 24 24" aria-hidden>
                      <path d="M8 5v14l11-7z" fill="currentColor" />
                    </svg>
                  </motion.span>
                )}
              </div>
              {beat >= 1 && <VerdictBadge verdict={t.verdict} delay={badgeDelay} />}
              {/* HOOK pennant on the front tile once assembled */}
              {t.verdict === "hook" && beat >= 2 && (
                <motion.span
                  initial={{ opacity: 0, y: 6, scale: 0.6 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={instant ? { duration: 0 } : { ...SPRING, delay: 0.35 }}
                  className="absolute -top-5 left-0 rounded-[0.3rem] bg-terracotta px-1.5 py-0.5 font-mono text-[0.5rem] font-semibold uppercase tracking-[0.1em] text-cream"
                >
                  ★ Hook
                </motion.span>
              )}
            </motion.div>
          );
        })}

        {/* Set-aside tray — the cuts wait, never deleted. */}
        {beat >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={instant ? { duration: 0 } : { ...SPRING, delay: 0.55 }}
            className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-charcoal-900/85 px-3 py-1.5"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden className="text-cream/70">
              <path d="M4 12l2-6h12l2 6v6H4zM4 12h5a3 3 0 0 0 6 0h5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            <span className="font-mono text-[0.6rem] font-medium text-cream/80">
              Set aside · 2
            </span>
          </motion.div>
        )}
      </div>

      {/* Step rail — the 3-step diagram, readable without watching the loop */}
      <div className="mt-4 flex items-center justify-center gap-5 sm:gap-7">
        {STEPS.map((s, i) => {
          const active = (beat <= 1 ? beat : 2) === i;
          return (
            <div key={s.n} className="flex items-center gap-2">
              <span
                className={cn(
                  "tnum grid h-5 w-5 place-items-center rounded-full font-mono text-[0.6rem] font-bold transition-colors duration-300",
                  active
                    ? "bg-terracotta text-cream"
                    : "bg-charcoal/10 text-charcoal/45"
                )}
              >
                {s.n}
              </span>
              <span
                className={cn(
                  "font-mono text-[0.62rem] uppercase tracking-[0.1em] transition-colors duration-300",
                  active ? "text-charcoal" : "text-charcoal/40"
                )}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Quiet replay — only once the run has settled (mounted-gated so the
          server and first client render always match). */}
      {mounted && !reduce && (
        <div className="mt-2.5 flex h-5 justify-center">
          {beat === 3 && (
            <button
              type="button"
              onClick={() => setRun((r) => r + 1)}
              className="pointer-events-auto font-mono text-[0.62rem] uppercase tracking-[0.1em] text-warmgray-400 underline-offset-4 transition-colors hover:text-charcoal hover:underline"
            >
              ↺ Replay
            </button>
          )}
        </div>
      )}
    </div>
  );
}
