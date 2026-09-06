import { AlertTriangle } from 'lucide-react'

export function DisclaimerBanner({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs text-ink-muted dark:text-cream/50">
        Illustrative educational demo — not an official RBI website. Figures are sample data.
      </p>
    )
  }
  return (
    <div className="flex gap-3 rounded-2xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-navy dark:text-cream">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-gold-dim" />
      <p>
        <strong>Educational demo.</strong> This site is not affiliated with the Reserve Bank of
        India. All rates, charts and documents are illustrative sample content for learning only.
      </p>
    </div>
  )
}
