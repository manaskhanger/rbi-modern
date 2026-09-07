import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { exploreForPath, type SitemapLink } from '../lib/siteMap'

export function ExploreNext({
  pathname,
  title,
  links,
  className = '',
}: {
  pathname?: string
  title?: string
  links?: SitemapLink[]
  className?: string
}) {
  const fromMap = pathname ? exploreForPath(pathname) : undefined
  const heading = title ?? fromMap?.title ?? 'Explore next'
  const items = links ?? fromMap?.links ?? []
  if (items.length === 0) return null

  return (
    <section
      className={`mt-12 rounded-2xl border border-navy/10 bg-gradient-to-br from-white/90 to-gold/5 p-5 md:p-6 dark:border-white/10 dark:from-navy-light/50 dark:to-navy/40 ${className}`}
      aria-labelledby="explore-next-heading"
    >
      <h2
        id="explore-next-heading"
        className="text-sm font-semibold uppercase tracking-[0.12em] text-gold-dim dark:text-gold"
      >
        {heading}
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((l) => (
          <li key={l.to + l.label}>
            <Link
              to={l.to}
              className="group flex items-start justify-between gap-3 rounded-xl border border-navy/10 bg-white/80 px-4 py-3 transition hover:border-gold/40 dark:border-white/10 dark:bg-navy/40"
            >
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-navy dark:text-cream">
                  {l.label}
                </span>
                {l.note && (
                  <span className="mt-0.5 block text-xs text-ink-muted dark:text-cream/55">
                    {l.note}
                  </span>
                )}
              </span>
              <ArrowRight
                className="mt-0.5 h-4 w-4 shrink-0 text-gold-dim transition group-hover:translate-x-0.5 dark:text-gold"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

/** Compact hub cards for section landings (About → subsections). */
export function SectionHubCards({
  heading,
  links,
}: {
  heading: string
  links: SitemapLink[]
}) {
  return (
    <section className="mb-12" aria-labelledby="section-hub-heading">
      <h2
        id="section-hub-heading"
        className="mb-5 text-xl font-bold text-navy dark:text-cream md:text-2xl"
      >
        {heading}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="group glass-card rounded-xl p-4 transition hover:border-gold/40"
          >
            <span className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold text-navy dark:text-cream">{l.label}</span>
              <ArrowRight
                className="h-4 w-4 text-gold-dim transition group-hover:translate-x-0.5 dark:text-gold"
                aria-hidden
              />
            </span>
            {l.note && (
              <span className="mt-1.5 block text-xs text-ink-muted dark:text-cream/60">{l.note}</span>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
