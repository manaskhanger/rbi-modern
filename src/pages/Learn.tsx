import { useMemo, useState } from 'react'
import {
  Target,
  Building2,
  Smartphone,
  Banknote,
  Globe2,
  Shield,
  Search,
} from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Reveal } from '../components/Reveal'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { glossary, howRbiWorks } from '../data/glossary'

const icons = { Target, Building2, Smartphone, Banknote, Globe2, Shield } as const

export function Learn() {
  const [q, setQ] = useState('')
  const terms = useMemo(() => {
    const needle = q.toLowerCase().trim()
    if (!needle) return glossary
    return glossary.filter(
      (t) =>
        t.term.toLowerCase().includes(needle) ||
        t.definition.toLowerCase().includes(needle),
    )
  }, [q])

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <PageHeader
        eyebrow="Learn"
        title="How RBI works & glossary"
        description="Illustrated explainers plus a searchable glossary of central-banking terms used across this demo."
      />

      <section className="mb-16">
        <Reveal>
          <h2 className="mb-8 text-2xl font-bold text-navy dark:text-cream">
            How RBI works
          </h2>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {howRbiWorks.map((item, i) => {
            const Icon = icons[item.icon as keyof typeof icons]
            return (
              <Reveal key={item.id} delay={i * 0.05}>
                <div className="glass-card h-full rounded-3xl p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15">
                    <Icon className="h-6 w-6 text-gold-dim dark:text-gold" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-navy dark:text-cream">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted dark:text-cream/65">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-navy dark:text-cream">Glossary</h2>
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search terms…"
              className="w-full rounded-xl border border-navy/10 bg-white py-2 pl-10 pr-3 text-sm outline-none ring-gold/40 focus:ring-2 dark:border-white/15 dark:bg-navy-light"
            />
          </div>
        </div>
        <div className="space-y-3">
          {terms.map((t) => (
            <div
              key={t.term}
              className="rounded-2xl border border-navy/8 bg-white/70 px-5 py-4 dark:border-white/10 dark:bg-navy-light/40"
            >
              <h3 className="font-semibold text-navy dark:text-cream">{t.term}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted dark:text-cream/70">
                {t.definition}
              </p>
              {t.related && (
                <p className="mt-2 text-xs text-gold-dim dark:text-gold">
                  Related: {t.related.join(' · ')}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10">
        <DisclaimerBanner />
      </div>
    </div>
  )
}
