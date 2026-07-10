import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import { TransformationPhone } from "@/components/visuals/TransformationPhone";
import { HERO } from "@/lib/site";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-cream pb-16 pt-24 sm:pt-32 lg:pb-24"
    >
      {/* Soft warm wash — no orbs, just a faint terracotta glow off the top. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_45%_at_50%_-5%,rgba(181,101,74,0.07),transparent_70%)]"
      />

      <Container className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow>{HERO.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={70}>
            <h1
              id="hero-heading"
              className="relative font-display text-[2.7rem] font-semibold leading-[1.04] tracking-[-0.02em] text-charcoal sm:text-[3.4rem] lg:text-[3.9rem]"
            >
              Edit your food videos in{" "}
              <span className="whitespace-nowrap text-terracotta">
                10 minutes
              </span>
              ,{" "}
              <span className="whitespace-nowrap text-warmgray">
                not{" "}
                <span className="relative whitespace-nowrap">
                  3 hours
                  {/* The "cut": a terracotta strike that draws itself as the
                      playhead sweeps past. Shown fully under reduced motion. */}
                  <span
                    aria-hidden
                    className="headline-strike absolute left-0 top-1/2 h-[3px] w-full rounded-full bg-terracotta/55"
                  />
                </span>
              </span>
              .
              {/* Playhead that sweeps the headline once on load. */}
              <span aria-hidden className="headline-playhead" />
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-charcoal/70">
              {HERO.subhead}
            </p>
          </Reveal>

          <Reveal delay={210}>
            <div id="waitlist" className="mt-8 scroll-mt-24">
              <WaitlistForm
                source="hero"
                placeholder={HERO.inputPlaceholder}
                buttonLabel={HERO.button}
                reassurance={HERO.reassurance}
              />
            </div>
          </Reveal>
        </div>

        {/* Not scroll-gated: this is first-paint content and must be visible
            (and peeking into the fold) on mobile immediately. */}
        <div className="w-full justify-self-center lg:justify-self-end">
          <TransformationPhone />
        </div>
      </Container>
    </section>
  );
}
