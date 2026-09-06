import { AlertTriangle, ExternalLink } from 'lucide-react'
import { RBI_HOME } from '../data/meta'

export function DisclaimerBanner({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs text-ink-muted dark:text-cream/50">
        Unofficial educational / UX prototype — not the Reserve Bank of India website. Figures are
        illustrative sample data. The only authoritative source is{' '}
        <a
          href={RBI_HOME}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-gold-dim underline-offset-2 hover:underline dark:text-gold"
        >
          rbi.org.in
        </a>
        .
      </p>
    )
  }
  return (
    <div className="flex gap-3 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3.5 text-sm text-navy dark:border-gold/30 dark:text-cream">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-gold-dim dark:text-gold" aria-hidden />
      <div className="space-y-1">
        <p>
          <strong>Unofficial prototype.</strong> This site is an independent educational and UX
          concept. It is <strong>not</strong> an official Reserve Bank of India website and is not
          affiliated with, endorsed by, or connected to RBI.
        </p>
        <p className="text-ink-muted dark:text-cream/65">
          All rates, charts, circulars and document summaries are{' '}
          <strong>illustrative sample content</strong> written for this prototype. The only
          authoritative source is the official RBI website at{' '}
          <a
            href={RBI_HOME}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-gold-dim underline-offset-2 hover:underline dark:text-gold"
          >
            rbi.org.in
            <ExternalLink className="h-3 w-3" aria-hidden />
          </a>
          ; always defer to gazetted instruments and primary legal sources.
        </p>
      </div>
    </div>
  )
}
