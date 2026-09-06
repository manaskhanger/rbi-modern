import type { Report } from './types'

export const reports: Report[] = [
  {
    slug: 'financial-stability-report-demo',
    title: 'Financial Stability Report — Illustrative Mid-Year Digest',
    date: '2025-12-01',
    type: 'Stability',
    pages: 48,
    rich: true,
    variant: 'fsr',
    summary:
      'Sample digest covering banking soundness, household leverage themes, and market volatility indicators with demo charts.',
    relatedLinks: [
      { label: 'Monetary policy desk', href: '/monetary-policy', kind: 'policy' },
      { label: 'Key rates & data charts', href: '/data', kind: 'data' },
      { label: 'Masters Directions catalogue', href: '/masters-directions', kind: 'directions' },
    ],
  },
  {
    slug: 'monetary-policy-report-demo',
    title: 'Monetary Policy Report — Sample Inflation & Growth Chapters',
    date: '2025-10-01',
    type: 'Monetary Policy',
    pages: 72,
    rich: true,
    variant: 'mpr',
    summary:
      'Educational chapters explaining forecasting fan charts, output gap concepts, and transmission channels — illustrative figures only.',
    relatedLinks: [
      { label: 'Monetary policy desk', href: '/monetary-policy', kind: 'policy' },
      { label: 'Macro data samples', href: '/data', kind: 'data' },
    ],
  },
  {
    slug: 'report-trend-banking-2025',
    title: 'Annual Report Style — Trend & Progress of Banking (Demo)',
    date: '2025-08-15',
    type: 'Annual / Banking',
    pages: 120,
    rich: true,
    variant: 'annual',
    summary:
      'Annual-report style chapters on balance-sheet growth, group-wise credit, digital adoption and capital — all illustrative sample figures.',
    relatedLinks: [
      { label: 'Masters Directions', href: '/masters-directions', kind: 'directions' },
      { label: 'Recent circulars', href: '/circulars', kind: 'circulars' },
      { label: 'Banking data samples', href: '/data', kind: 'data' },
      { label: 'Monetary policy', href: '/monetary-policy', kind: 'policy' },
    ],
  },
  {
    slug: 'payments-and-settlement-systems',
    title: 'Payments & Financial Inclusion — Illustrative Annual Review',
    date: '2025-05-20',
    type: 'Payments / Inclusion',
    pages: 64,
    rich: true,
    variant: 'payments',
    summary:
      'Volumes and values across UPI, IMPS, NEFT, RTGS plus financial-inclusion outreach metrics — educational charts only.',
    relatedLinks: [
      { label: 'Payment Aggregators MD', href: '/masters-directions/payment-aggregation', kind: 'directions' },
      { label: 'PPI Master Direction', href: '/masters-directions/prepaid-payment-instruments', kind: 'directions' },
      { label: 'Payments circulars', href: '/circulars', kind: 'circulars' },
      { label: 'Data desk', href: '/data', kind: 'data' },
    ],
  },
  {
    slug: 'handbook-statistics-excerpt',
    title: 'Handbook of Statistics — Selected Macro Tables (Demo)',
    date: '2025-03-01',
    type: 'Statistics',
    pages: 200,
    summary:
      'Curated demo tables for GDP, CPI, money aggregates and external sector indicators for classroom use.',
    relatedLinks: [{ label: 'Interactive data samples', href: '/data', kind: 'data' }],
  },
  {
    slug: 'currency-management-review',
    title: 'Currency Management Review — Clean Note & Logistics Themes',
    date: '2024-11-10',
    type: 'Currency',
    pages: 36,
    summary:
      'Explains indent planning, chest operations and counterfeit detection trends using illustrative data.',
    relatedLinks: [
      {
        label: 'Currency Distribution MD',
        href: '/masters-directions/currency-distribution',
        kind: 'directions',
      },
      { label: 'Currency chest circular', href: '/circulars/currency-chest-operations', kind: 'circulars' },
    ],
  },
]

/** ILLUSTRATIVE SAMPLE DATA — not an RBI publication extract */
export const sampleReportCharts = {
  capitalAdequacy: [
    { year: '2021', crar: 16.2 },
    { year: '2022', crar: 16.8 },
    { year: '2023', crar: 17.1 },
    { year: '2024', crar: 16.9 },
    { year: '2025', crar: 17.4 },
  ],
  npaTrend: [
    { year: '2021', gnpa: 7.5, nnpa: 2.4 },
    { year: '2022', gnpa: 5.8, nnpa: 1.7 },
    { year: '2023', gnpa: 3.9, nnpa: 1.0 },
    { year: '2024', gnpa: 3.2, nnpa: 0.8 },
    { year: '2025', gnpa: 2.8, nnpa: 0.7 },
  ],
  creditShare: [
    { name: 'Retail', value: 32 },
    { name: 'Industry', value: 28 },
    { name: 'Services', value: 24 },
    { name: 'Agriculture', value: 16 },
  ],
  tableRows: [
    { metric: 'CRAR (system)', value: '17.4%', note: 'Illustrative' },
    { metric: 'Gross NPA', value: '2.8%', note: 'Illustrative' },
    { metric: 'Provision coverage', value: '76%', note: 'Illustrative' },
    { metric: 'Credit growth (YoY)', value: '12.1%', note: 'Illustrative' },
    { metric: 'Deposit growth (YoY)', value: '10.4%', note: 'Illustrative' },
  ],
}

