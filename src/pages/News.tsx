import { PageHeader } from '../components/PageHeader'
import { CardLink } from '../components/Card'
import { Badge } from '../components/Badge'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { newsItems } from '../data/news'

export function News() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <PageHeader
        eyebrow="Press & updates"
        title="News"
        description="Educational mock press notes inspired by typical central-bank themes. Original writing for this demo."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {newsItems.map((n) => (
          <CardLink key={n.slug} to={`/news/${n.slug}`}>
            <Badge tone="muted">{n.category}</Badge>
            <h2 className="mt-3 font-semibold text-navy dark:text-cream">{n.title}</h2>
            <p className="mt-2 line-clamp-3 text-sm text-ink-muted dark:text-cream/65">
              {n.excerpt}
            </p>
            <p className="mt-4 text-xs text-ink-muted/80 dark:text-cream/45">{n.date}</p>
          </CardLink>
        ))}
      </div>
      <div className="mt-10">
        <DisclaimerBanner />
      </div>
    </div>
  )
}
