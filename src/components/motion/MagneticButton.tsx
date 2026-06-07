'use client'
import { useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Pattern #11 z wow-catalog.md — Magnetic button (cursor attraction).
 *
 * Reference: obys.agency (Awwwards SOTD May 2026), magnetic hover states.
 *
 * Použití:
 *   <MagneticButton onClick={...}>Rezervovat místo</MagneticButton>
 */
export function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  ...props
}: {
  children: ReactNode
  className?: string
  strength?: number
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ref = useRef<HTMLButtonElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const reducedMotion = useReducedMotion()

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current || reducedMotion) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = e.clientX - (left + width / 2)
    const y = e.clientY - (top + height / 2)
    setPos({ x: x * strength, y: y * strength })
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', damping: 15, stiffness: 200 }}
      className={className}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  )
}
