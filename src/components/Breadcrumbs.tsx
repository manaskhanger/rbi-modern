import { Link, useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { crumbsForPath, type Crumb } from '../lib/siteMap'
import { mastersDirections } from '../data/mastersDirections'
import { circulars } from '../data/circulars'
import { newsItems } from '../data/news'
import { reports } from '../data/reports'

function resolveItemLabel(pathname: string): string | undefined {
  const m = pathname.match(/^\/(masters-directions|circulars|news|reports)\/([^/]+)/)
  if (!m) return undefined
  const [, section, slug] = m
  if (section === 'masters-directions') {
    return mastersDirections.find((d) => d.slug === slug)?.title
  }
  if (section === 'circulars') {
    return circulars.find((c) => c.slug === slug)?.title
  }
  if (section === 'news') {
    return newsItems.find((n) => n.slug === slug)?.title
  }
  if (section === 'reports') {
    return reports.find((r) => r.slug === slug)?.title
  }
  return undefined
}

export function Breadcrumbs() {
  const { pathname } = useLocation()
  const itemLabel = resolveItemLabel(pathname)
  const crumbs = crumbsForPath(pathname, itemLabel)
  if (crumbs.length === 0) return null

  return (
    <nav
      aria-label="Breadcrumb"
      className="breadcrumb-bar sticky z-40 border-b border-navy/8 bg-cream/95 backdrop-blur-md dark:border-white/10 dark:bg-navy/95"
    >
      <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-1 px-4 py-2 text-xs md:px-6 md:text-[13px]">
        {crumbs.map((c, i) => (
          <CrumbItem key={`${c.label}-${i}`} crumb={c} isLast={i === crumbs.length - 1} />
        ))}
      </ol>
    </nav>
  )
}

function CrumbItem({ crumb, isLast }: { crumb: Crumb; isLast: boolean }) {
  return (
    <li className="inline-flex min-w-0 items-center gap-1">
      {!isLast && crumb.to ? (
        <Link
          to={crumb.to}
          className="truncate font-medium text-ink-muted underline-offset-2 hover:text-navy hover:underline dark:text-cream/60 dark:hover:text-cream"
        >
          {crumb.label}
        </Link>
      ) : (
        <span
          className="truncate font-semibold text-navy dark:text-cream"
          aria-current={isLast ? 'page' : undefined}
        >
          {crumb.label}
        </span>
      )}
      {!isLast && (
        <ChevronRight
          className="h-3.5 w-3.5 shrink-0 text-ink-muted/50 dark:text-cream/35"
          aria-hidden
        />
      )}
    </li>
  )
}
