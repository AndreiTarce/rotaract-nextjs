import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../ui/accordion';

interface accordionItem {
    question: string;
    answer: string;
}

const items: accordionItem[] = [
    {
        question: `1. Care este data și locul evenimentului?`,
        answer: `Evenimentul va avea loc pe data de 8 decembrie, la Casino - Centrul de Cultură Urbană din Parcul Central Simion Bărnuțiu.`,
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
        answer: `Vendorii sunt așteptați să ajungă la locație în intervalul 11:00 - 11:30. Toți vendorii vor primi detalii organizatorice suplimentare cu câteva zile înainte de eveniment, la adresa de email furnizată.`,
    },
];

const renderAccordionItems = (items: accordionItem[]) =>
    items.map((item: accordionItem, index: number) => (
        <AccordionItem
            value={`item-${index}`}
            key={`item-${index}`}
            className="data-[state=open]:rounded-lg data-[state=open]:bg-black data-[state=open]:bg-opacity-5 data-[state=open]:dark:bg-gray-100 data-[state=open]:dark:bg-opacity-5"
        >
            <AccordionTrigger className="px-4 text-start">
                {item.question}
            </AccordionTrigger>
            <AccordionContent className="px-4 text-muted-foreground">
                {item.answer}
            </AccordionContent>
        </AccordionItem>
    ));

export default function CatrafusaleFAQ() {
    return (
        <div className="mb-4 flex w-full flex-col gap-2 md:w-1/2">
            <Accordion
                type="single"
                collapsible
                className="w-full"
                orientation="horizontal"
            >
                <AccordionItem value="modalitati">
                    <AccordionTrigger className="text-lg font-semibold">
                        Modalități de participare
                    </AccordionTrigger>
                    <AccordionContent className="px-4 text-muted-foreground">
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
                    <AccordionTrigger className="text-lg font-semibold">
                        Întrebări frecvente
                    </AccordionTrigger>
                    <AccordionContent>
                        <Accordion type="single" className="w-full" collapsible>
                            {renderAccordionItems(items)}
                        </Accordion>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <p className="text-center text-muted-foreground">
                Pentru orice alte întrebări nu ezitați să ne{' '}
                <Link
                    href="/contact"
                    className="inline items-center justify-center font-bold"
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
    );
}
