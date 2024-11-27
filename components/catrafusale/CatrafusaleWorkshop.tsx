'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import ProjectImageCarousel from '../projects/ProjectImageCarousel';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '../ui/collapsible';
import { Separator } from '../ui/separator';
import CatrafusaleWorkshopCard, {
    CatrafusaleWorkshopProps,
} from './CatrafusaleWorkshopCard';
import { CatrafusaleWorkshopRegistrationForm } from './CatrafusaleWorkshopRegistrationForm';

const workshops: CatrafusaleWorkshopProps[] = [
    {
        title: 'Pictură pe lumânări',
        image: 'https://rotaract-visio-bucket.s3.eu-central-1.amazonaws.com/assets/close-up-hand-using-glass-water-painting_23-2148263441.jpg',
        description: `Ai o fire artistică și îți place să îmbini plăcutul cu utilul sau pur și simplu dorești să experimentezi o latură a frumosului pe care poate nu știai că o ai?

Te așteptăm la micul și frumosul nostru workshop de picturã pe lumânări, care se potrivește perfect cu descrierea de mai sus. Acest workshop va fi despre tine și despre a crea ceva pentru sufletul și inima ta.

Daca dorești să ornezi casa în preajma sărbătorilor de iarnă sau să oferi o micuță atenție cuiva drag, noi îți oferim toate materiale necesare (2 lumânări - cu care mergi acasă, acuarele, pensule), tu trebuie sa vii doar cu voie bună.
Te așteptăm să te înscrii la workshop-ul nostru, acesta are loc în data de 8 Decembrie la Casino - în Parcul Central, în cadrul CatrafuSALE și promitem că va fi un moment unic de la care vei pleca cu o mare bucurie pentru tine sau pentru cineva drag.`,
    },
    {
        title: 'Personalizare globuri',
        image: 'https://rotaract-visio-bucket.s3.eu-central-1.amazonaws.com/assets/pexels-igor-meghega-315695093-14746508.jpg',
        description: `Vino la un workshop creativ și festiv, unde vei învăța să personalizezi globuri unice de Crăciun! În cadrul activității, ți se vor face poze Polaroid pe care le vei putea introduce direct în globurile tale. Pe lângă poze, vei putea adăuga decorațiuni specifice sărbătorilor, precum steluțe, inimioare cu sclipici sau fulgi de zăpadă.

Te așteptăm pe 8 decembrie, la Casino, în Parcul Central. Grăbește-te să te înscrii, deoarece locurile sunt limitate – doar 60 disponibile!

Taxa de participare este de 25 de lei.`,
    },
    {
        title: 'Modelare și pictare ornamente lut',
        image: 'https://rotaract-visio-bucket.s3.eu-central-1.amazonaws.com/assets/close-up-hand-holding-painting-brush.jpg',
        description: `Workshop-ul are ca scop invatarea tehnicilor de baza de modelat lutul cu racire la aer si de pictarea acestuia pentru a realiza ornamente de Craciun personalizate. Participantii vor avea ocazia sa creeze 3 ornamente de agatat in brad, dupa bunul plac, pe care sa le ia apoi acasa.`,
    },
];

export default function CatrafusaleWorkshop() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Card className="mb-4 flex w-full grow flex-col rounded-lg border bg-gradient-to-tr from-[#ffe4d2] to-[#ee8984] shadow-md md:w-1/2">
            <CardHeader className="pb-4">
                <CardTitle className="text-5xl font-extrabold text-foreground dark:text-background max-md:text-5xl">
                    Workshopuri interactive
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-4 text-foreground dark:text-background">
                    Apasă pe un atelier de mai jos pentru a afla informații
                    adiționale.
                </p>

                <div className="mb-4 hidden gap-2 lg:grid lg:grid-cols-3">
                    {workshops.map((workshop) => (
                        <CatrafusaleWorkshopCard
                            key={workshop.image}
                            {...workshop}
                        />
                    ))}
                </div>

                <div className="mb-4 lg:hidden">
                    <ProjectImageCarousel>
                        {workshops.map((workshop) => (
                            <CatrafusaleWorkshopCard
                                key={workshop.image}
                                {...workshop}
                            />
                        ))}
                    </ProjectImageCarousel>
                </div>

                <Separator className="mb-4 bg-foreground dark:bg-card" />
                <Collapsible
                    open={isOpen}
                    onOpenChange={() => setIsOpen(!isOpen)}
                    className="text-foreground dark:text-background"
                >
                    <CollapsibleTrigger
                        asChild
                        className="mb-4 hover:cursor-pointer"
                    >
                        <CardTitle className="flex items-center justify-between">
                            Către înregistrare
                            <ChevronDown
                                className={`h-4 w-4 transition-transform duration-200 ${
                                    isOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </CardTitle>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <CatrafusaleWorkshopRegistrationForm productId="asd" />
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>
        </Card>
    );
}
