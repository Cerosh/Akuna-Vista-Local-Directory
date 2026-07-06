"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { SearchInput } from "@/components/common/SearchInput";
import { BusinessCard } from "@/components/cards/BusinessCard";
import { EmptyState } from "@/components/common/EmptyState";
import { Badge } from "@/components/ui/badge";
import { SearchSuggestions } from "@/features/search/SearchSuggestions";
import { RecentSearches } from "@/features/search/RecentSearches";
import { useRecentSearches } from "@/hooks/useRecentSearches";
import { getSearchSuggestions, searchBusinesses } from "@/lib/services/searchService";
import { withSearchParams } from "@/lib/utils/searchParams";
import type { SearchSuggestion } from "@/lib/services/searchService";
import type { Business } from "@/types/business";
import type { Category } from "@/types/category";
import type { Suburb } from "@/types/suburb";

const SUGGESTIONS_LISTBOX_ID = "search-suggestions-listbox";

interface SearchExperienceProps {
  businesses: Business[];
  categories: Category[];
  suburbs: Suburb[];
  initialQuery: string;
  initialCategoryId?: string;
  initialSuburb?: string;
}

export function SearchExperience({
  businesses,
  categories,
  suburbs,
  initialQuery,
  initialCategoryId,
  initialSuburb,
}: SearchExperienceProps) {
  const [query, setQuery] = useState(initialQuery);
  const [categoryId, setCategoryId] = useState<string | undefined>(initialCategoryId);
  const [suburb, setSuburb] = useState<string | undefined>(initialSuburb);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const { recentSearches, addRecentSearch, clearRecentSearches } = useRecentSearches();
  const isFirstRender = useRef(true);

  // Deferring the query lets React keep the input responsive even if
  // filtering ever gets more expensive (larger dataset, fuzzy matching) —
  // at today's scale it's imperceptible, but the pattern is what keeps
  // this "instant feeling" as the architecture is meant to evolve.
  const deferredQuery = useDeferredValue(query);

  const categoryNameById = useMemo(
    () => new Map(categories.map((category) => [category.id, category.name])),
    [categories],
  );

  const suggestions: SearchSuggestion[] = useMemo(
    () => getSearchSuggestions(businesses, categories, suburbs, query),
    [businesses, categories, suburbs, query],
  );

  const results = useMemo(
    () => searchBusinesses(businesses, categories, { query: deferredQuery, categoryId, suburb }),
    [businesses, categories, deferredQuery, categoryId, suburb],
  );

  const hasActiveSearch = Boolean(query.trim() || categoryId || suburb);

  // Keep the URL shareable/bookmarkable without forcing a server
  // round-trip on every keystroke (this is client-side search — see
  // ARCHITECTURE.md's Search Architecture).
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const url = withSearchParams(
      "/search",
      {},
      { q: query || undefined, category: categoryId, suburb },
    );
    window.history.replaceState(null, "", url);
  }, [query, categoryId, suburb]);

  function commitSearch(value: string) {
    setQuery(value);
    setIsSuggestionsOpen(false);
    setHighlightedIndex(-1);
    addRecentSearch(value);
  }

  function handleSelectSuggestion(suggestion: SearchSuggestion) {
    if (suggestion.type === "category") {
      const category = categories.find((c) => c.name === suggestion.label);
      setCategoryId(category?.id);
      setQuery("");
    } else if (suggestion.type === "suburb") {
      setSuburb(suggestion.label);
      setQuery("");
    } else {
      commitSearch(suggestion.label);
      return;
    }
    setIsSuggestionsOpen(false);
    setHighlightedIndex(-1);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (suggestions.length === 0) {
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((index) => Math.min(index + 1, suggestions.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((index) => Math.max(index - 1, -1));
    } else if (event.key === "Enter") {
      if (highlightedIndex >= 0) {
        event.preventDefault();
        handleSelectSuggestion(suggestions[highlightedIndex]);
      } else {
        commitSearch(query);
      }
    } else if (event.key === "Escape") {
      setIsSuggestionsOpen(false);
      setHighlightedIndex(-1);
    }
  }

  function toggleCategory(id: string) {
    setCategoryId((current) => (current === id ? undefined : id));
  }

  function toggleSuburb(name: string) {
    setSuburb((current) => (current === name ? undefined : name));
  }

  const showSuggestions = isSuggestionsOpen && suggestions.length > 0;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="relative max-w-[480px]">
          <SearchInput
            role="combobox"
            aria-expanded={showSuggestions}
            aria-controls={SUGGESTIONS_LISTBOX_ID}
            aria-activedescendant={
              highlightedIndex >= 0
                ? `${SUGGESTIONS_LISTBOX_ID}-option-${highlightedIndex}`
                : undefined
            }
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setIsSuggestionsOpen(true);
              setHighlightedIndex(-1);
            }}
            onFocus={() => setIsSuggestionsOpen(true)}
            onBlur={() => setIsSuggestionsOpen(false)}
            onKeyDown={handleKeyDown}
          />
          {showSuggestions ? (
            <SearchSuggestions
              id={SUGGESTIONS_LISTBOX_ID}
              suggestions={suggestions}
              highlightedIndex={highlightedIndex}
              onSelect={handleSelectSuggestion}
              onHighlight={setHighlightedIndex}
            />
          ) : null}
        </div>

        {!hasActiveSearch ? (
          <RecentSearches
            searches={recentSearches}
            onSelect={commitSearch}
            onClear={clearRecentSearches}
          />
        ) : null}

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button key={category.id} type="button" onClick={() => toggleCategory(category.id)}>
              <Badge variant={categoryId === category.id ? "default" : "outline"}>
                {category.name}
              </Badge>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {suburbs.map((s) => (
            <button key={s.id} type="button" onClick={() => toggleSuburb(s.name)}>
              <Badge variant={suburb === s.name ? "default" : "outline"}>{s.name}</Badge>
            </button>
          ))}
        </div>
      </div>

      <div aria-live="polite" className="sr-only">
        {hasActiveSearch ? `${results.length} businesses found` : ""}
      </div>

      {hasActiveSearch && results.length === 0 ? (
        <EmptyState
          title="No businesses found"
          description="Try a different keyword, category or suburb — or browse the full directory instead."
          action={{ label: "Browse all businesses", href: "/businesses" }}
        />
      ) : hasActiveSearch ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((business) => (
            <BusinessCard
              key={business.id}
              business={business}
              categoryName={categoryNameById.get(business.categoryId)}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">
          Start typing, or choose a category or suburb, to find local businesses.
        </p>
      )}
    </div>
  );
}
