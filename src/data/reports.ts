import type { Report } from './types'

export const reports: Report[] = [
  {
    slug: 'financial-stability-report-demo',
    title: 'Financial Stability Report — Illustrative Mid-Year Digest',
    date: '2025-12-01',
    type: 'Stability',
    pages: 48,
    rich: true,
    summary:
      'Sample digest covering banking soundness, household leverage themes, and market volatility indicators with demo charts.',
  },
  {
    slug: 'monetary-policy-report-demo',
    title: 'Monetary Policy Report — Sample Inflation & Growth Chapters',
    date: '2025-10-01',
    type: 'Monetary Policy',
    pages: 72,
    summary:
      'Educational chapters explaining forecasting fan charts, output gap concepts, and transmission channels.',
  },
  {
    slug: 'report-trend-banking-2025',
    title: 'Report on Trend and Progress of Banking in India (Demo Extract)',
    date: '2025-08-15',
    type: 'Banking',
    pages: 120,
    summary:
      'High-level narrative on credit growth, asset quality and digital adoption across bank groups — sample figures only.',
  },
  {
    slug: 'payments-and-settlement-systems',
    title: 'Payment and Settlement Systems — Annual Illustrative Review',
    date: '2025-05-20',
    type: 'Payments',
    pages: 64,
    summary:
      'Volumes and values across UPI, IMPS, NEFT, RTGS and card networks with consumer protection notes.',
  },
  {
    slug: 'handbook-statistics-excerpt',
    title: 'Handbook of Statistics — Selected Macro Tables (Demo)',
    date: '2025-03-01',
    type: 'Statistics',
    pages: 200,
    summary:
      'Curated demo tables for GDP, CPI, money aggregates and external sector indicators for classroom use.',
  },
  {
    slug: 'currency-management-review',
    title: 'Currency Management Review — Clean Note & Logistics Themes',
    date: '2024-11-10',
    type: 'Currency',
    pages: 36,
    summary:
      'Explains indent planning, chest operations and counterfeit detection trends using illustrative data.',
  },
]

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
