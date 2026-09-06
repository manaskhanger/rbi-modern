import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-20 border-t border-navy/10 bg-navy text-cream dark:border-gold/20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4 md:px-6">
        <div className="md:col-span-2">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold text-xs font-bold text-navy">
              RBI
            </span>
            <span className="font-semibold">RBI Explained</span>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-cream/70">
            An independent educational project that explains how India’s central bank works —
            monetary policy, regulation, payments, currency and financial stability — in plain
            English.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gold">Explore</h3>
          <ul className="space-y-2 text-sm text-cream/70">
            <li>
              <Link to="/monetary-policy" className="hover:text-cream">
                Monetary Policy
              </Link>
            </li>
            <li>
              <Link to="/masters-directions" className="hover:text-cream">
                Masters Directions
              </Link>
            </li>
            <li>
              <Link to="/learn" className="hover:text-cream">
                Learn & Glossary
              </Link>
            </li>
            <li>
              <Link to="/data" className="hover:text-cream">
                Data Dashboard
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gold">Also</h3>
          <ul className="space-y-2 text-sm text-cream/70">
            <li>
              <Link to="/about" className="hover:text-cream">
                About RBI
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
              <Link to="/offices" className="hover:text-cream">
                Offices
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 md:px-6">
        <div className="mx-auto max-w-6xl space-y-2 text-xs leading-relaxed text-cream/55">
          <p>
            <strong className="text-cream/80">Disclaimer:</strong> This is an illustrative /
            educational demo website. It is <strong className="text-cream/80">not</strong> an
            official Reserve Bank of India website and is not affiliated with, endorsed by, or
            connected to RBI. All figures, rates, charts, circulars and documents shown here are{' '}
            <strong className="text-cream/80">sample data</strong> for learning and portfolio
            demonstration only. For authoritative information, visit the official RBI website.
          </p>
          <p>© {new Date().getFullYear()} RBI Explained (Educational Demo).</p>
        </div>
      </div>
    </footer>
  )
}
