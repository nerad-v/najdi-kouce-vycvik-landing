'use client'

import { useState, forwardRef } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, Phone, ShieldCheck } from 'lucide-react'
import { reservationSchema, type ReservationInput } from '@/lib/schemas'
import { finalCta } from '@/lib/content/cta'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { SectionHeading, SectionSub } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'

const iconMap = { phone: Phone, shield: ShieldCheck, lock: Lock } as const

export function FinalCta() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReservationInput>({
    resolver: zodResolver(reservationSchema),
    defaultValues: { name: '', email: '', phone: '', website: '' },
  })

  async function onSubmit(values: ReservationInput) {
    setServerError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error('server')
      router.push('/dekujeme')
    } catch {
      setServerError(finalCta.errors.server)
    }
  }

  return (
    <section
      id="rezervace"
      className="relative overflow-hidden bg-ink-deep py-20 text-white md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-brand/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -bottom-40 h-[500px] w-[500px] rounded-full bg-coral/15 blur-3xl"
      />

      <Container size="default" className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow tone="dark">{finalCta.eyebrow}</Eyebrow>
            <SectionHeading tone="dark" className="mt-4">
              {finalCta.headline}
            </SectionHeading>
            <SectionSub tone="dark">{finalCta.sub}</SectionSub>

            <ul className="mt-10 space-y-4">
              {finalCta.reassure.map((r) => {
                const Icon = iconMap[r.icon as keyof typeof iconMap] ?? ShieldCheck
                return (
                  <li key={r.text} className="flex items-center gap-3 text-white/85">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-coral/15 text-coral">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="text-base">{r.text}</span>
                  </li>
                )
              })}
            </ul>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-7">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="rounded-3xl border border-white/10 bg-white p-7 shadow-2xl shadow-brand/20 md:p-10"
            >
              {/* Honeypot */}
              <input
                {...register('website')}
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />

              <div className="space-y-5">
                <Field
                  id="name"
                  type="text"
                  autoComplete="name"
                  label={finalCta.form.name.label}
                  placeholder={finalCta.form.name.placeholder}
                  error={errors.name?.message}
                  {...register('name')}
                />
                <Field
                  id="email"
                  type="email"
                  autoComplete="email"
                  label={finalCta.form.email.label}
                  placeholder={finalCta.form.email.placeholder}
                  error={errors.email?.message}
                  {...register('email')}
                />
                <Field
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  label={finalCta.form.phone.label}
                  placeholder={finalCta.form.phone.placeholder}
                  error={errors.phone?.message}
                  {...register('phone')}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-6 py-4 font-display text-lg font-semibold text-white transition-all hover:bg-brand-dark hover:shadow-brand-strong active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? finalCta.form.submitting : finalCta.form.submit}
              </button>

              {serverError && (
                <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                  {serverError}
                </p>
              )}

              <p className="mt-5 text-xs leading-relaxed text-gray-500">{finalCta.form.note}</p>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

type FieldProps = {
  label: string
  error?: string
  id: string
} & React.InputHTMLAttributes<HTMLInputElement>

const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, error, id, type = 'text', ...rest },
  ref,
) {
  return (
    <div>
      <label htmlFor={id} className="block font-display text-sm font-semibold text-ink-deep">
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        type={type}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`mt-2 block w-full rounded-lg border bg-white px-4 py-3 text-base text-ink-deep placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
            : 'border-gray-300 focus:border-brand focus:ring-brand/20'
        }`}
        {...rest}
      />
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  )
})
