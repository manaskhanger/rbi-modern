import { useMemo, useState } from 'react'
import { MapPin } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { offices } from '../data/offices'

const regions = ['All', 'North', 'South', 'East', 'West', 'Central', 'North-East'] as const

export function Offices() {
  const [region, setRegion] = useState<(typeof regions)[number]>('All')
  const list = useMemo(
    () => (region === 'All' ? offices : offices.filter((o) => o.region === region)),
    [region],
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <PageHeader
        eyebrow="Network"
        title="Regional offices"
        description="Mock directory of regional touchpoints for educational navigation. Addresses are illustrative placeholders."
      />
      <div className="mb-8 flex flex-wrap gap-2">
        {regions.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRegion(r)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              region === r
                ? 'bg-navy text-cream dark:bg-gold dark:text-navy'
                : 'bg-white text-navy/70 dark:bg-navy-light dark:text-cream/70'
            }`}
          >
            {r}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((o) => (
          <div
            key={o.city}
            className="glass-card rounded-2xl p-5 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-gold/15 p-2">
                <MapPin className="h-4 w-4 text-gold-dim dark:text-gold" />
              </div>
              <div>
                <h2 className="font-semibold text-navy dark:text-cream">{o.city}</h2>
                <p className="text-xs text-gold-dim dark:text-gold">
                  {o.type} · {o.region}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm text-ink-muted dark:text-cream/65">{o.address}</p>
            <p className="mt-2 text-sm text-ink-muted dark:text-cream/60">{o.focus}</p>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <DisclaimerBanner />
      </div>
    </div>
  )
}
