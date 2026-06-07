import { trust } from '@/lib/content/hero'
import { Container } from '@/components/ui/Container'
import { NumberCounter } from '@/components/motion/NumberCounter'

export function Trust() {
  return (
    <section className="relative bg-ink-deep pb-20 md:pb-28">
      <Container size="wide">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/10 pt-12 md:grid-cols-4">
          {trust.items.map((item) => (
            <div key={item.label} className="flex flex-col gap-2">
              <div className="font-display text-5xl font-extrabold tracking-tight text-white md:text-6xl">
                <NumberCounter value={item.value} suffix={item.suffix} duration={1800} />
              </div>
              <div className="text-sm leading-snug text-white/60 md:text-base">{item.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
