import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, List } from 'lucide-react'

export type CollectionItem = { slug: string; title: string }

export function CollectionNav({
  items,
  currentSlug,
  basePath,
  listLabel,
}: {
  items: CollectionItem[]
  currentSlug: string
  basePath: string
  listLabel: string
}) {
  const idx = items.findIndex((i) => i.slug === currentSlug)
  if (idx < 0) return null
  const prev = idx > 0 ? items[idx - 1] : null
  const next = idx < items.length - 1 ? items[idx + 1] : null

  return (
    <nav
      aria-label="Collection navigation"
      className="mt-10 border-t border-navy/10 pt-6 dark:border-white/10"
    >
      <div className="mb-4">
        <Link
          to={basePath}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted underline-offset-2 hover:text-navy hover:underline dark:text-cream/60 dark:hover:text-cream"
        >
          <List className="h-4 w-4" aria-hidden />
          Back to {listLabel}
        </Link>
        <p className="mt-1 text-[11px] text-ink-muted dark:text-cream/45">
          {idx + 1} of {items.length} in this prototype catalogue
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link
            to={`${basePath}/${prev.slug}`}
            className="group flex items-start gap-3 rounded-xl border border-navy/10 bg-white/80 px-4 py-3 transition hover:border-gold/40 dark:border-white/10 dark:bg-navy-light/40"
          >
            <ArrowLeft
              className="mt-0.5 h-4 w-4 shrink-0 text-gold-dim group-hover:-translate-x-0.5 transition dark:text-gold"
              aria-hidden
            />
            <span className="min-w-0">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-ink-muted dark:text-cream/50">
                Previous
              </span>
              <span className="mt-0.5 block text-sm font-semibold text-navy dark:text-cream">
                {prev.title}
              </span>
            </span>
          </Link>
        ) : (
          <div className="hidden sm:block" aria-hidden />
        )}
        {next ? (
          <Link
            to={`${basePath}/${next.slug}`}
            className="group flex items-start justify-end gap-3 rounded-xl border border-navy/10 bg-white/80 px-4 py-3 text-right transition hover:border-gold/40 dark:border-white/10 dark:bg-navy-light/40 sm:col-start-2"
          >
            <span className="min-w-0">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-ink-muted dark:text-cream/50">
                Next
              </span>
              <span className="mt-0.5 block text-sm font-semibold text-navy dark:text-cream">
                {next.title}
              </span>
            </span>
            <ArrowRight
              className="mt-0.5 h-4 w-4 shrink-0 text-gold-dim transition group-hover:translate-x-0.5 dark:text-gold"
              aria-hidden
            />
          </Link>
        ) : null}
      </div>
    </nav>
  )
}
