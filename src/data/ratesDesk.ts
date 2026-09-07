/** ILLUSTRATIVE rates desk panels — not live RBI / FBIL extracts. */

export const ratesDeskAsOf = 'Sample desk · Nov 2025 layout'

export type RateRow = { label: string; value: string; note?: string }

export type RatesPanel = {
  id: string
  title: string
  titleHi: string
  sourceLabel: string
  sourceHref: string
  rows: RateRow[]
}

export const ratesPanels: RatesPanel[] = [
  {
    id: 'policy',
    title: 'Policy Rates',
    titleHi: 'नीति दरें',
    sourceLabel: 'Official policy rates on rbi.org.in',
    sourceHref: 'https://www.rbi.org.in/Scripts/BS_ViewMonetaryCreditPolicy.aspx',
    rows: [
      { label: 'Policy Repo Rate', value: '5.50%' },
      { label: 'Standing Deposit Facility (SDF)', value: '5.25%' },
      { label: 'Marginal Standing Facility (MSF)', value: '5.75%' },
      { label: 'Bank Rate', value: '5.75%' },
      { label: 'Fixed Reverse Repo Rate', value: '3.35%' },
    ],
  },
  {
    id: 'reserves',
    title: 'Reserve Ratios',
    titleHi: 'आरक्षित अनुपात',
    sourceLabel: 'Confirm CRR / SLR on rbi.org.in',
    sourceHref: 'https://www.rbi.org.in/Scripts/BS_ViewMonetaryCreditPolicy.aspx',
    rows: [
      { label: 'Cash Reserve Ratio (CRR)', value: '4.00%' },
      { label: 'Statutory Liquidity Ratio (SLR)', value: '18.00%' },
    ],
  },
  {
    id: 'fx',
    title: 'Exchange Rates',
    titleHi: 'विनिमय दरें',
    sourceLabel: 'FBIL / RBI reference rates',
    sourceHref: 'https://www.fbil.org.in/',
    rows: [
      { label: 'USD / INR', value: '84.10' },
      { label: 'GBP / INR', value: '108.45' },
      { label: 'EUR / INR', value: '91.20' },
      { label: 'JPY / INR (100)', value: '55.80' },
      { label: 'AED / INR', value: '22.90' },
    ],
  },
  {
    id: 'gsec',
    title: 'G-Secs / T-bills',
    titleHi: 'सरकारी प्रतिभूतियाँ',
    sourceLabel: 'RBI financial markets / auction pages',
    sourceHref: 'https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx',
    rows: [
      { label: '91-Day T-bill (indicative)', value: '6.35%' },
      { label: '182-Day T-bill (indicative)', value: '6.48%' },
      { label: '364-Day T-bill (indicative)', value: '6.55%' },
      { label: '10Y G-Sec yield (sample)', value: '6.75%' },
      { label: '5Y G-Sec yield (sample)', value: '6.62%' },
    ],
  },
  {
    id: 'capital',
    title: 'Capital Market (sample)',
    titleHi: 'पूँजी बाज़ार',
    sourceLabel: 'Exchange websites (not RBI)',
    sourceHref: 'https://www.rbi.org.in/',
    rows: [
      { label: 'Sensex (illustrative close)', value: '81,250' },
      { label: 'Nifty 50 (illustrative close)', value: '24,780' },
    ],
  },
]

export const ratesDeskDisclaimer =
  'Illustrative · not for compliance. Sample figures for UX density only — never treat as live policy, FBIL, or market data. Confirm on rbi.org.in / FBIL before any decision.'
