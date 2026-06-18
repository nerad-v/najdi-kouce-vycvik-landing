import type { Metadata } from 'next'
import { Raleway, Nunito_Sans } from 'next/font/google'
import './globals.css'
import { meta } from '@/lib/content/meta'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { CookieConsent } from '@/components/layout/CookieConsent'

const raleway = Raleway({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-raleway',
  weight: ['500', '600', '700', '800'],
  display: 'swap',
})

const nunito = Nunito_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(meta.url),
  title: {
    default: meta.defaultTitle,
    template: `%s · ${meta.brandName}`,
  },
  description: meta.defaultDescription,
  keywords: [...meta.keywords],
  openGraph: {
    title: meta.defaultTitle,
    description: meta.defaultDescription,
    url: meta.url,
    siteName: meta.siteName,
    locale: meta.locale,
    type: 'website',
    images: [{ url: meta.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.defaultTitle,
    description: meta.defaultDescription,
    images: [meta.ogImage],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${raleway.variable} ${nunito.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <CookieConsent />
      </body>
    </html>
  )
}
