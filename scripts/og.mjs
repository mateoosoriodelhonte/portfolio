/**
 * Social-image generator. Renders the design in a headless browser and
 * writes 1200x630 PNGs to public/og/. Outputs are committed, so builds and
 * deploys never depend on this step or on network fonts.
 *
 *   node scripts/og.mjs
 */
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const OUT = resolve("public/og");
mkdirSync(OUT, { recursive: true });

const cards = [
  {
    file: "default",
    kicker: "Mateo Osorio Delhonte — Software Engineer",
    title: "Software that <em>shows</em> its <em>work</em>.",
    foot: "mateoosoriodelhonte.github.io/portfolio",
  },
  {
    file: "work",
    kicker: "Mateo Osorio Delhonte — Selected work",
    title: "Seven projects, seven <em>verifiable</em> claims.",
    foot: "mateoosoriodelhonte.github.io/portfolio",
  },
  {
    file: "work-reposignal",
    kicker: "Case study — RepoSignal",
    title: "Software that evaluates how software is <em>engineered</em>.",
    foot: "Next.js · TypeScript · PostgreSQL · 477 tests",
  },
  {
    file: "work-studyforge",
    kicker: "Case study — StudyForge",
    title: "Notes in, durable memory out — with or <em>without</em> AI.",
    foot: "Python · FastAPI · HTMX · FSRS-6 · SQLite",
  },
  {
    file: "work-processpilot",
    kicker: "Case study — ProcessPilot",
    title: "Understand your Mac <em>without</em> invasive access.",
    foot: "Rust · Go · read-only by design",
  },
  {
    file: "work-contextbench",
    kicker: "Case study — ContextBench",
    title: "Retrieval, <em>measured</em> — not guessed.",
    foot: "Python · SolidJS · Qdrant · BM25 · RRF · IR metrics",
  },
  {
    file: "work-shoppinlyst",
    kicker: "On the App Store — ShoppinLyst",
    title: "Grocery planning, from list to store to <em>recipe</em>.",
    foot: "Swift · SwiftUI · MapKit · 0.8 MB",
  },
  {
    file: "work-tracemark",
    kicker: "Case study — TraceMark",
    title: "Save the useful part of the web, <em>source attached</em>.",
    foot: "WXT · Svelte · Chrome + Firefox · local-first",
  },
  {
    file: "work-gatehouse",
    kicker: "Case study — Gatehouse",
    title: "Know what is ready to merge, <em>and why</em>.",
    foot: "C# · .NET 10 · Blazor · deterministic verdicts",
  },
  {
    file: "ai",
    kicker: "Mateo Osorio Delhonte — Grounded AI",
    title: "Make the model <em>show its sources</em>.",
    foot: "retrieval · grounding · evaluation · determinism",
  },
  {
    file: "experience",
    kicker: "Mateo Osorio Delhonte — Experience",
    title: "Production platforms, <em>client-facing</em> quality.",
    foot: "mateoosoriodelhonte.github.io/portfolio",
  },
  {
    file: "blog",
    kicker: "Mateo Osorio Delhonte — Blog",
    title: "Notes from the <em>evidence</em> side of software.",
    foot: "mateoosoriodelhonte.github.io/portfolio",
  },
  {
    file: "blog-missing-data-is-not-failure",
    kicker: "Blog — Engineering",
    title: "Missing data is not <em>failure</em>.",
    foot: "mateoosoriodelhonte.github.io/portfolio",
  },
  {
    file: "blog-deterministic-systems-around-ai",
    kicker: "Blog — AI / RAG",
    title: "Building <em>deterministic</em> systems around AI.",
    foot: "mateoosoriodelhonte.github.io/portfolio",
  },
  {
    file: "blog-retrieval-before-models",
    kicker: "Blog — AI / RAG",
    title: "RAG: retrieval quality <em>before</em> model quality.",
    foot: "mateoosoriodelhonte.github.io/portfolio",
  },
  {
    file: "blog-one-idea-two-stacks",
    kicker: "Blog — Lessons learned",
    title: "One idea, two stacks: what <em>transferred</em>.",
    foot: "mateoosoriodelhonte.github.io/portfolio",
  },
  {
    file: "blog-explain-before-automate",
    kicker: "Blog — Developer tools",
    title: "Tools should <em>explain</em> before they automate.",
    foot: "mateoosoriodelhonte.github.io/portfolio",
  },
];

const page = (card) => `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..600;1,6..72,300..600&family=Geist+Mono:wght@400&display=block" rel="stylesheet">
<style>
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    background: #f6f4ef; color: #1c1a17;
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 72px 84px;
    position: relative;
    font-family: Newsreader, Georgia, serif;
  }
  .rules {
    position: absolute; inset: 0;
    background-image: repeating-linear-gradient(to bottom, transparent 0, transparent 89px, rgba(28,26,23,0.10) 89px, rgba(28,26,23,0.10) 90px);
    mask-image: radial-gradient(120% 100% at 28% 42%, black 0%, transparent 80%);
    -webkit-mask-image: radial-gradient(120% 100% at 28% 42%, black 0%, transparent 80%);
  }
  .kicker {
    position: relative;
    font-family: "Geist Mono", monospace; font-size: 21px;
    letter-spacing: 0.16em; text-transform: uppercase; color: #6f6a60;
  }
  h1 {
    position: relative;
    font-size: 92px; line-height: 1.04; letter-spacing: -0.025em;
    font-weight: 400; max-width: 980px;
  }
  h1 em { font-style: italic; color: #226b50; }
  .foot {
    position: relative; display: flex; justify-content: space-between; align-items: center;
    font-family: "Geist Mono", monospace; font-size: 20px; letter-spacing: 0.08em;
    text-transform: uppercase; color: #6f6a60;
  }
  .dot { width: 14px; height: 14px; border-radius: 99px; background: #226b50; }
</style></head>
<body>
  <div class="rules"></div>
  <p class="kicker">${card.kicker}</p>
  <h1>${card.title}</h1>
  <div class="foot"><span>${card.foot}</span><span class="dot"></span></div>
</body></html>`;

const only = process.argv.find((a) => a.startsWith("--only="))?.split("=")[1];
const selected = only ? cards.filter((c) => c.file === only) : cards;

const browser = await chromium.launch();
const tab = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

for (const card of selected) {
  await tab.setContent(page(card), { waitUntil: "networkidle" });
  await tab.evaluate(() => document.fonts.ready);
  await tab.waitForTimeout(150);
  await tab.screenshot({ path: `${OUT}/${card.file}.png` });
  console.log(`og/${card.file}.png`);
}

await browser.close();
