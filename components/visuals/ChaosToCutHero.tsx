"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useInView } from "@/components/motion/useInView";
import { Waveform } from "./Waveform";
import { cn } from "@/lib/cn";

/**
 * The hero art — a web recreation of the app's onboarding "chaos → cut"
 * animation, staged as a ~5.4s show: a terracotta scan line reads six
 * scattered clips (verdict badges pop), the rejects fly up-right into a
 * garbage can one after another, the keepers fall into the filmstrip
 * staggered, the hook flies OVER the strip to claim the front seat, the
 * rightmost keeper gets its right side trimmed off (the offcut joins the
 * trash), and — the finale — the trimmed clip arcs over the strip to slot
 * itself into the middle while the others shuffle right. Plays ONCE when
 * scrolled into view (on desktop that's effectively on load; on mobile the
 * art sits below the fold, so it waits), then holds the finished cut; a
 * quiet Replay re-runs it. Reduced motion renders the settled state directly.
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

// Beats: 0 chaos · 1 scan/read · 2 cuts to the trash · 3 keepers assemble ·
// 4 hook flies over the strip · 5 side trim · 6 arrange finale · 7 settled.
// Few distinct label states — a new line per beat would flicker.
const SETTLED = 7;
const LABELS = [
  "Your raw clips",
  "Revela reads every second",
  "Building your cut",
  "Building your cut",
  "Building your cut",
  "Building your cut",
  "Arranged like you would",
  "Your first cut",
] as const;

/** The keeper whose right side gets trimmed on beat 5 (rightmost slot). */
const TRIM_SLOT = 3;
const TRIM_WIDTH = 38;
/** A left-anchored 38px tile sits 9px left of its slot centre; compensate. */
const TRIM_NUDGE = 9;
/** Where the rejects fly: the garbage can at the plane's top-right. */
const TRASH = { x: 140, y: -104 };

