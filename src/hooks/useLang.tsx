import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type ChromeLang = 'en' | 'hi'

type LangCtx = {
  lang: ChromeLang
  setLang: (l: ChromeLang) => void
  toggle: () => void
  /** Chrome string: English or Hindi label */
  t: (en: string, hi: string) => string
  isHi: boolean
}

const LangContext = createContext<LangCtx | null>(null)

function getInitial(): ChromeLang {
  if (typeof window === 'undefined') return 'en'
  const stored = localStorage.getItem('rbi-lang')
  return stored === 'hi' ? 'hi' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<ChromeLang>(getInitial)

  useEffect(() => {
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en'
    localStorage.setItem('rbi-lang', lang)
  }, [lang])

  const setLang = useCallback((l: ChromeLang) => setLangState(l), [])
  const toggle = useCallback(
    () => setLangState((l) => (l === 'en' ? 'hi' : 'en')),
    [],
  )
  const t = useCallback((en: string, hi: string) => (lang === 'hi' ? hi : en), [lang])
  const value = useMemo(
    () => ({ lang, setLang, toggle, t, isHi: lang === 'hi' }),
    [lang, setLang, toggle, t],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
