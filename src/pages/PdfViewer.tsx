import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink, FileText } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { DisclaimerBanner } from '../components/DisclaimerBanner'

const ALLOWED_HOSTS = new Set(['rbidocs.rbi.org.in', 'www.rbi.org.in', 'rbi.org.in'])

function parseSrc(raw: string | null): URL | null {
  if (!raw) return null
  try {
    const u = new URL(raw)
    if (u.protocol !== 'https:') return null
    if (!ALLOWED_HOSTS.has(u.hostname)) return null
    return u
  } catch {
    return null
  }
}

/**
 * Optional embed viewer for official RBI PDFs / pages.
 * If framing is blocked (common on rbidocs), fall back to window.open via the CTA.
 */
export function PdfViewer() {
  const [params] = useSearchParams()
  const url = useMemo(() => parseSrc(params.get('src')), [params])
  const [framed, setFramed] = useState(true)

  function openExternal() {
    if (!url) return
    window.open(url.toString(), '_blank', 'noopener,noreferrer')
    setFramed(false)
  }

  if (!url) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-lg font-semibold text-navy dark:text-cream">Invalid viewer source</p>
        <p className="mt-2 text-sm text-ink-muted">
          Only https links on rbi.org.in / rbidocs.rbi.org.in are allowed.
        </p>
        <Link to="/masters-directions" className="mt-4 inline-block text-gold-dim underline">
          Back to Masters Directions
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
      <Link
        to="/masters-directions"
        className="mb-4 inline-flex items-center gap-2 text-sm text-ink-muted hover:text-navy dark:hover:text-cream"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>
      <PageHeader
        eyebrow="Official document"
        title="PDF viewer (outbound)"
        description="Attempts to embed an official RBI URL. RBI often blocks iframes — use Open in new tab (same behaviour as rbi.org.in PDF links). No RBI PDF binaries are hosted in this prototype."
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={openExternal}
          className="inline-flex items-center gap-2 rounded-md bg-navy px-4 py-2 text-sm font-semibold text-cream dark:bg-gold dark:text-navy"
        >
          <FileText className="h-4 w-4" aria-hidden />
          Open in new tab
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </button>
        <p className="break-all text-xs text-ink-muted dark:text-cream/50">{url.toString()}</p>
      </div>

      {framed ? (
        <div className="overflow-hidden rounded-xl border border-navy/10 bg-white dark:border-white/10">
          <iframe
            title="Official RBI document"
            src={url.toString()}
            className="h-[75vh] w-full"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            onError={() => {
              openExternal()
            }}
          />
          <p className="border-t border-navy/5 px-4 py-2 text-[11px] text-ink-muted dark:border-white/10 dark:text-cream/45">
            If the frame stays blank, RBI is blocking embedding —{' '}
            <button type="button" className="font-semibold text-gold-dim underline" onClick={openExternal}>
              open the official document
            </button>
            .
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-navy/20 bg-white/70 px-6 py-14 text-center dark:border-white/15 dark:bg-navy-light/30">
          <p className="text-sm font-medium text-navy dark:text-cream">
            Framing unavailable — use the button above to open the official document on RBI.
          </p>
        </div>
      )}

      <div className="mt-8">
        <DisclaimerBanner />
      </div>
    </div>
  )
}
