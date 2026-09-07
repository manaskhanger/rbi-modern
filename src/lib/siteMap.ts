/** Hierarchical site map for breadcrumbs, sitemap page, and explore rails. */

export type Crumb = { label: string; to?: string }

export type SitemapLink = { label: string; to: string; note?: string }

export type SitemapSection = {
  id: string
  title: string
  to: string
  description: string
  children: SitemapLink[]
}

/** Static section landings (no seeded item lists). */
export const sectionLandings: SitemapLink[] = [
  { label: 'Home', to: '/' },
  { label: 'About & mandate', to: '/about' },
  { label: 'About this prototype', to: '/about/prototype' },
  { label: 'Guided tour', to: '/tour' },
  { label: 'Monetary policy', to: '/monetary-policy' },
  { label: 'Offices', to: '/offices' },
  { label: 'Masters Directions', to: '/masters-directions' },
  { label: 'Circulars', to: '/circulars' },
  { label: 'News', to: '/news' },
  { label: 'Reports', to: '/reports' },
  { label: 'Sample data lab', to: '/data' },
  { label: 'Learn & glossary', to: '/learn' },
  { label: 'Search', to: '/search' },
  { label: 'Sitemap', to: '/sitemap' },
]

/** Explore-next / related rails by page path (exact or prefix). */
export const exploreRails: Record<string, { title: string; links: SitemapLink[] }> = {
  '/about': {
    title: 'Explore next',
    links: [
      { label: 'Monetary policy', to: '/monetary-policy', note: 'MPC & inflation targeting' },
      { label: 'Masters Directions', to: '/masters-directions', note: 'Regulatory catalogue' },
      { label: 'Learn & glossary', to: '/learn', note: 'Plain-language primers' },
      { label: 'About this prototype', to: '/about/prototype', note: 'Trust & framing' },
    ],
  },
  '/about/prototype': {
    title: 'Continue exploring',
    links: [
      { label: 'Guided tour', to: '/tour', note: 'Persona walkthroughs' },
      { label: 'About & mandate', to: '/about', note: 'Organisation framing' },
      { label: 'Sitemap', to: '/sitemap', note: 'Full route map' },
      { label: 'Home', to: '/', note: 'Start over' },
    ],
  },
  '/prototype': {
    title: 'Continue exploring',
    links: [
      { label: 'Guided tour', to: '/tour', note: 'Persona walkthroughs' },
      { label: 'About & mandate', to: '/about', note: 'Organisation framing' },
      { label: 'Sitemap', to: '/sitemap', note: 'Full route map' },
      { label: 'Home', to: '/', note: 'Start over' },
    ],
  },
  '/monetary-policy': {
    title: 'Related',
    links: [
      { label: 'Sample data lab', to: '/data', note: 'Illustrative rates & indicators' },
      { label: 'Reports', to: '/reports', note: 'MPR-style digest' },
      { label: 'News', to: '/news', note: 'MPC-style notes' },
      { label: 'Learn', to: '/learn', note: 'Glossary terms' },
    ],
  },
  '/learn': {
    title: 'Related',
    links: [
      { label: 'Monetary policy', to: '/monetary-policy', note: 'Rates & targeting' },
      { label: 'Masters Directions', to: '/masters-directions', note: 'Regulatory themes' },
      { label: 'Data lab', to: '/data', note: 'Sample series' },
      { label: 'Tour', to: '/tour', note: 'Guided walkthrough' },
    ],
  },
  '/data': {
    title: 'Related',
    links: [
      { label: 'Monetary policy', to: '/monetary-policy', note: 'Policy rate story' },
      { label: 'Reports', to: '/reports', note: 'Publication digests' },
      { label: 'Learn', to: '/learn', note: 'Glossary' },
      { label: 'News', to: '/news', note: 'Updates' },
    ],
  },
  '/offices': {
    title: 'Related',
    links: [
      { label: 'About & mandate', to: '/about', note: 'Organisation' },
      { label: 'Tour', to: '/tour', note: 'Persona paths' },
      { label: 'Circulars', to: '/circulars', note: 'Regulatory updates' },
      { label: 'Sitemap', to: '/sitemap', note: 'All routes' },
    ],
  },
  '/tour': {
    title: 'After the tour',
    links: [
      { label: 'Masters Directions', to: '/masters-directions', note: 'Officer path' },
      { label: 'Learn', to: '/learn', note: 'Student path' },
      { label: 'Data lab', to: '/data', note: 'Analyst path' },
      { label: 'About this prototype', to: '/about/prototype', note: 'Trust framing' },
    ],
  },
  '/masters-directions': {
    title: 'Explore next',
    links: [
      { label: 'Circulars', to: '/circulars', note: 'Related instruments' },
      { label: 'Learn', to: '/learn', note: 'Plain language' },
      { label: 'Search', to: '/search', note: 'Find by keyword' },
      { label: 'Sitemap', to: '/sitemap', note: 'All directions listed' },
    ],
  },
  '/circulars': {
    title: 'Explore next',
    links: [
      { label: 'Masters Directions', to: '/masters-directions', note: 'Parent themes' },
      { label: 'News', to: '/news', note: 'Public updates' },
      { label: 'Search', to: '/search', note: 'Find by keyword' },
      { label: 'Sitemap', to: '/sitemap', note: 'Full catalogue' },
    ],
  },
  '/news': {
    title: 'Explore next',
    links: [
      { label: 'Reports', to: '/reports', note: 'Deeper digests' },
      { label: 'Monetary policy', to: '/monetary-policy', note: 'Policy context' },
      { label: 'Circulars', to: '/circulars', note: 'Regulatory notes' },
      { label: 'Sitemap', to: '/sitemap', note: 'All articles' },
    ],
  },
  '/reports': {
    title: 'Explore next',
    links: [
      { label: 'Data lab', to: '/data', note: 'Sample indicators' },
      { label: 'Monetary policy', to: '/monetary-policy', note: 'Policy framing' },
      { label: 'News', to: '/news', note: 'Press-style notes' },
      { label: 'Sitemap', to: '/sitemap', note: 'All reports' },
    ],
  },
  '/search': {
    title: 'Browse instead',
    links: [
      { label: 'Sitemap', to: '/sitemap', note: 'Hierarchical map' },
      { label: 'Masters Directions', to: '/masters-directions' },
      { label: 'Circulars', to: '/circulars' },
      { label: 'Tour', to: '/tour' },
    ],
  },
  '/sitemap': {
    title: 'Popular starts',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Guided tour', to: '/tour' },
      { label: 'Masters Directions', to: '/masters-directions' },
      { label: 'About this prototype', to: '/about/prototype' },
    ],
  },
}

