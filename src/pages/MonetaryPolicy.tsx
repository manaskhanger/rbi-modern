import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceArea,
} from 'recharts'
import { PageHeader } from '../components/PageHeader'
import { Reveal } from '../components/Reveal'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { policyRateHistory, keyRatesAsOf } from '../data/rates'

const mpcSteps = [
  {
    title: 'Mandate',
    text: 'Under flexible inflation targeting, the MPC’s primary objective is price stability while keeping growth in mind. The notified CPI target is 4%, with a tolerance band of 2–6%.',
  },
  {
    title: 'Composition',
    text: 'Six members: the RBI Governor (Chair), a Deputy Governor in charge of monetary policy, one officer of the Bank nominated by the Central Board, and three external members appointed by the Central Government.',
  },
  {
    title: 'Decision rule',
    text: 'Each member has one vote. The policy repo rate is decided by majority. The Governor has a casting vote in the event of a tie.',
  },
  {
    title: 'Communication',
    text: 'A resolution is issued after the meeting; a statement and, later, minutes explain the reasoning. This prototype uses sample narratives only.',
  },
]

const targeting = [
  { label: 'Below 2%', tone: 'Below the tolerance band — disinflation / demand-weakness risks may rise', color: 'bg-sky-600' },
  { label: '2% – 4% – 6%', tone: 'Tolerance band around the 4% CPI target (educational framing)', color: 'bg-emerald-700' },
  { label: 'Above 6%', tone: 'Above the band — policy may need to tighten to restore credibility', color: 'bg-rose-700' },
]

function SampleTooltip({ active, payload, label }: {
  active?: boolean
  payload?: { name: string; value: number; color: string }[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-md border border-navy/10 bg-white px-3 py-2 text-xs shadow-md dark:border-white/15 dark:bg-navy-light">
      <p className="mb-1 font-semibold">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {p.value}%
        </p>
      ))}
      <p className="mt-1 text-[10px] text-ink-muted">ILLUSTRATIVE SAMPLE DATA</p>
    </div>
  )
}

export function MonetaryPolicy() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <PageHeader
        eyebrow="Monetary policy"
        title="MPC, inflation targeting & the policy rate"
        description="Careful educational framing of the Monetary Policy Committee, the 2–6% CPI tolerance band, and illustrative charts of repo versus inflation. Not a live policy dashboard."
      />

      <section className="mb-12">
        <Reveal>
          <h2 className="mb-5 text-xl font-bold text-navy dark:text-cream md:text-2xl">
            Monetary Policy Committee
          </h2>
        </Reveal>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {mpcSteps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.04}>
              <div className="glass-card h-full rounded-xl p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dim dark:text-gold">
                  0{i + 1}
                </span>
                <h3 className="mt-1.5 text-sm font-semibold text-navy dark:text-cream">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-muted dark:text-cream/65">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <Reveal>
          <h2 className="mb-1 text-xl font-bold text-navy dark:text-cream md:text-2xl">
            Policy rates &amp; inflation
          </h2>
          <p className="mb-5 text-sm text-ink-muted dark:text-cream/60">
            ILLUSTRATIVE SAMPLE DATA · {keyRatesAsOf} · not an official time series
          </p>
        </Reveal>
        <div className="glass-card h-80 rounded-xl p-3 md:p-5">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={policyRateHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" />
              <ReferenceArea y1={2} y2={6} fill="#C5A572" fillOpacity={0.08} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[0, 8]} />
              <Tooltip content={<SampleTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="repo"
                name="Repo %"
                stroke="#C5A572"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="inflation"
                name="CPI YoY %"
                stroke="#0B1D36"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 text-xs text-ink-muted dark:text-cream/50">
          Shaded band marks the educational 2–6% CPI tolerance zone around the 4% target.
        </p>
      </section>

      <section className="mb-12">
        <Reveal>
          <h2 className="mb-5 text-xl font-bold text-navy dark:text-cream md:text-2xl">
            Inflation targeting band (educational)
          </h2>
        </Reveal>
        <div className="overflow-hidden rounded-xl border border-navy/10 dark:border-white/10">
          {targeting.map((t) => (
            <div
              key={t.label}
              className="flex flex-col gap-1 border-b border-navy/10 px-4 py-3.5 last:border-0 sm:flex-row sm:items-center sm:justify-between dark:border-white/10"
            >
              <div className="flex items-center gap-3">
                <span className={`h-2.5 w-2.5 rounded-full ${t.color}`} aria-hidden />
                <span className="text-sm font-semibold text-navy dark:text-cream">{t.label}</span>
              </div>
              <span className="text-sm text-ink-muted dark:text-cream/65">{t.tone}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-ink-muted dark:text-cream/60">
          When inflation drifts from target, the MPC can raise or lower the repo rate. Banks then
          adjust lending and deposit rates — with lags — affecting spending and investment. This
          transmission story is simplified for education.
        </p>
      </section>

      <DisclaimerBanner />
    </div>
  )
}
