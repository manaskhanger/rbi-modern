import { useState } from 'react'

export type SummaryMode = 'plain' | 'formal'

type Props = {
  plain: string
  formal: string
  /** Optional short lead above the toggle body */
  lead?: string
  className?: string
}

export function SummaryModeToggle({ plain, formal, lead, className = '' }: Props) {
  const [mode, setMode] = useState<SummaryMode>('plain')

  return (
    <div className={className}>
      {lead && (
        <p className="text-sm font-medium text-navy/80 dark:text-cream/80">{lead}</p>
      )}
      <div
        className="mt-3 inline-flex rounded-lg border border-navy/10 bg-white/80 p-0.5 dark:border-white/10 dark:bg-navy-light/50"
        role="tablist"
        aria-label="Summary language"
      >
        {(
          [
            ['plain', 'Plain English'],
            ['formal', 'Formal summary'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={mode === id}
            onClick={() => setMode(id)}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
              mode === id
                ? 'bg-navy text-cream dark:bg-gold dark:text-navy'
                : 'text-ink-muted hover:text-navy dark:text-cream/60 dark:hover:text-cream'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted dark:text-cream/75">
        {mode === 'plain' ? plain : formal}
      </p>
      <p className="mt-2 text-[10px] text-ink-muted/70 dark:text-cream/40">
        Both versions are original educational paraphrases for this prototype — not scraped RBI text.
      </p>
    </div>
  )
}
