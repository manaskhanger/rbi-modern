export type Category =
  | 'Banking'
  | 'NBFC'
  | 'Payments'
  | 'Currency'
  | 'Forex'
  | 'Monetary Policy'
  | 'Financial Markets'
  | 'Consumer Protection'
  | 'Supervision'

export interface MastersDirection {
  slug: string
  title: string
  category: Category
  issued: string
  updated: string
  summary: string
  plainEnglish: string
  obligations: string[]
  toc: { id: string; label: string }[]
  sections: { id: string; heading: string; body: string }[]
}

export interface Circular {
  slug: string
  title: string
  category: Category
  date: string
  ref: string
  summary: string
  body: string[]
  audience: string
}

export interface NewsItem {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  body: string[]
  featured?: boolean
}

export interface Report {
  slug: string
  title: string
  date: string
  type: string
  summary: string
  pages: number
  rich?: boolean
}

export interface GlossaryTerm {
  term: string
  definition: string
  related?: string[]
}

export interface Office {
  city: string
  region: string
  type: 'Regional Office' | 'Sub-Office' | 'Training Centre'
  address: string
  focus: string
}
