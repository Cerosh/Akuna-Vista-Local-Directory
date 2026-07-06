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
  { name: "Category page", path: "/category/plumbing" },
  { name: "Business detail", path: "/business/abc-plumbing" },
  { name: "Search", path: "/search" },
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
