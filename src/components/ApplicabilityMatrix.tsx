import type { ApplicabilityRow } from '../data/types'
import { Badge } from './Badge'

const tone: Record<ApplicabilityRow['applies'], 'gold' | 'navy' | 'muted'> = {
  Yes: 'gold',
  Partial: 'navy',
  'Case-by-case': 'navy',
  No: 'muted',
}

type Props = {
  rows: ApplicabilityRow[]
  audienceBlurb: string
}

export function ApplicabilityMatrix({ rows, audienceBlurb }: Props) {
  return (
    <div>
      <p className="rounded-lg border border-navy/10 bg-white/70 px-4 py-3 text-sm dark:border-white/10 dark:bg-navy-light/40">
        {audienceBlurb}
      </p>
      <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-gold-dim dark:text-gold">
        Applicability matrix (illustrative · derived from audience + category)
      </p>
      <div className="mt-2 overflow-x-auto rounded-xl border border-navy/10 dark:border-white/10">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="bg-navy/[0.03] dark:bg-white/[0.03]">
            <tr className="border-b border-navy/10 dark:border-white/10">
              <th className="px-3 py-2.5 font-semibold">Entity</th>
              <th className="px-3 py-2.5 font-semibold">Applies?</th>
              <th className="px-3 py-2.5 font-semibold">Notes</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.entity}
                className="border-b border-navy/5 last:border-0 dark:border-white/5"
              >
                <td className="px-3 py-2.5 font-medium text-navy dark:text-cream">
                  {row.entity}
                </td>
                <td className="px-3 py-2.5">
                  <Badge tone={tone[row.applies]}>{row.applies}</Badge>
                </td>
                <td className="px-3 py-2.5 text-ink-muted dark:text-cream/65">
                  {row.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