/** Post-arrange seat: the trimmed clip cuts into slot 1, shifting the middle. */
const finalSlotOf = (slot: number) =>
  slot === TRIM_SLOT ? 1 : slot === 0 ? 0 : slot + 1;

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
  // The sequence is armed only once the art is actually on screen — above the
  // fold that's immediately after hydration, below it (mobile) on scroll.
  const { ref, inView } = useInView<HTMLDivElement>({ amount: 0.35 });

  useEffect(() => {
    if (reduce) {
      setBeat(SETTLED);
      return;
    }
    if (!inView) return;
    setBeat(0);
    const timers = [
      setTimeout(() => setBeat(1), 300),
      setTimeout(() => setBeat(2), 1400),
      setTimeout(() => setBeat(3), 2300),
      setTimeout(() => setBeat(4), 3000),
      setTimeout(() => setBeat(5), 3800),
      setTimeout(() => setBeat(6), 4600),
      setTimeout(() => setBeat(7), 5400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [run, reduce, inView]);

  /** True on reduce clients after mount — transitions collapse to 0s. */
  const instant = mounted && reduce === true;

  return (
    <div ref={ref} className="w-full select-none">
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
        {beat >= SETTLED && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={instant ? { duration: 0 } : { ...SPRING, delay: 0.2 }}
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
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 z-20 h-[210px] w-[2px] -translate-y-1/2 rounded-full bg-terracotta shadow-[0_0_18px_2px_rgba(181,101,74,0.5)]"
          />
        )}

        {TILES.map((t, i) => {
          const isCut = t.slot === null;
          const isHook = t.verdict === "hook";
          const isTrim = t.slot === TRIM_SLOT;
          const chaos = { x: t.chaos.x, y: t.chaos.y, rotate: t.rot, scale: 1, opacity: 1 };
          // Seat position honours the arrange finale (beat 6 reshuffles the
          // strip) and the trimmed tile's narrower, left-anchored body.
          const seatSlot = beat >= 6 ? finalSlotOf(t.slot ?? 0) : (t.slot ?? 0);
          const nudge = isTrim && beat >= 5 ? TRIM_NUDGE : 0;
          const seated = { x: slotX(seatSlot) + nudge, y: STRIP_Y, rotate: 0, scale: 1, opacity: 1 };

          // Four moves in order: rejects fly up-right into the garbage can
          // (beat 2, one after another), keepers fall into the strip (beat 3,
          // staggered), the hook — left conspicuously behind — flies OVER the
          // strip to the front (beat 4), and after the trim the trimmed clip
          // arcs into the middle while the others shuffle right (beat 6).
          let target: typeof chaos | (Record<string, number | number[]>) = chaos;
          let transition: object = instant
            ? { duration: 0 }
            : { ...SPRING, delay: i * 0.05 };
          if (isCut && beat >= 2) {
            const cutOrder = i === 2 ? 0 : 1;
            target = { x: TRASH.x, y: TRASH.y, rotate: t.rot * 1.4, scale: 0.25, opacity: 0 };
            transition = instant
              ? { duration: 0 }
              : { duration: 0.6, ease: "easeIn", delay: beat === 2 ? cutOrder * 0.3 : 0 };
          } else if (!isCut && !isHook && beat >= 3) {
            if (isTrim && beat === 6 && !instant) {
              // The finale: up into the clear corridor above the strip, left
              // to the middle seat's x, then straight down into it.
              target = {
                x: [slotX(TRIM_SLOT) + TRIM_NUDGE, 50, slotX(1) + TRIM_NUDGE, slotX(1) + TRIM_NUDGE],
                y: [STRIP_Y, -78, -78, STRIP_Y],
                rotate: [0, -5, 0, 0],
                scale: [1, 1.06, 1.06, 1],
                opacity: 1,
              };
              transition = { duration: 0.8, times: [0, 0.35, 0.7, 1], ease: "easeInOut" };
            } else {
              target = seated;
              transition = instant
                ? { duration: 0 }
                : {
                    type: "spring",
                    stiffness: 200,
                    damping: 22,
                    // Stagger the beat-3 arrivals — held back a touch so the
                    // hook has lifted clear of the slot-1 area first. On beat
                    // 6 the displaced keepers wait until the flyer is overhead.
                    delay:
                      beat === 3
                        ? 0.25 + (t.slot! - 1) * 0.2
                        : beat === 6
                          ? 0.3
                          : 0,
                  };
            }
          } else if (isHook && beat === 3 && !instant) {
            // The hook lifts out of the way while the keepers assemble under
            // it — its chaos spot is exactly where the slot-1 keeper lands.
            target = { x: -20, y: -80, rotate: -4, scale: 1.05, opacity: 1 };
            transition = { duration: 0.35, ease: "easeOut" };
          } else if (isHook && beat === 4 && !instant) {
            // The flight: glide right from the hover, sweep left across the
            // whole strip at altitude, then drop STRAIGHT DOWN onto the front
            // seat — never diagonally through a seated clip.
            target = {
              x: [-20, 40, slotX(0), slotX(0)],
              y: [-80, -80, -80, STRIP_Y],
              rotate: [-4, -8, 0, 0],
              scale: [1.05, 1.12, 1.12, 1],
              opacity: 1,
            };
            transition = { duration: 0.9, times: [0, 0.3, 0.7, 1], ease: "easeInOut" };
          } else if (isHook && beat >= 4) {
            target = seated;
            transition = instant ? { duration: 0 } : SPRING;
          }

          // Badge stagger follows the scan line's left→right pass.
          const badgeDelay = instant
            ? 0
            : beat === 1
              ? 0.1 + ((t.chaos.x + 120) / 240) * 0.6
              : 0;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={target}
              transition={transition}
              className={cn(
                "absolute left-1/2 top-1/2 -ml-7 -mt-[52px]",
                // No overlap, ever: the hook rides above everything for the
                // whole show, rejects fly above the resting chaos tiles, and
                // the arrange-finale flyer clears the strip it crosses.
                isHook ? "z-30" : isCut && beat >= 2 ? "z-20" : isTrim && beat >= 6 && "z-20"
              )}
            >
              <motion.div
                animate={{
                  width: isTrim && beat >= 5 ? TRIM_WIDTH : 56,
                }}
                transition={
                  instant
                    ? { duration: 0 }
                    : { duration: 0.4, ease: "easeOut", delay: beat === 5 ? 0.2 : 0 }
                }
                className={cn(
                  "relative h-[104px] w-14 overflow-hidden rounded-lg border bg-charcoal-800 shadow-[0_16px_32px_-16px_rgba(27,24,21,0.5)]",
                  t.verdict === "hook" && beat >= 4
                    ? "border-terracotta"
                    : "border-charcoal-700",
                  // Deeper shadow while airborne sells the altitude.
                  t.verdict === "hook" &&
                    beat === 4 &&
                    "shadow-[0_30px_50px_-18px_rgba(27,24,21,0.65)] transition-shadow duration-500"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cream/[0.09] to-transparent" />
                <Waveform bars={10} className="absolute inset-x-1.5 bottom-1.5 h-2.5 text-cream/20" />
                {/* Settled hook tile gets a breathing play badge. */}
                {t.verdict === "hook" && beat >= SETTLED && (
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
              </motion.div>

              {/* The trim: a vertical flash at the cut line, then the severed
                  right side flies up to the garbage can. Show-only — the
                  settled state is just the narrower tile, so reduced motion
                  never needs these. */}
              {isTrim && beat === 5 && !instant && (
                <>
                  <motion.div
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 0.45 }}
                    className="absolute left-[38px] top-0 h-[104px] w-[2px] bg-terracotta shadow-[0_0_10px_2px_rgba(181,101,74,0.6)]"
                  />
                  <motion.div
                    animate={{
                      x: [0, 40, 20],
                      y: [0, -80, -140],
                      rotate: [0, 25, 40],
                      opacity: [1, 1, 0],
                      scale: [1, 0.7, 0.3],
                    }}
                    transition={{ duration: 0.8, ease: "easeIn", delay: 0.25 }}
                    className="absolute left-[38px] top-0 h-[104px] w-[18px] rounded-r-lg border border-l-0 border-charcoal-700 bg-charcoal-800"
                  />
                </>
              )}

              {beat >= 1 && <VerdictBadge verdict={t.verdict} delay={badgeDelay} />}
              {/* HOOK pennant — pops as the flight lands. */}
              {t.verdict === "hook" && beat >= 4 && (
                <motion.span
                  initial={{ opacity: 0, y: 6, scale: 0.6 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={instant ? { duration: 0 } : { ...SPRING, delay: 0.75 }}
                  className="absolute -top-5 left-0 rounded-[0.3rem] bg-terracotta px-1.5 py-0.5 font-mono text-[0.5rem] font-semibold uppercase tracking-[0.1em] text-cream"
                >
                  ★ Hook
                </motion.span>
              )}
            </motion.div>
          );
        })}

        {/* Garbage can — top-right, where the rejects and the offcut very
            visibly get thrown out. Pulses once per delivery: the inner span
            remounts when the beat crosses into the trim (key flips), so it
            plays its swallow squeeze for the cuts and again for the offcut. */}
        {beat >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={instant ? { duration: 0 } : SPRING}
            className="absolute right-1 top-1 z-10"
          >
            <motion.span
              key={beat >= 5 ? "swallow-offcut" : "swallow-cuts"}
              animate={instant ? undefined : { scale: [1, 1, 1.16, 1] }}
              transition={{ duration: 1.1, times: [0, 0.55, 0.75, 1] }}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-charcoal-900/85 text-cream/80 shadow-[0_10px_24px_-10px_rgba(27,24,21,0.6)]"
            >
              <Trash2 size={16} strokeWidth={1.75} aria-hidden />
            </motion.span>
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
          {beat === SETTLED && (
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
