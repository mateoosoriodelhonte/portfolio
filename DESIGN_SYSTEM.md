# Design system — "Technical Editorial"

The visual system exists to express one idea: **software that shows its work.** Every choice
below serves that idea; anything that didn't was cut. This document is the reasoning, so future
changes can stay coherent. The implementation is `src/styles/global.css`.

## Concept

The site reads like a well-set technical document: warm paper, ink, hairline rules, monospace
annotations in the margins — then one editorial serif voice for the statements that matter.
Restraint is the aesthetic. The look references print and instrumentation rather than
contemporary SaaS, which is also why it avoids the current AI-generated-site clichés (glow,
gradient text, bento-everything, purple).

## Color

Two palettes, designed separately — dark is not inverted light.

| Token              | Light               | Dark                | Role                                  |
| ------------------ | ------------------- | ------------------- | ------------------------------------- |
| `--paper`          | `#f6f4ef` warm bone | `#151311` warm char | page ground                           |
| `--surface`        | `#fcfbf8`           | `#1c1a17`           | raised bands, cards                   |
| `--surface-sunken` | `#efece5`           | `#100f0d`           | wells: terminals, code, image trays   |
| `--ink`            | `#1c1a17`           | `#ece8e0`           | primary text                          |
| `--ink-muted`      | `#56524a`           | `#aca69b`           | body/secondary text                   |
| `--ink-faint`      | `#67625b`           | `#8b857a`           | annotations — kept AA on both grounds |
| `--accent`         | `#226b50` viridian  | `#74bf9d` mint      | the single accent                     |
| `--caution`        | `#7d5114`           | `#cfa05c`           | "open/pending" chips only             |

Rules:

- **One accent.** The green carries "verified / evidence / go" semantics (it is the color of a
  passing check), used for: links on hover, italic emphasis words, active markers, focus rings,
  chips. Never for large surfaces.
- `--caution` exists solely for pending-state chips (e.g. the open PR). It is not a second
  brand color.
- Hairlines (`--line`) do almost all structural work; shadows are reserved for media
  (`--shadow-soft`, `--shadow-lift`) and stay warm-tinted and diffuse.
- Both themes maintain WCAG AA: body text ≥ 7:1, annotations ≥ 4.5:1 — enforced by axe scans
  in CI, not by intention alone.

## Type

| Face                                                 | Role                                                                                      |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Newsreader** (serif, optical sizing, real italics) | display headlines, editorial emphasis, article body                                       |
| **Geist** (grotesk)                                  | UI, navigation, body text on non-article pages                                            |
| **Geist Mono**                                       | eyebrows, annotations, facts, chips, code — anything that is _metadata about the content_ |

The serif italic + accent combination (`<em class="italic text-accent">`) is the house
signature — used for exactly one or two words per display statement, the word doing the
argumentative work ("_shows_", "_verifiable_", "_useful_").

Scale is fluid (`clamp()`) with four display sizes (`display-xl`, `display`, `title`, `lede`)
defined as Tailwind theme tokens. Tracking tightens as size grows (−0.028em at display-xl).
Reading measures: 46rem for case prose, 44rem/~68ch for articles.

## Recurring pieces

- **Eyebrow** — mono, uppercase, letter-spaced section label, often `NN — Label` with the
  number in accent. Every major section starts with one; they are the site's running heads.
- **Hairline rules** — `hairline-t/b` borders structure everything: section starts, list rows,
  spec sheets. If a container can be drawn with one line instead of a box, it is.
- **Chips** — pill-shaped mono status tokens (`chip--go`, `chip--open`) borrowed from
  Gatehouse's verdict language; used for real states only, never decoration.
- **Evidence links** — dotted underlines (`.evidence-link`) mark claims that link to proof.
  Solid-growing underlines (`.link-under`) are ordinary navigation.
- **Media frames** — screenshots sit in a shallow sunken tray with a hairline (`.media-frame`),
  optionally with faux window chrome or the phone bezel. Nothing floats naked, and there are no
  fake laptop mockups.
- **Grain** — a fixed, non-interactive SVG-noise layer at ~3% opacity gives paper texture; it
  is one element, costs nothing to scroll, and is removed for print.

## Motion

Motion states an argument's structure; it never performs. Global rules:

- Two easings only: `--ease-out-quart` for entrances, `--ease-swift` for micro-interactions.
- Reveal-on-scroll: 16px rise + fade, 70ms stagger steps (`--reveal-i`).
- Hero: line-mask rise on load, then never again.
- View transitions: a quiet 220ms/340ms cross-fade with an 8px rise.
- One scroll-choreographed moment per page maximum (RepoSignal's pipeline is the flagship).
- **Reduced motion is structural**: the hidden states exist only inside
  `@media (prefers-reduced-motion: no-preference)`, so `reduce` users get a static page by
  construction. Tested in CI.

## Layout

- Container: 76rem max, `clamp` gutters.
- Sections breathe: 6–9rem vertical padding, more around statements.
- Asymmetry over symmetry: 12-column grids split 5/7, 7/5, 4/8 — never three identical cards.
  The three project tiers on the homepage (flagship / pair / typographic rows) exist precisely
  to avoid uniform cards.
- Mobile is designed, not shrunk: single column, tightened eyebrows, the phone row collapses to
  one device, the sticky pipeline becomes a static legend above its steps.

## Voice

Copy rules, enforced in review: concrete nouns, verifiable numbers with links, no
"passionate", no "innovative", no "cutting-edge", no exclamation marks. Statements a hiring
manager could falsify are preferred over adjectives they'd have to trust. Honest-unknown
labels ("Draft", "open · awaiting review", "UNKNOWN") are kept visible — they are the brand.
