import { expect, test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test.describe("Homepage", () => {
  test("loads with all sections, navigation and footer, no console errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    const home = new HomePage(page);
    await home.goto();

    await expect(page).toHaveTitle(/Akuna Vista Local Directory/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(home.primaryNav).toBeVisible();
    await expect(home.searchInput).toBeVisible();
    await expect(home.popularCategoriesHeading).toBeVisible();
    await expect(home.featuredBusinessesHeading).toBeVisible();
    await expect(home.communityStatisticsHeading).toBeVisible();
    await expect(home.whyChooseLocalHeading).toBeVisible();
    await expect(home.footer).toBeVisible();
    expect(consoleErrors).toEqual([]);
  });

  test("search input accepts a query", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await home.searchInput.fill("plumber");
    await expect(home.searchInput).toHaveValue("plumber");
  });

  test("Categories nav link scrolls to the Popular Categories section", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await home.primaryNav.getByRole("link", { name: "Categories" }).click();
    await expect(page).toHaveURL(/#categories$/);
    await expect(home.popularCategoriesHeading).toBeInViewport();
  });

  test("a featured business card links to a real, working detail page", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    const firstCard = page.getByRole("link", { name: "View details" }).first();
    await expect(firstCard).toHaveAttribute("href", /^\/business\//);

    await firstCard.click();

    await expect(page).toHaveURL(/\/business\//);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("mobile navigation drawer opens and closes", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 700 });
    const home = new HomePage(page);
    await home.goto();

    await expect(home.mobileMenuButton).toBeVisible();
    await home.openMobileMenu();

    const mobileNav = page.getByRole("navigation", { name: "Mobile" });
    await expect(mobileNav).toBeVisible();
    await expect(mobileNav.getByRole("link", { name: "Home" })).toBeVisible();

    await page.getByRole("button", { name: /close menu/i }).click();
    await expect(mobileNav).toBeHidden();
  });
});
