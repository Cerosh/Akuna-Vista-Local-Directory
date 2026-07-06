import { expect, test } from "@playwright/test";
import { BusinessPage } from "../pages/BusinessPage";
import { DirectoryPage } from "../pages/DirectoryPage";

test.describe("Business Details (/business/[slug])", () => {
  test("clicking a card in the directory opens the correct business page", async ({ page }) => {
    const directory = new DirectoryPage(page);
    await directory.goto("/businesses");

    await directory.businessCards.first().click();

    await expect(page).toHaveURL(/\/business\//);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("renders contact links, opening hours, and no console errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });

    const business = new BusinessPage(page);
    await business.goto("abc-plumbing");

    await expect(business.heading).toHaveText("ABC Plumbing");
    await expect(page.getByRole("link", { name: "+61 400 111 222" })).toHaveAttribute(
      "href",
      "tel:+61 400 111 222",
    );
    await expect(page.getByRole("link", { name: "hello@abcplumbing.example" })).toHaveAttribute(
      "href",
      "mailto:hello@abcplumbing.example",
    );
    await expect(page.getByRole("heading", { name: "Opening Hours" })).toBeVisible();
    await expect(page.getByText("Closed")).toBeVisible();
    expect(consoleErrors).toEqual([]);
  });

  test("degrades gracefully when optional fields are missing", async ({ page }) => {
    const business = new BusinessPage(page);
    await business.goto("schofields-building-renovations");

    await expect(business.heading).toHaveText("Schofields Building & Renovations");
    // No website, no social links for this business — sections should not render.
    await expect(page.getByRole("heading", { name: "Follow" })).toHaveCount(0);
  });

  test("share button copies the page link to the clipboard", async ({
    page,
    context,
    browserName,
  }) => {
    // Playwright can only grant clipboard-read/clipboard-write permissions
    // in Chromium — Firefox and WebKit have no equivalent permission API,
    // found when Sprint 07 added cross-browser Playwright coverage. The
    // ShareButton feature itself is not Chromium-specific; only this
    // permission-mocking mechanism is.
    test.skip(browserName !== "chromium", "Clipboard permission grants are Chromium-only.");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    const business = new BusinessPage(page);
    await business.goto("abc-plumbing");

    await business.shareButton.click();

    await expect(page.getByRole("button", { name: "Link copied to clipboard" })).toBeVisible();
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain("/business/abc-plumbing");
  });

  test("includes valid LocalBusiness structured data", async ({ page }) => {
    const business = new BusinessPage(page);
    await business.goto("abc-plumbing");

    const jsonLdText = await business.jsonLd.textContent();
    const jsonLd = JSON.parse(jsonLdText ?? "{}");

    expect(jsonLd["@type"]).toBe("LocalBusiness");
    expect(jsonLd.name).toBe("ABC Plumbing");
    expect(jsonLd.telephone).toBe("+61 400 111 222");
    expect(jsonLd.address.addressLocality).toBe("Schofields");
  });

  test("an invalid business slug returns a real 404", async ({ page }) => {
    const response = await page.goto("/business/nonexistent-business");

    expect(response?.status()).toBe(404);
  });
});
