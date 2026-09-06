import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { mastersDirections } from '../data/mastersDirections'
import { circulars } from '../data/circulars'
import { enrichDirection } from '../data/relations'
import { Badge } from '../components/Badge'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { AuthoritativeSource } from '../components/AuthoritativeSource'
import { ContentReviewed } from '../components/IllustrativeLabel'
import { SummaryModeToggle } from '../components/SummaryModeToggle'
import { ObligationsChecklist } from '../components/ObligationsChecklist'
import { ApplicabilityMatrix } from '../components/ApplicabilityMatrix'
import { ChangeHistory } from '../components/ChangeHistory'

export function MastersDirectionDetail() {
  const { slug } = useParams()
  const raw = mastersDirections.find((d) => d.slug === slug)

  if (!raw) {
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

  const doc = enrichDirection(raw)
  const relatedCirculars = doc.relatedCircularSlugs
    .map((s) => circulars.find((c) => c.slug === s))
    .filter(Boolean)

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
              ['#related-circulars', 'Related circulars'],
              ['#change-history', 'Change history'],
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
            {doc.audiences.map((a) => (
              <Badge key={a} tone="muted">
                {a}
              </Badge>
            ))}
          </div>
          <h1 className="mt-3 text-2xl font-bold text-navy dark:text-cream md:text-3xl">
            {doc.title}
          </h1>
          <p className="mt-2 text-sm text-ink-muted dark:text-cream/55">
            Issued {doc.issued} · Updated {doc.updated} · Educational paraphrase
          </p>
          <ContentReviewed lastReviewed={doc.lastReviewed} className="mt-1" />
          <p className="mt-2 text-xs leading-relaxed text-ink-muted dark:text-cream/50">
            {doc.effectiveNote}
          </p>

          <div className="mt-6">
            <AuthoritativeSource section="mastersDirections" />
          </div>

          <section id="executive" className="mt-8 scroll-mt-32">
            <h2 className="text-lg font-bold text-navy dark:text-cream">Executive summary</h2>
            <SummaryModeToggle
              className="mt-2"
              lead={doc.summary}
              plain={doc.plainEnglishFull}
              formal={doc.formalSummary}
            />
          </section>

          <section id="audience" className="mt-8 scroll-mt-32">
            <h2 className="text-lg font-bold text-navy dark:text-cream">Who it applies to</h2>
            <div className="mt-3">
              <ApplicabilityMatrix rows={doc.applicability} audienceBlurb={doc.audience} />
            </div>
          </section>

          <section id="obligations" className="mt-8 scroll-mt-32">
            <h2 className="text-lg font-bold text-navy dark:text-cream">Key obligations</h2>
            <p className="mt-1 text-xs text-ink-muted dark:text-cream/55">
              Educational checklist — tick items locally while reviewing. Not a compliance attestation.
            </p>
            <div className="mt-3">
              <ObligationsChecklist storageKey={doc.slug} items={doc.obligations} />
            </div>
          </section>

          <section id="related-circulars" className="mt-8 scroll-mt-32">
            <h2 className="text-lg font-bold text-navy dark:text-cream">Related circulars</h2>
            <p className="mt-1 text-xs text-ink-muted dark:text-cream/55">
              Seeded links within this prototype catalogue (by theme) — not an official cross-index.
            </p>
            {relatedCirculars.length === 0 ? (
              <p className="mt-3 text-sm text-ink-muted">No related circulars tagged in this sample.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {relatedCirculars.map((c) =>
                  c ? (
                    <li key={c.slug}>
                      <Link
                        to={`/circulars/${c.slug}`}
                        className="block rounded-lg border border-navy/10 bg-white/70 px-4 py-3 transition hover:border-gold/40 dark:border-white/10 dark:bg-navy-light/40"
                      >
                        <span className="text-sm font-semibold text-navy dark:text-cream">
                          {c.title}
                        </span>
                        <span className="mt-0.5 block font-mono text-[11px] text-gold-dim dark:text-gold">
                          {c.ref} · {c.date}
                        </span>
                        <span className="mt-1 block text-xs text-ink-muted dark:text-cream/60">
                          {c.summary}
                        </span>
                      </Link>
                    </li>
                  ) : null,
                )}
              </ul>
            )}
          </section>

          <section id="change-history" className="mt-8 scroll-mt-32">
            <h2 className="text-lg font-bold text-navy dark:text-cream">Change history</h2>
            <div className="mt-3">
              <ChangeHistory entries={doc.changeHistory} />
            </div>
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
              <p className="mt-2 text-sm leading-relaxed text-ink-muted dark:text-cream/75">
                {s.body}
              </p>
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
