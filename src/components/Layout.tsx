import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ProtoStrip } from './ProtoStrip'
import { PageTransition } from './PageTransition'
import { Breadcrumbs } from './Breadcrumbs'
import { LiveUpdatesTicker } from './LiveUpdatesTicker'

export function Layout() {
  const location = useLocation()
  const isHome = (location.pathname.replace(/\/$/, '') || '/') === '/'

  return (
    <div className="flex min-h-screen flex-col bg-cream text-ink dark:bg-navy dark:text-cream">
      <a
        href="#main-content"
        className="skip-link"
        onClick={(e) => {
          const main = document.getElementById('main-content')
          if (main) {
            e.preventDefault()
            main.focus()
            main.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }}
      >
        Skip to content
      </a>
      <ProtoStrip />
      <Navbar />
      <div className="sticky top-[6.1rem] z-40 xl:top-[6.35rem]">
        <LiveUpdatesTicker />
      </div>
      {!isHome && <Breadcrumbs />}
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
