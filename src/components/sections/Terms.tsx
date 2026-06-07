import { terms } from '@/lib/content/pricing'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { SectionHeading, SectionSub } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'

export function Terms() {
  return (
    <section id="terminy" className="bg-ink-deep py-20 text-white md:py-32">
      <Container size="wide">
        <Reveal>
          <Eyebrow tone="dark">{terms.eyebrow}</Eyebrow>
          <SectionHeading tone="dark" className="mt-4 max-w-3xl">
            {terms.headline}
          </SectionHeading>
          <SectionSub tone="dark">{terms.sub}</SectionSub>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          {/* Blocks left — visually unified as ONE journey */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
                <div className="font-display text-xs font-bold uppercase tracking-[0.18em] text-coral">
                  Jeden výcvik · tři víkendy
                </div>
                <ol className="relative mt-6 space-y-6">
                  {/* Vertical timeline line */}
                  <div
                    aria-hidden
                    className="absolute left-7 top-2 bottom-2 w-px bg-gradient-to-b from-brand via-coral to-brand/30 md:left-8"
                  />
                  {terms.blocks.map((b) => (
                    <li key={b.label} className="relative flex items-center gap-5">
                      <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand text-white shadow-brand-soft md:h-16 md:w-16">
                        <Calendar className="h-6 w-6" aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-display text-xs font-bold uppercase tracking-[0.18em] text-white/50">
                          {b.label}
                        </div>
                        <div className="font-display text-xl font-bold text-white md:text-2xl">
                          {b.dates}
                        </div>
                        <div className="text-sm text-white/60">{b.day}</div>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-sm text-white/70">
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4 text-coral" aria-hidden />
                    Začátek {terms.schedule.morning}, oběd {terms.schedule.lunch}, konec {terms.schedule.end}
                  </span>
                </div>
                <div className="mt-2 text-sm text-white/50">{terms.schedule.note}</div>
              </div>
            </Reveal>
          </div>

          {/* Capacity + Map right */}
          <div className="space-y-6 lg:col-span-5">
            <Reveal delay={120}>
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-brand/30 to-coral/20 p-6 md:p-8">
                <div className="flex items-center gap-3 text-white/70">
                  <Users className="h-5 w-5 text-coral" aria-hidden />
                  <span className="text-sm">{terms.capacity.label}</span>
                </div>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="font-display text-6xl font-extrabold tracking-tighter text-white md:text-7xl">
                    {terms.capacity.available}
                  </span>
                  <span className="font-display text-2xl text-white/50">/ {terms.capacity.total}</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-coral transition-all"
                    style={{
                      width: `${((terms.capacity.total - terms.capacity.available) / terms.capacity.total) * 100}%`,
                    }}
                  />
                </div>
                <p className="mt-4 text-sm text-white/70">
                  Skupinu uzavíráme po dosažení kapacity, nebo měsíc před startem výcviku.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-coral" aria-hidden />
                  <div>
                    <div className="font-display text-lg font-bold text-white">
                      {terms.venue.name}
                    </div>
                    <a
                      href={terms.venue.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/70 hover:text-white"
                    >
                      {terms.venue.address}
                    </a>
                  </div>
                </div>
                <div className="mt-5 aspect-video overflow-hidden rounded-2xl">
                  <iframe
                    title="Mapa: Kpt. Jaroše 1922/3, Brno"
                    src={terms.venue.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
