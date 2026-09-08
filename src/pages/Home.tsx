import { Link } from 'react-router-dom'
import { ExternalLink, FileText, ArrowRight, Compass, Banknote, MessageSquareWarning } from 'lucide-react'
import { mastersDirections } from '../data/mastersDirections'
import { circulars } from '../data/circulars'
import { RBI_HOME } from '../data/meta'
import { ratesPanels, ratesDeskAsOf, ratesDeskDisclaimer } from '../data/ratesDesk'
import { whatsNewItems, WHATS_NEW_OFFICIAL_INDEX } from '../data/whatsNew'
import { rbiFunctions } from '../data/functions'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { TourPrompt } from '../components/TourPrompt'
import { PersonaCards } from '../components/PersonaCards'
import { InteractiveSiteMap } from '../components/InteractiveSiteMap'
import { DocumentTable, type DocTableRow } from '../components/DocumentTable'
import { TOUR_DURATION_LABEL } from '../data/tour'
import { useLang } from '../hooks/useLang'

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-')
  if (!y || !m || !d) return iso
  return `${d}-${m}-${y}`
}

export function Home() {
  const { t, isHi } = useLang()
  const whatsNew = whatsNewItems.slice(0, 40)
  const mdRows: DocTableRow[] = mastersDirections.slice(0, 8).map((d) => ({
    id: d.slug,
    date: d.updated || d.issued,
    title: d.title,
    category: d.category,
    meta: d.code,
    officialPdfUrl: d.officialPdfUrl,
    officialHtmlUrl: d.officialHtmlUrl,
    pdfMode: d.pdfMode,
    summaryPath: `/masters-directions/${d.slug}`,
    summaryLabel: 'Summary',
  }))
  const circRows: DocTableRow[] = circulars.slice(0, 6).map((c) => ({
    id: c.slug,
    date: c.date,
    title: c.title,
    category: c.category,
    meta: c.ref,
    officialPdfUrl: c.officialPdfUrl,
    officialHtmlUrl: c.officialHtmlUrl,
    pdfMode: c.pdfMode,
    summaryPath: `/circulars/${c.slug}`,
    summaryLabel: 'Summary',
  }))

  return (
    <div className="bg-cream dark:bg-navy">
      {/* Masthead welcome */}
      <section className="masthead">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-soft">
            Knowledge Prototype · Unofficial modernisation of public RBI web patterns
            <span lang="hi" className="ml-2 font-medium normal-case tracking-normal opacity-85">
              ज्ञान प्रोटोटाइप · अनौपचारिक
            </span>
          </p>
          <h1 className="font-serif mt-2 text-2xl font-semibold tracking-tight text-cream md:text-3xl">
            Welcome
            <span lang="hi" className="ml-2 text-xl font-normal text-cream/80 md:text-2xl">
              / स्वागत है
            </span>
          </h1>
          <p className="mt-1 max-w-3xl text-sm text-cream/80 md:text-[15px]">
            An educational portal prototype exploring how India’s central bank public information
            might be organised for reading — denser lists, clearer rates panels, and function-wise
            directories. Not affiliated with the Reserve Bank of India.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to="/tour"
              className="inline-flex items-center gap-1.5 border border-gold/50 bg-gold/15 px-3 py-1.5 text-xs font-semibold text-gold-soft transition hover:bg-gold/25"
            >
              <Compass className="h-3.5 w-3.5" aria-hidden /> Guided tour ({TOUR_DURATION_LABEL})
            </Link>
            <Link
              to="/about/prototype"
              className="inline-flex items-center gap-1.5 border border-cream/25 px-3 py-1.5 text-xs font-semibold text-cream/90 transition hover:bg-white/10"
            >
              What this is / isn’t
            </Link>
            <a
              href={RBI_HOME}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-cream/25 px-3 py-1.5 text-xs font-semibold text-cream/90 transition hover:bg-white/10"
            >
              Official rbi.org.in <ExternalLink className="h-3 w-3" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
        {/* Preamble */}
        <section
          className="content-well px-5 py-5 md:px-7 md:py-6"
          aria-labelledby="preamble-heading"
        >
          <h2
            id="preamble-heading"
            className="font-serif text-lg font-semibold text-navy dark:text-cream md:text-xl"
          >
            Preamble
            <span lang="hi" className="bilingual-hi mt-0.5 text-sm font-medium">
              प्रस्तावना
            </span>
          </h2>
          <div className="prose-read mt-3 text-[15px] text-ink dark:text-cream/90">
            <p>
              India’s central bank is charged with securing monetary stability, regulating and
              supervising the banking system, issuing currency, overseeing payment systems, and
              fostering the orderly development of financial markets. Its public communications —
              circulars, Masters Directions, policy statements and statistical releases — are a
              primary interface with banks, markets and citizens.
            </p>
            <p className="mt-3">
              This site is an <strong>unofficial educational prototype</strong>. It paraphrases
              institutional roles in original language, uses clearly labelled illustrative figures,
              and links outbound to official RBI PDFs and pages. It does not reproduce copyrighted
              RBI preamble text, seals or logos, and must never be treated as an authoritative
              source.
            </p>
          </div>
          <div className="mt-4">
            <TourPrompt />
          </div>
        </section>

        {/* Utilities / quick-access (illustrative entry points) */}
        <section className="mt-6" aria-labelledby="utilities-heading">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2
                id="utilities-heading"
                className="font-serif text-xl font-semibold text-navy dark:text-cream"
              >
                {t('Utilities', 'उपयोगिताएँ')}
                <span lang="hi" className="bilingual-hi mt-0.5 text-sm font-medium">
                  {isHi ? 'Utilities' : 'उपयोगिताएँ'}
                </span>
              </h2>
              <p className="mt-1 text-sm text-ink-muted dark:text-cream/65">
                {t(
                  'Quick-access entry points — illustrative only; neither tool is functional on this prototype.',
                  'त्वरित पहुँच प्रवेश बिंदु — केवल उदाहरणात्मक; इस प्रोटोटाइप पर कोई भी उपकरण क्रियाशील नहीं है।',
                )}
              </p>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gold-dim dark:text-gold">
              {t('Illustrative · not functional', 'उदाहरणात्मक · क्रियाशील नहीं')}
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              to="/utilities/currency-identifier"
              className="function-card group flex items-start gap-3"
            >
              <div className="rounded-lg bg-gold/15 p-2.5" aria-hidden>
                <Banknote className="h-5 w-5 text-gold-dim dark:text-gold" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-navy group-hover:text-rbi-blue dark:text-cream">
                  {t('Currency Identifier', 'मुद्रा पहचानकर्ता')}
                </h3>
                <span lang="hi" className="bilingual-hi text-[11px]">
                  {isHi ? 'Currency Identifier' : 'मुद्रा पहचानकर्ता'}
                </span>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-muted dark:text-cream/65">
                  {t(
                    'Note page explaining a real identifier — no camera, upload, or ID logic here.',
                    'वास्तविक पहचानकर्ता की व्याख्या — यहाँ कोई कैमरा, अपलोड या पहचान तर्क नहीं।',
                  )}
                </p>
                <span className="mt-2 inline-block text-[10px] font-bold uppercase tracking-wide text-gold-dim dark:text-gold">
                  {t('Open note →', 'नोट खोलें →')}
                </span>
              </div>
            </Link>
            <Link
              to="/utilities/complaint"
              className="function-card group flex items-start gap-3"
            >
              <div className="rounded-lg bg-gold/15 p-2.5" aria-hidden>
                <MessageSquareWarning className="h-5 w-5 text-gold-dim dark:text-gold" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-navy group-hover:text-rbi-blue dark:text-cream">
                  {t('Complaint Lodging', 'शिकायत दर्ज करना')}
                </h3>
                <span lang="hi" className="bilingual-hi text-[11px]">
                  {isHi ? 'Complaint Lodging' : 'शिकायत दर्ज करना'}
                </span>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-muted dark:text-cream/65">
                  {t(
                    'Inert lodging note — no form fields; you cannot submit a complaint here.',
                    'निष्क्रिय शिकायत नोट — कोई फ़ॉर्म फ़ील्ड नहीं; यहाँ शिकायत जमा नहीं कर सकते।',
                  )}
                </p>
                <span className="mt-2 inline-block text-[10px] font-bold uppercase tracking-wide text-gold-dim dark:text-gold">
                  {t('Open note →', 'नोट खोलें →')}
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* Current Rates desk */}
        <section id="rates-desk" className="mt-6" aria-labelledby="rates-heading">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
            <h2
              id="rates-heading"
              className="font-serif text-xl font-semibold text-navy dark:text-cream"
            >
              {t('Current Rates', 'वर्तमान दरें')}
              <span lang="hi" className="bilingual-hi mt-0.5 text-sm font-medium">
                {isHi ? 'Current Rates' : 'वर्तमान दरें'}
              </span>
            </h2>
            <span className="text-[10px] font-medium uppercase tracking-wider text-gold-dim dark:text-gold">
              {ratesDeskAsOf} · {t('Illustrative · not for compliance', 'केवल उदाहरण · अनुपालन हेतु नहीं')}
            </span>
          </div>
          <div className="rates-desk-grid">
            {ratesPanels.map((panel) => (
              <section key={panel.id} className="portal-panel" aria-labelledby={`rates-${panel.id}`}>
                <div className="portal-panel-head flex flex-wrap items-center justify-between gap-2">
                  <h3 id={`rates-${panel.id}`} className="text-sm font-semibold">
                    {isHi ? panel.titleHi : panel.title}
                    <span lang={isHi ? 'en' : 'hi'} className="ml-2 text-[10px] font-normal opacity-80">
                      {isHi ? panel.title : panel.titleHi}
                    </span>
                  </h3>
                  <span className="text-[9px] font-semibold uppercase tracking-wide text-gold-soft">
                    Sample
                  </span>
                </div>
                <table className="rates-table">
                  <thead>
                    <tr>
                      <th scope="col">{t('Instrument', 'साधन')}</th>
                      <th scope="col">{t('Rate', 'दर')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {panel.rows.map((r) => (
                      <tr key={r.label}>
                        <td>
                          {r.label}
                          <span className="mt-0.5 block text-[10px] font-normal text-ink-muted dark:text-cream/55">
                            {t('Illustrative · not for compliance', 'उदाहरण · अनुपालन हेतु नहीं')}
                          </span>
                        </td>
                        <td className="text-navy dark:text-cream">{r.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="border-t border-navy/10 px-3 py-2 text-[10px] leading-snug text-ink-muted dark:border-white/10 dark:text-cream/65">
                  {t('Official source:', 'आधिकारिक स्रोत:')}{' '}
                  <a
                    href={panel.sourceHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-gold-dim underline-offset-2 hover:underline dark:text-gold"
                  >
                    {panel.sourceLabel}
                    <ExternalLink className="ml-0.5 inline h-3 w-3" aria-hidden />
                  </a>
                </p>
              </section>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-ink-muted dark:text-cream/60">{ratesDeskDisclaimer}</p>
        </section>

        {/* What's New living feed */}
        <section className="mt-6 portal-panel" aria-labelledby="whats-new-heading">
          <div className="portal-panel-head flex flex-wrap items-center justify-between gap-2">
            <h2 id="whats-new-heading">
              {t("What's New", 'क्या नया है')}
              <span lang="hi" className="ml-2 text-[11px] font-normal opacity-80">
                {isHi ? "What's New" : 'क्या नया है'}
              </span>
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/news"
                className="text-[10px] font-semibold uppercase tracking-wider text-gold-soft hover:underline"
              >
                {t('Prototype news', 'प्रोटोटाइप समाचार')}
              </Link>
              <a
                href={WHATS_NEW_OFFICIAL_INDEX}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-gold-soft hover:underline"
              >
                {t('View more on rbi.org.in', 'rbi.org.in पर और देखें')}
                <ExternalLink className="h-3 w-3" aria-hidden />
              </a>
            </div>
          </div>
          <ol className="whats-new-list max-h-[28rem] overflow-y-auto">
            {whatsNew.map((item) => (
              <li key={item.id}>
                <time dateTime={item.date} className="tabular-nums text-ink-muted dark:text-cream/60">
                  {formatDate(item.date)}
                </time>
                <div className="min-w-0">
                  <span className="mr-1.5 inline-block rounded border border-navy/15 px-1 py-px text-[9px] font-bold uppercase tracking-wide text-ink-muted dark:border-white/20 dark:text-cream/70">
                    {item.kind}
                  </span>
                  {item.officialUrl ? (
                    <a
                      href={item.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-navy hover:underline dark:text-cream"
                    >
                      {item.title}
                      <ExternalLink className="ml-1 inline h-3 w-3 opacity-70" aria-hidden />
                    </a>
                  ) : item.to ? (
                    <Link to={item.to} className="font-medium text-navy hover:underline dark:text-cream">
                      {item.title}
                    </Link>
                  ) : (
                    <span className="font-medium text-navy dark:text-cream">{item.title}</span>
                  )}
                </div>
                {item.pdfUrl ? (
                  <a
                    href={item.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-gold-dim hover:underline dark:text-gold"
                    title="Open official document"
                  >
                    <FileText className="h-3 w-3" aria-hidden />
                    PDF
                  </a>
                ) : item.officialUrl ? (
                  <a
                    href={item.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-semibold text-gold-dim hover:underline dark:text-gold"
                  >
                    Official
                  </a>
                ) : (
                  <span className="text-[10px] text-ink-muted/50">—</span>
                )}
              </li>
            ))}
          </ol>
        </section>

        {/* Function-wise directory */}
        <section className="mt-8" aria-labelledby="functions-heading">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-navy/15 pb-2 dark:border-white/15">
            <div>
              <h2
                id="functions-heading"
                className="font-serif text-xl font-semibold text-navy dark:text-cream"
              >
                {t('Function-wise directory', 'कार्य-वार निर्देशिका')}
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-ink-muted dark:text-cream/65">
                {t(
                  'Sixteen-plus function landings with short original blurbs and links into MDs, circulars, reports and official rbi.org.in sections.',
                  'सोलह-से-अधिक कार्य पृष्ठ — मास्टर निर्देश, परिपत्र, रिपोर्ट और आधिकारिक अनुभागों के लिंक के साथ।',
                )}
              </p>
            </div>
            <Link
              to="/functions"
              className="text-xs font-semibold text-gold-dim hover:underline dark:text-gold"
            >
              {t('All functions', 'सभी कार्य')} <ArrowRight className="inline h-3 w-3" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {rbiFunctions.map((f) => (
              <Link key={f.slug} to={`/functions/${f.slug}`} className="function-card group">
                <div>
                  <h3 className="text-sm font-semibold text-navy group-hover:text-rbi-blue dark:text-cream">
                    {isHi ? f.titleHi : f.title}
                  </h3>
                  <span lang="hi" className="bilingual-hi text-[11px]">
                    {isHi ? f.title : f.titleHi}
                  </span>
                  <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-ink-muted dark:text-cream/65">
                    {f.blurb}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <Link
              to="/citizens"
              className="inline-flex items-center gap-1.5 border border-navy/15 bg-white px-3 py-2 text-xs font-semibold text-navy hover:border-gold/40 dark:border-white/15 dark:bg-navy-light dark:text-cream"
            >
              {t("Citizens' Corner", 'नागरिक कॉर्नर')} <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </section>

        {/* Master Directions quick table */}
        <section className="mt-10" aria-labelledby="md-home-heading">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
            <h2
              id="md-home-heading"
              className="font-serif text-xl font-semibold text-navy dark:text-cream"
            >
              Masters Directions
              <span lang="hi" className="bilingual-hi mt-0.5 text-sm font-medium">
                मास्टर निर्देश
              </span>
            </h2>
            <Link
              to="/masters-directions"
              className="text-xs font-semibold text-gold-dim hover:underline dark:text-gold"
            >
              {t('Full catalogue', 'पूर्ण सूची')} →
            </Link>
          </div>
          <p className="mb-3 text-xs text-ink-muted dark:text-cream/60">
            Date · Title · Open PDF (official outbound) · Type — educational summaries stay on this
            site.
          </p>
          <DocumentTable rows={mdRows} dateHeader="Updated" />
        </section>

        {/* Circulars quick table */}
        <section className="mt-8" aria-labelledby="circ-home-heading">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
            <h2
              id="circ-home-heading"
              className="font-serif text-xl font-semibold text-navy dark:text-cream"
            >
              Circulars / Notifications
              <span lang="hi" className="bilingual-hi mt-0.5 text-sm font-medium">
                परिपत्र
              </span>
            </h2>
            <Link
              to="/circulars"
              className="text-xs font-semibold text-gold-dim hover:underline dark:text-gold"
            >
              All circulars →
            </Link>
          </div>
          <DocumentTable rows={circRows} dateHeader="Date" />
        </section>

        {/* Map + personas — kept, denser */}
        <section className="mt-10" aria-labelledby="home-map">
          <h2 id="home-map" className="font-serif text-xl font-semibold text-navy dark:text-cream">
            Explore the information map
            <span lang="hi" className="bilingual-hi mt-0.5 text-sm font-medium">
              सूचना मानचित्र
            </span>
          </h2>
          <p className="mt-1 mb-4 max-w-2xl text-sm text-ink-muted dark:text-cream/65">
            Clickable architecture of this prototype — every node is a real route.
          </p>
          <InteractiveSiteMap teaser />
        </section>

        <section className="mt-10" aria-labelledby="personas-heading">
          <h2
            id="personas-heading"
            className="font-serif text-xl font-semibold text-navy dark:text-cream"
          >
            Start with a persona
            <span lang="hi" className="bilingual-hi mt-0.5 text-sm font-medium">
              व्यक्तित्व से शुरू करें
            </span>
          </h2>
          <p className="mt-1 mb-5 max-w-2xl text-sm text-ink-muted dark:text-cream/65">
            Prescribed paths for banker, student or journalist demos.
          </p>
          <PersonaCards />
        </section>

        <section className="mt-10 portal-panel overflow-hidden">
          <div className="flex flex-col gap-4 bg-navy px-5 py-6 text-cream md:flex-row md:items-center md:justify-between md:px-7">
            <div className="max-w-xl">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gold-soft">
                Organisation schematic
              </p>
              <h2 className="font-serif mt-1 text-lg font-semibold md:text-xl">
                Central Board → departments (illustrative)
              </h2>
              <p className="mt-2 text-sm text-cream/75">
                Training sketch of oversight, MPC and functional departments — labelled illustrative.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                to="/sitemap"
                className="inline-flex items-center gap-1.5 bg-gold px-4 py-2 text-xs font-semibold text-navy hover:bg-gold-soft"
              >
                Sitemap map <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 border border-cream/30 px-4 py-2 text-xs font-semibold text-cream hover:bg-white/10"
              >
                About &amp; mandate
              </Link>
            </div>
          </div>
        </section>

        <div className="mt-8">
          <DisclaimerBanner />
        </div>
      </div>
    </div>
  )
}
