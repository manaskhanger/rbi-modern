import { Link } from 'react-router-dom'
import { BookOpen, ExternalLink } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { ExploreNext } from '../components/ExploreNext'
import { Badge } from '../components/Badge'
import { publicationCategories } from '../data/publications'
import { useLang } from '../hooks/useLang'
import { RBI_HOME } from '../data/meta'

export function Publications() {
  const { t, isHi } = useLang()

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
      <PageHeader
        eyebrow={t('Knowledge products', 'ज्ञान उत्पाद')}
        title={t('Publications', 'प्रकाशन')}
        description={t(
          'Illustrative landing for major RBI-style report categories. Each card is an original educational blurb that links into prototype report digests, circulars, and Masters Directions — not official publication text.',
          'आरबीआई-शैली रिपोर्ट श्रेणियों का उदाहरणात्मक लैंडिंग। प्रत्येक कार्ड मूल शैक्षिक सार है जो प्रोटोटाइप रिपोर्ट सार, परिपत्र और मास्टर निर्देशों से जुड़ता है — आधिकारिक प्रकाशन पाठ नहीं।',
        )}
      />

      <div className="mb-6 flex flex-wrap items-center gap-3 border border-navy/10 bg-white/60 px-4 py-3 text-sm dark:border-white/10 dark:bg-navy-light/40">
        <Badge tone="muted">{t('Illustrative only', 'केवल उदाहरणात्मक')}</Badge>
        <p className="text-ink-muted dark:text-cream/65">
          {t(
            'Browse seeded digests in the reports catalogue, or jump from a category below.',
            'रिपोर्ट कैटलॉग में सीडेड सार देखें, या नीचे किसी श्रेणी से जाएँ।',
          )}{' '}
          <Link
            to="/reports"
            className="font-semibold text-gold-dim underline-offset-2 hover:underline dark:text-gold"
          >
            {t('Open all report digests →', 'सभी रिपोर्ट सार खोलें →')}
          </Link>
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {publicationCategories.map((c) => (
          <article key={c.id} className="portal-panel flex flex-col p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-gold/15 p-2.5" aria-hidden>
                <BookOpen className="h-4 w-4 text-gold-dim dark:text-gold" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-serif text-base font-semibold text-navy dark:text-cream">
                  {isHi ? c.titleHi : c.title}
                </h2>
                {!isHi && (
                  <p lang="hi" className="bilingual-hi text-xs">
                    {c.titleHi}
                  </p>
                )}
                {isHi && (
                  <p lang="en" className="mt-0.5 text-xs text-ink-muted dark:text-cream/50">
                    {c.title}
                  </p>
                )}
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted dark:text-cream/70">
              {isHi ? c.blurbHi : c.blurb}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Link
                to={c.primaryTo}
                className="inline-flex items-center text-sm font-semibold text-gold-dim hover:underline dark:text-gold"
              >
                {t(c.primaryLabel, c.primaryLabel)} →
              </Link>
            </div>
            {c.related && c.related.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.related.map((l) => (
                  <Link
                    key={l.to + l.label}
                    to={l.to}
                    className="rounded-full border border-navy/10 px-2 py-0.5 text-[10px] font-medium text-ink-muted hover:border-gold/40 hover:text-navy dark:border-white/10 dark:text-cream/55 dark:hover:text-cream"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>

      <p className="mt-6 text-xs text-ink-muted dark:text-cream/55">
        {t(
          'Authoritative publications remain on the official site:',
          'आधिकारिक प्रकाशन आधिकारिक साइट पर ही हैं:',
        )}{' '}
        <a
          href={RBI_HOME}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-gold-dim hover:underline dark:text-gold"
        >
          rbi.org.in <ExternalLink className="inline h-3 w-3" aria-hidden />
        </a>
      </p>

      <ExploreNext pathname="/publications" />
      <div className="mt-10">
        <DisclaimerBanner />
      </div>
    </div>
  )
}
