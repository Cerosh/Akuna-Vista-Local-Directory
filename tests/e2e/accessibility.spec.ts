import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * Sprint 07 (Quality & Performance) baseline + regression coverage. Real
 * seeded slugs (data/businesses.json, data/categories.json) — the
 * "Community page" is the homepage itself (Sprint 06 put every community
 * section on `/`, there is no separate route).
 */
const ROUTES: { name: string; path: string }[] = [
  { name: "Homepage / Community page", path: "/" },
  { name: "Business directory", path: "/businesses" },
  { name: "Category page", path: "/category/roofing" },
  { name: "Business detail", path: "/business/brar-roofing-solution" },
  { name: "Search", path: "/search" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Privacy", path: "/privacy" },
  { name: "Terms", path: "/terms" },
];

test.describe("Accessibility (axe-core)", () => {
  for (const route of ROUTES) {
    test(`${route.name} (${route.path}) has no critical or serious violations`, async ({
      page,
    }) => {
      await page.goto(route.path);

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      const criticalOrSerious = results.violations.filter(
        (v) => v.impact === "critical" || v.impact === "serious",
      );

      if (criticalOrSerious.length > 0) {
        console.log(
          `${route.name} violations:`,
          JSON.stringify(
            criticalOrSerious.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })),
            null,
            2,
          ),
        );
      }

      expect(criticalOrSerious).toEqual([]);
    });
  }
});

/**
 * Automated proxy for a manual keyboard-only pass — there is no
 * VoiceOver/NVDA available in this environment (disclosed in review.md
 * rather than silently skipped). This checks the two things that are
 * reasonable to assert without a real screen reader: the skip-link is the
 * first tab stop and works, and repeated Tab presses always land focus on
 * a real, visible element (never silently lost to `<body>`).
 */
test.describe("Keyboard navigation", () => {
  // Safari/WebKit's default Tab order skips links entirely (only form
  // controls are tabbable) unless the user has macOS's "Full Keyboard
  // Access" setting enabled — this is WebKit's own long-standing default,
  // not something a page's HTML/CSS can override, and real Safari users
  // are equally affected. Found when Sprint 07 added cross-browser
  // Playwright coverage; disclosed here rather than chasing a page-level
  // "fix" for a browser default.
  test.beforeEach(({ browserName }) => {
    test.skip(
      browserName === "webkit",
      "WebKit's default Tab order excludes links, not a page defect.",
    );
  });

  test("skip-to-content link is the first tab stop and jumps to main content", async ({ page }) => {
    await page.goto("/");

    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Skip to content" });
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();

    await page.keyboard.press("Enter");
    await expect(page.locator("#main-content")).toBeFocused();
  });

  for (const route of ROUTES) {
    test(`${route.name} (${route.path}) never loses focus to <body> while tabbing`, async ({
      page,
    }) => {
      await page.goto(route.path);

      for (let i = 0; i < 15; i++) {
        await page.keyboard.press("Tab");
        const focusedTag = await page.evaluate(() => document.activeElement?.tagName);
        expect(focusedTag).not.toBe("BODY");
      }
    });
  }
});
