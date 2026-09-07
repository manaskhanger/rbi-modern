import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

const base =
  'group portal-panel p-4 md:p-5 transition-colors duration-150 hover:border-gold/45'

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
