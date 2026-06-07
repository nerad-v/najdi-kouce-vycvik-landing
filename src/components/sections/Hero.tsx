'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { hero } from '@/lib/content/hero'
import { Container } from '@/components/ui/Container'
import { CtaButton } from '@/components/ui/CtaButton'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ShieldCheck, Wallet, Phone } from 'lucide-react'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } },
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-deep pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Subtle radial accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-brand/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -bottom-20 h-[400px] w-[400px] rounded-full bg-coral/10 blur-3xl"
      />

      <Container size="wide" className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="lg:col-span-7"
          >
            <motion.div variants={item}>
              <Eyebrow tone="dark">{hero.eyebrow}</Eyebrow>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-5 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-7xl text-balance"
            >
              {hero.headline.line1}
              <br />
              <span className="text-coral">{hero.headline.line2}</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl text-pretty"
            >
              {hero.sub}
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
              <CtaButton href={hero.ctaPrimary.href} size="lg">
                {hero.ctaPrimary.label}
              </CtaButton>
              <CtaButton href={hero.ctaSecondary.href} variant="secondary" size="lg">
                {hero.ctaSecondary.label}
              </CtaButton>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/60"
            >
              <span className="inline-flex items-center gap-2">
                <Wallet className="h-4 w-4 text-coral" aria-hidden />
                Záloha 4 800 Kč
              </span>
              <span className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4 text-coral" aria-hidden />
                Rozhodneme spolu telefonem
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-coral" aria-hidden />
                Garance po prvním dni
              </span>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto h-[460px] w-full max-w-lg md:h-[540px] lg:h-[560px]">
              {/* Coral offset frame — matches photo container, doesn't extend below the fade */}
              <div
                aria-hidden
                className="absolute inset-0 -translate-x-3 -translate-y-3 rounded-3xl border-2 border-coral/50"
              />
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <Image
                  src="/people/martin-hero.png"
                  alt="Martin Musil — hlavní lektor"
                  fill
                  priority
                  sizes="(min-width: 1024px) 560px, (min-width: 768px) 640px, 100vw"
                  className="object-cover object-top [mask-image:linear-gradient(180deg,black_0%,black_70%,transparent_100%)] [-webkit-mask-image:linear-gradient(180deg,black_0%,black_70%,transparent_100%)]"
                  quality={90}
                />
              </div>
              <div className="absolute -bottom-4 left-0 z-10 rounded-2xl bg-white p-4 shadow-2xl">
                <div className="font-display text-xs font-semibold uppercase tracking-widest text-brand">
                  Hlavní lektor
                </div>
                <div className="font-display text-lg font-bold text-ink-deep">Martin Musil</div>
                <div className="text-sm text-gray-600">1000+ hodin koučování</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
