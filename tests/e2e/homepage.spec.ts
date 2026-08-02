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
    await expect(home.transitWidgetHeading).toBeVisible();
    await expect(home.popularCategoriesHeading).toBeVisible();
    await expect(home.featuredBusinessesHeading).toBeVisible();
    await expect(home.communityStatisticsHeading).toBeVisible();
    await expect(home.whyChooseLocalHeading).toBeVisible();
    await expect(home.featuredContentHeading).toBeVisible();
    await expect(home.communityEventsHeading).toBeVisible();
    await expect(home.promotionsHeading).toBeVisible();
    await expect(home.announcementsHeading).toBeVisible();
    await expect(home.footer).toBeVisible();
    await expect(home.footer).toContainText("We acknowledge the Dharug people");
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

  test("Popular categories shows every category (not just a curated few), scrollable via arrow buttons", async ({
    page,
  }) => {
    // Sprint 16 F-018: `Category.featured` was removed — the section now
    // shows every category via CategoryCarousel, not a fixed subset. Reads
    // the real count rather than hardcoding it (it grows over time, per
    // Sprint 15's ongoing data entries — same lesson as Pagination's test).
    const home = new HomePage(page);
    await home.goto();

    // .count() doesn't auto-wait like expect() does — wait for the list to
    // actually be rendered first, so this isn't racy under parallel load.
    await expect(home.categoryItems.first()).toBeAttached();
    const categoryCount = await home.categoryItems.count();
    // The old `featured` mechanism only ever surfaced 3 — asserting well
    // above that proves every category is present, without hardcoding the
    // exact, still-growing total.
    expect(categoryCount).toBeGreaterThan(10);

    await expect(home.categoriesScrollLeftButton).toBeDisabled();
    await expect(home.categoriesScrollRightButton).toBeEnabled();

    // Click through to the end (bounded so a real bug can't hang the test;
    // a short per-click timeout plus catch-and-break, rather than
    // pre-checking isDisabled(), since the button can become disabled
    // between the check and the click).
    for (let i = 0; i < categoryCount; i++) {
      try {
        await home.categoriesScrollRightButton.click({ timeout: 2000 });
      } catch {
        break;
      }
    }
    await expect(home.categoriesScrollRightButton).toBeDisabled();
    await expect(home.categoriesScrollLeftButton).toBeEnabled();

    // The very last category card should now actually be in view.
    await expect(home.categoryItems.last()).toBeInViewport();

    // Click back to the start.
    for (let i = 0; i < categoryCount; i++) {
      try {
        await home.categoriesScrollLeftButton.click({ timeout: 2000 });
      } catch {
        break;
      }
    }
    await expect(home.categoriesScrollLeftButton).toBeDisabled();
    await expect(home.categoryItems.first()).toBeInViewport();
  });

  test("tapping near the edge of a carousel arrow (not just its visible circle) scrolls, not navigates", async ({
    browser,
  }) => {
    // Sprint 16 F-027: the arrow's visible circle is 32px, but its real
    // <button> hit area was widened to 44px (WCAG 2.5.5) without changing
    // the visible size, since a tap that missed the old 32px button landed
    // on the adjacent CategoryCard's link instead. `hasTouch` needs a fresh
    // context — the default `chromium`/`firefox`/`webkit` projects don't
    // enable touch.
    const context = await browser.newContext({ hasTouch: true });
    const page = await context.newPage();
    const home = new HomePage(page);
    await home.goto();

    await expect(home.categoriesScrollLeftButton).toBeDisabled();
    await expect(home.categoriesScrollRightButton).toBeEnabled();

    // scrollIntoViewIfNeeded first: the carousel sits below the fold on a
    // default viewport, and a raw page.touchscreen.tap() (unlike
    // Locator.click()/.tap()) uses page coordinates without auto-scrolling,
    // so it would otherwise silently tap a point that isn't in view.
    await home.categoriesScrollRightButton.scrollIntoViewIfNeeded();
    const box = await home.categoriesScrollRightButton.boundingBox();
    if (!box) throw new Error("Right scroll button has no bounding box");
    const centerX = box.x + box.width / 2;
    const centerY = box.y + box.height / 2;

    // 20px left of center: outside the old 32px visible circle (radius
    // 16px) but inside the new 44px hit area (half-width 22px) — the exact
    // annulus that used to belong to whatever sat beside/behind the old
    // undersized button. The old and new buttons share the same center
    // point (the translate-based positioning centers on the row's edge
    // either way), so this coordinate is a direct regression check.
    await page.touchscreen.tap(centerX - 20, centerY);

    // Scrolled (left arrow now enabled), not navigated away from the
    // homepage to a category page.
    await expect(home.categoriesScrollLeftButton).toBeEnabled();
    await expect(page).toHaveURL(/\/$/);

    await context.close();
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

  test("clicking a promotion opens the correct business page", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await home.promotionsHeading.scrollIntoViewIfNeeded();
    const promotionLink = page.getByRole("link", { name: "View business" }).first();
    await expect(promotionLink).toHaveAttribute("href", /^\/business\//);

    await promotionLink.click();

    await expect(page).toHaveURL(/\/business\//);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("Transit widget sits beside Hero (not in Popular Categories' spot) and never calls NSW Transport APIs directly from the browser", async ({
    page,
  }) => {
    // This is a local business directory first — live transit data is a
    // secondary, compact sidebar widget next to Hero, not a full-width
    // section pushing Popular Categories down (the project owner's
    // explicit framing, 2026-07-15). The NSW Transport API keys must
    // only ever be used server-side (lib/transportNsw/client.ts,
    // DECISIONS.md ADR-014) — the browser should only ever request this
    // app's own /api/carpark and /api/departures routes, never
    // api.transport.nsw.gov.au directly. Doesn't assert on the API key's
    // value (never hardcode a real secret into a committed test).
    const requestedUrls: string[] = [];
    page.on("request", (request) => requestedUrls.push(request.url()));
    // Explicit waits for the actual responses, rather than inferring
    // completion from the DOM alone — under load, WebKit's automation
    // protocol can deliver "request"/"response" events to the test
    // process slightly after the page has already re-rendered, so
    // checking requestedUrls right after a DOM assertion is itself a
    // race (see git history of this test for the flake this caused once).
    const carparkResponsePromise = page
      .waitForResponse((response) => response.url().includes("/api/carpark"), { timeout: 15000 })
      .catch(() => null);
    const departuresResponsePromise = page
      .waitForResponse((response) => response.url().includes("/api/departures"), { timeout: 15000 })
      .catch(() => null);

    const home = new HomePage(page);
    await home.goto();

    await expect(home.transitWidgetHeading).toBeVisible();

    // Akuna Vista residents-only promotions — not the transit widget — is
    // the first full section (h2) after Hero; the transit widget lives
    // inside the Hero row itself, not as its own section. (Promotions/
    // Popular Categories were swapped 2026-07-15, per the project owner.)
    const sectionOrder = await page.evaluate(() =>
      Array.from(document.querySelectorAll("h2")).map((h) => h.textContent),
    );
    expect(sectionOrder[0]).toBe("Akuna Vista residents-only promotions");

    const [carparkResponse, departuresResponse] = await Promise.all([
      carparkResponsePromise,
      departuresResponsePromise,
    ]);
    expect(carparkResponse).not.toBeNull();
    expect(departuresResponse).not.toBeNull();

    // Tolerant of both outcomes for each: real numbers if
    // TRANSPORT_NSW_API_KEY is configured in this environment, or the
    // graceful fallback if not (e.g. CI, where the real key isn't
    // provisioned) — either is a pass, a hard failure/crash/blank widget
    // is not.
    await expect(
      page.getByText("Schofields").first().or(page.getByText("Unavailable right now").first()),
    ).toBeVisible({ timeout: 15000 });

    expect(requestedUrls.some((url) => url.includes("/api/carpark"))).toBe(true);
    expect(requestedUrls.some((url) => url.includes("/api/departures"))).toBe(true);
    expect(requestedUrls.some((url) => url.includes("api.transport.nsw.gov.au"))).toBe(false);
  });

  test("Weather card is server-rendered with real Schofields conditions on first paint, and the browser never calls Open-Meteo directly", async ({
    page,
  }) => {
    // Sprint 13 replaced the "Weather coming soon" placeholder in the Hero
    // sidebar with a real Open-Meteo-backed card; Sprint 14 (F-018) moved the
    // initial fetch server-side (app/(home)/page.tsx), so the card shows real
    // conditions in the server-rendered HTML instead of a client-fetched
    // loading skeleton — the browser no longer needs to (and shouldn't) call
    // /api/weather itself just to get the first paint's data. Open-Meteo
    // needs no API key, but this app's CSP (`connect-src 'self'`) blocks the
    // browser from calling it directly regardless.
    const requestedUrls: string[] = [];
    page.on("request", (request) => requestedUrls.push(request.url()));

    const home = new HomePage(page);
    await home.goto();

    await expect(page.getByText("Schofields Weather")).toBeVisible();

    // Tolerant of both outcomes — real numbers (Open-Meteo is a live,
    // unauthenticated public API so this should normally succeed) or the
    // graceful fallback if the upstream server-side call fails for any
    // reason. Either is a pass; a crash or blank card is not.
    await expect(
      page.getByText("Feels like").or(page.getByText("Unavailable right now").first()),
    ).toBeVisible({ timeout: 15000 });

    expect(requestedUrls.some((url) => url.includes("api.open-meteo.com"))).toBe(false);
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
