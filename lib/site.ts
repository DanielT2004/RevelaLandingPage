/**
 * Revela — single source of truth for all copy + site constants.
 * Edit headlines, features, and metadata here; components consume this data.
 * (Testimonials are intentionally bracketed placeholders — replace before launch.)
 */

export const SITE = {
  name: "Revela",
  domain: "revela.app",
  /** Drives canonical/OG/sitemap URLs. Set NEXT_PUBLIC_SITE_URL in your env. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://revela.app",
  email: "hello@revela.app",
  tagline: "Your footage, finished.",
  taglineLong: "Revela — raw clips in, ready-to-post video out.",

  // --- SEO / metadata ---
  title: "Revela — You Film Yourself Talking. It Cuts Like You Would.",
  titleTemplate: "%s · Revela",
  description:
    "Revela turns talking-head + b-roll footage into a post-ready vertical video in about 10 minutes — reviews, TikTok Shop promos, food and more. Find the hook, cut the rambles, swipe to finish. Join the waitlist.",
  ogTitle: "Revela — You film yourself talking. It cuts like you would.",
  ogDescription:
    "What takes 1–3 hours of editing takes about 10 minutes. Revela finds your hook, cuts the dead air, and hands you a cut you approve shot by shot — reviews, Shop promos, food and more. Join the early-access waitlist.",
  keywords: [
    "AI video editing",
    "food content creator",
    "TikTok editing app",
    "auto video editor",
    "short form video",
    "CapCut alternative",
    "Reels editing",
    "creator tools",
    "UGC video editor",
    "auto cut silence",
    "TikTok Shop video",
    "vlog editor",
    "talking head editor",
    "product review video",
  ],
} as const;

export const NAV_LINKS = [
  { label: "Try it", href: "#try-swipe" },
  { label: "The problem", href: "#problem" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Who it’s for", href: "#niches" },
  { label: "Features", href: "#features" },
] as const;

export const HERO = {
  eyebrow: "iOS · Launching soon",
  /** The visible headline is authored in Hero.tsx; this string is the
   *  screen-reader / reference version. */
  headline: "Raw clips in. Your edit out.",
  subhead:
    "Revela watches every second, finds your hook, cuts the dead air, lays your B-roll, and orders it the way your genre works — then you approve every cut. About 10 minutes, not 3 hours.",
  /** Above-the-fold differentiators (vs. auto-editors you can't steer). */
  differentiators: [
    { icon: "swipe", label: "You approve every cut" },
    { icon: "fingerprint", label: "Learns how you edit" },
    { icon: "export", label: "Flat price · no watermark" },
  ],
  inputPlaceholder: "Enter your email for early access",
  button: "Join the waitlist",
  reassurance: "No spam. Just early access.",
} as const;

/* ---------------------------------------------------------------------
   Section #2 — the self-editing statement. The visible lines are authored
   in EditStatement.tsx (they host the edit-mark animations); srText is the
   clean screen-reader sentence.
   --------------------------------------------------------------------- */
export const EDIT_STATEMENT = {
  srText: "Hook found. Dead air cut. B-roll placed. Edited like you would.",
  phoneCaption: "The actual app — your first cut, ready to sort.",
} as const;

export const PROBLEM = {
  eyebrow: "The part nobody posts about",
  headline: "You didn’t start creating to spend your night editing.",
  body: [
    "If you’re spending 1 to 3 hours cutting the same kind of video the same way every single time — you’re not alone. It’s the part nobody warns you about.",
    "You shoot something great. Then you sit down to find the hook, trim the dead air, fix the slow talking bits, line up the b-roll, and tighten it into something worth posting.",
    "Every. Single. Video. And by the time it’s done, you’re too drained to shoot the next one.",
  ],
  painCards: [
    { icon: "hook", label: "Hunting for the hook buried in your footage." },
    { icon: "scissors", label: "Cutting the slow, redundant, “get to the point” parts." },
    { icon: "audio", label: "Rescuing long talking-to-camera stretches." },
    { icon: "repeat", label: "Doing it all again tomorrow." },
  ],
} as const;

