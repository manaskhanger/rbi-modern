import { useState } from 'react'
import {
  Landmark,
  Scale,
  Banknote,
  Globe2,
  Shield,
  Smartphone,
  Users,
  Building2,
  ChevronRight,
} from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Reveal } from '../components/Reveal'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { ExploreNext, SectionHubCards } from '../components/ExploreNext'

const timeline = [
  { year: '1934–35', text: 'Reserve Bank of India Act, 1934 establishes the Bank; operations begin in 1935 as India’s central bank.' },
  { year: '1949', text: 'Nationalisation — RBI becomes fully owned by the Government of India.' },
  { year: '1991+', text: 'Liberalisation era: stronger markets orientation and gradual financial-sector reforms.' },
  { year: '2016', text: 'Flexible inflation targeting formalised; statutory Monetary Policy Committee created.' },
  { year: 'Today', text: 'Continues classic central-bank roles alongside oversight of a digital-first payments landscape.' },
]

const duties = [
  {
    icon: Scale,
    title: 'Monetary authority',
    text: 'Formulate and implement monetary policy to maintain price stability while supporting growth.',
  },
  {
    icon: Landmark,
    title: 'Banker & debt manager',
    text: 'Banker to the Government and to banks; manages public debt operations and money-market tools.',
  },
  {
    icon: Banknote,
    title: 'Currency issuer',
    text: 'Issues banknotes, manages distribution, and works to keep currency clean and trusted.',
  },
  {
    icon: Building2,
    title: 'Regulator & supervisor',
    text: 'Regulates banks, NBFCs and other entities; inspects, sets prudential norms, and remediates weaknesses.',
  },
  {
    icon: Smartphone,
    title: 'Payment system overseer',
    text: 'Authorises payment systems and sets rules so clearing and settlement stay safe and efficient.',
  },
  {
    icon: Globe2,
    title: 'Forex & reserves',
    text: 'Manages foreign exchange reserves and regulates forex transactions under FEMA.',
  },
  {
    icon: Shield,
    title: 'Financial stability',
    text: 'Monitors systemic risk and coordinates macroprudential responses when stresses build.',
  },
  {
    icon: Users,
    title: 'Development & inclusion',
    text: 'Promotes financial inclusion, literacy and deep, resilient financial markets.',
  },
]

const orgTree: {
  name: string
  blurb: string
  children?: { name: string; blurb: string }[]
}[] = [
  {
    name: 'Central Board',
    blurb: 'General superintendence and direction of the Bank’s affairs under the RBI Act framework (high-level educational framing).',
    children: [
      { name: 'Governor & Deputy Governors', blurb: 'Executive leadership responsible for day-to-day administration.' },
      { name: 'Monetary Policy Committee', blurb: 'Statutory body that votes on the policy repo rate under the inflation-targeting mandate.' },
    ],
  },
  {
    name: 'Markets & Monetary Policy',
    blurb: 'Open market operations, liquidity management and policy implementation.',
  },
  {
    name: 'Banking / NBFC Supervision',
    blurb: 'Prudential supervision of deposit-takers and non-banks.',
  },
  {
    name: 'Payment & Settlement Systems',
    blurb: 'Authorisation and oversight of payment rails.',
  },
  {
    name: 'Currency & Financial Inclusion',
    blurb: 'Note-issue logistics and inclusion programmes.',
  },
  {
    name: 'Foreign Exchange',
    blurb: 'FEMA administration support and reserves-management functions.',
  },
  {
    name: 'Financial Stability & Research',
    blurb: 'Systemic risk monitoring, statistics and research.',
  },
]

