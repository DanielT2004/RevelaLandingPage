import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { FeatureCard } from "@/components/visuals/FeatureCard";
import { VoiceoverBlock } from "@/components/visuals/VoiceoverBlock";
import { Icon, type IconName } from "@/components/visuals/icons";
import { cn } from "@/lib/cn";
import { FEATURES } from "@/lib/site";

export function Features() {
  return (
    <Section id="features" labelledBy="features-heading" tone="cream-alt">
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow>{FEATURES.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={60}>
          <h2
            id="features-heading"
            className="font-display text-3xl font-semibold tracking-[-0.01em] text-charcoal sm:text-[2.7rem]"
          >
            {FEATURES.headline}
          </h2>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FEATURES.items.map((item, i) => (
          <Reveal
            key={item.title}
            delay={(i % 2) * 70}
            className={cn("h-full", item.wide && "sm:col-span-2")}
          >
            {item.wide ? (
              <FeatureCard
                icon={item.icon as IconName}
                title={item.title}
                body={item.body}
                wide
              >
                <VoiceoverBlock />
              </FeatureCard>
            ) : (
              <FeatureCard
                icon={item.icon as IconName}
                title={item.title}
                body={item.body}
              />
            )}
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
