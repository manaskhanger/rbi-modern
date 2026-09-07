import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { OfficialPdfLink, OfficialTitleLink } from './OfficialPdfLink'
import type { OfficialDocFields } from '../lib/officialDocs'

export type DocTableRow = OfficialDocFields & {
  id: string
  date: string
  title: string
  category?: string
  meta?: string
  sizeLabel?: string
  summaryPath: string
  summaryLabel?: string
}

type Props = {
  rows: DocTableRow[]
  dateHeader?: string
  groupByCategory?: boolean
  emptyMessage?: string
}

function formatDisplayDate(iso: string) {
  if (!iso) return '—'
  const [y, m, d] = iso.split('-')
  if (!y || !m) return iso
  return d ? `${d}-${m}-${y}` : `${m}-${y}`
}

export function DocumentTable({
  rows,
  dateHeader = 'Date',
  groupByCategory = false,
  emptyMessage = 'No documents match your filters.',
}: Props) {
  if (rows.length === 0) {
    return (
      <p className="border border-dashed border-navy/20 py-10 text-center text-sm text-ink-muted dark:border-white/20 dark:text-cream/65">
        {emptyMessage}
      </p>
    )
  }

  const groups: { label: string | null; items: DocTableRow[] }[] = []
  if (groupByCategory) {
    const map = new Map<string, DocTableRow[]>()
    for (const r of rows) {
      const key = r.category || 'Other'
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(r)
    }
    for (const [label, items] of map) groups.push({ label, items })
  } else {
    groups.push({ label: null, items: rows })
  }

  return (
    <div className="doc-table-wrap overflow-x-auto border border-navy/12 dark:border-white/12">
      <table className="doc-table w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr>
            <th scope="col" className="w-[7.5rem]">
              {dateHeader}
            </th>
            <th scope="col">Title</th>
            <th scope="col" className="w-[8.5rem] text-center">
              Open PDF
            </th>
            <th scope="col" className="w-[6.5rem]">
              Type
            </th>
            <th scope="col" className="w-[7rem]">
              Prototype
            </th>
          </tr>
        </thead>
        <tbody>
          {groups.map((g) => (
            <Fragment key={g.label ?? '__all'}>
              {g.label && (
                <tr className="doc-table-cat">
                  <td colSpan={5}>{g.label}</td>
                </tr>
              )}
              {g.items.map((r) => (
                <tr key={r.id}>
                  <td className="whitespace-nowrap tabular-nums text-ink-muted dark:text-cream/70">
                    <time dateTime={r.date}>{formatDisplayDate(r.date)}</time>
                  </td>
                  <td>
                    <OfficialTitleLink
                      doc={r}
                      className="font-medium text-navy underline-offset-2 hover:text-rbi-blue hover:underline dark:text-cream dark:hover:text-gold-soft"
                    >
                      {r.title}
                    </OfficialTitleLink>
                    {r.meta && (
                      <span className="mt-0.5 block font-mono text-[11px] text-ink-muted dark:text-cream/55">
                        {r.meta}
                      </span>
                    )}
                  </td>
                  <td className="text-center">
                    <OfficialPdfLink doc={r} variant="button" className="!justify-center" />
                  </td>
                  <td className="text-xs text-ink-muted dark:text-cream/60">
                    {r.sizeLabel || (r.pdfMode === 'pdf' ? 'PDF · outbound' : 'Index · outbound')}
                  </td>
                  <td>
                    <Link
                      to={r.summaryPath}
                      className="text-xs font-medium text-ink-muted underline-offset-2 hover:text-navy hover:underline dark:text-cream/60 dark:hover:text-cream"
                    >
                      {r.summaryLabel || 'Summary'}
                    </Link>
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
