import type { Locator, Page } from "@playwright/test";

/** Page Object Model for /search. */
export class SearchPage {
  readonly page: Page;
  readonly input: Locator;
  readonly businessCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.input = page.getByRole("combobox", { name: "Search businesses" });
    this.businessCards = page.getByRole("link", { name: "View details" });
  }

  async goto(query?: string) {
    await this.page.goto(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
  }

  categoryChip(name: string) {
    return this.page.getByRole("button", { name, exact: true });
  }
}
