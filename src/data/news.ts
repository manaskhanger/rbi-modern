import type { NewsItem } from './types'

export const newsItems: NewsItem[] = [
  {
    slug: 'mpc-october-demo-decision',
    title: 'MPC Holds Policy Repo Rate; Focus Remains on Durable Disinflation',
    date: '2025-12-05',
    category: 'Monetary Policy',
    featured: true,
    excerpt:
      'Illustrative summary: the committee kept the policy repo unchanged and reiterated a data-dependent stance.',
    body: [
      'In this educational mock briefing, the Monetary Policy Committee kept the policy repo rate unchanged while assessing evolving inflation and growth trade-offs.',
      'Members discussed food price volatility, global financial conditions, and the transmission of past actions into lending rates.',
      'The illustrative decision emphasises that real-world MPC outcomes are published only through official RBI channels.',
      'Liquidity conditions were described as adequate, with fine-tuning operations available as needed.',
    ],
  },
  {
    slug: 'financial-literacy-week-2025',
    title: 'Financial Literacy Week Highlights Digital Safety for First-Time Users',
    date: '2025-11-14',
    category: 'Financial Inclusion',
    featured: true,
    excerpt:
      'Campaign materials urge citizens to verify UPI handles, avoid sharing OTPs, and use official banking apps.',
    body: [
      'An educational week-long drive focused on safe digital payments, grievance portals, and basic saving habits.',
      'Partner banks hosted branch-level clinics explaining RuPay, AEPS, and complaint escalation paths.',
      'Materials stressed that RBI never asks for passwords or OTPs over phone or social media.',
    ],
  },
  {
    slug: 'cbdc-pilot-retail-update',
    title: 'e₹ Retail Pilot Adds Offline Capability in Select Corridors',
    date: '2025-10-02',
    category: 'Payments',
    featured: true,
    excerpt:
      'Demo note on expanding the central bank digital currency retail pilot with limited offline payments.',
    body: [
      'The illustrative update describes controlled offline e₹ transactions for low-connectivity settings.',
      'Wallet limits, merchant acceptance, and reconciliation rules remain subject to pilot design.',
      'Feedback from users informs future architecture choices; this is not a launch announcement.',
    ],
  },
  {
    slug: 'priority-sector-review',
    title: 'Priority Sector Lending Targets — Mid-Year Review Snapshot',
    date: '2025-08-19',
    category: 'Banking',
    excerpt:
      'Banks collectively tracked closer to agriculture and MSME sub-targets in the illustrative mid-year view.',
    body: [
      'Priority sector norms channel credit to agriculture, MSMEs, education, housing and other notified segments.',
      'This educational snapshot shows how supervisors monitor achievement and trading of PSL certificates.',
      'Figures on this demo site are sample data only.',
    ],
  },
  {
    slug: 'climate-risk-disclosure-draft',
    title: 'Draft Climate Risk Disclosure Expectations for Large Banks',
    date: '2025-07-08',
    category: 'Supervision',
    excerpt:
      'Consultation-style note inviting feedback on governance, strategy and metrics for climate-related financial risk.',
    body: [
      'Large banks would describe board oversight of climate risk, scenario analysis, and financed-emissions metrics.',
      'The draft emphasises proportionality and phased timelines — illustrative content for learners.',
      'Final directions, if any, would appear only on official RBI platforms.',
    ],
  },
  {
    slug: 'fx-reserves-commentary',
    title: 'Foreign Exchange Reserves Remain Comfortable vs Import Cover',
    date: '2025-06-01',
    category: 'Markets',
    excerpt:
      'Educational commentary on why reserve buffers matter for external resilience.',
    body: [
      'Reserves include foreign currency assets, gold, SDRs and reserve tranche position with the IMF.',
      'Import cover and short-term external debt ratios are common rules of thumb — not formal targets on this demo.',
      'Intervention in FX markets, when undertaken, aims to curb disorderly volatility rather than defend a fixed level.',
    ],
  },
  {
    slug: 'payments-vision-progress',
    title: 'Payments Vision — Progress on Interoperability and User Protection',
    date: '2025-04-22',
    category: 'Payments',
    excerpt:
      'Status note on faster complaint resolution, QR standardisation and cross-border UPI linkages (illustrative).',
    body: [
      'Interoperable payments reduce friction for users who switch apps or banks.',
      'User protection workstreams include spoofing controls and clearer liability frameworks for unauthorised transactions.',
      'Cross-border pilots are staged carefully with reciprocal oversight.',
    ],
  },
  {
    slug: 'ombudsman-annual-highlights',
    title: 'Integrated Ombudsman Scheme — Annual Highlights for Learners',
    date: '2025-02-11',
    category: 'Consumer Protection',
    excerpt:
      'Most complaints related to digital payments and credit cards; turnaround times improved in the sample narrative.',
    body: [
      'The Ombudsman mechanism offers a cost-free escalation path after the regulated entity’s own grievance process.',
      'Banks are expected to analyse root causes of repeat complaint categories.',
      'This article paraphrases themes for education; consult official reports for statistics.',
    ],
  },
  {
    slug: 'banknote-design-education',
    title: 'How Security Features Help You Spot Genuine Banknotes',
    date: '2024-12-18',
    category: 'Currency',
    excerpt:
      'A plain-English walkthrough of watermarks, see-through registers, and colour-shifting ink.',
    body: [
      'Hold notes to light to view watermarks and security threads; tilt to observe colour shifts.',
      'Banks train cashiers and deploy machines that detect counterfeits.',
      'If you receive a suspect note, do not try to pass it on — follow bank guidance for impounding.',
    ],
  },
]
