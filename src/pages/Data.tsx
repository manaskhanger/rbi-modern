import { useMemo, useState } from 'react'
import {
  PieChart, Pie, Cell, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { ArrowDownUp, Download, ExternalLink, Search } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { AuthoritativeSource } from '../components/AuthoritativeSource'
import { ContentReviewed, IllustrativeLabel } from '../components/IllustrativeLabel'
import { ChartFootnote } from '../components/ChartFootnote'
import { ChartSummary } from '../components/ChartSummary'
import { KeyRatesStrip } from '../components/KeyRatesStrip'
import {
  dashboardPie, dashboardLine, dashboardBar, dashboardTable, dataFootnote, keyRatesAsOf,
  chartMethodology, officialStructurePanels,
} from '../data/rates'
import { RBI_SECTIONS } from '../data/meta'
import { downloadCsv } from '../lib/csv'

const COLORS = ['#0B1D36', '#C5A572', '#4a5568']
type Row = (typeof dashboardTable)[number]
type SortKey = keyof Row
type DataMode = 'sample' | 'official'

function ChartTip({ active, payload, label, unitHint }: {
  active?: boolean
  payload?: { name: string; value: number; color: string; dataKey?: string | number }[]
  label?: string
  unitHint?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-md border border-navy/10 bg-white px-3 py-2 text-xs shadow-md dark:border-white/15 dark:bg-navy-light">
      <p className="mb-1 font-semibold text-navy dark:text-cream">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="tabular-nums">
          {p.name}: {p.value}{unitHint ? ` ${unitHint}` : ''}
        </p>
      ))}
      <p className="mt-1.5 border-t border-navy/5 pt-1 text-[10px] leading-snug text-ink-muted dark:border-white/10 dark:text-cream/50">
        Sample tooltip · Illustrative · not for compliance
      </p>
    </div>
  )
}

function ModeToggle({ mode, onChange }: { mode: DataMode; onChange: (m: DataMode) => void }) {
  return (
    <div
      className="inline-flex rounded-lg border border-navy/15 bg-white/90 p-1 dark:border-white/15 dark:bg-navy-light/60"
      role="tablist"
      aria-label="Data presentation mode"
    >
      <button
        type="button"
        role="tab"
        aria-selected={mode === 'sample'}
        onClick={() => onChange('sample')}
        className={`rounded-md px-3 py-1.5 text-xs font-semibold transition sm:text-sm ${
          mode === 'sample'
            ? 'bg-navy text-cream dark:bg-gold dark:text-navy'
            : 'text-ink-muted hover:text-navy dark:text-cream/60 dark:hover:text-cream'
        }`}
      >
        Sample dataset (illustrative)
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={mode === 'official'}
        onClick={() => onChange('official')}
        className={`rounded-md px-3 py-1.5 text-xs font-semibold transition sm:text-sm ${
          mode === 'official'
            ? 'bg-navy text-cream dark:bg-gold dark:text-navy'
            : 'text-ink-muted hover:text-navy dark:text-cream/60 dark:hover:text-cream'
        }`}
      >
        Official structure (link-out)
      </button>
    </div>
  )
}

