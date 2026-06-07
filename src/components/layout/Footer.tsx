import Link from 'next/link'
import Image from 'next/image'
import { footer } from '@/lib/content/footer'
import { Container } from '@/components/ui/Container'

export function Footer() {
  return (
    <footer className="bg-ink-deep pt-20 pb-10 text-white">
      <Container size="wide">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/brand/logo-white.png"
              alt="Najdi kouče"
              width={2048}
              height={653}
              className="h-10 w-auto"
            />
            <p className="mt-5 max-w-xs text-base leading-relaxed text-white/70">
              {footer.brand.tagline}
            </p>
          </div>

          {footer.columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-base text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1 md:flex-row md:gap-6">
            <span>{footer.bottom.copyright}</span>
            <span>{footer.bottom.accreditation}</span>
          </div>
          <div className="flex gap-6">
            {footer.bottom.legal.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
