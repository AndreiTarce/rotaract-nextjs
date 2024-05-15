import Link from 'next/link'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../ui/accordion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowUpRightFromSquare,
    faLocationPin,
} from '@fortawesome/free-solid-svg-icons'

interface accordionItem {
    question: string
    answer: string
}

const items: accordionItem[] = [
    {
        question: `1. Care este data și locul evenimentului?`,
        answer: `Evenimentul va avea loc pe data de 2 iunie, pe strada Iuliu Maniu.`,
    },
    {
        question: `2. Este permis să aducem umerașe suplimentare?`,
        answer: `Da, aveți libertatea să aduceți umerase
        suplimentare, pe lângă cele furnizate de noi
        în cadrul pachetului.`,
    },
    {
        question: `3. Există o limită cu privire la numărul de articole vestimentare pe care le putem aduce?`,
        answer: `Puteți aduce câte produse vestimentare doriți.`,
    },
    {
        question: `4. Putem aduce și încălțăminte?`,
        answer: `Da, sunteți bineveniți să aduceți și încălțăminte. În acest caz, vă încurajăm să aveți suporturi adecvate pentru expunerea acestora, deoarece nu sunt incluse în pachetele noastre.`,
    },
    {
        question: `5. Este permis să vin cu mai multe persoane la stand?`,
        answer: `Da, puteți veni însoțiți de alte persoane care vă pot ajuta la vânzare sau care să vă ofere companie.`,
    },
    {
        question: `6. Care este procedura de acces pentru vendori?`,
        answer: `Vendorii sunt așteptați să ajungă la locație începând cu ora 08:00. De asemenea, între orele 08:00 și 10:00 va fi permis accesul cu mașina pe stradă pentru a permite aducerea logisticii și a echipamentelor, după care strada va fi închisă și accesul va fi permis doar pietonal. Toți vendorii vor primi detalii organizatorice suplimentare cu câteva zile înainte de eveniment, la adresa de email furnizată.`,
    },
    {
        question: `7. La câți vizitatori ne așteptăm?`,
        answer: `Evenimentul face parte din programul Zilelor Clujului, desfășurat pe o stradă în proximitatea Pieței Unirii. Prin urmare, ne așteptăm la un flux semnificativ de participanți.`,
    },
    {
        question: `8. Există restricții privind obiectele pe care nu le putem aduce?`,
        answer: `Umbrelele și decorurile proprii sunt exemple de obiecte care nu sunt permise. Dacă nu ești sigur(ă) dacă este în regulă să aduci un obiect anume, te încurajăm să ne contactezi înainte de eveniment.`,
    },
    {
        question: `9. Ce facilități sunt disponibile pentru vendori?`,
        answer: `Vom asigura acces la electricitate pentru toți vendorii.`,
    },
]

const renderAccordionItems = (items: accordionItem[]) =>
    items.map((item: accordionItem, index: number) => (
        <AccordionItem
            value={`item-${index}`}
            key={`item-${index}`}
            className="data-[state=open]:dark:bg-gray-100 data-[state=open]:bg-opacity-5 data-[state=open]:bg-black data-[state=open]:dark:bg-opacity-5 data-[state=open]:rounded-lg"
        >
            <AccordionTrigger className="text-start px-4">
                {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground px-4">
                {item.answer}
            </AccordionContent>
        </AccordionItem>
    ))

export default function CatrafusaleFAQ() {
    return (
        <div className="w-full md:w-1/2 flex flex-col gap-2 mb-4">
            <Accordion
                type="single"
                collapsible
                className="w-full"
                orientation="horizontal"
            >
                <AccordionItem value="modalitati">
                    <AccordionTrigger className="font-semibold text-lg">
                        Modalități de participare
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground px-4">
                        În cadrul proiectului CATRAFU-SALE, există două
                        modalități de participare: <b>CATRAFU-SELLER </b>
                        și <b>CATRAFU-BUYER</b>
                        <br />
                        <br />
                        Dacă vrei să îți vinzi articolele vestimentare și să
                        faci parte din efortul nostru de a susține
                        sustenabilitatea, devino un <b>CATRAFU-SELLER</b>!
                        Pentru a te înscrie, alege unul dintre pachetele de
                        donații de mai jos!
                        <br />
                        <br />
                        Dacă, pe de altă parte, vrei să-ți dai un refresh
                        garderobei sau să cauți cele mai bune oferte la
                        catrafuse, atunci ești un <b>CATRAFU-BUYER</b>! Și cel
                        mai bun lucru? Participarea ca și CATRAFU-BUYER este
                        gratuită!
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="intrebari" className="border-b-0">
                    <AccordionTrigger className="font-semibold text-lg">
                        Întrebări frecvente
                    </AccordionTrigger>
                    <AccordionContent>
                        <Accordion type="single" className="w-full" collapsible>
                            {renderAccordionItems(items)}
                        </Accordion>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <p className="text-muted-foreground text-center">
                Pentru orice alte întrebări nu ezitați să ne{' '}
                <Link
                    href="/contact"
                    className="inline justify-center items-center font-bold"
                    target="_blank"
                >
                    contactați!
                    <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        size="xs"
                        className="ml-1"
                    />
                </Link>
            </p>
        </div>
    )
}
