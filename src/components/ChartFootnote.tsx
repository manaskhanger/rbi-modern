type Props = {
  methodology: string
  className?: string
}

/** Chart footer: methodology one-liner + compliance disclaimer. */
export function ChartFootnote({ methodology, className = '' }: Props) {
  return (
    <p className={`mt-2 px-1 text-[11px] leading-relaxed text-ink-muted dark:text-cream/50 ${className}`}>
      <span className="font-medium text-navy/80 dark:text-cream/70">{methodology}</span>
      {' '}
      <span className="whitespace-nowrap">Illustrative · not for compliance.</span>
    </p>
  )
}
