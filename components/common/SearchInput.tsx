import { forwardRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchInputProps = Omit<React.ComponentProps<typeof Input>, "type" | "className"> & {
  className?: string;
};

/**
 * Search field used both as an uncontrolled homepage form field (submits
 * to /search) and as a controlled, instant-filtering input on /search
 * itself (Sprint 5) — all other props (name, value, onChange, aria-*,
 * etc.) pass straight through to the underlying Input.
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { placeholder = "Search businesses…", className, ...props },
  ref,
) {
  return (
    <div className={cn("relative", className)}>
      <Search
        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
        aria-hidden="true"
      />
      <Input
        ref={ref}
        type="search"
        placeholder={placeholder}
        aria-label="Search businesses"
        autoComplete="off"
        className="pl-9"
        {...props}
      />
    </div>
  );
});
