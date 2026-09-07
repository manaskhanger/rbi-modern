import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { LayoutGrid, Table2 } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { SearchFilter } from '../components/SearchFilter'
import { CardLink } from '../components/Card'
import { Badge } from '../components/Badge'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { ExploreNext } from '../components/ExploreNext'
import { circulars, circularCategories } from '../data/circulars'
import { AUDIENCE_FILTERS, yearFromDate, type AudienceFilter } from '../data/types'
import { formatContentReviewed } from '../data/meta'

const yearOptions = [
  'All',
  ...Array.from(new Set(circulars.map((c) => yearFromDate(c.date)))).sort((a, b) =>
    b.localeCompare(a),
  ),
] as const

function audienceFromParam(raw: string | null): AudienceFilter {
  if (raw && (AUDIENCE_FILTERS as readonly string[]).includes(raw)) {
    return raw as AudienceFilter
  }
  return 'All'
}

export function Circulars() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const audience = audienceFromParam(params.get('audience'))
  const [year, setYear] = useState<string>('All')
  const [view, setView] = useState<'cards' | 'table'>('cards')

  function setAudienceFilter(v: AudienceFilter) {
    const next = new URLSearchParams(params)
    if (v === 'All') next.delete('audience')
    else next.set('audience', v)
    setParams(next, { replace: true })
  }

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return circulars.filter((c) => {
      const catOk = category === 'All' || c.category === category
      const audOk =
        audience === 'All' || c.audiences.includes(audience as Exclude<AudienceFilter, 'All'>)
      const yearOk = year === 'All' || yearFromDate(c.date) === year
      const text = `${c.title} ${c.summary} ${c.ref} ${c.audience}`.toLowerCase()
      return catOk && audOk && yearOk && (!q || text.includes(q))
    })
  }, [query, category, audience, year])

  function clearFilters() {
    setQuery('')
    setCategory('All')
    setAudienceFilter('All')
    setYear('All')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <PageHeader
        eyebrow="Regulatory updates"
        title="Circulars"
        description="Illustrative circular-style notes showing how incremental regulatory expectations might be browsed. Original educational paraphrases with sample reference codes."
      />
      <SearchFilter
        query={query}
        onQuery={setQuery}
        categories={circularCategories}
        category={category}
        onCategory={setCategory}
        audiences={AUDIENCE_FILTERS}
        audience={audience}
        onAudience={(v) => setAudienceFilter(v as AudienceFilter)}
        years={yearOptions}
        year={year}
        onYear={setYear}
        placeholder="Search circulars, refs, audience…"
      />
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-muted dark:text-cream/55">
          Showing {filtered.length} of {circulars.length}
        </p>
        <div
          className="flex rounded-md border border-navy/10 dark:border-white/15"
          role="group"
          aria-label="View mode"
        >
          <button
            type="button"
            onClick={() => setView('cards')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium ${
              view === 'cards' ? 'bg-navy text-cream dark:bg-gold dark:text-navy' : 'text-ink-muted'
            }`}
            aria-pressed={view === 'cards'}
          >
            <LayoutGrid className="h-3.5 w-3.5" /> Cards
          </button>
          <button
            type="button"
            onClick={() => setView('table')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium ${
              view === 'table' ? 'bg-navy text-cream dark:bg-gold dark:text-navy' : 'text-ink-muted'
            }`}
            aria-pressed={view === 'table'}
          >
            <Table2 className="h-3.5 w-3.5" /> Table
          </button>
        </div>
      </div>

      {view === 'cards' ? (
        <div className="space-y-2">
          {filtered.map((c) => (
            <CardLink key={c.slug} to={`/circulars/${c.slug}`} className="!rounded-xl !p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="muted">{c.category}</Badge>
                <span className="text-xs text-ink-muted dark:text-cream/45">{c.date}</span>
                <span className="font-mono text-[11px] text-gold-dim">{c.ref}</span>
              </div>
              <h2 className="mt-1.5 text-sm font-semibold text-navy dark:text-cream">{c.title}</h2>
              <p className="mt-1 text-sm text-ink-muted dark:text-cream/65">{c.summary}</p>
              <p className="mt-1.5 text-xs text-ink-muted dark:text-cream/50">
                Audience: {c.audience}
              </p>
              <p className="mt-1 flex flex-wrap gap-1">
                {c.audiences.map((a) => (
                  <span
                    key={a}
                    className="rounded border border-navy/10 px-1.5 py-0.5 text-[10px] text-ink-muted dark:border-white/15 dark:text-cream/50"
                  >
                    {a}
                  </span>
                ))}
              </p>
              <p className="mt-1 text-[10px] text-ink-muted/80 dark:text-cream/40">
                {formatContentReviewed(c.lastReviewed)}
              </p>
            </CardLink>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-navy/10 dark:border-white/10">
          <table className="data-table w-full min-w-[720px] text-left text-sm">
            <thead className="bg-navy/5 dark:bg-white/5">
              <tr>
                <th className="px-3 py-2.5">Ref</th>
                <th className="px-3 py-2.5">Title</th>
                <th className="px-3 py-2.5">Category</th>
                <th className="px-3 py-2.5">Date</th>
                <th className="px-3 py-2.5">Audience</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.slug} className="border-t border-navy/5 dark:border-white/5">
                  <td className="px-3 py-2 font-mono text-xs text-gold-dim">{c.ref}</td>
                  <td className="px-3 py-2">
                    <Link to={`/circulars/${c.slug}`} className="font-medium hover:underline">
                      {c.title}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-ink-muted dark:text-cream/65">{c.category}</td>
                  <td className="px-3 py-2 tabular-nums text-ink-muted">{c.date}</td>
                  <td className="px-3 py-2 text-xs text-ink-muted dark:text-cream/55">
                    {c.audiences.join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-navy/20 py-14 text-center">
          <p className="text-ink-muted">No circulars match your filters.</p>
          <button
            type="button"
            className="mt-3 text-sm font-medium text-gold-dim underline dark:text-gold"
            onClick={clearFilters}
          >
            Clear filters
          </button>
        </div>
      )}
      <ExploreNext pathname="/circulars" />
      <div className="mt-10">
        <DisclaimerBanner />
      </div>
    </div>
  )
}
