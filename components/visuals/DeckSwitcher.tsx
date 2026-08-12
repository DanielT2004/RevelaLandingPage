"use client";

import { useEffect, useRef, useState } from "react";
import { SwipeDeck, type Decision } from "./SwipeDeck";
import { SpineStrip } from "./SpineStrip";
import { useNiche } from "@/components/niche/NicheContext";
import { TRY_SWIPE, type DeckNiche } from "@/lib/site";

function isDeckNiche(n: string | null): n is DeckNiche {
  return n !== null && n in TRY_SWIPE.decks;
}

/** The demo deck, defaulting to the flagship genre. There are no visible
 *  tabs: visitors don't tab through three demos, and the "Who it's for"
 *  cards already switch genres via NicheContext — which makes those cards
 *  the single, purposeful way in. Coming-soon niches never get a deck;
 *  that would advertise capability the launch app doesn't have. */
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

  // A niche card tap (context change) selects the deck.
  useEffect(() => {
    if (isDeckNiche(niche)) {
      setTab(niche);
      setDecisions([]);
    }
  }, [niche]);

  const deck = TRY_SWIPE.decks[tab];

  return (
    <div className="mx-auto w-full max-w-[300px]">
      {/* key remounts the deck per genre: clean reset, no mid-deck
          AnimatePresence exits from a data swap. */}
      <SwipeDeck
        key={tab}
        clips={deck.clips}
        project={deck.project}
        genre={tab}
        initialInteracted={everMounted.current}
        onDecide={(d) => setDecisions((prev) => [...prev, d])}
        onReset={() => setDecisions([])}
        belowPhone={<SpineStrip clips={deck.clips} decisions={decisions} />}
      />
    </div>
  );
}
