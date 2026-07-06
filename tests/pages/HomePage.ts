import type { Locator, Page } from "@playwright/test";

/**
 * Page Object Model for the homepage (nav, footer, hero/search, and the
 * Sprint 2 content sections). Locators prefer role/label/heading text
 * per TESTING.md's Locator Strategy.
 */
export class HomePage {
  readonly page: Page;
  readonly primaryNav: Locator;
  readonly mobileMenuButton: Locator;
  readonly footer: Locator;
  readonly searchInput: Locator;
  readonly popularCategoriesHeading: Locator;
  readonly featuredBusinessesHeading: Locator;
  readonly communityStatisticsHeading: Locator;
  readonly whyChooseLocalHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.primaryNav = page.getByRole("navigation", { name: "Primary" });
    this.mobileMenuButton = page.getByRole("button", { name: /open menu/i });
    this.footer = page.locator("footer");
    this.searchInput = page.getByRole("searchbox", { name: "Search businesses" });
    this.popularCategoriesHeading = page.getByRole("heading", { name: "Popular categories" });
    this.featuredBusinessesHeading = page.getByRole("heading", { name: "Featured businesses" });
    this.communityStatisticsHeading = page.getByRole("heading", { name: "A growing community" });
    this.whyChooseLocalHeading = page.getByRole("heading", { name: "Why choose local" });
  }

  async goto() {
    await this.page.goto("/");
  }

  async openMobileMenu() {
    await this.mobileMenuButton.click();
  }
}
