import { RBI_HOME } from './meta'

/** Five calm stops for the ~60-second guided tour. */

export interface TourStep {
  id: string
  title: string
  body: string
  /** In-app route or external URL */
  ctaLabel: string
  ctaTo?: string
  ctaHref?: string
  hint?: string
}

export const tourSteps: TourStep[] = [
  {
    id: 'purpose',
    title: 'Purpose of this prototype',
    body: 'This is an unofficial educational / UX concept exploring clearer public communication of India’s central bank — mandate, Masters Directions, circulars, reports and data. It is not affiliated with RBI and does not impersonate rbi.org.in.',
    ctaLabel: 'About this prototype',
    ctaTo: '/about/prototype',
    hint: '~10 seconds',
  },
  {
    id: 'mandate',
    title: 'About & mandate',
    body: 'The About page sketches the public mandate and an illustrative organisation schematic — useful framing for officers reviewing communication design and for students building literacy.',
    ctaLabel: 'Open About',
    ctaTo: '/about',
    hint: '~10 seconds',
  },
  {
    id: 'direction',
    title: 'One Masters Direction',
    body: 'Open a sample Masters Direction (KYC) to see educational paraphrases, plain/formal tone, applicability notes and related circulars. Sample reference codes only — not official text.',
    ctaLabel: 'Open sample KYC Direction',
    ctaTo: '/masters-directions/know-your-customer',
    hint: '~15 seconds',
  },
  {
    id: 'data',
    title: 'Data sample disclaimer',
    body: 'The Data lab ships in sample mode: illustrative charts and a CSV export labelled “not for compliance”. Switch to official-structure panels that link out to DBIE / rbi.org.in — no fake live series.',
    ctaLabel: 'Open Data (sample mode)',
    ctaTo: '/data?mode=sample',
    hint: '~10 seconds',
  },
  {
    id: 'official',
    title: 'Always defer to rbi.org.in',
    body: 'For authoritative instruments, rates, notifications and publications, use the Reserve Bank of India website. This prototype is a communication concept only.',
    ctaLabel: 'Open rbi.org.in',
    ctaHref: RBI_HOME,
    hint: 'Finish',
  },
]

export const TOUR_DURATION_LABEL = '~60 seconds'
