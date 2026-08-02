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

      {/*
       * F-027: the visible circle stays 32px at its original position, but
       * the actual <button> hit area grows to 44px (WCAG 2.5.5 minimum
       * touch target) via a transparent outer button wrapping a
       * visually-identical inner span, rather than growing the button
       * variant itself — a global size bump would also enlarge every other
       * `size="icon"` consumer, and would grow the *visible* circle here
       * too, which the project owner explicitly didn't want.
       *
       * The extra 12px grows inward (toward the row) only, not outward: the
       * outer box keeps the same fixed -16px/+16px translate the old 32px
       * button used (rather than a width-proportional -1/2 translate) so
       * its outward edge doesn't move past the Container's own 16px mobile
       * padding — growing outward too pushed the button 6px past the
       * viewport edge and broke the no-horizontal-overflow test. The inner
       * circle is flush against the box's outward edge (justify-start here,
       * justify-end on the right button) instead of centered in it, so it
       * lands at the exact same pixel position as before.
       */}
      <Button
        type="button"
        variant="ghost"
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
        className="group absolute top-1/2 left-0 flex size-11 -translate-x-4 -translate-y-1/2 items-center justify-start rounded-full bg-transparent hover:bg-transparent focus-visible:border-transparent focus-visible:ring-0 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:hover:bg-transparent"
      >
        <span
          aria-hidden="true"
          // The focus-visible ring lives here (via `group-focus-visible:`),
          // not on the outer `Button`, since the outer box is the 44px hit
          // area (asymmetric, grown inward-only) — a ring drawn around that
          // would be oversized and visibly off-center from this visible
          // circle. `border-ring`/`ring-3`/`ring-ring/50` mirror
          // button.tsx's own base focus-visible styling.
          className="border-border bg-background group-hover:bg-muted group-focus-visible:border-ring group-focus-visible:ring-ring/50 dark:border-input dark:bg-input/30 dark:group-hover:bg-input/50 flex size-8 items-center justify-center rounded-full border shadow-sm transition-colors group-focus-visible:ring-3 group-active:translate-y-px"
        >
          <ChevronLeft className="size-4" />
        </span>
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => scroll(1)}
        disabled={atEnd}
        focusableWhenDisabled
        aria-label="Scroll categories right"
        className="group absolute top-1/2 right-0 flex size-11 translate-x-4 -translate-y-1/2 items-center justify-end rounded-full bg-transparent hover:bg-transparent focus-visible:border-transparent focus-visible:ring-0 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:hover:bg-transparent"
      >
        <span
          aria-hidden="true"
          className="border-border bg-background group-hover:bg-muted group-focus-visible:border-ring group-focus-visible:ring-ring/50 dark:border-input dark:bg-input/30 dark:group-hover:bg-input/50 flex size-8 items-center justify-center rounded-full border shadow-sm transition-colors group-focus-visible:ring-3 group-active:translate-y-px"
        >
          <ChevronRight className="size-4" />
        </span>
      </Button>
    </div>
  );
}
