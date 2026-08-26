// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Deployed to GitHub Pages under /portfolio.
// For a future custom domain: set SITE to the domain and BASE to "" (see docs/DEPLOYMENT notes in README).
const SITE = process.env.PUBLIC_SITE_URL ?? "https://mateoosoriodelhonte.github.io";
const BASE = process.env.PUBLIC_BASE_PATH ?? "/portfolio";

export default defineConfig({
  site: SITE,
  base: BASE,
  devToolbar: { enabled: false },
  trailingSlash: "ignore",
  // Keep HTML-aware whitespace handling: the site leans on inline serif/mono
  // spans inside running text, where JSX-style compression would eat spaces.
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes("/resume/") })],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light-high-contrast",
        dark: "github-dark",
      },
      defaultColor: false,
    },
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Newsreader",
      cssVariable: "--font-newsreader",
      weights: ["200 800"],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["Georgia", "Times New Roman", "serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Geist",
      cssVariable: "--font-geist",
      weights: ["100 900"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
      weights: ["300 600"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
    },
  ],
});
