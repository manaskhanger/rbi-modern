import { Reveal } from './Reveal'

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <div className="mb-8 border-b border-navy/12 pb-6 dark:border-white/12 md:mb-10">
      <Reveal>
        {eyebrow && (
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-dim dark:text-gold">
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif text-2xl font-semibold tracking-tight text-navy dark:text-cream md:text-3xl md:leading-snug">
          {title}
        </h1>
        {description && (
          <p className="prose-read mt-3 text-[15px] leading-relaxed text-ink-muted dark:text-cream/75">
            {description}
          </p>
        )}
      </Reveal>
    </div>
  )
}
