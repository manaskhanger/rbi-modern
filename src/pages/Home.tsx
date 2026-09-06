import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Landmark, Scale, Smartphone, Shield } from 'lucide-react'
import { keyRates } from '../data/rates'
import { newsItems } from '../data/news'
import { Reveal } from '../components/Reveal'
import { CardLink } from '../components/Card'
import { Badge } from '../components/Badge'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { fadeUp, stagger } from '../lib/motion'

const pillars = [
  {
    icon: Scale,
    title: 'Monetary policy',
    text: 'Sets the policy repo rate to keep inflation near target while supporting growth.',
  },
  {
    icon: Landmark,
    title: 'Banking regulation',
    text: 'Licenses and supervises banks and NBFCs so deposits and credit stay sound.',
  },
  {
    icon: Smartphone,
    title: 'Payment systems',
    text: 'Authorises and oversees rails like UPI, NEFT and RTGS for safe transfers.',
  },
  {
    icon: Shield,
    title: 'Financial stability',
    text: 'Watches systemic risks and maintains forex reserves for external buffers.',
  },
]

export function Home() {
  const reduce = useReducedMotion()
  const featured = newsItems.filter((n) => n.featured).slice(0, 3)

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(197,165,114,0.18),_transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top_right,_rgba(197,165,114,0.12),_transparent_50%)]" />
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-14 md:px-6 md:pb-24 md:pt-20">
          <motion.div
            variants={reduce ? undefined : stagger}
            initial={reduce ? undefined : 'hidden'}
            animate={reduce ? undefined : 'visible'}
            className="max-w-3xl"
          >
            <motion.div variants={reduce ? undefined : fadeUp}>
              <Badge>Educational demo · Not official RBI</Badge>
            </motion.div>
            <motion.h1
              variants={reduce ? undefined : fadeUp}
              className="mt-5 text-4xl font-bold tracking-tight text-navy dark:text-cream md:text-6xl md:leading-[1.05]"
            >
              India’s central bank, explained in plain English.
            </motion.h1>
            <motion.p
              variants={reduce ? undefined : fadeUp}
              className="mt-6 text-lg leading-relaxed text-ink-muted dark:text-cream/70 md:text-xl"
            >
              The Reserve Bank of India manages monetary policy, issues currency, regulates banks
              and payment systems, and works to keep the financial system stable. This site is a
              modern learning companion — not the official portal.
            </motion.p>
            <motion.div variants={reduce ? undefined : fadeUp} className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/learn"
                className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-navy-light dark:bg-gold dark:text-navy dark:hover:bg-gold-soft"
              >
                Start learning <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/monetary-policy"
                className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white/70 px-5 py-2.5 text-sm font-semibold text-navy backdrop-blur transition hover:bg-white dark:border-white/20 dark:bg-white/5 dark:text-cream"
              >
                Monetary policy
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-navy/10 bg-white/60 dark:border-white/10 dark:bg-navy-light/50">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-gold-dim dark:text-gold">
            Key rates · illustrative demo numbers
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {keyRates.map((r) => (
              <div
                key={r.label}
                className="rounded-2xl border border-navy/8 bg-cream/80 px-3 py-3 text-center dark:border-white/10 dark:bg-navy/40"
              >
                <p className="text-[11px] text-ink-muted dark:text-cream/55">{r.label}</p>
                <p className="mt-1 text-lg font-bold text-navy dark:text-cream">{r.value}</p>
                <p className="text-[10px] text-gold-dim">{r.hint}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <Reveal>
          <h2 className="text-2xl font-bold text-navy dark:text-cream md:text-3xl">
            What does RBI actually do?
          </h2>
          <p className="mt-3 max-w-2xl text-ink-muted dark:text-cream/65">
            Four everyday jobs that touch every household and business in India.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="glass-card h-full rounded-2xl p-5 transition hover:-translate-y-1 hover:shadow-lg">
                <p.icon className="h-8 w-8 text-gold-dim dark:text-gold" />
                <h3 className="mt-4 font-semibold text-navy dark:text-cream">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted dark:text-cream/65">
                  {p.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white/50 dark:bg-navy-light/30">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <Reveal>
              <h2 className="text-2xl font-bold text-navy dark:text-cream md:text-3xl">
                Featured updates
              </h2>
            </Reveal>
            <Link
              to="/news"
              className="text-sm font-medium text-gold-dim hover:underline dark:text-gold"
            >
              All news
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {featured.map((n) => (
              <CardLink key={n.slug} to={`/news/${n.slug}`}>
                <Badge tone="muted">{n.category}</Badge>
                <h3 className="mt-3 font-semibold text-navy group-hover:text-gold-dim dark:text-cream dark:group-hover:text-gold">
                  {n.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-ink-muted dark:text-cream/60">
                  {n.excerpt}
                </p>
                <p className="mt-4 text-xs text-ink-muted/80 dark:text-cream/45">{n.date}</p>
              </CardLink>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <Reveal>
          <div className="overflow-hidden rounded-3xl bg-navy p-8 text-cream md:flex md:items-center md:justify-between md:p-12">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-gold">Organisation</p>
              <h2 className="mt-3 text-2xl font-bold md:text-3xl">
                Board, departments, and how decisions flow
              </h2>
              <p className="mt-3 text-cream/70">
                Explore an interactive sketch of the Central Board and major functional departments —
                built for learners, not for org-chart legal precision.
              </p>
            </div>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-gold-soft md:mt-0"
            >
              View about page <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-8">
          <DisclaimerBanner />
        </div>
      </section>
    </div>
  )
}
