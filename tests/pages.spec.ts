import { test, expect } from "@playwright/test";

const routes: [path: string, h1: string | RegExp][] = [
  [".", /Mateo Osorio Delhonte/],
  ["work/", /Six projects/],
  ["work/reposignal/", "RepoSignal"],
  ["work/studyforge/", "StudyForge"],
  ["work/processpilot/", "ProcessPilot"],
  ["work/contextbench/", "ContextBench"],
  ["work/shoppinlyst/", "ShoppinLyst"],
  ["work/tracemark/", "TraceMark"],
  ["work/gatehouse/", "Gatehouse"],
  ["ai/", /Make the model/],
  ["experience/", /Production platforms/],
  ["blog/", /evidence side of software/],
  ["blog/missing-data-is-not-failure/", "Missing data is not failure"],
  ["about/", /Lima/],
  ["resume/", "Mateo Osorio Delhonte"],
];

for (const [path, heading] of routes) {
  test(`${path} renders with its heading`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1").first()).toContainText(heading);
  });
}

test("unknown routes get the custom 404", async ({ page }) => {
  const response = await page.goto("this-route-does-not-exist/");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText(/can’t show its work/);
  await expect(page.getByRole("link", { name: "Back to the homepage" })).toBeVisible();
});

test("no page produces horizontal overflow", async ({ page }) => {
  for (const [path] of routes) {
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `${path} overflows horizontally`).toBeLessThanOrEqual(1);
  }
});
