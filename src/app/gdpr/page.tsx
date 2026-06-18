import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Zásady ochrany osobních údajů',
  description:
    'Jak Najdikouče s.r.o. zpracovává osobní údaje zadané na stránce koučovacího výcviku a jak používáme měření návštěvnosti.',
  robots: { index: true, follow: true },
}

export default function GdprPage() {
  return (
    <main className="bg-white py-16 md:py-24">
      <Container size="default">
        <article className="mx-auto max-w-3xl text-ink-deep">
          <h1 className="font-display text-3xl font-extrabold md:text-4xl">
            Zásady ochrany osobních údajů
          </h1>
          <p className="mt-3 text-sm text-gray-500">Účinné od 18. 6. 2026</p>

          <p className="mt-8 leading-relaxed text-gray-700">
            Tyto zásady popisují, jak nakládáme s osobními údaji zadanými na stránce{' '}
            <strong>vycvik.najdikouce.cz</strong> (rezervace koučovacího výcviku) a jak měříme
            návštěvnost webu. Doplňují{' '}
            <a
              href="https://najdikouce.cz/zasady-zpracovani-osobnich-udaju"
              className="font-semibold text-brand underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              kompletní zásady zpracování osobních údajů
            </a>{' '}
            společnosti.
          </p>

          <Section title="1. Správce osobních údajů">
            <p>
              <strong>Najdikouče s.r.o.</strong>
              <br />
              IČO: 11997249
              <br />
              Sídlo: Brno
              <br />
              E-mail:{' '}
              <a href="mailto:info@najdikouce.cz" className="text-brand underline">
                info@najdikouce.cz
              </a>
              <br />
              Telefon: +420 731 123 491
            </p>
          </Section>

          <Section title="2. Jaké údaje zpracováváme">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Údaje z formuláře:</strong> jméno, e-mailová adresa a telefonní číslo, které
                vyplníte v rezervačním formuláři.
              </li>
              <li>
                <strong>Technické a analytické údaje:</strong> informace o vašem zařízení a chování
                na webu (navštívené sekce, kliknutí, posun stránkou) získané nástrojem měření
                návštěvnosti. Tyto údaje jsou agregované a pseudonymizované.
              </li>
            </ul>
          </Section>

          <Section title="3. Účely a právní základ zpracování">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Vyřízení rezervace a kontaktování zájemce</strong> (zpětné zavolání, zaslání
                informací o výcviku) — právní základ: provedení opatření před uzavřením smlouvy a
                oprávněný zájem (čl. 6 odst. 1 písm. b) a f) GDPR).
              </li>
              <li>
                <strong>Zasílání informací o nabídce</strong> (výcvik, ochutnávka) — oprávněný zájem,
                případně souhlas; kdykoli se lze odhlásit.
              </li>
              <li>
                <strong>Měření a zlepšování webu</strong> — oprávněný zájem na funkčním a
                srozumitelném webu (čl. 6 odst. 1 písm. f) GDPR). Měření můžete odmítnout (viz
                bod 6).
              </li>
            </ul>
          </Section>

          <Section title="4. Příjemci a zpracovatelé">
            <p>Vaše údaje předáváme pouze prověřeným zpracovatelům, kteří nám pomáhají s provozem:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Microsoft Ireland Operations Ltd.</strong> — nástroj Microsoft Clarity
                (měření návštěvnosti, heatmapy, anonymizované nahrávky relací).
              </li>
              <li>
                <strong>Ecomail.cz s.r.o.</strong> — správa databáze kontaktů a e-mailová
                komunikace.
              </li>
              <li>
                <strong>Google Ireland Ltd.</strong> — ukládání odeslaných rezervací (Google Sheets /
                Apps Script).
              </li>
              <li>
                <strong>Poskytovatel hostingu webu</strong> — technický provoz stránky.
              </li>
            </ul>
            <p className="mt-3">
              Někteří zpracovatelé mohou údaje zpracovávat i mimo EU; v takovém případě je předání
              zajištěno standardními smluvními doložkami EU.
            </p>
          </Section>

          <Section title="5. Doba uchování">
            <ul className="list-disc space-y-2 pl-5">
              <li>Kontaktní údaje z formuláře: po dobu vyřízení poptávky a dále po dobu nezbytnou k ochraně oprávněných zájmů, nejdéle dle zákonných lhůt.</li>
              <li>Marketingové údaje: do odvolání souhlasu / vznesení námitky.</li>
              <li>Analytická data: po dobu nastavenou v nástroji měření (zpravidla maximálně 13 měsíců).</li>
            </ul>
          </Section>

          <Section title="6. Cookies a měření návštěvnosti">
            <p>
              Pro zlepšování webu používáme nástroj <strong>Microsoft Clarity</strong>, který
              prostřednictvím cookies a obdobných technologií sbírá anonymizované údaje o chování
              návštěvníků (heatmapy, nahrávky relací bez citlivého obsahu).
            </p>
            <p className="mt-3">
              Při první návštěvě se vám zobrazí lišta, kde můžete měření{' '}
              <strong>odmítnout tlačítkem „Rozumím a nesouhlasím“</strong>. Volbu si pamatujeme ve
              vašem prohlížeči; změnit ji můžete vymazáním dat webu v prohlížeči. Nezbytné technické
              cookies pro fungování stránky se nastavují vždy.
            </p>
          </Section>

          <Section title="7. Vaše práva">
            <p>Ve vztahu k vašim osobním údajům máte právo na:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>přístup k údajům a jejich opravu,</li>
              <li>výmaz („právo být zapomenut“) a omezení zpracování,</li>
              <li>přenositelnost údajů,</li>
              <li>vznesení námitky proti zpracování z oprávněného zájmu,</li>
              <li>odvolání souhlasu (pokud je zpracování na souhlasu založeno).</li>
            </ul>
            <p className="mt-3">
              Svá práva uplatníte na{' '}
              <a href="mailto:info@najdikouce.cz" className="text-brand underline">
                info@najdikouce.cz
              </a>
              . Máte také právo podat stížnost u Úřadu pro ochranu osobních údajů (
              <a
                href="https://www.uoou.cz"
                className="text-brand underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.uoou.cz
              </a>
              ).
            </p>
          </Section>

          <p className="mt-12 border-t border-gray-200 pt-6 text-sm text-gray-500">
            Úplné a závazné znění zásad zpracování osobních údajů najdete na{' '}
            <a
              href="https://najdikouce.cz/zasady-zpracovani-osobnich-udaju"
              className="text-brand underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              najdikouce.cz
            </a>
            .
          </p>
        </article>
      </Container>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-bold text-ink-deep">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-gray-700">{children}</div>
    </section>
  )
}
