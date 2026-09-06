import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { Compass, X } from 'lucide-react'
import { isTourDismissed, setTourDismissed } from '../lib/tourStorage'
import { TOUR_DURATION_LABEL } from '../data/tour'

/**
 * Soft “Start here” card on Home. Hidden when the user chose don’t-show-again.
 * Always re-openable via Guided tour links elsewhere.
 */
export function TourPrompt() {
  const [visible, setVisible] = useState(() => !isTourDismissed())
  const [dontShow, setDontShow] = useState(false)
  const titleId = useId()
  const checkId = useId()

  if (!visible) return null

  function dismiss() {
    if (dontShow) setTourDismissed(true)
    setVisible(false)
  }

  return (
    <aside
      className="rounded-xl border border-gold/40 bg-gold/10 p-4 dark:border-gold/30"
      aria-labelledby={titleId}
      role="region"
    >
      <div className="flex gap-3">
        <Compass
          className="mt-0.5 h-5 w-5 shrink-0 text-gold-dim dark:text-gold"
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h2 id={titleId} className="text-sm font-semibold text-navy dark:text-cream">
              Start here · Guided tour ({TOUR_DURATION_LABEL})
            </h2>
            <button
              type="button"
              onClick={dismiss}
              className="rounded-md p-1 text-ink-muted transition hover:bg-navy/5 hover:text-navy dark:text-cream/60 dark:hover:bg-white/10 dark:hover:text-cream"
              aria-label="Dismiss tour prompt"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
          <p className="mt-1 text-sm text-ink-muted dark:text-cream/65">
            A calm walkthrough of purpose, mandate, one Masters Direction, data sample mode, and
            the official rbi.org.in CTA. Dismissible anytime.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Link
              to="/tour"
              className="inline-flex items-center gap-2 rounded-md bg-navy px-4 py-2 text-xs font-semibold text-cream transition hover:bg-navy-light dark:bg-gold dark:text-navy dark:hover:bg-gold-soft"
            >
              Start guided tour
            </Link>
            <label htmlFor={checkId} className="inline-flex cursor-pointer items-center gap-2 text-xs text-ink-muted dark:text-cream/55">
              <input
                id={checkId}
                type="checkbox"
                checked={dontShow}
                onChange={(e) => setDontShow(e.target.checked)}
                className="rounded border-navy/30 text-navy focus-visible:ring-2 focus-visible:ring-gold/50"
              />
              Don’t show again
            </label>
          </div>
        </div>
      </div>
    </aside>
  )
}
