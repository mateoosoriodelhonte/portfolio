import { test, expect } from "@playwright/test";

test.describe("desktop navigation", () => {
  test.skip(({ isMobile }) => !!isMobile, "desktop only");

  test("primary nav reaches every section", async ({ page }) => {
    await page.goto(".");
    for (const [label, h1] of [
      ["Work", /Six projects/],
      ["Experience", /Production platforms/],
      ["AI", /Make the model/],
      ["Blog", /evidence side/],
      ["About", /Lima/],
    ] as const) {
      await page
        .getByRole("navigation", { name: "Primary" })
        .getByRole("link", { name: label })
        .click();
      await expect(page.locator("h1").first()).toContainText(h1);
    }
  });

  test("current page is marked in the nav", async ({ page }) => {
    await page.goto("work/");
    const active = page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Work" });
    await expect(active).toHaveAttribute("aria-current", "page");
  });

  test("skip link jumps to content", async ({ page }) => {
    await page.goto(".");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await skip.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });
});

test.describe("mobile menu", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile only");

  test("opens, navigates, and closes", async ({ page }) => {
    await page.goto(".");
    const toggle = page.locator("#menu-toggle");
    await toggle.click();
    await expect(page.locator("html")).toHaveClass(/menu-open/);
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(toggle).toHaveAccessibleName("Close menu");

    await page
      .getByRole("navigation", { name: "Primary mobile" })
      .getByRole("link", { name: "Work" })
      .click();
    await expect(page.locator("h1").first()).toContainText(/Six projects/);
    await expect(page.locator("html")).not.toHaveClass(/menu-open/);
  });

  test("escape closes the menu", async ({ page }) => {
    await page.goto(".");
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.locator("html")).toHaveClass(/menu-open/);
    await page.keyboard.press("Escape");
    await expect(page.locator("html")).not.toHaveClass(/menu-open/);
  });
});

test("internal links on key pages resolve", async ({ page, request, baseURL }) => {
  const checked = new Set<string>();
  for (const path of [".", "work/", "blog/", "experience/"]) {
    await page.goto(path);
    const hrefs = await page.$$eval("a[href]", (as) =>
      as.map((a) => (a as HTMLAnchorElement).href),
    );
    for (const href of hrefs) {
      if (!href.startsWith(baseURL!)) continue;
      if (href.includes("#") || href.endsWith(".xml")) continue;
      if (checked.has(href)) continue;
      checked.add(href);
      const res = await request.get(href);
      expect(res.status(), `${href} (linked from ${path})`).toBe(200);
    }
  }
});