const staticCrumbLabels: Record<string, string> = {
  '/': 'Home',
  '/about': 'About',
  '/about/prototype': 'About this prototype',
  '/prototype': 'About this prototype',
  '/tour': 'Guided tour',
  '/monetary-policy': 'Monetary policy',
  '/offices': 'Offices',
  '/masters-directions': 'Masters Directions',
  '/circulars': 'Circulars',
  '/news': 'News',
  '/reports': 'Reports',
  '/data': 'Data',
  '/learn': 'Learn',
  '/search': 'Search',
  '/sitemap': 'Sitemap',
}

/**
 * Build breadcrumb trail for a pathname (basename already stripped by React Router).
 * Detail pages pass `itemLabel` for the leaf crumb.
 */
export function crumbsForPath(pathname: string, itemLabel?: string): Crumb[] {
  const path = pathname.replace(/\/$/, '') || '/'
  if (path === '/') return []

  const crumbs: Crumb[] = [{ label: 'Home', to: '/' }]

  const detailMatch = path.match(
    /^\/(masters-directions|circulars|news|reports)\/([^/]+)$/,
  )
  if (detailMatch) {
    const section = `/${detailMatch[1]}`
    crumbs.push({
      label: staticCrumbLabels[section] ?? detailMatch[1],
      to: section,
    })
    crumbs.push({ label: itemLabel || decodeURIComponent(detailMatch[2]) })
    return crumbs
  }

  if (path === '/about/prototype' || path === '/prototype') {
    crumbs.push({ label: 'About', to: '/about' })
    crumbs.push({ label: 'About this prototype' })
    return crumbs
  }

  const label = staticCrumbLabels[path]
  if (label) {
    crumbs.push({ label })
    return crumbs
  }

  // Fallback: last segment
  const parts = path.split('/').filter(Boolean)
  let acc = ''
  parts.forEach((part, i) => {
    acc += `/${part}`
    const isLast = i === parts.length - 1
    crumbs.push({
      label: staticCrumbLabels[acc] ?? part.replace(/-/g, ' '),
      to: isLast ? undefined : acc,
    })
  })
  return crumbs
}

export function exploreForPath(pathname: string) {
  const path = pathname.replace(/\/$/, '') || '/'
  return exploreRails[path]
}
