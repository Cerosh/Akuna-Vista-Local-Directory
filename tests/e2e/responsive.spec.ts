import { expect, test } from "@playwright/test";

/**
 * Sprint 07 (Quality & Performance) responsive audit — checks the one
 * objectively measurable regression from TESTING.md's Responsive Testing
 * section (mobile/tablet/desktop/large desktop, no horizontal scrolling)
 * across every major route. Visual layout correctness beyond overflow is
 * still a manual/visual concern (TESTING.md's Visual Regression is
 * explicitly "Future").
 */
const ROUTES = ["/", "/businesses", "/category/plumbing", "/business/abc-plumbing", "/search"];

const BREAKPOINTS = [
  { name: "mobile", width: 375, height: 700 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 800 },
  { name: "large desktop", width: 1536, height: 900 },
];

test.describe("Responsive: no horizontal overflow", () => {
  for (const path of ROUTES) {
    for (const bp of BREAKPOINTS) {
      test(`${path} at ${bp.name} (${bp.width}px) has no horizontal scroll`, async ({ page }) => {
        await page.setViewportSize({ width: bp.width, height: bp.height });
        await page.goto(path);

        const { scrollWidth, clientWidth } = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }));

        expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
      });
    }
  }
});
