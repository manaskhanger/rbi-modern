import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { LayoutGrid, Table2 } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { SearchFilter } from '../components/SearchFilter'
import { CardLink } from '../components/Card'
import { Badge } from '../components/Badge'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { mastersDirections, mdCategories } from '../data/mastersDirections'
import { formatContentReviewed } from '../data/meta'

export function MastersDirections() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [view, setView] = useState<'cards' | 'table'>('cards')

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return mastersDirections.filter((d) => {
      const catOk = category === 'All' || d.category === category
      const text = `${d.title} ${d.summary} ${d.category} ${d.code} ${d.audience}`.toLowerCase()
      return catOk && (!q || text.includes(q))
    })
  }, [query, category])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <PageHeader
        eyebrow="Regulatory library"
        title="Masters Directions"
        description="Searchable catalogue of educational summaries of major Masters Direction themes. Original paraphrases with prototype reference codes (MD-XX) — not verbatim official text and not for compliance reliance."
      />
      <SearchFilter
        query={query}
        onQuery={setQuery}
        categories={mdCategories}
        category={category}
        onCategory={setCategory}
        placeholder="Search by title, code, audience…"
      />
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-muted dark:text-cream/55">
          Showing {filtered.length} of {mastersDirections.length}
        </p>
        <div className="flex rounded-md border border-navy/10 dark:border-white/15" role="group" aria-label="View mode">
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
        <div className="grid gap-3 md:grid-cols-2">
          {filtered.map((d) => (
            <CardLink key={d.slug} to={`/masters-directions/${d.slug}`} className="!rounded-xl !p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{d.category}</Badge>
                <span className="font-mono text-[11px] text-gold-dim dark:text-gold">{d.code}</span>
                <span className="text-xs text-ink-muted dark:text-cream/45">Updated {d.updated}</span>
              </div>
              <h2 className="mt-2 text-sm font-semibold text-navy dark:text-cream">{d.title}</h2>
              <p className="mt-1.5 line-clamp-2 text-sm text-ink-muted dark:text-cream/65">{d.summary}</p>
              <p className="mt-2 text-xs text-ink-muted dark:text-cream/50">Audience: {d.audience}</p>
              <p className="mt-1 text-[10px] text-ink-muted/80 dark:text-cream/40">{formatContentReviewed(d.lastReviewed)}</p>
            </CardLink>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-navy/10 dark:border-white/10">
          <table className="data-table w-full min-w-[720px] text-left text-sm">
            <thead className="bg-navy/5 dark:bg-white/5">
              <tr>
                <th className="px-3 py-2.5">Code</th>
                <th className="px-3 py-2.5">Title</th>
                <th className="px-3 py-2.5">Category</th>
                <th className="px-3 py-2.5">Updated</th>
                <th className="px-3 py-2.5">Audience</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.slug} className="border-t border-navy/5 dark:border-white/5">
                  <td className="px-3 py-2 font-mono text-xs text-gold-dim">{d.code}</td>
                  <td className="px-3 py-2">
                    <Link
                      to={`/masters-directions/${d.slug}`}
                      className="font-medium text-navy hover:underline dark:text-cream"
                    >
                      {d.title}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-ink-muted dark:text-cream/65">{d.category}</td>
                  <td className="px-3 py-2 tabular-nums text-ink-muted dark:text-cream/65">{d.updated}</td>
                  <td className="px-3 py-2 text-xs text-ink-muted dark:text-cream/55">{d.audience}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-navy/20 py-14 text-center dark:border-white/20">
          <p className="text-ink-muted dark:text-cream/60">No directions match your filters.</p>
          <button
            type="button"
            className="mt-3 text-sm font-medium text-gold-dim underline dark:text-gold"
            onClick={() => {
              setQuery('')
              setCategory('All')
            }}
          >
            Clear filters
          </button>
        </div>
      )}
      <div className="mt-10">
        <DisclaimerBanner />
      </div>
    </div>
  )
}
