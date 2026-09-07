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
    'implementation-of-section-51a-of-uapa-1967-updates-to-unsc-13678',
    'deposits-and-accounts-accounts-of-non-resident-banks-13693',
  ],
  'liquidity-risk-management-banks': [
    'reserve-bank-of-india-commercial-banks-cash-reserve-ratio-and-13680',
    'reserve-bank-of-india-commercial-banks-interest-rate-on-deposits-13685',
  ],
  'nbfc-scale-based-regulation': ['reserve-bank-of-india-non-banking-financial-companies-concentration-risk-13679'],
  'payment-aggregation': ['deposits-and-accounts-accounts-of-non-resident-banks-13693'],
  'currency-distribution': ['relief-measures-in-areas-affected-by-natural-calamities-reporting-through-13692'],
  'fema-current-account': ['deposits-and-accounts-accounts-of-non-resident-banks-13693'],
  'digital-lending': ['reserve-bank-of-india-non-banking-financial-companies-concentration-risk-13679'],
  'interest-rate-risk-banking-book': [
    'reserve-bank-of-india-commercial-banks-interest-rate-on-deposits-13685',
    'reserve-bank-of-india-commercial-banks-cash-reserve-ratio-and-13680',
  ],
  'prepaid-payment-instruments': ['reserve-bank-of-india-commercial-banks-interest-rate-on-deposits-13685'],
  'market-conduct-banks': ['reserve-bank-of-india-commercial-banks-interest-rate-on-deposits-13685'],
  'financial-markets-repo': ['reserve-bank-of-india-urban-co-operative-banks-classification-valuation-13691'],
  'supervision-reporting': [
    'implementation-of-section-51a-of-uapa-1967-updates-to-unsc-13678',
    'reserve-bank-of-india-commercial-banks-cash-reserve-ratio-and-13680',
    'reserve-bank-of-india-priority-sector-lending-targets-and-classification-13674',
    'relief-measures-in-areas-affected-by-natural-calamities-reporting-through-13692',
  ]
}

