# RBI Knowledge Prototype

Unofficial educational UX prototype.

Live: https://manaskhanger.github.io/rbi-modern/

## Stack

Vite React TS Tailwind.

## Quick start

npm install
npm run dev
npm run build (base /rbi-modern/). Copy dist/index.html to dist/404.html for SPA fallback.

## Disclaimer

Illustrative sample data only. Not affiliated with the Reserve Bank of India.

## GitHub Pages SPA fallback

After build, dist/404.html must equal dist/index.html so deep links refresh into the SPA shell. BrowserRouter basename is /rbi-modern. index.html has a tiny client redirect helper for query-style paths.

Publish dist/ to gh-pages.

## Desktop traversal

- Breadcrumbs on every non-home page
- Sitemap at /sitemap with all seeded content links
- Prev/Next navigation on detail pages
- Section hubs and related rails
