import { circulars } from './circulars'
import { mastersDirections } from './mastersDirections'
import { newsItems } from './news'
import { reports } from './reports'
import { whatsNewItems } from './whatsNew'

export type FeedKind = 'Circular' | 'Direction' | 'News' | 'Report'

export type LiveFeedItem = {
  id: string
  kind: FeedKind
  date: string
  title: string
  to: string
  /** Official PDF / index when available (circulars & directions) */
  pdfUrl?: string
  pdfMode?: 'pdf' | 'index'
}

function buildFeed(): LiveFeedItem[] {
  const fromWhatsNew: LiveFeedItem[] = whatsNewItems.slice(0, 25).map((w) => ({
    id: `wn-${w.id}`,
    kind: (w.kind === 'Direction'
      ? 'Direction'
      : w.kind === 'Circular'
        ? 'Circular'
        : w.kind === 'Report'
          ? 'Report'
          : 'News') as FeedKind,
    date: w.date,
    title: w.title,
    // Keep ticker internal; PDF button carries official outbound when present
    to: w.to || '/news',
    pdfUrl: w.pdfUrl || w.officialUrl,
    pdfMode: w.pdfUrl || w.officialUrl ? ('pdf' as const) : undefined,
  }))
  const items: LiveFeedItem[] = [
    ...fromWhatsNew,
    ...circulars.map((c) => ({
      id: `circular-${c.slug}`,
      kind: 'Circular' as const,
      date: c.date,
      title: c.title,
      to: `/circulars/${c.slug}`,
      pdfUrl: c.officialPdfUrl,
      pdfMode: c.pdfMode,
    })),
    ...mastersDirections.map((d) => ({
      id: `direction-${d.slug}`,
      kind: 'Direction' as const,
      date: d.updated || d.issued,
      title: d.title,
      to: `/masters-directions/${d.slug}`,
      pdfUrl: d.officialPdfUrl,
      pdfMode: d.pdfMode,
    })),
    ...newsItems.map((n) => ({
      id: `news-${n.slug}`,
      kind: 'News' as const,
      date: n.date,
      title: n.title,
      to: `/news/${n.slug}`,
    })),
    ...reports.map((r) => ({
      id: `report-${r.slug}`,
      kind: 'Report' as const,
      date: r.date,
      title: r.title,
      to: `/reports/${r.slug}`,
    })),
  ]
  return items.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}

/** Newest-first illustrative feed for the live ticker. */
export const liveFeedItems: LiveFeedItem[] = buildFeed()
