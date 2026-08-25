import { test, expect } from "@playwright/test";

test("index lists the published posts and no drafts", async ({ page }) => {
  await page.goto("blog/");
  const articles = page.locator("article");
  await expect(articles).toHaveCount(5);
  await expect(page.locator("body")).not.toContainText(
    "My first external open-source contribution",
  );
});

test("an article renders its reading apparatus", async ({ page }) => {
  await page.goto("blog/missing-data-is-not-failure/");
  await expect(page.getByText(/min read/)).toBeVisible();
  await expect(page.getByRole("navigation", { name: "On this page" })).toBeVisible();
  // Dual-theme Shiki code block present
  await expect(page.locator("pre.astro-code").first()).toBeVisible();
  // TOC links jump to real headings
  const first = page.getByRole("navigation", { name: "On this page" }).getByRole("link").first();
  const target = await first.getAttribute("href");
  expect(target).toMatch(/^#/);
  await expect(page.locator(`[id="${target!.slice(1)}"]`)).toBeAttached();
});

test("rss feed is served and lists posts", async ({ request }) => {
  const res = await request.get("http://localhost:4322/portfolio/rss.xml");
  expect(res.status()).toBe(200);
  const body = await res.text();
  expect(body).toContain("<rss");
  expect(body).toContain("Missing data is not failure");
  expect(body).not.toContain("open-source contribution");
});
