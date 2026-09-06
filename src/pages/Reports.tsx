import { Link } from 'react-router-dom'
import { FileText } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Card } from '../components/Card'
import { Badge } from '../components/Badge'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { reports } from '../data/reports'

export function Reports() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <PageHeader
        eyebrow="Publications"
        title="Reports"
        description="Sample publication cards. Open the Financial Stability digest for a richer demo with charts and tables."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((r) => (
          <Card key={r.slug}>
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-gold/15 p-3">
                <FileText className="h-5 w-5 text-gold-dim dark:text-gold" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2">
                  <Badge tone="muted">{r.type}</Badge>
                  <span className="text-xs text-ink-muted dark:text-cream/45">
                    {r.pages} pages · {r.date}
                  </span>
                </div>
                <h2 className="mt-2 font-semibold text-navy dark:text-cream">{r.title}</h2>
                <p className="mt-2 text-sm text-ink-muted dark:text-cream/65">{r.summary}</p>
                {r.rich ? (
                  <Link
                    to={`/reports/${r.slug}`}
                    className="mt-4 inline-block text-sm font-semibold text-gold-dim hover:underline dark:text-gold"
                  >
                    Open rich sample →
                  </Link>
                ) : (
                  <p className="mt-4 text-xs text-ink-muted/70 dark:text-cream/40">
                    Summary card only in v1
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
