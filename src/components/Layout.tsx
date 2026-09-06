import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ProtoStrip } from './ProtoStrip'
import { PageTransition } from './PageTransition'

export function Layout() {
  const location = useLocation()
  return (
    <div className="flex min-h-screen flex-col bg-cream text-ink dark:bg-navy dark:text-cream">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <ProtoStrip />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
