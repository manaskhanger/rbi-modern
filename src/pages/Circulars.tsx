import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { PageHeader } from '../components/PageHeader'
import { SearchFilter } from '../components/SearchFilter'
import { Badge } from '../components/Badge'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { ExploreNext } from '../components/ExploreNext'
import { OfficialPdfLink, OfficialTitleLink } from '../components/OfficialPdfLink'
import { DocumentTable, type DocTableRow } from '../components/DocumentTable'
import { circulars, circularCategories } from '../data/circulars'
import { AUDIENCE_FILTERS, yearFromDate, type AudienceFilter } from '../data/types'
import { formatContentReviewed } from '../data/meta'
import { fadeUp, stagger } from '../lib/motion'
import { LayoutGrid, Table2, ExternalLink } from 'lucide-react'
import { WITHDRAWN_CIRCULARS_URL, WITHDRAWN_NOTE } from '../data/withdrawn'

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
    return circulars.filter((c) => {
      const catOk = category === 'All' || c.category === category
      const audOk =
        audience === 'All' || c.audiences.includes(audience as Exclude<AudienceFilter, 'All'>)
      const yearOk = year === 'All' || yearFromDate(c.date) === year
      const text = `${c.title} ${c.summary} ${c.ref} ${c.audience}`.toLowerCase()
      return catOk && audOk && yearOk && (!q || text.includes(q))
    })
  }, [query, category, audience, year])

  const tableRows: DocTableRow[] = useMemo(
    () =>
      filtered.map((c) => ({
        id: c.slug,
        date: c.date,
        title: c.title,
        category: c.category,
        meta: c.ref,
        officialPdfUrl: c.officialPdfUrl,
        officialHtmlUrl: c.officialHtmlUrl,
        pdfMode: c.pdfMode,
        summaryPath: `/circulars/${c.slug}`,
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
        eyebrow="Regulatory updates"
        title="Circulars"
        description="Notification-style listing: Date · Title · Open PDF · Type. Open PDF / title links go to the official RBI notifications index or document in a new tab. Educational paraphrases stay on prototype detail pages."
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
          dateHeader="Date"
          groupByCategory={category === 'All'}
          emptyMessage="No circulars match your filters."
        />
      ) : (
        <motion.div
          className="space-y-2"
          variants={reduce ? undefined : stagger}
          initial={reduce ? undefined : 'hidden'}
          animate={reduce ? undefined : 'visible'}
        >
          {filtered.map((c) => (
            <motion.article
              key={c.slug}
              variants={reduce ? undefined : fadeUp}
              className="portal-panel p-4 transition-colors duration-150 hover:border-gold/40"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="muted">{c.category}</Badge>
                <span className="text-xs text-ink-muted dark:text-cream/45">{c.date}</span>
                <span className="font-mono text-[11px] text-gold-dim">{c.ref}</span>
                {c.pdfMode === 'index' && (
                  <span className="border border-navy/10 px-1.5 py-0.5 text-[10px] text-ink-muted dark:border-white/15">
                    RBI notifications index
                  </span>
                )}
              </div>
              <h2 className="mt-1.5 text-sm font-semibold text-navy dark:text-cream">
                <OfficialTitleLink
                  doc={c}
                  className="underline-offset-2 hover:text-rbi-blue hover:underline dark:hover:text-gold"
                >
                  {c.title}
                </OfficialTitleLink>
              </h2>
              <p className="mt-1 text-sm text-ink-muted dark:text-cream/65">{c.summary}</p>
              <p className="mt-1.5 text-xs text-ink-muted dark:text-cream/50">Audience: {c.audience}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <OfficialPdfLink doc={c} variant="button" />
                <Link
                  to={`/circulars/${c.slug}`}
                  className="text-xs font-medium text-ink-muted underline-offset-2 hover:text-navy hover:underline dark:text-cream/55 dark:hover:text-cream"
                >
                  Read prototype summary →
                </Link>
              </div>
              <p className="mt-2 text-[10px] text-ink-muted/80 dark:text-cream/40">
                {formatContentReviewed(c.lastReviewed)}
              </p>
            </motion.article>
          ))}
        </motion.div>
      )}

      {filtered.length === 0 && (
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

      <section className="mt-10 portal-panel p-5" aria-labelledby="withdrawn-heading">
        <h2 id="withdrawn-heading" className="font-serif text-lg font-semibold text-navy dark:text-cream">
          Withdrawn / archive (stub)
        </h2>
        <p className="mt-2 text-sm text-ink-muted dark:text-cream/65">{WITHDRAWN_NOTE}</p>
        <a
          href={WITHDRAWN_CIRCULARS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-dim hover:underline dark:text-gold"
        >
          Official notifications on rbi.org.in <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </section>

      <ExploreNext pathname="/circulars" />
      <div className="mt-10">
        <DisclaimerBanner />
      </div>
    </div>
  )
}
