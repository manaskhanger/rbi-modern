import { Link } from 'react-router-dom'
import { ExternalLink, Info, MessageSquareWarning } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { ExploreNext } from '../components/ExploreNext'
import { Badge } from '../components/Badge'
import { useLang } from '../hooks/useLang'
import { RBI_HOME } from '../data/meta'

/** Official RBI Complaint Management System (read-only outbound). */
const OFFICIAL_CMS = 'https://cms.rbi.org.in/'

export function ComplaintLodging() {
  const { t, isHi } = useLang()

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-10">
      <PageHeader
        eyebrow={t('Utilities · illustrative', 'उपयोगिताएँ · उदाहरणात्मक')}
        title={t('Complaint Lodging', 'शिकायत दर्ज करना')}
        description={t(
          'Illustrative note only. This prototype has no complaint form and cannot accept, store, or forward any grievance.',
          'केवल उदाहरणात्मक नोट। इस प्रोटोटाइप में कोई शिकायत फ़ॉर्म नहीं है और यह कोई शिकायत स्वीकार, संग्रहीत या अग्रेषित नहीं कर सकता।',
        )}
      />

      <div
        className="mb-6 border border-amber-500/45 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:border-amber-400/35 dark:bg-amber-950/35 dark:text-amber-100"
        role="status"
      >
        <p className="font-semibold">
          {t('Illustrative — not functional', 'उदाहरणात्मक — क्रियाशील नहीं')}
        </p>
        <p className="mt-1 text-[13px] leading-relaxed opacity-95">
          {t(
            'There is no form on this page — no text fields, selects, checkboxes, or submit button. A real user cannot lodge a complaint here.',
            'इस पृष्ठ पर कोई फ़ॉर्म नहीं है — कोई टेक्स्ट फ़ील्ड, चयन, चेकबॉक्स या सबमिट बटन नहीं। वास्तविक उपयोगकर्ता यहाँ शिकायत दर्ज नहीं कर सकता।',
          )}
        </p>
      </div>

      <div className="mb-6 flex items-start gap-3 rounded-xl border border-navy/10 bg-white/80 p-4 dark:border-white/10 dark:bg-navy-light/40">
        <div className="rounded-lg bg-gold/15 p-2.5" aria-hidden>
          <MessageSquareWarning className="h-5 w-5 text-gold-dim dark:text-gold" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap gap-2">
            <Badge tone="muted">{t('Static · educational', 'स्थिर · शैक्षिक')}</Badge>
            <Badge tone="gold">{t('No submission path', 'कोई सबमिशन पथ नहीं')}</Badge>
          </div>
          <h2 className="font-serif text-base font-semibold text-navy dark:text-cream">
            {t('What a real lodging flow would do', 'एक वास्तविक दर्ज करने का प्रवाह क्या करता')}
          </h2>
          {!isHi && (
            <p lang="hi" className="bilingual-hi text-xs">
              एक वास्तविक दर्ज करने का प्रवाह क्या करता
            </p>
          )}
          <p className="mt-2 text-sm leading-relaxed text-ink-muted dark:text-cream/70">
            {t(
              'On the official RBI Complaint Management System (CMS), customers can escalate unresolved complaints against regulated entities after exhausting the entity’s own grievance desk. That live portal collects details and tracks cases — none of that happens on this unofficial prototype.',
              'आधिकारिक आरबीआई शिकायत प्रबंधन प्रणाली (CMS) पर, ग्राहक विनियमित संस्थाओं के विरुद्ध अनसुलझी शिकायतों को संस्था के अपने शिकायत डेस्क के बाद बढ़ा सकते हैं। वह जीवंत पोर्टल विवरण एकत्र करता है और मामलों को ट्रैक करता है — इस अनौपचारिक प्रोटोटाइप पर ऐसा कुछ नहीं होता।',
            )}
          </p>
        </div>
      </div>

      {/* Explicit non-form block so the page cannot be mistaken for a submission UI */}
      <div className="mb-6 rounded-xl border border-dashed border-navy/25 bg-cream/50 px-4 py-5 text-center dark:border-white/20 dark:bg-navy/40">
        <p className="text-sm font-semibold text-navy dark:text-cream">
          {t('No complaint form on this site', 'इस साइट पर कोई शिकायत फ़ॉर्म नहीं')}
        </p>
        <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-ink-muted dark:text-cream/65">
          {t(
            'Intentionally empty: no inputs, no textareas, no file attachments, no OTP fields, and no “Submit” control. Nothing you type elsewhere on this prototype is sent to RBI.',
            'जानबूझकर खाली: कोई इनपुट, टेक्स्टएरिया, फ़ाइल अटैचमेंट, OTP फ़ील्ड या “सबमिट” नियंत्रण नहीं। इस प्रोटोटाइप पर कहीं और टाइप की गई कोई भी चीज़ आरबीआई को नहीं भेजी जाती।',
          )}
        </p>
      </div>

      <div className="mb-6 flex items-start gap-3 rounded-xl border border-navy/10 bg-white/70 px-4 py-3.5 dark:border-white/10 dark:bg-navy-light/30">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-dim dark:text-gold" aria-hidden />
        <p className="text-sm text-ink-muted dark:text-cream/70">
          {t(
            'Do not attempt to file a grievance on this Knowledge Prototype. Use the official CMS only for real complaints.',
            'इस ज्ञान प्रोटोटाइप पर शिकायत दर्ज करने का प्रयास न करें। वास्तविक शिकायतों के लिए केवल आधिकारिक CMS का उपयोग करें।',
          )}
        </p>
      </div>

      <p className="text-sm text-ink-muted dark:text-cream/60">
        {t('Official lodging portal:', 'आधिकारिक दर्ज पोर्टल:')}{' '}
        <a
          href={OFFICIAL_CMS}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-gold-dim underline-offset-2 hover:underline dark:text-gold"
        >
          {t('RBI Complaint Management System (CMS)', 'आरबीआई शिकायत प्रबंधन प्रणाली (CMS)')}
          <ExternalLink className="ml-1 inline h-3 w-3" aria-hidden />
        </a>
        {' · '}
        <a
          href={RBI_HOME}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-gold-dim underline-offset-2 hover:underline dark:text-gold"
        >
          rbi.org.in
          <ExternalLink className="ml-1 inline h-3 w-3" aria-hidden />
        </a>
      </p>

      <p className="mt-4 text-sm text-ink-muted dark:text-cream/60">
        {t('Related on this prototype:', 'इस प्रोटोटाइप पर संबंधित:')}{' '}
        <Link
          to="/utilities/currency-identifier"
          className="font-medium text-gold-dim hover:underline dark:text-gold"
        >
          {t('Currency Identifier (illustrative)', 'मुद्रा पहचानकर्ता (उदाहरणात्मक)')}
        </Link>
        {' · '}
        <Link to="/citizens" className="font-medium text-gold-dim hover:underline dark:text-gold">
          {t("Citizens' Corner", 'नागरिक कॉर्नर')}
        </Link>
      </p>

      <ExploreNext pathname="/utilities/complaint" />
      <div className="mt-10">
        <DisclaimerBanner />
      </div>
    </div>
  )
}
