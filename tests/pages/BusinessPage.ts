import type { Locator, Page } from "@playwright/test";

/** Page Object Model for /business/[slug]. */
export class BusinessPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly shareButton: Locator;
  readonly jsonLd: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { level: 1 });
    this.shareButton = page.getByRole("button", { name: /share/i });
    this.jsonLd = page.locator('script[type="application/ld+json"]');
  }

  async goto(slug: string) {
    await this.page.goto(`/business/${slug}`);
  }
}
