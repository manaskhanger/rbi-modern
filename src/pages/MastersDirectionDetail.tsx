import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { mastersDirections } from '../data/mastersDirections'
import { Badge } from '../components/Badge'
import { DisclaimerBanner } from '../components/DisclaimerBanner'

export function MastersDirectionDetail() {
  const { slug } = useParams()
  const doc = mastersDirections.find((d) => d.slug === slug)

  if (!doc) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-lg font-semibold text-navy dark:text-cream">Direction not found</p>
        <p className="mt-2 text-sm text-ink-muted">That slug is not in this prototype catalogue.</p>
        <Link to="/masters-directions" className="mt-4 inline-block text-gold-dim underline">
          Back to catalogue
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <Link
        to="/masters-directions"
        className="mb-6 inline-flex items-center gap-2 text-sm text-ink-muted hover:text-navy dark:hover:text-cream"
      >
        <ArrowLeft className="h-4 w-4" /> All directions
      </Link>
      <div className="grid gap-10 lg:grid-cols-[200px_1fr]">
        <aside className="prose-toc lg:sticky lg:top-28 lg:self-start">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-gold-dim dark:text-gold">
            On this page
          </p>
          <ul className="space-y-2 text-sm">
            {[
              ['#executive', 'Executive summary'],
              ['#audience', 'Who it applies to'],
              ['#obligations', 'Key obligations'],
              ['#related', 'Related topics'],
              ...doc.toc.map((t) => [`#${t.id}`, t.label] as const),
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="text-ink-muted hover:text-gold-dim dark:text-cream/60">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </aside>
        <article>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{doc.category}</Badge>
            <span className="font-mono text-xs text-gold-dim dark:text-gold">{doc.code}</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold text-navy dark:text-cream md:text-3xl">{doc.title}</h1>
          <p className="mt-2 text-sm text-ink-muted dark:text-cream/55">
            Issued {doc.issued} · Updated {doc.updated} · Educational paraphrase
          </p>
          <p className="mt-2 text-xs leading-relaxed text-ink-muted dark:text-cream/50">
            {doc.effectiveNote}
          </p>

          <section id="executive" className="mt-8 scroll-mt-32">
            <h2 className="text-lg font-bold text-navy dark:text-cream">Executive summary</h2>
            <p className="mt-2 text-sm font-medium text-navy/80 dark:text-cream/80">{doc.summary}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted dark:text-cream/75">
              {doc.plainEnglish}
            </p>
          </section>

          <section id="audience" className="mt-8 scroll-mt-32">
            <h2 className="text-lg font-bold text-navy dark:text-cream">Who it applies to</h2>
            <p className="mt-2 rounded-lg border border-navy/10 bg-white/70 px-4 py-3 text-sm dark:border-white/10 dark:bg-navy-light/40">
              {doc.audience}
            </p>
          </section>

          <section id="obligations" className="mt-8 scroll-mt-32">
            <h2 className="text-lg font-bold text-navy dark:text-cream">Key obligations</h2>
            <ul className="mt-3 space-y-2">
              {doc.obligations.map((o) => (
                <li
                  key={o}
                  className="rounded-lg border border-navy/10 bg-white/70 px-4 py-2.5 text-sm dark:border-white/10 dark:bg-navy-light/40"
                >
                  {o}
                </li>
              ))}
            </ul>
          </section>

          <section id="related" className="mt-8 scroll-mt-32">
            <h2 className="text-lg font-bold text-navy dark:text-cream">Related topics</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {doc.relatedTopics.map((t) => (
                <Badge key={t} tone="muted">
                  {t}
                </Badge>
              ))}
            </div>
          </section>

          {doc.sections.map((s) => (
            <section key={s.id} id={s.id} className="mt-8 scroll-mt-32">
              <h2 className="text-lg font-bold text-navy dark:text-cream">{s.heading}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted dark:text-cream/75">{s.body}</p>
            </section>
          ))}

          <div className="mt-10">
            <DisclaimerBanner />
          </div>
        </article>
      </div>
    </div>
  )
}
