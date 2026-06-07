export const finalCta = {
  eyebrow: 'Rezervace',
  headline: 'Místo držíme zálohou. Zbytek doladíme telefonem.',
  sub: 'Vyplňte tři pole. Do jednoho pracovního dne vám zavoláme — projedeme termíny, slevy a domluvíme splátkový kalendář, který vám bude vyhovovat.',
  form: {
    name: { label: 'Jméno a příjmení', placeholder: 'Např. Jan Novák' },
    email: { label: 'E-mail', placeholder: 'jan@email.cz' },
    phone: { label: 'Telefon', placeholder: '+420 ' },
    submit: 'Odeslat rezervaci',
    submitting: 'Odesílám…',
    note: 'Odesláním souhlasíte se zpracováním kontaktních údajů pro účely zpětného volání. Žádný spam, žádné newslettery.',
  },
  errors: {
    name: 'Vyplňte prosím jméno.',
    email: 'Vyplňte platný e-mail.',
    phone: 'Vyplňte telefon (alespoň 9 cifer).',
    server: 'Něco se pokazilo. Zkuste to prosím za chvíli, nebo nám napište přímo.',
  },
  reassure: [
    { icon: 'phone', text: 'Voláme do 1 pracovního dne' },
    { icon: 'shield', text: 'Garance vrácení peněz' },
    { icon: 'lock', text: 'Žádná platba teď, jen kontakt' },
  ],
} as const

export const thanks = {
  headline: 'Děkujeme. Místo je zatím u vás.',
  sub: 'Do jednoho pracovního dne vám zavoláme z čísla, které začíná +420 5. Projedeme termín, slevy, způsob platby a odpovíme na cokoli, co se týká výcviku.',
  what: [
    'Doladíme splátkový kalendář — měsíčně, kvartálně, jednorázově, jak vám to vyhovuje.',
    'Pošleme vám e-mailem platební instrukce na zálohu 4 800 Kč.',
    'Po přijetí zálohy je místo definitivně rezervované.',
  ],
  backToHome: 'Vrátit se na úvod',
} as const
