import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [["html", { open: "never" }]],
  // CI runs on a single, CPU-constrained worker (see `workers` note below),
  // which occasionally isn't enough headroom for WebKit's debounced search
  // suggestions (useDeferredValue) to render within Playwright's 5s default
  // `expect` timeout — 100% reliable locally, only ever seen flaking in CI.
  // Raising the ceiling doesn't slow local runs down (assertions still
  // resolve as soon as the UI updates); it just gives slow CI more room.
  expect: {
    timeout: process.env.CI ? 10_000 : 5_000,
  },
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  // Firefox and WebKit added in Sprint 07 (Quality & Performance) per
  // TESTING.md's Browser Support (Chrome primary, Firefox/Safari secondary).
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
  webServer: {
    command: "npm run build && npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
