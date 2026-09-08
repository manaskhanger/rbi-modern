import { ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { Badge } from '../components/Badge'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { ExploreNext } from '../components/ExploreNext'
import { pressReleases, formatPressDate } from '../data/pressReleases'
import { RBI_SECTIONS } from '../data/meta'
import { useLang } from '../hooks/useLang'

const sorted = [...pressReleases].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

export function Press() {
  const { t } = useLang()
  const official = RBI_SECTIONS.pressReleases

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <PageHeader
        eyebrow={t('Press desk', 'प्रेस डेस्क')}
        title={t('Press releases', 'प्रेस विज्ञप्तियाँ')}
        description={t(
          'Dated announcement-style listing modelled on a central-bank press desk. Short educational gists only — not live RBI wire copy.',
          'केंद्रीय बैंक प्रेस डेस्क की तर्ज पर दिनांकित घोषणा-सूची। केवल संक्षिप्त शैक्षिक सार — लाइव आरबीआई कॉपी नहीं।',
        )}
      />

      <div className="mb-6 flex flex-wrap items-center gap-3 border border-amber-500/35 bg-amber-50/80 px-4 py-3 text-sm text-amber-950 dark:border-amber-400/25 dark:bg-amber-950/25 dark:text-amber-100">
        <Badge tone="muted">{t('Illustrative · unofficial', 'उदाहरणात्मक · अनौपचारिक')}</Badge>
        <p className="min-w-0 flex-1 text-[13px] leading-relaxed">
          {t(
            'Prototype sample releases for layout and literacy practice. Confirm every real announcement on the official Press Releases index.',
            'लेआउट और साक्षरता अभ्यास के लिए प्रोटोटाइप नमूना विज्ञप्तियाँ। हर वास्तविक घोषणा आधिकारिक प्रेस विज्ञप्ति अनुक्रमणिका पर सत्यापित करें।',
          )}
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-4 text-sm">
        <a
          href={official.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-semibold text-gold-dim hover:underline dark:text-gold"
        >
          {t('Official press releases on rbi.org.in', 'rbi.org.in पर आधिकारिक प्रेस विज्ञप्तियाँ')}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
        <Link
          to="/news"
          className="inline-flex items-center gap-1.5 font-medium text-navy/80 underline-offset-2 hover:underline dark:text-cream/80"
        >
          {t('Related news digests →', 'संबंधित समाचार सार →')}
        </Link>
      </div>

      <ol className="divide-y divide-navy/10 border border-navy/12 bg-white dark:divide-white/10 dark:border-white/12 dark:bg-navy-light/40">
        {sorted.map((pr) => (
          <li key={pr.slug} className="grid gap-3 px-4 py-5 sm:grid-cols-[8.5rem_1fr] sm:gap-6 md:px-5">
            <time
              dateTime={pr.date}
              className="shrink-0 font-mono text-[12px] font-semibold uppercase tracking-wide text-gold-dim dark:text-gold"
            >
              {formatPressDate(pr.date)}
            </time>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-2">
                <h2 className="font-serif text-[15px] font-semibold leading-snug text-navy dark:text-cream md:text-base">
                  {pr.title}
                </h2>
                {pr.category && (
                  <span className="rounded-sm border border-navy/15 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-ink-muted dark:border-white/15 dark:text-cream/55">
                    {pr.category}
                  </span>
                )}
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted dark:text-cream/70">
                {pr.gist}
              </p>
              {pr.officialUrl && (
                <a
                  href={pr.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-gold-dim hover:underline dark:text-gold"
                >
                  {t('Browse official index', 'आधिकारिक अनुक्रमणिका देखें')}
                  <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-6 text-xs text-ink-muted dark:text-cream/50">
        {t(
          'Distinct from the Home “What’s New” ticker and from card-style News digests — this page is a press-desk chronology.',
          'होम के “What’s New” टिकर और कार्ड-शैली समाचार सार से अलग — यह पृष्ठ प्रेस-डेस्क कालक्रम है।',
        )}
      </p>

      <ExploreNext pathname="/press" />
      <div className="mt-10">
        <DisclaimerBanner />
      </div>
    </div>
  )
}
