'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { pricing } from '@/lib/content/pricing'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { SectionHeading, SectionSub } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import { CtaButton } from '@/components/ui/CtaButton'
import { cn } from '@/lib/utils'

function formatCzk(n: number) {
  return new Intl.NumberFormat('cs-CZ').format(n)
}

type VariantId = (typeof pricing.variants)[number]['id']

export function Pricing() {
  const [activeId, setActiveId] = useState<VariantId>(pricing.variants[0].id)
  const active = pricing.variants.find((v) => v.id === activeId) ?? pricing.variants[0]

  return (
    <section id="cena" className="bg-ink-deep py-20 text-white md:py-32">
      <Container size="default">
        <Reveal>
          <Eyebrow tone="dark">{pricing.eyebrow}</Eyebrow>
          <SectionHeading tone="dark" className="mt-4 max-w-3xl">
            {pricing.headline}
          </SectionHeading>
          <SectionSub tone="dark">{pricing.sub}</SectionSub>
        </Reveal>

        <Reveal delay={150}>
          {/* Variants tabs */}
          <div
            role="tablist"
            aria-label="Cenová varianta"
            className="mt-12 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-2"
          >
            {pricing.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={activeId === v.id}
                onClick={() => setActiveId(v.id)}
                className={cn(
                  'flex-1 min-w-[140px] rounded-xl px-4 py-3 font-display text-sm font-semibold transition-colors md:text-base',
                  activeId === v.id
                    ? 'bg-brand text-white shadow-brand-soft'
                    : 'text-white/70 hover:bg-white/5 hover:text-white',
                )}
              >
                {v.label}
              </button>
            ))}
          </div>

          {/* Active variant card */}
          <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="grid gap-10 lg:grid-cols-12 lg:items-center"
              >
                <div className="lg:col-span-6">
                  <div className="font-display text-sm font-bold uppercase tracking-[0.2em] text-coral">
                    {active.label}
                  </div>
                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="font-display text-6xl font-extrabold tracking-tighter text-white md:text-7xl">
                      {formatCzk(active.price)} Kč
                    </span>
                    {active.saves > 0 && (
                      <span className="font-display text-lg font-semibold text-coral">
                        −{formatCzk(active.saves)} Kč
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-base text-white/70 text-pretty">{active.note}</p>

                  <div className="mt-8 space-y-4">
                    {pricing.paymentSteps.map((step, idx) => (
                      <div key={step.title} className="flex gap-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand font-display text-sm font-bold text-white">
                          {idx + 1}
                        </div>
                        <div>
                          <div className="font-display font-bold text-white">{step.title}</div>
                          <div className="text-sm text-white/65">{step.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="rounded-2xl border border-white/10 bg-ink-mid/40 p-6 backdrop-blur md:p-8">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm uppercase tracking-widest text-white/50">Záloha</span>
                      <span className="font-display text-3xl font-extrabold text-coral">
                        {formatCzk(pricing.deposit)} Kč
                      </span>
                    </div>
                    <div className="mt-4 h-px bg-white/10" />
                    <div className="mt-4 flex items-baseline justify-between">
                      <span className="text-sm uppercase tracking-widest text-white/50">Doplatek</span>
                      <span className="font-display text-2xl font-bold text-white">
                        {formatCzk(active.price - pricing.deposit)} Kč
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-white/50">
                      Splatný v jakémkoliv počtu splátek do {pricing.finalDate}.
                    </div>

                    <div className="mt-8">
                      <CtaButton href={pricing.ctaHref} size="lg" className="w-full justify-center">
                        {pricing.ctaLabel}
                      </CtaButton>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
