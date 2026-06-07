import { included } from '@/lib/content/value'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { SectionHeading, SectionSub } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import { CtaButton } from '@/components/ui/CtaButton'
import { Check, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Included() {
  return (
    <section className="bg-gray-50 py-20 md:py-32">
      <Container size="wide">
        <Reveal>
          <Eyebrow>{included.eyebrow}</Eyebrow>
          <SectionHeading className="mt-4 max-w-3xl">{included.headline}</SectionHeading>
          <SectionSub>{included.sub}</SectionSub>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* LEFT: big price anchor */}
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink-deep to-ink-mid p-8 text-white shadow-2xl shadow-brand/20 md:p-10">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-brand/30 blur-3xl"
                />
                <div className="relative">
                  <div className="font-display text-xs font-bold uppercase tracking-[0.2em] text-coral">
                    Začněte zálohou
                  </div>
                  <div className="mt-4 font-display text-6xl font-extrabold leading-none tracking-tighter md:text-7xl">
                    4 800 Kč
                  </div>
                  <div className="mt-3 font-display text-base leading-relaxed text-white/70">
                    drží vám místo. Doplatek 43 200 Kč rozdělíte na splátky podle sebe — všechno do měsíce před startem (18. 8. 2026).
                  </div>
                  <div className="mt-2 font-display text-sm text-white/50">
                    Celková cena výcviku <span className="font-bold text-white">48 000 Kč</span>
                  </div>

                  <div className="mt-8 border-t border-white/10 pt-6">
                    <div>
                      <div className="font-display text-3xl font-bold text-coral">
                        9/12
                      </div>
                      <div className="text-xs uppercase tracking-widest text-white/50">
                        volných míst pro podzim 2026
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <CtaButton
                      href="#rezervace"
                      variant="inverted"
                      size="lg"
                      className="w-full justify-center"
                    >
                      Chci na podzimní běh
                    </CtaButton>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* RIGHT: ledger-style list */}
          <div className="lg:col-span-7">
            <Reveal>
              <ul className="divide-y divide-gray-200 border-y border-gray-200">
                {included.items.map((item, idx) => (
                  <li
                    key={item.title}
                    className={cn(
                      'group flex items-start gap-5 py-6 transition-colors',
                      item.highlight && 'bg-brand-soft/40 -mx-4 rounded-xl px-4 md:-mx-6 md:px-6',
                    )}
                  >
                    <div
                      className={cn(
                        'mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-110',
                        item.highlight
                          ? 'bg-brand text-white shadow-brand-soft'
                          : 'bg-gray-100 text-brand',
                      )}
                    >
                      {item.highlight ? (
                        <Sparkles className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                      ) : (
                        <Check className="h-5 w-5" strokeWidth={2.5} aria-hidden />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3
                          className={cn(
                            'font-display text-lg font-bold leading-snug md:text-xl',
                            item.highlight ? 'text-brand' : 'text-ink-deep',
                          )}
                        >
                          {item.title}
                        </h3>
                        <span
                          className={cn(
                            'font-display text-xs font-bold uppercase tracking-widest',
                            item.highlight ? 'text-brand' : 'text-gray-400',
                          )}
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <p className="mt-1.5 text-base leading-relaxed text-gray-600 text-pretty">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
