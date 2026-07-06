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

    await directory.selectCategory("Plumbing");

    await expect(page).toHaveURL(/category=plumbing/);
    await expect(directory.businessCards).toHaveCount(1);
    await expect(page.getByText("ABC Plumbing")).toBeVisible();
  });

  test("sorting changes the order of results", async ({ page }) => {
    const directory = new DirectoryPage(page);
    await directory.goto();

    await directory.selectSort("Name A–Z");

    await expect(page).toHaveURL(/sort=name/);
    const firstCardHeading = page.locator('[data-slot="card-title"]').first();
    await expect(firstCardHeading).toHaveText("ABC Plumbing");
  });

  test("pagination moves between pages and disables at the edges", async ({ page }) => {
    const directory = new DirectoryPage(page);
    await directory.goto();

    await expect(page.getByText("Page 1 of 2")).toBeVisible();
    await expect(page.getByText("Previous")).toHaveAttribute("aria-disabled", "true");

    await directory.pagination.getByRole("link", { name: /next/i }).click();

    await expect(page).toHaveURL(/page=2/);
    await expect(page.getByText("Page 2 of 2")).toBeVisible();
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
    await directory.goto("/category/plumbing");

    await expect(page.getByRole("heading", { name: "Plumbing", level: 1 })).toBeVisible();
    await expect(directory.businessCards).toHaveCount(1);
    await expect(page.getByText("ABC Plumbing")).toBeVisible();
    await expect(directory.categoryFilters).toHaveCount(0);
  });

  test("an invalid category slug returns a real 404", async ({ page }) => {
    const response = await page.goto("/category/nonexistent-category");

    expect(response?.status()).toBe(404);
  });

  test("a category with no businesses yet shows the empty state, not a blank page", async ({
    page,
  }) => {
    const directory = new DirectoryPage(page);
    await directory.goto("/category/fitness-wellness");

    await expect(page.getByRole("heading", { name: "No businesses found" })).toBeVisible();
    await expect(directory.businessCards).toHaveCount(0);
  });
});
