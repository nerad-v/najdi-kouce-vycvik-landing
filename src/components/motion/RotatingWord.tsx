'use client'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Pattern #17 z wow-catalog.md — Rotating text headline.
 *
 * Reference: shopify.com — "Be the next [AI all-star | household name | solo-preneur]"
 *
 * Klíčový pattern z premium SaaS analysis. Visual movement bez videa.
 *
 * Použití:
 *   <RotatingWord words={['vás', 'tým', 'školu']} />
 */
export function RotatingWord({
  words,
  interval = 3000,
  className = 'inline-block italic',
}: {
  words: string[]
  interval?: number
  className?: string
}) {
  const [index, setIndex] = useState(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length)
    }, interval)
    return () => clearInterval(id)
  }, [words.length, interval, reducedMotion])

  if (reducedMotion) {
    return <span className={className}>{words[0]}</span>
  }

  return (
    <span className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={className}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
