import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Reveal } from '../components/Reveal'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { ExploreNext, SectionHubCards } from '../components/ExploreNext'
import { ExploreMapTeaser } from '../components/InteractiveSiteMap'
import { IllustrativeLabel } from '../components/IllustrativeLabel'
import {
  ArtMonetaryPolicy,
  ArtRegulation,
  ArtCurrency,
  ArtStability,
} from '../components/illustrations/InstitutionalArt'
import { rbiFunctions } from '../data/functions'
import { useLang } from '../hooks/useLang'

const timeline = [
  {
    era: 'Foundation',
    eraHi: 'स्थापना',
    year: '1934–35',
    text: 'Reserve Bank of India Act, 1934 establishes the Bank; operations begin in 1935 as India’s central bank, initially with a private shareholding structure.',
    textHi:
      'आरबीआई अधिनियम, 1934 से बैंक की स्थापना; 1935 में भारत के केंद्रीय बैंक के रूप में संचालन शुरू — प्रारंभ में निजी शेयरधारिता के साथ।',
  },
  {
    era: 'Public ownership',
    eraHi: 'सार्वजनिक स्वामित्व',
    year: '1949',
    text: 'Nationalisation — RBI becomes fully owned by the Government of India, aligning governance with a public-interest mandate after Independence.',
    textHi:
      'राष्ट्रीयकरण — आरबीआई भारत सरकार के पूर्ण स्वामित्व में आता है, स्वतंत्रता के बाद सार्वजनिक हित के अधिदेश से संरेखित।',
  },
  {
    era: 'Developmental decades',
    eraHi: 'विकास दशक',
    year: '1950s–80s',
    text: 'Institutional deepening: note-issue logistics, bank regulation under evolving banking law, and developmental finance themes shape the mid-century central-bank toolkit.',
    textHi:
      'संस्थागत गहराई: नोट निर्गम, विकसित बैंकिंग कानून के अंतर्गत विनियमन, और विकासात्मक वित्त विषय मध्य-शताब्दी के केंद्रीय-बैंक उपकरण बनाते हैं।',
  },
  {
    era: 'Liberalisation',
    eraHi: 'उदारीकरण',
    year: '1991+',
    text: 'Liberalisation era: stronger markets orientation, gradual financial-sector reforms, and a clearer separation of monetary policy from fiscal financing habits.',
    textHi:
      'उदारीकरण युग: बाज़ार उन्मुखता, क्रमिक वित्तीय सुधार, और मौद्रिक नीति को राजकोषीय वित्तपोषण आदतों से स्पष्ट रूप से अलग करना।',
  },
  {
    era: 'Inflation targeting',
    eraHi: 'मुद्रास्फीति लक्ष्यीकरण',
    year: '2016',
    text: 'Flexible inflation targeting formalised; statutory Monetary Policy Committee created to vote on the policy repo rate within an agreed inflation band.',
    textHi:
      'लचीला मुद्रास्फीति लक्ष्यीकरण औपचारिक; सांविधिक मौद्रिक नीति समिति नीति रेपो दर पर सहमत मुद्रास्फीति बैंड के भीतर मतदान करती है।',
  },
  {
    era: 'Digital payments era',
    eraHi: 'डिजिटल भुगतान युग',
    year: 'Today',
    text: 'Continues classic central-bank roles — currency, regulation, stability — alongside oversight of a digital-first payments landscape and fintech innovation themes.',
    textHi:
      'क्लासिक केंद्रीय-बैंक भूमिकाएँ जारी — मुद्रा, विनियमन, स्थिरता — साथ ही डिजिटल-प्रथम भुगतान परिदृश्य और फिनटेक नवाचार विषयों का पर्यवेक्षण।',
  },
]

