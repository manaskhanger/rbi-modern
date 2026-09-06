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
        description="Sample publication cards. Four rich digests (FSR, MPR, Annual banking, Payments & inclusion) open with sober charts and tables — all illustrative. Remaining cards stay summary-level with cross-links."
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
                  {r.rich && <Badge>Rich sample</Badge>}
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
                    Summary card in this pass
                  </p>
                )}
                {r.relatedLinks && r.relatedLinks.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {r.relatedLinks.map((l) => (
                      <Link
                        key={l.href + l.label}
                        to={l.href}
                        className="rounded-full border border-navy/10 px-2 py-0.5 text-[10px] font-medium text-ink-muted hover:border-gold/40 hover:text-navy dark:border-white/10 dark:text-cream/55 dark:hover:text-cream"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
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
