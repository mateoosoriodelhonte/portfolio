import { test, expect } from "@playwright/test";

const routes: [path: string, h1: string | RegExp][] = [
  [".", /Mateo Osorio Delhonte/],
  ["work/", /Seven projects/],
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
];

for (const [path, heading] of routes) {
  test(`${path} renders with its heading`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1").first()).toContainText(heading);
  });
}

test("the resume PDF is served", async ({ request }) => {
  const res = await request.get("http://localhost:4322/portfolio/Mateo-Osorio-Delhonte-Resume.pdf");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("pdf");
});

test("/resume/ forwards to the PDF", async ({ request }) => {
  const res = await request.get("http://localhost:4322/portfolio/resume/");
  expect(res.status()).toBe(200);
  const body = await res.text();
  expect(body).toContain('http-equiv="refresh"');
  expect(body).toContain("Mateo-Osorio-Delhonte-Resume.pdf");
});

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
