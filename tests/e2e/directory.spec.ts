import { expect, test } from "@playwright/test";
import { DirectoryPage } from "../pages/DirectoryPage";

test.describe("Business Directory (/businesses)", () => {
  test("loads and displays a grid of business cards", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });

    const directory = new DirectoryPage(page);
    await directory.goto();

    await expect(directory.categoryFilters).toBeVisible();
    await expect(directory.sortControl).toBeVisible();
    await expect(directory.businessCards.first()).toBeVisible();
    expect(consoleErrors).toEqual([]);
  });

  test("selecting a category filter updates the grid and the URL", async ({ page }) => {
    const directory = new DirectoryPage(page);
    await directory.goto();

    await directory.selectCategory("Roofing");

    await expect(page).toHaveURL(/category=roofing/);
    await expect(directory.businessCards).toHaveCount(1);
    await expect(page.getByText("Brar Roofing Solution")).toBeVisible();
  });

  test("sorting changes the order of results", async ({ page }) => {
    const directory = new DirectoryPage(page);
    await directory.goto();

    await directory.selectSort("Name A–Z");

    await expect(page).toHaveURL(/sort=name/);
    const firstCardHeading = page.locator('[data-slot="card-title"]').first();
    // "Allan's TV Wall Mounting" sorts first alphabetically among the
    // current real business dataset.
    await expect(firstCardHeading).toHaveText("Allan's TV Wall Mounting");
  });

  test("pagination moves between pages and disables at the edges", async ({ page }) => {
    const directory = new DirectoryPage(page);
    await directory.goto();

    await expect(page.getByText("Page 1 of 3")).toBeVisible();
    await expect(page.getByText("Previous")).toHaveAttribute("aria-disabled", "true");

    await directory.pagination.getByRole("link", { name: /next/i }).click();
    await expect(page).toHaveURL(/page=2/);
    await expect(page.getByText("Page 2 of 3")).toBeVisible();

    await directory.pagination.getByRole("link", { name: /next/i }).click();
    await expect(page).toHaveURL(/page=3/);
    await expect(page.getByText("Page 3 of 3")).toBeVisible();
    await expect(page.getByText("Next")).toHaveAttribute("aria-disabled", "true");
  });

  test("changing category resets pagination to page 1", async ({ page }) => {
    const directory = new DirectoryPage(page);
    await directory.goto("/businesses?page=2");

    await directory.selectCategory("Electrical");

    await expect(page).toHaveURL(/category=electrical/);
    await expect(page).not.toHaveURL(/page=2/);
  });
});

test.describe("Category pages (/category/[slug])", () => {
  test("renders only businesses in that category", async ({ page }) => {
    const directory = new DirectoryPage(page);
    await directory.goto("/category/roofing");

    await expect(page.getByRole("heading", { name: "Roofing", level: 1 })).toBeVisible();
    await expect(directory.businessCards).toHaveCount(1);
    await expect(page.getByText("Brar Roofing Solution")).toBeVisible();
    await expect(directory.categoryFilters).toHaveCount(0);
  });

  test("an invalid category slug returns a real 404", async ({ page }) => {
    const response = await page.goto("/category/nonexistent-category");

    expect(response?.status()).toBe(404);
  });

  // The "category exists but has zero real businesses" scenario this test
  // used to cover ("childcare") no longer has a real-data example — the
  // project owner had that and 5 other zero-business placeholder categories
  // deleted outright (2026-07-14) rather than kept empty. The underlying
  // behaviour is still covered: businessRepository.test.ts's "returns zero
  // results gracefully" for the data layer, and search.spec.ts's "a query
  // with no matches shows the empty state, not a blank page" for the exact
  // same EmptyState UI pattern. Not re-added here to avoid fabricating an
  // empty category just for test coverage.
});
