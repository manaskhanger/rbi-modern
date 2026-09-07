import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { ExploreNext } from '../components/ExploreNext'
import { rbiFunctions } from '../data/functions'
import { useLang } from '../hooks/useLang'

export function Functions() {
  const { t, isHi } = useLang()
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
      <PageHeader
        eyebrow={t('Functions', 'कार्य')}
        title={t('Function-wise directory', 'कार्य-वार निर्देशिका')}
        description={t(
          'Educational landings inspired by public RBI function groupings — short original blurbs with links into this prototype and outbound official sections. Not a statutory schedule.',
          'सार्वजनिक आरबीआई कार्य समूहों से प्रेरित शैक्षिक पृष्ठ — संक्षिप्त मूल परिचय के साथ प्रोटोटाइप और आधिकारिक अनुभागों के लिंक।',
        )}
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {rbiFunctions.map((f) => (
          <Link key={f.slug} to={`/functions/${f.slug}`} className="function-card group">
            <div>
              <h2 className="text-sm font-semibold text-navy group-hover:text-rbi-blue dark:text-cream">
                {isHi ? f.titleHi : f.title}
              </h2>
              {!isHi && (
                <span lang="hi" className="bilingual-hi text-[11px]">
                  {f.titleHi}
                </span>
              )}
              {isHi && (
                <span className="mt-0.5 block text-[11px] text-ink-muted dark:text-cream/55">{f.title}</span>
              )}
              <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-ink-muted dark:text-cream/65">
                {f.blurb}
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-gold-dim dark:text-gold">
                {t('Open function', 'कार्य खोलें')} <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
      <p className="mt-6 text-xs text-ink-muted dark:text-cream/55">
        {t('Authoritative function descriptions live on', 'आधिकारिक कार्य विवरण यहाँ हैं')}{' '}
        <a
          href="https://www.rbi.org.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-gold-dim underline-offset-2 hover:underline dark:text-gold"
        >
          rbi.org.in <ExternalLink className="inline h-3 w-3" aria-hidden />
        </a>
        .
      </p>
      <ExploreNext pathname="/functions" />
      <div className="mt-10">
        <DisclaimerBanner />
      </div>
    </div>
  )
}
