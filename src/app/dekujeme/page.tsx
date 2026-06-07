import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { thanks } from '@/lib/content/cta'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Děkujeme — rezervace přijata',
  description: 'Vaše rezervace na koučovací výcvik byla úspěšně přijata. Ozveme se do jednoho pracovního dne.',
  robots: { index: false, follow: false },
}

export default function ThanksPage() {
  return (
    <>
      <main className="min-h-screen bg-ink-deep pb-20 pt-32 text-white md:pt-40">
        <Container size="default">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand/15">
              <CheckCircle2 className="h-9 w-9 text-coral" aria-hidden />
            </div>

            <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-white md:text-6xl text-balance">
              {thanks.headline}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-white/75 md:text-xl text-pretty">
              {thanks.sub}
            </p>

            <ol className="mx-auto mt-12 max-w-xl space-y-4 text-left">
              {thanks.what.map((step, idx) => (
                <li
                  key={step}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand font-display text-sm font-bold text-white">
                    {idx + 1}
                  </span>
                  <span className="text-base text-white/85 md:text-lg text-pretty">{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-12">
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-display text-base font-semibold text-coral hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                {thanks.backToHome}
              </Link>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
