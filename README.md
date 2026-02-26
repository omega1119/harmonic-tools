# Harmonic Tools

Website for [harmonic.tools](https://harmonic.tools)

## Structure

```
harmonic-tools/
├── _config.yml              # Jekyll configuration
├── CNAME                    # Domain configuration (harmonic.tools)
├── favicon.svg
├── index.html               # Redirect page (language detection)
├── privacy.html             # Privacy policy (redirect)
├── terms.html               # Terms of service (redirect)
├── assets/
│   ├── css/
│   │   └── styles.css       # Main stylesheet
│   ├── images/
│   │   ├── Bezels/          # Device bezel frames
│   │   ├── Download-on-the-App-Store/
│   │   ├── Download-on-the-Mac-App-Store/
│   │   ├── MetricMac/       # Metric macOS screenshots (localized)
│   │   ├── MetriciOS/       # Metric iOS screenshots (localized)
│   │   ├── ModesMac/        # Modes macOS screenshots (localized)
│   │   ├── ModesiOS/        # Modes iOS screenshots (localized)
│   │   └── ...              # App icons, OG images, SVG assets
│   └── js/
│       ├── main.js          # Theme toggle, modals & utilities
│       └── redirect.js      # Language redirect logic
├── products/                # Product pages (redirect)
│   ├── metric.html
│   ├── metric-ios.html
│   ├── modes.html
│   └── modes-ios.html
└── en/                      # English locale
    ├── index.html           # Main landing page
    ├── privacy.html         # Privacy policy
    ├── terms.html           # Terms of service
    └── products/
        ├── metric.html
        ├── metric-ios.html
        ├── modes.html
        └── modes-ios.html
```

## Products

- **Metric** — Desktop timing lab for macOS
- **Metric iOS** — Timing toolkit for iOS
- **Modes** — Music theory workspace for macOS
- **Modes iOS** — Touch-first theory lab for iOS

## Localization

The site supports multiple languages. Currently available:

- English (`/en/`)

To add a new language:

1. Create a new locale folder at the repo root (e.g., `pl/` for Polish)
2. Copy the English files and translate content
3. Update `index.html` to add the new language redirect
4. Update language selectors in all HTML files
5. Add localized screenshots to `assets/images/*/`

## Local Development

Open `en/index.html` in a browser, or use a local server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080/en/`

## Deployment

The site is deployed via GitHub Pages from the repo root on the `main` branch.

## Related Repositories

- [omega1119.github.io](https://github.com/omega1119/omega1119.github.io) — gitc.digital website
- [nullform-audio](https://github.com/omega1119/nullform-audio) — nullform.audio website