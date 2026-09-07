import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { RBI_HOME } from '../data/meta'
import { useLang } from '../hooks/useLang'

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="mt-16 border-t border-navy/10 bg-navy text-cream dark:border-gold/20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4 md:px-6">
        <div className="md:col-span-2">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center border border-gold/50 bg-navy-light text-[10px] font-bold text-gold">
              KP
            </span>
            <span className="font-serif font-semibold">{t('RBI Knowledge Prototype', 'आरबीआई ज्ञान प्रोटोटाइप')}</span>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-cream/70">
            An unofficial educational and UX concept exploring clearer public communication of
            India’s central bank — mandate, Masters Directions, circulars, reports and data. Not
            affiliated with the Reserve Bank of India.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gold-on-navy">{t('About & policy', 'परिचय और नीति')}</h3>
          <ul className="space-y-2 text-sm text-cream/70">
            <li>
              <Link to="/about" className="hover:text-cream">
                About &amp; mandate
              </Link>
            </li>
            <li>
              <Link to="/about/prototype" className="hover:text-cream">
                About this prototype
              </Link>
            </li>
            <li>
              <Link to="/tour" className="hover:text-cream">
                Guided tour &amp; personas
              </Link>
            </li>
            <li>
              <Link to="/monetary-policy" className="hover:text-cream">
                {t('Monetary policy', 'मौद्रिक नीति')}
              </Link>
            </li>
            <li>
              <Link to="/functions" className="hover:text-cream">
                {t('Functions', 'कार्य')}
              </Link>
            </li>
            <li>
              <Link to="/citizens" className="hover:text-cream">
                {t("Citizens' Corner", 'नागरिक कॉर्नर')}
              </Link>
            </li>
            <li>
              <Link to="/learn" className="hover:text-cream">
                Learn &amp; glossary
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gold-on-navy">{t('Regulatory & data', 'विनियामक और डेटा')}</h3>
          <ul className="space-y-2 text-sm text-cream/70">
            <li>
              <Link to="/masters-directions" className="hover:text-cream">
                Masters Directions
              </Link>
            </li>
            <li>
              <Link to="/circulars" className="hover:text-cream">
                Circulars
              </Link>
            </li>
            <li>
              <Link to="/reports" className="hover:text-cream">
                Reports
              </Link>
            </li>
            <li>
              <Link to="/data" className="hover:text-cream">
                Sample data lab
              </Link>
            </li>
            <li>
              <Link to="/news" className="hover:text-cream">
                News
              </Link>
            </li>
            <li>
              <Link to="/offices" className="hover:text-cream">
                Offices
              </Link>
            </li>
            <li>
              <Link to="/sitemap" className="hover:text-cream">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 md:px-6">
        <div className="mx-auto max-w-6xl space-y-2 text-xs leading-relaxed text-cream/55">
          <p>
            <strong className="text-cream/85">Disclaimer:</strong> This is an{' '}
            <strong className="text-cream/85">unofficial educational / UX prototype</strong>. It is
            not the Reserve Bank of India website (rbi.org.in), and it is not affiliated with,
            endorsed by, or connected to RBI. Do not treat content here as regulatory advice or as
            a substitute for gazetted instruments.
          </p>
          <p>
            All figures, rates, charts, circulars and document summaries are{' '}
            <strong className="text-cream/85">illustrative sample data</strong> created for this
            concept. The <strong className="text-cream/85">only authoritative source</strong> is
            the official RBI website at{' '}
            <a
              href={RBI_HOME}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-gold-on-navy hover:underline"
            >
              rbi.org.in
              <ExternalLink className="h-3 w-3" aria-hidden />
            </a>
            .
          </p>
          <p>
            © {new Date().getFullYear()} RBI Knowledge Prototype (Unofficial Educational UX). Brand
            mark “KP” is a prototype identifier — not an official crest or seal.
          </p>
        </div>
      </div>
    </footer>
  )
}
