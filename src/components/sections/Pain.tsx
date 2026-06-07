import { pain } from '@/lib/content/painOutcomes'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { SectionHeading, SectionSub } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'

export function Pain() {
  return (
    <section className="bg-gray-50 py-20 md:py-32">
      <Container size="wide">
        <Reveal>
          <Eyebrow>{pain.eyebrow}</Eyebrow>
          <SectionHeading className="mt-4 max-w-3xl">{pain.headline}</SectionHeading>
          <SectionSub>{pain.sub}</SectionSub>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pain.items.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 60}>
              <div className="h-full rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-brand-soft">
                <div className="font-display text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-4 font-display text-xl font-bold leading-snug text-ink-deep md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-gray-600 text-pretty">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
