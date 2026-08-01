"use client";

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { useInView } from "@/components/motion/useInView";
import { TransformationPhone } from "@/components/visuals/TransformationPhone";
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
