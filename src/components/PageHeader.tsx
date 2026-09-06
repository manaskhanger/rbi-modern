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
    <div className="mb-10 md:mb-14">
      <Reveal>
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold-dim dark:text-gold">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-bold tracking-tight text-navy dark:text-cream md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted dark:text-cream/70 md:text-lg">
            {description}
          </p>
        )}
      </Reveal>
    </div>
  )
}
