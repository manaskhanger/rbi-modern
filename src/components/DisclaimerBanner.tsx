import { AlertTriangle } from 'lucide-react'

export function DisclaimerBanner({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs text-ink-muted dark:text-cream/50">
        Unofficial educational / UX prototype — not the Reserve Bank of India website. Figures are
        illustrative sample data.
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
          All rates, charts, circulars and document summaries are <strong>illustrative sample
          content</strong> written for this prototype. For authoritative information, use the
          official RBI website and gazetted instruments.
        </p>
      </div>
    </div>
  )
}
