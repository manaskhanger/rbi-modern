export function Badge({
  children,
  tone = 'gold',
}: {
  children: React.ReactNode
  tone?: 'gold' | 'navy' | 'muted'
}) {
  const styles =
    tone === 'gold'
      ? 'bg-gold/15 text-gold-dim dark:text-gold-soft border-gold/30'
      : tone === 'navy'
        ? 'bg-navy/10 text-navy dark:bg-white/10 dark:text-cream border-navy/20 dark:border-white/15'
        : 'bg-black/5 text-ink-muted dark:bg-white/10 dark:text-cream/70 border-black/10 dark:border-white/10'
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles}`}
    >
      {children}
    </span>
  )
}
