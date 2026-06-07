import { outcomes } from '@/lib/content/painOutcomes'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import { Check } from 'lucide-react'

export function Outcomes() {
  return (
    <section className="bg-white py-20 md:py-32">
      <Container size="wide">
        <Reveal>
          <Eyebrow>{outcomes.eyebrow}</Eyebrow>
          <SectionHeading className="mt-4 max-w-3xl">{outcomes.headline}</SectionHeading>
        </Reveal>

        <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {outcomes.items.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 50}>
              <div className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                  <Check className="h-6 w-6" strokeWidth={2.5} aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-xl font-bold text-ink-deep md:text-2xl text-balance">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-gray-600 text-pretty">
                    {item.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
