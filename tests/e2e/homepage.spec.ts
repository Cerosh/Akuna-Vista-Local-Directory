import { expect, test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test.describe("Homepage", () => {
  test("loads with navigation and footer, no console errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    const home = new HomePage(page);
    await home.goto();

    await expect(page).toHaveTitle(/Akuna Vista Local Directory/);
    await expect(home.primaryNav).toBeVisible();
    await expect(home.footer).toBeVisible();
    expect(consoleErrors).toEqual([]);
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
