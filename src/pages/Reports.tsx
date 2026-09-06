import { Link } from 'react-router-dom'
import { FileText } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Card } from '../components/Card'
import { Badge } from '../components/Badge'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { reports } from '../data/reports'
import { formatContentReviewed } from '../data/meta'

export function Reports() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <PageHeader
        eyebrow="Publications"
        title="Reports"
        description="Sample publication cards. Open the Financial Stability and Monetary Policy digests for richer layouts with sober charts and tables — all illustrative."
      />
      <div className="grid gap-3 md:grid-cols-2">
        {reports.map((r) => (
          <Card key={r.slug} className="!rounded-xl !p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-gold/15 p-2.5">
                <FileText className="h-4 w-4 text-gold-dim dark:text-gold" aria-hidden />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2">
                  <Badge tone="muted">{r.type}</Badge>
                  <span className="text-xs text-ink-muted dark:text-cream/45">
                    {r.pages} pages · {r.date}
                  </span>
                </div>
                <h2 className="mt-2 text-sm font-semibold text-navy dark:text-cream">{r.title}</h2>
                <p className="mt-1.5 text-sm text-ink-muted dark:text-cream/65">{r.summary}</p>
                <p className="mt-2 text-[10px] text-ink-muted/70 dark:text-cream/40">
                  {formatContentReviewed(r.lastReviewed)}
                </p>
                {r.rich ? (
                  <Link
                    to={`/reports/${r.slug}`}
                    className="mt-3 inline-block text-sm font-semibold text-gold-dim hover:underline dark:text-gold"
                  >
                    Open rich sample →
                  </Link>
                ) : (
                  <p className="mt-3 text-xs text-ink-muted/70 dark:text-cream/40">
                    Summary card only in this pass
                  </p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-10">
        <DisclaimerBanner />
      </div>
    </div>
  )
}
