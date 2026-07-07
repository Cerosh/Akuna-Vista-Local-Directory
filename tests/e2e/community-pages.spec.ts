import { expect, test } from "@playwright/test";

/**
 * Sprint 08b (Community Pages) — About/Contact/Privacy/Terms. Covers the
 * Footer links that previously 404'd, and .ai/TESTING.md's "Contact page"
 * Critical User Journey (a mailto: link, not a submission form — see
 * sprints/sprint-08b-community-pages/notes.md).
 */
const PAGES = [
  { label: "About", path: "/about", heading: "About" },
  { label: "Contact", path: "/contact", heading: "Contact" },
  { label: "Privacy", path: "/privacy", heading: "Privacy Policy" },
  { label: "Terms", path: "/terms", heading: "Terms of Service" },
];

test.describe("Community pages (About/Contact/Privacy/Terms)", () => {
  for (const { label, path, heading } of PAGES) {
    test(`Footer link to ${label} resolves to a real page with no console errors`, async ({
      page,
    }) => {
      const consoleErrors: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") consoleErrors.push(message.text());
      });

      await page.goto("/");
      const footer = page.locator("footer");
      await footer.getByRole("link", { name: label, exact: true }).click();

      await expect(page).toHaveURL(path);
      await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
      expect(consoleErrors).toEqual([]);
    });
  }

  test("Contact page's email link is a real mailto: link", async ({ page }) => {
    await page.goto("/contact");

    // Scoped to #main-content — the footer has its own mailto: link on
    // every page, including this one.
    const mailLink = page.locator("#main-content").getByRole("link", { name: /@/ });
    await expect(mailLink).toHaveAttribute("href", /^mailto:.+@.+/);
  });

  test("Privacy and Terms cross-link to each other and to Contact", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.getByRole("link", { name: "Contact page" }).first()).toHaveAttribute(
      "href",
      "/contact",
    );

    await page.goto("/terms");
    await expect(page.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
      "href",
      "/privacy",
    );
  });
});
