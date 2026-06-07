# Najdi v sobě kouče — Landing Page (výcvik)

Landing page pro **certifikovaný koučovací výcvik** Martina Musila (Najdi kouče s.r.o.).

- **Live:** [najdi-kouce-vycvik.vercel.app](https://najdi-kouce-vycvik.vercel.app) (původní BoostMail deploy)
- **Cílový deploy:** doména klienta (Vercel účet kouče)
- **Stack:** Next.js 14+ (App Router) · TypeScript · Tailwind · Framer Motion · Resend (email) · React Hook Form · Zod

---

## Lokální vývoj

```bash
npm install
npm run dev
# → http://localhost:3000
```

Build:
```bash
npm run build
npm start
```

## Deploy na Vercel

1. **Import repo** v Vercel dashboardu (Project → Add New → Import Git Repository)
2. **Framework preset:** Next.js (auto-detect)
3. **Nastavit environment variables** (viz níže)
4. **Custom doména:** přidat v Project Settings → Domains (např. `vycvik.najdikouce.cz`)

## Environment variables

| Klíč | Účel | Povinné | Default fallback |
|---|---|---|---|
| `RESEND_API_KEY` | API klíč pro Resend (odesílání formulářových emailů) | ✅ ANO | – |
| `CONTACT_EMAIL` | Příjemce kontaktních formulářů | ❌ Volitelné | `info@najdikouce.cz` |
| `RESEND_FROM` | Odesílatel emailů (musí být ověřená doména v Resend) | ❌ Volitelné | `Najdi kouče <noreply@najdikouce.cz>` |
| `GOOGLE_SHEETS_WEBHOOK_URL` | URL Apps Script webhooku pro zápis leadů do Sheets | ❌ Volitelné | – |

> Bez `RESEND_API_KEY` API route `/api/contact` vrátí error 500 (form přestane fungovat).

## Struktura

```
src/
├── app/
│   ├── page.tsx              # Hlavní landing page
│   ├── layout.tsx            # Root layout (fonts, meta)
│   ├── globals.css           # Tailwind imports + custom CSS
│   ├── dekujeme/page.tsx     # Thank-you page po odeslání formuláře
│   ├── not-found.tsx         # 404
│   └── api/contact/route.ts  # API route — Resend + Google Sheets webhook
├── components/
│   ├── ui/                   # Atomy (Button, Container, Heading...)
│   └── sections/             # Velké bloky (Hero, Pricing, Outcomes...)
└── lib/
    ├── content/              # Veškerý copy (Hero, FAQ, Pricing, ...) — edituj zde
    ├── schemas.ts            # Zod schemas pro form validation
    └── utils.ts              # Helper utility
```

**Editace textů:** všechen copy je centralizovaný v `src/lib/content/*.ts`. Hero text, FAQ, ceny, lektoři — nemíchá se s komponenty.

## Poznámky pro Lukáše

- Repo je čistý Next.js, žádné custom buildery.
- `.vercel/` ignored — když clonuješ, Vercel CLI ti vytvoří svůj vlastní.
- Pro fungující formuláře musí být **RESEND_API_KEY** + ověřená doména v Resend dashboardu.
- Pokud chceš logovat leady i do Google Sheets, nastav `GOOGLE_SHEETS_WEBHOOK_URL`. Bez ní formulář funguje (jen pošle email).

---

## Kontakty

- **Vlastník obsahu:** Martin Musil (Najdi kouče s.r.o.)
- **Marketing & email funnel:** BoostMail (Vojta Nerad)
- **Tech & deploy:** Lukáš Lang