export const HOW_IT_WORKS = {
  eyebrow: "How it works",
  headline: "Three steps. Roughly ten minutes.",
  steps: [
    {
      n: "01",
      title: "Drop your clips",
      body: "Pick your raw footage — Revela watches every second so you don’t have to.",
    },
    {
      n: "02",
      title: "Get a first cut",
      body: "It finds your hook, trims the slow parts, and proposes a post-ready vertical cut — you review the plan before anything’s final.",
    },
    {
      n: "03",
      title: "Swipe to finish",
      body: "Sort every clip with a swipe — keep, cut, hook, or B-roll — then arrange, polish, and export.",
    },
  ],
} as const;

/* ---------------------------------------------------------------------
   Niches — the app's structural families, family-first labels.
   Only `deck`-bearing niches are live in the launch app; "soon" niches are
   honest fake doors (interest capture), matching the app's own picker.
   --------------------------------------------------------------------- */
export type NicheId = "food" | "reviews" | "promos" | "vlogs" | "teaching" | "other";
export type NicheStatus = "flagship" | "live" | "soon" | "other";
export type DeckNiche = "food" | "reviews" | "promos";

export const NICHES = {
  eyebrow: "Who it’s for",
  headline: "Whatever you film, it cuts like you.",
  subhead:
    "Every genre builds its videos differently — a review argues, a promo sells, a vlog flows. Revela knows the structure of yours. Pick your lane.",
  chips: {
    flagship: "Flagship · live",
    live: "Live at launch",
    soon: "Coming soon",
    other: "You tell us",
  },
  soonNote: "Not in the launch build — join the list and tell us you want it first.",
  items: [
    {
      id: "food",
      family: "Food & restaurants",
      topics: "reviews, spots, street food, travel eats · you give a verdict",
      status: "flagship",
      deck: "food",
      cta: "Watch it sort a shoot →",
    },
    {
      id: "reviews",
      family: "Reviews & recommendations",
      topics: "tech, products, beauty, places · you give a verdict",
      status: "live",
      deck: "reviews",
      cta: "Watch it sort a review →",
    },
    {
      id: "promos",
      family: "Promos that sell",
      topics: "TikTok Shop, UGC, brand deals · ends in a call-to-action",
      status: "live",
      deck: "promos",
      cta: "Watch it sort a promo →",
    },
    {
      id: "vlogs",
      family: "Vlogs & day-in-the-life",
      topics: "daily life, travel days, behind the scenes",
      status: "soon",
      deck: null,
      cta: "Want it first? →",
    },
    {
      id: "teaching",
      family: "Teaching & explaining",
      topics: "coaching, finance, expertise",
      status: "soon",
      deck: null,
      cta: "Want it first? →",
    },
    {
      id: "other",
      family: "Something else",
      topics: "tell us what you make",
      status: "other",
      deck: null,
      cta: "Join the list →",
    },
  ],
} as const satisfies {
  eyebrow: string;
  headline: string;
  subhead: string;
  chips: Record<NicheStatus, string>;
  soonNote: string;
  items: readonly {
    id: NicheId;
    family: string;
    topics: string;
    status: NicheStatus;
    deck: DeckNiche | null;
    cta: string;
  }[];
};

/* ---------------------------------------------------------------------
   Try-the-flow demo decks — one per LIVE niche. Verdict strings must stay
   within ClipVerdict (SwipeDeck's icon switch keys off them).
   --------------------------------------------------------------------- */
export type ClipTone = "sage" | "terracotta" | "ochre";
export type ClipVerdict = "Strong keep" | "Keeper" | "Your call" | "Suggested cut";
export type DemoClip = {
  label: string;
  scene: string;
  dur: number;
  verdict: ClipVerdict;
  tone: ClipTone;
  reason: string;
};
export type DemoDeck = { tab: string; project: string; clips: readonly DemoClip[] };

