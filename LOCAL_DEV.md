# Local Development (Python Static Server)

This site is a static HTML/CSS/JS site served from the repo root. The fastest way to preview locally is with Python's built-in HTTP server.

## Prerequisites
- macOS with Python 3 installed (`python3 --version`)
- Default shell: zsh

## Start the server
```zsh
cd "/repos/harmonic-tools"
python3 -m http.server 8080
```

## Open in the browser
- Visit: `http://localhost:8080/` (redirects to `/en/`)
- English landing: `http://localhost:8080/en/`
- Product pages:
  - Metric (macOS): `http://localhost:8080/en/products/metric.html`
  - Metric iOS: `http://localhost:8080/en/products/metric-ios.html`
  - Modes (macOS): `http://localhost:8080/en/products/modes.html`
  - Modes iOS: `http://localhost:8080/en/products/modes-ios.html`

## Stop the server
- Press `Ctrl+C` in the terminal.

## Troubleshooting
- Clear cache/hard refresh if assets look stale.
- If port 8080 is in use, pick another port:
```zsh
python3 -m http.server 9000
```

## Optional: Node http-server
```zsh
npm install -g http-server
cd "/repos/harmonic-tools"
http-server -p 8080
```

## Optional: Jekyll (GitHub Pages style)
If you want to emulate a Jekyll build:
```zsh
cd "/repos/harmonic-tools"
jekyll serve --livereload
```
Then visit `http://localhost:4000/`.
