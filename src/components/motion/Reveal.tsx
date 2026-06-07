'use client'
import { useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

/**
 * Pattern #2 z wow-catalog.md — Scroll-reveal sections (IntersectionObserver).
 *
 * Reference: stripe.com enterprise cards, vercel.com testimonials.
 * Codrops tutorial: https://tympanus.net/codrops/2026/03/02/sticky-grid-scroll/
 *
 * Použití:
 *   <Reveal>...</Reveal>
 *   <Reveal delay={80}>...</Reveal>  ← stagger child s 80ms delay
 *
 * Antipattern: framer-motion `whileInView` je v headless prohlížeči nespolehlivý.
 * Používej tenhle hook s ref místo whileInView.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
      }}
      className={className}
    >
      {children}
    </div>
  )
}
