/**
 * Best-effort, in-memory rate limiter (per serverless instance).
 * This is a speed bump, NOT a guarantee: on Vercel the Map is per-instance and
 * resets on cold start, so it won't be shared across concurrent instances.
 *
 * Production upgrade: swap this for a durable store (e.g. Upstash Redis via
 * `@upstash/ratelimit`) using UPSTASH_REDIS_REST_URL / _TOKEN. The honeypot in
 * the API route remains the real first line of defense against bots.
 */
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  opts?: { limit?: number; windowMs?: number }
): { ok: boolean; retryAfter?: number } {
  const limit = opts?.limit ?? 6;
  const windowMs = opts?.windowMs ?? 60_000;
  const now = Date.now();

  // Opportunistic cleanup so the Map can't grow unbounded.
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) if (now > b.resetAt) buckets.delete(k);
  }

  const bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (bucket.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { ok: true };
}
