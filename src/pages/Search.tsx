import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search as SearchIcon, ExternalLink } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Badge } from '../components/Badge'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { ExploreNext } from '../components/ExploreNext'
import { searchAll, type SearchResultType } from '../lib/searchIndex'
import { RBI_HOME } from '../data/meta'

const typeTone: Record<SearchResultType, 'gold' | 'navy' | 'muted'> = {
  'Masters Direction': 'gold',
  Circular: 'navy',
  News: 'muted',
  Report: 'muted',
  Glossary: 'muted',
  Function: 'navy',
  Citizens: 'muted',
}

export function Search() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''

  const results = useMemo(() => searchAll(q), [q])

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const next = String(fd.get('q') ?? '').trim()
    setParams(next ? { q: next } : {})
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <PageHeader
        eyebrow="Findability"
        title="Search"
        description="Search educational summaries across Masters Directions, circulars, news, reports, and glossary entries. Sample content only — not an official RBI search."
      />

      <form onSubmit={onSubmit} className="mb-8" role="search">
        <label htmlFor="global-search-q" className="sr-only">
          Search the prototype
        </label>
        <div className="relative max-w-xl">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input
            id="global-search-q"
            name="q"
            defaultValue={q}
            key={q}
            autoFocus
            placeholder="Search titles, codes, topics…"
            className="w-full rounded-xl border border-navy/10 bg-white py-2.5 pl-10 pr-24 text-sm outline-none ring-gold/40 focus:ring-2 dark:border-white/15 dark:bg-navy-light"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-navy px-3 py-1.5 text-xs font-medium text-cream dark:bg-gold dark:text-navy"
          >
            Search
          </button>
        </div>
      </form>

      {!q.trim() && (
        <div className="rounded-xl border border-dashed border-navy/20 bg-white/50 px-6 py-14 text-center dark:border-white/15 dark:bg-navy-light/30">
          <p className="text-sm text-ink-muted dark:text-cream/60">
            Enter a term to search Masters Directions, circulars, news, reports, and glossary entries.
          </p>
          <p className="mt-2 text-xs text-ink-muted/80 dark:text-cream/45">
            Try “KYC”, “liquidity”, “UPI”, or “repo”.
          </p>
        </div>
      )}


      {q.trim() && results.length <= 3 && (
        <div className="mb-6 rounded-xl border border-navy/15 bg-white/80 px-4 py-4 dark:border-white/15 dark:bg-navy-light/40">
          <p className="text-sm font-semibold text-navy dark:text-cream">
            Search on official RBI
          </p>
          <p className="mt-1 text-xs text-ink-muted dark:text-cream/60">
            Local prototype results are sparse or empty for some queries. Use the official site for authoritative notifications, press releases and Master Directions.
          </p>
          <a
            href={`${RBI_HOME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-dim hover:underline dark:text-gold"
          >
            Open rbi.org.in <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a
            href={`https://www.google.com/search?q=site%3Arbi.org.in+${encodeURIComponent(q.trim())}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 ml-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:underline dark:text-cream/70"
          >
            Site search via Google (rbi.org.in) <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      )}

      {q.trim() && results.length === 0 && (
        <div className="rounded-xl border border-dashed border-navy/20 px-6 py-14 text-center dark:border-white/15">
          <p className="text-sm text-ink-muted dark:text-cream/60">
            No results for “{q.trim()}”.
          </p>
          <a
            href={RBI_HOME}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-gold-dim underline dark:text-gold"
          >
            Search on official RBI (rbi.org.in) <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <button
            type="button"
            className="mt-3 block text-sm font-medium text-gold-dim underline dark:text-gold"
            onClick={() => setParams({})}
          >
            Clear search
          </button>
        </div>
      )}

      {q.trim() && results.length > 0 && (
        <>
          <p className="mb-4 text-sm text-ink-muted dark:text-cream/55">
            {results.length} result{results.length === 1 ? '' : 's'} for “{q.trim()}”
          </p>
          <ul className="space-y-2">
            {results.map((r) => (
              <li key={r.id}>
                <Link
                  to={r.href}
                  className="block rounded-xl border border-navy/10 bg-white/90 p-4 transition hover:border-gold/40 dark:border-white/10 dark:bg-navy-light/50 dark:hover:border-gold/30"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={typeTone[r.type]}>{r.type}</Badge>
                    {r.meta && (
                      <span className="font-mono text-[11px] text-ink-muted dark:text-cream/45">
                        {r.meta}
                      </span>
                    )}
                  </div>
                  <h2 className="mt-1.5 text-sm font-semibold text-navy dark:text-cream">{r.title}</h2>
                  <p className="mt-1 text-sm text-ink-muted dark:text-cream/65">{r.snippet}</p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      <ExploreNext pathname="/search" />
      <div className="mt-10">
        <DisclaimerBanner />
      </div>
    </div>
  )
}
