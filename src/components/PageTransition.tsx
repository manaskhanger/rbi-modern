import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { pageTransition } from '../lib/motion'

export function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()
  if (reduce) return <>{children}</>
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}
