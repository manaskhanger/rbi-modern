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
const Press = lazy(() => import('./pages/Press').then((m) => ({ default: m.Press })))
const NewsDetail = lazy(() =>
  import('./pages/NewsDetail').then((m) => ({ default: m.NewsDetail })),
)
const Reports = lazy(() => import('./pages/Reports').then((m) => ({ default: m.Reports })))
const Publications = lazy(() =>
  import('./pages/Publications').then((m) => ({ default: m.Publications })),
)
const ReportDetail = lazy(() =>
  import('./pages/ReportDetail').then((m) => ({ default: m.ReportDetail })),
)
const Data = lazy(() => import('./pages/Data').then((m) => ({ default: m.Data })))
const Statistics = lazy(() =>
  import('./pages/Statistics').then((m) => ({ default: m.Statistics })),
)
const Learn = lazy(() => import('./pages/Learn').then((m) => ({ default: m.Learn })))
const Tour = lazy(() => import('./pages/Tour').then((m) => ({ default: m.Tour })))
const Offices = lazy(() => import('./pages/Offices').then((m) => ({ default: m.Offices })))
const Search = lazy(() => import('./pages/Search').then((m) => ({ default: m.Search })))
const Sitemap = lazy(() => import('./pages/Sitemap').then((m) => ({ default: m.Sitemap })))
const PdfViewer = lazy(() =>
  import('./pages/PdfViewer').then((m) => ({ default: m.PdfViewer })),
)
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })))
const Functions = lazy(() => import('./pages/Functions').then((m) => ({ default: m.Functions })))
const FunctionDetail = lazy(() =>
  import('./pages/FunctionDetail').then((m) => ({ default: m.FunctionDetail })),
)
const Citizens = lazy(() => import('./pages/Citizens').then((m) => ({ default: m.Citizens })))

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
              <Route path="press" element={<Press />} />
              <Route path="news" element={<News />} />
              <Route path="news/:slug" element={<NewsDetail />} />
              <Route path="publications" element={<Publications />} />
              <Route path="reports" element={<Reports />} />
              <Route path="reports/:slug" element={<ReportDetail />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="data" element={<Data />} />
              <Route path="learn" element={<Learn />} />
              <Route path="functions" element={<Functions />} />
              <Route path="functions/:slug" element={<FunctionDetail />} />
              <Route path="citizens" element={<Citizens />} />
              <Route path="tour" element={<Tour />} />
              <Route path="offices" element={<Offices />} />
              <Route path="search" element={<Search />} />
              <Route path="sitemap" element={<Sitemap />} />
              <Route path="viewer" element={<PdfViewer />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  )
}
