import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import { FINAL_CTA } from "@/lib/site";

export function FinalCTA() {
  return (
    <Section id="join" labelledBy="cta-heading" tone="dark">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <Reveal className="flex justify-center">
          <Eyebrow className="text-terracotta-400">{FINAL_CTA.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={60}>
          <h2
            id="cta-heading"
            className="font-display text-3xl font-semibold leading-[1.08] tracking-[-0.01em] text-cream sm:text-[3rem]"
          >
            {FINAL_CTA.headline}
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-cream/60">
            {FINAL_CTA.subhead}
          </p>
        </Reveal>
        <Reveal delay={180} className="mt-9 flex w-full justify-center">
          <WaitlistForm
            variant="dark"
            source="final-cta"
            placeholder={FINAL_CTA.inputPlaceholder}
            buttonLabel={FINAL_CTA.button}
            reassurance={FINAL_CTA.reassurance}
          />
        </Reveal>
      </div>
    </Section>
  );
}
