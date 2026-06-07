'use client'

import { createContext, useContext, type ReactNode } from 'react'

/**
 * SectionTone Provider — řeší P5 z review (Lime tone-awareness).
 *
 * Wrapni sekci touhle komponentou a typografické komponenty (Highlight, Lime, atd.)
 * automaticky vyberou správnou variantu podle pozadí.
 *
 * Použití:
 *
 *   <SectionTone tone="dark">
 *     <Hero />  ← uvnitř <Highlight> dostane lime variant
 *   </SectionTone>
 *
 *   <SectionTone tone="light">
 *     <Services />  ← uvnitř <Highlight> dostane violet variant
 *   </SectionTone>
 */

type Tone = 'dark' | 'light'

const SectionToneContext = createContext<Tone>('light')

export function SectionTone({
  tone,
  children,
}: {
  tone: Tone
  children: ReactNode
}) {
  return (
    <SectionToneContext.Provider value={tone}>
      {children}
    </SectionToneContext.Provider>
  )
}

export function useSectionTone(): Tone {
  return useContext(SectionToneContext)
}
