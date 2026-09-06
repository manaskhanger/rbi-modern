import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './hooks/useTheme'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { MonetaryPolicy } from './pages/MonetaryPolicy'
import { MastersDirections } from './pages/MastersDirections'
import { MastersDirectionDetail } from './pages/MastersDirectionDetail'
import { Circulars } from './pages/Circulars'
import { CircularDetail } from './pages/CircularDetail'
import { News } from './pages/News'
import { NewsDetail } from './pages/NewsDetail'
import { Reports } from './pages/Reports'
import { ReportDetail } from './pages/ReportDetail'
import { Data } from './pages/Data'
import { Learn } from './pages/Learn'
import { Offices } from './pages/Offices'
import { NotFound } from './pages/NotFound'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "") || "/"}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
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
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
