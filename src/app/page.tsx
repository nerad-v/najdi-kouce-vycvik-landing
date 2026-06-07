import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { StickyMobileCta } from '@/components/layout/StickyMobileCta'
import { ScrollProgress } from '@/components/motion/ScrollProgress'
import { Hero } from '@/components/sections/Hero'
import { Trust } from '@/components/sections/Trust'
import { Pain } from '@/components/sections/Pain'
import { Outcomes } from '@/components/sections/Outcomes'
import { Program } from '@/components/sections/Program'
import { Lecturers } from '@/components/sections/Lecturers'
import { Included } from '@/components/sections/Included'
import { Testimonials } from '@/components/sections/Testimonials'
import { Guarantee } from '@/components/sections/Guarantee'
import { Terms } from '@/components/sections/Terms'
import { Pricing } from '@/components/sections/Pricing'
import { Faq } from '@/components/sections/Faq'
import { FinalCta } from '@/components/sections/FinalCta'

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Trust />
        <Pain />
        <Outcomes />
        <Program />
        <Lecturers />
        <Included />
        <Testimonials />
        <Guarantee />
        <Terms />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  )
}
