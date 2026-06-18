import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { reservationSchema } from '@/lib/schemas'

export const runtime = 'nodejs'

const RECIPIENT = process.env.CONTACT_EMAIL ?? 'info@najdikouce.cz'
const FROM = process.env.RESEND_FROM ?? 'Najdi kouče <noreply@najdikouce.cz>'
const SHEETS_WEBHOOK = process.env.GOOGLE_SHEETS_WEBHOOK_URL
const ECOMAIL_API_KEY = process.env.ECOMAIL_API_KEY
const ECOMAIL_LIST_ID = process.env.ECOMAIL_LIST_ID ?? '17' // "Výcvik nakoupil"
const ECOMAIL_TAGS = ['vycvik-rezervace']

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = reservationSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.flatten() },
      { status: 400 },
    )
  }

  // Honeypot — silently accept but don't send
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true })
  }

  const { name, email, phone } = parsed.data
  const apiKey = process.env.RESEND_API_KEY

  // Fire-and-forget capture channels (běží paralelně, nikdy neblokují odpověď uživateli):
  //  1) Ecomail  — hlavní CRM: lead spadne do seznamu 17 "Výcvik nakoupil" + tag vycvik-rezervace
  //  2) Sheets   — záložní log do Google Sheetu (Apps Script webhook)
  const ecomailPromise = addToEcomail({ name, email, phone })
  const sheetsPromise = appendToSheet({ name, email, phone })

  if (!apiKey) {
    // Resend nenastaven — spolehni se na Ecomail + Sheets.
    // Pokud aspoň jeden capture kanál uspěl, lead je bezpečně zachycen → vrať OK.
    console.warn('[contact] RESEND_API_KEY missing — relying on Ecomail/Sheets only')
    const [ec, sh] = await Promise.allSettled([ecomailPromise, sheetsPromise])
    const captured =
      (ec.status === 'fulfilled' && ec.value === true) ||
      (sh.status === 'fulfilled' && SHEETS_WEBHOOK != null)
    if (!captured) {
      return NextResponse.json({ error: 'Service not configured.' }, { status: 503 })
    }
    return NextResponse.json({ ok: true, channel: 'no-email' })
  }

  const resend = new Resend(apiKey)

  const html = `
    <h2 style="font-family:system-ui,sans-serif;color:#1A1A2E">Nová rezervace na Koučovací výcvik</h2>
    <p style="font-family:system-ui,sans-serif;color:#374151">Někdo právě vyplnil formulář na <strong>vycvik.najdikouce.cz</strong>. Zavolejte do 1 pracovního dne.</p>
    <table style="font-family:system-ui,sans-serif;color:#1A1A2E;border-collapse:collapse">
      <tr><td style="padding:8px 16px;border:1px solid #E5E7EB;background:#F9FAFB"><strong>Jméno</strong></td><td style="padding:8px 16px;border:1px solid #E5E7EB">${escapeHtml(name)}</td></tr>
      <tr><td style="padding:8px 16px;border:1px solid #E5E7EB;background:#F9FAFB"><strong>E-mail</strong></td><td style="padding:8px 16px;border:1px solid #E5E7EB"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
      <tr><td style="padding:8px 16px;border:1px solid #E5E7EB;background:#F9FAFB"><strong>Telefon</strong></td><td style="padding:8px 16px;border:1px solid #E5E7EB"><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></td></tr>
    </table>
    <p style="font-family:system-ui,sans-serif;color:#6B7280;margin-top:24px;font-size:13px">Termín: Podzim 2026 (start 18.–20. 9. 2026, Brno)</p>
  `

  try {
    // E-mail + Ecomail + Sheets paralelně; e-mail je gating (na něm závisí odpověď)
    const [emailResult] = await Promise.allSettled([
      resend.emails.send({
        from: FROM,
        to: RECIPIENT,
        replyTo: email,
        subject: `Nová rezervace výcviku — ${name}`,
        html,
      }),
      ecomailPromise,
      sheetsPromise,
    ])

    if (emailResult.status === 'rejected') {
      console.error('[contact] Resend error:', emailResult.reason)
      return NextResponse.json({ error: 'Mail send failed' }, { status: 500 })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// Přidá lead do Ecomailu (seznam 17 "Výcvik nakoupil") + tag vycvik-rezervace.
// Vrací true při úspěchu, jinak false. Nikdy nehází — capture nesmí shodit odpověď.
async function addToEcomail(data: { name: string; email: string; phone: string }): Promise<boolean> {
  if (!ECOMAIL_API_KEY) {
    console.warn('[contact] ECOMAIL_API_KEY missing — skipping Ecomail')
    return false
  }
  const [first, ...rest] = data.name.trim().split(/\s+/)
  try {
    const res = await fetch(`https://api2.ecomailapp.cz/lists/${ECOMAIL_LIST_ID}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', key: ECOMAIL_API_KEY },
      body: JSON.stringify({
        subscriber_data: {
          email: data.email,
          name: first ?? '',
          surname: rest.join(' '),
          phone: data.phone,
          tags: ECOMAIL_TAGS,
        },
        update_existing: true,
        resubscribe: true,
      }),
      // Ecomail bývá rychlý; krátký timeout ať neblokujeme Vercel funkci
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) {
      console.error('[contact] Ecomail returned', res.status, await res.text().catch(() => ''))
      return false
    }
    return true
  } catch (err) {
    console.error('[contact] Ecomail error:', err)
    return false
  }
}

async function appendToSheet(data: { name: string; email: string; phone: string }) {
  if (!SHEETS_WEBHOOK) return // Sheets je volitelný — přeskoč tiše, když není nastaven
  try {
    const res = await fetch(SHEETS_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        source: 'vycvik.najdikouce.cz',
      }),
      // Apps Script může být pomalý; short-circuit na 8 s, ať nevisíme
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) {
      console.error('[contact] Sheets webhook returned', res.status)
    }
  } catch (err) {
    console.error('[contact] Sheets webhook error:', err)
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
