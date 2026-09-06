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
import { slugifyTerm } from '../lib/searchIndex'

const icons = { Target, Building2, Smartphone, Banknote, Globe2, Shield } as const

const functionMap = [
  { cluster: 'Price & liquidity', items: ['Monetary policy / MPC', 'Liquidity operations (LAF)', 'Government securities markets'] },
  { cluster: 'Prudential oversight', items: ['Bank licensing & supervision', 'NBFC scale-based regulation', 'Conduct & consumer protection'] },
  { cluster: 'Payments & currency', items: ['Payment system authorisation', 'UPI / NEFT / RTGS oversight', 'Note issue & clean-note policy'] },
  { cluster: 'External & stability', items: ['FEMA / forex administration', 'Foreign exchange reserves', 'Financial stability monitoring'] },
]


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
        title="Function map, explainers & glossary"
        description="Tone aimed at officers reviewing communication design and at students building central-banking literacy. Original educational copy for this prototype."
      />


      <section className="mb-14">
        <Reveal>
          <h2 className="mb-2 text-xl font-bold text-navy dark:text-cream md:text-2xl">
            Map of RBI functions
          </h2>
          <p className="mb-6 text-sm text-ink-muted dark:text-cream/60">
            One-page schematic clustering public functions. Illustrative — not an organisation chart
            or statutory schedule.
          </p>
        </Reveal>
        <div className="rounded-xl border border-navy/10 bg-white/80 p-5 dark:border-white/10 dark:bg-navy-light/40">
          <div className="mb-4 text-center">
            <span className="inline-block rounded-md border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-semibold text-navy dark:text-cream">
              Reserve Bank of India — public functions (educational map)
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {functionMap.map((col) => (
              <div
                key={col.cluster}
                className="rounded-lg border border-navy/10 bg-cream/60 p-3 dark:border-white/10 dark:bg-navy/40"
              >
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gold-dim dark:text-gold">
                  {col.cluster}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md bg-white/80 px-2 py-1.5 text-xs text-navy dark:bg-navy-light/60 dark:text-cream"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-[10px] uppercase tracking-wider text-ink-muted dark:text-cream/45">
            Illustrative composite for this prototype
          </p>
        </div>
      </section>

      <section className="mb-14">
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
                <div className="glass-card h-full rounded-xl p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15">
                    <Icon className="h-6 w-6 text-gold-dim dark:text-gold" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-navy dark:text-cream">
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

      <section id="glossary">
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
              id={`glossary-${slugifyTerm(t.term)}`}
              className="scroll-mt-28 rounded-2xl border border-navy/8 bg-white/70 px-5 py-4 dark:border-white/10 dark:bg-navy-light/40"
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
