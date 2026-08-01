"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { NicheId } from "@/lib/site";

type NicheState = {
  niche: NicheId | null;
  setNiche: (n: NicheId) => void;
};

/** Null-safe default: components using useNiche() outside the provider
 *  (e.g. in isolation/tests) get a no-op instead of a crash. */
const NicheContext = createContext<NicheState>({
  niche: null,
  setNiche: () => {},
});

/** Shared "which lane did the visitor pick" state. One provider wraps the
 *  page so the niches section's cards and the demo-deck switcher stay in
 *  sync. Server-rendered sections pass through as children untouched. */
export function NicheProvider({ children }: { children: React.ReactNode }) {
  const [niche, setNiche] = useState<NicheId | null>(null);
  const value = useMemo(() => ({ niche, setNiche }), [niche]);
  return <NicheContext.Provider value={value}>{children}</NicheContext.Provider>;
}

export function useNiche() {
  return useContext(NicheContext);
}
