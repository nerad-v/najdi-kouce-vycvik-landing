import { cn } from '@/lib/utils'

export function SectionHeading({
  children,
  tone = 'light',
  className,
  align = 'left',
}: {
  children: React.ReactNode
  tone?: 'light' | 'dark'
  className?: string
  align?: 'left' | 'center'
}) {
  return (
    <h2
      className={cn(
        'font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl',
        tone === 'light' && 'text-ink-deep',
        tone === 'dark' && 'text-white',
        align === 'center' && 'text-center',
        'text-balance',
        className,
      )}
    >
      {children}
    </h2>
  )
}

export function SectionSub({
  children,
  tone = 'light',
  className,
  align = 'left',
}: {
  children: React.ReactNode
  tone?: 'light' | 'dark'
  className?: string
  align?: 'left' | 'center'
}) {
  return (
    <p
      className={cn(
        'mt-4 max-w-2xl text-lg leading-relaxed md:mt-6 md:text-xl',
        tone === 'light' && 'text-gray-600',
        tone === 'dark' && 'text-white/70',
        align === 'center' && 'mx-auto text-center',
        'text-pretty',
        className,
      )}
    >
      {children}
    </p>
  )
}
