import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type Theme = 'light' | 'dark'

type ThemeCtx = {
  theme: Theme
  toggle: () => void
  setTheme: (t: Theme) => void
  highContrast: boolean
  toggleHighContrast: () => void
}

const ThemeContext = createContext<ThemeCtx | null>(null)

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem('rbi-theme') as Theme | null
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getInitialHc(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('rbi-hc') === '1'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)
  const [highContrast, setHc] = useState(getInitialHc)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('rbi-theme', theme)
  }, [theme])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('hc', highContrast)
    localStorage.setItem('rbi-hc', highContrast ? '1' : '0')
  }, [highContrast])

  const setTheme = useCallback((t: Theme) => setThemeState(t), [])
  const toggle = useCallback(
    () => setThemeState((t) => (t === 'light' ? 'dark' : 'light')),
    [],
  )
  const toggleHighContrast = useCallback(() => setHc((v) => !v), [])

  const value = useMemo(
    () => ({ theme, toggle, setTheme, highContrast, toggleHighContrast }),
    [theme, toggle, setTheme, highContrast, toggleHighContrast],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
