import { useMemo, useState } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { ArrowDownUp, Search } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import {
  dashboardPie,
  dashboardLine,
  dashboardBar,
  dashboardTable,
} from '../data/rates'

const COLORS = ['#0B1D36', '#C5A572', '#4a5568']

type Row = (typeof dashboardTable)[number]
type SortKey = keyof Row

export function Data() {
  const [q, setQ] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('indicator')
  const [asc, setAsc] = useState(true)

  const rows = useMemo(() => {
    const filtered = dashboardTable.filter((r) => {
      const hay = `${r.indicator} ${r.category} ${r.latest}`.toLowerCase()
      return hay.includes(q.toLowerCase().trim())
    })
    return [...filtered].sort((a, b) => {
      const av = String(a[sortKey])
      const bv = String(b[sortKey])
      return asc ? av.localeCompare(bv) : bv.localeCompare(av)
    })
  }, [q, sortKey, asc])

  function toggleSort(key: SortKey) {
    if (sortKey === key) setAsc((v) => !v)
    else {
      setSortKey(key)
      setAsc(true)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <PageHeader
        eyebrow="Dashboard"
        title="Data lab"
        description="Demo charts and a searchable table. Every number is sample data for UI exploration."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="glass-card h-72 rounded-3xl p-4 lg:col-span-1">
          <h2 className="mb-1 px-2 text-sm font-semibold">FX reserves mix</h2>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie data={dashboardPie} dataKey="value" nameKey="name" outerRadius={80} label>
                {dashboardPie.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card h-72 rounded-3xl p-4 lg:col-span-2">
          <h2 className="mb-1 px-2 text-sm font-semibold">Payment volumes (bn txns, demo)</h2>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={dashboardLine}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="upi" name="UPI" stroke="#C5A572" strokeWidth={2.5} />
              <Line type="monotone" dataKey="neft" name="NEFT" stroke="#0B1D36" strokeWidth={2} />
              <Line type="monotone" dataKey="rtgs" name="RTGS" stroke="#64748b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 glass-card h-72 rounded-3xl p-4">
        <h2 className="mb-1 px-2 text-sm font-semibold">Bank group credit (index, demo)</h2>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={dashboardBar}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" />
            <XAxis dataKey="segment" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="credit" fill="#C5A572" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-10">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold text-navy dark:text-cream">Indicators table</h2>
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search indicators…"
              className="w-full rounded-xl border border-navy/10 bg-white py-2 pl-10 pr-3 text-sm outline-none ring-gold/40 focus:ring-2 dark:border-white/15 dark:bg-navy-light"
            />
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-navy/10 dark:border-white/10">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-navy/5 dark:bg-white/5">
              <tr>
                {(
                  [
                    ['indicator', 'Indicator'],
                    ['category', 'Category'],
                    ['latest', 'Latest'],
                    ['previous', 'Previous'],
                    ['unit', 'Unit'],
                  ] as [SortKey, string][]
                ).map(([key, label]) => (
                  <th key={key} className="px-4 py-3 font-semibold">
                    <button
                      type="button"
                      onClick={() => toggleSort(key)}
                      className="inline-flex items-center gap-1 hover:text-gold-dim"
                    >
                      {label}
                      <ArrowDownUp className="h-3 w-3 opacity-50" />
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.id}
                  className="border-t border-navy/5 odd:bg-white/40 dark:border-white/5 dark:odd:bg-white/[0.02]"
                >
                  <td className="px-4 py-2.5 font-medium">{r.indicator}</td>
                  <td className="px-4 py-2.5">{r.category}</td>
                  <td className="px-4 py-2.5">{r.latest}</td>
                  <td className="px-4 py-2.5 text-ink-muted dark:text-cream/60">{r.previous}</td>
                  <td className="px-4 py-2.5">{r.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10">
        <DisclaimerBanner />
      </div>
    </div>
  )
}
