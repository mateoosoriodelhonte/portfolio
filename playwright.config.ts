import { defineConfig, devices } from "@playwright/test";

/**
 * The suite runs against the production build (`astro preview` serving dist/),
 * so what passes here is what deploys.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: "http://localhost:4322/portfolio/",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run preview -- --port 4322",
    url: "http://localhost:4322/portfolio/",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"] },
    },
  ],
});
