import { whyUs } from '@/lib/content/value'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'

export function WhyUs() {
  return (
    <section className="bg-ink-deep py-20 text-white md:py-32">
      <Container size="wide">
        <Reveal>
          <Eyebrow tone="dark">{whyUs.eyebrow}</Eyebrow>
          <SectionHeading tone="dark" className="mt-4 max-w-3xl">
            {whyUs.headline}
          </SectionHeading>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {whyUs.pillars.map((pillar, idx) => (
            <Reveal key={pillar.number} delay={idx * 100}>
              <article className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition-all hover:border-coral/40 hover:bg-white/[0.07]">
                <div className="font-display text-5xl font-extrabold tracking-tighter text-coral">
                  {pillar.number}
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-white text-balance">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-white/75 text-pretty">
                  {pillar.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
