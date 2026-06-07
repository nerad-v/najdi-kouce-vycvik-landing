'use client'
import { useEffect, useRef } from 'react'
import {
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  motion,
} from 'framer-motion'

/**
 * Pattern #6 z wow-catalog.md — Animated number counter (metric-based social proof).
 *
 * Reference (verified premium SaaS pattern):
 * - vercel.com — "build times 7m to 40s", "95% reduction"
 * - stripe.com — "135+ currencies", "US$1.9tn processed"
 * - retool.com — "$8M saved", "20,000+ hours"
 *
 * Klíčový insight: konkrétní čísla > generic logos.
 *
 * Použití:
 *   <NumberCounter value={4000} suffix="+" />
 *   <NumberCounter value={8} prefix="$" suffix="M" />
 */
export function NumberCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2000,
}: {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration, bounce: 0 })
  const display = useTransform(springValue, (latest) =>
    Math.round(latest).toLocaleString('cs-CZ'),
  )

  useEffect(() => {
    if (inView) motionValue.set(value)
  }, [inView, value, motionValue])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  )
}
