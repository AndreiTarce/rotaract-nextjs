import catrafusale_white from '@/assets/images/catrafusale_white.png';
import vederedecraciun_white from '@/assets/images/vederedecraciun_white.png';
import CatrafusaleFAQ from '@/components/catrafusale/CatrafusaleFAQ';
import CatrafusaleWorkshop from '@/components/catrafusale/CatrafusaleWorkshop';
import CatrafusalePackages from '@/components/catrafusale/Packages';
import {
    CatrafusaleRegistrationLimitInteractor,
    CatrafusaleWorkshopRegistrationLimitInteractor,
} from '@/interactors/catrafusaleRegistrationInteractor';
import connectMongoDB from '@/lib/mongodb';
import CatrafusaleRegistrationWinter2024Limit from '@/models/catrafusaleRegistrationWinter2024Limit';
import CatrafusaleWorkshopRegistrationWinter2024Limit from '@/models/catrafusaleWorkshopRegistrationWinter2024Limit';
import { Repository } from '@/repositories/repository';
import {
    faArrowUpRightFromSquare,
    faCalendar,
    faLocationPin,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'CATRAFU-SALE #9 Winter Edition | Rotaract Visio Cluj-Napoca',
};

const registrationLimitInteractor = new CatrafusaleRegistrationLimitInteractor(
    new Repository(CatrafusaleRegistrationWinter2024Limit)
);
const workshopRegistrationLimitInteractor = new CatrafusaleWorkshopRegistrationLimitInteractor(
    new Repository(CatrafusaleWorkshopRegistrationWinter2024Limit)
);

export default async function Catrafusale() {
    await connectMongoDB();
    const remainingStanders = await registrationLimitInteractor.getRemainingStanders();
    const remainingTables = await registrationLimitInteractor.getRemainingTables();
    const remainingCandles = await workshopRegistrationLimitInteractor.getRemainingCandles();
    const remainingGlobes = await workshopRegistrationLimitInteractor.getRemainingGlobes();
    const remainingClay = await workshopRegistrationLimitInteractor.getRemainingClay();

    return (
        <main className="mx-24 mt-5 mb-8 max-md:mx-4 md:mt-12">
            <div className="flex flex-col items-center">
                <h1 className="mb-4 text-8xl leading-none font-extrabold max-md:text-6xl">
                    Pachete
                </h1>

                <h2 className="mb-1 bg-linear-to-r from-[#ffe4d2] to-[#ee8984] bg-clip-text text-3xl leading-none font-extrabold text-transparent md:text-6xl">
                    CATRAFU-SALE #9
                </h2>
                <div className="mb-2 text-xl font-semibold">Winter Edition</div>

                <div className="text-muted-foreground mb-4 flex flex-wrap justify-center gap-x-6">
                    <p>
                        <FontAwesomeIcon icon={faCalendar} className="mr-2" />8 decembrie
                    </p>
                    <p>
                        <Link
                            href="https://maps.app.goo.gl/XQNGHD6nyG7Xesix7"
                            className="flex items-center justify-center"
                            target="_blank"
                        >
                            <FontAwesomeIcon icon={faLocationPin} className="mr-2" />
                            Casino - Centrul de Cultură Urbană
                            <FontAwesomeIcon
                                icon={faArrowUpRightFromSquare}
                                size="xs"
                                className="ml-1"
                            />
                        </Link>
                    </p>
                </div>

                <p className="text-muted-foreground mb-4 text-center md:w-1/2">
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
                    <br /> Alege unul dintre pachetele de donații de mai jos, și înscrie-te la
                    ediția de anul acesta!{' '}
                </p>

                <div className="mb-8 flex items-center justify-center gap-4">
                    <Image
                        src={catrafusale_white}
                        alt="catrafusale"
                        className="h-[30px] w-[30px] md:h-[50px] md:w-[50px]"
                    />
                    <Image
                        src={vederedecraciun_white}
                        alt="catrafusale"
                        className="h-[30px] w-[30px] md:h-[50px] md:w-[50px]"
                    />
                </div>

                <CatrafusaleFAQ />

                <CatrafusaleWorkshop
                    remainingCandles={remainingCandles}
                    remainingGlobes={remainingGlobes}
                    remainingClay={remainingClay}
                />

                <CatrafusalePackages
                    remainingStanders={remainingStanders}
                    remainingTables={remainingTables}
                />

                {/* <Card
                    className={`relative mx-auto flex h-full flex-col items-center rounded-lg border border-[#eda289]  p-4 text-center dark:border-[#eda289] max-md:order-1 md:w-1/2 xl:p-8`}
                >
                    <div className="text-gray-900 dark:text-white">
                        <p className="mb-4 text-2xl font-bold">
                            Perioada de înscrieri a fost închisă.
                        </p>
                        <p>Vă mulțumim tuturor pentru susținere!</p>
                    </div>
                </Card> */}
            </div>
        </main>
    );
}
