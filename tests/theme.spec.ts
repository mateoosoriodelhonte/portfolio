import { test, expect } from "@playwright/test";

test("defaults follow the system preference", async ({ browser }) => {
  for (const scheme of ["light", "dark"] as const) {
    const context = await browser.newContext({ colorScheme: scheme });
    const page = await context.newPage();
    await page.goto("http://localhost:4322/portfolio/");
    await expect(page.locator("html")).toHaveAttribute("data-theme", scheme);
    await context.close();
  }
});

test("toggle switches theme and persists across reload", async ({ page }) => {
  await page.goto(".");
  const initial = await page.locator("html").getAttribute("data-theme");
  const flipped = initial === "dark" ? "light" : "dark";

  await page.locator("#theme-toggle").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", flipped);

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", flipped);

  const stored = await page.evaluate(() => localStorage.getItem("theme"));
  expect(stored).toBe(flipped);
});

test("both themes paint their own background", async ({ page }) => {
  await page.goto(".");
  const bg = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);

  await page.evaluate(() => {
    document.documentElement.dataset.theme = "light";
  });
  const light = await bg();
  await page.evaluate(() => {
    document.documentElement.dataset.theme = "dark";
  });
  const dark = await bg();
  expect(light).not.toBe(dark);
});
