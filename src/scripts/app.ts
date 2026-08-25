/**
 * All client-side behavior for the site. Intentionally small: theme toggle,
 * mobile menu, header scroll state, and reveal-on-scroll. No framework.
 */

export {};

const root = document.documentElement;

/* ------------------------------------------------------------------ theme */

function currentTheme(): "light" | "dark" {
  return root.dataset.theme === "dark" ? "dark" : "light";
}

function applyTheme(theme: "light" | "dark", persist: boolean) {
  root.dataset.theme = theme;
  if (persist) {
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* private mode — theme just won't persist */
    }
  }
}

/* ----------------------------------------------------- one-time listeners */

declare global {
  interface Window {
    __appInit?: boolean;
  }
}

if (!window.__appInit) {
  window.__appInit = true;

  // Event delegation survives view-transition DOM swaps.
  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    if (target.closest("#theme-toggle")) {
      applyTheme(currentTheme() === "dark" ? "light" : "dark", true);
      return;
    }

    const menuButton = target.closest("#menu-toggle");
    if (menuButton) {
      const open = root.classList.toggle("menu-open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      return;
    }

    // Navigating from inside the mobile menu closes it.
    if (target.closest("#mobile-menu a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && root.classList.contains("menu-open")) {
      closeMenu();
      (document.querySelector("#menu-toggle") as HTMLElement | null)?.focus();
    }
  });

  // Follow OS preference live unless the visitor made an explicit choice.
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("theme");
    } catch {}
    if (stored !== "light" && stored !== "dark") {
      applyTheme(event.matches ? "dark" : "light", false);
    }
  });

  document.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("astro:after-swap", () => {
    closeMenu();
    onScroll();
  });
  document.addEventListener("astro:page-load", initPage);
}

function closeMenu() {
  root.classList.remove("menu-open");
  const button = document.querySelector("#menu-toggle");
  button?.setAttribute("aria-expanded", "false");
  button?.setAttribute("aria-label", "Open menu");
}

/* ------------------------------------------------------------ scroll state */

function onScroll() {
  document.querySelector("#site-header")?.classList.toggle("is-scrolled", window.scrollY > 8);
}

/* --------------------------------------------------------------- reveals */

let observer: IntersectionObserver | undefined;

function initPage() {
  onScroll();

  observer?.disconnect();

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");

  if (reduced) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer?.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
  );

  targets.forEach((el) => observer?.observe(el));
}

// astro:page-load fires on first load too — but only after the router is
// active. Run once directly so the initial page never waits.
initPage();
