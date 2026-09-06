import { Link } from 'react-router-dom'
import { ArrowRight, Briefcase, GraduationCap, Newspaper } from 'lucide-react'
import { personas, type PersonaId } from '../data/personas'
import { Reveal } from './Reveal'

const icons: Record<PersonaId, typeof Briefcase> = {
  banker: Briefcase,
  student: GraduationCap,
  journalist: Newspaper,
}

type Props = {
  /** Compact layout for Learn/Tour pages */
  compact?: boolean
}

export function PersonaCards({ compact = false }: Props) {
  return (
    <div className={`grid gap-3 ${compact ? 'md:grid-cols-3' : 'md:grid-cols-3'}`}>
      {personas.map((p, i) => {
        const Icon = icons[p.id]
        return (
          <Reveal key={p.id} delay={i * 0.04}>
            <article className="glass-card flex h-full flex-col rounded-xl p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/15">
                  <Icon className="h-5 w-5 text-gold-dim dark:text-gold" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-navy dark:text-cream">{p.title}</h3>
                  <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-gold-dim dark:text-gold">
                    {p.pathSummary}
                  </p>
                </div>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted dark:text-cream/65">
                {p.blurb}
              </p>
              <ul className="mt-3 space-y-1 border-t border-navy/8 pt-3 dark:border-white/10">
                {p.paths.map((path) => (
                  <li key={path.to}>
                    <Link
                      to={path.to}
                      className="text-xs font-medium text-navy/80 underline-offset-2 hover:text-gold-dim hover:underline dark:text-cream/70 dark:hover:text-gold"
                    >
                      {path.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to={p.startTo}
                className="mt-4 inline-flex items-center gap-1.5 self-start rounded-md bg-navy px-3.5 py-2 text-xs font-semibold text-cream transition hover:bg-navy-light dark:bg-gold dark:text-navy dark:hover:bg-gold-soft"
              >
                Start as {p.shortTitle.toLowerCase()} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </article>
          </Reveal>
        )
      })}
    </div>
  )
}
