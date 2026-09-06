import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, Menu, Moon, Search, Sun, X } from 'lucide-react'
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
      { to: '/offices', label: 'Offices' },
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
    ],
  },
]

function linkClass({ isActive }: { isActive: boolean }) {
  return `rounded-md px-2 py-1.5 text-[13px] font-medium transition-colors ${
    isActive
      ? 'bg-gold/15 text-gold-dim dark:bg-gold/20 dark:text-gold'
      : 'text-navy/80 hover:bg-navy/5 hover:text-navy dark:text-cream/75 dark:hover:bg-white/10 dark:hover:text-cream'
  }`
}

function HeaderSearch({ compact }: { compact?: boolean }) {
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const inputId = useId()

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const q = value.trim()
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
    setValue('')
  }

  return (
    <form
      onSubmit={submit}
      role="search"
      className={compact ? 'w-full' : 'hidden md:block'}
      aria-label="Site search"
    >
      <label htmlFor={inputId} className="sr-only">
        Search
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-muted dark:text-cream/50" />
        <input
          id={inputId}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search…"
          className={`rounded-lg border border-navy/10 bg-white/90 py-1.5 pl-8 pr-2 text-xs outline-none ring-gold/40 focus:ring-2 dark:border-white/15 dark:bg-navy-light/80 dark:text-cream ${
            compact ? 'w-full' : 'w-40 lg:w-48'
          }`}
        />
      </div>
    </form>
  )
}

function DesktopDropdown({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuId = useId()
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])

  const close = useCallback((restoreFocus = false) => {
    setOpen(false)
    if (restoreFocus) buttonRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close(true)
      }
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, close])

  function onButtonKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen(true)
      requestAnimationFrame(() => itemRefs.current[0]?.focus())
    }
  }

  function onMenuKeyDown(e: React.KeyboardEvent) {
    const items = itemRefs.current.filter(Boolean) as HTMLAnchorElement[]
    const idx = items.indexOf(document.activeElement as HTMLAnchorElement)
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      items[(idx + 1) % items.length]?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      items[(idx - 1 + items.length) % items.length]?.focus()
    } else if (e.key === 'Home') {
      e.preventDefault()
      items[0]?.focus()
    } else if (e.key === 'End') {
      e.preventDefault()
      items[items.length - 1]?.focus()
    } else if (e.key === 'Tab') {
      close()
    }
  }

  const location = useLocation()
  const anyActive = group.items.some((i) => {
    const path = location.pathname
    return path === i.to || path.startsWith(i.to + '/')
  })

  return (
    <div className="relative" ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        className={`inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-[13px] font-medium transition-colors ${
          open || anyActive
            ? 'bg-gold/10 text-navy dark:bg-gold/15 dark:text-gold'
            : 'text-navy/80 hover:bg-navy/5 hover:text-navy dark:text-cream/75 dark:hover:bg-white/10 dark:hover:text-cream'
        }`}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onButtonKeyDown}
      >
        {group.label}
        <ChevronDown className={`h-3.5 w-3.5 opacity-70 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={group.label}
          className="absolute left-0 top-full z-50 mt-1 min-w-[12.5rem] rounded-lg border border-navy/10 bg-white py-1 shadow-lg dark:border-white/15 dark:bg-navy-light"
          onKeyDown={onMenuKeyDown}
        >
          {group.items.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              role="menuitem"
              tabIndex={0}
              ref={(el) => {
                itemRefs.current[i] = el
              }}
              className={({ isActive }) =>
                `block px-3 py-2 text-[13px] transition-colors ${
                  isActive
                    ? 'bg-gold/15 font-medium text-gold-dim dark:text-gold'
                    : 'text-navy/85 hover:bg-navy/5 dark:text-cream/80 dark:hover:bg-white/10'
                }`
              }
              onClick={() => close()}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

export function Navbar() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const drawerId = useId()
  const navigate = useNavigate()

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

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
          {groups.map((g) => (
            <DesktopDropdown key={g.label} group={g} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <HeaderSearch />
          <Link
            to="/search"
            className="rounded-lg border border-navy/10 p-2 text-navy transition hover:bg-navy/5 md:hidden dark:border-white/15 dark:text-cream dark:hover:bg-white/10"
            aria-label="Open search"
            onClick={() => setOpen(false)}
          >
            <Search className="h-4 w-4" />
          </Link>
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
            <HeaderSearch compact />
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
            <button
              type="button"
              className="rounded-md px-2 py-1.5 text-left text-[13px] font-medium text-navy/80 dark:text-cream/75"
              onClick={() => {
                setOpen(false)
                navigate('/search')
              }}
            >
              Search the prototype…
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
