# AlphaMindPlus — Static Website

Production-ready, fully static marketing website for AlphaMindPlus (European FinTech & Technology). The site is optimized for GitHub Pages and built with HTML, CSS and JavaScript.

Structure

- `index.html` — Landing page
- `about.html` — About page
- `careers.html` — Careers and job listings (search + filter)
- `assets/css/styles.css` — Main stylesheet (source)
- `assets/js/main.js` — UI, particles, counters (source)
- `assets/js/jobs.js` — Jobs data and careers UI (source)
- `assets/images/favicon.svg` — Brand mark (source)

Build & Local preview

Install dev dependencies and build minified assets:

```bash
npm ci
npm run build
```

Preview locally (production-like):

```bash
npm start
# then open http://localhost:8080
```

For a quick, non-minified preview you can use Python's server:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

CI

The repository includes a GitHub Actions workflow `.github/workflows/ci.yml` that builds assets and runs HTML validation, Pa11y accessibility checks, and internal link checking on push/PR to `main`.

Deployment

This repository is named `AlphaMindPlus.github.io`, so GitHub Pages will serve the `main` branch at:

https://AlphaMindPlus.github.io

If you want automated deployments from build outputs rather than source files, we can add a workflow to build and push the `assets/dist` artifacts to the Pages branch or enable Pages from the `gh-pages` branch.

