import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import {
  reports,
  sampleReportCharts,
  mprCharts,
  annualCharts,
  paymentsCharts,
} from '../data/reports'
import { Badge } from '../components/Badge'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { AuthoritativeSource } from '../components/AuthoritativeSource'
import { ContentReviewed, IllustrativeLabel } from '../components/IllustrativeLabel'
import { PrintButton } from '../components/PrintButton'
import { ChartSummary } from '../components/ChartSummary'

const COLORS = ['#0B1D36', '#C5A572', '#1a3558', '#d4bc94']

function SampleTip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: { name: string; value: number; color: string }[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-md border border-navy/10 bg-white px-3 py-2 text-xs shadow-md dark:bg-navy-light">
      <p className="mb-1 font-semibold">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {p.value}
        </p>
      ))}
      <p className="mt-1 text-[10px] text-ink-muted">Illustrative · not for compliance</p>
    </div>
  )
}

function RelatedLinks({
  links,
}: {
  links: NonNullable<(typeof reports)[number]['relatedLinks']>
}) {
  return (
    <section className="mt-10 max-w-3xl">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-gold-dim dark:text-gold">
        Related policy &amp; data
      </h2>
      <p className="mt-1 text-xs text-ink-muted dark:text-cream/50">
        In-prototype cross-links for officers navigating from publications to policy/data pages.
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link
              to={l.href}
              className="inline-flex items-center rounded-full border border-navy/10 bg-white/80 px-3 py-1.5 text-xs font-semibold text-navy transition hover:border-gold/40 dark:border-white/10 dark:bg-navy-light/40 dark:text-cream"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

function FsrBody() {
  return (
    <>
      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ink-muted dark:text-cream/75">
        This rich sample shows how a stability-style publication might combine narrative with capital
        adequacy trends, asset quality, and sector credit shares. All figures below are{' '}
        <strong>ILLUSTRATIVE SAMPLE DATA</strong> for UX review.
      </p>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <div className="glass-card flex min-h-72 flex-col rounded-xl p-4">
          <h2 className="mb-1 px-1 text-sm font-semibold text-navy dark:text-cream">
            System CRAR (sample)
          </h2>
          <IllustrativeLabel tone="chip" className="mb-2 px-1" />
          <div className="min-h-0 flex-1" style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sampleReportCharts.capitalAdequacy}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis domain={[15, 18]} tick={{ fontSize: 11 }} />
              <Tooltip content={<SampleTip />} />
              <Line type="monotone" dataKey="crar" name="CRAR %" stroke="#C5A572" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          </div>
          <ChartSummary
            title="System CRAR (sample)"
            summary="Illustrative capital adequacy ratio trend by year. Values are sample only."
            rows={sampleReportCharts.capitalAdequacy}
            className="px-1"
          />
        </div>
        <div className="glass-card flex min-h-72 flex-col rounded-xl p-4">
          <h2 className="mb-1 px-1 text-sm font-semibold text-navy dark:text-cream">
            GNPA / NNPA (sample)
          </h2>
          <IllustrativeLabel tone="chip" className="mb-2 px-1" />
          <div className="min-h-0 flex-1" style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sampleReportCharts.npaTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip content={<SampleTip />} />
              <Legend />
              <Bar dataKey="gnpa" name="GNPA %" fill="#0B1D36" radius={[3, 3, 0, 0]} />
              <Bar dataKey="nnpa" name="NNPA %" fill="#C5A572" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          </div>
          <ChartSummary
            title="GNPA / NNPA (sample)"
            summary="Illustrative gross and net NPA percentages by year."
            rows={sampleReportCharts.npaTrend}
            className="px-1"
          />
        </div>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="glass-card flex min-h-72 flex-col rounded-xl p-4">
          <h2 className="mb-1 px-1 text-sm font-semibold">Credit share by sector (sample)</h2>
          <IllustrativeLabel tone="chip" className="mb-2 px-1" />
          <div className="min-h-0 flex-1" style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sampleReportCharts.creditShare}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {sampleReportCharts.creditShare.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          </div>
          <ChartSummary
            title="Credit share by sector (sample)"
            summary="Illustrative sector credit share percentages."
            rows={sampleReportCharts.creditShare}
            className="px-1"
          />
        </div>
        <div className="glass-card rounded-xl p-5">
          <h2 className="mb-1 text-sm font-semibold">Snapshot table (sample)</h2>
          <IllustrativeLabel className="mb-3" />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-navy/10 dark:border-white/10">
                  <th className="py-2 font-semibold">Metric</th>
                  <th className="py-2 font-semibold">Value</th>
                  <th className="py-2 font-semibold">Note</th>
                </tr>
              </thead>
              <tbody>
                {sampleReportCharts.tableRows.map((row) => (
                  <tr key={row.metric} className="border-b border-navy/5 dark:border-white/5">
                    <td className="py-2">{row.metric}</td>
                    <td className="py-2 font-medium tabular-nums">{row.value}</td>
                    <td className="py-2 text-ink-muted dark:text-cream/55">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

function MprBody() {
  return (
    <>
      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ink-muted dark:text-cream/75">
        Educational chapters in the style of a Monetary Policy Report: inflation path (sample),
        growth path (sample), and a simplified transmission-strength chart. Fan-chart style bands
        are schematic only.
      </p>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <div className="glass-card flex min-h-72 flex-col rounded-xl p-4">
          <h2 className="mb-1 px-1 text-sm font-semibold">CPI path &amp; sample forecast band</h2>
          <IllustrativeLabel tone="chip" className="mb-2 px-1" />
          <div className="min-h-0 flex-1" style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mprCharts.inflationPath}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" />
              <XAxis dataKey="quarter" tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 8]} tick={{ fontSize: 11 }} />
              <Tooltip content={<SampleTip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="high"
                name="High band"
                stroke="#d4bc94"
                strokeDasharray="4 4"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="low"
                name="Low band"
                stroke="#d4bc94"
                strokeDasharray="4 4"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="forecast"
                name="Forecast %"
                stroke="#C5A572"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="actual"
                name="Actual %"
                stroke="#0B1D36"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
          </div>
          <ChartSummary
            title="CPI path and sample forecast band"
            summary="Illustrative inflation actuals, forecast, and high/low bands by quarter."
            rows={mprCharts.inflationPath}
            className="px-1"
          />
        </div>
        <div className="glass-card h-72 rounded-xl p-4">
          <h2 className="mb-1 px-1 text-sm font-semibold">Real GDP growth path (sample)</h2>
          <IllustrativeLabel tone="chip" className="mb-2 px-1" />
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={mprCharts.growthPath}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" />
              <XAxis dataKey="quarter" tick={{ fontSize: 10 }} />
              <YAxis domain={[5, 8]} tick={{ fontSize: 11 }} />
              <Tooltip content={<SampleTip />} />
              <Bar dataKey="gdp" name="GDP %" fill="#0B1D36" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="glass-card h-72 rounded-xl p-4">
          <h2 className="mb-1 px-1 text-sm font-semibold">Transmission channels (index, sample)</h2>
          <IllustrativeLabel tone="chip" className="mb-2 px-1" />
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={mprCharts.transmission} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="channel" width={100} tick={{ fontSize: 10 }} />
              <Tooltip content={<SampleTip />} />
              <Bar dataKey="strength" name="Strength" fill="#C5A572" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card rounded-xl p-5">
          <h2 className="mb-1 text-sm font-semibold">Baseline assumptions (illustrative)</h2>
          <IllustrativeLabel className="mb-3" />
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-navy/10 dark:border-white/10">
                <th className="py-2">Item</th>
                <th className="py-2">Value</th>
                <th className="py-2">Note</th>
              </tr>
            </thead>
            <tbody>
              {mprCharts.assumptions.map((row) => (
                <tr key={row.item} className="border-b border-navy/5 dark:border-white/5">
                  <td className="py-2">{row.item}</td>
                  <td className="py-2 font-medium">{row.value}</td>
                  <td className="py-2 text-ink-muted dark:text-cream/55">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function AnnualBody() {
  return (
    <>
      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ink-muted dark:text-cream/75">
        Annual-report style digest: balance-sheet aggregates, group-wise credit growth, and digital
        channel mix. Figures are <strong>ILLUSTRATIVE SAMPLE DATA</strong> for officer UX review —
        not extracts from any RBI Annual Report or Trend &amp; Progress publication.
      </p>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <div className="glass-card flex min-h-72 flex-col rounded-xl p-4">
          <h2 className="mb-1 px-1 text-sm font-semibold">Balance sheet aggregates (index)</h2>
          <IllustrativeLabel tone="chip" className="mb-2 px-1" />
          <div className="min-h-0 flex-1" style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={annualCharts.balanceSheet}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip content={<SampleTip />} />
              <Legend />
              <Line type="monotone" dataKey="assets" name="Assets" stroke="#0B1D36" strokeWidth={2} />
              <Line
                type="monotone"
                dataKey="deposits"
                name="Deposits"
                stroke="#C5A572"
                strokeWidth={2}
              />
              <Line type="monotone" dataKey="credit" name="Credit" stroke="#1a3558" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          </div>
          <ChartSummary
            title="Balance sheet aggregates (index)"
            summary="Illustrative assets, deposits, and credit indices by year."
            rows={annualCharts.balanceSheet}
            className="px-1"
          />
        </div>
        <div className="glass-card h-72 rounded-xl p-4">
          <h2 className="mb-1 px-1 text-sm font-semibold">Credit growth by bank group (sample %)</h2>
          <IllustrativeLabel tone="chip" className="mb-2 px-1" />
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={annualCharts.groupCredit} layout="vertical" margin={{ left: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="group" width={110} tick={{ fontSize: 10 }} />
              <Tooltip content={<SampleTip />} />
              <Bar dataKey="growth" name="YoY %" fill="#C5A572" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="glass-card h-72 rounded-xl p-4">
          <h2 className="mb-1 px-1 text-sm font-semibold">Retail channel mix (sample %)</h2>
          <IllustrativeLabel tone="chip" className="mb-2 px-1" />
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={annualCharts.digitalAdoption}
                dataKey="share"
                nameKey="channel"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {annualCharts.digitalAdoption.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card rounded-xl p-5">
          <h2 className="mb-1 text-sm font-semibold">Annual snapshot (illustrative)</h2>
          <IllustrativeLabel className="mb-3" />
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-navy/10 dark:border-white/10">
                <th className="py-2">Metric</th>
                <th className="py-2">Value</th>
                <th className="py-2">Note</th>
              </tr>
            </thead>
            <tbody>
              {annualCharts.snapshot.map((row) => (
                <tr key={row.metric} className="border-b border-navy/5 dark:border-white/5">
                  <td className="py-2">{row.metric}</td>
                  <td className="py-2 font-medium tabular-nums">{row.value}</td>
                  <td className="py-2 text-ink-muted dark:text-cream/55">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function PaymentsBody() {
  return (
    <>
      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ink-muted dark:text-cream/75">
        Payments and financial-inclusion style review: system volumes/values, UPI trend, and
        outreach indices. All numbers are <strong>ILLUSTRATIVE SAMPLE DATA</strong> — not official
        payment system statistics.
      </p>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <div className="glass-card flex min-h-72 flex-col rounded-xl p-4">
          <h2 className="mb-1 px-1 text-sm font-semibold">Payment systems — volume vs value index</h2>
          <IllustrativeLabel tone="chip" className="mb-2 px-1" />
          <div className="min-h-0 flex-1" style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={paymentsCharts.volumes}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" />
              <XAxis dataKey="system" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip content={<SampleTip />} />
              <Legend />
              <Bar dataKey="volume" name="Volume idx" fill="#0B1D36" radius={[3, 3, 0, 0]} />
              <Bar dataKey="value" name="Value idx" fill="#C5A572" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          </div>
          <ChartSummary
            title="Payment systems volume vs value index"
            summary="Illustrative volume and value indices by payment system."
            rows={paymentsCharts.volumes}
            className="px-1"
          />
        </div>
        <div className="glass-card h-72 rounded-xl p-4">
          <h2 className="mb-1 px-1 text-sm font-semibold">UPI monthly volume (bn, sample)</h2>
          <IllustrativeLabel tone="chip" className="mb-2 px-1" />
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={paymentsCharts.upiTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip content={<SampleTip />} />
              <Line type="monotone" dataKey="bn" name="Bn txns" stroke="#C5A572" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="glass-card h-72 rounded-xl p-4">
          <h2 className="mb-1 px-1 text-sm font-semibold">Inclusion indicators (index / %)</h2>
          <IllustrativeLabel tone="chip" className="mb-2 px-1" />
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={paymentsCharts.inclusion} layout="vertical" margin={{ left: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="indicator" width={140} tick={{ fontSize: 9 }} />
              <Tooltip content={<SampleTip />} />
              <Bar dataKey="value" name="Index / %" fill="#1a3558" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card rounded-xl p-5">
          <h2 className="mb-1 text-sm font-semibold">Payments &amp; inclusion snapshot</h2>
          <IllustrativeLabel className="mb-3" />
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-navy/10 dark:border-white/10">
                <th className="py-2">Metric</th>
                <th className="py-2">Value</th>
                <th className="py-2">Note</th>
              </tr>
            </thead>
            <tbody>
              {paymentsCharts.tableRows.map((row) => (
                <tr key={row.metric} className="border-b border-navy/5 dark:border-white/5">
                  <td className="py-2">{row.metric}</td>
                  <td className="py-2 font-medium tabular-nums">{row.value}</td>
                  <td className="py-2 text-ink-muted dark:text-cream/55">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function RichBody({ variant }: { variant?: string }) {
  switch (variant) {
    case 'mpr':
      return <MprBody />
    case 'annual':
      return <AnnualBody />
    case 'payments':
      return <PaymentsBody />
    default:
      return <FsrBody />
  }
}

export function ReportDetail() {
  const { slug } = useParams()
  const report = reports.find((r) => r.slug === slug)

  if (!report || !report.rich) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="font-semibold">Rich report sample not available for this slug.</p>
        <p className="mt-2 text-sm text-ink-muted">
          Open FSR, MPR, Annual banking, or Payments/Inclusion cards for full demo layouts.
        </p>
        <Link to="/reports" className="mt-4 inline-block text-gold-dim underline">
          Back to reports
        </Link>
      </div>
    )
  }

  return (
    <div className="print-root mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <Link
        to="/reports"
        className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-navy dark:hover:text-cream"
      >
        <ArrowLeft className="h-4 w-4" /> All reports
      </Link>
      <PrintButton />
      </div>
      <Badge>{report.type}</Badge>
      <h1 className="mt-3 text-2xl font-bold text-navy dark:text-cream md:text-3xl">{report.title}</h1>
      <p className="mt-2 text-sm text-ink-muted dark:text-cream/55">
        {report.date} · ~{report.pages} pages · Illustrative · not for compliance
      </p>
      <ContentReviewed lastReviewed={report.lastReviewed} className="mt-1" />
      <p className="mt-3 max-w-3xl text-sm text-ink-muted dark:text-cream/70">{report.summary}</p>

      <div className="mt-6 max-w-3xl">
        <AuthoritativeSource section="publications" />
      </div>

      <RichBody variant={report.variant} />

      {report.relatedLinks && report.relatedLinks.length > 0 && (
        <RelatedLinks links={report.relatedLinks} />
      )}

      <div className="mt-10">
        <DisclaimerBanner />
      </div>
    </div>
  )
}
