import { z } from "zod";

/** Normalizing email schema — shared by the client form and the API route. */
export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Email is required.")
  .max(254, "That email is too long.")
  .email("That email doesn’t look right.");

/** Raw request body shape. Email is validated separately (via emailSchema) for precise messaging. */
export const waitlistBodySchema = z.object({
  email: z.string().max(320),
  /** Honeypot — real users never fill this; bots often do. Must be empty. */
  company: z.string().max(200).optional().default(""),
  /** Which form submitted (analytics): "hero" | "final-cta". */
  source: z.string().max(40).optional().default("hero"),
});

export type WaitlistBody = z.infer<typeof waitlistBodySchema>;
