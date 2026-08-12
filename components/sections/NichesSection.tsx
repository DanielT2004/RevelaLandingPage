"use client";

import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { useNiche } from "@/components/niche/NicheContext";
import { NicheArt } from "@/components/visuals/NicheArt";
import { cn } from "@/lib/cn";
import { NICHES, type NicheStatus } from "@/lib/site";

/** Status chips on dark cards. Live lanes read as product truth; "soon"
 *  lanes are honest interest doors — never styled as live. */
const chipClass: Record<NicheStatus, string> = {
  flagship: "bg-terracotta text-cream",
  live: "bg-sage/25 text-sage-400",
  soon: "border border-ochre-400/50 text-ochre-400",
  other: "border border-cream/25 text-cream/60",
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** "Who it's for" — the app's six structural-family cards, mirrored on the
 *  site. Live lanes jump into the demo deck already switched to that genre;
 *  coming-soon and catch-all lanes jump to the waitlist. */
export function NichesSection() {
  const { setNiche } = useNiche();

  return (
    <Section id="niches" labelledBy="niches-heading" tone="cream-alt">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal className="flex justify-center">
          <Eyebrow>{NICHES.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={60}>
          <h2
            id="niches-heading"
            className="font-display text-3xl font-semibold tracking-[-0.01em] text-charcoal sm:text-[2.7rem]"
          >
            {NICHES.headline}
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-5 text-lg leading-relaxed text-warmgray">
            {NICHES.subhead}
          </p>
        </Reveal>
      </div>

      <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {NICHES.items.map((item) => {
          const isLive = item.deck !== null;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setNiche(item.id);
                scrollTo(isLive ? "try-swipe" : "waitlist");
              }}
              className={cn(
                "group flex flex-col items-start rounded-2xl border border-cream/10 bg-charcoal-900 p-5 text-left",
                "shadow-[0_24px_50px_-30px_rgba(27,24,21,0.6)] transition-transform duration-200 ease-[var(--ease-revela)]",
                "hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"
              )}
            >
              {/* Art first — the eye should land on six different drawings
                  before it lands on any text. */}
              <NicheArt
                variant={item.id}
                muted={item.status === "soon"}
                className="mb-6"
              />

              <div className="flex w-full items-start justify-between gap-3">
                <h3 className="font-display text-xl font-semibold text-cream">
                  {item.family}
                </h3>
                <span
                  className={cn(
                    "mt-0.5 shrink-0 rounded-full px-2 py-0.5 font-mono text-[0.55rem] font-semibold uppercase tracking-[0.08em]",
                    chipClass[item.status]
                  )}
                >
                  {NICHES.chips[item.status]}
                </span>
              </div>
              <p className="mt-2 font-mono text-[0.68rem] leading-relaxed text-cream/50">
                {item.topics}
              </p>
              {item.status === "soon" && (
                <p className="mt-3 text-[0.8rem] leading-snug text-cream/45">
                  {NICHES.soonNote}
                </p>
              )}
              <span className="mt-auto pt-4 text-sm font-medium text-terracotta-400 transition-colors group-hover:text-terracotta-100">
                {item.cta}
              </span>
            </button>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
