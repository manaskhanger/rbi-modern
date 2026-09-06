import { Printer } from 'lucide-react'

/** Triggers the browser print dialog (Save as PDF). Hidden when printing. */
export function PrintButton({ className = '' }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`no-print inline-flex items-center gap-2 rounded-md border border-navy/15 bg-white px-3 py-1.5 text-xs font-semibold text-navy transition hover:border-gold/40 dark:border-white/20 dark:bg-navy-light dark:text-cream ${className}`}
      aria-label="Print or save as PDF"
    >
      <Printer className="h-3.5 w-3.5" aria-hidden />
      Print / Save as PDF
    </button>
  )
}
