import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { Icon, type IconName } from "@/components/visuals/icons";
import { PROBLEM } from "@/lib/site";

export function ProblemSection() {
  return (
    <Section
      id="problem"
      labelledBy="problem-heading"
      tone="cream-alt"
      containerClassName="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16"
    >
      <div className="max-w-xl">
        <Reveal>
          <Eyebrow>{PROBLEM.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={60}>
          <h2
            id="problem-heading"
            className="font-display text-3xl font-semibold leading-[1.1] tracking-[-0.01em] text-charcoal sm:text-[2.7rem]"
          >
            {PROBLEM.headline}
          </h2>
        </Reveal>
        <div className="mt-6 space-y-4">
          {PROBLEM.body.map((para, i) => (
            <Reveal key={i} delay={120 + i * 60}>
              <p className="text-[1.05rem] leading-relaxed text-charcoal/70">
                {para}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

      <RevealGroup className="grid grid-cols-1 gap-4 self-center sm:grid-cols-2">
        {PROBLEM.painCards.map((card) => (
          <div
            key={card.label}
            className="flex h-full items-start gap-3.5 rounded-2xl border border-charcoal/8 bg-cream-50 p-5"
          >
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-terracotta-50 text-terracotta-600">
              <Icon name={card.icon as IconName} size={18} />
            </span>
            <p className="text-[0.98rem] font-medium leading-snug text-charcoal/85">
              {card.label}
            </p>
          </div>
        ))}
      </RevealGroup>
    </Section>
  );
}
