import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { newsItems } from '../data/news'
import { Badge } from '../components/Badge'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { AuthoritativeSource } from '../components/AuthoritativeSource'
import { ContentReviewed } from '../components/IllustrativeLabel'

export function NewsDetail() {
  const { slug } = useParams()
  const item = newsItems.find((n) => n.slug === slug)
  if (!item) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p>Article not found.</p>
        <Link to="/news" className="mt-4 inline-block text-gold-dim underline">
          Back
        </Link>
      </div>
    )
  }
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <Link
        to="/news"
        className="mb-8 inline-flex items-center gap-2 text-sm text-ink-muted hover:text-navy dark:hover:text-cream"
      >
        <ArrowLeft className="h-4 w-4" /> All news
      </Link>
      <Badge>{item.category}</Badge>
      <h1 className="mt-4 text-3xl font-bold text-navy dark:text-cream md:text-4xl">
        {item.title}
      </h1>
      <p className="mt-3 text-sm text-ink-muted dark:text-cream/55">{item.date}</p>
      <ContentReviewed lastReviewed={item.lastReviewed} className="mt-1" />

      <div className="mt-6">
        <AuthoritativeSource section="pressReleases" />
      </div>

      <p className="mt-6 text-lg text-ink-muted dark:text-cream/75">{item.excerpt}</p>
      <div className="mt-8 space-y-4">
        {item.body.map((p) => (
          <p key={p} className="leading-relaxed text-ink-muted dark:text-cream/70">
            {p}
          </p>
        ))}
      </div>
      <div className="mt-12">
        <DisclaimerBanner />
      </div>
    </div>
  )
}
