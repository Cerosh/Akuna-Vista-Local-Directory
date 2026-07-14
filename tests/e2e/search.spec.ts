import { expect, test } from "@playwright/test";
import { SearchPage } from "../pages/SearchPage";
import { HomePage } from "../pages/HomePage";

test.describe("Search (/search)", () => {
  test("homepage search form submits to /search with the query", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await page.getByRole("searchbox", { name: "Search businesses" }).fill("roofing");
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page).toHaveURL(/\/search\?q=roofing/);
  });

  test("loads with filter chips and no console errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });

    const search = new SearchPage(page);
    await search.goto();

    await expect(search.input).toBeVisible();
    await expect(search.categoryChip("Roofing")).toBeVisible();
    await expect(search.categoryChip("Schofields")).toBeVisible();
    expect(consoleErrors).toEqual([]);
  });

  test("typing filters results instantly and shows suggestions", async ({ page }) => {
    const search = new SearchPage(page);
    await search.goto();

    await search.input.fill("roof");

    await expect(page.getByRole("listbox", { name: "Search suggestions" })).toBeVisible();
    await expect(page.getByRole("option", { name: /Brar Roofing Solution/ })).toBeVisible();
    await expect(search.businessCards).toHaveCount(1);
  });

  // The accent-folding regression this test used to cover end-to-end
  // ("cafe" -> "The Local Grind Café") no longer has a matching business in
  // the real dataset (Sprint 08b content update) — the underlying behaviour
  // is still fully covered by the fast, data-independent unit test in
  // lib/services/searchService.test.ts ("matches an unaccented query
  // against accented data, and vice versa"). Not re-added here to avoid
  // fabricating an accented business name just for test coverage; will
  // return naturally once real accented business content exists.

  test("selecting a suggestion via keyboard updates the query and results", async ({ page }) => {
    const search = new SearchPage(page);
    await search.goto();

    await search.input.fill("roof");
    await search.input.press("ArrowDown");
    await search.input.press("Enter");

    await expect(search.input).toHaveValue("Brar Roofing Solution");
    await expect(search.businessCards).toHaveCount(1);
  });

  test("category filter chip narrows results and toggles off", async ({ page }) => {
    const search = new SearchPage(page);
    await search.goto();

    await search.categoryChip("Roofing").click();
    await expect(search.businessCards).toHaveCount(1);
    await expect(page.getByText("Brar Roofing Solution")).toBeVisible();

    await search.categoryChip("Roofing").click();
    await expect(search.businessCards).toHaveCount(0);
  });

  test("suburb filter chip matches address and service areas", async ({ page }) => {
    const search = new SearchPage(page);
    await search.goto();

    await search.categoryChip("Schofields").click();

    const count = await search.businessCards.count();
    expect(count).toBeGreaterThan(1);
  });

  test("a category or suburb chip with zero real businesses does not render", async ({ page }) => {
    // Sprint 09b F-001: chips are computed from real content, not every
    // categories.json/suburbs.json entry — Plumbing and Tallawong currently
    // have zero matching businesses.
    const search = new SearchPage(page);
    await search.goto();

    await expect(search.categoryChip("Plumbing")).toHaveCount(0);
    await expect(search.categoryChip("Tallawong")).toHaveCount(0);
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

    await search.input.fill("roof");
    await expect(page.getByRole("listbox", { name: "Search suggestions" })).toBeVisible();

    await search.input.press("Escape");
    await expect(page.getByRole("listbox", { name: "Search suggestions" })).toBeHidden();
  });
});
