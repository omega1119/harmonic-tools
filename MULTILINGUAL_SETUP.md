# Multilingual Support Setup

This site uses a **static, per-language folder** approach (no JavaScript-based translations).

## Supported Languages (current)

- **English**: `/docs/en/`
- **Polish**: `/docs/pl/`

Each language has its own fully rendered HTML pages. Language switching is done with plain links.

## How It Works

- **Canonical content** lives under `/docs/en/` and `/docs/pl/`.
- **Legacy URLs** (like `/docs/index.html`, `/docs/privacy.html`, `/docs/products/*.html`) are kept as small HTML redirect stubs that point into `/docs/en/...`.
- **SEO** uses `hreflang` alternates for `en` and `pl`.

## Adding Another Language (later)

1. Copy one of the existing language folders (usually `/docs/en/`) to a new folder (e.g. `/docs/de/`).
2. Translate the HTML copy in that new folder.
3. Update the language dropdown links and `hreflang` tags across pages to include the new language.

## Local Testing

Run a server at the repo root:

```bash
python3 -m http.server 8080
```

Then open:

- `http://localhost:8080/docs/en/`
- `http://localhost:8080/docs/pl/`
