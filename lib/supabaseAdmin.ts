import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the SERVICE-ROLE key (bypasses RLS).
 * - Never import this from a "use client" component — `server-only` will throw at build time.
 * - Returns `null` when env is missing so the app runs locally without crashing
 *   (the API route then reports an honest "not configured" state — never a fake success).
 */
let cached: SupabaseClient | null | undefined;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    cached = null;
    return null;
  }

  cached = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { "x-application-name": "segma-waitlist" } },
  });
  return cached;
}