export const CIRCULAR_TO_DIRECTIONS: Record<string, string[]> = {
  'deposits-and-accounts-accounts-of-non-resident-banks-13693': [
    'fema-current-account',
    'know-your-customer',
  ],
  'relief-measures-in-areas-affected-by-natural-calamities-reporting-through-13692': [
    'currency-distribution',
    'supervision-reporting',
  ],
  'reserve-bank-of-india-urban-co-operative-banks-classification-valuation-13691': [
    'financial-markets-repo',
    'liquidity-risk-management-banks',
  ],
  'reserve-bank-of-india-rural-co-operative-banks-interest-rate-13690': ['liquidity-risk-management-banks'],
  'reserve-bank-of-india-urban-co-operative-banks-interest-rate-13689': ['liquidity-risk-management-banks'],
  'reserve-bank-of-india-regional-rural-banks-interest-rate-on-13688': ['liquidity-risk-management-banks'],
  'reserve-bank-of-india-local-area-banks-interest-rate-on-13687': ['liquidity-risk-management-banks'],
  'reserve-bank-of-india-small-finance-banks-interest-rate-on-13686': ['liquidity-risk-management-banks'],
  'reserve-bank-of-india-commercial-banks-interest-rate-on-deposits-13685': [
    'liquidity-risk-management-banks',
    'interest-rate-risk-banking-book',
  ],
  'reserve-bank-of-india-rural-co-operative-banks-cash-reserve-13684': ['liquidity-risk-management-banks'],
  'reserve-bank-of-india-urban-co-operative-banks-cash-reserve-13683': ['liquidity-risk-management-banks'],
  'reserve-bank-of-india-regional-rural-banks-cash-reserve-ratio-13682': ['liquidity-risk-management-banks'],
  'reserve-bank-of-india-small-finance-banks-cash-reserve-ratio-13681': ['liquidity-risk-management-banks'],
  'reserve-bank-of-india-commercial-banks-cash-reserve-ratio-and-13680': [
    'liquidity-risk-management-banks',
    'supervision-reporting',
  ],
  'reserve-bank-of-india-non-banking-financial-companies-concentration-risk-13679': [
    'nbfc-scale-based-regulation',
    'digital-lending',
  ],
  'implementation-of-section-51a-of-uapa-1967-updates-to-unsc-13678': [
    'know-your-customer',
    'supervision-reporting',
  ],
  'implementation-of-section-51a-of-uapa-1967-updates-to-unsc-13677': [
    'know-your-customer',
    'supervision-reporting',
  ],
  'implementation-of-section-51a-of-uapa-1967-updates-to-unsc-13676': [
    'know-your-customer',
    'supervision-reporting',
  ],
  'formation-of-new-districts-in-the-union-territory-of-ladakh-13675': ['supervision-reporting'],
  'reserve-bank-of-india-priority-sector-lending-targets-and-classification-13674': [
    'supervision-reporting',
    'market-conduct-banks',
  ]
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
  'deposits-and-accounts-accounts-of-non-resident-banks-13693':
    'Open PDF opens the official RBI file; this prototype paraphrase is educational only — confirm the live notification on rbi.org.in.',
  'relief-measures-in-areas-affected-by-natural-calamities-reporting-through-13692':
    'Open PDF opens the official RBI file; this prototype paraphrase is educational only — confirm the live notification on rbi.org.in.',
  'reserve-bank-of-india-urban-co-operative-banks-classification-valuation-13691':
    'Open PDF opens the official RBI file; this prototype paraphrase is educational only — confirm the live notification on rbi.org.in.',
  'reserve-bank-of-india-rural-co-operative-banks-interest-rate-13690':
    'Open PDF opens the official RBI file; this prototype paraphrase is educational only — confirm the live notification on rbi.org.in.',
  'reserve-bank-of-india-urban-co-operative-banks-interest-rate-13689':
    'Open PDF opens the official RBI file; this prototype paraphrase is educational only — confirm the live notification on rbi.org.in.',
  'reserve-bank-of-india-regional-rural-banks-interest-rate-on-13688':
    'Open PDF opens the official RBI file; this prototype paraphrase is educational only — confirm the live notification on rbi.org.in.',
  'reserve-bank-of-india-local-area-banks-interest-rate-on-13687':
    'Open PDF opens the official RBI file; this prototype paraphrase is educational only — confirm the live notification on rbi.org.in.',
  'reserve-bank-of-india-small-finance-banks-interest-rate-on-13686':
    'Open PDF opens the official RBI file; this prototype paraphrase is educational only — confirm the live notification on rbi.org.in.',
  'reserve-bank-of-india-commercial-banks-interest-rate-on-deposits-13685':
    'Open PDF opens the official RBI file; this prototype paraphrase is educational only — confirm the live notification on rbi.org.in.',
  'reserve-bank-of-india-rural-co-operative-banks-cash-reserve-13684':
    'Open PDF opens the official RBI file; this prototype paraphrase is educational only — confirm the live notification on rbi.org.in.',
  'reserve-bank-of-india-urban-co-operative-banks-cash-reserve-13683':
    'Open PDF opens the official RBI file; this prototype paraphrase is educational only — confirm the live notification on rbi.org.in.',
  'reserve-bank-of-india-regional-rural-banks-cash-reserve-ratio-13682':
    'Open PDF opens the official RBI file; this prototype paraphrase is educational only — confirm the live notification on rbi.org.in.',
  'reserve-bank-of-india-small-finance-banks-cash-reserve-ratio-13681':
    'Open PDF opens the official RBI file; this prototype paraphrase is educational only — confirm the live notification on rbi.org.in.',
  'reserve-bank-of-india-commercial-banks-cash-reserve-ratio-and-13680':
    'Open PDF opens the official RBI file; this prototype paraphrase is educational only — confirm the live notification on rbi.org.in.',
  'reserve-bank-of-india-non-banking-financial-companies-concentration-risk-13679':
    'Open PDF opens the official RBI file; this prototype paraphrase is educational only — confirm the live notification on rbi.org.in.',
  'implementation-of-section-51a-of-uapa-1967-updates-to-unsc-13678':
    'Open PDF opens the official RBI file; this prototype paraphrase is educational only — confirm the live notification on rbi.org.in.',
  'implementation-of-section-51a-of-uapa-1967-updates-to-unsc-13677':
    'Open PDF opens the official RBI file; this prototype paraphrase is educational only — confirm the live notification on rbi.org.in.',
  'implementation-of-section-51a-of-uapa-1967-updates-to-unsc-13676':
    'Open PDF opens the official RBI file; this prototype paraphrase is educational only — confirm the live notification on rbi.org.in.',
  'formation-of-new-districts-in-the-union-territory-of-ladakh-13675':
    'Open PDF opens the official RBI file; this prototype paraphrase is educational only — confirm the live notification on rbi.org.in.',
  'reserve-bank-of-india-priority-sector-lending-targets-and-classification-13674':
    'Open PDF opens the official RBI file; this prototype paraphrase is educational only — confirm the live notification on rbi.org.in.',
}

