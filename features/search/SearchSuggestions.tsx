"use client";

import { cn } from "@/lib/utils";
import type { SearchSuggestion } from "@/lib/services/searchService";

interface SearchSuggestionsProps {
  id: string;
  suggestions: SearchSuggestion[];
  highlightedIndex: number;
  onSelect: (suggestion: SearchSuggestion) => void;
  onHighlight: (index: number) => void;
}

const TYPE_LABELS: Record<SearchSuggestion["type"], string> = {
  business: "Business",
  category: "Category",
  suburb: "Suburb",
};

export function SearchSuggestions({
  id,
  suggestions,
  highlightedIndex,
  onSelect,
  onHighlight,
}: SearchSuggestionsProps) {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <ul
      id={id}
      role="listbox"
      aria-label="Search suggestions"
      className="border-border bg-popover absolute z-10 mt-1 w-full overflow-hidden rounded-lg border shadow-md"
    >
      {suggestions.map((suggestion, index) => (
        <li
          key={`${suggestion.type}-${suggestion.label}`}
          id={`${id}-option-${index}`}
          role="option"
          aria-selected={index === highlightedIndex}
          onMouseEnter={() => onHighlight(index)}
          // onMouseDown (not onClick) so this fires before the input's onBlur
          // closes the listbox.
          onMouseDown={(event) => {
            event.preventDefault();
            onSelect(suggestion);
          }}
          className={cn(
            "flex cursor-pointer items-center justify-between px-3 py-2 text-sm",
            index === highlightedIndex ? "bg-muted" : "",
          )}
        >
          <span className="text-foreground">{suggestion.label}</span>
          <span className="text-muted-foreground text-xs">{TYPE_LABELS[suggestion.type]}</span>
        </li>
      ))}
    </ul>
  );
}
