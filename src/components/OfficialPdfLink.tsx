import type { MouseEvent, ReactNode } from 'react'
import { FileText, ExternalLink } from 'lucide-react'
import type { PdfMode } from '../data/types'
import {
  officialButtonLabel,
  officialCtaLabel,
  officialOpenUrl,
  type OfficialDocFields,
} from '../lib/officialDocs'

type Props = {
  doc: OfficialDocFields
  /** prominent = detail-page primary CTA; button = list-row explicit; inline = compact */
  variant?: 'prominent' | 'button' | 'inline'
  className?: string
  onClick?: (e: MouseEvent) => void
}

export function OfficialPdfLink({
  doc,
  variant = 'button',
  className = '',
  onClick,
}: Props) {
  const href = officialOpenUrl(doc)
  const mode: PdfMode = doc.pdfMode
  const label = variant === 'prominent' ? officialCtaLabel(mode) : officialButtonLabel(mode)
  const title =
    mode === 'index'
      ? 'Opens the official RBI catalogue / listing in a new tab'
      : 'Opens the official RBI PDF (or document page) in a new tab'

  const baseProps = {
    href,
    target: '_blank' as const,
    rel: 'noopener noreferrer',
    title,
    onClick,
  }

  if (variant === 'prominent') {
    return (
      <a
        {...baseProps}
        className={`inline-flex items-center gap-2 bg-navy px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-navy-light dark:bg-gold dark:text-navy dark:hover:bg-gold-soft ${className}`}
      >
        <FileText className="h-4 w-4" aria-hidden />
        {label}
        <ExternalLink className="h-3.5 w-3.5 opacity-80" aria-hidden />
      </a>
    )
  }

  if (variant === 'inline') {
    return (
      <a
        {...baseProps}
        className={`inline-flex items-center gap-1 text-xs font-semibold text-gold-dim underline-offset-2 hover:underline dark:text-gold ${className}`}
      >
        <FileText className="h-3.5 w-3.5" aria-hidden />
        {label}
        <ExternalLink className="h-3 w-3" aria-hidden />
      </a>
    )
  }

  return (
    <a
      {...baseProps}
      className={`inline-flex items-center gap-1.5 border border-navy/20 bg-white px-3 py-1.5 text-xs font-semibold text-navy transition hover:border-gold/50 hover:bg-gold/10 dark:border-white/20 dark:bg-navy-light/50 dark:text-cream dark:hover:border-gold/40 ${className}`}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.(e)
      }}
    >
      <FileText className="h-3.5 w-3.5 text-gold-dim dark:text-gold" aria-hidden />
      {label}
      <ExternalLink className="h-3 w-3 opacity-70" aria-hidden />
    </a>
  )
}

/** Title / row primary action: open official doc in new tab (RBI-like). */
export function OfficialTitleLink({
  doc,
  children,
  className = '',
}: {
  doc: OfficialDocFields
  children: ReactNode
  className?: string
}) {
  return (
    <a
      href={officialOpenUrl(doc)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      title={
        doc.pdfMode === 'index'
          ? 'Open official document on RBI (new tab)'
          : 'Open official PDF on RBI (new tab)'
      }
    >
      {children}
    </a>
  )
}
