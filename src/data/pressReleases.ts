/** Illustrative press-release listing for the educational prototype — not live RBI copy. */

export type PressCategory =
  | 'Monetary Policy'
  | 'Appointments'
  | 'Data Release'
  | 'Regulation'
  | 'Payments'
  | 'Financial Inclusion'
  | 'Markets'
  | 'Currency'

export interface PressRelease {
  slug: string
  title: string
  /** ISO date YYYY-MM-DD */
  date: string
  /** Short hand-written plain-language gist — specific, not templated */
  gist: string
  category?: PressCategory
  /** Prefer the official press index; avoid invented prid deep-links */
  officialUrl?: string
}

const OFFICIAL_PRESS_INDEX =
  'https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx'

export const pressReleases: PressRelease[] = [
  {
    slug: 'mpc-repo-hold-illustrative-dec',
    title:
      'Monetary Policy Committee keeps the policy repo rate unchanged; stance remains data-dependent',
    date: '2025-12-05',
    category: 'Monetary Policy',
    gist: 'Illustrative note: the Committee left the repo where it was, flagged sticky food prices against cooling core inflation, and said the next move still hinges on incoming CPI and growth prints rather than a pre-committed path.',
    officialUrl: OFFICIAL_PRESS_INDEX,
  },
  {
    slug: 'weekly-statistical-supplement-sample',
    title: 'Weekly Statistical Supplement — selected aggregates for the latest reporting week',
    date: '2025-11-28',
    category: 'Data Release',
    gist: 'Prototype digest of how a WSS-style release surfaces reserve money, credit growth, and deposit aggregates in one table pack — figures here are sample placeholders, not the live DBIE download.',
    officialUrl: OFFICIAL_PRESS_INDEX,
  },
  {
    slug: 'deputy-governor-appointment-demo',
    title: 'Appointment of Deputy Governor — illustrative personnel announcement',
    date: '2025-11-12',
    category: 'Appointments',
    gist: 'Educational mock: names the role, the tenure convention, and the portfolio hand-off language typical of RBI personnel releases, without claiming a real appointment event.',
    officialUrl: OFFICIAL_PRESS_INDEX,
  },
  {
    slug: 'upi-transaction-limits-clarification',
    title: 'Clarification on UPI person-to-merchant transaction limits in select corridors',
    date: '2025-10-24',
    category: 'Payments',
    gist: 'Explains that any ceiling change would be communicated through official channels to banks and PSPs; this card only sketches how such a press note separates merchant QR caps from P2P wallet rules.',
    officialUrl: OFFICIAL_PRESS_INDEX,
  },
  {
    slug: 'nbFc-scale-based-framework-reminder',
    title: 'Reminder on Scale-Based Regulation for NBFCs — supervisory expectations refresher',
    date: '2025-10-09',
    category: 'Regulation',
    gist: 'Walks through why middle- and upper-layer NBFCs see tighter governance and capital disclosures than base-layer peers, framed as a learning press-desk paraphrase rather than a new direction.',
    officialUrl: OFFICIAL_PRESS_INDEX,
  },
  {
    slug: 'financial-inclusion-index-release',
    title: 'Reserve Bank releases illustrative Financial Inclusion Index update',
    date: '2025-09-18',
    category: 'Financial Inclusion',
    gist: 'Describes the three-pillar FI-Index story — access, usage, and quality — and stresses that district-level gaps still matter even when the all-India score looks steady year on year.',
    officialUrl: OFFICIAL_PRESS_INDEX,
  },
  {
    slug: 'g-sec-auction-result-style-note',
    title: 'Result of the auction of Government of India Dated Securities — style sample',
    date: '2025-09-02',
    category: 'Markets',
    gist: 'Shows how a press desk would list notified amounts, cut-off yields, and devolvement language for a dated G-Sec auction without republishing live PDO figures on this site.',
    officialUrl: OFFICIAL_PRESS_INDEX,
  },
  {
    slug: 'co-operative-bank-licensing-guidelines-note',
    title: 'Draft guidelines on licensing of new Urban Co-operative Banks — feedback window',
    date: '2025-08-21',
    category: 'Regulation',
    gist: 'Invitation-style mock asking stakeholders to comment on capital, governance, and area-of-operation tests before any final circular is issued on rbi.org.in.',
    officialUrl: OFFICIAL_PRESS_INDEX,
  },
  {
    slug: 'fx-reserves-weekly-update-demo',
    title: 'Foreign Exchange Reserves — weekly position (illustrative)',
    date: '2025-08-08',
    category: 'Data Release',
    gist: 'Plain-language framing of FCA, gold, SDRs, and reserve-tranche components so learners can read a reserves bulletin without treating the sample totals as market-moving numbers.',
    officialUrl: OFFICIAL_PRESS_INDEX,
  },
  {
    slug: 'ombudsman-scheme-awareness-drive',
    title: 'Awareness campaign on the Reserve Bank – Integrated Ombudsman Scheme',
    date: '2025-07-22',
    category: 'Financial Inclusion',
    gist: 'Urges customers to exhaust the bank’s own grievance desk first, then escalate via the CMS portal — and reminds that RBI never asks for OTPs when handling complaints.',
    officialUrl: OFFICIAL_PRESS_INDEX,
  },
  {
    slug: 'banknote-withdrawal-of-soiled-notes',
    title: 'Facility for exchange of soiled and mutilated notes at bank branches',
    date: '2025-07-03',
    category: 'Currency',
    gist: 'Restates that branches must accept specified soiled notes for exchange under Note Refund Rules, and that refusing a genuine note without cause is not acceptable service.',
    officialUrl: OFFICIAL_PRESS_INDEX,
  },
  {
    slug: 'external-commercial-borrowings-policy-tweak',
    title: 'Rationalisation of External Commercial Borrowings reporting timelines',
    date: '2025-06-16',
    category: 'Regulation',
    gist: 'Prototype summary: AD banks get a clearer filing calendar for ECB Form II returns, aimed at cutting late submissions rather than changing eligible end-uses.',
    officialUrl: OFFICIAL_PRESS_INDEX,
  },
  {
    slug: 'mpc-minutes-publication-schedule',
    title: 'Minutes of the Monetary Policy Committee meeting — publication schedule note',
    date: '2025-06-01',
    category: 'Monetary Policy',
    gist: 'Explains the usual lag between the rate decision and the detailed minutes so readers know where dissent, forecasts, and risk assessments appear after the headline statement.',
    officialUrl: OFFICIAL_PRESS_INDEX,
  },
  {
    slug: 'fintech-sandbox-cohort-announcement',
    title: 'Regulatory sandbox — indicative themes for the next cohort (educational)',
    date: '2025-05-14',
    category: 'Payments',
    gist: 'Lists sample theme buckets such as offline payments resilience and KYC friction reduction, while clarifying that live cohort invitations are issued only through official RBI notices.',
    officialUrl: OFFICIAL_PRESS_INDEX,
  },
]

export function formatPressDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`)
  return d.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Kolkata',
  })
}
