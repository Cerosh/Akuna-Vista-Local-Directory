"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { Container } from "@/components/common/Container";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
  /** False for routes not built yet — avoids prefetching pages that don't exist. */
  prefetch?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Directory", href: "/businesses" },
  { label: "Categories", href: "/#categories" },
  { label: "About", href: "/about", prefetch: false },
  { label: "Contact", href: "/contact", prefetch: false },
];

interface NavigationProps {
  siteName: string;
  logo: string;
}

export function Navigation({ siteName, logo }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-border bg-background/95 sticky top-0 z-40 border-b backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Logo siteName={siteName} logo={logo} />

          <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                prefetch={link.prefetch}
                className="text-muted-foreground duration-fast hover:text-foreground text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Plain Link styled as a button — this navigates, so it keeps
                native <a> (role="link") semantics rather than Button's
                role="button". */}
            <Link
              href="/search"
              aria-label="Search"
              className={buttonVariants({ variant: "ghost", size: "icon" })}
            >
              <Search className="size-5" aria-hidden="true" />
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </Container>

      <div
        id="mobile-navigation"
        className={cn("border-border border-t md:hidden", isMenuOpen ? "block" : "hidden")}
      >
        <Container>
          <nav aria-label="Mobile" className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                prefetch={link.prefetch}
                className="text-muted-foreground duration-fast hover:bg-muted hover:text-foreground rounded-md px-2 py-2 text-sm font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </Container>
      </div>
    </header>
  );
}
