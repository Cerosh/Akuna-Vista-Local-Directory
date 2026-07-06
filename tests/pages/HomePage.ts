import type { Locator, Page } from "@playwright/test";

/**
 * Page Object Model for the homepage shell (nav, footer, placeholder
 * content). Locators prefer role/label per TESTING.md's Locator Strategy.
 */
export class HomePage {
  readonly page: Page;
  readonly primaryNav: Locator;
  readonly mobileMenuButton: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.primaryNav = page.getByRole("navigation", { name: "Primary" });
    this.mobileMenuButton = page.getByRole("button", { name: /open menu/i });
    this.footer = page.locator("footer");
  }

  async goto() {
    await this.page.goto("/");
  }

  async openMobileMenu() {
    await this.mobileMenuButton.click();
  }
}
