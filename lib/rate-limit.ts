/**
 * In-memory fixed-window rate limiter.
 *
 * Deliberately simple: a booking form gets a handful of submissions a day, and
 * this keeps a script from hammering the Resend quota. It is per-instance, so
 * on Vercel each serverless instance keeps its own counter — good enough as a
 * spam brake, and explicitly not a security control. If the site ever needs a
 * real one, swap this for Upstash Redis without touching the route.
 */
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_WINDOW = 5;

const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string): { ok: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now >= entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    sweep(now);
    return { ok: true, retryAfterSeconds: 0 };
  }

  entry.count += 1;
  if (entry.count > MAX_PER_WINDOW) {
    return { ok: false, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfterSeconds: 0 };
}

/** Drop expired entries so the map can't grow without bound. */
function sweep(now: number) {
  if (hits.size < 500) return;
  for (const [key, entry] of hits) {
    if (now >= entry.resetAt) hits.delete(key);
  }
}
