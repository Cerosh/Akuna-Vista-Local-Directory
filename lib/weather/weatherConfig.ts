/**
 * Single source of truth for the weather feature's refresh cadence. Derives
 * the server-side cache TTL, Next's `fetch` `revalidate` window, and the
 * client's polling interval — previously three independently hardcoded "10
 * minutes" values that could silently drift out of sync.
 */
export const WEATHER_REFRESH_MINUTES = 10;
