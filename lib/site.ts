/**
 * Segma — single source of truth for all copy + site constants.
 * Edit headlines, features, and metadata here; components consume this data.
 * (Testimonials are intentionally bracketed placeholders — replace before launch.)
 */

export const SITE = {
  name: "Segma",
  domain: "segma.app",
  /** Drives canonical/OG/sitemap URLs. Set NEXT_PUBLIC_SITE_URL in your env. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://segma.app",
  email: "hello@segma.app",
  tagline: "Your footage, finished.",
  taglineLong: "Segma — raw clips in, ready-to-post video out.",

  // --- SEO / metadata ---
  title: "Segma — Edit Food Videos in 10 Minutes, Not 3 Hours",
  titleTemplate: "%s · Segma",
  description:
    "Segma turns your raw food footage into a post-ready TikTok in about 10 minutes. Find the hook, cut the slow parts, swipe to finish. Join the waitlist.",
  ogTitle: "Segma — Your raw clips in, a ready-to-post TikTok out.",
  ogDescription:
    "What takes 1–3 hours of editing takes about 10 minutes. Segma finds your hook, trims the slow parts, and hands you a post-ready video. Join the early-access waitlist.",
  keywords: [
    "AI video editing",
    "food content creator",
    "TikTok editing app",
    "auto video editor",
    "short form video",
    "CapCut alternative",
    "Reels editing",
    "creator tools",
  ],
} as const;

export const NAV_LINKS = [
  { label: "The problem", href: "#problem" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
] as const;

export const HERO = {
  eyebrow: "iOS · Launching soon",
  headline: "Edit your food videos in 10 minutes, not 3 hours.",
  subhead:
    "Segma turns your raw footage into a post-ready TikTok — you just swipe to refine and hit export.",
  inputPlaceholder: "Enter your email for early access",
  button: "Join the waitlist",
  reassurance: "No spam. Just early access.",
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
      body: "Pick your raw footage — Segma watches every second so you don’t have to.",
    },
    {
      n: "02",
      title: "Get a first cut",
      body: "It finds your hook, trims the slow parts, and sequences a post-ready vertical video.",
    },
    {
      n: "03",
      title: "Swipe to finish",
      body: "Refine it in a fast, fun, swipe-based flow — then export and post.",
    },
  ],
} as const;

export const FEATURES = {
  eyebrow: "What Segma does",
  headline: "Everything you’d do by hand, done for you.",
  items: [
    {
      icon: "hook",
      title: "Finds your hook",
      body: "Segma scans your footage and opens on the moment that actually stops the scroll.",
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
      body: "Turns boring talk-to-camera stretches into your real voice over crisp food b-roll.",
      wide: true,
    },
    {
      icon: "fingerprint",
      title: "Learns your style",
      body: "Every edit teaches Segma how you cut — so it starts feeling like you made it.",
      wide: false,
    },
    {
      icon: "export",
      title: "Export anywhere",
      body: "Straight to your camera roll, or into CapCut when you want to finish it your way.",
      wide: false,
    },
  ],
} as const;

export const TIME_SAVED = {
  eyebrow: "The math",
  headline: "2–3 hours of editing. Down to about 10 minutes.",
  body: "Get your night back, post more often, and spend your energy on the part you actually love — making the food.",
  /** Kinetic numbers (seconds are formatted H:MM:SS in the counter). */
  beforeSeconds: 10020, // 2:47:00
  beforeLabel: "Editing by hand",
  afterLabel: "≈ 10 minutes",
  savedChip: "2h 37m saved",
} as const;

export const SOCIAL_PROOF = {
  eyebrow: "Early access",
  headline: "Join the first creators trying Segma.",
  subhead:
    "Real reviews land here soon. For now, these are placeholders — the seats are not.",
  /**
   * PLACEHOLDER testimonials — do not ship these brackets.
   * Replace `quote`, `name`, `handle` with real, permissioned creator quotes.
   */
  placeholders: [
    {
      quote: "[Add a real quote about how much editing time Segma saved you.]",
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
  headline: "Be first in line when Segma drops.",
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
    { label: "Waitlist", href: "#waitlist" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
  contactLabel: "Questions?",
  bottomLine: "© 2026 Segma · Made for creators who’d rather be cooking.",
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
