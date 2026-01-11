// Simple in-memory rate limiter
const rateLimits = new Map<string, { count: number; resetTime: number }>();

const config = {
  WINDOW_SIZE_IN_MS: 60 * 1000, // 1 minute
  MAX_REQUESTS: 100, // Max. requests per window per user
} as const;

export async function rateLimit(ip: string) {
  const now = Date.now();
  const key = `rateLmit:${ip}`;

  let entry = rateLimits.get(key);

  // Reset if window expired
  if (!entry || now > entry.resetTime) {
    entry = { count: 1, resetTime: now + config.WINDOW_SIZE_IN_MS };
    rateLimits.set(key, entry);
    return { limited: false, remaining: config.MAX_REQUESTS - 1 };
  }

  entry.count++;

  return {
    limited: entry.count > config.MAX_REQUESTS,
    remaining: Math.max(0, config.MAX_REQUESTS - entry.count),
  };
}
