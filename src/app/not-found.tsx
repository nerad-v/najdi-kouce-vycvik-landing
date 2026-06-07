import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stránka nenalezena',
}

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <p className="text-sm font-medium text-secondary uppercase tracking-widest mb-4">404</p>
        <h1 className="font-display text-4xl font-bold mb-4">Stránka nenalezena</h1>
        <p className="text-secondary mb-8">Tato stránka neexistuje nebo byla přesunuta.</p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-primary text-white hover:bg-primary/90 transition-colors"
        >
          Zpět na úvodní stránku
        </Link>
      </div>
    </section>
  )
}
