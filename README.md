# Harmonic Tools

Website for [harmonic.tools](https://harmonic.tools)

## Structure

```
harmonic-tools/
├── _config.yml              # Jekyll configuration
├── CNAME                    # Domain configuration (harmonic.tools)
├── README.md
└── docs/                    # GitHub Pages root
    ├── index.html           # Redirect page (language detection)
    ├── favicon.svg
    ├── privacy.html         # Privacy policy (redirect)
    ├── terms.html           # Terms of service (redirect)
    ├── assets/
    │   ├── css/
    │   │   └── styles.css   # Main stylesheet
    │   ├── images/
    │   │   ├── BeatBar/     # BeatBar screenshots (localized)
    │   │   ├── BeatBarPocket/
    │   │   ├── BeatLab/
    │   │   ├── BeatLabiOS/
    │   │   └── ...
    │   └── js/
    │       ├── main.js      # Theme toggle & utilities
    │       └── redirect.js  # Language redirect logic
    ├── products/            # Product pages (redirect)
    ├── en/                  # English locale
    │   ├── index.html       # Main landing page
    │   ├── privacy.html     # Privacy policy
    │   ├── terms.html       # Terms of service
    │   └── products/
    │       ├── beatbar.html
    │       ├── beatbar-pocket.html
    │       ├── beatlab.html
    │       └── beatlab-ios.html
    └── pl/                  # Polish locale
        ├── index.html
        ├── privacy.html
        ├── terms.html
        └── products/
            └── ...
```

## Products

- **BeatBar** — Timing calculator for macOS
- **BeatBar Pocket** — Timing calculator for iOS
- **BeatLab** — Music theory explorer for macOS
- **BeatLab iOS** — Music theory explorer for iOS

## Localization

The site supports multiple languages. Currently available:

- English (`/en/`)
- Polish (`/pl/`)

To add a new language:

1. Create a new folder under `docs/` (e.g., `docs/de/` for German)
2. Copy the English files and translate content
3. Update `docs/index.html` to add the new language redirect
4. Update language selectors in all HTML files
5. Add localized screenshots to `docs/assets/images/*/`

## Local Development

Open `docs/en/index.html` in a browser, or use a local server:

```bash
cd docs && python3 -m http.server 8080
```

Then visit `http://localhost:8080/en/`

## Deployment

The site is deployed via GitHub Pages from the `docs/` folder on the `main` branch.

## Related Repositories

- [omega1119.github.io](https://github.com/omega1119/omega1119.github.io) — gitc.digital website
- [nullform-audio](https://github.com/omega1119/nullform-audio) — nullform.audio website