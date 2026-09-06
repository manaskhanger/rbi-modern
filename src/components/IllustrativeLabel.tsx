import { CONTENT_LAST_REVIEWED, formatContentReviewed } from '../data/meta'

type IllustrativeProps = {
  /** Show as-of sample date line when provided */
  asOf?: string
  className?: string
  /** denser chip-style for chart/table headers */
  tone?: 'inline' | 'chip'
}

/** Visible label for every key-rate chip, chart, and numeric table. */
export function IllustrativeLabel({ asOf, className = '', tone = 'inline' }: IllustrativeProps) {
  const text = asOf
    ? `Illustrative · not for compliance · as-of (sample): ${asOf}`
    : 'Illustrative · not for compliance'

  if (tone === 'chip') {
    return (
      <p
        className={`text-[10px] font-semibold uppercase tracking-wider text-gold-dim dark:text-gold ${className}`}
      >
        {text}
      </p>
    )
  }

  return (
    <p className={`text-xs text-ink-muted dark:text-cream/50 ${className}`}>{text}</p>
  )
}

type ReviewedProps = {
  lastReviewed?: string
  className?: string
}

export function ContentReviewed({
  lastReviewed = CONTENT_LAST_REVIEWED,
  className = '',
}: ReviewedProps) {
  return (
    <p className={`text-xs text-ink-muted dark:text-cream/50 ${className}`}>
      {formatContentReviewed(lastReviewed)}
    </p>
  )
}
