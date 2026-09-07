import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { LayoutGrid, Table2 } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { SearchFilter } from '../components/SearchFilter'
import { Badge } from '../components/Badge'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { ExploreNext } from '../components/ExploreNext'
import { OfficialPdfLink, OfficialTitleLink } from '../components/OfficialPdfLink'
import { DocumentTable, type DocTableRow } from '../components/DocumentTable'
import { mastersDirections, mdCategories } from '../data/mastersDirections'
import { AUDIENCE_FILTERS, yearFromDate, type AudienceFilter } from '../data/types'
import { formatContentReviewed } from '../data/meta'
import { fadeUp, stagger } from '../lib/motion'

const yearOptions = [
  'All',
  ...Array.from(
    new Set(mastersDirections.flatMap((d) => [yearFromDate(d.updated), yearFromDate(d.issued)])),
  ).sort((a, b) => b.localeCompare(a)),
] as const

function audienceFromParam(raw: string | null): AudienceFilter {
  if (raw && (AUDIENCE_FILTERS as readonly string[]).includes(raw)) {
    return raw as AudienceFilter
  }
  return 'All'
}

export function MastersDirections() {
  const reduce = useReducedMotion()
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const audience = audienceFromParam(params.get('audience'))
  const [year, setYear] = useState<string>('All')
  const [view, setView] = useState<'cards' | 'table'>('table')

  function setAudienceFilter(v: AudienceFilter) {
    const next = new URLSearchParams(params)
    if (v === 'All') next.delete('audience')
    else next.set('audience', v)
    setParams(next, { replace: true })
  }

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return mastersDirections.filter((d) => {
      const catOk = category === 'All' || d.category === category
      const audOk =
        audience === 'All' || d.audiences.includes(audience as Exclude<AudienceFilter, 'All'>)
      const yearOk =
        year === 'All' ||
        yearFromDate(d.updated) === year ||
        yearFromDate(d.issued) === year
      const text = `${d.title} ${d.summary} ${d.category} ${d.code} ${d.audience}`.toLowerCase()
      return catOk && audOk && yearOk && (!q || text.includes(q))
    })
  }, [query, category, audience, year])

  const tableRows: DocTableRow[] = useMemo(
    () =>
      filtered.map((d) => ({
        id: d.slug,
        date: d.updated || d.issued,
        title: d.title,
        category: d.category,
        meta: d.code,
        officialPdfUrl: d.officialPdfUrl,
        officialHtmlUrl: d.officialHtmlUrl,
        pdfMode: d.pdfMode,
        summaryPath: `/masters-directions/${d.slug}`,
        summaryLabel: 'Summary',
      })),
    [filtered],
  )

  function clearFilters() {
    setQuery('')
    setCategory('All')
    setAudienceFilter('All')
    setYear('All')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
      <PageHeader
        eyebrow="Regulatory library"
        title="Masters Directions"
        description="Catalogue styled like a public Master Directions listing: Date · Title · Open PDF · Type. Title / Open PDF open the official RBI document (or index) in a new tab. Prototype summaries remain secondary educational paraphrases."
      />
      <SearchFilter
        query={query}
        onQuery={setQuery}
        categories={mdCategories}
        category={category}
        onCategory={setCategory}
        audiences={AUDIENCE_FILTERS}
        audience={audience}
        onAudience={(v) => setAudienceFilter(v as AudienceFilter)}
        years={yearOptions}
        year={year}
        onYear={setYear}
        placeholder="Search by title, code, audience…"
      />
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-muted dark:text-cream/55">
          Showing {filtered.length} of {mastersDirections.length}
        </p>
        <div
          className="flex border border-navy/15 dark:border-white/15"
          role="group"
          aria-label="View mode"
        >
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
        </div>
      </div>

      {view === 'table' ? (
        <DocumentTable
          rows={tableRows}
          dateHeader="Updated"
          groupByCategory={category === 'All'}
          emptyMessage="No directions match your filters."
        />
      ) : (
        <motion.div
          className="grid gap-3 md:grid-cols-2"
          variants={reduce ? undefined : stagger}
          initial={reduce ? undefined : 'hidden'}
          animate={reduce ? undefined : 'visible'}
        >
          {filtered.map((d) => (
            <motion.article
              key={d.slug}
              variants={reduce ? undefined : fadeUp}
              className="portal-panel group p-4 transition-colors duration-150 hover:border-gold/40"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{d.category}</Badge>
                <span className="font-mono text-[11px] text-gold-dim dark:text-gold">{d.code}</span>
                <span className="text-xs text-ink-muted dark:text-cream/45">Updated {d.updated}</span>
                {d.pdfMode === 'index' && (
                  <span className="border border-navy/10 px-1.5 py-0.5 text-[10px] text-ink-muted dark:border-white/15">
                    RBI index
                  </span>
                )}
              </div>
              <h2 className="mt-2 text-sm font-semibold text-navy dark:text-cream">
                <OfficialTitleLink
                  doc={d}
                  className="underline-offset-2 hover:text-rbi-blue hover:underline dark:hover:text-gold"
                >
                  {d.title}
                </OfficialTitleLink>
              </h2>
              <p className="mt-1.5 line-clamp-2 text-sm text-ink-muted dark:text-cream/65">{d.summary}</p>
              <p className="mt-2 text-xs text-ink-muted dark:text-cream/50">Audience: {d.audience}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <OfficialPdfLink doc={d} variant="button" />
                <Link
                  to={`/masters-directions/${d.slug}`}
                  className="text-xs font-medium text-ink-muted underline-offset-2 hover:text-navy hover:underline dark:text-cream/55 dark:hover:text-cream"
                >
                  Read prototype summary →
                </Link>
              </div>
              <p className="mt-2 text-[10px] text-ink-muted/80 dark:text-cream/40">
                {formatContentReviewed(d.lastReviewed)}
              </p>
            </motion.article>
          ))}
        </motion.div>
      )}

      {filtered.length === 0 && view === 'cards' && (
        <div className="border border-dashed border-navy/20 py-14 text-center dark:border-white/20">
          <p className="text-ink-muted dark:text-cream/60">No directions match your filters.</p>
          <button
            type="button"
            className="mt-3 text-sm font-medium text-gold-dim underline dark:text-gold"
            onClick={clearFilters}
          >
            Clear filters
          </button>
        </div>
      )}
      {filtered.length === 0 && view === 'table' && (
        <div className="mt-3 text-center">
          <button
            type="button"
            className="text-sm font-medium text-gold-dim underline dark:text-gold"
            onClick={clearFilters}
          >
            Clear filters
          </button>
        </div>
      )}
      <ExploreNext pathname="/masters-directions" />
      <div className="mt-10">
        <DisclaimerBanner />
      </div>
    </div>
  )
}
