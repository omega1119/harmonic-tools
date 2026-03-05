# Multilingual Support Setup

This site uses a **static, per-language folder** approach (no JavaScript-based translations).

## Supported Languages (current)

- **English**: `/en/`
- **Polish**: `/pl/`
- **French**: `/fr/`
- **German**: `/de/`

Each language has its own fully rendered HTML pages. Language switching is done via a dropdown in the header and automatic geo/locale-based redirection.

## How It Works

- **Canonical content** lives under `/en/` and `/pl/`.
- **Root-level URLs** (like `/index.html`, `/privacy.html`, `/products/*.html`) use `redirect.js` to detect the user's language via browser locale and IP geolocation, then redirect to the appropriate language folder.
- **Language dropdown** in every page header lets users manually switch between English, Polski, Français, and Deutsch.
- **SEO** uses `hreflang` alternates for `en`, `pl`, `fr`, `de`, and `x-default`.
- **`redirect.js`** uses a `SUPPORTED_LANGS` array and `COUNTRY_TO_LANG` map. It checks `navigator.languages` for `pl`, `fr`, or `de` prefixes first, then falls back to an IP geolocation lookup via `ipapi.co` to detect Poland (`PL`), France (`FR`), Germany (`DE`), Austria (`AT`), or Switzerland (`CH`). English is the default fallback. Adding a new language only requires extending these two data structures and adding `data-redirect-XX` attributes to root stubs.

## Site Structure

```
/index.html              → redirect stub (uses redirect.js)
/privacy.html            → redirect stub (uses redirect.js)
/terms.html              → redirect stub (uses redirect.js)
/products/*.html         → redirect stubs (use redirect.js)
/en/                     → English pages
/en/index.html
/en/privacy.html
/en/terms.html
/en/products/metric.html
/en/products/metric-ios.html
/en/products/modes.html
/en/products/modes-ios.html
/pl/                     → Polish pages
/pl/index.html
/pl/privacy.html
/pl/terms.html
/pl/products/metric.html
/pl/products/metric-ios.html
/pl/products/modes.html
/pl/products/modes-ios.html
/fr/                     → French pages
/fr/index.html
/fr/privacy.html
/fr/terms.html
/fr/products/metric.html
/fr/products/metric-ios.html
/fr/products/modes.html
/fr/products/modes-ios.html
/de/                     → German pages
/de/index.html
/de/privacy.html
/de/terms.html
/de/products/metric.html
/de/products/metric-ios.html
/de/products/modes.html
/de/products/modes-ios.html
/assets/                 → shared CSS, JS, images
```

## Adding Another Language (later)

1. Copy one of the existing language folders (usually `/en/`) to a new folder (e.g. `/de/`).
2. Translate the HTML copy in that new folder.
3. Update `redirect.js` to add a new `data-redirect-XX` attribute and locale/country detection.
4. Update root-level redirect stubs to include the new `data-redirect-XX` attribute.
5. Update the language dropdown links and `hreflang` tags across all language pages.

## Local Testing

Run a server at the repo root:

```bash
python3 -m http.server 8080
```

Then open:

- `http://localhost:8080/en/`
- `http://localhost:8080/pl/`
- `http://localhost:8080/fr/`
- `http://localhost:8080/de/`
