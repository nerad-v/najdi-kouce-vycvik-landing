'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { scrollToAnchor } from '@/components/layout/SmoothScroll'

type Variant = 'primary' | 'secondary' | 'inverted'

export function CtaButton({
  href,
  children,
  variant = 'primary',
  className,
  size = 'md',
}: {
  href: string
  children: React.ReactNode
  variant?: Variant
  className?: string
  size?: 'md' | 'lg'
}) {
  const base =
    'group inline-flex items-center gap-2 rounded-lg font-display font-semibold transition-all duration-200 ease-out active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2'
  const sizing = size === 'lg' ? 'px-7 py-4 text-lg' : 'px-5 py-3 text-base'
  const styles: Record<Variant, string> = {
    primary:
      'bg-brand text-white hover:bg-brand-dark hover:shadow-brand-soft hover:scale-[1.02] focus-visible:outline-brand',
    secondary:
      'bg-white/10 text-white border border-white/15 hover:bg-white/20 hover:border-white/30 focus-visible:outline-white',
    inverted:
      'bg-white text-ink-deep hover:bg-brand hover:text-white hover:scale-[1.02] focus-visible:outline-brand',
  }

  const content = (
    <>
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
    </>
  )

  // Hash anchor — use plain <a> with onClick that scrolls (Lenis-compatible)
  if (href.startsWith('#')) {
    return (
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault()
          scrollToAnchor(href)
        }}
        className={cn(base, sizing, styles[variant], className)}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={cn(base, sizing, styles[variant], className)}>
      {content}
    </Link>
  )
}
