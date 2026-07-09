import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [["html", { open: "never" }]],
  // GitHub-hosted CI runners are far slower/more contended than a local dev
  // machine, which isn't enough headroom for WebKit's debounced search
  // suggestions (useDeferredValue) to render within Playwright's 5s default
  // `expect` timeout — 100% reliable locally, only ever seen flaking in CI's
  // Linux WebKit build specifically (still flaky at 10s even after sharding
  // e2e across 3 parallel jobs to remove CPU contention as a factor — see
  // .github/workflows/ci.yml). Raising the ceiling doesn't slow local runs
  // down (assertions still resolve as soon as the UI updates); it just gives
  // slow CI more room. If this is still flaky at 15s, treat it as a known
  // WebKit-Linux-CI limitation (see .ai/TODO.md Backlog) rather than
  // continuing to raise this number indefinitely.
  expect: {
    timeout: process.env.CI ? 15_000 : 5_000,
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
