import { cn } from '@/lib/utils'

export function Eyebrow({
  children,
  className,
  tone = 'light',
}: {
  children: React.ReactNode
  className?: string
  tone?: 'light' | 'dark'
}) {
  return (
    <span
      className={cn(
        'inline-block font-display text-sm font-semibold uppercase tracking-[0.18em]',
        tone === 'light' && 'text-brand',
        tone === 'dark' && 'text-coral',
        className,
      )}
    >
      {children}
    </span>
  )
}
