type Cell = string | number | null | undefined
type Row = Record<string, Cell>

type Props = {
  /** Accessible name for the chart region */
  title: string
  /** Short prose summary for screen readers / print */
  summary: string
  /** Optional tabular fallback (columns inferred from first row keys) */
  rows?: Row[]
  className?: string
}

/**
 * Text summary + optional table fallback for charts (a11y / print).
 * Visual charts remain primary; this is the accessible counterpart.
 */
export function ChartSummary({ title, summary, rows, className = '' }: Props) {
  const keys = rows?.length ? Object.keys(rows[0]) : []

  return (
    <div className={`chart-summary ${className}`}>
      <p className="sr-only">
        Chart: {title}. {summary}
      </p>
      <details className="mt-1 print:block">
        <summary className="cursor-pointer text-[11px] font-medium text-ink-muted underline-offset-2 hover:underline dark:text-cream/55 print:hidden">
          Data summary (accessible table)
        </summary>
        <p className="mt-1 text-[11px] leading-relaxed text-ink-muted dark:text-cream/55">{summary}</p>
        {rows && rows.length > 0 && (
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-left text-[11px]">
              <caption className="sr-only">{title}</caption>
              <thead>
                <tr className="border-b border-navy/10 dark:border-white/10">
                  {keys.map((k) => (
                    <th key={k} className="py-1 pr-3 font-semibold capitalize">
                      {k}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-navy/5 dark:border-white/5">
                    {keys.map((k) => (
                      <td key={k} className="py-1 pr-3 tabular-nums">
                        {row[k] == null ? '—' : row[k]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </details>
    </div>
  )
}
