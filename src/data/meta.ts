/** Shared prototype metadata — not live RBI publication dates. */
export const CONTENT_LAST_REVIEWED = '2026-09-07'

export const RBI_HOME = 'https://www.rbi.org.in/'

/** Official RBI data portal (DBIE). Live series only on this site — not mirrored here. */
export const RBI_DBIE = 'https://data.rbi.org.in/'

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
  citizens: {
    href: 'https://www.rbi.org.in/',
    label: 'Citizen resources on rbi.org.in',
    sectionNote: 'Official RBI website — citizen / public services',
  },
  withdrawnNotifications: {
    href: 'https://www.rbi.org.in/Scripts/NotificationUser.aspx',
    label: 'Notifications on rbi.org.in',
    sectionNote: 'Official notifications index (incl. historical)',
  },
  policyRates: {
    href: 'https://www.rbi.org.in/Scripts/BS_ViewMonetaryCreditPolicy.aspx',
    label: 'Official policy rates on rbi.org.in',
    sectionNote: 'Monetary / credit policy section — confirm current rates on rbi.org.in',
  },
  dbie: {
    href: RBI_DBIE,
    label: 'Open RBI DBIE (data.rbi.org.in)',
    sectionNote: 'Database on Indian Economy — live official time series',
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
