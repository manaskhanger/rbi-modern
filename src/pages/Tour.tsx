import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Compass, ExternalLink, X } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { PersonaCards } from '../components/PersonaCards'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { ExploreNext } from '../components/ExploreNext'
import { tourSteps, TOUR_DURATION_LABEL } from '../data/tour'
import { setTourDismissed } from '../lib/tourStorage'

export function Tour() {
  const [step, setStep] = useState(0)
  const [dontShow, setDontShow] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const checkId = useId()
  const navigate = useNavigate()
  const total = tourSteps.length
  const current = tourSteps[step]
  const isLast = step === total - 1
  const isFirst = step === 0

  const go = useCallback(
    (next: number) => {
      setStep(Math.max(0, Math.min(total - 1, next)))
    },
    [total],
  )

  const finish = useCallback(
    (markDismissed: boolean) => {
      if (markDismissed || dontShow) setTourDismissed(true)
      navigate('/')
    },
    [dontShow, navigate],
  )

  useEffect(() => {
    panelRef.current?.focus()
  }, [step])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        finish(dontShow)
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        if (isLast) finish(dontShow)
        else go(step + 1)
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        go(step - 1)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [step, isLast, dontShow, finish, go])

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <PageHeader
        eyebrow="Demo tour"
        title="Guided tour"
        description={`A calm ${TOUR_DURATION_LABEL} walkthrough of this unofficial educational prototype. Keyboard: ← → to move, Esc to leave.`}
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        role="region"
        aria-labelledby={titleId}
        aria-roledescription="carousel"
        aria-describedby="tour-progress"
        className="rounded-2xl border border-navy/10 bg-white/90 p-5 outline-none focus-visible:ring-2 focus-visible:ring-gold/50 dark:border-white/10 dark:bg-navy-light/50 md:p-8"
      >
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-gold-dim dark:text-gold">
            <Compass className="h-5 w-5" aria-hidden />
            <p id="tour-progress" className="text-xs font-semibold uppercase tracking-widest">
              Step {step + 1} of {total}
            </p>
          </div>
          <button
            type="button"
            onClick={() => finish(dontShow)}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-ink-muted transition hover:bg-navy/5 hover:text-navy dark:text-cream/55 dark:hover:bg-white/10 dark:hover:text-cream"
            aria-label="Exit tour"
          >
            <X className="h-3.5 w-3.5" aria-hidden /> Exit
          </button>
        </div>

        <div
          className="mb-6 h-1.5 overflow-hidden rounded-full bg-navy/10 dark:bg-white/10"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={step + 1}
          aria-label={`Tour progress: step ${step + 1} of ${total}`}
        >
          <div
            className="h-full rounded-full bg-gold transition-[width] duration-300 ease-out"
            style={{ width: `${((step + 1) / total) * 100}%` }}
          />
        </div>

        <p className="text-[10px] font-semibold uppercase tracking-widest text-gold-dim dark:text-gold">
          {current.hint ?? `Step ${step + 1}`}
        </p>
        <h2 id={titleId} className="mt-2 text-xl font-bold text-navy dark:text-cream md:text-2xl">
          {current.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted dark:text-cream/70 md:text-base">
          {current.body}
        </p>

        <div className="mt-5">
          {current.ctaHref ? (
            <a
              href={current.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-navy/15 bg-white px-4 py-2 text-sm font-semibold text-navy transition hover:border-gold/40 dark:border-white/20 dark:bg-navy/40 dark:text-cream"
            >
              {current.ctaLabel}
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          ) : current.ctaTo ? (
            <Link
              to={current.ctaTo}
              className="inline-flex items-center gap-2 rounded-md border border-navy/15 bg-white px-4 py-2 text-sm font-semibold text-navy transition hover:border-gold/40 dark:border-white/20 dark:bg-navy/40 dark:text-cream"
            >
              {current.ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          ) : null}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-navy/8 pt-5 dark:border-white/10">
          <button
            type="button"
            onClick={() => go(step - 1)}
            disabled={isFirst}
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-navy disabled:cursor-not-allowed disabled:opacity-40 dark:text-cream"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> Back
          </button>

          <div className="flex flex-wrap items-center gap-2">
            {!isLast && (
              <button
                type="button"
                onClick={() => finish(dontShow)}
                className="rounded-md px-3 py-2 text-sm font-medium text-ink-muted hover:text-navy dark:text-cream/55 dark:hover:text-cream"
              >
                Skip tour
              </button>
            )}
            {isLast ? (
              <button
                type="button"
                onClick={() => finish(true)}
                className="inline-flex items-center gap-1.5 rounded-md bg-navy px-4 py-2 text-sm font-semibold text-cream transition hover:bg-navy-light dark:bg-gold dark:text-navy dark:hover:bg-gold-soft"
              >
                Done · back to Home <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => go(step + 1)}
                className="inline-flex items-center gap-1.5 rounded-md bg-navy px-4 py-2 text-sm font-semibold text-cream transition hover:bg-navy-light dark:bg-gold dark:text-navy dark:hover:bg-gold-soft"
              >
                Next <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            )}
          </div>
        </div>

        <label
          htmlFor={checkId}
          className="mt-4 inline-flex cursor-pointer items-center gap-2 text-xs text-ink-muted dark:text-cream/55"
        >
          <input
            id={checkId}
            type="checkbox"
            checked={dontShow}
            onChange={(e) => setDontShow(e.target.checked)}
            className="rounded border-navy/30 text-navy focus-visible:ring-2 focus-visible:ring-gold/50"
          />
          Don’t show the Home “Start here” prompt again
        </label>
      </div>

      <section className="mt-14" aria-labelledby="personas-heading">
        <h2 id="personas-heading" className="text-xl font-bold text-navy dark:text-cream md:text-2xl">
          Choose a persona path
        </h2>
        <p className="mt-2 mb-6 text-sm text-ink-muted dark:text-cream/65">
          Short prescribed routes for demo walkthroughs — same unofficial prototype framing.
        </p>
        <PersonaCards compact />
      </section>

      <ExploreNext pathname="/tour" />
      <div className="mt-10">
        <DisclaimerBanner />
      </div>
    </div>
  )
}
