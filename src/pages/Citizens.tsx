import { ExternalLink } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { ExploreNext } from '../components/ExploreNext'
import { CITIZENS_OFFICIAL_HUB, citizenCards } from '../data/citizens'
import { useLang } from '../hooks/useLang'

export function Citizens() {
  const { t, isHi } = useLang()
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
      <PageHeader
        eyebrow={t('Public services', 'सार्वजनिक सेवाएँ')}
        title={t('Citizens’ Corner', 'नागरिक कॉर्नर')}
        description={t(
          'Short original explainers with outbound links to official RBI citizen pages — complaints, awareness, recruitment and more. This is an unofficial prototype.',
          'आधिकारिक आरबीआई नागरिक पृष्ठों के आउटबाउंड लिंक के साथ संक्षिप्त मूल व्याख्या — शिकायतें, जागरूकता, भर्ती आदि। यह अनौपचारिक प्रोटोटाइप है।',
        )}
      />
      <div className="mb-6 border border-amber-500/40 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:border-amber-400/30 dark:bg-amber-950/30 dark:text-amber-100">
        <strong>{t('Unofficial banner', 'अनौपचारिक बैनर')}:</strong>{' '}
        {t(
          'Not affiliated with RBI. Do not submit complaints or applications here — use official portals only.',
          'आरबीआई से संबद्ध नहीं। यहाँ शिकायत या आवेदन न करें — केवल आधिकारिक पोर्टल का उपयोग करें।',
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {citizenCards.map((c) => (
          <article key={c.id} className="portal-panel p-5">
            <h2 className="font-serif text-base font-semibold text-navy dark:text-cream">
              {isHi ? c.titleHi : c.title}
            </h2>
            {!isHi && (
              <p lang="hi" className="bilingual-hi text-xs">
                {c.titleHi}
              </p>
            )}
            <p className="mt-2 text-sm leading-relaxed text-ink-muted dark:text-cream/70">{c.explainer}</p>
            <a
              href={c.officialHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-dim hover:underline dark:text-gold"
            >
              {c.officialLabel}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          </article>
        ))}
      </div>
      <p className="mt-6 text-xs text-ink-muted dark:text-cream/55">
        {t('Citizen hub on official site:', 'आधिकारिक साइट पर नागरिक हब:')}{' '}
        <a
          href={CITIZENS_OFFICIAL_HUB}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-gold-dim hover:underline dark:text-gold"
        >
          rbi.org.in <ExternalLink className="inline h-3 w-3" />
        </a>
      </p>
      <ExploreNext pathname="/citizens" />
      <div className="mt-10">
        <DisclaimerBanner />
      </div>
    </div>
  )
}
