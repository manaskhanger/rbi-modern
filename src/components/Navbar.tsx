import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, Contrast, Menu, Moon, Search, Sun, X } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

type NavItem = { to: string; label: string; hi: string }
type NavGroup = { label: string; hi: string; items: NavItem[] }

const groups: NavGroup[] = [
  {
    label: 'About & Policy',
    hi: 'बारे में और नीति',
    items: [
      { to: '/about', label: 'About', hi: 'परिचय' },
      { to: '/about/prototype', label: 'About this prototype', hi: 'इस प्रोटोटाइप के बारे में' },
      { to: '/tour', label: 'Guided tour', hi: 'मार्गदर्शित दौरा' },
      { to: '/monetary-policy', label: 'Monetary policy', hi: 'मौद्रिक नीति' },
      { to: '/offices', label: 'Offices', hi: 'कार्यालय' },
    ],
  },
  {
    label: 'Regulatory',
    hi: 'विनियामक',
    items: [
      { to: '/masters-directions', label: 'Masters Directions', hi: 'मास्टर निर्देश' },
      { to: '/circulars', label: 'Circulars', hi: 'परिपत्र' },
    ],
  },
  {
    label: 'Publications',
    hi: 'प्रकाशन',
    items: [
      { to: '/news', label: 'News', hi: 'समाचार' },
      { to: '/reports', label: 'Reports', hi: 'रिपोर्ट' },
    ],
  },
  {
    label: 'Data & Learn',
    hi: 'डेटा और सीखें',
    items: [
      { to: '/data', label: 'Data', hi: 'डेटा' },
      { to: '/learn', label: 'Learn', hi: 'सीखें' },
    ],
  },
]

function BiLabel({ en, hi, compact }: { en: string; hi: string; compact?: boolean }) {
  return (
    <span className={compact ? 'inline' : 'inline-flex flex-col items-start leading-tight'}>
      <span>{en}</span>
      <span lang="hi" className={compact ? 'ml-1 text-[10px] opacity-70' : 'bilingual-hi'}>
        {compact ? `(${hi})` : hi}
      </span>
    </span>
  )
}

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
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-muted dark:text-cream/50" aria-hidden />
        <input
          id={inputId}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search…"
          autoComplete="off"
          className={`rounded-lg border border-navy/10 bg-white/90 py-1.5 pl-8 pr-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-gold/50 dark:border-white/15 dark:bg-navy-light/80 dark:text-cream ${
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
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimers = useCallback(() => {
    if (openTimer.current) clearTimeout(openTimer.current)
    if (closeTimer.current) clearTimeout(closeTimer.current)
    openTimer.current = null
    closeTimer.current = null
  }, [])

  const close = useCallback(
    (restoreFocus = false) => {
      clearTimers()
      setOpen(false)
      if (restoreFocus) buttonRef.current?.focus()
    },
    [clearTimers],
  )

  const scheduleOpen = useCallback(() => {
    clearTimers()
    openTimer.current = setTimeout(() => setOpen(true), 80)
  }, [clearTimers])

  const scheduleClose = useCallback(() => {
    clearTimers()
    closeTimer.current = setTimeout(() => setOpen(false), 220)
  }, [clearTimers])

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

  useEffect(() => () => clearTimers(), [clearTimers])

  function onButtonKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      clearTimers()
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
    <div
      className="relative"
      ref={rootRef}
      onMouseEnter={scheduleOpen}
      onMouseLeave={scheduleClose}
    >
      <button
        ref={buttonRef}
        type="button"
        className={`inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-[13px] font-medium transition-colors ${
          open || anyActive
            ? 'bg-gold/10 text-navy ring-1 ring-gold/35 dark:bg-gold/15 dark:text-gold dark:ring-gold/40'
            : 'text-navy/80 hover:bg-navy/5 hover:text-navy dark:text-cream/75 dark:hover:bg-white/10 dark:hover:text-cream'
        }`}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => {
          clearTimers()
          setOpen((v) => !v)
        }}
        onKeyDown={onButtonKeyDown}
      >
        <BiLabel en={group.label} hi={group.hi} />
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 opacity-70 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={`${group.label} / ${group.hi}`}
          className="absolute left-0 top-full z-50 pt-1"
          onKeyDown={onMenuKeyDown}
          onMouseEnter={scheduleOpen}
        >
          {/* pt-1 bridge prevents accidental close when moving pointer into menu */}
          <div className="min-w-[14rem] rounded-lg border border-navy/10 bg-white py-1 shadow-lg dark:border-white/15 dark:bg-navy-light">
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
                <BiLabel en={item.label} hi={item.hi} />
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function Navbar() {
  const { theme, toggle, highContrast, toggleHighContrast } = useTheme()
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
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gold/40 bg-navy text-[10px] font-bold tracking-wide text-gold-on-navy dark:bg-navy-light"
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
              <span lang="hi" className="ml-1 font-normal normal-case tracking-normal opacity-80">
                · अनौपचारिक
              </span>
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
          {groups.map((g) => (
            <DesktopDropdown key={g.label} group={g} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/tour"
            className="hidden rounded-lg border border-navy/10 px-2.5 py-1.5 text-[12px] font-semibold text-navy transition hover:bg-navy/5 sm:inline-flex dark:border-white/15 dark:text-cream dark:hover:bg-white/10"
            onClick={() => setOpen(false)}
          >
            Tour
          </Link>
          <Link
            to="/sitemap"
            className="hidden rounded-lg border border-navy/10 px-2.5 py-1.5 text-[12px] font-semibold text-navy/80 transition hover:bg-navy/5 lg:inline-flex dark:border-white/15 dark:text-cream/80 dark:hover:bg-white/10"
            onClick={() => setOpen(false)}
          >
            Sitemap
          </Link>
          <HeaderSearch />
          <Link
            to="/search"
            className="rounded-lg border border-navy/10 p-2 text-navy transition hover:bg-navy/5 md:hidden dark:border-white/15 dark:text-cream dark:hover:bg-white/10"
            aria-label="Open search"
            onClick={() => setOpen(false)}
          >
            <Search className="h-4 w-4" aria-hidden />
          </Link>
          <button
            type="button"
            onClick={toggleHighContrast}
            aria-label="Toggle high contrast"
            aria-pressed={highContrast}
            title={highContrast ? 'High contrast on' : 'High contrast off'}
            className={`rounded-lg border p-2 transition ${
              highContrast
                ? 'border-navy bg-navy/10 text-navy dark:border-gold dark:bg-gold/15 dark:text-gold'
                : 'border-navy/10 text-navy hover:bg-navy/5 dark:border-white/15 dark:text-cream dark:hover:bg-white/10'
            }`}
          >
            <Contrast className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle dark mode"
            aria-pressed={theme === 'dark'}
            className="rounded-lg border border-navy/10 p-2 text-navy transition hover:bg-navy/5 dark:border-white/15 dark:text-cream dark:hover:bg-white/10"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
          </button>
          <button
            type="button"
            className="rounded-lg border border-navy/10 p-2 text-navy xl:hidden dark:border-white/15 dark:text-cream"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls={drawerId}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
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
                  <span lang="hi" className="ml-1.5 font-medium normal-case tracking-normal opacity-80">
                    {g.hi}
                  </span>
                </p>
                <div className="flex flex-col gap-0.5">
                  {g.items.map((l) => (
                    <NavLink
                      key={l.to}
                      to={l.to}
                      className={linkClass}
                      onClick={() => setOpen(false)}
                    >
                      <BiLabel en={l.label} hi={l.hi} compact />
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
            <NavLink
              to="/sitemap"
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              Sitemap
            </NavLink>
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
