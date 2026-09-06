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
        <p className="text-lg">Direction not found.</p>
        <Link to="/masters-directions" className="mt-4 inline-block text-gold-dim underline">
          Back to catalogue
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <Link
        to="/masters-directions"
        className="mb-8 inline-flex items-center gap-2 text-sm text-ink-muted hover:text-navy dark:hover:text-cream"
      >
        <ArrowLeft className="h-4 w-4" /> All directions
      </Link>
      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="prose-toc lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold-dim dark:text-gold">
            On this page
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#summary" className="text-ink-muted hover:text-gold-dim dark:text-cream/60">
                Plain English
              </a>
            </li>
            <li>
              <a
                href="#obligations"
                className="text-ink-muted hover:text-gold-dim dark:text-cream/60"
              >
                Key obligations
              </a>
            </li>
            {doc.toc.map((t) => (
              <li key={t.id}>
                <a
                  href={`#${t.id}`}
                  className="text-ink-muted hover:text-gold-dim dark:text-cream/60"
                >
                  {t.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>
        <article>
          <Badge>{doc.category}</Badge>
          <h1 className="mt-4 text-3xl font-bold text-navy dark:text-cream md:text-4xl">
            {doc.title}
          </h1>
          <p className="mt-3 text-sm text-ink-muted dark:text-cream/55">
            Issued {doc.issued} · Updated {doc.updated} · Educational summary
          </p>

          <section id="summary" className="mt-10 scroll-mt-28">
            <h2 className="text-xl font-bold text-navy dark:text-cream">Plain-English summary</h2>
            <p className="mt-3 leading-relaxed text-ink-muted dark:text-cream/75">
              {doc.plainEnglish}
            </p>
          </section>

          <section id="obligations" className="mt-10 scroll-mt-28">
            <h2 className="text-xl font-bold text-navy dark:text-cream">Key obligations</h2>
            <ul className="mt-4 space-y-3">
              {doc.obligations.map((o) => (
                <li
                  key={o}
                  className="rounded-xl border border-navy/10 bg-white/70 px-4 py-3 text-sm dark:border-white/10 dark:bg-navy-light/40"
                >
                  {o}
                </li>
              ))}
            </ul>
          </section>

          {doc.sections.map((s) => (
            <section key={s.id} id={s.id} className="mt-10 scroll-mt-28">
              <h2 className="text-xl font-bold text-navy dark:text-cream">{s.heading}</h2>
              <p className="mt-3 leading-relaxed text-ink-muted dark:text-cream/75">{s.body}</p>
            </section>
          ))}

          <div className="mt-12">
            <DisclaimerBanner />
          </div>
        </article>
      </div>
    </div>
  )
}
