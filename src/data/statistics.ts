/** Statistics hub — DBIE-style illustrative category cards (not live official series). */

import { RBI_DBIE, RBI_SECTIONS } from './meta'

export type StatisticsCategory = {
  id: string
  title: string
  titleHi: string
  blurb: string
  blurbHi: string
  /** Primary in-prototype deep link. */
  primaryTo: string
  primaryLabel: string
  related?: { label: string; to: string }[]
  /** Official DBIE / rbi.org.in statistics outbound. */
  officialHref?: string
  officialLabel?: string
}

const OFFICIAL_LABEL = 'Official DBIE / statistics on rbi.org.in'

export const statisticsCategories: StatisticsCategory[] = [
  {
    id: 'money-banking',
    title: 'Money & Banking',
    titleHi: 'मुद्रा और बैंकिंग',
    blurb:
      'Reserve money, broad money (M3), deposit and credit growth of scheduled commercial banks, and sectoral deployment of bank credit — the aggregates that show how liquidity is forming and where loans are flowing.',
    blurbHi:
      'रिज़र्व मनी, व्यापक मुद्रा (M3), अनुसूचित वाणिज्यिक बैंकों की जमा/ऋण वृद्धि, और क्षेत्रवार ऋण वितरण — वे समुच्चय जो दिखाते हैं तरलता कैसे बन रही है और ऋण कहाँ जा रहा है।',
    primaryTo: '/data',
    primaryLabel: 'Open sample data lab',
    related: [
      { label: 'Monetary policy', to: '/monetary-policy' },
      { label: 'Circulars', to: '/circulars' },
      { label: 'Publications hub', to: '/publications' },
    ],
    officialHref: RBI_DBIE,
    officialLabel: OFFICIAL_LABEL,
  },
  {
    id: 'external-sector',
    title: 'External Sector',
    titleHi: 'बाह्य क्षेत्र',
    blurb:
      'Balance of payments, foreign-exchange reserves, external debt stock, and the current-account balance — how India settles import bills and finances capital inflows and outflows.',
    blurbHi:
      'भुगतान संतुलन, विदेशी मुद्रा भंडार, बाह्य ऋण स्टॉक और चालू खाता शेष — भारत आयात बिल कैसे चुकाता है और पूंजी प्रवाह कैसे वित्तपोषित होते हैं।',
    primaryTo: '/reports',
    primaryLabel: 'Browse report digests',
    related: [
      { label: 'Sample data lab', to: '/data' },
      { label: 'Publications', to: '/publications' },
      { label: 'Circulars (forex themes)', to: '/circulars' },
    ],
    officialHref: RBI_SECTIONS.statistics.href,
    officialLabel: OFFICIAL_LABEL,
  },
  {
    id: 'government-finance',
    title: 'Government Finance',
    titleHi: 'सरकारी वित्त',
    blurb:
      'Central and state fiscal deficit paths, market borrowing calendars, and RBI’s ways-and-means advances — the public-finance numbers that sit beside monetary operations.',
    blurbHi:
      'केंद्र/राज्य राजकोषीय घाटा पथ, बाज़ार उधार कैलेंडर, और आरबीआई के वेज़-एंड-मीन्स एडवांस — सार्वजनिक वित्त आंकड़े जो मौद्रिक परिचालन के साथ जुड़े हैं।',
    primaryTo: '/publications',
    primaryLabel: 'Open publications hub',
    related: [
      { label: 'Reports', to: '/reports' },
      { label: 'Monetary policy', to: '/monetary-policy' },
      { label: 'Sample data lab', to: '/data' },
    ],
    officialHref: RBI_DBIE,
    officialLabel: OFFICIAL_LABEL,
  },
  {
    id: 'real-sector',
    title: 'Real Sector',
    titleHi: 'वास्तविक क्षेत्र',
    blurb:
      'Industrial production, capacity utilisation cues, and growth-side indicators that feed into MPC briefing packs — activity measures rather than price or money aggregates.',
    blurbHi:
      'औद्योगिक उत्पादन, क्षमता उपयोग संकेत, और वृद्धि-पक्ष संकेतक जो MPC ब्रीफिंग में आते हैं — मूल्य या मुद्रा समुच्चय नहीं, बल्कि गतिविधि माप।',
    primaryTo: '/monetary-policy',
    primaryLabel: 'Monetary policy desk',
    related: [
      { label: 'Sample data lab', to: '/data' },
      { label: 'Reports', to: '/reports' },
      { label: 'Learn & glossary', to: '/learn' },
    ],
    officialHref: RBI_SECTIONS.statistics.href,
    officialLabel: OFFICIAL_LABEL,
  },
  {
    id: 'prices',
    title: 'Prices',
    titleHi: 'मूल्य',
    blurb:
      'CPI headline and core paths, WPI industrial inputs, and food-fuel contribution stories — the inflation arithmetic behind the policy rate corridor.',
    blurbHi:
      'CPI शीर्ष और कोर पथ, WPI औद्योगिक इनपुट, और खाद्य-ईंधन योगदान — नीति दर कॉरिडोर के पीछे की मुद्रास्फीति अंकगणित।',
    primaryTo: '/monetary-policy',
    primaryLabel: 'Policy & inflation framing',
    related: [
      { label: 'Sample data lab', to: '/data' },
      { label: 'MPR-style digests', to: '/reports' },
      { label: 'Publications', to: '/publications' },
    ],
    officialHref: RBI_DBIE,
    officialLabel: OFFICIAL_LABEL,
  },
  {
    id: 'trade',
    title: 'Trade',
    titleHi: 'व्यापार',
    blurb:
      'Merchandise exports and imports by major commodity and destination, oil and gold swings, and trade-balance monthly prints that often move the rupee narrative.',
    blurbHi:
      'प्रमुख वस्तु/गंतव्य के अनुसार निर्यात-आयात, तेल और सोने के झटके, और व्यापार शेष की मासिक छपाई जो अक्सर रुपये की कहानी बदलती है।',
    primaryTo: '/data',
    primaryLabel: 'Sample trade / macro series',
    related: [
      { label: 'External-sector reports', to: '/reports' },
      { label: 'Publications', to: '/publications' },
      { label: 'Circulars', to: '/circulars' },
    ],
    officialHref: RBI_SECTIONS.statistics.href,
    officialLabel: OFFICIAL_LABEL,
  },
  {
    id: 'financial-markets',
    title: 'Financial Markets',
    titleHi: 'वित्तीय बाज़ार',
    blurb:
      'Call-money and repo market volumes, G-sec yield curve snapshots, and FX forward premia — short-term market plumbing that transmission relies on.',
    blurbHi:
      'कॉल-मनी और रेपो बाज़ार वॉल्यूम, G-sec यील्ड कर्व स्नैपशॉट, और FX फॉरवर्ड प्रीमिया — अल्पकालिक बाज़ार प्लंबिंग जिस पर ट्रांसमिशन निर्भर करता है।',
    primaryTo: '/monetary-policy',
    primaryLabel: 'Rates & transmission context',
    related: [
      { label: 'Sample data lab', to: '/data' },
      { label: 'Reports', to: '/reports' },
      { label: 'News / press notes', to: '/news' },
    ],
    officialHref: RBI_DBIE,
    officialLabel: OFFICIAL_LABEL,
  },
  {
    id: 'payment-systems',
    title: 'Payment Systems',
    titleHi: 'भुगतान प्रणाली',
    blurb:
      'UPI, IMPS, NEFT and RTGS volumes and values, plus card and prepaid instrument turnover — the rails that move retail and wholesale money every day.',
    blurbHi:
      'UPI, IMPS, NEFT और RTGS के वॉल्यूम/मूल्य, तथा कार्ड और प्रीपेड इंस्ट्रूमेंट टर्नओवर — वे रेल जो प्रतिदिन खुदरा और थोक धन घुमाती हैं।',
    primaryTo: '/reports',
    primaryLabel: 'Payments-style digests',
    related: [
      { label: 'Circulars', to: '/circulars' },
      { label: 'Publications', to: '/publications' },
      { label: 'Sample data lab', to: '/data' },
    ],
    officialHref: RBI_SECTIONS.statistics.href,
    officialLabel: OFFICIAL_LABEL,
  },
]
