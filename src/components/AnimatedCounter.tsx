import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/** Animate a numeric rate string like "5.50%" or "18.00%" when scrolled into view. */
export function AnimatedCounter({
  value,
  className = '',
}: {
  value: string
  className?: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const match = value.match(/^([\d.]+)(.*)$/)
  const target = match ? parseFloat(match[1]) : NaN
  const suffix = match ? match[2] : value
  const decimals = match && match[1].includes('.') ? match[1].split('.')[1].length : 0
  const [display, setDisplay] = useState(reduce || Number.isNaN(target) ? value : format(0, decimals) + suffix)

  useEffect(() => {
    if (reduce || Number.isNaN(target)) {
      setDisplay(value)
      return
    }
    const el = ref.current
    if (!el) return
    let raf = 0
    let started = false
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return
        started = true
        obs.disconnect()
        const duration = 900
        const t0 = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - t0) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          setDisplay(format(target * eased, decimals) + suffix)
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, target, suffix, decimals, reduce])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}

function format(n: number, decimals: number) {
  return n.toFixed(decimals)
}