export function About() {
  const [active, setActive] = useState(0)
  const node = orgTree[active]

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <PageHeader
        eyebrow="About"
        title="Statutory mandate, history & organisation"
        description="High-level educational framing of why RBI exists under the Reserve Bank of India Act, 1934, how the institution evolved, and how major functions connect. Original copy for this prototype — not official RBI text."
      />

      <SectionHubCards
        heading="Browse this section"
        links={[
          { label: 'Monetary policy', to: '/monetary-policy', note: 'MPC, repo rate & inflation band' },
          { label: 'Masters Directions', to: '/masters-directions', note: 'Educational regulatory catalogue' },
          { label: 'Circulars', to: '/circulars', note: 'Sample notifications' },
          { label: 'Learn & glossary', to: '/learn', note: 'Primers and definitions' },
          { label: 'Offices', to: '/offices', note: 'Illustrative regional directory' },
          { label: 'About this prototype', to: '/about/prototype', note: 'Trust & unofficial framing' },
        ]}
      />

      <Reveal>
        <div className="glass-card mb-12 rounded-xl p-6 md:p-8">
          <h2 className="text-lg font-bold text-navy dark:text-cream">
            Statutory mandate (high-level)
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted dark:text-cream/70 md:text-base">
            The Reserve Bank of India was constituted under the <strong>Reserve Bank of India Act,
            1934</strong>. In educational terms, the Act provides the legal foundation for a central
            bank tasked with regulating the issue of banknotes, keeping reserves to secure monetary
            stability, and operating the credit and currency system to the country’s advantage. Over
            time, Parliament and the Government have layered additional statutes and policy frameworks
            (including flexible inflation targeting and payment-system law) onto that foundation.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted dark:text-cream/70 md:text-base">
            This page paraphrases those themes for officers and learners reviewing communication
            design. It is <em>not</em> a legal commentary and omits procedural detail that belongs in
            primary sources.
          </p>
        </div>
      </Reveal>

      <section className="mb-14">
        <Reveal>
          <h2 className="mb-6 text-xl font-bold text-navy dark:text-cream md:text-2xl">
            History timeline
          </h2>
        </Reveal>
        <div className="relative space-y-0 border-l-2 border-gold/40 pl-6">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.04}>
              <div className="relative pb-8">
                <span className="absolute -left-[1.9rem] top-1 h-3.5 w-3.5 rounded-full border-2 border-gold bg-cream dark:bg-navy" />
                <p className="text-sm font-bold text-gold-dim dark:text-gold">{t.year}</p>
                <p className="mt-1 text-sm text-ink-muted dark:text-cream/70">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <Reveal>
          <h2 className="mb-2 text-xl font-bold text-navy dark:text-cream md:text-2xl">
            Organisation schematic
          </h2>
          <p className="mb-2 text-sm text-ink-muted dark:text-cream/60">
            Central Board → executive leadership &amp; MPC → functional departments. Tap a node to
            inspect. <strong>Labelled illustrative</strong> — not a legal organisation chart.
          </p>
        </Reveal>

        <div className="mb-6 overflow-x-auto rounded-xl border border-navy/10 bg-white/80 p-4 dark:border-white/10 dark:bg-navy-light/40">
          <div className="flex min-w-[640px] flex-col items-center gap-3 text-center text-xs">
            <div className="rounded-md border border-gold/50 bg-gold/15 px-4 py-2 font-semibold text-navy dark:text-cream">
              Central Board
            </div>
            <div className="h-4 w-px bg-gold/50" />
            <div className="grid w-full grid-cols-2 gap-3">
              <div className="rounded-md border border-navy/15 px-3 py-2 dark:border-white/15">
                Governor &amp; Deputy Governors
              </div>
              <div className="rounded-md border border-navy/15 px-3 py-2 dark:border-white/15">
                Monetary Policy Committee
              </div>
            </div>
            <div className="h-4 w-px bg-gold/50" />
            <div className="grid w-full grid-cols-3 gap-2 md:grid-cols-6">
              {['Markets', 'Supervision', 'Payments', 'Currency', 'Forex', 'Stability'].map((d) => (
                <div
                  key={d}
                  className="rounded-md border border-dashed border-navy/20 px-2 py-2 text-[11px] dark:border-white/20"
                >
                  {d}
                </div>
              ))}
            </div>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-ink-muted dark:text-cream/45">
              Illustrative schematic · not official
            </p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-1.5">
            {orgTree.map((item, i) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setActive(i)}
                className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left transition ${
                  active === i
                    ? 'border-gold bg-gold/15 text-navy dark:text-cream'
                    : 'border-navy/10 bg-white/70 hover:border-gold/40 dark:border-white/10 dark:bg-navy-light/50'
                }`}
              >
                <span className="text-sm font-semibold">{item.name}</span>
                <ChevronRight className="h-4 w-4 opacity-50" aria-hidden />
              </button>
            ))}
          </div>
          <div className="glass-card rounded-xl p-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gold-dim dark:text-gold">
              Selected · illustrative
            </p>
            <h3 className="mt-2 text-lg font-bold text-navy dark:text-cream">{node.name}</h3>
            <p className="mt-2 text-sm text-ink-muted dark:text-cream/70">{node.blurb}</p>
            {node.children && (
              <ul className="mt-5 space-y-2">
                {node.children.map((c) => (
                  <li
                    key={c.name}
                    className="rounded-lg border border-navy/10 bg-cream/50 px-3 py-2.5 dark:border-white/10 dark:bg-navy/40"
                  >
                    <p className="text-sm font-medium text-navy dark:text-cream">{c.name}</p>
                    <p className="text-sm text-ink-muted dark:text-cream/60">{c.blurb}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <section className="mb-10">
        <Reveal>
          <h2 className="mb-6 text-xl font-bold text-navy dark:text-cream md:text-2xl">
            Functional responsibilities
          </h2>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {duties.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.03}>
              <div className="h-full rounded-xl border border-navy/8 bg-white/80 p-4 dark:border-white/10 dark:bg-navy-light/40">
                <d.icon className="h-6 w-6 text-gold-dim dark:text-gold" aria-hidden />
                <h3 className="mt-2 text-sm font-semibold text-navy dark:text-cream">{d.title}</h3>
                <p className="mt-1.5 text-sm text-ink-muted dark:text-cream/65">{d.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <ExploreNext pathname="/about" />
      <DisclaimerBanner />
    </div>
  )
}
