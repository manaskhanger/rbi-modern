/** ILLUSTRATIVE SAMPLE DATA — not live RBI / DBIE extracts. As-of labels are demo only. */
export const keyRatesAsOf = 'Nov 2025 (sample)'

export const keyRates = [
  { label: 'Policy Repo Rate', value: '5.50%', hint: 'Sample' },
  { label: 'SDF Rate', value: '5.25%', hint: 'Sample' },
  { label: 'MSF Rate', value: '5.75%', hint: 'Sample' },
  { label: 'Bank Rate', value: '5.75%', hint: 'Sample' },
  { label: 'CRR', value: '4.00%', hint: 'Sample' },
  { label: 'SLR', value: '18.00%', hint: 'Sample' },
]

export const policyRateHistory = [
  { month: 'Jan 24', repo: 6.5, inflation: 5.1 },
  { month: 'Mar 24', repo: 6.5, inflation: 4.9 },
  { month: 'May 24', repo: 6.5, inflation: 4.8 },
  { month: 'Jul 24', repo: 6.5, inflation: 3.6 },
  { month: 'Sep 24', repo: 6.5, inflation: 5.5 },
  { month: 'Nov 24', repo: 6.5, inflation: 5.5 },
  { month: 'Jan 25', repo: 6.5, inflation: 4.3 },
  { month: 'Mar 25', repo: 6.25, inflation: 3.3 },
  { month: 'May 25', repo: 6.0, inflation: 3.0 },
  { month: 'Jul 25', repo: 5.75, inflation: 2.1 },
  { month: 'Sep 25', repo: 5.5, inflation: 1.5 },
  { month: 'Nov 25', repo: 5.5, inflation: 2.0 },
]

export const dashboardPie = [
  { name: 'Foreign Currency Assets', value: 88 },
  { name: 'Gold', value: 8 },
  { name: 'SDRs & Other', value: 4 },
]

export const dashboardLine = [
  { month: 'Apr', upi: 12.1, neft: 0.7, rtgs: 0.25 },
  { month: 'May', upi: 12.8, neft: 0.72, rtgs: 0.26 },
  { month: 'Jun', upi: 13.4, neft: 0.74, rtgs: 0.27 },
  { month: 'Jul', upi: 14.0, neft: 0.76, rtgs: 0.28 },
  { month: 'Aug', upi: 14.6, neft: 0.78, rtgs: 0.29 },
  { month: 'Sep', upi: 15.2, neft: 0.8, rtgs: 0.3 },
]

export const dashboardBar = [
  { segment: 'Public Sector', credit: 62 },
  { segment: 'Private Sector', credit: 48 },
  { segment: 'Foreign', credit: 6 },
  { segment: 'SFBs', credit: 4 },
]

export const dashboardTable = [
  { id: 1, indicator: 'CPI Inflation (YoY)', latest: '2.0%', previous: '1.5%', unit: '%', category: 'Prices' },
  { id: 2, indicator: 'Repo Rate', latest: '5.50%', previous: '5.50%', unit: '%', category: 'Policy' },
  { id: 3, indicator: 'G-Sec 10Y Yield', latest: '6.75%', previous: '6.82%', unit: '%', category: 'Markets' },
  { id: 4, indicator: 'USD/INR', latest: '84.10', previous: '83.95', unit: 'INR', category: 'Forex' },
  { id: 5, indicator: 'FX Reserves', latest: '678 bn', previous: '670 bn', unit: 'USD', category: 'External' },
  { id: 6, indicator: 'Bank Credit YoY', latest: '12.1%', previous: '11.8%', unit: '%', category: 'Banking' },
  { id: 7, indicator: 'Bank Deposits YoY', latest: '10.4%', previous: '10.1%', unit: '%', category: 'Banking' },
  { id: 8, indicator: 'UPI Volume', latest: '15.2 bn', previous: '14.6 bn', unit: 'txn', category: 'Payments' },
  { id: 9, indicator: 'Gross NPA (SCBs)', latest: '2.8%', previous: '3.2%', unit: '%', category: 'Banking' },
  { id: 10, indicator: 'CRAR (SCBs)', latest: '17.4%', previous: '16.9%', unit: '%', category: 'Banking' },
  { id: 11, indicator: 'Current Account / GDP', latest: '-0.8%', previous: '-1.1%', unit: '%', category: 'External' },
  { id: 12, indicator: 'GDP Growth (est.)', latest: '6.8%', previous: '6.5%', unit: '%', category: 'Growth' },
]

export const dataFootnote =
  'Illustrative · not for compliance. Sources: illustrative composite for UX prototyping — not an RBI DBIE extract or official statistical release. Always defer to rbi.org.in / data.rbi.org.in (DBIE) for authoritative series.'

/** Short methodology one-liners for chart footnotes (sample data only). */
export const chartMethodology = {
  fxReserves:
    'Methodology (sample): invented composition shares for pie-layout review — not a Weekly Statistical Supplement extract.',
  payments:
    'Methodology (sample): invented monthly volumes (bn transactions) to exercise line charts — not NPCI / RBI payment statistics.',
  bankCredit:
    'Methodology (sample): relative credit index by bank group, scaled for bar demo — not a BSR / DBIE credit series.',
  policyRates:
    'Methodology (sample): stylised repo vs CPI path for band visualisation — not MPC minutes or CPI releases.',
  indicatorsTable:
    'Methodology (sample): hand-authored indicator rows for search/sort/CSV UX — not an official statistical table.',
} as const

/**
 * Honest “official structure” panels for link-out mode.
 * No fabricated live numbers — only series names + where officers should look.
 */
export const officialStructurePanels = [
  {
    id: 'fx-reserves',
    title: 'Foreign exchange reserves',
    structure: 'Typical DBIE / WSS presentation: foreign currency assets, gold, SDRs, reserve tranche — levels and week-on-week changes.',
    where: 'RBI Database on Indian Economy (DBIE) and Weekly Statistical Supplement on rbi.org.in',
    hrefKey: 'dbie' as const,
  },
  {
    id: 'payments',
    title: 'Payment system volumes & values',
    structure: 'Retail and wholesale systems (UPI, NEFT, RTGS, IMPS, cards) by month — volume and value tables.',
    where: 'RBI Statistics / payment system indicators; also DBIE time-series tables',
    hrefKey: 'statistics' as const,
  },
  {
    id: 'bank-credit',
    title: 'Bank group credit & deposits',
    structure: 'Scheduled commercial banks by ownership group — credit, deposits, and year-on-year growth.',
    where: 'DBIE banking statistics and RBI Bulletin / Handbook tables',
    hrefKey: 'dbie' as const,
  },
  {
    id: 'key-indicators',
    title: 'Macro & financial indicators',
    structure: 'Prices, policy rates, markets, forex, external sector, banking soundness — multi-frequency series.',
    where: 'DBIE subject-area tables; confirm policy rates on the monetary policy section of rbi.org.in',
    hrefKey: 'dbie' as const,
  },
] as const
