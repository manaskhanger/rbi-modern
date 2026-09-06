import { useId, useState } from 'react'

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
  const panelId = useId()
  const plainTabId = useId()
  const formalTabId = useId()

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
            ['plain', 'Plain English', plainTabId],
            ['formal', 'Formal summary', formalTabId],
          ] as const
        ).map(([id, label, tabId]) => (
          <button
            key={id}
            id={tabId}
            type="button"
            role="tab"
            aria-selected={mode === id}
            aria-controls={panelId}
            tabIndex={mode === id ? 0 : -1}
            onClick={() => setMode(id)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault()
                setMode((m) => (m === 'plain' ? 'formal' : 'plain'))
              }
            }}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
              mode === id
                ? 'bg-navy text-cream dark:bg-gold dark:text-navy'
                : 'text-ink-muted hover:text-navy dark:text-cream/60 dark:hover:text-cream'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={mode === 'plain' ? plainTabId : formalTabId}
        className="mt-3"
      >
        <p className="text-sm leading-relaxed text-ink-muted dark:text-cream/75">
          {mode === 'plain' ? plain : formal}
        </p>
      </div>
      <p className="mt-2 text-[10px] text-ink-muted/70 dark:text-cream/40">
        Both versions are original educational paraphrases for this prototype — not scraped RBI text.
      </p>
    </div>
  )
}
