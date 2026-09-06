import { useEffect, useMemo, useState } from 'react'

type Props = {
  storageKey: string
  items: string[]
}

export function ObligationsChecklist({ storageKey, items }: Props) {
  const key = `rbi-proto-obl:${storageKey}`

  const initial = useMemo(() => {
    try {
      const raw = localStorage.getItem(key)
      if (!raw) return {} as Record<number, boolean>
      return JSON.parse(raw) as Record<number, boolean>
    } catch {
      return {} as Record<number, boolean>
    }
  }, [key])

  const [checked, setChecked] = useState<Record<number, boolean>>(initial)

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(checked))
    } catch {
      /* ignore quota / private mode */
    }
  }, [key, checked])

  const done = items.reduce((n, _, i) => n + (checked[i] ? 1 : 0), 0)

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-ink-muted dark:text-cream/55">
          Local checklist only ({done}/{items.length}) — not submitted anywhere.
        </p>
        <button
          type="button"
          className="text-xs font-medium text-gold-dim hover:underline dark:text-gold"
          onClick={() => setChecked({})}
        >
          Clear checks
        </button>
      </div>
      <ul className="space-y-2">
        {items.map((o, i) => (
          <li key={o}>
            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-navy/10 bg-white/70 px-4 py-2.5 text-sm dark:border-white/10 dark:bg-navy-light/40">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 accent-[#C5A572]"
                checked={!!checked[i]}
                onChange={() =>
                  setChecked((prev) => ({ ...prev, [i]: !prev[i] }))
                }
              />
              <span
                className={
                  checked[i]
                    ? 'text-ink-muted line-through dark:text-cream/50'
                    : 'text-navy dark:text-cream/85'
                }
              >
                {o}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
