export const footer = {
  brand: {
    name: 'Najdi kouče',
    tagline: 'Akreditovaný koučovací výcvik a komunita.',
  },
  columns: [
    {
      title: 'Výcvik',
      links: [
        { label: 'Program', href: '#program' },
        { label: 'Lektoři', href: '#lektori' },
        { label: 'Cena', href: '#cena' },
        { label: 'Termíny', href: '#terminy' },
        { label: 'Časté otázky', href: '#faq' },
      ],
    },
    {
      title: 'Vyzkoušejte nezávazně',
      links: [
        { label: 'Ochutnávka výcviku — 2h workshop', href: 'https://ochutnavka.najdikouce.cz' },
      ],
    },
    {
      title: 'Kontakt',
      links: [
        { label: 'info@najdikouce.cz', href: 'mailto:info@najdikouce.cz' },
        { label: 'Kpt. Jaroše 1922/3, Brno', href: 'https://maps.google.com/?q=Kpt.+Jaroše+1922/3+Brno' },
      ],
    },
  ],
  bottom: {
    copyright: '© 2026 Najdi kouče s.r.o.',
    accreditation: 'Akreditace MŠMT 25703/2023-3',
    legal: [
      // Lokální /gdpr stránka (pokrývá formulář + měření Clarity, odkazuje na firemní zásady).
      // Obchodní podmínky odebrány — na landingu se nic přímo neprodává (jen rezervace/lead).
      { label: 'Zásady ochrany osobních údajů', href: '/gdpr' },
    ],
  },
} as const
