import type {
  ApplicabilityRow,
  AudienceTag,
  Category,
  ChangeHistoryEntry,
  Circular,
  MastersDirection,
} from './types'

/** Seeded circular ↔ direction links for this prototype catalogue. */
export const DIRECTION_TO_CIRCULARS: Record<string, string[]> = {
  'know-your-customer': [
    'upi-merchant-onboarding',
    'fraud-risk-management',
    'tokenisation-card-payments',
  ],
  'liquidity-risk-management-banks': [
    'npa-upgradation-clarification',
    'market-risk-capital-faq',
  ],
  'nbfc-scale-based-regulation': [
    'co-lending-guidelines-tweak',
    'npa-upgradation-clarification',
    'penalty-harmonisation',
  ],
  'payment-aggregation': ['upi-merchant-onboarding', 'tokenisation-card-payments'],
  'currency-distribution': ['currency-chest-operations'],
  'fema-current-account': ['ecb-reporting-simplification'],
  'digital-lending': [
    'penalty-harmonisation',
    'co-lending-guidelines-tweak',
    'fraud-risk-management',
  ],
  'interest-rate-risk-banking-book': ['market-risk-capital-faq'],
  'prepaid-payment-instruments': [
    'tokenisation-card-payments',
    'upi-merchant-onboarding',
  ],
  'market-conduct-banks': ['penalty-harmonisation', 'co-lending-guidelines-tweak'],
  'financial-markets-repo': ['market-risk-capital-faq'],
  'supervision-reporting': [
    'fraud-risk-management',
    'npa-upgradation-clarification',
    'cyber-security-framework-update',
  ],
}

export const CIRCULAR_TO_DIRECTIONS: Record<string, string[]> = {
  'cyber-security-framework-update': ['supervision-reporting', 'payment-aggregation'],
  'upi-merchant-onboarding': [
    'payment-aggregation',
    'know-your-customer',
    'prepaid-payment-instruments',
  ],
  'ecb-reporting-simplification': ['fema-current-account'],
  'npa-upgradation-clarification': [
    'nbfc-scale-based-regulation',
    'supervision-reporting',
    'liquidity-risk-management-banks',
  ],
  'co-lending-guidelines-tweak': [
    'nbfc-scale-based-regulation',
    'digital-lending',
    'market-conduct-banks',
  ],
  'tokenisation-card-payments': [
    'payment-aggregation',
    'prepaid-payment-instruments',
    'know-your-customer',
  ],
  'green-deposits-framework': [
    'liquidity-risk-management-banks',
    'supervision-reporting',
  ],
  'penalty-harmonisation': [
    'market-conduct-banks',
    'digital-lending',
    'nbfc-scale-based-regulation',
  ],
  'fraud-risk-management': [
    'know-your-customer',
    'supervision-reporting',
    'digital-lending',
  ],
  'currency-chest-operations': ['currency-distribution'],
  'market-risk-capital-faq': [
    'interest-rate-risk-banking-book',
    'financial-markets-repo',
    'liquidity-risk-management-banks',
  ],
}

