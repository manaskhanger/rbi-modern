import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

const links = [
  { to: '/about', label: 'About' },
  { to: '/monetary-policy', label: 'Policy' },
  { to: '/masters-directions', label: 'Directions' },
  { to: '/circulars', label: 'Circulars' },
  { to: '/news', label: 'News' },
  { to: '/reports', label: 'Reports' },
  { to: '/data', label: 'Data' },
  { to: '/learn', label: 'Learn' },
  { to: '/offices', label: 'Offices' },
]

export function Navbar() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors ${
      isActive
        ? 'text-gold-dim dark:text-gold'
        : 'text-navy/80 hover:text-navy dark:text-cream/75 dark:hover:text-cream'
    }`

  return (
    <header className="glass sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-xs font-bold text-gold dark:bg-gold dark:text-navy">
            RBI
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-navy dark:text-cream sm:block">
            RBI Explained
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {links.map((l) => (
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
            className="rounded-xl border border-navy/10 p-2 text-navy transition hover:bg-navy/5 dark:border-white/15 dark:text-cream dark:hover:bg-white/10"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            type="button"
            className="rounded-xl border border-navy/10 p-2 text-navy lg:hidden dark:border-white/15 dark:text-cream"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-navy/10 px-4 py-3 lg:hidden dark:border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {links.map((l) => (
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
      )}
    </header>
  )
}
