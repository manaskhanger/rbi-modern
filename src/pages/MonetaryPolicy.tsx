import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { PageHeader } from '../components/PageHeader'
import { Reveal } from '../components/Reveal'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { policyRateHistory } from '../data/rates'

const mpcSteps = [
  { title: 'Mandate', text: 'Keep CPI inflation at 4% ± 2% while mindful of growth.' },
  { title: 'Six members', text: 'RBI Governor (Chair), a DG, one RBI nominee, three external experts.' },
  { title: 'Vote', text: 'Each member has one vote; majority decides the policy repo rate.' },
  { title: 'Communicate', text: 'Resolution, statement and later minutes explain the reasoning.' },
]

const targeting = [
  { label: 'Below 2%', tone: 'Too low — risk of weak demand', color: 'bg-sky-500/80' },
  { label: '2% – 4% – 6%', tone: 'Tolerance band around 4% target', color: 'bg-emerald-500/80' },
  { label: 'Above 6%', tone: 'Above band — policy may tighten', color: 'bg-rose-500/80' },
]

export function MonetaryPolicy() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <PageHeader
        eyebrow="Monetary policy"
        title="How the MPC steers interest rates"
        description="A plain-English tour of inflation targeting, the policy rate corridor, and illustrative charts of repo vs CPI."
      />

      <section className="mb-14">
        <Reveal>
          <h2 className="mb-6 text-2xl font-bold text-navy dark:text-cream">MPC explained</h2>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {mpcSteps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <div className="glass-card h-full rounded-2xl p-5">
                <span className="text-xs font-bold text-gold-dim dark:text-gold">0{i + 1}</span>
                <h3 className="mt-2 font-semibold text-navy dark:text-cream">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-muted dark:text-cream/65">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <Reveal>
          <h2 className="mb-2 text-2xl font-bold text-navy dark:text-cream">
            Policy rates & inflation (demo)
          </h2>
          <p className="mb-6 text-sm text-ink-muted dark:text-cream/60">
            Sample path — labelled illustrative. Not live official series.
          </p>
        </Reveal>
        <div className="glass-card h-80 rounded-3xl p-4 md:p-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={policyRateHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[0, 8]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="repo"
                name="Repo %"
                stroke="#C5A572"
                strokeWidth={2.5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="inflation"
                name="CPI YoY %"
                stroke="#0B1D36"
                strokeWidth={2.5}
                dot={false}
                className="dark:stroke-cream"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="mb-14">
        <Reveal>
          <h2 className="mb-6 text-2xl font-bold text-navy dark:text-cream">
            Inflation targeting diagram
          </h2>
        </Reveal>
        <div className="overflow-hidden rounded-3xl border border-navy/10 dark:border-white/10">
          {targeting.map((t) => (
            <div
              key={t.label}
              className="flex flex-col gap-1 border-b border-navy/10 px-5 py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between dark:border-white/10"
            >
              <div className="flex items-center gap-3">
                <span className={`h-3 w-3 rounded-full ${t.color}`} />
                <span className="font-semibold text-navy dark:text-cream">{t.label}</span>
              </div>
              <span className="text-sm text-ink-muted dark:text-cream/65">{t.tone}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-ink-muted dark:text-cream/60">
          When inflation drifts from target, the MPC can raise or lower the repo rate. Banks then
          adjust lending and deposit rates — with lags — affecting spending and investment across the
          economy.
        </p>
      </section>

      <DisclaimerBanner />
    </div>
  )
}