const orgTree: {
  name: string
  nameHi: string
  blurb: string
  blurbHi: string
  children?: { name: string; nameHi: string; blurb: string; blurbHi: string }[]
}[] = [
  {
    name: 'Central Board',
    nameHi: 'केंद्रीय बोर्ड',
    blurb:
      'General superintendence and direction of the Bank’s affairs under the RBI Act framework (high-level educational framing).',
    blurbHi:
      'आरबीआई अधिनियम ढांचे के अंतर्गत बैंक के मामलों का सामान्य अधीक्षण और निर्देशन (उच्च-स्तरीय शैक्षिक रूपरेखा)।',
    children: [
      {
        name: 'Governor & Deputy Governors',
        nameHi: 'गवर्नर और उप गवर्नर',
        blurb: 'Executive leadership responsible for day-to-day administration.',
        blurbHi: 'दिन-प्रतिदिन प्रशासन के लिए जिम्मेदार कार्यकारी नेतृत्व।',
      },
      {
        name: 'Monetary Policy Committee',
        nameHi: 'मौद्रिक नीति समिति',
        blurb:
          'Statutory body that votes on the policy repo rate under the inflation-targeting mandate.',
        blurbHi:
          'मुद्रास्फीति-लक्ष्यीकरण अधिदेश के अंतर्गत नीति रेपो दर पर मतदान करने वाली सांविधिक संस्था।',
      },
    ],
  },
  {
    name: 'Markets & Monetary Policy',
    nameHi: 'बाज़ार और मौद्रिक नीति',
    blurb: 'Open market operations, liquidity management and policy implementation.',
    blurbHi: 'खुले बाज़ार संचालन, तरलता प्रबंधन और नीति कार्यान्वयन।',
  },
  {
    name: 'Banking / NBFC Supervision',
    nameHi: 'बैंकिंग / एनबीएफसी पर्यवेक्षण',
    blurb: 'Prudential supervision of deposit-takers and non-banks.',
    blurbHi: 'जमा स्वीकारकर्ताओं और गैर-बैंकों का विवेकपूर्ण पर्यवेक्षण।',
  },
  {
    name: 'Payment & Settlement Systems',
    nameHi: 'भुगतान और निपटान प्रणाली',
    blurb: 'Authorisation and oversight of payment rails.',
    blurbHi: 'भुगतान रेलों का प्राधिकरण और पर्यवेक्षण।',
  },
  {
    name: 'Currency & Financial Inclusion',
    nameHi: 'मुद्रा और वित्तीय समावेशन',
    blurb: 'Note-issue logistics and inclusion programmes.',
    blurbHi: 'नोट निर्गम रसद और समावेशन कार्यक्रम।',
  },
  {
    name: 'Foreign Exchange',
    nameHi: 'विदेशी मुद्रा',
    blurb: 'FEMA administration support and reserves-management functions.',
    blurbHi: 'फेमा प्रशासन समर्थन और आरक्षित प्रबंधन कार्य।',
  },
  {
    name: 'Financial Stability & Research',
    nameHi: 'वित्तीय स्थिरता और अनुसंधान',
    blurb: 'Systemic risk monitoring, statistics and research.',
    blurbHi: 'प्रणालीगत जोखिम निगरानी, सांख्यिकी और अनुसंधान।',
  },
]

const tocItems = [
  { id: 'mandate', en: 'Mandate', hi: 'अधिदेश' },
  { id: 'history', en: 'History', hi: 'इतिहास' },
  { id: 'organisation', en: 'Organisation', hi: 'संगठन' },
  { id: 'functions-overview', en: 'Functions overview', hi: 'कार्यों का अवलोकन' },
] as const

const schematicDepts = [
  { en: 'Markets', hi: 'बाज़ार' },
  { en: 'Supervision', hi: 'पर्यवेक्षण' },
  { en: 'Payments', hi: 'भुगतान' },
  { en: 'Currency', hi: 'मुद्रा' },
  { en: 'Forex', hi: 'विदेशी मुद्रा' },
  { en: 'Stability', hi: 'स्थिरता' },
] as const

