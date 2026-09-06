import { mastersDirections } from '../data/mastersDirections'
import { circulars } from '../data/circulars'
import { newsItems } from '../data/news'
import { reports } from '../data/reports'
import { glossary } from '../data/glossary'

export type SearchResultType =
  | 'Masters Direction'
  | 'Circular'
  | 'News'
  | 'Report'
  | 'Glossary'

export interface SearchResult {
  id: string
  type: SearchResultType
  title: string
  snippet: string
  href: string
  meta?: string
}

function slugifyTerm(term: string): string {
  return term
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function haystack(...parts: string[]): string {
  return parts.join(' ').toLowerCase()
}

function snippetFrom(text: string, query: string, max = 160): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (!clean) return ''
  const q = query.toLowerCase().trim()
  if (!q) return clean.slice(0, max) + (clean.length > max ? '…' : '')
  const idx = clean.toLowerCase().indexOf(q)
  if (idx < 0) return clean.slice(0, max) + (clean.length > max ? '…' : '')
  const start = Math.max(0, idx - 40)
  const end = Math.min(clean.length, idx + q.length + 100)
  const slice = clean.slice(start, end)
  return `${start > 0 ? '…' : ''}${slice}${end < clean.length ? '…' : ''}`
}

export function buildSearchCorpus(): SearchResult[] {
  const items: SearchResult[] = []

  for (const d of mastersDirections) {
    items.push({
      id: `md:${d.slug}`,
      type: 'Masters Direction',
      title: d.title,
      snippet: d.summary,
      href: `/masters-directions/${d.slug}`,
      meta: d.code,
      // stash for search — rebuild below
    })
  }

  for (const c of circulars) {
    items.push({
      id: `cir:${c.slug}`,
      type: 'Circular',
      title: c.title,
      snippet: c.summary,
      href: `/circulars/${c.slug}`,
      meta: c.ref,
    })
  }

  for (const n of newsItems) {
    items.push({
      id: `news:${n.slug}`,
      type: 'News',
      title: n.title,
      snippet: n.excerpt,
      href: `/news/${n.slug}`,
      meta: n.date,
    })
  }

  for (const r of reports) {
    items.push({
      id: `rep:${r.slug}`,
      type: 'Report',
      title: r.title,
      snippet: r.summary,
      href: `/reports/${r.slug}`,
      meta: r.type,
    })
  }

  for (const g of glossary) {
    const id = slugifyTerm(g.term)
    items.push({
      id: `gloss:${id}`,
      type: 'Glossary',
      title: g.term,
      snippet: g.definition,
      href: `/learn#glossary-${id}`,
      meta: 'Glossary',
    })
  }

  return items
}

type Indexed = SearchResult & { _hay: string }

let cached: Indexed[] | null = null

function indexedCorpus(): Indexed[] {
  if (cached) return cached
  const base = buildSearchCorpus()
  // Rebuild haystacks with full text from sources
  const hayById = new Map<string, string>()

  for (const d of mastersDirections) {
    hayById.set(
      `md:${d.slug}`,
      haystack(d.title, d.summary, d.code, d.category, d.audience, d.plainEnglish, ...d.relatedTopics),
    )
  }
  for (const c of circulars) {
    hayById.set(
      `cir:${c.slug}`,
      haystack(c.title, c.summary, c.ref, c.category, c.audience, ...c.body, ...c.relatedTopics),
    )
  }
  for (const n of newsItems) {
    hayById.set(`news:${n.slug}`, haystack(n.title, n.excerpt, n.category, ...n.body))
  }
  for (const r of reports) {
    hayById.set(`rep:${r.slug}`, haystack(r.title, r.summary, r.type))
  }
  for (const g of glossary) {
    hayById.set(`gloss:${slugifyTerm(g.term)}`, haystack(g.term, g.definition, ...(g.related ?? [])))
  }

  cached = base.map((item) => ({
    ...item,
    _hay: hayById.get(item.id) ?? haystack(item.title, item.snippet),
  }))
  return cached
}

export function searchAll(query: string): SearchResult[] {
  const q = query.toLowerCase().trim()
  if (!q) return []
  const tokens = q.split(/\s+/).filter(Boolean)
  const results: SearchResult[] = []
  for (const item of indexedCorpus()) {
    if (tokens.every((t) => item._hay.includes(t))) {
      results.push({
        id: item.id,
        type: item.type,
        title: item.title,
        snippet: snippetFrom(item.snippet, q),
        href: item.href,
        meta: item.meta,
      })
    }
  }
  // Prefer title hits
  results.sort((a, b) => {
    const at = a.title.toLowerCase().includes(q) ? 0 : 1
    const bt = b.title.toLowerCase().includes(q) ? 0 : 1
    if (at !== bt) return at - bt
    return a.title.localeCompare(b.title)
  })
  return results
}

export { slugifyTerm }
