import { expect, test, type Locator } from "@playwright/test";
import { SearchPage } from "../pages/SearchPage";
import { HomePage } from "../pages/HomePage";

// Filling an input right after goto() can race Next.js hydration: if the
// input event fires before React's onChange listener attaches, the value
// is lost (and a later hydration re-render can even reset the DOM value
// back to empty, since this is a controlled input). Retrying the whole
// fill+verify until it actually sticks removes the race instead of just
// tolerating it via Playwright `retries` (Sprint 16 F-003).
async function typeAndSettle(input: Locator, value: string) {
  await expect(async () => {
    await input.fill(value);
    await expect(input).toHaveValue(value);
  }).toPass({ timeout: 5000 });
}

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

    await typeAndSettle(search.input, "roof");

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

    await typeAndSettle(search.input, "roof");
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

  test("a suburb chip with zero real businesses does not render", async ({ page }) => {
    // Sprint 09b F-001: chips are computed from real content, not every
    // categories.json/suburbs.json entry — Tallawong currently has zero
    // matching businesses. The category half of this ("Plumbing" and 5
    // other zero-business categories) no longer has a real-data example
    // to test against — the project owner had those categories deleted
    // outright (2026-07-14) rather than kept empty, so every remaining
    // category now has ≥1 real business. The underlying filtering logic
    // is still fully covered by searchService.test.ts's synthetic-fixture
    // unit tests for categoriesWithBusinesses.
    const search = new SearchPage(page);
    await search.goto();

    await expect(search.categoryChip("Tallawong")).toHaveCount(0);
  });

  test("a query with no matches shows the empty state, not a blank page", async ({ page }) => {
    const search = new SearchPage(page);
    await search.goto();

    await typeAndSettle(search.input, "zzzznomatch");

    await expect(page.getByRole("heading", { name: "No businesses found" })).toBeVisible();
    await expect(search.businessCards).toHaveCount(0);
  });

  test("Escape closes the suggestions list", async ({ page }) => {
    const search = new SearchPage(page);
    await search.goto();

    await typeAndSettle(search.input, "roof");
    await expect(page.getByRole("listbox", { name: "Search suggestions" })).toBeVisible();

    await search.input.press("Escape");
    await expect(page.getByRole("listbox", { name: "Search suggestions" })).toBeHidden();
  });
});
