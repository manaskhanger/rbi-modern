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
import { reports, sampleReportCharts } from '../data/reports'
import { Badge } from '../components/Badge'
import { DisclaimerBanner } from '../components/DisclaimerBanner'

const COLORS = ['#0B1D36', '#C5A572', '#1a3558', '#d4bc94']

export function ReportDetail() {
  const { slug } = useParams()
  const report = reports.find((r) => r.slug === slug)

  if (!report || !report.rich) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p>Rich report sample not available for this slug.</p>
        <Link to="/reports" className="mt-4 inline-block text-gold-dim underline">
          Back to reports
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <Link
        to="/reports"
        className="mb-8 inline-flex items-center gap-2 text-sm text-ink-muted hover:text-navy dark:hover:text-cream"
      >
        <ArrowLeft className="h-4 w-4" /> All reports
      </Link>
      <Badge>{report.type}</Badge>
      <h1 className="mt-4 text-3xl font-bold text-navy dark:text-cream md:text-4xl">
        {report.title}
      </h1>
      <p className="mt-3 text-sm text-ink-muted dark:text-cream/55">
        {report.date} · ~{report.pages} pages · Illustrative digest
      </p>
      <p className="mt-6 max-w-3xl leading-relaxed text-ink-muted dark:text-cream/75">
        {report.summary} This rich sample shows how a stability-style publication might combine
        narrative with capital adequacy trends, asset quality, and sector credit shares — all demo
        numbers.
      </p>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="glass-card h-72 rounded-3xl p-4">
          <h2 className="mb-2 px-2 text-sm font-semibold text-navy dark:text-cream">
            System CRAR (illustrative)
          </h2>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={sampleReportCharts.capitalAdequacy}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis domain={[15, 18]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="crar" stroke="#C5A572" strokeWidth={2.5} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card h-72 rounded-3xl p-4">
          <h2 className="mb-2 px-2 text-sm font-semibold text-navy dark:text-cream">
            GNPA / NNPA (illustrative)
          </h2>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={sampleReportCharts.npaTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="gnpa" name="GNPA %" fill="#0B1D36" radius={[4, 4, 0, 0]} />
              <Bar dataKey="nnpa" name="NNPA %" fill="#C5A572" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="glass-card h-72 rounded-3xl p-4">
          <h2 className="mb-2 px-2 text-sm font-semibold text-navy dark:text-cream">
            Credit share by sector
          </h2>
          <ResponsiveContainer width="100%" height="90%">
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
        <div className="glass-card rounded-3xl p-6">
          <h2 className="mb-4 text-sm font-semibold text-navy dark:text-cream">
            Snapshot table (sample)
          </h2>
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
                  <tr
                    key={row.metric}
                    className="border-b border-navy/5 dark:border-white/5"
                  >
                    <td className="py-2.5">{row.metric}</td>
                    <td className="py-2.5 font-medium">{row.value}</td>
                    <td className="py-2.5 text-ink-muted dark:text-cream/55">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <DisclaimerBanner />
      </div>
    </div>
  )
}
