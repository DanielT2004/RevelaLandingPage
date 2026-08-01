import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { DeckSwitcher } from "@/components/visuals/DeckSwitcher";
import { TRY_SWIPE } from "@/lib/site";

export function TrySwipe() {
  return (
    <Section id="try-swipe" labelledBy="try-heading" tone="dark">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <div className="max-w-xl">
          <Reveal className="flex">
            <Eyebrow className="text-terracotta-400">{TRY_SWIPE.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2
              id="try-heading"
              className="font-display text-3xl font-semibold leading-[1.1] tracking-[-0.01em] text-cream sm:text-[2.7rem]"
            >
              {TRY_SWIPE.headline}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-cream/60">
              {TRY_SWIPE.subhead}
            </p>
          </Reveal>
        </div>

        <Reveal delay={100} className="w-full">
          <DeckSwitcher />
        </Reveal>
      </div>
    </Section>
  );
}
