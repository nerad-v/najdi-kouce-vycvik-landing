import Image from 'next/image'
import { Star } from 'lucide-react'
import { testimonials } from '@/lib/content/testimonials'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { SectionHeading, SectionSub } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import { LiteYoutube } from '@/components/motion/LiteYoutube'

type Item = {
  name: string
  role: string
  photo: string
  stars: number
  quote: string
  videoId?: string
}

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber text-amber" aria-hidden />
      ))}
    </div>
  )
}

function Footer({ t }: { t: Item }) {
  return (
    <div className="flex items-center gap-3 border-t border-gray-100 pt-5">
      <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-100">
        <Image src={t.photo} alt={t.name} fill sizes="48px" className="object-cover" />
      </div>
      <div>
        <div className="font-display font-bold text-ink-deep">{t.name}</div>
        <div className="text-sm text-gray-500">{t.role}</div>
      </div>
    </div>
  )
}

function VideoCard({ t }: { t: Item }) {
  return (
    <article className="flex w-[340px] shrink-0 flex-col rounded-3xl border border-gray-200 bg-white p-4 shadow-sm md:w-[400px]">
      <div className="aspect-video overflow-hidden rounded-2xl">
        <LiteYoutube videoId={t.videoId!} title={`Video reference — ${t.name}`} />
      </div>
      <div className="mt-4 flex-1 px-3">
        <StarRow count={t.stars} />
        <p className="mt-3 text-sm leading-relaxed text-gray-700 text-pretty">
          „{t.quote.split('.')[0]}."
        </p>
      </div>
      <div className="mt-4 px-3">
        <Footer t={t} />
      </div>
    </article>
  )
}

function TextCard({ t }: { t: Item }) {
  return (
    <article className="flex w-[340px] shrink-0 flex-col rounded-3xl border border-gray-200 bg-white p-7 shadow-sm md:w-[400px] md:p-8">
      <StarRow count={t.stars} />
      <blockquote className="mt-5 flex-1 text-base leading-relaxed text-gray-700 text-pretty md:text-lg">
        „{t.quote}"
      </blockquote>
      <div className="mt-6">
        <Footer t={t} />
      </div>
    </article>
  )
}

function Card({ t }: { t: Item }) {
  return t.videoId ? <VideoCard t={t} /> : <TextCard t={t} />
}

export function Testimonials() {
  const items: Item[] = [...testimonials.items]

  return (
    <section className="bg-white py-20 md:py-32">
      <Container size="wide">
        <Reveal>
          <Eyebrow>{testimonials.eyebrow}</Eyebrow>
          <SectionHeading className="mt-4 max-w-3xl">{testimonials.headline}</SectionHeading>
          <SectionSub>{testimonials.sub}</SectionSub>
        </Reveal>
      </Container>

      <Reveal>
        <div className="mt-14 mask-fade-x overflow-hidden">
          <div className="group/marquee flex w-max gap-6 animate-marquee motion-reduce:animate-none [animation-play-state:running] hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] active:[animation-play-state:paused]">
            {items.map((t) => (
              <Card key={`a-${t.name}`} t={t} />
            ))}
            {items.map((t) => (
              <Card key={`b-${t.name}`} t={t} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