const CIRCULAR_FORMAL: Record<string, string> = {
  'deposits-and-accounts-accounts-of-non-resident-banks-13693':
    'Catalogue row for a live RBI notification. Open PDF opens the official RBI file; prototype summary is educational only.',
  'relief-measures-in-areas-affected-by-natural-calamities-reporting-through-13692':
    'Catalogue row for a live RBI notification. Open PDF opens the official RBI file; prototype summary is educational only.',
  'reserve-bank-of-india-urban-co-operative-banks-classification-valuation-13691':
    'Catalogue row for a live RBI notification. Open PDF opens the official RBI file; prototype summary is educational only.',
  'reserve-bank-of-india-rural-co-operative-banks-interest-rate-13690':
    'Catalogue row for a live RBI notification. Open PDF opens the official RBI file; prototype summary is educational only.',
  'reserve-bank-of-india-urban-co-operative-banks-interest-rate-13689':
    'Catalogue row for a live RBI notification. Open PDF opens the official RBI file; prototype summary is educational only.',
  'reserve-bank-of-india-regional-rural-banks-interest-rate-on-13688':
    'Catalogue row for a live RBI notification. Open PDF opens the official RBI file; prototype summary is educational only.',
  'reserve-bank-of-india-local-area-banks-interest-rate-on-13687':
    'Catalogue row for a live RBI notification. Open PDF opens the official RBI file; prototype summary is educational only.',
  'reserve-bank-of-india-small-finance-banks-interest-rate-on-13686':
    'Catalogue row for a live RBI notification. Open PDF opens the official RBI file; prototype summary is educational only.',
  'reserve-bank-of-india-commercial-banks-interest-rate-on-deposits-13685':
    'Catalogue row for a live RBI notification. Open PDF opens the official RBI file; prototype summary is educational only.',
  'reserve-bank-of-india-rural-co-operative-banks-cash-reserve-13684':
    'Catalogue row for a live RBI notification. Open PDF opens the official RBI file; prototype summary is educational only.',
  'reserve-bank-of-india-urban-co-operative-banks-cash-reserve-13683':
    'Catalogue row for a live RBI notification. Open PDF opens the official RBI file; prototype summary is educational only.',
  'reserve-bank-of-india-regional-rural-banks-cash-reserve-ratio-13682':
    'Catalogue row for a live RBI notification. Open PDF opens the official RBI file; prototype summary is educational only.',
  'reserve-bank-of-india-small-finance-banks-cash-reserve-ratio-13681':
    'Catalogue row for a live RBI notification. Open PDF opens the official RBI file; prototype summary is educational only.',
  'reserve-bank-of-india-commercial-banks-cash-reserve-ratio-and-13680':
    'Catalogue row for a live RBI notification. Open PDF opens the official RBI file; prototype summary is educational only.',
  'reserve-bank-of-india-non-banking-financial-companies-concentration-risk-13679':
    'Catalogue row for a live RBI notification. Open PDF opens the official RBI file; prototype summary is educational only.',
  'implementation-of-section-51a-of-uapa-1967-updates-to-unsc-13678':
    'Catalogue row for a live RBI notification. Open PDF opens the official RBI file; prototype summary is educational only.',
  'implementation-of-section-51a-of-uapa-1967-updates-to-unsc-13677':
    'Catalogue row for a live RBI notification. Open PDF opens the official RBI file; prototype summary is educational only.',
  'implementation-of-section-51a-of-uapa-1967-updates-to-unsc-13676':
    'Catalogue row for a live RBI notification. Open PDF opens the official RBI file; prototype summary is educational only.',
  'formation-of-new-districts-in-the-union-territory-of-ladakh-13675':
    'Catalogue row for a live RBI notification. Open PDF opens the official RBI file; prototype summary is educational only.',
  'reserve-bank-of-india-priority-sector-lending-targets-and-classification-13674':
    'Catalogue row for a live RBI notification. Open PDF opens the official RBI file; prototype summary is educational only.',
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
