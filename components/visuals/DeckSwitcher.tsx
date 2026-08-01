"use client";

import { useEffect, useRef, useState } from "react";
import { SwipeDeck, type Decision } from "./SwipeDeck";
import { SpineStrip } from "./SpineStrip";
import { useNiche } from "@/components/niche/NicheContext";
import { cn } from "@/lib/cn";
import { TRY_SWIPE, type DeckNiche } from "@/lib/site";

const DECK_IDS = Object.keys(TRY_SWIPE.decks) as DeckNiche[];

function isDeckNiche(n: string | null): n is DeckNiche {
  return n !== null && n in TRY_SWIPE.decks;
}

/** Tabs over the demo deck — one per LIVE niche (coming-soon niches never
 *  get a deck; that would advertise capability the launch app doesn't have).
 *  Styled like the in-app stage switcher. Selecting a niche card in the
 *  "Who it's for" section switches the deck via NicheContext. */
export function DeckSwitcher() {
  const { niche } = useNiche();
  const [tab, setTab] = useState<DeckNiche>("food");
  // Decisions mirrored out of the deck — they drive the SpineStrip rail.
  const [decisions, setDecisions] = useState<Decision[]>([]);
  // Once any deck has mounted, later decks skip the one-time teaching nudge.
  const everMounted = useRef(false);
  useEffect(() => {
    everMounted.current = true;
  }, []);

  function switchTab(id: DeckNiche) {
    setTab(id);
    setDecisions([]);
  }

  // A niche card tap (context change) drives the tab; local taps override.
  useEffect(() => {
    if (isDeckNiche(niche)) {
      setTab(niche);
      setDecisions([]);
    }
  }, [niche]);

  const deck = TRY_SWIPE.decks[tab];

  return (
    <div className="mx-auto w-full max-w-[300px]">
      <div
        role="tablist"
        aria-label={TRY_SWIPE.switcherHint}
        className="mb-5 flex gap-1 rounded-2xl bg-cream/[0.06] p-1"
      >
        {DECK_IDS.map((id) => (
          <button
            key={id}
            role="tab"
            type="button"
            aria-selected={tab === id}
            onClick={() => switchTab(id)}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-[0.78rem] transition-colors",
              tab === id
                ? "bg-charcoal-700 font-semibold text-cream shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
                : "text-cream/45 hover:text-cream/70"
            )}
          >
            {tab === id && (
              <span className="h-1.5 w-1.5 rounded-full bg-terracotta-400" aria-hidden />
            )}
            {TRY_SWIPE.decks[id].tab}
          </button>
        ))}
      </div>

      {/* key remounts the deck per tab: clean per-genre reset, no mid-deck
          AnimatePresence exits from a data swap. */}
      <SwipeDeck
        key={tab}
        clips={deck.clips}
        project={deck.project}
        initialInteracted={everMounted.current}
        onDecide={(d) => setDecisions((prev) => [...prev, d])}
        onReset={() => setDecisions([])}
        belowPhone={<SpineStrip clips={deck.clips} decisions={decisions} />}
      />
    </div>
  );
}
