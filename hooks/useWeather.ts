"use client";

import { useEffect, useState } from "react";
import type { WeatherData } from "@/lib/weather/weather.types";

// Per the project owner's explicit requirement — refresh every 10 minutes.
const REFRESH_INTERVAL_MS = 10 * 60 * 1000;

interface WeatherState {
  data: WeatherData | null;
  isLoading: boolean;
  hasError: boolean;
}

/**
 * Polls this app's own `/api/weather` route (never Open-Meteo directly —
 * this project's CSP `connect-src 'self'` wouldn't allow it anyway) every
 * 10 minutes for Schofields' current conditions and 7-day forecast.
 */
export function useWeather(): WeatherState {
  const [data, setData] = useState<WeatherData | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/weather");
        if (!response.ok) {
          throw new Error(`Unexpected status ${response.status}`);
        }
        const body = (await response.json()) as WeatherData;
        if (!isCancelled) {
          setData(body);
          setHasError(false);
        }
      } catch {
        if (!isCancelled) {
          setHasError(true);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    load();
    const intervalId = setInterval(load, REFRESH_INTERVAL_MS);

    return () => {
      isCancelled = true;
      clearInterval(intervalId);
    };
  }, []);

  return { data, isLoading, hasError };
}
