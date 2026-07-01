import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { TimeCollapseBar } from "@/components/visuals/TimeCollapseBar";
import { TIME_SAVED } from "@/lib/site";

export function TimeSaved() {
  return (
    <Section labelledBy="time-heading" tone="dark">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal className="flex justify-center">
          <Eyebrow className="text-terracotta-400">{TIME_SAVED.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={60}>
          <h2
            id="time-heading"
            className="font-display text-3xl font-semibold leading-[1.1] tracking-[-0.01em] text-cream sm:text-[2.9rem]"
          >
            {TIME_SAVED.headline}
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-cream/60">
            {TIME_SAVED.body}
          </p>
        </Reveal>
      </div>

      <Reveal delay={140}>
        <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-cream/10 bg-charcoal-800 p-7 sm:p-10">
          <div className="flex items-center justify-center gap-6 sm:gap-12">
            <div className="text-center">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-cream/45">
                {TIME_SAVED.beforeLabel}
              </p>
              <p className="mt-1.5 font-display text-3xl font-semibold text-cream/40 line-through decoration-terracotta/60 decoration-2 sm:text-4xl">
                2–3 hrs
              </p>
            </div>

            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
              className="shrink-0 text-terracotta-400"
            >
              <path
                d="M5 12h13M13 7l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="text-center">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-sage-400">
                With Segma
              </p>
              <p className="mt-1.5 font-display text-4xl font-semibold text-terracotta-400 sm:text-5xl">
                {TIME_SAVED.afterLabel}
              </p>
            </div>
          </div>

          <TimeCollapseBar className="mt-9" />
        </div>
      </Reveal>
    </Section>
  );
}
