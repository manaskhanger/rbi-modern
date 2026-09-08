import { Link } from 'react-router-dom'
import { BarChart3, ExternalLink } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { ExploreNext } from '../components/ExploreNext'
import { Badge } from '../components/Badge'
import { statisticsCategories } from '../data/statistics'
import { useLang } from '../hooks/useLang'
import { RBI_DBIE, RBI_SECTIONS } from '../data/meta'

export function Statistics() {
  const { t, isHi } = useLang()

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
      <PageHeader
        eyebrow={t('Data & indicators', 'डेटा और संकेतक')}
        title={t('Statistics', 'सांख्यिकी')}
        description={t(
          'Illustrative landing for DBIE-style statistic categories. Each card is an original educational blurb pointing into the sample data lab, monetary policy desk, publications, reports, and circulars — not live official series.',
          'DBIE-शैली सांख्यिकी श्रेणियों का उदाहरणात्मक लैंडिंग। प्रत्येक कार्ड मूल शैक्षिक सार है जो नमूना डेटा लैब, मौद्रिक नीति डेस्क, प्रकाशन, रिपोर्ट और परिपत्रों से जुड़ता है — जीवंत आधिकारिक श्रृंखला नहीं।',
        )}
      />

      <div className="mb-6 flex flex-wrap items-center gap-3 border border-navy/10 bg-white/60 px-4 py-3 text-sm dark:border-white/10 dark:bg-navy-light/40">
        <Badge tone="muted">{t('Unofficial · illustrative', 'अनौपचारिक · उदाहरणात्मक')}</Badge>
        <p className="text-ink-muted dark:text-cream/65">
          {t(
            'Category cards below describe what each DBIE-style bucket covers. For hands-on sample charts, open the sample data lab — figures there are also illustrative, not live DBIE.',
            'नीचे कार्ड बताते हैं कि प्रत्येक DBIE-शैली श्रेणी क्या कवर करती है। नमूना चार्ट के लिए सैंपल डेटा लैब खोलें — वहाँ के आंकड़े भी उदाहरणात्मक हैं, जीवंत DBIE नहीं।',
          )}{' '}
          <Link
            to="/data"
            className="font-semibold text-gold-dim underline-offset-2 hover:underline dark:text-gold"
          >
            {t('Open sample data lab →', 'सैंपल डेटा लैब खोलें →')}
          </Link>
        </p>
      </div>

      <p className="mb-4 text-xs font-medium text-ink-muted dark:text-cream/55">
        {t(
          'Illustrative · not for compliance — no live DBIE figures are mirrored on this page.',
          'उदाहरणात्मक · अनुपालन के लिए नहीं — इस पृष्ठ पर जीवंत DBIE आंकड़े नहीं हैं।',
        )}
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {statisticsCategories.map((c) => (
          <article key={c.id} className="portal-panel flex flex-col p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-gold/15 p-2.5" aria-hidden>
                <BarChart3 className="h-4 w-4 text-gold-dim dark:text-gold" />
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
            {c.officialHref && (
              <p className="mt-3 text-[11px] text-ink-muted dark:text-cream/50">
                <a
                  href={c.officialHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-gold-dim hover:underline dark:text-gold"
                >
                  {c.officialLabel ?? 'Official DBIE / statistics on rbi.org.in'}
                  <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              </p>
            )}
          </article>
        ))}
      </div>

      <p className="mt-6 text-xs text-ink-muted dark:text-cream/55">
        {t(
          'Authoritative time series remain on the official portals:',
          'आधिकारिक समय श्रृंखला आधिकारिक पोर्टल पर ही हैं:',
        )}{' '}
        <a
          href={RBI_DBIE}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-gold-dim hover:underline dark:text-gold"
        >
          data.rbi.org.in <ExternalLink className="inline h-3 w-3" aria-hidden />
        </a>
        {' · '}
        <a
          href={RBI_SECTIONS.statistics.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-gold-dim hover:underline dark:text-gold"
        >
          rbi.org.in Statistics <ExternalLink className="inline h-3 w-3" aria-hidden />
        </a>
      </p>

      <ExploreNext pathname="/statistics" />
      <div className="mt-10">
        <DisclaimerBanner />
      </div>
    </div>
  )
}
