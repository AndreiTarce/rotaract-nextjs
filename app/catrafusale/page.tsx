import catrafusale_white from '@/assets/images/catrafusale_white.png';
import primaria_cluj_white from '@/assets/images/primaria_cluj_white.png';
import visit_cluj_white from '@/assets/images/visit_cluj_white.png';
import zilele_clujului_white from '@/assets/images/zilele_clujului_white.png';
import CatrafusaleFAQ from '@/components/catrafusale/CatrafusaleFAQ';
import CatrafusaleRaffle from '@/components/catrafusale/CatrafusaleRaffle';
import CatrafusalePackages from '@/components/catrafusale/Packages';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCatrafusaleRegistrations } from '@/lib/entityService';
import {
    faArrowUpRightFromSquare,
    faCalendar,
    faLocationPin,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { isFlashSaleActive } from '../api/stripe-webhook/route';

export const metadata: Metadata = {
    title: 'CATRAFU-SALE #8 | Rotaract Visio Cluj-Napoca',
};

export default async function Catrafusale() {
    const registrations = await getCatrafusaleRegistrations();
    const singlePackageRegistrations = registrations.filter(
        (registration) =>
            registration.package === 'table' || registration.package === 'mixt'
    );

    return (
        <main className="mx-24 mb-8 mt-5 max-md:mx-4 md:mt-12">
            <div className="flex flex-col items-center">
                <h1 className="mb-4 text-8xl font-extrabold leading-none max-md:text-6xl">
                    Pachete
                </h1>

                <h2 className="mb-2 bg-gradient-to-r from-[#ffe4d2] to-[#ee8984] bg-clip-text text-3xl font-extrabold leading-none text-transparent md:text-6xl">
                    CATRAFU-SALE #8
                </h2>

                <div className="mb-4 flex gap-6 text-muted-foreground">
                    <p>
                        <FontAwesomeIcon icon={faCalendar} className="mr-2" />2
                        iunie
                    </p>
                    <p>
                        <Link
                            href="https://maps.app.goo.gl/AutjCVotMSUADPS48"
                            className="flex items-center justify-center"
                            target="_blank"
                        >
                            <FontAwesomeIcon
                                icon={faLocationPin}
                                className="mr-2"
                            />
                            Strada Iuliu Maniu
                            <FontAwesomeIcon
                                icon={faArrowUpRightFromSquare}
                                size="xs"
                                className="ml-1"
                            />
                        </Link>
                    </p>
                </div>

                <p className="mb-4 text-center text-muted-foreground md:w-1/2">
                    Vrei să participi la
                    <Link href="/projects/catrafusale" target="_blank">
                        <b>
                            {' '}
                            CATRAFU-SALE
                            <FontAwesomeIcon
                                icon={faArrowUpRightFromSquare}
                                size="xs"
                                className="ml-1"
                            />{' '}
                        </b>
                    </Link>
                    în calitate de seller?
                    <br /> Alege unul dintre pachetele de donații de mai jos, și
                    înscrie-te la ediția de anul acesta!{' '}
                </p>

                <div className="mb-8 flex items-center justify-center">
                    <Image
                        src={catrafusale_white}
                        alt="catrafusale"
                        className="h-[30px] w-[30px] md:h-[50px] md:w-[50px]"
                    />
                    <Image
                        src={primaria_cluj_white}
                        alt="primaria cluj"
                        width={500}
                        height={300}
                        className="h-[40px] w-auto md:h-[60px]"
                    />
                    <Image
                        src={visit_cluj_white}
                        alt="visit cluj"
                        height={60}
                        className="h-[40px] w-auto md:h-[60px]"
                    />
                    <Image
                        src={zilele_clujului_white}
                        alt="zilele clujului"
                        height={60}
                        className="h-[40px] w-auto md:h-[60px]"
                    />
                </div>

                <CatrafusaleFAQ />

                <CatrafusaleRaffle />

                {registrations.length <= 20 ? (
                    <>
                        {isFlashSaleActive() && (
                            <Card className="mb-4 flex grow flex-col rounded-lg border bg-gradient-to-tr from-[#ffe4d2] to-[#ee8984] shadow-md md:w-1/2">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-5xl font-extrabold text-foreground dark:text-background max-md:text-5xl">
                                        Flash sale
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-foreground dark:text-background">
                                        Doar azi, <b>24 mai</b>, poți beneficia
                                        de super-reduceri la pachetele
                                        CATRAFU-SALE #8!
                                        <br />
                                        <br /> În cadrul acestui flash sale,
                                        avem 2 oferte:
                                        <br />
                                        <ul className="ml-5 list-disc">
                                            <li>
                                                <b>
                                                    30% reducere la orice pachet
                                                </b>
                                            </li>
                                            <li>
                                                <b>
                                                    1+1 gratuit la orice pachet
                                                </b>
                                            </li>
                                        </ul>
                                        <br />
                                        Pentru reducerea de{' '}
                                        <b>30% la orice pachet</b>, va trebui să
                                        folosești codul promoțional{' '}
                                        <b>FLASH30</b> la checkout. <br />
                                        Pentru a beneficia de oferta de{' '}
                                        <b>1+1 gratuit</b>, tot ce trebuie să
                                        faci este să achiziționezi un pachet în
                                        decursul zilei de azi. După checkout vei
                                        primi pe email un cod de reducere de
                                        100%, pe care îl poți împărtăși cu un
                                        prieten.
                                        <br />
                                        <br />
                                        <i>
                                            *Ofertele nu se cumulează. Codul de
                                            reducere de 100% se va aplica
                                            pachetelor cu valoare mai mică sau
                                            egală cu pachetul achiziționat. (ex:
                                            achiziționare pachet SINGLE -
                                            reducere 100% pentru un pachet
                                            SINGLE/SINGLE TABLE).
                                            <br />
                                            Locurile la eveniment sunt limitate.
                                            Transmiterea codului pe email nu
                                            echivalează cu înscrierea la
                                            eveniment, fiind necesară efectuarea
                                            unei înscrieri distincte pe website.
                                            <br />
                                            Dacă întâmpini probleme, te rugăm să
                                            ne contactezi.
                                        </i>
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        <CatrafusalePackages
                            singlePackageRegistrations={
                                singlePackageRegistrations.length
                            }
                        />
                    </>
                ) : (
                    <Card
                        className={`relative mx-auto flex h-full flex-col items-center rounded-lg border border-[#eda289]  p-4 text-center dark:border-[#eda289] max-md:order-1 md:w-1/2 xl:p-8`}
                    >
                        <div className="text-gray-900 dark:text-white">
                            <p className="mb-4 text-2xl font-bold">
                                Perioada de înscrieri a fost închisă.
                            </p>
                            <p>Vă mulțumim tuturor pentru susținere!</p>
                        </div>
                    </Card>
                )}
            </div>
        </main>
    );
}
