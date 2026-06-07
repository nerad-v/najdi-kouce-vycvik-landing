export const pricing = {
  eyebrow: 'Cena',
  headline: '48 000 Kč. Záloha 10 %, zbytek si rozložíte sami.',
  sub: 'Zaplatíte 4 800 Kč po rezervaci a tím držíte místo. Zbylých 43 200 Kč si rozdělíte na libovolný počet splátek — jediná podmínka je, že celá částka je u nás nejpozději měsíc před začátkem výcviku (do 18. srpna 2026).',
  basePrice: 48000,
  deposit: 4800,
  remaining: 43200,
  finalDate: '18. srpna 2026',
  variants: [
    {
      id: 'standard',
      label: 'Standardní cena',
      price: 48000,
      note: 'Pro všechny účastníky.',
      saves: 0,
    },
    {
      id: 'isic',
      label: 'Sleva pro studenty (ISIC)',
      price: 44000,
      note: 'Doložte platnou ISIC kartou při rezervaci.',
      saves: 4000,
    },
    {
      id: 'maternity',
      label: 'Sleva pro ženy na MD',
      price: 44000,
      note: 'Doložte rodičovským příspěvkem.',
      saves: 4000,
    },
    {
      id: 'tasting',
      label: 'Sleva pro absolventy ochutnávky',
      price: 47000,
      note: 'Pokud jste prošli 2h workshopem ochutnávka.najdikouce.cz.',
      saves: 1000,
    },
  ],
  paymentSteps: [
    {
      title: 'Záloha 4 800 Kč',
      detail: 'Hned po rezervaci. Místo je vaše.',
    },
    {
      title: 'Splátky podle vás',
      detail: 'Měsíčně, kvartálně, jednorázově — domluvíme se telefonem.',
    },
    {
      title: 'Doplatek do 18. 8. 2026',
      detail: 'Měsíc před startem výcviku máte zaplaceno celé.',
    },
  ],
  ctaLabel: 'Zarezervovat za 4 800 Kč',
  ctaHref: '#rezervace',
} as const

export const terms = {
  eyebrow: 'Termíny a místo',
  headline: 'Podzim 2026, Brno. Tři víkendy v jednom kvartálu.',
  sub: 'Všechny tři bloky jsou součást jednoho výcviku — neplatíte je zvlášť. Aktuálně volných 9 z 12 míst, skupinu uzavíráme po dosažení kapacity nebo měsíc před startem.',
  venue: {
    name: 'Učebna Najdi kouče',
    address: 'Kpt. Jaroše 1922/3, Brno',
    mapUrl: 'https://maps.google.com/?q=Kpt.+Jaroše+1922/3+Brno',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2606.8!2d16.6068!3d49.2007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKpt.+Jaro%C5%A1e+1922%2F3%2C+602+00+Brno!5e0!3m2!1scs!2scz',
  },
  blocks: [
    { label: '1. blok', dates: '18.–20. září 2026', day: 'pátek 9:00 – neděle 17:00' },
    { label: '2. blok', dates: '16.–18. října 2026', day: 'pátek 9:00 – neděle 17:00' },
    { label: '3. blok + zkouška', dates: '20.–22. listopadu 2026', day: 'pátek 9:00 – neděle 17:00' },
  ],
  schedule: {
    morning: '9:00',
    lunch: '12:30 – 13:30',
    end: '16:30 – 17:00',
    note: 'Oběd v ceně, drobné občerstvení po celý den.',
  },
  capacity: {
    total: 12,
    available: 9,
    label: 'volných míst',
  },
} as const
