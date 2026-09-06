import { useMemo, useState } from 'react'
import {
  PieChart, Pie, Cell, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { ArrowDownUp, Search } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { AuthoritativeSource } from '../components/AuthoritativeSource'
import { ContentReviewed, IllustrativeLabel } from '../components/IllustrativeLabel'
import {
  dashboardPie, dashboardLine, dashboardBar, dashboardTable, dataFootnote, keyRatesAsOf,
} from '../data/rates'

const COLORS = ['#0B1D36', '#C5A572', '#4a5568']
type Row = (typeof dashboardTable)[number]
type SortKey = keyof Row

function ChartTip({ active, payload, label }: {
  active?: boolean
  payload?: { name: string; value: number; color: string }[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-md border border-navy/10 bg-white px-3 py-2 text-xs shadow-md dark:border-white/15 dark:bg-navy-light">
      <p className="mb-1 font-semibold">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</p>
      ))}
      <p className="mt-1 text-[10px] text-ink-muted">Illustrative · not for compliance</p>
    </div>
  )
}

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
    else { setSortKey(key); setAsc(true) }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <PageHeader
        eyebrow="Data lab"
        title="Sample datasets & charts"
        description="Demo charts and an export-style searchable table. Every number is illustrative sample data for interface exploration — not a live statistical feed."
      />
      <ContentReviewed className="mb-4 -mt-4" />

      <div className="mb-6">
        <AuthoritativeSource section="statistics" />
      </div>

      <div className="mb-5 rounded-lg border border-gold/30 bg-gold/10 px-3 py-3 text-xs text-navy dark:text-cream">
        <IllustrativeLabel asOf={keyRatesAsOf} className="!text-xs font-medium !text-navy dark:!text-cream" />
        <p className="mt-1.5 leading-relaxed text-ink-muted dark:text-cream/70">{dataFootnote}</p>
        <p className="mt-1.5 leading-relaxed text-ink-muted dark:text-cream/70">
          Footnote: chart tooltips, table cells and as-of stamps on this page are prototype labels
          only. Do not use them for compliance, market decisions, or citation as official statistics.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="glass-card h-72 rounded-xl p-4 lg:col-span-1">
          <h2 className="mb-1 px-1 text-sm font-semibold">FX reserves mix (sample)</h2>
          <IllustrativeLabel tone="chip" className="mb-1 px-1" />
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie data={dashboardPie} dataKey="value" nameKey="name" outerRadius={80} label>
                {dashboardPie.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card h-72 rounded-xl p-4 lg:col-span-2">
          <h2 className="mb-1 px-1 text-sm font-semibold">Payment volumes (bn txns, sample)</h2>
          <IllustrativeLabel tone="chip" className="mb-1 px-1" />
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={dashboardLine}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip content={<ChartTip />} />
              <Legend />
              <Line type="monotone" dataKey="upi" name="UPI" stroke="#C5A572" strokeWidth={2} />
              <Line type="monotone" dataKey="neft" name="NEFT" stroke="#0B1D36" strokeWidth={2} />
              <Line type="monotone" dataKey="rtgs" name="RTGS" stroke="#64748b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-5 glass-card h-72 rounded-xl p-4">
        <h2 className="mb-1 px-1 text-sm font-semibold">Bank group credit (index, sample)</h2>
        <IllustrativeLabel tone="chip" className="mb-1 px-1" />
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={dashboardBar}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" />
            <XAxis dataKey="segment" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip content={<ChartTip />} />
            <Bar dataKey="credit" name="Credit index" fill="#C5A572" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-10">
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-navy dark:text-cream">Indicators table</h2>
            <IllustrativeLabel asOf={keyRatesAsOf} className="mt-0.5" />
          </div>
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search indicators…"
              className="w-full rounded-lg border border-navy/10 bg-white py-2 pl-10 pr-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-gold/50 dark:border-white/15 dark:bg-navy-light" />
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl border border-navy/10 dark:border-white/10">
          <table className="data-table w-full min-w-[640px] text-left text-sm">
            <thead className="bg-navy/5 dark:bg-white/5">
              <tr>
                {([['indicator', 'Indicator'], ['category', 'Category'], ['latest', 'Latest'], ['previous', 'Previous'], ['unit', 'Unit']] as [SortKey, string][]).map(([key, label]) => (
                  <th key={key} className="px-4 py-2.5 font-semibold">
                    <button type="button" onClick={() => toggleSort(key)} className="inline-flex items-center gap-1 hover:text-gold-dim">
                      {label}<ArrowDownUp className="h-3 w-3 opacity-50" aria-hidden />
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-navy/5 odd:bg-white/40 dark:border-white/5 dark:odd:bg-white/[0.02]">
                  <td className="px-4 py-2 font-medium">{r.indicator}</td>
                  <td className="px-4 py-2">{r.category}</td>
                  <td className="px-4 py-2 tabular-nums">{r.latest}</td>
                  <td className="px-4 py-2 tabular-nums text-ink-muted dark:text-cream/60">{r.previous}</td>
                  <td className="px-4 py-2">{r.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 && <p className="py-8 text-center text-sm text-ink-muted">No indicators match your search.</p>}
        <p className="mt-3 text-xs text-ink-muted dark:text-cream/50">{dataFootnote}</p>
      </div>
      <div className="mt-10"><DisclaimerBanner /></div>
    </div>
  )
}
