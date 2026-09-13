<!-- BEGIN GENERATED (web-common/agents/copilot-instructions.md -- edits here are overwritten by tools/sync-agent-config.sh) -->

# Agent instructions

This is a static site: hand-written HTML, CSS, and vanilla JS, deployed to GitHub
Pages from the `main` branch. There is no build step, no npm, no bundler, and no
framework (React, Vue, a static site generator's templating, etc.). Edit the HTML
files directly — do not introduce a build pipeline to "improve" this.

## Never change these without explicit approval

These are load-bearing. Changing them silently breaks live URLs, analytics history,
or JS that reads them by exact string:

- **URL slugs and file paths** (e.g. `en/products/metric.html`). Renaming or moving
  a page breaks bookmarks, search rankings, and inbound links from the App Store or
  other sites.
- **Anchor IDs** (`id="..."` targeted by in-page links or external deep links).
- **The Google Analytics measurement ID** (`G-XXXXXXXXXX` in the `gtag.js` snippet).
  Changing it silently orphans historical analytics data.
- **`data-*` attribute contracts** read by `assets/js/main.js` and
  `assets/js/redirect.js` — e.g. `data-languages`, `data-active-lang`,
  `data-footer-type`, `data-store` / `data-store-product`, `data-redirect-<lang>`,
  `data-theme` on `<source>` elements. These scripts parse specific attribute names
  and values; renaming or restructuring one without updating the JS (and every HTML
  file that uses it) breaks the feature with no error.

## General conventions

- No external `<script src>` beyond Google's `gtag.js` — do not add other
  third-party scripts without asking first.
- No new Google Fonts or other external stylesheet `<link>` tags on repos that
  currently use the system font stack — that is a deliberate choice, not a gap.
- When adding a page, copy an existing locale's page as the template rather than
  writing one from scratch, to keep markup structure consistent across locales.

<!-- END GENERATED -->

<!-- Per-repo notes go below this line. Never touched by the sync script. -->

## harmonic-tools specifics

- Domain `harmonic.tools`. Publisher Greenwood IT Consultancy Ltd.
- Google Analytics measurement ID `G-JQ9FPYHNVR` — unique to this repo. It is NOT
  shared with `plugscope-app` (that repo has its own ID, `G-WMME265SQC`); an earlier
  version of this note was wrong. `nullform-audio` and `omega1119.github.io` each have
  their own IDs too; `bidmetric-web` and `ihr` have no analytics wired in yet.
- 11 locales: `en`, `de`, `es`, `fr`, `pl`, `ja`, `ko`, `pt-br`, `pt-pt`, `zh-hans`,
  `zh-hant`.
- Products, each with an iOS and a macOS page: Metric, Modes, Modes Guitar. A
  product has a root redirect shell at `products/<name>.html` /
  `products/<name>-ios.html`, and a real page per locale at
  `<locale>/products/<name>.html` / `<locale>/products/<name>-ios.html`.
- See [.github/instructions/theory-tables.instructions.md](.github/instructions/theory-tables.instructions.md)
  for the rule keeping theory-table content in English across all locales.
