import { test, expect } from "@playwright/test";

test("filters the index by domain and restores", async ({ page }) => {
  await page.goto("work/");
  const rows = page.locator(".work-row:visible");
  await expect(rows).toHaveCount(6);

  await page.getByRole("button", { name: "Mobile" }).click();
  await expect(rows).toHaveCount(1);
  await expect(rows.first()).toContainText("ShoppinLyst");

  await page.getByRole("button", { name: "Developer Tools" }).click();
  await expect(rows).toHaveCount(3);

  await page.getByRole("button", { name: "All", exact: true }).click();
  await expect(rows).toHaveCount(6);
});

test("filter state is reflected in aria-pressed", async ({ page }) => {
  await page.goto("work/");
  const ai = page.getByRole("button", { name: "AI", exact: true });
  await ai.click();
  await expect(ai).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("button", { name: "All", exact: true })).toHaveAttribute(
    "aria-pressed",
    "false",
  );
});

test("?domain= preselects a filter", async ({ page }) => {
  await page.goto("work/?domain=Systems");
  await expect(page.locator(".work-row:visible")).toHaveCount(1);
  await expect(page.locator(".work-row:visible").first()).toContainText("ProcessPilot");
});
