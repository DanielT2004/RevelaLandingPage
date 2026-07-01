"use client";

import { useState, type CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { SOCIAL_PROOF } from "@/lib/site";

type Placeholder = (typeof SOCIAL_PROOF.placeholders)[number];

function OutlineStars() {
  // Outline (empty) stars — visibly NOT a real rating.
  return (
    <div className="flex gap-0.5 text-warmgray/50" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L12 16.77 6.8 19.5l.99-5.79-4.21-4.1 5.82-.85z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({
  card,
  hidden = false,
}: {
  card: Placeholder;
  hidden?: boolean;
}) {
  return (
    <figure
      aria-hidden={hidden || undefined}
      className="mr-4 flex w-[18rem] shrink-0 flex-col rounded-2xl border border-dashed border-charcoal/20 bg-cream-50 p-5 sm:w-[20rem]"
    >
      <div className="flex items-center justify-between">
        <OutlineStars />
        <span className="rounded-full bg-warmgray/10 px-2 py-0.5 font-mono text-[0.55rem] font-semibold uppercase tracking-[0.1em] text-warmgray">
          Placeholder
        </span>
      </div>
      <blockquote className="mt-3.5 flex-1 text-[0.98rem] leading-relaxed text-charcoal/75">
        {card.quote}
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <span
          className="h-9 w-9 shrink-0 rounded-full border border-dashed border-charcoal/25 bg-warmgray/10"
          aria-hidden
        />
        <span className="text-sm">
          <span className="block font-semibold text-charcoal">{card.name}</span>
          <span className="block font-mono text-xs text-warmgray">
            {card.handle}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

const maskStyle: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
  maskImage:
    "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
};

function MarqueeRow({
  reverse = false,
  durationSec = 48,
}: {
  reverse?: boolean;
  durationSec?: number;
}) {
  const cards = SOCIAL_PROOF.placeholders;
  const doubled = [...cards, ...cards];
  return (
    <div className="marquee-mask relative overflow-hidden" style={maskStyle}>
      <div
        className={cn("marquee-track", reverse && "marquee-reverse")}
        style={{ ["--marquee-duration" as string]: `${durationSec}s` }}
      >
        {doubled.map((card, i) => (
          <TestimonialCard key={i} card={card} hidden={i >= cards.length} />
        ))}
      </div>
    </div>
  );
}

export function SocialProof() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      aria-labelledby="social-heading"
      className="relative isolate overflow-hidden bg-cream py-[var(--spacing-section)] text-charcoal"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="flex justify-center">
            <Eyebrow>{SOCIAL_PROOF.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2
              id="social-heading"
              className="font-display text-3xl font-semibold tracking-[-0.01em] text-charcoal sm:text-[2.7rem]"
            >
              {SOCIAL_PROOF.headline}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mx-auto mt-4 max-w-md text-[1.02rem] leading-relaxed text-warmgray">
              {SOCIAL_PROOF.subhead}
            </p>
          </Reveal>
          <Reveal delay={170} className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 px-4 py-2 text-sm font-medium text-charcoal/70 transition-colors hover:border-charcoal/30 hover:text-charcoal"
            >
              {paused ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              )}
              {paused ? "Play testimonials" : "Pause testimonials"}
            </button>
          </Reveal>
        </div>
      </Container>

      <div className={cn("mt-12 flex flex-col gap-4", paused && "marquee-paused")}>
        <MarqueeRow durationSec={48} />
        <MarqueeRow reverse durationSec={58} />
      </div>
    </section>
  );
}
