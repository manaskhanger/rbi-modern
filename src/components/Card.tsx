import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

const base =
  'group glass-card rounded-2xl p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10 dark:hover:shadow-black/40'

export function Card({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`${base} ${className}`}>{children}</div>
}

export function CardLink({
  to,
  children,
  className = '',
}: {
  to: string
  children: ReactNode
  className?: string
}) {
  return (
    <Link to={to} className={`${base} block ${className}`}>
      {children}
    </Link>
  )
}
