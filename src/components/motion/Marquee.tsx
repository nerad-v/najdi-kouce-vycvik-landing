import { type ReactNode } from 'react'

/**
 * Pattern #5 z wow-catalog.md — Infinite marquee.
 *
 * Reference: stripe.com / shopify.com customer logos.
 * Inspired by Magic UI Marquee (MIT license): https://magicui.design/docs/components/marquee
 *
 * VYŽADUJE v tailwind.config.ts:
 *
 *   extend: {
 *     animation: {
 *       marquee: 'marquee 30s linear infinite',
 *     },
 *     keyframes: {
 *       marquee: {
 *         from: { transform: 'translateX(0)' },
 *         to: { transform: 'translateX(calc(-100% - var(--gap)))' },
 *       },
 *     },
 *   }
 *
 * Použití:
 *   <Marquee>
 *     {logos.map(logo => <img src={logo} />)}
 *   </Marquee>
 */
export function Marquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className = '',
}: {
  children: ReactNode
  pauseOnHover?: boolean
  reverse?: boolean
  className?: string
}) {
  return (
    <div
      className={`overflow-hidden mask-fade-x ${className}`}
      style={{ '--gap': '4rem' } as React.CSSProperties}
    >
      <div
        className={`flex gap-16 w-max animate-marquee ${reverse ? '[animation-direction:reverse]' : ''} ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''} motion-reduce:animate-none`}
      >
        {children}
        {children}
      </div>
    </div>
  )
}
