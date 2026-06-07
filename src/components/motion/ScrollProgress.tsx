'use client'
import { motion, useScroll } from 'framer-motion'

/**
 * Pattern #13 z wow-catalog.md — Scroll progress indicator.
 *
 * Reference: long-form articles, dlouhé landing pages.
 *
 * Použití:
 *   v root layout.tsx:
 *   <ScrollProgress />
 */
export function ScrollProgress({
  className = 'fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand to-coral origin-left z-[60]',
}: {
  className?: string
}) {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className={`${className} motion-reduce:hidden`}
      aria-hidden
    />
  )
}
