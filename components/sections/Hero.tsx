import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import { ChaosToCutHero } from "@/components/visuals/ChaosToCutHero";
import { Icon } from "@/components/visuals/icons";
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

      {/* Mobile story order is the source order: promise → art → invite.
          On lg the two text blocks stack back into column 1 (gap-y-0 + the
          blocks' own margins reproduce the original single-column layout)
          while the art spans both rows in column 2. */}
      <Container className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:grid-rows-[auto_auto] lg:gap-x-10 lg:gap-y-0">
        <div className="max-w-xl lg:col-start-1 lg:row-start-1 lg:self-end">
          <Reveal>
            <Eyebrow>{HERO.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={70}>
            <h1
              id="hero-heading"
              className="relative font-display text-[2.7rem] font-semibold leading-[1.04] tracking-[-0.02em] text-charcoal sm:text-[3.4rem] lg:text-[3.9rem]"
            >
              Raw clips in.{" "}
              <span className="text-terracotta">Your edit out.</span>
              {/* Playhead that sweeps the headline once it's in view. */}
              <span aria-hidden className="headline-playhead" />
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-charcoal/70">
              <span className="sm:hidden">{HERO.subheadShort}</span>
              <span className="hidden sm:inline">{HERO.subhead}</span>
            </p>
          </Reveal>
        </div>

        {/* The chaos→cut art — on mobile it's the "show" beat right after the
            promise; its sequence starts when it scrolls into view. */}
        <div className="w-full justify-self-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:justify-self-end">
          <ChaosToCutHero />
        </div>

        <div className="max-w-xl lg:col-start-1 lg:row-start-2 lg:self-start">
          {/* Above-the-fold differentiators — what auto-editors can't say. */}
          <Reveal delay={175}>
            <ul className="flex flex-wrap gap-2 lg:mt-5">
              {HERO.differentiators.map((d) => (
                <li
                  key={d.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-charcoal/10 bg-cream-50 px-3 py-1.5 font-mono text-[0.65rem] font-medium uppercase tracking-[0.08em] text-charcoal/70"
                >
                  <Icon name={d.icon} size={13} className="text-terracotta-600" />
                  {d.label}
                </li>
              ))}
            </ul>
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
      </Container>
    </section>
  );
}
