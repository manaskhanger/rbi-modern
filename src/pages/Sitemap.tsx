import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { ExploreNext } from '../components/ExploreNext'
import { InteractiveSiteMap } from '../components/InteractiveSiteMap'
import { Reveal } from '../components/Reveal'
import { mastersDirections } from '../data/mastersDirections'
import { circulars } from '../data/circulars'
import { newsItems } from '../data/news'
import { reports } from '../data/reports'
import { sectionLandings } from '../lib/siteMap'

type Block = {
  title: string
  landing?: string
  links: { label: string; to: string; meta?: string }[]
}

const overview: Block = {
  title: 'Site sections',
  links: sectionLandings.map((l) => ({ label: l.label, to: l.to })),
}

const blocks: Block[] = [
  {
    title: 'Masters Directions',
    landing: '/masters-directions',
    links: mastersDirections.map((d) => ({
      label: d.title,
      to: `/masters-directions/${d.slug}`,
      meta: d.code,
    })),
  },
  {
    title: 'Circulars',
    landing: '/circulars',
    links: circulars.map((c) => ({
      label: c.title,
      to: `/circulars/${c.slug}`,
      meta: c.ref,
    })),
  },
  {
    title: 'News',
    landing: '/news',
    links: newsItems.map((n) => ({
      label: n.title,
      to: `/news/${n.slug}`,
      meta: n.date,
    })),
  },
  {
    title: 'Reports',
    landing: '/reports',
    links: reports.map((r) => ({
      label: r.title,
      to: `/reports/${r.slug}`,
      meta: r.rich ? 'Rich sample' : r.type,
    })),
  },
]

export function Sitemap() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <PageHeader
        eyebrow="Navigation"
        title="Sitemap"
        description="Interactive illustrated map of this unofficial prototype — Central Board, functions, regulatory library, publications and data — plus the full hierarchical catalogue underneath."
      />

      <Reveal>
        <section className="mb-12" aria-labelledby="illustrated-map">
          <h2 id="illustrated-map" className="sr-only">
            Illustrated site map
          </h2>
          <InteractiveSiteMap />
        </section>
      </Reveal>

      <section className="mb-12" aria-labelledby="sitemap-overview">
        <h2 id="sitemap-overview" className="mb-4 text-lg font-bold text-navy dark:text-cream">
          {overview.title}
        </h2>
        <ul className="columns-1 gap-x-8 sm:columns-2 md:columns-3">
          {overview.links.map((l) => (
            <li key={l.to} className="mb-2 break-inside-avoid">
              <Link
                to={l.to}
                className="text-sm font-medium text-gold-dim underline-offset-2 hover:underline dark:text-gold"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {blocks.map((b) => (
        <section key={b.title} className="mb-12" aria-labelledby={`sitemap-${b.title}`}>
          <div className="mb-4 flex flex-wrap items-baseline gap-3">
            <h2
              id={`sitemap-${b.title}`}
              className="text-lg font-bold text-navy dark:text-cream"
            >
              {b.title}
            </h2>
            {b.landing && (
              <Link
                to={b.landing}
                className="text-xs font-semibold text-ink-muted underline-offset-2 hover:text-navy hover:underline dark:text-cream/55 dark:hover:text-cream"
              >
                Open list →
              </Link>
            )}
            <span className="text-[11px] text-ink-muted dark:text-cream/45">
              {b.links.length} items
            </span>
          </div>
          <ul className="space-y-2 rounded-xl border border-navy/10 bg-white/70 p-4 dark:border-white/10 dark:bg-navy-light/30">
            {b.links.map((l) => (
              <li
                key={l.to}
                className="flex flex-col gap-0.5 border-b border-navy/5 py-2 last:border-0 sm:flex-row sm:items-baseline sm:justify-between dark:border-white/5"
              >
                <Link
                  to={l.to}
                  className="text-sm font-medium text-navy underline-offset-2 hover:text-gold-dim hover:underline dark:text-cream dark:hover:text-gold"
                >
                  {l.label}
                </Link>
                {l.meta && (
                  <span className="shrink-0 font-mono text-[11px] text-ink-muted dark:text-cream/45">
                    {l.meta}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <ExploreNext pathname="/sitemap" />
      <div className="mt-10">
        <DisclaimerBanner />
      </div>
    </div>
  )
}
