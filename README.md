# RBI Explained — Educational Demo

A modern, mobile-first educational website about the Reserve Bank of India. Portfolio-ready v1 for local preview and iteration.

**Not an official RBI website.** All rates, charts, circulars and documents are illustrative sample data.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- Framer Motion, Recharts, React Router, lucide-react

## Quick start

```bash
cd /workspace/rbi-modern
npm install
npm run dev -- --host 0.0.0.0 --port 5173
```

Open http://localhost:5173

### Production build

```bash
npm run build
npm run preview -- --host 0.0.0.0 --port 5173
```

## Routes

- `/` — Hero, purpose, key rates strip, featured news, org teaser
- `/about` — Purpose, history timeline, org diagram, duties
- `/monetary-policy` — MPC explainer, rate charts, inflation targeting
- `/masters-directions` — Searchable catalogue
- `/masters-directions/:slug` — Detail with TOC, obligations, plain English
- `/circulars` — List + filters
- `/circulars/:slug` — Circular detail
- `/news` — Press/news cards
- `/news/:slug` — Article detail
- `/reports` — Publications
- `/reports/:slug` — Rich sample FSR-style page
- `/data` — Dashboard charts + sortable table
- `/learn` — Glossary + How RBI works
- `/offices` — Regional offices mock list

## Design notes

- Deep navy `#0B1D36`, soft gold `#C5A572`, cream surfaces
- Glass sticky nav, dark/light toggle (persisted)
- Spring scroll reveals; respects `prefers-reduced-motion`

## Disclaimer

Illustrative / educational demo only. Not affiliated with the Reserve Bank of India. Figures are sample data.
