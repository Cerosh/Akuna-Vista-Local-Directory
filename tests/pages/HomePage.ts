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
  readonly transitWidgetHeading: Locator;
  readonly popularCategoriesHeading: Locator;
  readonly categoryList: Locator;
  readonly categoryItems: Locator;
  readonly categoriesScrollLeftButton: Locator;
  readonly categoriesScrollRightButton: Locator;
  readonly featuredBusinessesHeading: Locator;
  readonly communityStatisticsHeading: Locator;
  readonly whyChooseLocalHeading: Locator;
  readonly communitySpotlightHeading: Locator;
  readonly featuredContentHeading: Locator;
  readonly communityEventsHeading: Locator;
  readonly promotionsHeading: Locator;
  readonly announcementsHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.primaryNav = page.getByRole("navigation", { name: "Primary" });
    this.mobileMenuButton = page.getByRole("button", { name: /open menu/i });
    this.footer = page.locator("footer");
    this.searchInput = page.getByRole("searchbox", { name: "Search businesses" });
    // TransitWidget's "Getting around" title is a Card title (styled div,
    // not a heading element) — same convention as every other Card-based
    // component in this app (BusinessCard, PromotionCard, etc), so this
    // is a text locator, not getByRole("heading").
    this.transitWidgetHeading = page.getByText("Getting around", { exact: true });
    this.popularCategoriesHeading = page.getByRole("heading", { name: "Popular categories" });
    this.categoryList = page.getByRole("list", { name: "Categories" });
    this.categoryItems = this.categoryList.getByRole("listitem");
    this.categoriesScrollLeftButton = page.getByRole("button", { name: "Scroll categories left" });
    this.categoriesScrollRightButton = page.getByRole("button", {
      name: "Scroll categories right",
    });
    this.featuredBusinessesHeading = page.getByRole("heading", { name: "Featured businesses" });
    this.communityStatisticsHeading = page.getByRole("heading", { name: "A growing community" });
    this.whyChooseLocalHeading = page.getByRole("heading", { name: "Why choose local" });
    this.communitySpotlightHeading = page.getByRole("heading", { name: "Community spotlight" });
    this.featuredContentHeading = page.getByRole("heading", { name: "Featured this week" });
    this.communityEventsHeading = page.getByRole("heading", { name: "Community events" });
    this.promotionsHeading = page.getByRole("heading", {
      name: "Akuna Vista residents-only promotions",
    });
    this.announcementsHeading = page.getByRole("heading", { name: "Community noticeboard" });
  }

  async goto() {
    await this.page.goto("/");
  }

  async openMobileMenu() {
    await this.mobileMenuButton.click();
  }
}
