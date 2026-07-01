"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useInView } from "@/components/motion/useInView";
import { PhoneFrame } from "./PhoneFrame";
import { ClipCard } from "./ClipCard";
import { Timeline } from "./Timeline";
import { CountUp } from "./CountUp";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/**
 * Hero "wow": raw clips fly in, collapse into a Segma cut with a HOOK flag,
 * and the edit-time counter drops from ~3 hours to ~10 minutes.
 * Renders the finished state instantly under prefers-reduced-motion.
 */
export function TransformationPhone() {
  const { ref, inView } = useInView<HTMLDivElement>({ amount: 0.3 });
  const reduce = useReducedMotion();
  const play = reduce ? true : inView;

  return (
    <div ref={ref}>
      <PhoneFrame>
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          animate={play ? "show" : "hidden"}
          className="flex h-full flex-col gap-2.5 px-3 pb-4 pt-9"
        >
          {/* App bar */}
          <motion.div variants={item} className="flex items-center justify-between">
            <span className="font-display text-sm font-semibold text-cream">
              Segma
            </span>
            <span className="rounded-full bg-sage/20 px-2 py-0.5 font-mono text-[0.55rem] font-medium uppercase tracking-[0.1em] text-sage-400">
              Draft ready
            </span>
          </motion.div>

          {/* Raw clips */}
          <motion.div variants={item} className="space-y-1.5">
            <div className="flex items-center justify-between px-0.5">
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-cream/55">
                Raw · 9 clips
              </span>
              <span className="tnum font-mono text-[0.55rem] text-cream/55">
                14:22
              </span>
            </div>
            <ClipCard label="Clip" index="01" time="02:14" />
            <ClipCard label="Clip" index="02" time="01:47" />
            <ClipCard label="Clip" index="03" time="03:08" />
          </motion.div>

          {/* Collapse indicator */}
          <motion.div
            variants={item}
            className="flex items-center justify-center gap-2 py-0.5 text-terracotta-400"
          >
            <span className="h-px w-8 bg-terracotta/30" />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M12 5v14M6 13l6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="h-px w-8 bg-terracotta/30" />
          </motion.div>

          {/* Segma cut */}
          <motion.div variants={item} className="pt-3">
            <div className="mb-7 px-0.5">
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-cream/55">
                Segma cut · vertical
              </span>
            </div>
            <Timeline showHook showPlayhead />
          </motion.div>

          {/* Edit-time readout */}
          <motion.div
            variants={item}
            className="mt-auto flex items-center justify-between rounded-xl bg-charcoal-900/80 px-3 py-2.5"
          >
            <div className="flex flex-col">
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-cream/55">
                Edit time
              </span>
              <CountUp
                from={10020}
                to={600}
                durationMs={1500}
                play={play}
                className="font-mono text-lg font-semibold text-cream"
              />
            </div>
            <span className="rounded-full bg-sage/20 px-2.5 py-1 font-mono text-[0.6rem] font-semibold text-sage-400">
              2h 37m saved
            </span>
          </motion.div>
        </motion.div>
      </PhoneFrame>
    </div>
  );
}
