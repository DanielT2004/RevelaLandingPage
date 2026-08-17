import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { PinnedSteps } from "@/components/visuals/PinnedSteps";
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
      {/* Heading stays in normal flow — it reads on the way in and scrolls
          away as the pin engages, so the pinned viewport only holds cards. */}
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

      {/* The steps pin while scroll deals them out 01 → 02 → 03 —
          sequencing comes from scroll position now, not time-based delays,
          so each card only staggers its own parts. pl-8 on the grid clears
          the mobile vertical rail drawn by PinnedSteps. */}
      <PinnedSteps
        steps={HOW_IT_WORKS.steps.map((step, i) => (
          <StepCard
            key={step.n}
            n={step.n}
            title={step.title}
            body={step.body}
            caps={step.caps}
            animate={false}
          >
            {visuals[i]}
          </StepCard>
        ))}
      />
    </Section>
  );
}
