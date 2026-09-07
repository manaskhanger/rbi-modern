import { ExternalLink } from 'lucide-react'
import { keyRates, keyRatesAsOf } from '../data/rates'
import { RBI_SECTIONS } from '../data/meta'
import { IllustrativeLabel } from './IllustrativeLabel'
import { AnimatedCounter } from './AnimatedCounter'

type Props = {
  className?: string
}

/**
 * Shared key-rates strip for Home / Data.
 * Every chip carries as-of (sample) and an official policy-rates link-out.
 */
export function KeyRatesStrip({ className = '' }: Props) {
  const policy = RBI_SECTIONS.policyRates
  const mp = RBI_SECTIONS.monetaryPolicy

  return (
    <section
      className={`border-b border-navy/10 bg-white/70 dark:border-white/10 dark:bg-navy-light/40 ${className}`}
      aria-label="Sample key policy rates"
    >
      <div className="mx-auto max-w-6xl px-4 py-5 md:px-6">
        <div className="mb-3 flex flex-col items-center gap-1 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-dim dark:text-gold">
              Key rates strip · sample only
            </p>
            <IllustrativeLabel asOf={keyRatesAsOf} tone="chip" className="mt-0.5 !normal-case !tracking-normal" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px]">
            <a
              href={policy.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-gold-dim underline-offset-2 hover:underline dark:text-gold"
            >
              Official policy rates
              <ExternalLink className="h-3 w-3" aria-hidden />
            </a>
            <span className="text-ink-muted/40 dark:text-cream/55" aria-hidden>
              ·
            </span>
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
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {keyRates.map((r) => (
            <div
              key={r.label}
              className="rounded-lg border border-navy/8 bg-cream/90 px-3 py-2.5 text-center dark:border-white/10 dark:bg-navy/50"
            >
              <p className="text-[10px] leading-tight text-ink-muted dark:text-cream/80">{r.label}</p>
              <p className="mt-1 text-lg font-bold tabular-nums text-navy dark:text-cream"><AnimatedCounter value={r.value} /></p>
              <p className="mt-0.5 text-[10px] text-ink-muted dark:text-cream/72">
                as-of (sample): {keyRatesAsOf}
              </p>
              <p className="text-[10px] text-gold-dim">Illustrative · not for compliance</p>
              <a
                href={policy.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center justify-center gap-0.5 text-[10px] font-medium text-gold-dim underline-offset-2 hover:underline dark:text-gold"
              >
                Official rates
                <ExternalLink className="h-2.5 w-2.5" aria-hidden />
              </a>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[11px] text-ink-muted dark:text-cream/72">
          Prototype chips only — not an official extract. Confirm current rates on{' '}
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