export const TRY_SWIPE = {
  eyebrow: "Try it yourself",
  headline: "Editing that feels like a game.",
  subhead:
    "This is the app’s real Sort stage. Every clip arrives with Revela’s read on it — swipe right to keep, left to cut, or send it to your hook or B-roll. Nothing’s deleted; cuts wait in the tray. Pick a shoot below to see how it reads your genre.",
  switcherHint: "Pick a shoot",
  stages: ["Sort", "Arrange", "Polish"],
  trayLabel: "Tray",
  tryIt: "Swipe the card — it’s interactive",
  spineLabel: "Your cut",
  keepLabel: "Keep",
  cutLabel: "Cut",
  hookLabel: "Hook",
  brollLabel: "B-roll",
  /** Consequence narration under the mini-timeline — the app's demo-deck
   *  coach lines, verbatim. */
  coach: {
    idle: "Sort the deck — your cut builds here.",
    keep: "Added to your cut.",
    cut: "Cut. It waits in the tray — nothing’s ever deleted.",
    hook: "Your new opener — moved to the very front.",
    broll: "Layered over the cut — it plays while your voice continues.",
  },
  decks: {
    food: {
      tab: "Food",
      project: "Pad thai, take 2",
      clips: [
        {
          label: "Sizzle close-up",
          scene: "Cooking",
          dur: 6,
          verdict: "Strong keep",
          tone: "sage",
          reason: "Loud sizzle, instant motion — this is the shot that stops the scroll.",
        },
        {
          label: "Long intro ramble",
          scene: "Talking",
          dur: 41,
          verdict: "Suggested cut",
          tone: "terracotta",
          reason: "32 seconds pass before the food shows up.",
        },
        {
          label: "The plating reveal",
          scene: "Plating",
          dur: 9,
          verdict: "Keeper",
          tone: "sage",
          reason: "Clean payoff shot — this earns the watch-through.",
        },
        {
          label: "Dead air / re-take",
          scene: "Talking",
          dur: 18,
          verdict: "Suggested cut",
          tone: "terracotta",
          reason: "A re-take of clip 02, with long pauses.",
        },
        {
          label: "First bite reaction",
          scene: "Reaction",
          dur: 7,
          verdict: "Your call",
          tone: "ochre",
          reason: "Great genuine reaction — but it repeats the payoff.",
        },
      ],
    },
    reviews: {
      tab: "Tech review",
      project: "M4 iPad review",
      clips: [
        {
          label: "“Don’t buy this yet” — the thesis",
          scene: "Talking",
          dur: 8,
          verdict: "Strong keep",
          tone: "sage",
          reason: "You give the verdict in one sentence — that’s the hook.",
        },
        {
          label: "Reading the spec sheet",
          scene: "Talking",
          dur: 46,
          verdict: "Suggested cut",
          tone: "terracotta",
          reason: "40 seconds of specs your viewer can Google.",
        },
        {
          label: "Unboxing the box",
          scene: "B-roll",
          dur: 12,
          verdict: "Your call",
          tone: "ochre",
          reason: "Every review opens on the box — your demo is stronger.",
        },
        {
          label: "Live demo — the lag moment",
          scene: "Demo",
          dur: 14,
          verdict: "Keeper",
          tone: "sage",
          reason: "Showing the flaw is the proof. Demos earn the longest screen time.",
        },
        {
          label: "Final verdict + who should buy",
          scene: "Talking",
          dur: 9,
          verdict: "Keeper",
          tone: "sage",
          reason: "Protected — the verdict is why they watched.",
        },
      ],
    },
    promos: {
      tab: "Shop promo",
      project: "Serum ad, take 3",
      clips: [
        {
          label: "Product in hand, first second",
          scene: "Talking",
          dur: 5,
          verdict: "Strong keep",
          tone: "sage",
          reason: "Product on screen immediately — Shop videos live or die here.",
        },
        {
          label: "Backstory ramble",
          scene: "Talking",
          dur: 38,
          verdict: "Suggested cut",
          tone: "terracotta",
          reason: "35 seconds before the product gets mentioned.",
        },
        {
          label: "Application close-up",
          scene: "B-roll",
          dur: 8,
          verdict: "Keeper",
          tone: "sage",
          reason: "Texture shot — proof it does what you say.",
        },
        {
          label: "Before / after",
          scene: "B-roll",
          dur: 7,
          verdict: "Keeper",
          tone: "sage",
          reason: "The claim, shown not said — the highest-converting beat.",
        },
        {
          label: "“Link in bio” CTA",
          scene: "Talking",
          dur: 6,
          verdict: "Strong keep",
          tone: "sage",
          reason: "Protected — the CTA is the video’s whole job.",
        },
      ],
    },
  },
  doneTitle: "All sorted",
  doneBody: "That’s the whole job — hook up front, B-roll layered over. You just built the cut.",
  exportCta: "Export my video",
  doneCta: "Join the waitlist",
  replay: "Run it again",
} as const satisfies Record<string, unknown> & { decks: Record<DeckNiche, DemoDeck> };

