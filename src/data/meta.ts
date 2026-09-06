/** Shared prototype metadata — not live RBI publication dates. */
export const CONTENT_LAST_REVIEWED = '2026-09-06'

export const RBI_HOME = 'https://www.rbi.org.in/'

/** Sensible official section URLs on rbi.org.in (not deep-links to specific sample docs). */
export const RBI_SECTIONS = {
  home: {
    href: RBI_HOME,
    label: 'Authoritative source on rbi.org.in',
  },
  mastersDirections: {
    href: 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx',
    label: 'Authoritative source on rbi.org.in',
    sectionNote: 'Official RBI website (Master Directions)',
  },
  notifications: {
    href: 'https://www.rbi.org.in/Scripts/NotificationUser.aspx',
    label: 'Authoritative source on rbi.org.in',
    sectionNote: 'Official RBI website (Notifications)',
  },
  pressReleases: {
    href: 'https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx',
    label: 'Authoritative source on rbi.org.in',
    sectionNote: 'Official RBI website (Press Releases)',
  },
  publications: {
    href: 'https://www.rbi.org.in/Scripts/Publications.aspx',
    label: 'Authoritative source on rbi.org.in',
    sectionNote: 'Official RBI website (Publications)',
  },
  statistics: {
    href: 'https://www.rbi.org.in/Scripts/Statistics.aspx',
    label: 'Authoritative source on rbi.org.in',
    sectionNote: 'Official RBI website (Statistics)',
  },
  monetaryPolicy: {
    href: 'https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx',
    label: 'Authoritative source on rbi.org.in',
    sectionNote: 'Official RBI website (section) — MPC / policy releases',
  },
} as const

export type RbiSectionKey = keyof typeof RBI_SECTIONS

export function formatContentReviewed(isoDate?: string): string {
  const date = isoDate ?? CONTENT_LAST_REVIEWED
  const d = new Date(`${date}T12:00:00Z`)
  const formatted = d.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'Asia/Kolkata',
  })
  return `Content reviewed: ${formatted} (prototype)`
}
