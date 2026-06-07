import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { reservationSchema } from '@/lib/schemas'

export const runtime = 'nodejs'

const RECIPIENT = process.env.CONTACT_EMAIL ?? 'info@najdikouce.cz'
const FROM = process.env.RESEND_FROM ?? 'Najdi kouče <noreply@najdikouce.cz>'
const SHEETS_WEBHOOK = process.env.GOOGLE_SHEETS_WEBHOOK_URL

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

  // Fire-and-forget: log to Google Sheets in parallel.
  // If Sheets fails, we still want the email to go through — never block user response on Sheets.
  const sheetsPromise = appendToSheet({ name, email, phone })

  if (!apiKey) {
    // Resend not configured — fall back to Sheets-only.
    // If Sheets succeeded, lead is safely captured → respond OK to user.
    console.warn('[contact] RESEND_API_KEY missing — relying on Sheets only')
    const sheetsResult = await sheetsPromise.catch((e) => e)
    if (sheetsResult instanceof Error || SHEETS_WEBHOOK == null) {
      return NextResponse.json({ error: 'Service not configured.' }, { status: 503 })
    }
    return NextResponse.json({ ok: true, channel: 'sheets-only' })
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
    // Run e-mail + Sheets in parallel; e-mail is the gating one
    const [emailResult] = await Promise.allSettled([
      resend.emails.send({
        from: FROM,
        to: RECIPIENT,
        replyTo: email,
        subject: `Nová rezervace výcviku — ${name}`,
        html,
      }),
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

async function appendToSheet(data: { name: string; email: string; phone: string }) {
  if (!SHEETS_WEBHOOK) return // Sheets is optional — skip silently if not configured
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
      // Apps Script can be slow; short-circuit at 8 s so we don't hang Vercel function
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
