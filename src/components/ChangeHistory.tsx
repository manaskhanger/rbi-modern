import type { ChangeHistoryEntry } from '../data/types'

type Props = {
  entries: ChangeHistoryEntry[]
}

export function ChangeHistory({ entries }: Props) {
  return (
    <div>
      <p className="mb-3 text-xs text-ink-muted dark:text-cream/55">
        Prototype timeline — every entry is <strong>illustrative</strong> and not an official
        amendment log.
      </p>
      <ol className="relative space-y-0 border-l border-gold/40 pl-5 dark:border-gold/30">
        {entries.map((e) => (
          <li key={`${e.date}-${e.label}`} className="relative pb-6 last:pb-0">
            <span
              className="absolute -left-[1.4rem] top-1.5 h-2.5 w-2.5 rounded-full bg-gold ring-4 ring-cream dark:ring-navy"
              aria-hidden
            />
            <p className="font-mono text-[11px] text-gold-dim dark:text-gold">{e.date}</p>
            <p className="mt-0.5 text-sm font-semibold text-navy dark:text-cream">{e.label}</p>
            <p className="mt-1 text-sm text-ink-muted dark:text-cream/65">{e.note}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
