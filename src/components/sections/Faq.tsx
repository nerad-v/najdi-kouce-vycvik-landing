'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { faq } from '@/lib/content/faq'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-white py-20 md:py-32">
      <Container size="default">
        <Reveal>
          <Eyebrow>{faq.eyebrow}</Eyebrow>
          <SectionHeading className="mt-4 max-w-3xl">{faq.headline}</SectionHeading>
        </Reveal>

        <div className="mt-12 divide-y divide-gray-200 border-y border-gray-200">
          {faq.items.map((item, idx) => {
            const open = idx === openIdx
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : idx)}
                  aria-expanded={open}
                  aria-controls={`faq-${idx}`}
                  className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-brand md:py-7"
                >
                  <span className="font-display text-lg font-bold text-ink-deep md:text-xl text-balance">
                    {item.q}
                  </span>
                  <span
                    className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand transition-transform ${
                      open ? 'rotate-45' : ''
                    }`}
                    aria-hidden
                  >
                    <Plus className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`faq-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 text-base leading-relaxed text-gray-600 md:pb-7 md:text-lg text-pretty">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
