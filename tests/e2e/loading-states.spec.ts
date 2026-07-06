import { expect, test } from "@playwright/test";

/**
 * Confirms the skeleton loading UI actually renders (not a blank screen)
 * for the two routes that have their own loading.tsx (homepage, search —
 * see app/(home)/loading.tsx and app/search/loading.tsx; business/[slug]
 * and category/[slug] deliberately have none, per AI_MEMORY.md's
 * loading.tsx/notFound() Framework Gotcha).
 *
 * Local JSON reads resolve in low single-digit milliseconds, so observing
 * the transient skeleton requires slowing the response down — CDP network
 * throttling is Chromium-only, so this is chromium-only coverage.
 */
test.describe("Loading states", () => {
  test.skip(({ browserName }) => browserName !== "chromium", "CDP throttling is Chromium-only.");

  for (const path of ["/", "/search"]) {
    test(`${path} shows a skeleton, not a blank screen, under a slow connection`, async ({
      page,
    }) => {
      const client = await page.context().newCDPSession(page);
      await client.send("Network.enable");
      await client.send("Network.emulateNetworkConditions", {
        offline: false,
        latency: 200,
        downloadThroughput: (400 * 1024) / 8,
        uploadThroughput: (100 * 1024) / 8,
      });

      // waitUntil: "commit" resolves as soon as navigation starts, rather
      // than waiting for the full (throttled) page load — that's what lets
      // this test observe the skeleton without needing a long timeout.
      await page.goto(path, { waitUntil: "commit" });
      // Checks the skeleton actually rendered into the DOM (not a blank
      // screen) rather than requiring strict CSS visibility — React's
      // streaming SSR can briefly mark the fallback `hidden` until a
      // coordinating inline script reveals it, which is still "not blank."
      await expect(page.locator('[data-slot="skeleton"]').first()).toHaveCount(1);

      await page.waitForLoadState("load");
      await expect(page.locator('[data-slot="skeleton"]')).toHaveCount(0);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  }
});
