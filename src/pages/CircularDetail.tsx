import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { circulars } from '../data/circulars'
import { mastersDirections } from '../data/mastersDirections'
import { enrichCircular } from '../data/relations'
import { Badge } from '../components/Badge'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { AuthoritativeSource } from '../components/AuthoritativeSource'
import { ContentReviewed } from '../components/IllustrativeLabel'
import { SummaryModeToggle } from '../components/SummaryModeToggle'

export function CircularDetail() {
  const { slug } = useParams()
  const raw = circulars.find((c) => c.slug === slug)

  if (!raw) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-lg font-semibold">Circular not found</p>
        <p className="mt-2 text-sm text-ink-muted">That slug is not in this prototype set.</p>
        <Link to="/circulars" className="mt-4 inline-block text-gold-dim underline">
          Back
        </Link>
      </div>
    )
  }

  const doc = enrichCircular(raw)
  const relatedDirections = doc.relatedDirectionSlugs
    .map((s) => mastersDirections.find((d) => d.slug === s))
    .filter(Boolean)

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <Link
        to="/circulars"
        className="mb-6 inline-flex items-center gap-2 text-sm text-ink-muted hover:text-navy dark:hover:text-cream"
      >
        <ArrowLeft className="h-4 w-4" /> All circulars
      </Link>
      <div className="flex flex-wrap gap-2">
        <Badge>{doc.category}</Badge>
        {doc.audiences.map((a) => (
          <Badge key={a} tone="muted">
            {a}
          </Badge>
        ))}
      </div>
      <h1 className="mt-3 text-2xl font-bold text-navy dark:text-cream md:text-3xl">{doc.title}</h1>
      <p className="mt-2 text-sm text-ink-muted dark:text-cream/55">
        {doc.date} · <span className="font-mono text-gold-dim">{doc.ref}</span>
      </p>
      <ContentReviewed lastReviewed={doc.lastReviewed} className="mt-1" />

      <div className="mt-6">
        <AuthoritativeSource section="notifications" />
      </div>

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gold-dim dark:text-gold">
          Executive summary
        </h2>
        <SummaryModeToggle
          className="mt-2"
          lead={doc.summary}
          plain={doc.plainEnglish}
          formal={doc.formalSummary}
        />
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gold-dim dark:text-gold">
          Who it applies to
        </h2>
        <p className="mt-2 rounded-lg border border-navy/10 bg-white/70 px-4 py-3 text-sm dark:border-white/10 dark:bg-navy-light/40">
          {doc.audience}
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gold-dim dark:text-gold">
          Key points
        </h2>
        <div className="mt-3 space-y-3">
          {doc.body.map((p) => (
            <p key={p} className="text-sm leading-relaxed text-ink-muted dark:text-cream/70">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gold-dim dark:text-gold">
          Related Masters Directions
        </h2>
        <p className="mt-1 text-xs text-ink-muted dark:text-cream/50">
          Cross-links tagged in this prototype — verify against official instruments.
        </p>
        {relatedDirections.length === 0 ? (
          <p className="mt-2 text-sm text-ink-muted">No related directions tagged.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {relatedDirections.map((d) =>
              d ? (
                <li key={d.slug}>
                  <Link
                    to={`/masters-directions/${d.slug}`}
                    className="block rounded-lg border border-navy/10 bg-white/70 px-4 py-3 transition hover:border-gold/40 dark:border-white/10 dark:bg-navy-light/40"
                  >
                    <span className="font-mono text-[11px] text-gold-dim dark:text-gold">
                      {d.code}
                    </span>
                    <span className="mt-0.5 block text-sm font-semibold text-navy dark:text-cream">
                      {d.title}
                    </span>
                  </Link>
                </li>
              ) : null,
            )}
          </ul>
        )}
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gold-dim dark:text-gold">
          Related topics
        </h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {doc.relatedTopics.map((t) => (
            <Badge key={t} tone="muted">
              {t}
            </Badge>
          ))}
        </div>
        <p className="mt-3 text-xs text-ink-muted dark:text-cream/50">{doc.effectiveNote}</p>
      </section>

      <div className="mt-10">
        <DisclaimerBanner />
      </div>
    </div>
  )
}
