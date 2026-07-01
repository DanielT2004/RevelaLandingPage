import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";

/**
 * Type system:
 *  - Fraunces  → display / headlines (warm, high-contrast serif; premium, editorial)
 *  - Inter     → body / UI (neutral, hyper-legible)
 *  - IBM Plex Mono → mockup timecodes & counters (the "video editor" tell)
 *
 * next/font self-hosts these at build time (no external CDN request, no CLS —
 * a size-adjusted fallback is generated automatically).
 */
export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-fraunces",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
});