function OfficialStructureView() {
  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-dashed border-navy/25 bg-white/60 px-4 py-4 dark:border-white/20 dark:bg-navy-light/30">
        <p className="text-sm font-semibold text-navy dark:text-cream">
          Honest empty panels — no fabricated “live” official numbers
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-muted dark:text-cream/65">
          This mode shows how a data lab might mirror DBIE / rbi.org.in <em>structure</em> without
          pretending to pull live series. Real figures live only on the Reserve Bank’s data portal
          and statistics pages. Nothing below is an official extract.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <a
            href={RBI_SECTIONS.dbie.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-navy px-3 py-1.5 text-xs font-semibold text-cream dark:bg-gold dark:text-navy"
          >
            Open DBIE (data.rbi.org.in)
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
          <a
            href={RBI_SECTIONS.statistics.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-navy/15 px-3 py-1.5 text-xs font-semibold text-navy dark:border-white/20 dark:text-cream"
          >
            RBI Statistics
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
          <a
            href={RBI_SECTIONS.policyRates.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-navy/15 px-3 py-1.5 text-xs font-semibold text-navy dark:border-white/20 dark:text-cream"
          >
            Official policy rates
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {officialStructurePanels.map((panel) => {
          const src = RBI_SECTIONS[panel.hrefKey]
          return (
            <div
              key={panel.id}
              className="flex flex-col rounded-xl border border-dashed border-navy/20 bg-cream/40 p-4 dark:border-white/15 dark:bg-navy/40"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gold-dim dark:text-gold">
                Official structure · empty placeholder
              </p>
              <h3 className="mt-1 text-sm font-semibold text-navy dark:text-cream">{panel.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted dark:text-cream/65">
                {panel.structure}
              </p>
              <div className="mt-4 flex flex-1 flex-col justify-end">
                <div className="rounded-lg border border-navy/10 bg-white/70 px-3 py-6 text-center dark:border-white/10 dark:bg-navy-light/50">
                  <p className="text-sm font-medium text-ink-muted dark:text-cream/55">
                    No sample values shown in this mode
                  </p>
                  <p className="mt-1 text-xs text-ink-muted dark:text-cream/45">
                    Live series: {panel.where}
                  </p>
                </div>
                <a
                  href={src.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-gold-dim underline-offset-2 hover:underline dark:text-gold"
                >
                  {src.label}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function Data() {
  const [mode, setMode] = useState<DataMode>('sample')
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

  function handleDownloadCsv() {
    downloadCsv(
      rows,
      [
        { key: 'indicator', header: 'Indicator' },
        { key: 'category', header: 'Category' },
        { key: 'latest', header: 'Latest (sample)' },
        { key: 'previous', header: 'Previous (sample)' },
        { key: 'unit', header: 'Unit' },
      ],
      'rbi-modern-sample-indicators.csv',
      [
        'ILLUSTRATIVE SAMPLE DATA — not an RBI / DBIE extract',
        `as-of (sample): ${keyRatesAsOf}`,
        'Illustrative · not for compliance. Do not use for market, regulatory, or citation purposes.',
        'Authoritative series: https://data.rbi.org.in/ and https://www.rbi.org.in/',
      ],
    )
  }

  return (
    <div>
      <KeyRatesStrip />

      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <PageHeader
          eyebrow="Data lab"
          title="Sample datasets & charts"
          description="Demo charts and an export-style searchable table. Every number is illustrative sample data for interface exploration — not a live statistical feed or official extract."
        />
        <ContentReviewed className="mb-4 -mt-4" />

        <div className="mb-6">
          <AuthoritativeSource section="statistics" />
        </div>

        <div className="mb-5 rounded-lg border border-gold/30 bg-gold/10 px-3 py-3 text-xs text-navy dark:text-cream">
          <IllustrativeLabel asOf={keyRatesAsOf} className="!text-xs font-medium !text-navy dark:!text-cream" />
          <p className="mt-1.5 leading-relaxed text-ink-muted dark:text-cream/70">{dataFootnote}</p>
          <p className="mt-1.5 leading-relaxed text-ink-muted dark:text-cream/70">
            Officer note: nothing on this page is an official RBI extract. Use the mode toggle to
            switch between illustrative sample charts and honest empty structure panels that link
            out to DBIE / rbi.org.in.
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <ModeToggle mode={mode} onChange={setMode} />
          {mode === 'sample' && (
            <button
              type="button"
              onClick={handleDownloadCsv}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-navy/15 bg-white px-3 py-2 text-xs font-semibold text-navy transition hover:border-gold/40 dark:border-white/20 dark:bg-navy-light dark:text-cream"
            >
              <Download className="h-3.5 w-3.5" aria-hidden />
              Download CSV (sample table)
            </button>
          )}
        </div>

        {mode === 'official' ? (
          <OfficialStructureView />
        ) : (
          <>
            <div className="grid gap-5 lg:grid-cols-3">
              <div className="glass-card flex h-auto min-h-72 flex-col rounded-xl p-4 lg:col-span-1">
                <h2 className="mb-1 px-1 text-sm font-semibold">FX reserves mix (sample)</h2>
                <IllustrativeLabel tone="chip" className="mb-1 px-1" />
                <div className="min-h-0 flex-1" style={{ height: 220 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={dashboardPie} dataKey="value" nameKey="name" outerRadius={80} label>
                        {dashboardPie.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<ChartTip unitHint="pp (sample share)" />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <ChartSummary
                  title="FX reserves mix (sample)"
                  summary="Illustrative foreign-exchange reserves composition by asset class."
                  rows={dashboardPie}
                />
                <ChartFootnote methodology={chartMethodology.fxReserves} />
              </div>
              <div className="glass-card flex h-auto min-h-72 flex-col rounded-xl p-4 lg:col-span-2">
                <h2 className="mb-1 px-1 text-sm font-semibold">Payment volumes (bn txns, sample)</h2>
                <IllustrativeLabel tone="chip" className="mb-1 px-1" />
                <div className="min-h-0 flex-1" style={{ height: 220 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dashboardLine}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip content={<ChartTip unitHint="bn txn (sample)" />} />
                      <Legend />
                      <Line type="monotone" dataKey="upi" name="UPI" stroke="#C5A572" strokeWidth={2} />
                      <Line type="monotone" dataKey="neft" name="NEFT" stroke="#0B1D36" strokeWidth={2} />
                      <Line type="monotone" dataKey="rtgs" name="RTGS" stroke="#64748b" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <ChartSummary
                  title="Payment volumes (bn txns, sample)"
                  summary="Illustrative monthly UPI, NEFT and RTGS volumes in billions of transactions."
                  rows={dashboardLine}
                />
                <ChartFootnote methodology={chartMethodology.payments} />
              </div>
            </div>
            <div className="mt-5 glass-card flex h-auto min-h-72 flex-col rounded-xl p-4">
              <h2 className="mb-1 px-1 text-sm font-semibold">Bank group credit (index, sample)</h2>
              <IllustrativeLabel tone="chip" className="mb-1 px-1" />
              <div className="min-h-0 flex-1" style={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboardBar}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" />
                    <XAxis dataKey="segment" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip content={<ChartTip unitHint="index (sample)" />} />
                    <Bar dataKey="credit" name="Credit index" fill="#C5A572" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <ChartSummary
                title="Bank group credit (index, sample)"
                summary="Illustrative credit index by bank-group segment."
                rows={dashboardBar}
              />
              <ChartFootnote methodology={chartMethodology.bankCredit} />
            </div>

            <div className="mt-10">
              <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-navy dark:text-cream">
                    Indicators table (sample — not an official extract)
                  </h2>
                  <IllustrativeLabel asOf={keyRatesAsOf} className="mt-0.5" />
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="relative w-full sm:max-w-xs">
                    <label htmlFor="data-indicator-search" className="sr-only">
                      Search sample indicators
                    </label>
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden />
                    <input
                      id="data-indicator-search"
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Search sample indicators…"
                      className="w-full rounded-lg border border-navy/10 bg-white py-2 pl-10 pr-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-gold/50 dark:border-white/15 dark:bg-navy-light"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleDownloadCsv}
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-navy/15 bg-white px-3 py-2 text-xs font-semibold text-navy transition hover:border-gold/40 dark:border-white/20 dark:bg-navy-light dark:text-cream"
                  >
                    <Download className="h-3.5 w-3.5" aria-hidden />
                    CSV
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto rounded-xl border border-navy/10 dark:border-white/10">
                <table className="data-table w-full min-w-[640px] text-left text-sm">
                  <thead className="bg-navy/5 dark:bg-white/5">
                    <tr>
                      {([
                        ['indicator', 'Indicator (sample)'],
                        ['category', 'Category'],
                        ['latest', 'Latest (sample)'],
                        ['previous', 'Previous (sample)'],
                        ['unit', 'Unit'],
                      ] as [SortKey, string][]).map(([key, label]) => (
                        <th key={key} className="px-4 py-2.5 font-semibold">
                          <button
                            type="button"
                            onClick={() => toggleSort(key)}
                            className="inline-flex items-center gap-1 hover:text-gold-dim"
                          >
                            {label}
                            <ArrowDownUp className="h-3 w-3 opacity-50" aria-hidden />
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
                        <td className="px-4 py-2 font-medium">{r.indicator}</td>
                        <td className="px-4 py-2">{r.category}</td>
                        <td className="px-4 py-2 tabular-nums">{r.latest}</td>
                        <td className="px-4 py-2 tabular-nums text-ink-muted dark:text-cream/60">
                          {r.previous}
                        </td>
                        <td className="px-4 py-2">{r.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {rows.length === 0 && (
                <p className="py-8 text-center text-sm text-ink-muted">No indicators match your search.</p>
              )}
              <ChartFootnote methodology={chartMethodology.indicatorsTable} className="mt-3" />
              <p className="mt-2 text-xs text-ink-muted dark:text-cream/50">{dataFootnote}</p>
            </div>
          </>
        )}

        <div className="mt-10">
          <DisclaimerBanner />
        </div>
      </div>
    </div>
  )
}
