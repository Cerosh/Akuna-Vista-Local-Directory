"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/cards/CategoryCard";
import type { Category } from "@/types/category";

interface CategoryCarouselProps {
  categories: Category[];
}

/**
 * Horizontal scroll-snap carousel (Sprint 16 F-018), replacing the old
 * curated-`featured` grid now that all 21 categories need to be reachable.
 * Deliberately not hover-triggered auto-scroll (rejected in the spec) —
 * real native overflow scrolling (trackpad/touch/drag) plus two always-
 * visible, keyboard-focusable arrow buttons.
 */
export function CategoryCarousel({ categories }: CategoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  // Defaults to disabled (fails toward "nothing to scroll to") rather than
  // enabled, so a brief pre-measurement paint never shows a clickable arrow
  // that turns out to go nowhere.
  const [atEnd, setAtEnd] = useState(true);

  const updateEdges = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 0);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  };

  useEffect(() => {
    updateEdges();
    // A single mount-time measurement isn't reliable — `scrollWidth` can
    // still be settling (icons/webfonts loading, layout not yet final)
    // when this first runs, which can under-measure it down to
    // `clientWidth` and wrongly disable the right button before any real
    // scrolling has happened. Once disabled, a native `disabled` button
    // can't fire the `scroll` event `updateEdges` otherwise relies on to
    // ever correct itself — a permanent stuck state, not a transient one.
    // ResizeObserver re-measures on every real size change instead.
    //
    // Observing `el` alone only catches changes to the scroll container's
    // own box — not a child growing/shrinking in a way that changes
    // `scrollWidth` without changing `el`'s own size (which is exactly what
    // "content still settling" means). Also observing the last card catches
    // that case too.
    const el = scrollRef.current;
    if (!el) return;
    const observer = new ResizeObserver(updateEdges);
    observer.observe(el);
    if (el.lastElementChild) observer.observe(el.lastElementChild);
    window.addEventListener("resize", updateEdges);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  // Jumps to the exact offsetLeft of the next/previous card, using instant
  // (not "smooth") scrolling — verified directly (2026-07-31) that Chrome
  // silently drops a `behavior: "smooth"` programmatic scroll on a
  // `scroll-snap-type: mandatory` container once the user has made any
  // real scroll gesture on it (reproduced with scrollTo, scrollBy, and
  // scrollIntoView alike; temporarily disabling snap during the call didn't
  // help either — every real click after the first one silently did
  // nothing). Native trackpad/touch/drag scrolling is unaffected and stays
  // smooth via the browser's own momentum; only the button-triggered jump
  // is instant.
  function scroll(direction: 1 | -1) {
    const el = scrollRef.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    const currentLeft = el.scrollLeft;
    let target: HTMLElement | undefined;
    if (direction === 1) {
      target = items.find((item) => item.offsetLeft > currentLeft + 1);
    } else {
      target = [...items].reverse().find((item) => item.offsetLeft < currentLeft - 1);
    }
    target?.scrollIntoView({ inline: "start", block: "nearest" });
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        onScroll={updateEdges}
        tabIndex={0}
        role="list"
        aria-label="Categories"
        // `relative` makes this row its own children's `offsetParent`, so
        // `item.offsetLeft` in scroll() below is measured in the same frame
        // as `el.scrollLeft` by construction — not by relying on the outer
        // wrapper happening to have zero padding/border between it and here.
        className="scrollbar-hide focus-visible:ring-ring/50 relative flex snap-x snap-mandatory gap-4 overflow-x-auto rounded-lg outline-none focus-visible:ring-3"
      >
        {categories.map((category) => (
          <div
            key={category.id}
            role="listitem"
            className="w-[42%] shrink-0 snap-start sm:w-[220px]"
          >
            <CategoryCard category={category} />
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => scroll(-1)}
        disabled={atStart}
        // Stays focusable/tabbable at the boundary instead of being dropped
        // from the DOM's disabled state, which would otherwise blur it and
        // strand keyboard focus outside the carousel. Base UI renders this
        // as `aria-disabled` (styled below) instead of the native `disabled`
        // attribute, and already no-ops the click/keydown handlers itself.
        focusableWhenDisabled
        aria-label="Scroll categories left"
        className="bg-background absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-sm aria-disabled:pointer-events-none aria-disabled:opacity-50"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
      </Button>

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => scroll(1)}
        disabled={atEnd}
        focusableWhenDisabled
        aria-label="Scroll categories right"
        className="bg-background absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 rounded-full shadow-sm aria-disabled:pointer-events-none aria-disabled:opacity-50"
      >
        <ChevronRight className="size-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
