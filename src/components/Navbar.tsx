import { useEffect, useId, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

type NavItem = { to: string; label: string }
type NavGroup = { label: string; items: NavItem[] }

const groups: NavGroup[] = [
  {
    label: 'About & Policy',
    items: [
      { to: '/about', label: 'About' },
      { to: '/about/prototype', label: 'About this prototype' },
      { to: '/monetary-policy', label: 'Monetary policy' },
    ],
  },
  {
    label: 'Regulatory',
    items: [
      { to: '/masters-directions', label: 'Masters Directions' },
      { to: '/circulars', label: 'Circulars' },
    ],
  },
  {
    label: 'Publications',
    items: [
      { to: '/news', label: 'News' },
      { to: '/reports', label: 'Reports' },
    ],
  },
  {
    label: 'Data & Learn',
    items: [
      { to: '/data', label: 'Data' },
      { to: '/learn', label: 'Learn' },
      { to: '/offices', label: 'Offices' },
    ],
  },
]

const flatLinks = groups.flatMap((g) => g.items)

export function Navbar() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const drawerId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-2 py-1.5 text-[13px] font-medium transition-colors ${
      isActive
        ? 'bg-gold/15 text-gold-dim dark:bg-gold/20 dark:text-gold'
        : 'text-navy/80 hover:bg-navy/5 hover:text-navy dark:text-cream/75 dark:hover:bg-white/10 dark:hover:text-cream'
    }`

  return (
    <header className="glass sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 md:px-6">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gold/40 bg-navy text-[10px] font-bold tracking-wide text-gold dark:bg-navy-light"
            aria-hidden
          >
            KP
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold tracking-tight text-navy dark:text-cream">
              RBI Knowledge Prototype
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-wider text-ink-muted dark:text-cream/50">
              Unofficial · Educational UX
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
          {flatLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="rounded-lg border border-navy/10 p-2 text-navy transition hover:bg-navy/5 dark:border-white/15 dark:text-cream dark:hover:bg-white/10"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            type="button"
            className="rounded-lg border border-navy/10 p-2 text-navy xl:hidden dark:border-white/15 dark:text-cream"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls={drawerId}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id={drawerId}
          className="border-t border-navy/10 bg-cream/95 px-4 py-4 xl:hidden dark:border-white/10 dark:bg-navy/95"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-5">
            {groups.map((g) => (
              <div key={g.label}>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-gold-dim dark:text-gold">
                  {g.label}
                </p>
                <div className="flex flex-col gap-0.5">
                  {g.items.map((l) => (
                    <NavLink
                      key={l.to}
                      to={l.to}
                      className={linkClass}
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
