import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Landmark, Scale, Smartphone, Shield, Info } from 'lucide-react'
import { newsItems } from '../data/news'
import { Reveal } from '../components/Reveal'
import { CardLink } from '../components/Card'
import { Badge } from '../components/Badge'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { KeyRatesStrip } from '../components/KeyRatesStrip'
import { fadeUp, stagger } from '../lib/motion'

const pillars = [
  {
    icon: Scale,
    title: 'Monetary policy',
    text: 'Operates flexible inflation targeting through the Monetary Policy Committee, signalling the policy repo rate to anchor inflation expectations while supporting growth.',
  },
  {
    icon: Landmark,
    title: 'Regulation & supervision',
    text: 'Licenses and supervises banks, NBFCs and other regulated entities under prudential and conduct frameworks that protect depositors and market integrity.',
  },
  {
    icon: Smartphone,
    title: 'Payment systems',
    text: 'Authorises and oversees payment and settlement systems so retail and wholesale transfers remain safe, efficient and interoperable.',
  },
  {
    icon: Shield,
    title: 'Financial stability & reserves',
    text: 'Monitors systemic risk, issues currency, and manages foreign exchange reserves as an external buffer for the economy.',
  },
]

export function Home() {
  const reduce = useReducedMotion()
  const featured = newsItems.filter((n) => n.featured).slice(0, 3)

  return (
    <div>
      <section className="relative overflow-hidden border-b border-navy/8 dark:border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(197,165,114,0.12),_transparent_55%)]" />
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-12 md:px-6 md:pb-20 md:pt-16">
          <motion.div
            variants={reduce ? undefined : stagger}
            initial={reduce ? undefined : 'hidden'}
            animate={reduce ? undefined : 'visible'}
            className="max-w-3xl"
          >
            <motion.div variants={reduce ? undefined : fadeUp}>
              <Badge>Unofficial educational / UX prototype</Badge>
            </motion.div>
            <motion.h1
              variants={reduce ? undefined : fadeUp}
              className="mt-5 text-3xl font-bold tracking-tight text-navy dark:text-cream md:text-5xl md:leading-[1.12]"
            >
              Clearer public communication of India’s central bank — as a concept prototype.
            </motion.h1>
            <motion.p
              variants={reduce ? undefined : fadeUp}
              className="mt-5 text-base leading-relaxed text-ink-muted dark:text-cream/70 md:text-lg"
            >
              The Reserve Bank of India is the nation’s monetary authority and the principal
              regulator of banks and payment systems. Its public mandate spans price stability,
              financial system soundness, currency issue, and the orderly development of markets.
            </motion.p>
            <motion.p
              variants={reduce ? undefined : fadeUp}
              className="mt-4 text-base leading-relaxed text-ink-muted dark:text-cream/70 md:text-lg"
            >
              <strong className="font-semibold text-navy dark:text-cream">Why this prototype
              exists:</strong>{' '}
              to explore how Masters Directions, circulars, reports and data might be presented with
              denser, more navigable information architecture for officers, students and serious
              stakeholders — without impersonating the official website.
            </motion.p>
            <motion.div variants={reduce ? undefined : fadeUp} className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-md bg-navy px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-navy-light dark:bg-gold dark:text-navy dark:hover:bg-gold-soft"
              >
                Mandate &amp; organisation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/masters-directions"
                className="inline-flex items-center gap-2 rounded-md border border-navy/15 bg-white/80 px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-white dark:border-white/20 dark:bg-white/5 dark:text-cream"
              >
                Masters Directions
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={reduce ? undefined : fadeUp}
            initial={reduce ? undefined : 'hidden'}
            animate={reduce ? undefined : 'visible'}
            className="mt-10 max-w-3xl"
          >
            <Link
              to="/about/prototype"
              className="group flex gap-3 rounded-xl border border-gold/40 bg-gold/10 p-4 transition hover:border-gold/60 hover:bg-gold/15 dark:border-gold/30"
            >
              <Info
                className="mt-0.5 h-5 w-5 shrink-0 text-gold-dim dark:text-gold"
                aria-hidden
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-navy dark:text-cream">
                  What this prototype is / isn’t
                </p>
                <p className="mt-1 text-sm text-ink-muted dark:text-cream/65">
                  Educational UX concept · not affiliated with RBI · illustrative data · always
                  defer to rbi.org.in for official text.
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-gold-dim group-hover:underline dark:text-gold">
                  About this prototype <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      <KeyRatesStrip />

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
        <Reveal>
          <h2 className="text-2xl font-bold text-navy dark:text-cream md:text-[1.75rem]">
            Core public functions
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-muted dark:text-cream/65 md:text-base">
            High-level framing for educational use — not a statutory schedule.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.04}>
              <div className="glass-card h-full rounded-xl p-5">
                <p.icon className="h-6 w-6 text-gold-dim dark:text-gold" aria-hidden />
                <h3 className="mt-3 text-sm font-semibold text-navy dark:text-cream">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted dark:text-cream/65">
                  {p.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white/60 dark:bg-navy-light/25">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
          <div className="mb-6 flex items-end justify-between gap-4">
            <Reveal>
              <h2 className="text-2xl font-bold text-navy dark:text-cream md:text-[1.75rem]">
                Sample updates
              </h2>
              <p className="mt-1 text-sm text-ink-muted dark:text-cream/55">
                Illustrative press-style cards for navigation testing.
              </p>
            </Reveal>
            <Link
              to="/news"
              className="text-sm font-medium text-gold-dim hover:underline dark:text-gold"
            >
              All news
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {featured.map((n) => (
              <CardLink key={n.slug} to={`/news/${n.slug}`} className="!rounded-xl !p-4">
                <Badge tone="muted">{n.category}</Badge>
                <h3 className="mt-2 text-sm font-semibold text-navy group-hover:text-gold-dim dark:text-cream dark:group-hover:text-gold">
                  {n.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-ink-muted dark:text-cream/60">
                  {n.excerpt}
                </p>
                <p className="mt-3 text-xs text-ink-muted/80 dark:text-cream/45">{n.date}</p>
              </CardLink>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <Reveal>
          <div className="overflow-hidden rounded-2xl bg-navy p-8 text-cream md:flex md:items-center md:justify-between md:p-10">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">Organisation</p>
              <h2 className="mt-2 text-xl font-bold md:text-2xl">
                Central Board → departments (illustrative schematic)
              </h2>
              <p className="mt-3 text-sm text-cream/70">
                A structured sketch of how oversight, the MPC and functional departments relate —
                labelled illustrative for training and UX review.
              </p>
            </div>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-gold px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-gold-soft md:mt-0"
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
