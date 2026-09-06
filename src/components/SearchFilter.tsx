import { Search } from 'lucide-react'

type ChipRow = {
  label: string
  options: readonly string[]
  value: string
  onChange: (v: string) => void
}

export function SearchFilter({
  query,
  onQuery,
  categories,
  category,
  onCategory,
  placeholder = 'Search…',
  audiences,
  audience,
  onAudience,
  years,
  year,
  onYear,
}: {
  query: string
  onQuery: (v: string) => void
  categories: readonly string[]
  category: string
  onCategory: (v: string) => void
  placeholder?: string
  audiences?: readonly string[]
  audience?: string
  onAudience?: (v: string) => void
  years?: readonly string[]
  year?: string
  onYear?: (v: string) => void
}) {
  const rows: ChipRow[] = [
    { label: 'Category', options: categories, value: category, onChange: onCategory },
  ]
  if (audiences && audience !== undefined && onAudience) {
    rows.push({ label: 'Audience', options: audiences, value: audience, onChange: onAudience })
  }
  if (years && year !== undefined && onYear) {
    rows.push({ label: 'Year', options: years, value: year, onChange: onYear })
  }

  return (
    <div className="mb-8 space-y-4">
      <div className="relative w-full md:max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-navy/10 bg-white py-2.5 pl-10 pr-3 text-sm outline-none ring-gold/40 focus:ring-2 dark:border-white/15 dark:bg-navy-light"
          aria-label={placeholder}
        />
      </div>
      {rows.map((row) => (
        <div key={row.label} className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-widest text-ink-muted dark:text-cream/50 sm:w-20">
            {row.label}
          </span>
          <div className="flex flex-wrap gap-2" role="group" aria-label={row.label}>
            {row.options.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => row.onChange(c)}
                aria-pressed={row.value === c}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  row.value === c
                    ? 'bg-navy text-cream dark:bg-gold dark:text-navy'
                    : 'bg-white text-navy/70 hover:bg-navy/5 dark:bg-navy-light dark:text-cream/70'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
