import { test, expect } from "@playwright/test";

test.describe("reduced motion", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("content is immediately visible without animation", async ({ page }) => {
    await page.goto(".");
    expect(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(
      true,
    );
    // Hero lines don't wait for their rise animation.
    const heroOpacity = await page
      .locator(".hero-item")
      .first()
      .evaluate((el) => getComputedStyle(el).opacity);
    expect(heroOpacity).toBe("1");

    // Reveal elements below the fold are visible without scrolling.
    const hidden = await page.evaluate(() => {
      const els = [...document.querySelectorAll(".reveal")];
      return els.filter((el) => getComputedStyle(el).opacity === "0").length;
    });
    expect(hidden).toBe(0);
  });
});

test("reveals become visible on scroll", async ({ page }) => {
  await page.goto(".");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(900);
  const stillHidden = await page.evaluate(
    () =>
      [...document.querySelectorAll(".reveal")].filter((el) => getComputedStyle(el).opacity === "0")
        .length,
  );
  expect(stillHidden).toBe(0);
});
