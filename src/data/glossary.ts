import type { GlossaryTerm } from './types'

export const glossary: GlossaryTerm[] = [
  {
    term: 'Repo Rate',
    definition:
      'The interest rate at which RBI lends short-term funds to banks against eligible collateral. It is the primary policy rate signalling the monetary policy stance.',
    related: ['Reverse Repo Rate', 'Standing Deposit Facility'],
  },
  {
    term: 'Reverse Repo Rate',
    definition:
      'The rate at which banks park surplus funds with RBI. Together with other corridor tools, it helps bound overnight money-market rates.',
    related: ['Repo Rate'],
  },
  {
    term: 'Standing Deposit Facility (SDF)',
    definition:
      'A facility allowing banks to place funds with RBI without collateral, forming the floor of the liquidity adjustment corridor in recent frameworks.',
    related: ['Repo Rate', 'Liquidity Adjustment Facility'],
  },
  {
    term: 'Monetary Policy Committee (MPC)',
    definition:
      'A six-member committee that decides the policy repo rate by majority vote to achieve the inflation target while keeping growth in mind.',
    related: ['Inflation Targeting', 'Repo Rate'],
  },
  {
    term: 'Inflation Targeting',
    definition:
      'A framework where RBI aims to keep CPI inflation at 4% with a tolerance band of ±2%, subject to the Government’s inflation target notification.',
    related: ['MPC', 'CPI'],
  },
  {
    term: 'CPI',
    definition:
      'Consumer Price Index — the headline inflation measure used for India’s flexible inflation targeting framework.',
    related: ['Inflation Targeting'],
  },
  {
    term: 'CRR',
    definition:
      'Cash Reserve Ratio — the share of net demand and time liabilities that banks must keep as cash balances with RBI.',
    related: ['SLR', 'Liquidity'],
  },
  {
    term: 'SLR',
    definition:
      'Statutory Liquidity Ratio — the share of liabilities banks must hold in approved securities such as government bonds.',
    related: ['CRR'],
  },
  {
    term: 'LAF',
    definition:
      'Liquidity Adjustment Facility — repo, reverse repo and related operations RBI uses to manage banking system liquidity day to day.',
    related: ['Repo Rate', 'SDF'],
  },
  {
    term: 'NPA',
    definition:
      'Non-Performing Asset — a loan where interest or principal is overdue beyond the regulatory threshold (typically 90 days for term loans).',
    related: ['Provision Coverage'],
  },
  {
    term: 'UPI',
    definition:
      'Unified Payments Interface — a real-time payment system enabling instant account-to-account transfers via mobile apps, operated by NPCI with RBI oversight of the payment system.',
    related: ['Payment System'],
  },
  {
    term: 'FEMA',
    definition:
      'Foreign Exchange Management Act — the law under which RBI and the Government regulate cross-border foreign exchange transactions.',
    related: ['LRS'],
  },
  {
    term: 'LRS',
    definition:
      'Liberalised Remittance Scheme — allows resident individuals to remit abroad up to a notified limit per financial year for permitted current and capital account purposes.',
    related: ['FEMA'],
  },
  {
    term: 'NBFC',
    definition:
      'Non-Banking Financial Company — a company registered under the Companies Act and regulated by RBI that provides financial services without holding a full banking licence.',
    related: ['Scale-Based Regulation'],
  },
  {
    term: 'Payment System',
    definition:
      'A system enabling payment instructions between participants — from cheques and cards to RTGS and UPI — authorised and overseen by RBI under the PSS Act.',
    related: ['UPI', 'RTGS'],
  },
  {
    term: 'RTGS',
    definition:
      'Real Time Gross Settlement — continuous settlement of high-value funds transfers on a gross basis in real time.',
    related: ['NEFT', 'Payment System'],
  },
  {
    term: 'NEFT',
    definition:
      'National Electronic Funds Transfer — a deferred net settlement system for electronic retail credit transfers across India.',
    related: ['RTGS', 'UPI'],
  },
  {
    term: 'Financial Stability',
    definition:
      'A condition where the financial system intermediates funds smoothly even under stress, without cascading failures. RBI monitors risks via macroprudential tools and the Financial Stability Report.',
    related: ['Macroprudential Policy'],
  },
]

export const howRbiWorks = [
  {
    id: 'money',
    title: 'Keeping prices stable',
    icon: 'Target',
    text: 'Through the MPC, RBI adjusts the policy repo rate and liquidity tools so inflation stays near the target while supporting sustainable growth.',
  },
  {
    id: 'banks',
    title: 'Watching over banks & NBFCs',
    icon: 'Building2',
    text: 'Licensing, capital rules, inspections and corrective action help ensure depositors’ money is handled prudently.',
  },
  {
    id: 'payments',
    title: 'Making payments work',
    icon: 'Smartphone',
    text: 'RBI authorises and oversees payment systems so transfers clear safely — from paper instruments to UPI and card networks.',
  },
  {
    id: 'currency',
    title: 'Issuing currency',
    icon: 'Banknote',
    text: 'Banknotes carry the RBI Governor’s promise to pay. Distribution, clean-note policy and counterfeit detection keep cash trustworthy.',
  },
  {
    id: 'forex',
    title: 'Managing foreign exchange',
    icon: 'Globe2',
    text: 'Reserves, market operations and FEMA regulations support orderly forex markets and external resilience.',
  },
  {
    id: 'stability',
    title: 'Guarding financial stability',
    icon: 'Shield',
    text: 'Macroprudential buffers, stress tests and systemic oversight reduce the chance that one failure spreads across the system.',
  },
]
