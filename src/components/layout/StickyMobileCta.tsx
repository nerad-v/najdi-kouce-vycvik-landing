'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import { scrollToAnchor } from './SmoothScroll'

const DISMISS_KEY = 'sticky-cta-dismissed'

/**
 * Compact persistent bottom CTA on mobile.
 * - Shows only after user reaches Program section (past Pain + Outcomes)
 * - Hides when final CTA form is in view
 * - User can dismiss it (X button → sessionStorage flag, resets next visit)
 */
export function StickyMobileCta() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem(DISMISS_KEY) === '1') {
      setDismissed(true)
      return
    }

    function update() {
      const program = document.getElementById('program')
      const rezervace = document.getElementById('rezervace')
      if (!program) return
      const programTop = program.getBoundingClientRect().top
      const viewport = window.innerHeight
      const formInView =
        rezervace && rezervace.getBoundingClientRect().top < viewport * 0.9
      // Show once Program enters middle of viewport, hide once form is in view
      setVisible(programTop < viewport * 0.6 && !formInView)
    }
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  if (dismissed) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-40 md:hidden"
        >
          <div className="flex items-stretch overflow-hidden rounded-full bg-brand shadow-xl shadow-brand/30 ring-1 ring-white/20">
            <button
              type="button"
              onClick={() => scrollToAnchor('#rezervace')}
              className="flex flex-1 items-center justify-center gap-2 px-5 py-3 font-display text-sm font-semibold text-white"
            >
              <span>Rezervovat místo</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => {
                sessionStorage.setItem(DISMISS_KEY, '1')
                setDismissed(true)
              }}
              aria-label="Skrýt rezervační tlačítko"
              className="flex items-center justify-center border-l border-white/15 px-2.5 text-white/45 transition-colors hover:text-white"
            >
              <X className="h-3 w-3" aria-hidden />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
