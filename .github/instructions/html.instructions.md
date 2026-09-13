---
applyTo: "**/*.html"
---

- Use semantic markup (`header`, `nav`, `main`, `section`, `footer`) over generic
  `div`s where an element already means the right thing.
- Every localized page carries the full `hreflang` block: one
  `<link rel="alternate" hreflang="...">` per supported locale plus `x-default`,
  and the page's own locale must be included (self-reference), pointing at the
  correct relative path.
- The `data-languages` JSON attribute on `.language-selector` elements must be
  valid JSON, list every supported locale, and use correct relative paths for the
  page's depth (e.g. `./`, `../de/`, `../../de/products/metric.html`). Keep
  `data-active-lang` in sync with the page's actual locale.
- Every `<img>` needs `alt` text. Empty `alt=""` is only correct for a purely
  decorative image.
- Every page needs a `<title>`, a meta `description`, and `og:` / `twitter:` image
  tags that match what the page actually shows — don't copy another page's tags
  without updating them.
