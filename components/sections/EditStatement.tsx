"use client";

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { useInView } from "@/components/motion/useInView";
import { TransformationPhone } from "@/components/visuals/TransformationPhone";
import { TimeCollapseBar } from "@/components/visuals/TimeCollapseBar";
import { EDIT_STATEMENT } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Section #2 — the self-editing statement. As it scrolls into view the
 * headline performs the edit: a ★HOOK pennant pops over "Hook", the strike
 * draws through "Dead air", an ochre underlay slides beneath "B-roll".
 * The real-app phone (relocated from the hero) sits beside it as proof.
 */
export function EditStatement() {
  const { ref, inView } = useInView<HTMLHeadingElement>({ amount: 0.6 });

  return (
    <Section labelledBy="edit-statement-heading" tone="cream">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <h2
            ref={ref}
            id="edit-statement-heading"
            className={cn(
              "max-w-xl pt-8 font-display text-[2.3rem] font-semibold leading-[1.18] tracking-[-0.02em] text-charcoal sm:text-[2.9rem] lg:text-[3.3rem]",
              inView && "stmt-play"
            )}
          >
            <span className="sr-only">{EDIT_STATEMENT.srText}</span>
            <span aria-hidden>
              <span className="relative inline-block">
                Hook
                <span className="stmt-pennant absolute -top-[1.3em] left-0 rounded-md bg-terracotta px-2 py-0.5 font-mono text-[0.85rem] font-semibold uppercase tracking-[0.1em] text-cream">
                  ★ Hook
                </span>
              </span>{" "}
              found.{" "}
              <span className="relative whitespace-nowrap">
                Dead air
                <span className="stmt-strike absolute left-0 top-1/2 h-[0.09em] w-full rounded-full bg-terracotta/55" />
              </span>{" "}
              cut.{" "}
              <span className="relative whitespace-nowrap">
                B-roll
                <span className="stmt-underlay absolute -bottom-[0.08em] left-0 h-[0.14em] w-full rounded-full bg-ochre/70" />
              </span>{" "}
              placed.
              <br />
              <span className="text-terracotta">Edited like you would.</span>
            </span>
          </h2>

          {/* The payoff for the edit above: the same job, collapsed. The
              numbers state the claim; the bar animates it — on its own a
              shrinking bar never says what it shrank from. Held back until
              the headline has finished cutting itself (the last mark,
              .stmt-underlay, lands at ~1.7s). Dark inset on cream, matching
              StepCard's panel so it reads as the same family of object. */}
          <Reveal delay={160}>
            <div className="mt-10 max-w-xl rounded-3xl border border-charcoal/8 bg-charcoal-900 p-6 shadow-[0_24px_50px_-30px_rgba(27,24,21,0.6)] sm:p-7">
              <div className="flex items-center justify-center gap-6 sm:gap-10">
                <div className="text-center">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-cream/45">
                    {EDIT_STATEMENT.beforeLabel}
                  </p>
                  <p className="mt-1.5 font-display text-3xl font-semibold text-cream/40 line-through decoration-terracotta/60 decoration-2 sm:text-4xl">
                    {EDIT_STATEMENT.beforeValue}
                  </p>
                </div>

                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                  className="shrink-0 text-terracotta-400"
                >
                  <path
                    d="M5 12h13M13 7l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className="text-center">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-sage-400">
                    {EDIT_STATEMENT.afterLabel}
                  </p>
                  <p className="mt-1.5 font-display text-3xl font-semibold text-terracotta-400 sm:text-4xl">
                    {EDIT_STATEMENT.afterValue}
                  </p>
                </div>
              </div>

              {/* showLabels off — the row above already names both sides. */}
              <TimeCollapseBar className="mt-8" delayMs={1800} showLabels={false} />
            </div>
          </Reveal>
        </div>

        <Reveal className="w-full justify-self-center lg:justify-self-end">
          <TransformationPhone />
          <p className="mt-5 text-center text-sm text-warmgray">
            {EDIT_STATEMENT.phoneCaption}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
