import { getSupabaseAdmin } from "./supabaseAdmin";

/**
 * ============================================================================
 *  THE SINGLE WAITLIST INTEGRATION POINT
 * ============================================================================
 * `storeEmail` is the only place the app persists a signup. It is pre-wired to
 * Supabase. To swap in a different backend (Airtable, Resend, a CRM webhook,
 * Google Sheets, etc.), replace the body of `storeEmail` below and keep the
 * same return contract — nothing else in the app needs to change.
 *
 * Return contract (drives real UI states — never fake a success):
 *   { status: "ok" }            → inserted, show success
 *   { status: "duplicate" }     → already on the list, show friendly success
 *   { status: "unconfigured" }  → no backend env set, API returns 503 (honest)
 *   { status: "error" }         → unexpected failure, API returns 500
 *
 * ---- Example: forward to a webhook / Airtable / Resend instead of Supabase ----
 * export async function storeEmail(email, meta) {
 *   const res = await fetch(process.env.WAITLIST_WEBHOOK_URL!, {
 *     method: "POST",
 *     headers: { "content-type": "application/json" },
 *     body: JSON.stringify({ email, ...meta }),
 *   });
 *   if (res.status === 409) return { status: "duplicate" };
 *   return res.ok ? { status: "ok" } : { status: "error" };
 * }
 * ---------------------------------------------------------------------------
 */

export type StoreResult =
  | { status: "ok" }
  | { status: "duplicate" }
  | { status: "unconfigured" }
  | { status: "error"; message?: string };

export type WaitlistMeta = {
  source?: string;
  referrer?: string | null;
  userAgent?: string | null;
};

export async function storeEmail(
  email: string,
  meta: WaitlistMeta = {}
): Promise<StoreResult> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    // Env not set — be honest, don't pretend it worked.
    console.warn(
      "[waitlist] Supabase env missing (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY). Email NOT stored:",
      email
    );
    return { status: "unconfigured" };
  }

  const { error } = await supabase.from("waitlist").insert({
    email,
    source: meta.source ?? null,
    referrer: meta.referrer ?? null,
    user_agent: meta.userAgent ?? null,
  });

  if (error) {
    // Postgres 23505 = unique_violation → this email is already on the list.
    if (error.code === "23505") return { status: "duplicate" };
    console.error("[waitlist] insert failed:", error.message);
    return { status: "error", message: error.message };
  }

  return { status: "ok" };
}
