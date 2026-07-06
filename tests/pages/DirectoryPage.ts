import type { Locator, Page } from "@playwright/test";

/** Page Object Model for /businesses and /category/[slug]. */
export class DirectoryPage {
  readonly page: Page;
  readonly categoryFilters: Locator;
  readonly sortControl: Locator;
  readonly pagination: Locator;
  readonly businessCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.categoryFilters = page.getByRole("group", { name: "Filter by category" });
    this.sortControl = page.getByRole("group", { name: "Sort businesses" });
    this.pagination = page.getByRole("navigation", { name: "Pagination" });
    this.businessCards = page.getByRole("link", { name: "View details" });
  }

  async goto(path: string = "/businesses") {
    await this.page.goto(path);
  }

  async selectCategory(name: string) {
    await this.categoryFilters.getByRole("link", { name, exact: true }).click();
  }

  async selectSort(name: string) {
    await this.sortControl.getByRole("link", { name }).click();
  }
}
