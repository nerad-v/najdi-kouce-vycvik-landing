import { z } from 'zod'

export const reservationSchema = z.object({
  name: z.string().trim().min(2, 'Vyplňte prosím jméno.'),
  email: z.string().trim().email('Vyplňte platný e-mail.'),
  phone: z
    .string()
    .trim()
    .min(9, 'Vyplňte telefon (alespoň 9 cifer).')
    .regex(/^[+\d\s()\-]+$/, 'Telefon obsahuje nepovolené znaky.'),
  // Honeypot — must stay empty
  website: z.string().max(0).optional().or(z.literal('')),
})

export type ReservationInput = z.infer<typeof reservationSchema>
