/** Citizens’ Corner — mostly outbound official citizen pages + short original explainers. */

export type CitizenCard = {
  id: string
  title: string
  titleHi: string
  explainer: string
  officialHref: string
  officialLabel: string
}

export const citizenCards: CitizenCard[] = [
  {
    id: 'ymyr',
    title: 'Your Money Your Right',
    titleHi: 'आपका धन आपका अधिकार',
    explainer:
      'Educational pointer to RBI’s public awareness materials on safe banking, digital payments hygiene, and knowing your rights as a customer. Always use the official pages for campaign content.',
    officialHref: 'https://www.rbi.org.in/',
    officialLabel: 'Open rbi.org.in (citizen / awareness)',
  },
  {
    id: 'unclaimed',
    title: 'Unclaimed deposits / assets',
    titleHi: 'अदावी जमा / संपत्ति',
    explainer:
      'Banks publish unclaimed deposit information under regulatory expectations. This prototype does not host searchable ledgers — follow official RBI and bank portals to check or claim.',
    officialHref: 'https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx',
    officialLabel: 'Search official RBI releases / guidance',
  },
  {
    id: 'ombudsman',
    title: 'Ombudsman & complaints',
    titleHi: 'लोकपाल और शिकायतें',
    explainer:
      'If a bank or regulated entity does not resolve your complaint, the Reserve Bank’s integrated ombudsman scheme provides an escalation path. Start with your entity’s grievance redressal, then use the official CMS portal.',
    officialHref: 'https://cms.rbi.org.in/',
    officialLabel: 'RBI Complaint Management System (CMS)',
  },
  {
    id: 'recruitment',
    title: 'Recruitment',
    titleHi: 'भर्ती',
    explainer:
      'Vacancies, exam notices and results are published only through official RBI channels. This prototype never lists live openings or accepts applications.',
    officialHref: 'https://opportunities.rbi.org.in/',
    officialLabel: 'Official RBI opportunities portal',
  },
  {
    id: 'notes',
    title: 'Banknotes & coins',
    titleHi: 'नोट और सिक्के',
    explainer:
      'Short explainer: damaged notes can often be exchanged at banks under clean-note practices. Confirm denominations, security features and exchange rules on official currency pages.',
    officialHref: 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx',
    officialLabel: 'Currency-related Master Directions index',
  },
  {
    id: 'financial-education',
    title: 'Financial education',
    titleHi: 'वित्तीय शिक्षा',
    explainer:
      'Literacy materials help first-time users of UPI, credit and savings products. Prefer official RBI / National Centre for Financial Education resources over unofficial summaries.',
    officialHref: 'https://www.rbi.org.in/',
    officialLabel: 'rbi.org.in financial education',
  },
]

export const CITIZENS_OFFICIAL_HUB = 'https://www.rbi.org.in/'
