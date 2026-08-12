import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { StepsScrubber } from "@/components/visuals/StepsScrubber";
import { StepCard } from "@/components/visuals/StepCard";
import { ClipCard } from "@/components/visuals/ClipCard";
import { Timeline } from "@/components/visuals/Timeline";
import { SwipeCard } from "@/components/visuals/SwipeCard";
import { HOW_IT_WORKS } from "@/lib/site";

// Each step's dark "screenshot" panel content. The panel height is fixed by
// StepCard, so these just center within it.
const panelClass = "flex w-full flex-col justify-center gap-1.5";

const visuals = [
  <div key="1" className={panelClass}>
    <ClipCard label="Clip" index="01" time="02:14" />
    <ClipCard label="Clip" index="02" time="01:47" />
  </div>,
  <div key="2" className={`${panelClass} pt-5`}>
    <Timeline showHook />
  </div>,
  <div key="3" className={panelClass}>
    <SwipeCard />
  </div>,
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" labelledBy="how-heading" tone="cream">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal className="flex justify-center">
          <Eyebrow>{HOW_IT_WORKS.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={60}>
          <h2
            id="how-heading"
            className="font-display text-3xl font-semibold tracking-[-0.01em] text-charcoal sm:text-[2.7rem]"
          >
            {HOW_IT_WORKS.headline}
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-5 text-lg leading-relaxed text-warmgray">
            {HOW_IT_WORKS.subhead}
          </p>
        </Reveal>
      </div>

      <StepsScrubber>
        {/* Steps land 01 → 02 → 03 rather than together: the three columns
            enter the viewport at the same moment, so the sequencing has to
            come from the delay, and it has to be big enough to read. */}
        {/* pl-8 clears the mobile vertical rail (drawn by StepsScrubber);
            each step gets a node on it so the stack reads as a timeline. */}
        <div className="grid gap-8 pl-8 md:grid-cols-3 md:gap-8 md:pl-0">
          {HOW_IT_WORKS.steps.map((step, i) => (
            <div key={step.n} className="relative">
              <span
                aria-hidden
                className="absolute -left-8 top-2 h-2.5 w-2.5 rounded-full bg-cream ring-2 ring-terracotta md:hidden"
              />
              <StepCard
                n={step.n}
                title={step.title}
                body={step.body}
                caps={step.caps}
                delay={i * 260}
              >
                {visuals[i]}
              </StepCard>
            </div>
          ))}
        </div>
      </StepsScrubber>
    </Section>
  );
}
