import { useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Building2,
  Scale,
  BookOpen,
  BarChart3,
  Landmark,
  FileText,
  Newspaper,
  MapPin,
  Compass,
  Search,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from 'lucide-react'
import { spring } from '../lib/motion'

export type MapNode = {
  id: string
  label: string
  blurb: string
  to: string
  x: number
  y: number
  ring: 'core' | 'function' | 'regulatory' | 'publish' | 'data'
  icon: typeof Building2
}

const NODES: MapNode[] = [
  {
    id: 'board',
    label: 'Central Board',
    blurb: 'Mandate & organisation',
    to: '/about',
    x: 500,
    y: 70,
    ring: 'core',
    icon: Landmark,
  },
  {
    id: 'policy',
    label: 'Monetary policy',
    blurb: 'MPC & rates',
    to: '/monetary-policy',
    x: 220,
    y: 200,
    ring: 'function',
    icon: Scale,
  },
  {
    id: 'learn',
    label: 'Functions / Learn',
    blurb: 'Primers & glossary',
    to: '/learn',
    x: 500,
    y: 210,
    ring: 'function',
    icon: Compass,
  },
  {
    id: 'offices',
    label: 'Offices',
    blurb: 'Regional footprint',
    to: '/offices',
    x: 780,
    y: 200,
    ring: 'function',
    icon: MapPin,
  },
  {
    id: 'md',
    label: 'Masters Directions',
    blurb: 'Regulatory catalogue',
    to: '/masters-directions',
    x: 160,
    y: 360,
    ring: 'regulatory',
    icon: BookOpen,
  },
  {
    id: 'circulars',
    label: 'Circulars',
    blurb: 'Notifications-style',
    to: '/circulars',
    x: 380,
    y: 370,
    ring: 'regulatory',
    icon: FileText,
  },
  {
    id: 'reports',
    label: 'Publications',
    blurb: 'Reports digests',
    to: '/reports',
    x: 620,
    y: 370,
    ring: 'publish',
    icon: Newspaper,
  },
  {
    id: 'news',
    label: 'News',
    blurb: 'Sample updates',
    to: '/news',
    x: 840,
    y: 360,
    ring: 'publish',
    icon: Building2,
  },
  {
    id: 'data',
    label: 'Data lab',
    blurb: 'Illustrative series',
    to: '/data',
    x: 400,
    y: 520,
    ring: 'data',
    icon: BarChart3,
  },
  {
    id: 'search',
    label: 'Search',
    blurb: 'Find across catalogue',
    to: '/search',
    x: 600,
    y: 520,
    ring: 'data',
    icon: Search,
  },
]

const EDGES: [string, string][] = [
  ['board', 'policy'],
  ['board', 'learn'],
  ['board', 'offices'],
  ['learn', 'md'],
  ['learn', 'circulars'],
  ['learn', 'reports'],
  ['learn', 'news'],
  ['md', 'data'],
  ['circulars', 'data'],
  ['reports', 'search'],
  ['news', 'search'],
]

const ringStroke: Record<MapNode['ring'], string> = {
  core: '#C5A572',
  function: '#1B3A5F',
  regulatory: '#8B6914',
  publish: '#3D5A80',
  data: '#4A6741',
}

type Props = {
  /** Compact teaser for Home / Learn / About */
  teaser?: boolean
  className?: string
}

export function InteractiveSiteMap({ teaser = false, className = '' }: Props) {
  const reduce = useReducedMotion()
  const navigate = useNavigate()
  const [hover, setHover] = useState<string | null>(null)
  const [scale, setScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null)
  const nodeById = useMemo(() => Object.fromEntries(NODES.map((n) => [n.id, n])), [])

  const height = teaser ? 340 : 580
  const vb = teaser ? '80 20 840 420' : '40 0 920 600'

  function onPointerDown(e: React.PointerEvent) {
    if (teaser) return
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    drag.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y }
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!drag.current) return
    setPan({
      x: drag.current.px + (e.clientX - drag.current.x),
      y: drag.current.py + (e.clientY - drag.current.y),
    })
  }
  function onPointerUp() {
    drag.current = null
  }

  return (
    <div className={`relative ${className}`}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-dim dark:text-gold">
            {teaser ? 'Explore the map' : 'Interactive information architecture'}
          </p>
          <p className="mt-0.5 text-sm text-ink-muted dark:text-cream/60">
            Central Board → functions → regulatory / publications / data. Click a node to navigate.
            Illustrative schematic for this unofficial prototype.
          </p>
        </div>
        {!teaser && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="rounded-md border border-navy/15 p-1.5 text-navy hover:bg-gold/10 dark:border-white/20 dark:text-cream"
              aria-label="Zoom out"
              onClick={() => setScale((s) => Math.max(0.7, +(s - 0.1).toFixed(2)))}
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="rounded-md border border-navy/15 p-1.5 text-navy hover:bg-gold/10 dark:border-white/20 dark:text-cream"
              aria-label="Zoom in"
              onClick={() => setScale((s) => Math.min(1.6, +(s + 0.1).toFixed(2)))}
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="rounded-md border border-navy/15 p-1.5 text-navy hover:bg-gold/10 dark:border-white/20 dark:text-cream"
              aria-label="Reset view"
              onClick={() => {
                setScale(1)
                setPan({ x: 0, y: 0 })
              }}
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div
        className={`overflow-hidden rounded-2xl border border-navy/10 bg-gradient-to-b from-cream/90 to-white dark:border-white/10 dark:from-navy-light/50 dark:to-navy/60 ${
          teaser ? '' : 'cursor-grab active:cursor-grabbing'
        }`}
        style={{ height }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <motion.svg
          viewBox={vb}
          className="h-full w-full select-none"
          role="img"
          aria-label="Interactive site map of this prototype"
          style={{
            transform: teaser
              ? undefined
              : `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: 'center center',
          }}
        >
          <defs>
            <filter id="nodeGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.18" />
            </filter>
          </defs>

          {EDGES.map(([a, b], i) => {
            const na = nodeById[a]
            const nb = nodeById[b]
            if (!na || !nb) return null
            const active = hover === a || hover === b
            return (
              <motion.line
                key={`${a}-${b}`}
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
                stroke={active ? '#C5A572' : 'rgba(27,58,95,0.22)'}
                strokeWidth={active ? 2.2 : 1.4}
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={reduce ? undefined : { pathLength: 1, opacity: 1 }}
                transition={reduce ? undefined : { ...spring, delay: 0.04 * i }}
              />
            )
          })}

          {NODES.map((n, i) => {
            const Icon = n.icon
            const active = hover === n.id
            const w = n.ring === 'core' ? 168 : 150
            const h = 56
            return (
              <motion.g
                key={n.id}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                transition={reduce ? undefined : { ...spring, delay: 0.05 + i * 0.035 }}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHover(n.id)}
                onMouseLeave={() => setHover(null)}
                onClick={(e) => {
                  e.stopPropagation()
                  navigate(n.to)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    navigate(n.to)
                  }
                }}
                tabIndex={0}
                role="link"
                aria-label={`${n.label}: ${n.blurb}`}
              >
                <rect
                  x={n.x - w / 2}
                  y={n.y - h / 2}
                  width={w}
                  height={h}
                  rx={12}
                  fill={active ? 'rgba(197,165,114,0.18)' : 'rgba(255,255,255,0.92)'}
                  stroke={ringStroke[n.ring]}
                  strokeWidth={active ? 2.4 : 1.6}
                  filter="url(#nodeGlow)"
                />
                <foreignObject
                  x={n.x - w / 2 + 10}
                  y={n.y - h / 2 + 8}
                  width={w - 20}
                  height={h - 12}
                >
                  <div className="flex items-center gap-2 pointer-events-none">
                    <Icon
                      className="h-4 w-4 shrink-0"
                      style={{ color: ringStroke[n.ring] }}
                      aria-hidden
                    />
                    <div className="min-w-0 leading-tight">
                      <p className="truncate text-[12px] font-semibold text-[#1B3A5F]">{n.label}</p>
                      <p className="truncate text-[10px] text-[#5a6a7a]">{n.blurb}</p>
                    </div>
                  </div>
                </foreignObject>
              </motion.g>
            )
          })}
        </motion.svg>
      </div>

      {/* Mobile stacked fallback list */}
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:hidden">
        {NODES.map((n) => (
          <li key={n.id}>
            <Link
              to={n.to}
              className="flex items-center gap-2 rounded-lg border border-navy/10 bg-white/80 px-3 py-2 text-sm font-medium text-navy transition hover:border-gold/40 dark:border-white/10 dark:bg-navy-light/40 dark:text-cream"
            >
              <n.icon className="h-4 w-4 text-gold-dim dark:text-gold" aria-hidden />
              <span>
                {n.label}
                <span className="mt-0.5 block text-[11px] font-normal text-ink-muted dark:text-cream/55">
                  {n.blurb}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {teaser && (
        <p className="mt-3 text-sm">
          <Link
            to="/sitemap"
            className="font-medium text-gold-dim underline-offset-2 hover:underline dark:text-gold"
          >
            Open full interactive sitemap →
          </Link>
        </p>
      )}
    </div>
  )
}

/** Compact CTA card pointing to the illustrated map. */
export function ExploreMapTeaser({ className = '' }: { className?: string }) {
  return (
    <div
      className={`rounded-xl border border-gold/35 bg-gold/10 p-4 dark:border-gold/25 ${className}`}
    >
      <p className="text-sm font-semibold text-navy dark:text-cream">Explore the map</p>
      <p className="mt-1 text-sm text-ink-muted dark:text-cream/65">
        Animated org + information-architecture map — Central Board, functions, regulatory library,
        publications and data nodes.
      </p>
      <Link
        to="/sitemap"
        className="mt-2 inline-flex text-sm font-medium text-gold-dim hover:underline dark:text-gold"
      >
        Open interactive sitemap →
      </Link>
    </div>
  )
}
