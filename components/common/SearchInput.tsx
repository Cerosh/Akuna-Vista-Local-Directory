import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
}

/**
 * Presentational search field only — no query handling yet.
 * Real search behaviour is introduced in Sprint 5 (Search); this
 * component exists now so the visual language is consistent wherever
 * a search entry point appears.
 */
export function SearchInput({ placeholder = "Search businesses…", className }: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <Search
        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
        aria-hidden="true"
      />
      <Input
        type="search"
        placeholder={placeholder}
        aria-label="Search businesses"
        className="pl-9"
      />
    </div>
  );
}
