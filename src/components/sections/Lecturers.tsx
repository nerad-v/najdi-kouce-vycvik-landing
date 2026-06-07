import Image from 'next/image'
import { lecturers } from '@/lib/content/lecturers'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { SectionHeading, SectionSub } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
}

export function Lecturers() {
  return (
    <section id="lektori" className="bg-white py-20 md:py-32">
      <Container size="wide">
        <Reveal>
          <Eyebrow>{lecturers.eyebrow}</Eyebrow>
          <SectionHeading className="mt-4 max-w-3xl">{lecturers.headline}</SectionHeading>
          <SectionSub>{lecturers.sub}</SectionSub>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {lecturers.items.map((person, idx) => (
            <Reveal key={person.name} delay={idx * 60}>
              <article className="flex h-full gap-6 rounded-3xl border border-gray-200 bg-white p-6 transition-all hover:border-brand/40 hover:shadow-brand-soft md:p-8">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-brand-soft md:h-32 md:w-32">
                  {person.hasPhoto ? (
                    <Image
                      src={person.photo}
                      alt={person.name}
                      fill
                      sizes="128px"
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-display text-3xl font-bold text-brand md:text-4xl">
                      {getInitials(person.name)}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-xl font-bold text-ink-deep md:text-2xl text-balance">
                    {person.name}
                  </h3>
                  <div className="mt-1 text-sm font-medium text-brand">{person.role}</div>
                  <p className="mt-3 text-base leading-relaxed text-gray-600 text-pretty">
                    {person.bio}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
