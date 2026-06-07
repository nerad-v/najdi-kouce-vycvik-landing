import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility pro kombinování Tailwind tříd bez konfliktů
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
