import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

const base =
  'group glass-card rounded-xl p-4 md:p-5 transition-colors duration-200 hover:border-gold/35 hover:shadow-md hover:shadow-navy/5 dark:hover:shadow-black/30'

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`${base} ${className}`}>{children}</div>
}

export function CardLink({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link to={to} className={`${base} block ${className}`}>
      {children}
    </Link>
  )
}
