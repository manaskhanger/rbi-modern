export type Category =
  | 'Banking'
  | 'Commercial Banks'
  | 'NBFC'
  | 'NBFCs'
  | 'Payments'
  | 'Currency'
  | 'Forex'
  | 'FEMA'
  | 'Monetary Policy'
  | 'Financial Markets'
  | 'Consumer Protection'
  | 'Supervision'
  | 'Co-operative Banks'
  | 'AIFIs'
  | 'CICs'
  | 'Banker to Governments'
  | 'FinTech'
  | 'Miscellaneous'

/** Filter tags officers use; an item may apply to more than one. */
export type AudienceTag = 'Banks' | 'NBFCs' | 'PSPs'

export const AUDIENCE_FILTERS = ['All', 'Banks', 'NBFCs', 'PSPs'] as const
export type AudienceFilter = (typeof AUDIENCE_FILTERS)[number]

/** Optional per-item review stamp; UI falls back to CONTENT_LAST_REVIEWED. */
export interface ContentMeta {
  lastReviewed?: string
}

export type ApplicabilityLevel = 'Yes' | 'Partial' | 'No' | 'Case-by-case'

export interface ApplicabilityRow {
  entity: string
  applies: ApplicabilityLevel
  notes: string
}

export interface ChangeHistoryEntry {
  date: string
  label: string
  note: string
}

/** How officialPdfUrl should be presented in the UI. */
export type PdfMode = 'pdf' | 'index'

export interface MastersDirection extends ContentMeta {
  slug: string
  code: string
  title: string
  category: Category
  audience: string
  audiences: AudienceTag[]
  issued: string
  updated: string
  effectiveNote: string
  /** Short formal educational paraphrase */
  summary: string
  /** Longer plain-English educational paraphrase */
  plainEnglish: string
  /** Deeper formal summary for Plain/Formal toggle (falls back to summary) */
  formalSummary?: string
  obligations: string[]
  relatedTopics: string[]
  /** Related circular slugs in this prototype catalogue */
  relatedCircularSlugs?: string[]
  applicability?: ApplicabilityRow[]
  /** Prototype timeline — entries labeled illustrative in UI */
  changeHistory?: ChangeHistoryEntry[]
  toc: { id: string; label: string }[]
  sections: { id: string; heading: string; body: string }[]
  /**
   * Outbound link to official RBI PDF (rbidocs) when verified, or to the
   * Master Directions / Notifications index when no exact PDF was verified.
   * Never host RBI PDF binaries in this repo.
   */
  officialPdfUrl: string
  /** Optional official HTML listing / notification page on rbi.org.in */
  officialHtmlUrl?: string
  /** 'pdf' = direct document; 'index' = browse official catalogue */
  pdfMode: PdfMode
  /** Rich educational paraphrase vs PDF-link catalogue row */
  entryMode?: 'rich' | 'catalogue'
  /** Official “Updated as on …” label when known from the RBI index */
  updatedAsOnLabel?: string
  /** File size string from official index when known (e.g. “293 kb”) */
  fileSize?: string
}

export interface Circular extends ContentMeta {
  slug: string
  title: string
  category: Category
  date: string
  ref: string
  summary: string
  plainEnglish?: string
  formalSummary?: string
  body: string[]
  audience: string
  audiences: AudienceTag[]
  relatedTopics: string[]
  relatedDirectionSlugs?: string[]
  effectiveNote: string
  /** Outbound official PDF or Notifications index — never hosted locally */
  officialPdfUrl: string
  officialHtmlUrl?: string
  pdfMode: PdfMode
}

export interface NewsItem extends ContentMeta {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  body: string[]
  featured?: boolean
  /** Prefer outbound official What’s New / press when set */
  officialUrl?: string
}

export interface ReportRelatedLink {
  label: string
  href: string
  kind: 'policy' | 'data' | 'directions' | 'circulars'
}

export interface Report extends ContentMeta {
  slug: string
  title: string
  date: string
  type: string
  summary: string
  pages: number
  rich?: boolean
  variant?: 'fsr' | 'mpr' | 'annual' | 'payments'
  relatedLinks?: ReportRelatedLink[]
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

export function yearFromDate(iso: string): string {
  return iso.slice(0, 4)
}
