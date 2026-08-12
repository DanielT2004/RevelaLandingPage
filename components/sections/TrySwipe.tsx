import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { DeckSwitcher } from "@/components/visuals/DeckSwitcher";
import { TRY_SWIPE } from "@/lib/site";

export function TrySwipe() {
  return (
    <Section id="try-swipe" labelledBy="try-heading" tone="dark">
      {/* Mobile story order = source order: headline → deck → how-to. On lg
          the headline and subhead stack back into column 1 (gap-y-0 + the
          subhead's own mt-5) with the deck spanning both rows. */}
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:grid-rows-[auto_auto] lg:gap-x-16 lg:gap-y-0">
        <div className="max-w-xl lg:col-start-1 lg:row-start-1 lg:self-end">
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
        </div>

        <Reveal
          delay={100}
          className="w-full lg:col-start-2 lg:row-span-2 lg:row-start-1"
        >
          <DeckSwitcher />
        </Reveal>

        <div className="max-w-xl lg:col-start-1 lg:row-start-2 lg:self-start">
          <Reveal delay={120}>
            <p className="max-w-md text-lg leading-relaxed text-cream/60 lg:mt-5">
              <span className="sm:hidden">{TRY_SWIPE.subheadShort}</span>
              <span className="hidden sm:inline">{TRY_SWIPE.subhead}</span>
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
