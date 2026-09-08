import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, Contrast, Menu, Moon, Search, Sun, X } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { useLang } from '../hooks/useLang'

type NavItem = { to: string; label: string; hi: string }
type NavGroup = { label: string; hi: string; items: NavItem[] }

const topLinks: NavItem[] = [
  { to: '/about', label: 'About Us', hi: 'परिचय' },
  { to: '/functions', label: 'Functions', hi: 'कार्य' },
  { to: '/masters-directions', label: 'Masters Directions', hi: 'मास्टर निर्देश' },
  { to: '/circulars', label: 'Circulars', hi: 'परिपत्र' },
  { to: '/news', label: 'Press / News', hi: 'समाचार' },
  { to: '/publications', label: 'Publications', hi: 'प्रकाशन' },
  { to: '/citizens', label: "Citizens' Corner", hi: 'नागरिक कॉर्नर' },
  { to: '/data', label: 'Statistics', hi: 'सांख्यिकी' },
  { to: '/learn', label: 'Learn', hi: 'सीखें' },
]

const groups: NavGroup[] = [
  {
    label: 'About & Policy',
    hi: 'बारे में और नीति',
    items: [
      { to: '/about', label: 'About', hi: 'परिचय' },
      { to: '/about/prototype', label: 'About this prototype', hi: 'इस प्रोटोटाइप के बारे में' },
      { to: '/tour', label: 'Guided tour', hi: 'मार्गदर्शित दौरा' },
      { to: '/monetary-policy', label: 'Monetary policy', hi: 'मौद्रिक नीति' },
      { to: '/functions', label: 'Functions', hi: 'कार्य' },
      { to: '/citizens', label: "Citizens' Corner", hi: 'नागरिक कॉर्नर' },
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
      { to: '/publications', label: 'Publications hub', hi: 'प्रकाशन हब' },
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
  const { isHi } = useLang()
  const primary = isHi ? hi : en
  const secondary = isHi ? en : hi
  return (
    <span className={compact ? 'inline' : 'inline-flex flex-col items-start leading-tight'}>
      <span>{primary}</span>
      <span
        lang={isHi ? 'en' : 'hi'}
        className={
          compact
            ? 'ml-1 text-[10px] opacity-80'
            : 'mt-0.5 text-[10px] font-normal opacity-75'
        }
      >
        {compact ? `(${secondary})` : secondary}
      </span>
    </span>
  )
}

function linkClass({ isActive }: { isActive: boolean }) {
  return `border-b-2 px-2.5 py-2 text-[12px] font-semibold transition-colors ${
    isActive
      ? 'border-gold text-gold-soft'
      : 'border-transparent text-cream/85 hover:border-gold/50 hover:text-cream'
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
      className={compact ? 'w-full' : 'hidden lg:block'}
      aria-label="Site search"
    >
      <label htmlFor={inputId} className="sr-only">
        Search
      </label>
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-cream/55"
          aria-hidden
        />
        <input
          id={inputId}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search prototype…"
          autoComplete="off"
          className={`border border-cream/25 bg-white/10 py-1.5 pl-8 pr-2 text-xs text-cream outline-none placeholder:text-cream/50 focus-visible:ring-2 focus-visible:ring-gold/50 ${
            compact ? 'w-full' : 'w-40 xl:w-52'
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
        className={`inline-flex items-center gap-1 border-b-2 px-2.5 py-2 text-[12px] font-semibold transition-colors ${
          open || anyActive
            ? 'border-gold text-gold-soft'
            : 'border-transparent text-cream/85 hover:border-gold/40 hover:text-cream'
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
          className="absolute left-0 top-full z-50 pt-0"
          onKeyDown={onMenuKeyDown}
          onMouseEnter={scheduleOpen}
        >
          <div className="min-w-[15rem] border border-navy/15 bg-white py-1 shadow-md dark:border-white/15 dark:bg-navy-light">
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
                  `block border-l-2 px-3 py-2 text-[13px] transition-colors ${
                    isActive
                      ? 'border-gold bg-gold/10 font-medium text-navy dark:text-gold'
                      : 'border-transparent text-navy/85 hover:bg-cream dark:text-cream/90 dark:hover:bg-white/10'
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
  const { lang, setLang, t } = useLang()
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
    <header className="sticky top-0 z-50">
      {/* Formal masthead band */}
      <div className="masthead">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 md:px-6">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <span
              className="flex h-10 w-10 shrink-0 flex-col items-center justify-center border border-gold/55 bg-navy text-[9px] font-bold leading-tight tracking-wide text-gold-soft"
              aria-hidden
            >
              <span>KP</span>
            </span>
            <span className="min-w-0">
              <span className="font-serif block truncate text-[15px] font-semibold tracking-tight text-cream md:text-base">
                {t('Reserve Bank of India', 'भारतीय रिज़र्व बैंक')}
                <span className="ml-1.5 text-[11px] font-sans font-medium text-gold-soft md:text-xs">
                  {t('Knowledge Prototype', 'ज्ञान प्रोटोटाइप')}
                </span>
              </span>
              <span className="block text-[10px] font-medium text-cream/75">
                {t(
                  'Unofficial modernisation of public RBI web patterns · Educational',
                  'सार्वजनिक आरबीआई वेब पैटर्न का अनौपचारिक आधुनिकीकरण · शैक्षिक',
                )}
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-1.5 md:gap-2">
            <Link
              to="/tour"
              className="hidden border border-cream/25 px-2.5 py-1 text-[11px] font-semibold text-cream/90 transition hover:bg-white/10 sm:inline-flex"
              onClick={() => setOpen(false)}
            >
              Tour
            </Link>
            <Link
              to="/sitemap"
              className="hidden border border-cream/25 px-2.5 py-1 text-[11px] font-semibold text-cream/90 transition hover:bg-white/10 md:inline-flex"
              onClick={() => setOpen(false)}
            >
              Sitemap
            </Link>
            <HeaderSearch />
            <Link
              to="/search"
              className="border border-cream/25 p-1.5 text-cream lg:hidden"
              aria-label="Open search"
              onClick={() => setOpen(false)}
            >
              <Search className="h-4 w-4" aria-hidden />
            </Link>
            <div
              className="flex overflow-hidden border border-cream/25 text-[10px] font-bold"
              role="group"
              aria-label={t('Language', 'भाषा')}
            >
              <button
                type="button"
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
                className={`px-2 py-1.5 ${lang === 'en' ? 'bg-gold text-navy' : 'text-cream/80 hover:bg-white/10'}`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('hi')}
                aria-pressed={lang === 'hi'}
                className={`px-2 py-1.5 ${lang === 'hi' ? 'bg-gold text-navy' : 'text-cream/80 hover:bg-white/10'}`}
              >
                हिं
              </button>
            </div>
            <button
              type="button"
              onClick={toggleHighContrast}
              aria-label="Toggle high contrast"
              aria-pressed={highContrast}
              title={highContrast ? 'High contrast on' : 'High contrast off'}
              className={`border p-1.5 transition ${
                highContrast
                  ? 'border-gold bg-gold/20 text-gold-soft'
                  : 'border-cream/25 text-cream hover:bg-white/10'
              }`}
            >
              <Contrast className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={toggle}
              aria-label="Toggle dark mode"
              aria-pressed={theme === 'dark'}
              className="border border-cream/25 p-1.5 text-cream transition hover:bg-white/10"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" aria-hidden />
              ) : (
                <Moon className="h-4 w-4" aria-hidden />
              )}
            </button>
            <button
              type="button"
              className="border border-cream/25 p-1.5 text-cream xl:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls={drawerId}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </div>
      </div>

      {/* Portal nav row */}
      <nav
        className="hidden border-b border-navy/15 bg-navy-light xl:block dark:border-white/10 dark:bg-navy"
        aria-label="Primary"
      >
        <div className="mx-auto flex max-w-6xl items-stretch gap-0 px-4 md:px-6">
          {topLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === '/about'}>
              {lang === 'hi' ? l.hi : l.label}
            </NavLink>
          ))}
          <div className="ml-auto flex items-center gap-0.5">
            {groups.map((g) => (
              <DesktopDropdown key={g.label} group={g} />
            ))}
          </div>
        </div>
      </nav>

      {open && (
        <div
          id={drawerId}
          className="border-b border-navy/15 bg-cream px-4 py-4 xl:hidden dark:border-white/10 dark:bg-navy"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-5">
            <HeaderSearch compact />
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-gold-dim dark:text-gold">
                Main sections
              </p>
              <div className="flex flex-col gap-0.5">
                {topLinks.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    className={({ isActive }) =>
                      `rounded-sm px-2 py-1.5 text-[13px] font-medium ${
                        isActive
                          ? 'bg-navy/10 text-navy dark:bg-gold/15 dark:text-gold'
                          : 'text-navy/85 dark:text-cream/90'
                      }`
                    }
                    onClick={() => setOpen(false)}
                  >
                    <BiLabel en={l.label} hi={l.hi} compact />
                  </NavLink>
                ))}
              </div>
            </div>
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
                      className={({ isActive }) =>
                        `rounded-sm px-2 py-1.5 text-[13px] font-medium ${
                          isActive
                            ? 'bg-navy/10 text-navy dark:bg-gold/15 dark:text-gold'
                            : 'text-navy/85 dark:text-cream/90'
                        }`
                      }
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
              className="px-2 py-1.5 text-[13px] font-medium text-navy/80 dark:text-cream/75"
              onClick={() => setOpen(false)}
            >
              Sitemap
            </NavLink>
            <button
              type="button"
              className="rounded-sm px-2 py-1.5 text-left text-[13px] font-medium text-navy/80 dark:text-cream/75"
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
