import { Search } from 'lucide-react'

export function SearchFilter({
  query,
  onQuery,
  categories,
  category,
  onCategory,
  placeholder = 'Search…',
}: {
  query: string
  onQuery: (v: string) => void
  categories: readonly string[]
  category: string
  onCategory: (v: string) => void
  placeholder?: string
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-navy/10 bg-white py-2.5 pl-10 pr-3 text-sm outline-none ring-gold/40 focus:ring-2 dark:border-white/15 dark:bg-navy-light"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onCategory(c)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              category === c
                ? 'bg-navy text-cream dark:bg-gold dark:text-navy'
                : 'bg-white text-navy/70 hover:bg-navy/5 dark:bg-navy-light dark:text-cream/70'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}
