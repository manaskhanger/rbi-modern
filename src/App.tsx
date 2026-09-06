import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './hooks/useTheme'
import { Layout } from './components/Layout'

const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })))
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })))
const Prototype = lazy(() =>
  import('./pages/Prototype').then((m) => ({ default: m.Prototype })),
)
const MonetaryPolicy = lazy(() =>
  import('./pages/MonetaryPolicy').then((m) => ({ default: m.MonetaryPolicy })),
)
const MastersDirections = lazy(() =>
  import('./pages/MastersDirections').then((m) => ({ default: m.MastersDirections })),
)
const MastersDirectionDetail = lazy(() =>
  import('./pages/MastersDirectionDetail').then((m) => ({ default: m.MastersDirectionDetail })),
)
const Circulars = lazy(() => import('./pages/Circulars').then((m) => ({ default: m.Circulars })))
const CircularDetail = lazy(() =>
  import('./pages/CircularDetail').then((m) => ({ default: m.CircularDetail })),
)
const News = lazy(() => import('./pages/News').then((m) => ({ default: m.News })))
const NewsDetail = lazy(() =>
  import('./pages/NewsDetail').then((m) => ({ default: m.NewsDetail })),
)
const Reports = lazy(() => import('./pages/Reports').then((m) => ({ default: m.Reports })))
const ReportDetail = lazy(() =>
  import('./pages/ReportDetail').then((m) => ({ default: m.ReportDetail })),
)
const Data = lazy(() => import('./pages/Data').then((m) => ({ default: m.Data })))
const Learn = lazy(() => import('./pages/Learn').then((m) => ({ default: m.Learn })))
const Offices = lazy(() => import('./pages/Offices').then((m) => ({ default: m.Offices })))
const Search = lazy(() => import('./pages/Search').then((m) => ({ default: m.Search })))
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })))

function RouteFallback() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 text-sm text-ink-muted dark:text-cream/60">
      Loading…
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="about/prototype" element={<Prototype />} />
              <Route path="prototype" element={<Prototype />} />
              <Route path="monetary-policy" element={<MonetaryPolicy />} />
              <Route path="masters-directions" element={<MastersDirections />} />
              <Route path="masters-directions/:slug" element={<MastersDirectionDetail />} />
              <Route path="circulars" element={<Circulars />} />
              <Route path="circulars/:slug" element={<CircularDetail />} />
              <Route path="news" element={<News />} />
              <Route path="news/:slug" element={<NewsDetail />} />
              <Route path="reports" element={<Reports />} />
              <Route path="reports/:slug" element={<ReportDetail />} />
              <Route path="data" element={<Data />} />
              <Route path="learn" element={<Learn />} />
              <Route path="offices" element={<Offices />} />
              <Route path="search" element={<Search />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  )
}
