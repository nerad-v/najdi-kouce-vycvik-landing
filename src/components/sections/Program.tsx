'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { program } from '@/lib/content/program'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { SectionHeading, SectionSub } from '@/components/ui/SectionHeading'
import { Calendar, Check } from 'lucide-react'

export function Program() {
  const [activeIdx, setActiveIdx] = useState(0)
  const progress = ((activeIdx + 1) / program.blocks.length) * 100

  return (
    <section id="program" className="relative bg-ink-deep py-20 text-white md:py-32">
      <Container size="wide">
        <div className="mb-14 max-w-3xl">
          <Eyebrow tone="dark">{program.eyebrow}</Eyebrow>
          <SectionHeading tone="dark" className="mt-4">
            {program.headline}
          </SectionHeading>
          <SectionSub tone="dark">{program.sub}</SectionSub>
        </div>

        <div className="relative">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Sticky left column */}
            <aside className="hidden lg:col-span-4 lg:block">
              <div className="sticky top-28">
                <div className="relative rounded-3xl border border-white/10 bg-ink-mid/50 p-7 backdrop-blur-sm">
                  <div className="font-display text-xs font-bold uppercase tracking-[0.2em] text-coral">
                    Aktuální blok
                  </div>

                  <div className="mt-3 min-h-[6.5rem]">
                    <motion.div
                      key={activeIdx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">
                        {program.blocks[activeIdx].title}
                      </div>
                      <div className="mt-2 text-sm text-white/60">
                        {program.blocks[activeIdx].dates}
                      </div>
                    </motion.div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-6 h-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-brand to-coral"
                    />
                  </div>

                  <div className="mt-3 flex justify-between text-xs text-white/50">
                    <span>
                      Krok {activeIdx + 1} / {program.blocks.length}
                    </span>
                    <span>
                      {activeIdx === program.blocks.length - 1 ? 'Zkouška' : 'Dál'}
                    </span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right column with all blocks */}
            <div className="lg:col-span-8">
              <ol className="space-y-20">
                {program.blocks.map((block, idx) => (
                  <BlockCard
                    key={block.number}
                    block={block}
                    idx={idx}
                    onActive={(i) => setActiveIdx(i)}
                  />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function BlockCard({
  block,
  idx,
  onActive,
}: {
  block: (typeof program.blocks)[number]
  idx: number
  onActive: (i: number) => void
}) {
  const ref = useRef<HTMLLIElement>(null)
  // Trigger when block's TOP crosses the middle of the viewport
  // margin: top, right, bottom, left — bottom -50% means activate when entering top half
  const inView = useInView(ref, { margin: '-40% 0px -40% 0px', amount: 0.1 })

  if (inView) onActive(idx)

  return (
    <li
      ref={ref}
      className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-10"
    >
      <div className="flex items-baseline gap-5">
        <span className="font-display text-6xl font-extrabold leading-none tracking-tighter text-coral md:text-7xl">
          {block.number}
        </span>
        <div>
          <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
            {block.title}
          </h3>
          <div className="mt-1 inline-flex items-center gap-2 text-sm text-white/60">
            <Calendar className="h-4 w-4" aria-hidden />
            {block.dates}
          </div>
        </div>
      </div>

      <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg text-pretty">
        {block.summary}
      </p>

      <ul className="mt-8 space-y-3">
        {block.topics.map((topic) => (
          <li key={topic} className="flex items-start gap-3">
            <Check className="mt-1 h-4 w-4 shrink-0 text-coral" strokeWidth={2.5} aria-hidden />
            <span className="min-w-0 flex-1 text-base text-white/80 text-pretty">{topic}</span>
          </li>
        ))}
      </ul>
    </li>
  )
}
