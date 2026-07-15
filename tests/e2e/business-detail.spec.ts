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

  test("renders contact links (phone, website, social) and no console errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });

    // No business in the current real dataset (Sprint 08b content update)
    // has an email address or opening hours — none of the source ads
    // included one, and neither was fabricated. This test covers what the
    // real data actually has: phone, website and social links. See
    // sprints/sprint-08b-community-pages/ for the "don't fabricate" policy
    // this project has followed consistently for real content.
    const business = new BusinessPage(page);
    await business.goto("windsor-marsden-park-richmond-taxi");

    await expect(business.heading).toHaveText("Windsor Marsden Park Richmond Taxi");
    await expect(page.getByRole("link", { name: "+61 402 330 518" })).toHaveAttribute(
      "href",
      "tel:+61 402 330 518",
    );
    await expect(
      page.getByRole("link", { name: "windsormarsdenparkrichmondtaxi.com.au" }),
    ).toHaveAttribute("href", "http://windsormarsdenparkrichmondtaxi.com.au");
    await expect(page.getByRole("heading", { name: "Follow" })).toBeVisible();
    expect(consoleErrors).toEqual([]);
  });

  test("degrades gracefully when optional fields are missing", async ({ page }) => {
    const business = new BusinessPage(page);
    await business.goto("brar-roofing-solution");

    await expect(business.heading).toHaveText("Brar Roofing Solution");
    // No website, no social links, no address, no email or opening hours
    // for this business — those sections should not render.
    await expect(page.getByRole("heading", { name: "Follow" })).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Opening Hours" })).toHaveCount(0);
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
    await business.goto("brar-roofing-solution");

    await business.shareButton.click();

    await expect(page.getByRole("button", { name: "Link copied to clipboard" })).toBeVisible();
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain("/business/brar-roofing-solution");
  });

  test("includes valid LocalBusiness structured data", async ({ page }) => {
    const business = new BusinessPage(page);
    await business.goto("windsor-marsden-park-richmond-taxi");

    const jsonLdText = await business.jsonLd.textContent();
    const jsonLd = JSON.parse(jsonLdText ?? "{}");

    expect(jsonLd["@type"]).toBe("LocalBusiness");
    expect(jsonLd.name).toBe("Windsor Marsden Park Richmond Taxi");
    expect(jsonLd.telephone).toBe("+61 402 330 518");
    // No business in the current real dataset has a street address, so
    // `address` is correctly absent from the JSON-LD rather than fabricated
    // — see structuredData.ts's conditional spread and the note in the
    // "renders contact links" test above.
    expect(jsonLd.address).toBeUndefined();
  });

  test("an invalid business slug returns a real 404", async ({ page }) => {
    const response = await page.goto("/business/nonexistent-business");

    expect(response?.status()).toBe(404);
  });

  test("clicking a gallery image opens a zoomed view, closable via the close button or Escape", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });

    // The only business with a real (non-placeholder) gallery image as of
    // Sprint 11's follow-up — see sprints/sprint-11-home-tutoring-listing/notes.md.
    const business = new BusinessPage(page);
    await business.goto("private-mathematics-english-tutoring");

    const trigger = page.getByRole("button", { name: /view.*photo.*full size/i }).first();
    await expect(trigger).toBeVisible();
    await trigger.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("img")).toBeVisible();

    // Closable via the explicit close button...
    await page.getByRole("button", { name: "Close" }).click();
    await expect(dialog).toBeHidden();

    // ...and via Escape.
    await trigger.click();
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();

    expect(consoleErrors).toEqual([]);
  });
});