export const FEATURES = {
  eyebrow: "What Revela does",
  headline: "Everything you’d do by hand, done for you.",
  items: [
    {
      icon: "hook",
      title: "Finds your hook",
      body: "Revela scans your footage and opens on the moment that actually stops the scroll.",
      wide: false,
    },
    {
      icon: "scissors",
      title: "Cuts the slow stuff",
      body: "The dead air, the rambles, the redundant takes — trimmed before you even look.",
      wide: false,
    },
    {
      icon: "audio",
      title: "Talking bits into voiceover",
      body: "Turns rambling talk-to-camera stretches into your real voice over your b-roll — the product, the process, the plate.",
      wide: true,
    },
    {
      icon: "fingerprint",
      title: "Learns your style",
      body: "Every edit teaches Revela how you cut — so it starts feeling like you made it.",
      wide: false,
    },
    {
      icon: "export",
      title: "Post it today",
      body: "Full quality straight to your camera roll — no watermark, no credits, ready to post.",
      wide: false,
    },
    {
      icon: "swipe",
      title: "You approve every cut",
      body: "Revela proposes; you decide. Every cut is reviewed by the only editor who knows your channel — you.",
      wide: false,
    },
  ],
} as const;

export const TIME_SAVED = {
  eyebrow: "The math",
  headline: "2–3 hours of editing. Down to about 10 minutes.",
  body: "Get your night back, post more often, and spend your energy on the part you actually love — filming the next one.",
  /** Kinetic numbers (seconds are formatted H:MM:SS in the counter). */
  beforeSeconds: 10020, // 2:47:00
  beforeLabel: "Editing by hand",
  afterLabel: "≈ 10 minutes",
  savedChip: "2h 37m saved",
} as const;

export const SOCIAL_PROOF = {
  eyebrow: "Early access",
  headline: "Join the first creators trying Revela.",
  subhead:
    "Real reviews land here soon. For now, these are placeholders — the seats are not.",
  /**
   * PLACEHOLDER testimonials — do not ship these brackets.
   * Replace `quote`, `name`, `handle` with real, permissioned creator quotes.
   */
  placeholders: [
    {
      quote: "[Add a real quote about how much editing time Revela saved you.]",
      name: "[Creator name]",
      handle: "[@handle]",
    },
    {
      quote: "[Add a real quote about the swipe-to-finish editing flow here.]",
      name: "[Creator name]",
      handle: "[@handle]",
    },
    {
      quote: "[Add a real quote about the voiceover-over-b-roll feature here.]",
      name: "[Creator name]",
      handle: "[@handle]",
    },
    {
      quote: "[Add a real quote about posting more often now here.]",
      name: "[Creator name]",
      handle: "[@handle]",
    },
    {
      quote: "[Add a real quote about edits that feel like you made them.]",
      name: "[Creator name]",
      handle: "[@handle]",
    },
  ],
} as const;

export const FINAL_CTA = {
  eyebrow: "Get in early",
  headline: "Be first in line when Revela drops.",
  subhead:
    "Early access is limited — get on the list and start editing in minutes, not hours.",
  inputPlaceholder: "Enter your email",
  button: "Get early access",
  reassurance: "No spam. Unsubscribe anytime. Just the launch.",
} as const;

export const FOOTER = {
  tagline: "Your footage, finished.",
  links: [
    { label: "Home", href: "#top" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Try it", href: "#try-swipe" },
    { label: "Waitlist", href: "#waitlist" },
  ],
  contactLabel: "Questions?",
  bottomLine: "© 2026 Revela · Made for creators who’d rather be filming.",
} as const;

/** Shared form messaging (mirrors the API route’s result statuses). */
export const FORM_COPY = {
  successTitle: "You’re on the list.",
  successBody: "We’ll email you the moment early access opens.",
  duplicate: "You’re already on the list ✓",
  invalidEmail: "That email doesn’t look right.",
  serverError: "Something went wrong — try again.",
  unconfigured:
    "The waitlist isn’t connected yet. Add your Supabase keys to start collecting emails.",
  submitting: "Joining…",
} as const;
