/**
 * Small, generic, explicitly testable time-to-live cache — deliberately
 * separate from Next's own `fetch` `revalidate` cache (which isn't
 * meaningfully unit-testable in isolation) so cache behaviour itself has
 * direct test coverage, per the project owner's request.
 */
export interface TtlCache<T> {
  get(now?: number): T | null;
  set(value: T, now?: number): void;
}

export function createTtlCache<T>(ttlMs: number): TtlCache<T> {
  let cached: { value: T; expiresAt: number } | null = null;

  return {
    get(now = Date.now()) {
      if (!cached || now >= cached.expiresAt) {
        return null;
      }
      return cached.value;
    },
    set(value: T, now = Date.now()) {
      cached = { value, expiresAt: now + ttlMs };
    },
  };
}
