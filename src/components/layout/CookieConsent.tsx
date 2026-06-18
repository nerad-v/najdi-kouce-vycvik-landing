'use client'

import { useEffect, useState } from 'react'

/**
 * Cookie lišta (dole v rohu, ne přes celé okno) + řízení Microsoft Clarity.
 * Režim OPT-OUT: měříme ve výchozím stavu (i bez volby). Měření se zastaví
 * jen při explicitním "Rozumím a nesouhlasím". Volba se pamatuje v localStorage.
 */

const STORAGE_KEY = 'nk-cookie-consent' // 'granted' | 'denied'
const CLARITY_ID = 'x931pfziye'

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void
    __clarityLoaded?: boolean
  }
}

function loadClarity() {
  if (typeof window === 'undefined' || window.__clarityLoaded) return
  window.__clarityLoaded = true
  ;(function (c: Window, l: Document, a: 'clarity', r: 'script', i: string) {
    c[a] =
      c[a] ||
      function (...args: unknown[]) {
        ;((c[a] as unknown as { q: unknown[] }).q =
          (c[a] as unknown as { q?: unknown[] }).q || []).push(args)
      }
    const t = l.createElement(r)
    t.async = true
    t.src = 'https://www.clarity.ms/tag/' + i
    const y = l.getElementsByTagName(r)[0]
    y.parentNode?.insertBefore(t, y)
  })(window, document, 'clarity', 'script', CLARITY_ID)
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let choice: string | null = null
    try {
      choice = localStorage.getItem(STORAGE_KEY)
    } catch {
      /* localStorage nedostupný */
    }
    // OPT-OUT: měříme i bez volby (null) i při souhlasu. Neměříme jen při "denied".
    if (choice !== 'denied') {
      loadClarity()
      if (choice === 'granted') window.clarity?.('consent')
    }
    if (choice == null) setVisible(true)
  }, [])

  function decide(v: 'granted' | 'denied') {
    try {
      localStorage.setItem(STORAGE_KEY, v)
    } catch {
      /* ignore */
    }
    if (v === 'granted') {
      loadClarity()
      window.clarity?.('consent')
    } else {
      // best-effort zastavení v aktuální relaci; budoucí načtení už Clarity nespustí
      window.clarity?.('stop')
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Souhlas s cookies"
      className="fixed bottom-4 right-4 z-[100] w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl shadow-ink-deep/10"
    >
      <p className="text-sm leading-relaxed text-ink-deep">
        Tyto stránky používají cookies a anonymní měření chování (Microsoft Clarity), abychom je
        mohli vylepšovat. Detaily najdete v{' '}
        <a href="/gdpr" className="font-semibold text-brand underline">
          zásadách ochrany osobních údajů
        </a>
        .
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => decide('granted')}
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          Souhlasím
        </button>
        <button
          type="button"
          onClick={() => decide('denied')}
          className="inline-flex flex-1 items-center justify-center rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
        >
          Rozumím a nesouhlasím
        </button>
      </div>
    </div>
  )
}