/** Deeper formal paraphrases for Plain/Formal toggle. */
export const DIRECTION_FORMAL: Record<string, string> = {
  'know-your-customer':
    'The Direction operationalises customer identification, risk categorisation, ongoing due diligence, and reporting to FIU-IND for regulated entities. It sits alongside PML Act obligations and digital onboarding pathways authorised by the Reserve Bank. Boards remain accountable for programme design and effectiveness.',
  'liquidity-risk-management-banks':
    'Prudential liquidity standards require maintenance of LCR and NSFR floors, board-approved contingency funding plans, and structured reporting of maturity mismatches so supervisors can detect funding stress early. Intraday and currency-wise positions matter for larger banks.',
  'nbfc-scale-based-regulation':
    'Scale-based regulation assigns Base, Middle, Upper and (where invoked) Top Layer obligations proportional to size, interconnectedness and activity, with progressively tighter capital, governance and disclosure norms. Migration timelines apply when thresholds are crossed.',
  'payment-aggregation':
    'Non-bank payment aggregators require prior authorisation, prescribed net-worth, escrow segregation of merchant funds, and conduct standards covering merchant KYC and grievance redress. Banks offering aggregation follow a lighter authorisation path but comparable operational expectations.',
  'currency-distribution':
    'Currency distribution instructions cover chest operations, clean note policy, exchange of soiled and mutilated notes, and procedures for detection and reporting of counterfeit currency to police and the Issue Department.',
  'fema-current-account':
    'Current-account remittance rules under FEMA distinguish freely permitted payments from those requiring documentation or remaining prohibited, channelled through authorised dealer banks. Capital-account transactions sit in separate Directions.',
  'digital-lending':
    'Digital lending conduct norms require Key Fact Statement disclosures including APR, disbursement to borrower-owned accounts, regulated entity–borrower contractual primacy, data minimisation, and controls on Lending Service Providers and recovery agents.',
  'interest-rate-risk-banking-book':
    'IRRBB measurement combines earnings-at-risk and economic-value approaches under standardised shock scenarios, with escalation through ALCO/board and integration into ICAAP where applicable. Behavioural assumptions for non-maturity deposits require governance challenge.',
  'prepaid-payment-instruments':
    'PPI issuance is subject to authorisation, balance and loading caps by instrument type, escrow protection of outstanding balances, KYC tiers, and customer redress timelines. Interoperability is encouraged for eligible instruments.',
  'market-conduct-banks':
    'Fair Practices expectations require transparent sanction terms, notice before recovery or possession, prohibition of harassment by recovery agents, and a documented grievance redress hierarchy with board oversight of conduct risk.',
  'financial-markets-repo':
    'Repo market participation is limited to eligible counterparties and collateral, with minimum haircuts by collateral type, standard documentation, daily valuation/margin processes, and trade reporting to authorised repositories.',
  'supervision-reporting':
    'Off-site supervisory returns must be filed within stipulated timelines under board-approved data governance, with material restatements explained, maker-checker controls, and working papers retained for inspection. A senior official remains accountable for quality.',
}

/** Extra plain-English closing lines for the toggle. */
export const DIRECTION_PLAIN_EXTRA: Record<string, string> = {
  'know-your-customer':
    'In practice: confirm identity, understand the relationship, watch for odd patterns, report suspicions to FIU-IND, and keep records long enough for supervisors to check.',
  'liquidity-risk-management-banks':
    'In practice: hold enough easy-to-sell assets, prefer stable funding, run stress drills, and show supervisors the contingency funding plan is real.',
  'nbfc-scale-based-regulation':
    'In practice: know your layer, meet that layer’s capital and governance bar, and upgrade in time when you grow into a higher layer.',
  'payment-aggregation':
    'In practice: get authorised before collecting merchant money, keep float in escrow, and never mix customer funds with operating cash.',
  'currency-distribution':
    'In practice: exchange damaged notes fairly, catch and report fakes, and keep chest remittances accurate and on schedule.',
  'fema-current-account':
    'In practice: classify the remittance correctly, keep papers, respect LRS limits, and refuse prohibited purposes.',
  'digital-lending':
    'In practice: show the all-in cost, pay the borrower directly, keep the RE as the true lender, and control how LSPs and agents behave.',
  'interest-rate-risk-banking-book':
    'In practice: measure both near-term earnings hits and longer-term net-worth hits when rates move, then escalate limit breaches.',
  'prepaid-payment-instruments':
    'In practice: protect wallet float, apply the right KYC tier, and make refunds and complaints straightforward.',
  'market-conduct-banks':
    'In practice: clear loan letters, fair notice before recovery, no harassment, and a working complaint ladder.',
  'financial-markets-repo':
    'In practice: trade only with eligible names and collateral, apply haircuts, and report trades as required.',
  'supervision-reporting':
    'In practice: file complete returns on time, fix errors fast, and make sure someone senior owns data quality.',
}

