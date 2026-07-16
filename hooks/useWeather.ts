"use client";

import { usePolling } from "@/hooks/usePolling";
import type { WeatherData } from "@/lib/weather/weather.types";
import { WEATHER_REFRESH_MINUTES } from "@/lib/weather/weatherConfig";

// Per the project owner's explicit requirement — refresh on the same
// cadence as the server-side cache (WEATHER_REFRESH_MINUTES).
const REFRESH_INTERVAL_MS = WEATHER_REFRESH_MINUTES * 60 * 1000;

/**
 * Polls this app's own `/api/weather` route (never Open-Meteo directly —
 * this project's CSP `connect-src 'self'` wouldn't allow it anyway) every
 * `WEATHER_REFRESH_MINUTES` for Schofields' current conditions and daily
 * forecast.
 *
 * `initialData` seeds the hook from a server-fetched value (see
 * `app/(home)/page.tsx`, which calls `getSchofieldsWeather()` directly) so
 * the homepage's first paint shows real conditions instead of a guaranteed
 * loading skeleton — this hook then owns only the ongoing client-side
 * refresh polling.
 */
export function useWeather(initialData: WeatherData | null = null) {
  return usePolling<WeatherData>("/api/weather", REFRESH_INTERVAL_MS, { initialData });
}
