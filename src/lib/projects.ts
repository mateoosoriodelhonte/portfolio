import type { ImageMetadata } from "astro";
import { links } from "~/lib/site";

import reposignalAnalysis from "~/assets/projects/reposignal/analysis.png";
import reposignalMethodology from "~/assets/projects/reposignal/methodology.png";
import reposignalHomepage from "~/assets/projects/reposignal/homepage.png";
import reposignalDistributions from "~/assets/projects/reposignal/distributions.png";
import studyforgeStudy from "~/assets/projects/studyforge/study.png";
import studyforgeDashboard from "~/assets/projects/studyforge/dashboard.png";
import studyforgeProgress from "~/assets/projects/studyforge/progress.png";
import studyforgeDocument from "~/assets/projects/studyforge/document.png";
import studyforgeAsk from "~/assets/projects/studyforge/ask.png";
import studyforgeMobile from "~/assets/projects/studyforge/study-mobile.png";
import tracemarkLibrary from "~/assets/projects/tracemark/tracemark-library.png";
import tracemarkSearch from "~/assets/projects/tracemark/tracemark-search.png";
import tracemarkLocalAi from "~/assets/projects/tracemark/tracemark-local-ai.png";
import gatehouseDashboard from "~/assets/projects/gatehouse/dashboard.png";
import processpilotOverview from "~/assets/projects/processpilot/overview.png";
import processpilotApplications from "~/assets/projects/processpilot/applications.png";
import shoppinlystLists from "~/assets/projects/shoppinlyst/lists.png";
import shoppinlystAddItem from "~/assets/projects/shoppinlyst/add-item.png";
import shoppinlystNearby from "~/assets/projects/shoppinlyst/nearby.png";
import shoppinlystPrices from "~/assets/projects/shoppinlyst/prices.png";
import shoppinlystListsDark from "~/assets/projects/shoppinlyst/lists-dark.png";
import shoppinlystRecipesDark from "~/assets/projects/shoppinlyst/recipes-dark.png";
import shoppinlystPricesDark from "~/assets/projects/shoppinlyst/prices-dark.png";
import shoppinlystAppStore from "~/assets/projects/shoppinlyst/appstore.png";

export type Domain =
  "Full Stack" | "AI" | "Systems" | "Browser Extensions" | "Developer Tools" | "Mobile";

export interface Project {
  slug: string;
  name: string;
  /** One line, index rows and cards. */
  tagline: string;
  /** A short paragraph for the homepage / index. */
  summary: string;
  domains: Domain[];
  stack: string[];
  repo?: string;
  demo?: string;
  store?: string;
  /** Small verifiable facts shown as mono annotations. */
  facts: string[];
  images: Record<string, ImageMetadata>;
}

export const projects: Project[] = [
  {
    slug: "reposignal",
    name: "RepoSignal",
    tagline: "Software that evaluates how software is being engineered.",
    summary:
      "Point it at any public GitHub repository and it reports how the project is actually run — activity, PR flow, CI, documentation, hygiene — as a deterministic score where every number is traceable to the public evidence it came from.",
    domains: ["Full Stack", "Developer Tools"],
    stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Prisma", "Zod", "Playwright"],
    repo: links.repos.reposignal,
    demo: links.reposignalDemo,
    facts: ["477 tests + 22 e2e specs", "deterministic scoring", "MIT"],
    images: {
      analysis: reposignalAnalysis,
      methodology: reposignalMethodology,
      homepage: reposignalHomepage,
      distributions: reposignalDistributions,
    },
  },
  {
    slug: "studyforge",
    name: "StudyForge",
    tagline: "Notes in, durable memory out — with or without AI.",
    summary:
      "A local-first study system that ingests the notes and PDFs you already have, extracts the concepts worth learning, and drills them with FSRS-6 spaced repetition. Fully functional with zero AI configured.",
    domains: ["Full Stack", "AI"],
    stack: ["Python", "FastAPI", "HTMX", "SQLite", "SQLAlchemy", "Ollama", "pytest"],
    repo: links.repos.studyforge,
    facts: ["695 tests", "FSRS-6 verified against reference", "MIT"],
    images: {
      study: studyforgeStudy,
      dashboard: studyforgeDashboard,
      progress: studyforgeProgress,
      document: studyforgeDocument,
      ask: studyforgeAsk,
      mobile: studyforgeMobile,
    },
  },
  {
    slug: "processpilot",
    name: "ProcessPilot",
    tagline: "Understand what is using your Mac — without invasive access.",
    summary:
      "A read-only macOS process monitor built from a Rust telemetry collector and a Go analysis service. It explains CPU and memory in plain language using ordinary unprivileged APIs, and has no kill switch by design.",
    domains: ["Systems", "Developer Tools"],
    stack: ["Rust", "Go", "SQLite", "SSE", "Playwright"],
    repo: links.repos.processpilot,
    facts: ["two-language pipeline", "read-only by design", "MIT"],
    images: {
      overview: processpilotOverview,
      applications: processpilotApplications,
    },
  },
  {
    slug: "shoppinlyst",
    name: "ShoppinLyst",
    tagline: "Grocery planning, from list to store to recipe.",
    summary:
      "An iOS app on the App Store that keeps shopping lists organized, finds nearby grocery stores, and turns recipes into the items you actually need to buy. Shipped, reviewed by Apple, and 0.8 MB small.",
    domains: ["Mobile"],
    stack: ["Swift", "SwiftUI", "MapKit"],
    store: links.appStore,
    facts: ["App Store", "v2.1", "0.8 MB download"],
    images: {
      lists: shoppinlystLists,
      addItem: shoppinlystAddItem,
      nearby: shoppinlystNearby,
      prices: shoppinlystPrices,
      listsDark: shoppinlystListsDark,
      recipesDark: shoppinlystRecipesDark,
      pricesDark: shoppinlystPricesDark,
      appStore: shoppinlystAppStore,
    },
  },
  {
    slug: "tracemark",
    name: "TraceMark",
    tagline: "Save the useful part of the web — and keep the source attached.",
    summary:
      "A Chrome and Firefox extension for capturing quotations with their provenance, organizing them into a searchable local research library, and re-finding the exact passage on its original page.",
    domains: ["Browser Extensions"],
    stack: ["WXT", "Svelte", "TypeScript", "IndexedDB", "WebExtensions"],
    repo: links.repos.tracemark,
    facts: ["Chrome + Firefox", "local-first", "MIT"],
    images: {
      library: tracemarkLibrary,
      search: tracemarkSearch,
      localAi: tracemarkLocalAi,
    },
  },
  {
    slug: "gatehouse",
    name: "Gatehouse",
    tagline: "Know what is ready to merge, and why.",
    summary:
      "A local, read-only pull-request readiness dashboard for GitHub. Branch state, checks, reviews, and repository policy become one deterministic verdict — GO, REVIEW, BLOCKED, DRAFT, or UNKNOWN. It never guesses.",
    domains: ["Developer Tools", "Full Stack"],
    stack: ["C#", ".NET 10", "ASP.NET Core", "Blazor", "SQLite", "xUnit"],
    repo: links.repos.gatehouse,
    facts: ["deterministic verdicts", "read-only GitHub access", "MIT"],
    images: {
      dashboard: gatehouseDashboard,
    },
  },
];

export const domains: Domain[] = [
  "Full Stack",
  "AI",
  "Systems",
  "Browser Extensions",
  "Developer Tools",
  "Mobile",
];

export function project(slug: string): Project {
  const found = projects.find((p) => p.slug === slug);
  if (!found) throw new Error(`Unknown project: ${slug}`);
  return found;
}
