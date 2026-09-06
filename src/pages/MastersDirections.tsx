import { useMemo, useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import { SearchFilter } from '../components/SearchFilter'
import { CardLink } from '../components/Card'
import { Badge } from '../components/Badge'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { mastersDirections, mdCategories } from '../data/mastersDirections'

export function MastersDirections() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return mastersDirections.filter((d) => {
      const catOk = category === 'All' || d.category === category
      const text = `${d.title} ${d.summary} ${d.category}`.toLowerCase()
      return catOk && (!q || text.includes(q))
    })
  }, [query, category])

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <PageHeader
        eyebrow="Regulatory library"
        title="Masters Directions"
        description="Searchable catalogue of educational summaries of major RBI Masters Directions. Original plain-English write-ups — not verbatim official text."
      />
      <SearchFilter
        query={query}
        onQuery={setQuery}
        categories={mdCategories}
        category={category}
        onCategory={setCategory}
        placeholder="Search directions…"
      />
      <p className="mb-4 text-sm text-ink-muted dark:text-cream/55">
        Showing {filtered.length} of {mastersDirections.length}
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((d) => (
          <CardLink key={d.slug} to={`/masters-directions/${d.slug}`}>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{d.category}</Badge>
              <span className="text-xs text-ink-muted dark:text-cream/45">
                Updated {d.updated}
              </span>
            </div>
            <h2 className="mt-3 font-semibold text-navy dark:text-cream">{d.title}</h2>
            <p className="mt-2 line-clamp-2 text-sm text-ink-muted dark:text-cream/65">
              {d.summary}
            </p>
          </CardLink>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="py-12 text-center text-ink-muted">No directions match your filters.</p>
      )}
      <div className="mt-10">
        <DisclaimerBanner />
      </div>
    </div>
  )
}
