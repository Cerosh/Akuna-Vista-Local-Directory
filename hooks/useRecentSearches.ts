"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "akuna-vista:recent-searches";
const MAX_RECENT_SEARCHES = 5;

/**
 * Optional, low-priority feature (see sprints/sprint-05-search). Recent
 * searches are stored in localStorage only — if it's unavailable
 * (private browsing, storage disabled), searches simply won't persist;
 * this is not a functional requirement of the search feature itself.
 */
export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch {
      // Ignore read failures.
    }
  }, []);

  const addRecentSearch = useCallback((query: string) => {
    const trimmed = query.trim();
    if (!trimmed) {
      return;
    }

    setRecentSearches((previous) => {
      const next = [
        trimmed,
        ...previous.filter((item) => item.toLowerCase() !== trimmed.toLowerCase()),
      ].slice(0, MAX_RECENT_SEARCHES);

      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore write failures.
      }

      return next;
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore.
    }
  }, []);

  return { recentSearches, addRecentSearch, clearRecentSearches };
}