export function About() {
  const { t, isHi } = useLang()
  const [active, setActive] = useState(0)
  const node = orgTree[active]

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <PageHeader
        eyebrow={t('About Us', 'हमारे बारे में')}
        title={t(
          'Statutory mandate, history & organisation',
          'सांविधिक अधिदेश, इतिहास और संगठन',
        )}
        description={t(
          'High-level educational framing of why RBI exists under the Reserve Bank of India Act, 1934, how the institution evolved, and how major functions connect. Original copy for this prototype — not official RBI text.',
          'आरबीआई अधिनियम, 1934 के अंतर्गत आरबीआई क्यों अस्तित्व में है, संस्था कैसे विकसित हुई, और प्रमुख कार्य कैसे जुड़ते हैं — उच्च-स्तरीय शैक्षिक रूपरेखा। इस प्रोटोटाइप के लिए मूल पाठ — आधिकारिक आरबीआई पाठ नहीं।',
        )}
      />

      <div className="mb-6 border border-amber-500/40 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:border-amber-400/30 dark:bg-amber-950/30 dark:text-amber-100">
        <strong>{t('Unofficial / illustrative', 'अनौपचारिक / उदाहरणात्मक')}:</strong>{' '}
        {t(
          'This About page paraphrases institutional themes for UX and learning. It is not affiliated with RBI and is not a legal organisation chart or official history.',
          'यह परिचय पृष्ठ UX और शिक्षा के लिए संस्थागत विषयों का सारांश है। आरबीआई से संबद्ध नहीं — न कानूनी संगठन चार्ट, न आधिकारिक इतिहास।',
        )}
      </div>

      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-hidden>
        {[
          { Art: ArtMonetaryPolicy, label: t('Monetary authority', 'मौद्रिक प्राधिकरण') },
          { Art: ArtRegulation, label: t('Regulation', 'विनियमन') },
          { Art: ArtCurrency, label: t('Currency issue', 'मुद्रा निर्गम') },
          { Art: ArtStability, label: t('Financial stability', 'वित्तीय स्थिरता') },
        ].map(({ Art, label }) => (
          <div key={label} className="portal-panel flex flex-col items-center gap-2 p-3 text-center">
            <Art className="art h-14 w-14 text-rbi-blue dark:text-gold-soft" />
            <span className="text-[11px] font-medium text-ink-muted dark:text-cream/70">{label}</span>
          </div>
        ))}
      </div>

      <SectionHubCards
        heading={t('Browse this section', 'इस अनुभाग को देखें')}
        links={[
          {
            label: t('Monetary policy', 'मौद्रिक नीति'),
            to: '/monetary-policy',
            note: t('MPC, repo rate & inflation band', 'एमपीसी, रेपो दर और मुद्रास्फीति बैंड'),
          },
          {
            label: t('Functions directory', 'कार्य निर्देशिका'),
            to: '/functions',
            note: t('Full function-wise landings', 'पूर्ण कार्य-वार लैंडिंग'),
          },
          {
            label: t('Masters Directions', 'मास्टर निर्देश'),
            to: '/masters-directions',
            note: t('Educational regulatory catalogue', 'शैक्षिक विनियामक सूची'),
          },
          {
            label: t('Circulars', 'परिपत्र'),
            to: '/circulars',
            note: t('Sample notifications', 'नमूना अधिसूचनाएँ'),
          },
          {
            label: t('Learn & glossary', 'सीखें और शब्दावली'),
            to: '/learn',
            note: t('Primers and definitions', 'प्राइमर और परिभाषाएँ'),
          },
          {
            label: t('About this prototype', 'इस प्रोटोटाइप के बारे में'),
            to: '/about/prototype',
            note: t('Trust & unofficial framing', 'विश्वास और अनौपचारिक रूपरेखा'),
          },
        ]}
      />

      <div className="mb-10">
        <ExploreMapTeaser />
      </div>

      <div className="grid gap-10 lg:grid-cols-[200px_1fr]">
        <aside className="prose-toc lg:sticky lg:top-28 lg:self-start" aria-label={t('On this page', 'इस पृष्ठ पर')}>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-gold-dim dark:text-gold">
            {t('On this page', 'इस पृष्ठ पर')}
          </p>
          <ul className="space-y-2 text-sm">
            {tocItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-ink-muted hover:text-gold-dim dark:text-cream/60 dark:hover:text-gold"
                >
                  {isHi ? item.hi : item.en}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <div>
          <Reveal>
            <section id="mandate" className="content-well mb-12 scroll-mt-32 p-6 md:p-8">
              <h2 className="font-serif text-lg font-semibold text-navy dark:text-cream">
                {t('Statutory mandate (high-level)', 'सांविधिक अधिदेश (उच्च-स्तरीय)')}
              </h2>
              <p className="prose-read mt-3 text-[15px] leading-relaxed text-ink-muted dark:text-cream/70">
                {t(
                  'The Reserve Bank of India was constituted under the Reserve Bank of India Act, 1934. In educational terms, the Act provides the legal foundation for a central bank tasked with regulating the issue of banknotes, keeping reserves to secure monetary stability, and operating the credit and currency system to the country’s advantage. Over time, Parliament and the Government have layered additional statutes and policy frameworks (including flexible inflation targeting and payment-system law) onto that foundation.',
                  'भारतीय रिज़र्व बैंक आरबीआई अधिनियम, 1934 के अंतर्गत गठित हुआ। शैक्षिक दृष्टि से, अधिनियम एक केंद्रीय बैंक की कानूनी नींव देता है जिसका कार्य बैंकनोट निर्गम का विनियमन, मौद्रिक स्थिरता के लिए आरक्षित रखना, और देश के हित में ऋण व मुद्रा प्रणाली का संचालन है। समय के साथ संसद और सरकार ने अतिरिक्त क़ानून और नीति ढाँचे (लचीला मुद्रास्फीति लक्ष्यीकरण और भुगतान-प्रणाली कानून सहित) जोड़े हैं।',
                )}
              </p>
              <p className="prose-read mt-3 text-[15px] leading-relaxed text-ink-muted dark:text-cream/70">
                {t(
                  'This page paraphrases those themes for officers and learners reviewing communication design. It is not a legal commentary and omits procedural detail that belongs in primary sources.',
                  'यह पृष्ठ संचार डिज़ाइन की समीक्षा करने वाले अधिकारियों और शिक्षार्थियों के लिए इन विषयों का सारांश है। यह कानूनी टीका नहीं है और प्राथमिक स्रोतों में रहने वाला प्रक्रियात्मक विवरण छोड़ता है।',
                )}
              </p>
            </section>
          </Reveal>

          <section id="history" className="mb-14 scroll-mt-32">
            <Reveal>
              <h2 className="mb-2 text-xl font-bold text-navy dark:text-cream md:text-2xl">
                {t('History — illustrative timeline', 'इतिहास — उदाहरणात्मक समयरेखा')}
              </h2>
              <p className="mb-6 text-sm text-ink-muted dark:text-cream/60">
                {t(
                  'Original educational eras for this prototype — not scraped RBI text and not an official chronology.',
                  'इस प्रोटोटाइप के लिए मूल शैक्षिक युग — स्क्रैप किया आरबीआई पाठ नहीं और आधिकारिक कालक्रम नहीं।',
                )}
              </p>
            </Reveal>
            <div className="relative space-y-0 border-l-2 border-gold/40 pl-6">
              {timeline.map((item, i) => (
                <Reveal key={item.year} delay={i * 0.04}>
                  <div className="relative pb-8 last:pb-0">
                    <span className="absolute -left-[1.9rem] top-1 h-3.5 w-3.5 rounded-full border-2 border-gold bg-cream dark:bg-navy" />
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gold-dim dark:text-gold">
                      {isHi ? item.eraHi : item.era}
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-navy dark:text-cream">{item.year}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted dark:text-cream/70">
                      {isHi ? item.textHi : item.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="organisation" className="mb-14 scroll-mt-32">
            <Reveal>
              <h2 className="mb-2 text-xl font-bold text-navy dark:text-cream md:text-2xl">
                {t('Organisation', 'संगठन')}
              </h2>
              <p className="mb-2 text-sm text-ink-muted dark:text-cream/60">
                {t(
                  'Central Board → executive leadership & MPC → functional departments. Select a node to inspect.',
                  'केंद्रीय बोर्ड → कार्यकारी नेतृत्व और एमपीसी → कार्यात्मक विभाग। निरीक्षण के लिए एक नोड चुनें।',
                )}
              </p>
              <IllustrativeLabel className="mb-4" />
            </Reveal>

            <div className="mb-4 border border-amber-500/35 bg-amber-50/80 px-3 py-2.5 text-xs text-amber-950 dark:border-amber-400/25 dark:bg-amber-950/25 dark:text-amber-100">
              {t(
                'Unofficial schematic — labelled illustrative only. Not a legal organisation chart and not affiliated with RBI.',
                'अनौपचारिक योजना — केवल उदाहरणात्मक। कानूनी संगठन चार्ट नहीं और आरबीआई से संबद्ध नहीं।',
              )}
            </div>

            <div className="mb-6 overflow-x-auto rounded-xl border border-navy/10 bg-white/80 p-4 dark:border-white/10 dark:bg-navy-light/40 md:p-6">
              <div className="flex min-w-[640px] flex-col items-center gap-3 text-center text-xs md:min-w-0">
                <div className="rounded-md border border-gold/50 bg-gold/15 px-4 py-2.5 font-semibold text-navy dark:text-cream">
                  {t('Central Board', 'केंद्रीय बोर्ड')}
                </div>
                <div className="h-4 w-px bg-gold/50" aria-hidden />
                <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-md border border-navy/15 px-3 py-2.5 dark:border-white/15">
                    {t('Governor & Deputy Governors', 'गवर्नर और उप गवर्नर')}
                  </div>
                  <div className="rounded-md border border-navy/15 px-3 py-2.5 dark:border-white/15">
                    {t('Monetary Policy Committee', 'मौद्रिक नीति समिति')}
                  </div>
                </div>
                <div className="h-4 w-px bg-gold/50" aria-hidden />
                <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
                  {schematicDepts.map((d) => (
                    <div
                      key={d.en}
                      className="rounded-md border border-dashed border-navy/20 px-2 py-2.5 text-[11px] dark:border-white/20"
                    >
                      {isHi ? d.hi : d.en}
                    </div>
                  ))}
                </div>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-ink-muted dark:text-cream/45">
                  {t('Illustrative schematic · not official', 'उदाहरणात्मक योजना · आधिकारिक नहीं')}
                </p>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
              <div className="space-y-1.5" role="listbox" aria-label={t('Organisation tree', 'संगठन वृक्ष')}>
                {orgTree.map((item, i) => (
                  <button
                    key={item.name}
                    type="button"
                    role="option"
                    aria-selected={active === i}
                    onClick={() => setActive(i)}
                    className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left transition ${
                      active === i
                        ? 'border-gold bg-gold/15 text-navy dark:text-cream'
                        : 'border-navy/10 bg-white/70 hover:border-gold/40 dark:border-white/10 dark:bg-navy-light/50'
                    }`}
                  >
                    <span className="text-sm font-semibold">{isHi ? item.nameHi : item.name}</span>
                    <ChevronRight className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
                  </button>
                ))}
              </div>
              <div className="glass-card rounded-xl p-5 md:p-6">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gold-dim dark:text-gold">
                  {t('Selected · illustrative', 'चयनित · उदाहरणात्मक')}
                </p>
                <h3 className="mt-2 font-serif text-lg font-semibold text-navy dark:text-cream">
                  {isHi ? node.nameHi : node.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted dark:text-cream/70">
                  {isHi ? node.blurbHi : node.blurb}
                </p>
                {node.children && (
                  <ul className="mt-5 space-y-2">
                    {node.children.map((c) => (
                      <li
                        key={c.name}
                        className="rounded-lg border border-navy/10 bg-cream/50 px-3 py-2.5 dark:border-white/10 dark:bg-navy/40"
                      >
                        <p className="text-sm font-medium text-navy dark:text-cream">
                          {isHi ? c.nameHi : c.name}
                        </p>
                        <p className="mt-0.5 text-sm text-ink-muted dark:text-cream/60">
                          {isHi ? c.blurbHi : c.blurb}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>

          <section id="functions-overview" className="mb-10 scroll-mt-32">
            <Reveal>
              <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-navy dark:text-cream md:text-2xl">
                    {t('Functions overview', 'कार्यों का अवलोकन')}
                  </h2>
                  <p className="mt-1 text-sm text-ink-muted dark:text-cream/60">
                    {t(
                      'Cards drawn from the live function catalogue — open a landing or browse the full directory.',
                      'लाइव कार्य सूची से कार्ड — लैंडिंग खोलें या पूर्ण निर्देशिका देखें।',
                    )}
                  </p>
                </div>
                <Link
                  to="/functions"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-dim hover:underline dark:text-gold"
                >
                  {t('All functions', 'सभी कार्य')}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {rbiFunctions.map((f, i) => (
                <Reveal key={f.slug} delay={Math.min(i * 0.02, 0.2)}>
                  <Link to={`/functions/${f.slug}`} className="function-card group block h-full">
                    <h3 className="text-sm font-semibold text-navy group-hover:text-rbi-blue dark:text-cream">
                      {isHi ? f.titleHi : f.title}
                    </h3>
                    {!isHi && (
                      <span lang="hi" className="bilingual-hi text-[11px]">
                        {f.titleHi}
                      </span>
                    )}
                    {isHi && (
                      <span className="mt-0.5 block text-[11px] text-ink-muted dark:text-cream/55">
                        {f.title}
                      </span>
                    )}
                    <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-ink-muted dark:text-cream/65">
                      {f.blurb}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-gold-dim dark:text-gold">
                      {t('Open function', 'कार्य खोलें')} <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        </div>
      </div>

      <ExploreNext pathname="/about" />
      <div className="mt-10">
        <DisclaimerBanner />
      </div>
    </div>
  )
}
