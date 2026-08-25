import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = [
  ".",
  "work/",
  "work/reposignal/",
  "work/shoppinlyst/",
  "ai/",
  "experience/",
  "blog/",
  "blog/missing-data-is-not-failure/",
  "about/",
  "resume/",
];

for (const path of pages) {
  test(`${path} has no serious accessibility violations`, async ({ page }) => {
    await page.goto(path);
    // Let reveal animations finish so axe sees final styles.
    await page.evaluate(() =>
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible")),
    );
    await page.waitForTimeout(400);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const serious = results.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    );
    expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`)).toEqual([]);
  });
}
