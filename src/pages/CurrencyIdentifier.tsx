import { Link } from 'react-router-dom'
import { Banknote, ExternalLink, Info } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { ExploreNext } from '../components/ExploreNext'
import { Badge } from '../components/Badge'
import { useLang } from '../hooks/useLang'
import { RBI_HOME } from '../data/meta'

/** Official currency / banknotes information on rbi.org.in (read-only outbound). */
const OFFICIAL_CURRENCY =
  'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx'

export function CurrencyIdentifier() {
  const { t, isHi } = useLang()

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-10">
      <PageHeader
        eyebrow={t('Utilities · illustrative', 'उपयोगिताएँ · उदाहरणात्मक')}
        title={t('Currency Identifier', 'मुद्रा पहचानकर्ता')}
        description={t(
          'Illustrative note only. This prototype does not identify banknotes, open a camera, or accept uploads.',
          'केवल उदाहरणात्मक नोट। यह प्रोटोटाइप नोटों की पहचान नहीं करता, कैमरा नहीं खोलता, और अपलोड स्वीकार नहीं करता।',
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
            'No camera, no photo upload, and no identification logic exist on this page. You cannot verify a note here.',
            'इस पृष्ठ पर कोई कैमरा, फोटो अपलोड या पहचान तर्क नहीं है। आप यहाँ नोट सत्यापित नहीं कर सकते।',
          )}
        </p>
      </div>

      <div className="mb-6 flex items-start gap-3 rounded-xl border border-navy/10 bg-white/80 p-4 dark:border-white/10 dark:bg-navy-light/40">
        <div className="rounded-lg bg-gold/15 p-2.5" aria-hidden>
          <Banknote className="h-5 w-5 text-gold-dim dark:text-gold" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap gap-2">
            <Badge tone="muted">{t('Static · educational', 'स्थिर · शैक्षिक')}</Badge>
            <Badge tone="gold">{t('No ID engine', 'कोई पहचान इंजन नहीं')}</Badge>
          </div>
          <h2 className="font-serif text-base font-semibold text-navy dark:text-cream">
            {t('What a real tool would do', 'एक वास्तविक उपकरण क्या करता')}
          </h2>
          {!isHi && (
            <p lang="hi" className="bilingual-hi text-xs">
              एक वास्तविक उपकरण क्या करता
            </p>
          )}
          <p className="mt-2 text-sm leading-relaxed text-ink-muted dark:text-cream/70">
            {t(
              'On the official RBI site, currency guidance helps the public recognise security features on genuine Indian banknotes (watermarks, see-through register, colour-shifting ink, and related cues). A production “currency identifier” might walk someone through those features — this page is only a labelled placeholder explaining that idea.',
              'आधिकारिक आरबीआई साइट पर मुद्रा मार्गदर्शन जनता को वास्तविक भारतीय बैंकनोटों की सुरक्षा विशेषताओं (वॉटरमार्क, सी-थ्रू रजिस्टर, रंग-परिवर्तन स्याही आदि) को पहचानने में मदद करता है। एक वास्तविक “मुद्रा पहचानकर्ता” उन विशेषताओं से होकर ले जा सकता है — यह पृष्ठ केवल उस विचार का लेबलयुक्त प्लेसहोल्डर है।',
            )}
          </p>
        </div>
      </div>

      <div className="mb-6 flex items-start gap-3 rounded-xl border border-navy/10 bg-white/70 px-4 py-3.5 dark:border-white/10 dark:bg-navy-light/30">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-dim dark:text-gold" aria-hidden />
        <p className="text-sm text-ink-muted dark:text-cream/70">
          {t(
            'This Knowledge Prototype never captures images, never runs counterfeit detection, and never stores note data. For authoritative currency information, use rbi.org.in only.',
            'यह ज्ञान प्रोटोटाइप कभी चित्र नहीं लेता, नकली पहचान नहीं चलाता, और नोट डेटा संग्रहीत नहीं करता। आधिकारिक मुद्रा जानकारी के लिए केवल rbi.org.in का उपयोग करें।',
          )}
        </p>
      </div>

      <ul className="mb-8 space-y-2 text-sm text-ink-muted dark:text-cream/65">
        <li className="flex gap-2">
          <span className="font-semibold text-navy dark:text-cream" aria-hidden>
            —
          </span>
          {t('No camera or scanner access', 'कोई कैमरा या स्कैनर पहुँच नहीं')}
        </li>
        <li className="flex gap-2">
          <span className="font-semibold text-navy dark:text-cream" aria-hidden>
            —
          </span>
          {t('No file upload or drag-and-drop', 'कोई फ़ाइल अपलोड या ड्रैग-एंड-ड्रॉप नहीं')}
        </li>
        <li className="flex gap-2">
          <span className="font-semibold text-navy dark:text-cream" aria-hidden>
            —
          </span>
          {t('No automatic identification or scoring', 'कोई स्वचालित पहचान या स्कोरिंग नहीं')}
        </li>
      </ul>

      <p className="text-sm text-ink-muted dark:text-cream/60">
        {t('Official resources:', 'आधिकारिक संसाधन:')}{' '}
        <a
          href={OFFICIAL_CURRENCY}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-gold-dim underline-offset-2 hover:underline dark:text-gold"
        >
          {t('Currency-related Master Directions index', 'मुद्रा संबंधी मास्टर निर्देश सूची')}
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
          to="/utilities/complaint"
          className="font-medium text-gold-dim hover:underline dark:text-gold"
        >
          {t('Complaint Lodging (illustrative)', 'शिकायत दर्ज करना (उदाहरणात्मक)')}
        </Link>
        {' · '}
        <Link to="/citizens" className="font-medium text-gold-dim hover:underline dark:text-gold">
          {t("Citizens' Corner", 'नागरिक कॉर्नर')}
        </Link>
      </p>

      <ExploreNext pathname="/utilities/currency-identifier" />
      <div className="mt-10">
        <DisclaimerBanner />
      </div>
    </div>
  )
}