/** ILLUSTRATIVE SAMPLE DATA for Monetary Policy Report-style pages */
export const mprCharts = {
  inflationPath: [
    { quarter: 'Q1 FY25', actual: 4.8, forecast: 4.6, low: 3.8, high: 5.6 },
    { quarter: 'Q2 FY25', actual: 4.2, forecast: 4.1, low: 3.2, high: 5.1 },
    { quarter: 'Q3 FY25', actual: 3.6, forecast: 3.8, low: 2.8, high: 4.8 },
    { quarter: 'Q4 FY25', actual: null, forecast: 4.0, low: 3.0, high: 5.0 },
    { quarter: 'Q1 FY26', actual: null, forecast: 4.2, low: 3.1, high: 5.3 },
    { quarter: 'Q2 FY26', actual: null, forecast: 4.0, low: 2.9, high: 5.1 },
  ],
  growthPath: [
    { quarter: 'Q1 FY25', gdp: 6.7 },
    { quarter: 'Q2 FY25', gdp: 6.5 },
    { quarter: 'Q3 FY25', gdp: 6.4 },
    { quarter: 'Q4 FY25', gdp: 6.6 },
    { quarter: 'Q1 FY26', gdp: 6.8 },
    { quarter: 'Q2 FY26', gdp: 6.7 },
  ],
  transmission: [
    { channel: 'Money market', strength: 92 },
    { channel: 'Bank lending', strength: 74 },
    { channel: 'Deposit rates', strength: 68 },
    { channel: 'Bond yields', strength: 81 },
    { channel: 'Credit demand', strength: 55 },
  ],
  assumptions: [
    { item: 'Crude (Indian basket)', value: 'USD 80 / bbl', note: 'Sample assumption' },
    { item: 'Exchange rate (INR/USD)', value: '84.0', note: 'Sample assumption' },
    { item: 'Monsoon / food prices', value: 'Normal base case', note: 'Narrative only' },
    { item: 'Fiscal impulse', value: 'Neutral-to-mild', note: 'Illustrative' },
    { item: 'Global growth', value: 'Soft landing', note: 'Scenario label' },
  ],
}

/** ILLUSTRATIVE — Annual / Trend & Progress style */
export const annualCharts = {
  balanceSheet: [
    { year: 'FY21', assets: 180, deposits: 142, credit: 108 },
    { year: 'FY22', assets: 195, deposits: 152, credit: 118 },
    { year: 'FY23', assets: 212, deposits: 164, credit: 132 },
    { year: 'FY24', assets: 228, deposits: 176, credit: 148 },
    { year: 'FY25', assets: 246, deposits: 190, credit: 164 },
  ],
  groupCredit: [
    { group: 'Public sector', growth: 11.2 },
    { group: 'Private sector', growth: 14.8 },
    { group: 'Foreign banks', growth: 8.4 },
    { group: 'SFBs (sample)', growth: 18.1 },
  ],
  digitalAdoption: [
    { channel: 'Mobile / UPI', share: 48 },
    { channel: 'Internet banking', share: 22 },
    { channel: 'Branch / other', share: 18 },
    { channel: 'Cards / POS', share: 12 },
  ],
  snapshot: [
    { metric: 'System assets (₹ lakh cr, sample)', value: '246', note: 'Illustrative index' },
    { metric: 'Credit–deposit ratio', value: '86%', note: 'Illustrative' },
    { metric: 'CASA share', value: '41%', note: 'Illustrative' },
    { metric: 'Digital txn share of retail', value: '70%', note: 'Illustrative' },
    { metric: 'Branches (indexed)', value: '102', note: 'FY21=100 sample' },
  ],
}

/** ILLUSTRATIVE — Payments & financial inclusion */
export const paymentsCharts = {
  volumes: [
    { system: 'UPI', volume: 140, value: 20 },
    { system: 'IMPS', volume: 18, value: 8 },
    { system: 'NEFT', volume: 9, value: 35 },
    { system: 'RTGS', volume: 2, value: 55 },
    { system: 'Cards', volume: 25, value: 12 },
  ],
  upiTrend: [
    { month: 'Apr', bn: 11.2 },
    { month: 'May', bn: 11.8 },
    { month: 'Jun', bn: 12.4 },
    { month: 'Jul', bn: 13.1 },
    { month: 'Aug', bn: 13.6 },
    { month: 'Sep', bn: 14.0 },
  ],
  inclusion: [
    { indicator: 'PMJDY accounts (index)', value: 128 },
    { indicator: 'RuPay issuance (index)', value: 115 },
    { indicator: 'BC outlets (index)', value: 122 },
    { indicator: 'Women account share %', value: 56 },
  ],
  tableRows: [
    { metric: 'UPI monthly volume (bn, sample)', value: '14.0', note: 'Illustrative peak month' },
    { metric: 'Share of digital in retail payments', value: '82%', note: 'Illustrative' },
    { metric: 'Complaint resolution within TAT', value: '94%', note: 'Illustrative SLA' },
    { metric: 'Villages with BC access (index)', value: '119', note: 'FY21=100 sample' },
    { metric: 'PPI outstanding (index)', value: '108', note: 'Illustrative' },
  ],
}
