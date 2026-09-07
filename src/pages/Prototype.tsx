import { Link } from 'react-router-dom'
import { ExternalLink, Info } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { ExploreNext } from '../components/ExploreNext'
import { AuthoritativeSource } from '../components/AuthoritativeSource'
import { ContentReviewed } from '../components/IllustrativeLabel'
import { RBI_HOME } from '../data/meta'

const points = [
  {
    title: 'What this is',
    body: 'An independent educational and UX concept exploring how India’s central-bank public materials — mandate, Masters Directions, circulars, reports and data — might be presented with clearer structure for officers, students and serious stakeholders.',
  },
  {
    title: 'What this is not',
    body: 'This site is not affiliated with, endorsed by, or connected to the Reserve Bank of India. It is not rbi.org.in, not a regulatory portal, and not a compliance tool. Branding here (including the “KP” mark) is a prototype identifier only — not an official crest or seal.',
  },
  {
    title: 'About the content',
    body: 'All rates, charts, circulars, news items and document summaries are illustrative sample data and original paraphrases written for this prototype. They must not be used for compliance, legal advice, market decisions, or as substitutes for gazetted instruments.',
  },
  {
    title: 'Why it exists',
    body: 'To improve communication clarity: denser navigation, plain-language framing, and information architecture that can be reviewed as a showable unofficial prototype — without impersonating the official website.',
  },
  {
    title: 'Always defer to the official source',
    body: 'For authoritative text, rates, notifications and publications, always use the Reserve Bank of India website at rbi.org.in and primary legal sources. When in doubt, the official site wins.',
  },
]

export function Prototype() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <PageHeader
        eyebrow="Trust & authority"
        title="About this prototype"
        description="Plain statement of what this unofficial educational / UX concept is — and what it is not — for anyone reviewing it, including RBI officers."
      />

      <div className="mb-8 flex items-start gap-3 rounded-xl border border-navy/10 bg-white/80 p-4 dark:border-white/10 dark:bg-navy-light/40">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold-dim dark:text-gold" aria-hidden />
        <div>
          <p className="text-sm font-semibold text-navy dark:text-cream">
            Unofficial · Educational · Illustrative data
          </p>
          <p className="mt-1 text-sm text-ink-muted dark:text-cream/65">
            Always defer to{' '}
            <a
              href={RBI_HOME}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gold-dim underline-offset-2 hover:underline dark:text-gold"
            >
              rbi.org.in
              <ExternalLink className="ml-1 inline h-3 w-3" aria-hidden />
            </a>{' '}
            for official text and figures.
          </p>
          <ContentReviewed className="mt-2" />
        </div>
      </div>

      <ol className="space-y-5">
        {points.map((p, i) => (
          <li
            key={p.title}
            className="rounded-xl border border-navy/10 bg-white/70 px-5 py-4 dark:border-white/10 dark:bg-navy-light/30"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-gold-dim dark:text-gold">
              {String(i + 1).padStart(2, '0')}
            </p>
            <h2 className="mt-1 text-base font-semibold text-navy dark:text-cream">{p.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted dark:text-cream/70">{p.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-8">
        <AuthoritativeSource section="home" />
      </div>

      <p className="mt-6 text-sm text-ink-muted dark:text-cream/60">
        Related:{' '}
        <Link to="/about" className="font-medium text-gold-dim hover:underline dark:text-gold">
          About &amp; mandate
        </Link>{' '}
        (educational organisation framing)
      </p>

      <ExploreNext pathname="/about/prototype" />
      <div className="mt-10">
        <DisclaimerBanner />
      </div>
    </div>
  )
}
