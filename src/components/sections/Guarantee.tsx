import { guarantee } from '@/lib/content/value'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/motion/Reveal'
import { CtaButton } from '@/components/ui/CtaButton'
import { ShieldCheck } from 'lucide-react'

export function Guarantee() {
  return (
    <section className="bg-white py-20 md:py-32">
      <Container size="default">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-coral-soft via-white to-brand-soft p-8 shadow-2xl shadow-brand/15 md:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-brand/10 blur-3xl"
            />
            <div className="relative flex flex-col items-start gap-6">
              <div className="inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-brand/10">
                <ShieldCheck className="h-5 w-5 text-brand" aria-hidden />
                <Eyebrow className="!text-ink-deep">{guarantee.eyebrow}</Eyebrow>
              </div>
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink-deep md:text-5xl text-balance">
                {guarantee.headline}
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-gray-700 md:text-lg text-pretty">
                {guarantee.body}
              </p>
              <p className="max-w-2xl text-sm leading-relaxed text-gray-500 text-pretty">
                {guarantee.microNote}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-4">
                <CtaButton href="#rezervace" size="lg">
                  Rezervovat místo
                </CtaButton>
                <a
                  href="https://ochutnavka.najdikouce.cz"
                  className="font-display text-base font-semibold text-brand hover:text-brand-dark"
                >
                  Nejste si jistí? Zkuste 2h ochutnávku →
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