const CIRCULAR_PLAIN: Record<string, string> = {
  'cyber-security-framework-update':
    'Banks should rehearse ransomware response with the board, lock down privileged access to core systems, and watch important IT vendors continuously — this page is a teaching paraphrase only.',
  'upi-merchant-onboarding':
    'Small UPI merchants can get lighter checks; higher-risk business types need stronger verification and slower early settlements. Disputes should be visible to customers quickly.',
  'ecb-reporting-simplification':
    'When companies borrow abroad, AD banks help them file changes on time. Refinancing still has cost ceilings, and late filings can mean compounding under FEMA.',
  'npa-upgradation-clarification':
    'A loan leaves NPA status only after all overdue interest and principal are paid — partial recovery is not enough. Boards should check that systems mark this correctly.',
  'co-lending-guidelines-tweak':
    'In bank–NBFC co-lending, say clearly who the customer deals with, settle partner shares into escrow quickly, and map internal policies to current regulatory language.',
  'tokenisation-card-payments':
    'Merchants should not keep raw card numbers; use tokens instead, including for guest checkout and recurring payments. Supervisors may ask for attestations.',
  'green-deposits-framework':
    'Green deposit money should fund board-approved eligible activities, with excluded sectors listed and independent checks on how proceeds were allocated.',
  'penalty-harmonisation':
    'Penalties for late payment should be reasonable fees — not a jump in interest on the whole loan — and customers should get a warning the first time.',
  'fraud-risk-management':
    'Banks need early-warning dashboards, clear rules for when to order a forensic audit, and fair staff accountability that separates process mistakes from collusion.',
  'currency-chest-operations':
    'Currency chests must follow remittance calendars, pack soiled notes properly under CCTV, and expect follow-up if tallies are badly off.',
  'market-risk-capital-faq':
    'During a Basel market-risk parallel run, banks must document trading-book boundaries and use the outputs to plan capital before any go-live date.',
}

const CIRCULAR_FORMAL: Record<string, string> = {
  'cyber-security-framework-update':
    'Incremental control expectations address ransomware readiness, privileged-access vaulting with immutable logs, and continuous monitoring / audit rights for material IT service providers, aligned with IT outsourcing themes.',
  'upi-merchant-onboarding':
    'Risk-based merchant due diligence permits simplified KYC below turnover thresholds while retaining fraud monitoring; enhanced verification and velocity limits apply to higher-risk MCCs.',
  'ecb-reporting-simplification':
    'Form ECB filing windows for drawdowns and parameter changes are streamlined; refinancing remains subject to applicable all-in-cost ceilings; late reporting may attract FEMA compounding.',
  'npa-upgradation-clarification':
    'Upgradation from NPA requires clearance of entire arrears of interest and principal; partial recovery is insufficient. Automated classification logic for OD/CC accounts warrants board review.',
  'co-lending-guidelines-tweak':
    'Operational expectations cover customer-interface clarity in Key Fact Statements, timely escrow segregation of partner shares, and alignment of CLM-style arrangements to current regulatory language.',
  'tokenisation-card-payments':
    'Storage of actual card data by merchants remains prohibited; migration to network or issuer tokens (including card-on-file) is required, with possible attestations in IT examinations.',
  'green-deposits-framework':
    'Allocation of green deposit proceeds must map to a board-approved framework with excluded sectors; independent assurance of allocation reports is encouraged; general deposit and ALM norms continue to apply.',
  'penalty-harmonisation':
    'Penal charges must be reasonable, non-capitalised and disclosed; practices that increase interest on the entire loan for minor defaults are discouraged; first-time application should follow customer reminder.',
  'fraud-risk-management':
    'Early warning frameworks should combine financial, transactional and behavioural indicators; forensic audit decisions need documented terms of reference; accountability frameworks should distinguish process lapses from collusion.',
  'currency-chest-operations':
    'Chests must observe Issue Department remittance calendars and denomination-wise packing standards with CCTV coverage; material discrepancies attract supervisory follow-up.',
  'market-risk-capital-faq':
    'Trading-book boundary policies require periodic reclassification review; parallel-run outputs inform capital planning ahead of separately announced go-live; model validation should challenge residual risks.',
}

