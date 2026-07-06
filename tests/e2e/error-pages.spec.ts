import { expect, test } from "@playwright/test";

test.describe("Custom 404 page", () => {
  test("an unknown route renders the custom 404 with a real 404 status and no console errors", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    const response = await page.goto("/this-route-does-not-exist");
    const main = page.locator("#main-content");

    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "We couldn't find that page" })).toBeVisible();
    await expect(main.getByRole("link", { name: "Return home" })).toHaveAttribute("href", "/");
    await expect(main.getByRole("link", { name: "Browse businesses" })).toHaveAttribute(
      "href",
      "/businesses",
    );
    // Chrome always logs "Failed to load resource: ... 404" for the page's
    // own top-level navigation response when it returns 404 — expected for
    // any real 404 page, not an app-level error. Filtered out; anything
    // else here is a genuine, unexpected console error.
    const unexpectedErrors = consoleErrors.filter(
      (text) => !text.includes("Failed to load resource") || !text.includes("404"),
    );
    expect(unexpectedErrors).toEqual([]);
  });

  test("Return home from the 404 page navigates to the homepage", async ({ page }) => {
    await page.goto("/this-route-does-not-exist");
    await page.locator("#main-content").getByRole("link", { name: "Return home" }).click();
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});

test.describe("Error boundary", () => {
  test("a thrown error renders the friendly error boundary, not a stack trace", async ({
    page,
  }) => {
    await page.goto("/test-error");

    await expect(page.getByRole("heading", { name: "Something went wrong" })).toBeVisible();
    await expect(page.getByText(/intentional test error/i)).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Try again" })).toBeVisible();
    await expect(
      page.locator("#main-content").getByRole("link", { name: "Return home" }),
    ).toHaveAttribute("href", "/");
  });

  test("Return home from the error boundary navigates to the homepage", async ({ page }) => {
    await page.goto("/test-error");
    await page.locator("#main-content").getByRole("link", { name: "Return home" }).click();
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
