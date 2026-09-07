import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { ExploreNext } from '../components/ExploreNext'
import { getFunction, rbiFunctions } from '../data/functions'
import { useLang } from '../hooks/useLang'

export function FunctionDetail() {
  const { slug } = useParams()
  const { t, isHi } = useLang()
  const fn = slug ? getFunction(slug) : undefined

  if (!fn) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-lg font-semibold text-navy dark:text-cream">Function not found</p>
        <Link to="/functions" className="mt-4 inline-block text-gold-dim underline">
          Back to functions
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
      <Link
        to="/functions"
        className="mb-4 inline-flex items-center gap-2 text-sm text-ink-muted hover:text-navy dark:hover:text-cream"
      >
        <ArrowLeft className="h-4 w-4" /> {t('All functions', 'सभी कार्य')}
      </Link>
      <PageHeader
        eyebrow={t('Function', 'कार्य')}
        title={isHi ? fn.titleHi : fn.title}
        description={fn.blurb}
      />
      <div className="portal-panel mb-6 p-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gold-dim dark:text-gold">
          {t('Official section', 'आधिकारिक अनुभाग')}
        </p>
        <a
          href={fn.officialHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:underline dark:text-cream"
        >
          {fn.officialLabel}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
        <p className="mt-2 text-xs text-ink-muted dark:text-cream/55">
          Unofficial prototype blurb — verify mandate and circulars on rbi.org.in.
        </p>
      </div>
      <h2 className="font-serif text-lg font-semibold text-navy dark:text-cream">
        {t('Related in this prototype', 'इस प्रोटोटाइप में संबंधित')}
      </h2>
      <ul className="mt-3 space-y-2">
        {fn.links.map((l) =>
          l.external ? (
            <li key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gold-dim hover:underline dark:text-gold"
              >
                {l.label} <ExternalLink className="inline h-3 w-3" />
              </a>
            </li>
          ) : (
            <li key={l.href}>
              <Link
                to={l.href}
                className="text-sm font-medium text-gold-dim hover:underline dark:text-gold"
              >
                {l.label} →
              </Link>
            </li>
          ),
        )}
      </ul>
      <div className="mt-8 flex flex-wrap gap-2">
        {rbiFunctions
          .filter((f) => f.slug !== fn.slug)
          .slice(0, 6)
          .map((f) => (
            <Link
              key={f.slug}
              to={`/functions/${f.slug}`}
              className="border border-navy/15 px-2.5 py-1 text-[11px] font-medium text-ink-muted hover:border-gold/40 dark:border-white/15 dark:text-cream/70"
            >
              {isHi ? f.titleHi : f.title}
            </Link>
          ))}
      </div>
      <ExploreNext pathname={`/functions/${fn.slug}`} />
      <div className="mt-10">
        <DisclaimerBanner />
      </div>
    </div>
  )
}