export function buildApplicability(
  audiences: AudienceTag[],
  category: Category,
  audienceText: string,
): ApplicabilityRow[] {
  const has = (t: AudienceTag) => audiences.includes(t)
  return [
    {
      entity: 'Scheduled commercial banks',
      applies: has('Banks') ? 'Yes' : category === 'NBFC' ? 'No' : 'Partial',
      notes: has('Banks')
        ? /chest/i.test(audienceText)
          ? 'Especially currency-chest operating banks in this sample framing.'
          : 'Core audience for this Direction in the prototype catalogue.'
        : 'Not the primary audience; verify official applicability schedules.',
    },
    {
      entity: 'NBFCs (all layers)',
      applies: has('NBFCs') ? (category === 'NBFC' ? 'Yes' : 'Partial') : 'No',
      notes: has('NBFCs')
        ? 'Layer-specific intensity may differ under scale-based norms.'
        : 'Generally outside scope unless separately notified.',
    },
    {
      entity: 'Payment system operators / PSPs',
      applies: has('PSPs') ? 'Yes' : category === 'Payments' ? 'Partial' : 'No',
      notes: has('PSPs')
        ? 'Authorisation and escrow themes often co-apply.'
        : 'Only if notified as a regulated entity for this theme.',
    },
    {
      entity: 'Co-operative banks',
      applies: has('Banks') ? 'Case-by-case' : 'No',
      notes:
        'Urban / multi-state co-operatives may have parallel instructions — verify officially.',
    },
    {
      entity: 'Foreign bank branches in India',
      applies: has('Banks') ? 'Yes' : 'No',
      notes: has('Banks')
        ? 'Typically aligned with SCB expectations where the theme applies.'
        : 'Outside primary audience in this sample.',
    },
  ]
}

export function buildChangeHistory(
  issued: string,
  updated: string,
  title: string,
): ChangeHistoryEntry[] {
  const short = title.replace(/^Master Direction – /, '')
  const midYear = `${issued.slice(0, 4)}-11-15`
  return [
    {
      date: issued,
      label: 'Illustrative — first issue (sample)',
      note: `Prototype timeline marks an initial educational issue date for ${short}. Not an official gazette extract.`,
    },
    {
      date: midYear,
      label: 'Illustrative — interim clarification (sample)',
      note: 'Placeholder entry showing how amendment breadcrumbs might appear in a richer catalogue.',
    },
    {
      date: updated,
      label: 'Illustrative — latest educational refresh (sample)',
      note: 'Sample “updated” stamp used in this prototype only. Confirm live text on rbi.org.in.',
    },
  ]
}

export type EnrichedDirection = MastersDirection & {
  formalSummary: string
  plainEnglishFull: string
  relatedCircularSlugs: string[]
  applicability: ApplicabilityRow[]
  changeHistory: ChangeHistoryEntry[]
}

export function enrichDirection(doc: MastersDirection): EnrichedDirection {
  const formal =
    doc.formalSummary ??
    DIRECTION_FORMAL[doc.slug] ??
    `${doc.summary} Supervisory expectations and board accountability themes are summarised here for education only.`
  const extra = DIRECTION_PLAIN_EXTRA[doc.slug]
  const plainEnglishFull = extra ? `${doc.plainEnglish} ${extra}` : doc.plainEnglish
  return {
    ...doc,
    formalSummary: formal,
    plainEnglishFull,
    relatedCircularSlugs:
      doc.relatedCircularSlugs ?? DIRECTION_TO_CIRCULARS[doc.slug] ?? [],
    applicability:
      doc.applicability ??
      buildApplicability(doc.audiences, doc.category, doc.audience),
    changeHistory:
      doc.changeHistory ?? buildChangeHistory(doc.issued, doc.updated, doc.title),
  }
}

export type EnrichedCircular = Circular & {
  plainEnglish: string
  formalSummary: string
  relatedDirectionSlugs: string[]
}

export function enrichCircular(doc: Circular): EnrichedCircular {
  return {
    ...doc,
    plainEnglish:
      doc.plainEnglish ??
      CIRCULAR_PLAIN[doc.slug] ??
      `${doc.summary} This is an educational paraphrase for prototype UX only.`,
    formalSummary:
      doc.formalSummary ??
      CIRCULAR_FORMAL[doc.slug] ??
      `${doc.summary} Formal tone paraphrase for training — not official RBI text.`,
    relatedDirectionSlugs:
      doc.relatedDirectionSlugs ?? CIRCULAR_TO_DIRECTIONS[doc.slug] ?? [],
  }
}
