/**
 * Build-time GitHub lookups. The site is static — this runs during `astro build`
 * only, and every consumer must tolerate the fallback so the build never
 * depends on GitHub being reachable.
 */

export interface PrState {
  state: "open" | "merged" | "closed";
  title: string;
  /** ISO date the state was confirmed (build time on success). */
  verifiedAt: string;
  /** True when this is live API data rather than the committed fallback. */
  live: boolean;
}

/**
 * Last state confirmed by hand; used when the API is unreachable or
 * rate-limited at build time. Update alongside any observed change.
 */
const SANDPLOVER_FALLBACK: PrState = {
  state: "open",
  title: "Fix compensation NaN validation after clipping",
  verifiedAt: "2026-08-25",
  live: false,
};

export async function sandploverPrState(): Promise<PrState> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "mateo-portfolio-build",
    };
    const token = process.env.GITHUB_TOKEN;
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(
      "https://api.github.com/repos/sandpiper-toolchain/sandplover/pulls/261",
      {
        headers,
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!res.ok) return SANDPLOVER_FALLBACK;

    const pr = (await res.json()) as { state: string; merged: boolean; title: string };
    return {
      state: pr.merged ? "merged" : pr.state === "open" ? "open" : "closed",
      title: pr.title,
      verifiedAt: new Date().toISOString().slice(0, 10),
      live: true,
    };
  } catch {
    return SANDPLOVER_FALLBACK;
  }
}
