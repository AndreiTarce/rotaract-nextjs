'use client';

import { CHECKOUT_PATH } from '@/lib/constants';
import { useState } from 'react';
import EmbeddedCheckoutCatrafusale from '../payments/EmbeddedCheckoutCatrafusale';
import { getStripePrices } from '../payments/constants';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../ui/accordion';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function CatrafusaleRaffle() {
    const [clientSecret, setClientSecret] = useState<string | undefined>();
    const { CATRAFUSALE_RAFFLE_TICKET } = getStripePrices();

    const getClientSecret = async () => {
        const response = await fetch(CHECKOUT_PATH, {
            method: 'POST',
            body: JSON.stringify({
                price: CATRAFUSALE_RAFFLE_TICKET,
                quantity: 1,
                mode: 'payment',
                metadata: { catrafusale_raffle: true },
                adjustable_quantity: true,
                phone_number_collection: true,
            }),
        });
        const checkoutSession = await response.json();
        setClientSecret(checkoutSession.client_secret);
    };

    if (clientSecret)
        return (
            <div className="md:w-3/4">
                <EmbeddedCheckoutCatrafusale clientSecret={clientSecret} />
            </div>
        );

    return (
        <Card className="mb-4 flex grow flex-col rounded-lg border bg-gradient-to-tr from-[#ffe4d2] to-[#ee8984] shadow-md md:w-1/2">
            <CardHeader className="pb-4">
                <CardTitle className="text-5xl font-extrabold text-foreground dark:text-background max-md:text-5xl">
                    Tombolă caritabilă
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-foreground dark:text-background">
                    În cadrul proiectului CATRAFU-SALE #8 vom avea o tombolă
                    caritabilă, cu diverse premii de la sponsorii noștri dragi.
                    Extragerea câștigătorilor va avea loc în data de 2 Iunie, în
                    cadrul evenimentului, unde te așteptăm cu multe activități
                    și surprize!
                    <br />
                    <br />
                    Vrei să participi la tombolă sau să susții cauza noastră,
                    dar nu poți ajunge în ziua evenimentului? Well, we have some
                    good news! Participarea fizică nu este obligatorie, așadar
                    poți achiziționa bilete la tombolă online, iar noi vom face
                    extragerea fizic. Toți câștigătorii vor fi contactați
                    ulterior, iar noi ne vom asigura că premiile ajung la voi
                    după eveniment.
                    <Accordion
                        type="single"
                        collapsible
                        className="mb-4 w-full"
                        orientation="horizontal"
                    >
                        <AccordionItem value="premii">
                            <AccordionTrigger className="text-lg font-semibold">
                                Premii tombolă
                            </AccordionTrigger>
                            <AccordionContent className="px-4">
                                <ul className="list-disc">
                                    <li>Un abonament la Untold.</li>
                                    <li>
                                        10 pachete de vouchere cu reducere
                                        individuala/pachet de minim 300€ pentru
                                        vacanțe pe velier de la Dream Sales.
                                    </li>
                                    <li>
                                        Voucher de cazare pentru 2 persoane 1
                                        noapte de weekend în regim Bed &
                                        Breakfast la Double Tree by Hilton
                                        Cluj-Napoca.
                                    </li>
                                    <li>
                                        Voucher Day Pass la Salute per Aqua
                                        pentru 2 persons, în incinta Double Tree
                                        by Hilton Cluj-Napoca.
                                    </li>
                                    <li>
                                        Un voucher de 300 de lei pentru o masă
                                        la Livada.
                                    </li>
                                    <li>
                                        Un voucher pentru tuns și aranjat la
                                        Vestige.
                                    </li>
                                    <li>
                                        1 voucher de 50% reducere pentru 2 ore
                                        de joc, 8 persoane, la LaserTag Fonix
                                        Cluj.
                                    </li>
                                    <li>
                                        2 vouchere de 50% reducere pentru 1 ore
                                        de joc, 8 persoane, la LaserTag Fonix
                                        Cluj.
                                    </li>
                                    <li>
                                        3 abonamente duble la Transylvania
                                        International Spoken Word Festival.
                                    </li>
                                    <li>
                                        3 vouchere pentru 1 luna de cafea
                                        gratuită la Ted’s Coffee.
                                    </li>
                                    <li>O periuța de dinți electrică</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Button variant={'secondary'} onClick={getClientSecret}>
                        Cumpără bilete
                    </Button>
                </p>
            </CardContent>
        </Card>
    );
}
