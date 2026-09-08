/** Publications hub — illustrative category cards linking into prototype reports / related paths. */

export type PublicationCategory = {
  id: string
  title: string
  titleHi: string
  blurb: string
  blurbHi: string
  /** Primary in-prototype deep link (report digest or hub). */
  primaryTo: string
  primaryLabel: string
  related?: { label: string; to: string }[]
}

export const publicationCategories: PublicationCategory[] = [
  {
    id: 'annual-report',
    title: 'Annual Report',
    titleHi: 'वार्षिक रिपोर्ट',
    blurb:
      'Educational framing of an annual-report style digest: balance-sheet growth, credit by bank group, and digital adoption themes. Sample figures only — not an official RBI Annual Report extract.',
    blurbHi:
      'वार्षिक-रिपोर्ट शैली का शैक्षिक सार: बैलेंस-शीट वृद्धि, बैंक समूह के अनुसार ऋण, और डिजिटल अपनाना। केवल नमूना आंकड़े — आधिकारिक आरबीआई वार्षिक रिपोर्ट नहीं।',
    primaryTo: '/reports/report-trend-banking-2025',
    primaryLabel: 'Open annual / banking sample',
    related: [
      { label: 'All report digests', to: '/reports' },
      { label: 'Masters Directions', to: '/masters-directions' },
      { label: 'Recent circulars', to: '/circulars' },
    ],
  },
  {
    id: 'fsr',
    title: 'Financial Stability Report',
    titleHi: 'वित्तीय स्थिरता रिपोर्ट',
    blurb:
      'Illustrative mid-year digest covering banking soundness, household leverage themes, and market volatility indicators with demo charts for classroom UX.',
    blurbHi:
      'बैंकिंग सुदृढ़ता, घरेलू लीवरेज विषय और बाज़ार अस्थिरता संकेतकों वाला उदाहरणात्मक मध्यावधि सार — कक्षा UX के लिए डेमो चार्ट सहित।',
    primaryTo: '/reports/financial-stability-report-demo',
    primaryLabel: 'Open FSR-style digest',
    related: [
      { label: 'Monetary policy desk', to: '/monetary-policy' },
      { label: 'Sample data lab', to: '/data' },
      { label: 'All reports', to: '/reports' },
    ],
  },
  {
    id: 'mpr',
    title: 'Monetary Policy Report',
    titleHi: 'मौद्रिक नीति रिपोर्ट',
    blurb:
      'Sample inflation and growth chapters that explain forecasting fan charts, output-gap concepts, and transmission channels — illustrative figures only.',
    blurbHi:
      'मुद्रास्फीति और वृद्धि अध्याय जो फैन चार्ट, आउटपुट-गैप अवधारणाएँ और ट्रांसमिशन चैनल समझाते हैं — केवल उदाहरणात्मक आंकड़े।',
    primaryTo: '/reports/monetary-policy-report-demo',
    primaryLabel: 'Open MPR-style digest',
    related: [
      { label: 'Monetary policy', to: '/monetary-policy' },
      { label: 'Macro data samples', to: '/data' },
      { label: 'Press / News', to: '/news' },
    ],
  },
  {
    id: 'bulletin',
    title: 'RBI Bulletin',
    titleHi: 'आरबीआई बुलेटिन',
    blurb:
      'Prototype pointer to periodical-style publication browsing. This hub does not host bulletin PDFs — use the reports catalogue for sample digests and rbi.org.in for authoritative issues.',
    blurbHi:
      'आवधिक प्रकाशन ब्राउज़िंग का प्रोटोटाइप संकेतक। यहाँ बुलेटिन PDF नहीं हैं — नमूना सार के लिए रिपोर्ट सूची और आधिकारिक अंकों के लिए rbi.org.in देखें।',
    primaryTo: '/reports',
    primaryLabel: 'Browse report digests',
    related: [
      { label: 'News / press notes', to: '/news' },
      { label: 'Learn & glossary', to: '/learn' },
      { label: 'Circulars', to: '/circulars' },
    ],
  },
  {
    id: 'handbook',
    title: 'Handbook of Statistics',
    titleHi: 'सांख्यिकी पुस्तिका',
    blurb:
      'Curated demo tables for GDP, CPI, money aggregates and external-sector indicators — classroom-oriented excerpts, not a full official handbook.',
    blurbHi:
      'GDP, CPI, मुद्रा समुच्चय और बाह्य क्षेत्र संकेतकों की क्यूरेटेड डेमो तालिकाएँ — कक्षा-उन्मुख अंश, पूर्ण आधिकारिक पुस्तिका नहीं।',
    primaryTo: '/reports/handbook-statistics-excerpt',
    primaryLabel: 'Open handbook-style sample',
    related: [
      { label: 'Interactive data lab', to: '/data' },
      { label: 'All reports', to: '/reports' },
    ],
  },
  {
    id: 'payments-fi',
    title: 'Payments & Financial Inclusion',
    titleHi: 'भुगतान और वित्तीय समावेशन',
    blurb:
      'Volumes and values across UPI, IMPS, NEFT and RTGS plus inclusion outreach metrics — educational charts that link into payments Masters Directions and circular filters.',
    blurbHi:
      'UPI, IMPS, NEFT और RTGS के वॉल्यूम/मूल्य तथा समावेशन मेट्रिक्स — भुगतान मास्टर निर्देशों और परिपत्र फ़िल्टर से जुड़े शैक्षिक चार्ट।',
    primaryTo: '/reports/payments-and-settlement-systems',
    primaryLabel: 'Open payments / inclusion review',
    related: [
      { label: 'Payment Aggregators MD', to: '/masters-directions/payment-aggregation' },
      { label: 'PPI Master Direction', to: '/masters-directions/prepaid-payment-instruments' },
      { label: 'Circulars', to: '/circulars' },
    ],
  },
]
