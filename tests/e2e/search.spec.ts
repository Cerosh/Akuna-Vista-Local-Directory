import { expect, test } from "@playwright/test";
import { SearchPage } from "../pages/SearchPage";
import { HomePage } from "../pages/HomePage";

test.describe("Search (/search)", () => {
  test("homepage search form submits to /search with the query", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await page.getByRole("searchbox", { name: "Search businesses" }).fill("plumbing");
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page).toHaveURL(/\/search\?q=plumbing/);
  });

  test("loads with filter chips and no console errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });

    const search = new SearchPage(page);
    await search.goto();

    await expect(search.input).toBeVisible();
    await expect(search.categoryChip("Plumbing")).toBeVisible();
    await expect(search.categoryChip("Schofields")).toBeVisible();
    expect(consoleErrors).toEqual([]);
  });

  test("typing filters results instantly and shows suggestions", async ({ page }) => {
    const search = new SearchPage(page);
    await search.goto();

    await search.input.fill("plumb");

    await expect(page.getByRole("listbox", { name: "Search suggestions" })).toBeVisible();
    await expect(page.getByRole("option", { name: /ABC Plumbing/ })).toBeVisible();
    await expect(search.businessCards).toHaveCount(1);
  });

  test("matches an unaccented query against accented business data", async ({ page }) => {
    // Regression test — "cafe" must match "The Local Grind Café".
    const search = new SearchPage(page);
    await search.goto();

    await search.input.fill("cafe");

    await expect(search.businessCards).toHaveCount(1);
    await expect(
      page.locator('[data-slot="card-title"]', { hasText: "The Local Grind Café" }),
    ).toBeVisible();
  });

  test("selecting a suggestion via keyboard updates the query and results", async ({ page }) => {
    const search = new SearchPage(page);
    await search.goto();

    await search.input.fill("plumb");
    await search.input.press("ArrowDown");
    await search.input.press("Enter");

    await expect(search.input).toHaveValue("ABC Plumbing");
    await expect(search.businessCards).toHaveCount(1);
  });

  test("category filter chip narrows results and toggles off", async ({ page }) => {
    const search = new SearchPage(page);
    await search.goto();

    await search.categoryChip("Plumbing").click();
    await expect(search.businessCards).toHaveCount(1);
    await expect(page.getByText("ABC Plumbing")).toBeVisible();

    await search.categoryChip("Plumbing").click();
    await expect(search.businessCards).toHaveCount(0);
  });

  test("suburb filter chip matches address and service areas", async ({ page }) => {
    const search = new SearchPage(page);
    await search.goto();

    await search.categoryChip("The Ponds").click();

    const count = await search.businessCards.count();
    expect(count).toBeGreaterThan(1);
  });

  test("a query with no matches shows the empty state, not a blank page", async ({ page }) => {
    const search = new SearchPage(page);
    await search.goto();

    await search.input.fill("zzzznomatch");

    await expect(page.getByRole("heading", { name: "No businesses found" })).toBeVisible();
    await expect(search.businessCards).toHaveCount(0);
  });

  test("Escape closes the suggestions list", async ({ page }) => {
    const search = new SearchPage(page);
    await search.goto();

    await search.input.fill("plumb");
    await expect(page.getByRole("listbox", { name: "Search suggestions" })).toBeVisible();

    await search.input.press("Escape");
    await expect(page.getByRole("listbox", { name: "Search suggestions" })).toBeHidden();
  });
});
