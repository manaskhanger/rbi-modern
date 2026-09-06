import { ExternalLink } from 'lucide-react'
import { RBI_SECTIONS, type RbiSectionKey } from '../data/meta'

type Props = {
  section: RbiSectionKey
  className?: string
  /** When true, show compact inline link instead of button */
  compact?: boolean
}

export function AuthoritativeSource({ section, className = '', compact = false }: Props) {
  const src = RBI_SECTIONS[section]
  const note = 'sectionNote' in src ? src.sectionNote : undefined

  if (compact) {
    return (
      <a
        href={src.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 text-sm font-medium text-gold-dim underline-offset-2 hover:underline dark:text-gold ${className}`}
      >
        {src.label}
        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
      </a>
    )
  }

  return (
    <div className={`rounded-xl border border-navy/10 bg-white/80 p-4 dark:border-white/10 dark:bg-navy-light/40 ${className}`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-gold-dim dark:text-gold">
        Official source
      </p>
      <p className="mt-1 text-sm text-ink-muted dark:text-cream/65">
        This page is an educational paraphrase with illustrative content. For the authoritative
        instrument or release, use the Reserve Bank of India website.
      </p>
      <a
        href={src.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-2 rounded-md bg-navy px-4 py-2 text-sm font-semibold text-cream transition hover:bg-navy-light dark:bg-gold dark:text-navy dark:hover:bg-gold-soft"
      >
        {src.label}
        <ExternalLink className="h-4 w-4" aria-hidden />
      </a>
      {note && (
        <p className="mt-2 text-[11px] text-ink-muted dark:text-cream/45">{note}</p>
      )}
    </div>
  )
}
