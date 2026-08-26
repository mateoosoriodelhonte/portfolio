/**
 * Central site configuration. Every external claim the site makes links out
 * from here so it can be verified — and corrected — in one place.
 */

export const site = {
  name: "Mateo Osorio Delhonte",
  shortName: "M. Osorio Delhonte",
  role: "Software Engineer",
  tagline: "Software engineer building reliable systems, developer tools, and grounded AI.",
  description:
    "Portfolio of Mateo Osorio Delhonte — software engineer working on production platforms, developer tools, and evidence-grounded AI systems. TypeScript, Python, Go, Rust, C#.",
  locale: "en",
} as const;

export const links = {
  github: "https://github.com/mateoosoriodelhonte",
  linkedin: "https://www.linkedin.com/in/mateo-osorio-delhonte-5a93452ab",
  appStore: "https://apps.apple.com/us/app/shoppinlyst/id6745744630",
  repos: {
    reposignal: "https://github.com/mateoosoriodelhonte/reposignal",
    studyforge: "https://github.com/mateoosoriodelhonte/studyforge",
    processpilot: "https://github.com/mateoosoriodelhonte/processpilot",
    tracemark: "https://github.com/mateoosoriodelhonte/tracemark",
    gatehouse: "https://github.com/mateoosoriodelhonte/gatehouse",
    contextbench: "https://github.com/mateoosoriodelhonte/contextbench",
  },
  reposignalDemo: "https://reposignal-lovat.vercel.app",
  sandploverPr: "https://github.com/sandpiper-toolchain/sandplover/pull/261",
} as const;

export const nav = [
  { label: "Work", href: "/work/" },
  { label: "Experience", href: "/experience/" },
  { label: "AI", href: "/ai/" },
  { label: "Blog", href: "/blog/" },
  { label: "About", href: "/about/" },
] as const;

/** Prefix an internal path with the configured base (works with subpath deploys). */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  if (!path.startsWith("/")) return path;
  return `${base}${path}`;
}
