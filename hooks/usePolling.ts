"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_TIMEOUT_MS = 8000;

interface PollingState<T> {
  data: T | null;
  isLoading: boolean;
  /** True when the most recent poll failed. `data` (if already populated
   *  from an earlier successful poll) is deliberately left in place rather
   *  than cleared, so a transient refresh failure doesn't blank a still-
   *  valid reading — callers should only treat this as a hard failure when
   *  `data` is also null. */
  hasError: boolean;
}

interface UsePollingOptions<T> {
  timeoutMs?: number;
  /** Seeds `data` from an already-fetched value (e.g. a server-fetched
   *  initial render) so the hook starts in a loaded state — and skips its
   *  first fetch-on-mount, since that data is already fresh — instead of a
   *  guaranteed loading flash before the first client-side poll. */
  initialData?: T | null;
}

/**
 * Shared fetch/poll/cancel/loading/error state machine for this app's
 * same-origin live-data proxy routes (weather, parking, train departures) —
 * previously duplicated across useWeather.ts, useTrainDepartures.ts, and
 * useParkingAvailability.ts (sprint-14 F-019). Each of those keeps its own
 * public return shape; this hook only owns the request/poll mechanics.
 */
export function usePolling<T>(
  url: string,
  intervalMs: number,
  options: UsePollingOptions<T> = {},
): PollingState<T> {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, initialData = null } = options;
  const [data, setData] = useState<T | null>(initialData);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(initialData === null);
  // Captured once on mount — used only to skip the redundant immediate
  // fetch when the caller already seeded fresh server-fetched data.
  const hadInitialDataRef = useRef(initialData !== null);

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      try {
        const response = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) });
        if (!response.ok) {
          throw new Error(`Unexpected status ${response.status}`);
        }
        const body = (await response.json()) as T;
        if (!isCancelled) {
          setData(body);
          setHasError(false);
        }
      } catch (error) {
        console.error(`Failed to fetch ${url}:`, error);
        if (!isCancelled) {
          setHasError(true);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    if (!hadInitialDataRef.current) {
      load();
    }
    const intervalId = setInterval(load, intervalMs);

    return () => {
      isCancelled = true;
      clearInterval(intervalId);
    };
  }, [url, intervalMs, timeoutMs]);

  return { data, isLoading, hasError };
}
