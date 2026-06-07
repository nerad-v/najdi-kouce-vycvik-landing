'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { nav } from '@/lib/content/nav'
import { cn } from '@/lib/utils'
import { scrollToAnchor } from './SmoothScroll'

export function Nav() {
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    return scrollY.on('change', (v) => setScrolled(v > 80))
  }, [scrollY])

  const padY = useTransform(scrollY, [0, 120], ['1rem', '0.5rem'])

  return (
    <motion.header
      style={{ paddingTop: padY, paddingBottom: padY }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled ? 'bg-ink-deep/85 backdrop-blur-md border-b border-white/10' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-8">
        <Link href="/" className="relative flex items-center" aria-label="Najdi kouče">
          <Image
            src="/brand/logo-white.png"
            alt="Najdi kouče"
            width={2048}
            height={653}
            priority
            className="h-9 w-auto md:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => {
                e.preventDefault()
                scrollToAnchor(l.href)
              }}
              className="font-display text-sm font-semibold text-white/80 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href={nav.cta.href}
            onClick={(e) => {
              e.preventDefault()
              scrollToAnchor(nav.cta.href)
            }}
            className="group inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 font-display text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-dark hover:scale-[1.02]"
          >
            <span>{nav.cta.label}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Otevřít menu"
          aria-expanded={open}
          className="rounded-md p-2 text-white md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:hidden"
          >
            <div className="space-y-1 border-t border-white/10 bg-ink-deep px-6 pb-6 pt-4">
              {nav.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault()
                    setOpen(false)
                    scrollToAnchor(l.href)
                  }}
                  className="block py-3 font-display text-base font-semibold text-white/90 hover:text-white"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={nav.cta.href}
                onClick={(e) => {
                  e.preventDefault()
                  setOpen(false)
                  scrollToAnchor(nav.cta.href)
                }}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 font-display text-base font-semibold text-white"
              >
                {nav.cta.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
