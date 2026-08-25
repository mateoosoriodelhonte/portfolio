/**
 * Visual QA harness: capture full-page screenshots of local pages.
 *
 *   node scripts/shots.mjs [path=/] [--dark] [--width=1440] [--out=dir]
 *
 * Writes <out>/<name>.png. Used during development and design review;
 * the Playwright test suite is separate.
 */
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const args = process.argv.slice(2);
const path = args.find((a) => !a.startsWith("--")) ?? "/";
const dark = args.includes("--dark");
const width = Number(args.find((a) => a.startsWith("--width="))?.split("=")[1] ?? 1440);
const out =
  args.find((a) => a.startsWith("--out="))?.split("=")[1] ?? process.env.SHOTS_DIR ?? "/tmp/shots";
const base = process.env.SHOTS_BASE ?? "http://localhost:4321/portfolio";

mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width, height: 900 },
  colorScheme: dark ? "dark" : "light",
  deviceScaleFactor: width < 500 ? 2 : 1,
});

await page.goto(base + path, { waitUntil: "networkidle" });
// Let load-in animations finish, then force reveals visible and lazy images
// eager so the full-page capture shows real content.
await page.waitForTimeout(1200);
await page.evaluate(async () => {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  const images = [...document.images];
  images.forEach((img) => (img.loading = "eager"));
  await Promise.all(
    images.map((img) =>
      img.complete ? Promise.resolve() : new Promise((done) => (img.onload = img.onerror = done)),
    ),
  );
});
await page.waitForTimeout(700);

const name = `${path === "/" ? "home" : path.replace(/^\/|\/$/g, "").replace(/\//g, "-")}-${width}${dark ? "-dark" : ""}`;
await page.screenshot({ path: `${out}/${name}.png`, fullPage: true });
console.log(`${out}/${name}.png`);
await browser.close();
