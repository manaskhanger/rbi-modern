import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import { FileText, ExternalLink } from 'lucide-react'
import { liveFeedItems, type FeedKind, type LiveFeedItem } from '../data/liveFeed'

const KIND_STYLE: Record<FeedKind, string> = {
  Circular: 'border-sky-400/40 bg-sky-400/15 text-sky-100',
  Direction: 'border-gold/45 bg-gold/15 text-gold-soft',
  News: 'border-emerald-400/40 bg-emerald-400/15 text-emerald-100',
  Report: 'border-violet-300/40 bg-violet-300/15 text-violet-100',
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-')
  if (!y || !m || !d) return iso
  return `${d}-${m}-${y}`
}

function TickerItem({ item }: { item: LiveFeedItem }) {
  return (
    <li className="inline-flex max-w-[28rem] shrink-0 items-center gap-2 border-r border-white/10 px-4 py-1.5">
      <span
        className={`inline-flex shrink-0 items-center rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${KIND_STYLE[item.kind]}`}
      >
        {item.kind}
      </span>
      <time dateTime={item.date} className="shrink-0 tabular-nums text-[11px] text-cream/80">
        {formatDate(item.date)}
      </time>
      <Link
        to={item.to}
        className="min-w-0 truncate text-[12px] font-medium text-cream underline-offset-2 hover:text-gold-soft hover:underline"
      >
        {item.title}
      </Link>
      {item.pdfUrl && (
        <a
          href={item.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-0.5 text-[10px] font-semibold text-gold-soft underline-offset-2 hover:underline"
          title={item.pdfMode === 'pdf' ? 'Open official PDF' : 'Open official catalogue'}
          aria-label={
            item.pdfMode === 'pdf'
              ? `Open official PDF for ${item.title}`
              : `Open official catalogue for ${item.title}`
          }
        >
          <FileText className="h-3 w-3" aria-hidden />
          {item.pdfMode === 'pdf' ? 'PDF' : 'Index'}
          <ExternalLink className="h-2.5 w-2.5" aria-hidden />
        </a>
      )}
    </li>
  )
}

type Props = {
  /** Limit items in the scrolling track (default 16) */
  limit?: number
  className?: string
}

/**
 * Institutional notice-board / market-ticker of recent prototype updates.
 * Pauses on hover/focus; static wrap when prefers-reduced-motion.
 */
export function LiveUpdatesTicker({ limit = 16, className = '' }: Props) {
  const reduce = useReducedMotion()
  const items = useMemo(() => liveFeedItems.slice(0, limit), [limit])

  return (
    <div
      className={`live-ticker no-print ${className}`}
      role="region"
      aria-label="Prototype feed of recent updates"
    >
      <div className="mx-auto flex max-w-6xl items-stretch gap-3 px-4 md:px-6">
        <p className="flex shrink-0 items-center gap-2 py-1.5 text-[10px] font-bold uppercase tracking-widest text-gold-soft">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-soft" aria-hidden />
          Live updates
          <span className="hidden font-medium normal-case tracking-normal text-cream/70 sm:inline">
            · Prototype feed · illustrative
          </span>
        </p>
        <div className="live-ticker-viewport min-w-0 flex-1 overflow-hidden">
          {reduce ? (
            <ul className="flex flex-wrap gap-y-1 py-1">
              {items.map((item) => (
                <TickerItem key={item.id} item={item} />
              ))}
            </ul>
          ) : (
            <div className="live-ticker-track py-0.5">
              <ul className="flex items-center">
                {items.map((item) => (
                  <TickerItem key={item.id} item={item} />
                ))}
              </ul>
              <ul className="live-ticker-dup flex items-center" aria-hidden>
                {items.map((item) => (
                  <TickerItem key={`dup-${item.id}`} item={item} />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
