import { useMemo, useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import { SearchFilter } from '../components/SearchFilter'
import { CardLink } from '../components/Card'
import { Badge } from '../components/Badge'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { circulars, circularCategories } from '../data/circulars'

export function Circulars() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return circulars.filter((c) => {
      const catOk = category === 'All' || c.category === category
      const text = `${c.title} ${c.summary} ${c.ref}`.toLowerCase()
      return catOk && (!q || text.includes(q))
    })
  }, [query, category])

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <PageHeader
        eyebrow="Updates"
        title="Circulars"
        description="Illustrative circular-style notes for learning how RBI communicates incremental regulatory expectations."
      />
      <SearchFilter
        query={query}
        onQuery={setQuery}
        categories={circularCategories}
        category={category}
        onCategory={setCategory}
        placeholder="Search circulars…"
      />
      <div className="space-y-3">
        {filtered.map((c) => (
          <CardLink key={c.slug} to={`/circulars/${c.slug}`} className="!p-4 md:!p-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="muted">{c.category}</Badge>
              <span className="text-xs text-ink-muted dark:text-cream/45">{c.date}</span>
              <span className="text-xs text-gold-dim">{c.ref}</span>
            </div>
            <h2 className="mt-2 font-semibold text-navy dark:text-cream">{c.title}</h2>
            <p className="mt-1 text-sm text-ink-muted dark:text-cream/65">{c.summary}</p>
          </CardLink>
        ))}
      </div>
      <div className="mt-10">
        <DisclaimerBanner />
      </div>
    </div>
  )
}
