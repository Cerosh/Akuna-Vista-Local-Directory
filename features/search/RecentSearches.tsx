"use client";

import { Badge } from "@/components/ui/badge";

interface RecentSearchesProps {
  searches: string[];
  onSelect: (query: string) => void;
  onClear: () => void;
}

/** Optional feature (Sprint 5) — shown only when previous searches exist. */
export function RecentSearches({ searches, onSelect, onClear }: RecentSearchesProps) {
  if (searches.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-sm font-medium">Recent searches</span>
        <button
          type="button"
          onClick={onClear}
          className="text-muted-foreground text-xs underline-offset-4 hover:underline"
        >
          Clear
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {searches.map((search) => (
          <button key={search} type="button" onClick={() => onSelect(search)}>
            <Badge variant="outline" className="hover:bg-muted cursor-pointer">
              {search}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  );
}
