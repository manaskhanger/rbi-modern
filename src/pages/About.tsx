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

const timeline = [
  { year: '1935', text: 'RBI begins operations as India’s central bank (founded by statute in 1934).' },
  { year: '1949', text: 'Nationalisation — RBI becomes fully owned by the Government of India.' },
  { year: '1991+', text: 'Liberalisation era: stronger markets focus, gradual financial sector reforms.' },
  { year: '2016', text: 'Flexible inflation targeting formalised; Monetary Policy Committee created.' },
  { year: 'Today', text: 'Oversees a digital-first payments landscape alongside classic central bank roles.' },
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
    text: 'Banker to the Government and to banks; manages public debt and the money markets toolkit.',
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
    blurb: 'Oversight of general superintendence and direction of RBI affairs.',
    children: [
      { name: 'Governor & Deputy Governors', blurb: 'Executive leadership of the Bank.' },
      { name: 'Monetary Policy Committee', blurb: 'Votes on the policy repo rate (statutory).' },
    ],
  },
  {
    name: 'Markets & Monetary Policy',
    blurb: 'Open market operations, liquidity and policy implementation.',
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
    blurb: 'Note issue logistics and inclusion programmes.',
  },
  {
    name: 'Foreign Exchange',
    blurb: 'FEMA administration and reserves management support.',
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
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <PageHeader
        eyebrow="About"
        title="Purpose, history & organisation"
        description="A learner-friendly tour of why RBI exists, how it grew, and how major functions connect — written in original language for this demo."
      />

      <Reveal>
        <div className="glass-card mb-14 rounded-3xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-navy dark:text-cream">Purpose in one paragraph</h2>
          <p className="mt-3 leading-relaxed text-ink-muted dark:text-cream/70">
            RBI is India’s central bank. Its core public mission is to secure monetary stability,
            regulate and supervise the financial system, issue currency, facilitate safe payments,
            and help the economy absorb shocks — including through foreign exchange reserves. It
            balances price stability with growth, and depositor protection with credit intermediation.
          </p>
        </div>
      </Reveal>

      <section className="mb-16">
        <Reveal>
          <h2 className="mb-8 text-2xl font-bold text-navy dark:text-cream">History timeline</h2>
        </Reveal>
        <div className="relative space-y-0 border-l-2 border-gold/40 pl-6">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.05}>
              <div className="relative pb-10">
                <span className="absolute -left-[1.9rem] top-1 h-3.5 w-3.5 rounded-full border-2 border-gold bg-cream dark:bg-navy" />
                <p className="text-sm font-bold text-gold-dim dark:text-gold">{t.year}</p>
                <p className="mt-1 text-ink-muted dark:text-cream/70">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <Reveal>
          <h2 className="mb-2 text-2xl font-bold text-navy dark:text-cream">
            Interactive org sketch
          </h2>
          <p className="mb-8 text-sm text-ink-muted dark:text-cream/60">
            Tap a node to explore. Simplified for education — not a legal organisation chart.
          </p>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-2">
            {orgTree.map((item, i) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setActive(i)}
                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                  active === i
                    ? 'border-gold bg-gold/15 text-navy dark:text-cream'
                    : 'border-navy/10 bg-white/70 hover:border-gold/40 dark:border-white/10 dark:bg-navy-light/50'
                }`}
              >
                <span className="text-sm font-semibold">{item.name}</span>
                <ChevronRight className="h-4 w-4 opacity-50" />
              </button>
            ))}
          </div>
          <div className="glass-card rounded-3xl p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-dim dark:text-gold">
              Selected
            </p>
            <h3 className="mt-2 text-xl font-bold text-navy dark:text-cream">{node.name}</h3>
            <p className="mt-3 text-ink-muted dark:text-cream/70">{node.blurb}</p>
            {node.children && (
              <ul className="mt-6 space-y-3">
                {node.children.map((c) => (
                  <li
                    key={c.name}
                    className="rounded-xl border border-navy/10 bg-cream/50 px-4 py-3 dark:border-white/10 dark:bg-navy/40"
                  >
                    <p className="font-medium text-navy dark:text-cream">{c.name}</p>
                    <p className="text-sm text-ink-muted dark:text-cream/60">{c.blurb}</p>
                  </li>
                ))}
              </ul>
            )}
            {active === 0 && (
              <p className="mt-4 text-xs text-ink-muted dark:text-cream/50">
                Diagram cue: Board → executive leadership & MPC → functional departments.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="mb-10">
        <Reveal>
          <h2 className="mb-8 text-2xl font-bold text-navy dark:text-cream">
            Responsibilities & duties
          </h2>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {duties.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.04}>
              <div className="h-full rounded-2xl border border-navy/8 bg-white/80 p-5 dark:border-white/10 dark:bg-navy-light/40">
                <d.icon className="h-7 w-7 text-gold-dim dark:text-gold" />
                <h3 className="mt-3 font-semibold text-navy dark:text-cream">{d.title}</h3>
                <p className="mt-2 text-sm text-ink-muted dark:text-cream/65">{d.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <DisclaimerBanner />
    </div>
  )
}
