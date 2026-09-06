import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-sm font-semibold text-gold-dim">404</p>
      <h1 className="mt-2 text-3xl font-bold text-navy dark:text-cream">Page not found</h1>
      <p className="mt-3 text-ink-muted dark:text-cream/65">
        That route is not part of this educational demo.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-cream dark:bg-gold dark:text-navy"
      >
        Go home
      </Link>
    </div>
  )
}
