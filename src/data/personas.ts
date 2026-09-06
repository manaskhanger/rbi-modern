/** Prescribed starting paths for demo personas — educational framing only. */

export type PersonaId = 'banker' | 'student' | 'journalist'

export interface PersonaPath {
  label: string
  to: string
}

export interface Persona {
  id: PersonaId
  title: string
  shortTitle: string
  blurb: string
  pathSummary: string
  /** Primary deep-link into the prescribed starting route */
  startTo: string
  paths: PersonaPath[]
}

export const personas: Persona[] = [
  {
    id: 'banker',
    title: 'Banker / compliance officer',
    shortTitle: 'Banker',
    blurb:
      'Browse Masters Directions and circulars filtered for Banks — useful for orientation on how regulatory catalogues might be structured.',
    pathSummary: 'Directions + Circulars · audience: Banks',
    startTo: '/masters-directions?audience=Banks',
    paths: [
      { label: 'Masters Directions (Banks)', to: '/masters-directions?audience=Banks' },
      { label: 'Circulars (Banks)', to: '/circulars?audience=Banks' },
      { label: 'Sample KYC Direction', to: '/masters-directions/know-your-customer' },
    ],
  },
  {
    id: 'student',
    title: 'Student',
    shortTitle: 'Student',
    blurb:
      'Start with explainers, monetary policy framing, and the glossary — built for central-banking literacy, not exams or compliance.',
    pathSummary: 'Learn · Monetary policy · Glossary',
    startTo: '/learn',
    paths: [
      { label: 'Learn & function map', to: '/learn' },
      { label: 'Monetary policy', to: '/monetary-policy' },
      { label: 'Glossary', to: '/learn#glossary' },
    ],
  },
  {
    id: 'journalist',
    title: 'Journalist',
    shortTitle: 'Journalist',
    blurb:
      'Sample news cards, report summaries, and the data lab in sample mode — always labelled illustrative; cite rbi.org.in for real figures.',
    pathSummary: 'News · Reports · Data (sample mode)',
    startTo: '/news',
    paths: [
      { label: 'Sample news', to: '/news' },
      { label: 'Reports', to: '/reports' },
      { label: 'Data lab (sample)', to: '/data?mode=sample' },
    ],
  },
]
