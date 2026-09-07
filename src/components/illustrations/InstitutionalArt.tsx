/** Original flat institutional SVGs — not RBI crest / Ashoka lion. */

type ArtProps = {
  className?: string
  title?: string
}

const stroke = 'currentColor'

export function ArtCurrency({ className = 'h-16 w-16', title = 'Currency issue' }: ArtProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      <rect x="8" y="22" width="64" height="36" rx="3" fill="none" stroke={stroke} strokeWidth="1.75" />
      <rect x="14" y="28" width="16" height="10" rx="1" fill="none" stroke={stroke} strokeWidth="1.25" opacity="0.7" />
      <circle cx="52" cy="40" r="10" fill="none" stroke={stroke} strokeWidth="1.5" />
      <circle cx="52" cy="40" r="4" fill="none" stroke={stroke} strokeWidth="1.25" />
      <path d="M14 52h28" stroke={stroke} strokeWidth="1.25" opacity="0.55" />
      <path d="M8 30h4M68 30h4M8 50h4M68 50h4" stroke={stroke} strokeWidth="1.5" />
    </svg>
  )
}

export function ArtMonetaryPolicy({ className = 'h-16 w-16', title = 'Monetary policy' }: ArtProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      <circle cx="40" cy="42" r="26" fill="none" stroke={stroke} strokeWidth="1.75" />
      <circle cx="40" cy="42" r="3" fill={stroke} />
      <path d="M40 42 L58 28" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M40 18 v4M40 62 v4M16 42 h4M60 42 h4" stroke={stroke} strokeWidth="1.5" />
      <path d="M22 24 l3 3M55 55 l3 3M22 60 l3-3M55 29 l3-3" stroke={stroke} strokeWidth="1.25" opacity="0.65" />
      {/* balance beam */}
      <path d="M18 70 h44" stroke={stroke} strokeWidth="1.25" opacity="0.4" />
      <path d="M28 66 L40 42 L52 66" fill="none" stroke={stroke} strokeWidth="1.25" opacity="0.35" />
    </svg>
  )
}

export function ArtPayments({ className = 'h-16 w-16', title = 'Payment systems' }: ArtProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      <rect x="10" y="18" width="22" height="16" rx="2" fill="none" stroke={stroke} strokeWidth="1.5" />
      <rect x="48" y="46" width="22" height="16" rx="2" fill="none" stroke={stroke} strokeWidth="1.5" />
      <path d="M32 26 H42 Q48 26 48 32 V46" fill="none" stroke={stroke} strokeWidth="1.75" />
      <path d="M44 42 l4 4 8-10" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="21" cy="54" r="8" fill="none" stroke={stroke} strokeWidth="1.5" />
      <path d="M21 50 v8M17 54 h8" stroke={stroke} strokeWidth="1.25" />
      <path d="M14 26 h14M54 54 h10" stroke={stroke} strokeWidth="1" opacity="0.45" />
    </svg>
  )
}

export function ArtRegulation({ className = 'h-16 w-16', title = 'Regulation' }: ArtProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      <path
        d="M40 12 L64 24 V40 C64 54 54 64 40 70 C26 64 16 54 16 40 V24 Z"
        fill="none"
        stroke={stroke}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M30 40 l7 7 14-16" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ArtStability({ className = 'h-16 w-16', title = 'Financial stability' }: ArtProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      <path d="M14 52 L40 18 L66 52 Z" fill="none" stroke={stroke} strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M26 52 V62 H54 V52" fill="none" stroke={stroke} strokeWidth="1.5" />
      <path d="M20 62 H60" stroke={stroke} strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="40" cy="40" r="5" fill="none" stroke={stroke} strokeWidth="1.5" />
      <path d="M40 34 V28M36 42 L30 48M44 42 L50 48" stroke={stroke} strokeWidth="1.25" opacity="0.6" />
    </svg>
  )
}

export function ArtSupervision({ className = 'h-16 w-16', title = 'Supervision' }: ArtProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      <circle cx="36" cy="34" r="14" fill="none" stroke={stroke} strokeWidth="1.75" />
      <path d="M46 44 L62 62" stroke={stroke} strokeWidth="2.25" strokeLinecap="round" />
      <path d="M28 34 h16M36 26 v16" stroke={stroke} strokeWidth="1.25" opacity="0.55" />
      <rect x="14" y="58" width="36" height="8" rx="1" fill="none" stroke={stroke} strokeWidth="1.25" opacity="0.5" />
    </svg>
  )
}

export function ArtFema({ className = 'h-16 w-16', title = 'Foreign exchange' }: ArtProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      <circle cx="40" cy="40" r="26" fill="none" stroke={stroke} strokeWidth="1.75" />
      <ellipse cx="40" cy="40" rx="12" ry="26" fill="none" stroke={stroke} strokeWidth="1.25" />
      <path d="M14 40 H66M18 28 H62M18 52 H62" stroke={stroke} strokeWidth="1.15" opacity="0.65" />
    </svg>
  )
}

export function ArtMarkets({ className = 'h-16 w-16', title = 'Financial markets' }: ArtProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      <path d="M12 58 V22M12 58 H68" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M18 48 L30 36 L40 42 L54 24 L66 30"
        fill="none"
        stroke={stroke}
        strokeWidth="1.75"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="66" cy="30" r="2.5" fill={stroke} />
      <path d="M22 58 V50M34 58 V44M46 58 V40M58 58 V34" stroke={stroke} strokeWidth="3" opacity="0.25" strokeLinecap="round" />
    </svg>
  )
}

export const functionArt = {
  monetary: ArtMonetaryPolicy,
  currency: ArtCurrency,
  payments: ArtPayments,
  regulation: ArtRegulation,
  supervision: ArtSupervision,
  fema: ArtFema,
  markets: ArtMarkets,
  stability: ArtStability,
} as const

export type FunctionArtKey = keyof typeof functionArt
