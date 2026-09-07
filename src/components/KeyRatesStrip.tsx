import { ExternalLink } from 'lucide-react'
import { keyRates, keyRatesAsOf } from '../data/rates'
import { RBI_SECTIONS } from '../data/meta'
import { IllustrativeLabel } from './IllustrativeLabel'

type Props = {
  className?: string
}

/**
 * Dense key-rates panel for Data / secondary pages.
 * Sample figures only — labelled illustrative.
 */
export function KeyRatesStrip({ className = '' }: Props) {
  const policy = RBI_SECTIONS.policyRates
  const mp = RBI_SECTIONS.monetaryPolicy

  return (
    <section
      className={`border-b border-navy/10 bg-white dark:border-white/10 dark:bg-navy-light/40 ${className}`}
      aria-label="Sample key policy rates"
    >
      <div className="mx-auto max-w-6xl px-4 py-4 md:px-6">
        <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-dim dark:text-gold">
              Current rates · sample table
            </p>
            <IllustrativeLabel asOf={keyRatesAsOf} tone="chip" className="mt-0.5 !normal-case !tracking-normal" />
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px]">
            <a
              href={policy.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-gold-dim underline-offset-2 hover:underline dark:text-gold"
            >
              Official policy rates
              <ExternalLink className="h-3 w-3" aria-hidden />
            </a>
            <a
              href={mp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-gold-dim underline-offset-2 hover:underline dark:text-gold"
            >
              Monetary policy on rbi.org.in
              <ExternalLink className="h-3 w-3" aria-hidden />
            </a>
          </div>
        </div>
        <div className="portal-panel overflow-hidden">
          <table className="rates-table">
            <thead>
              <tr>
                <th scope="col">Instrument / ratio</th>
                <th scope="col">Illustrative rate</th>
              </tr>
            </thead>
            <tbody>
              {keyRates.map((r) => (
                <tr key={r.label}>
                  <td>
                    {r.label}
                    <span className="mt-0.5 block text-[10px] font-normal text-ink-muted dark:text-cream/55">
                      as-of (sample): {keyRatesAsOf}
                    </span>
                  </td>
                  <td className="text-navy dark:text-cream">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] text-ink-muted dark:text-cream/70">
          Prototype table only — not an official extract. Confirm current rates on{' '}
          <a
            href={policy.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gold-dim underline-offset-2 hover:underline dark:text-gold"
          >
            rbi.org.in monetary / credit policy
          </a>
          .
        </p>
      </div>
    </section>
  )
}
