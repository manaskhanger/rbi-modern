import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { circulars } from '../data/circulars'
import { Badge } from '../components/Badge'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { AuthoritativeSource } from '../components/AuthoritativeSource'
import { ContentReviewed } from '../components/IllustrativeLabel'

export function CircularDetail() {
  const { slug } = useParams()
  const doc = circulars.find((c) => c.slug === slug)

  if (!doc) {
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

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <Link
        to="/circulars"
        className="mb-6 inline-flex items-center gap-2 text-sm text-ink-muted hover:text-navy dark:hover:text-cream"
      >
        <ArrowLeft className="h-4 w-4" /> All circulars
      </Link>
      <Badge>{doc.category}</Badge>
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
        <p className="mt-2 text-base text-ink-muted dark:text-cream/75">{doc.summary}</p>
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
