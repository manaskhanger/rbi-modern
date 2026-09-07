import type { PdfMode } from '../data/types'

export const MD_INDEX_URL = 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx'
export const NOTIFICATIONS_INDEX_URL = 'https://www.rbi.org.in/Scripts/NotificationUser.aspx'

export type OfficialDocFields = {
  officialPdfUrl: string
  officialHtmlUrl?: string
  pdfMode: PdfMode
}

/** Primary outbound target (PDF when verified, else official index / listing). */
export function officialOpenUrl(doc: OfficialDocFields): string {
  return doc.officialPdfUrl
}

export function officialCtaLabel(mode: PdfMode): string {
  return mode === 'index' ? 'Open official document on RBI' : 'Open official PDF'
}

export function officialButtonLabel(mode: PdfMode): string {
  return mode === 'index' ? 'Open on RBI (official)' : 'Open PDF'
}

export function officialViewerPath(doc: OfficialDocFields): string {
  const src = encodeURIComponent(officialOpenUrl(doc))
  return `/viewer?src=${src}`
}
