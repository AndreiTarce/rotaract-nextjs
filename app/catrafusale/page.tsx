import catrafusale_white from '@/assets/images/catrafusale_white.png'
import CatrafusalePackages from '@/components/catrafusale/Packages'
import {
    faArrowUpRightFromSquare,
    faCalendar,
    faLocationPin,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import primaria_cluj_white from '@/assets/images/primaria_cluj_white.png'
import visit_cluj_white from '@/assets/images/visit_cluj_white.png'
import zilele_clujului_white from '@/assets/images/zilele_clujului_white.png'
import { Metadata } from 'next'
import CatrafusaleFAQ from '@/components/catrafusale/CatrafusaleFAQ'

export const metadata: Metadata = {
    title: 'CATRAFU-SALE #8 | Rotaract Visio Cluj-Napoca',
}

export default function Catrafusale() {
    return (
        <main className="mt-5 md:mt-12 mx-24 max-md:mx-4 mb-8">
            <div className="flex flex-col items-center">
                <h1 className="text-8xl font-extrabold max-md:text-6xl leading-none mb-4">
                    Pachete
                </h1>

                <h2 className="text-3xl md:text-6xl font-extrabold leading-none bg-gradient-to-r from-[#ffe4d2] to-[#ee8984] bg-clip-text text-transparent mb-2">
                    CATRAFU-SALE #8
                </h2>

                <div className="flex gap-6 text-muted-foreground mb-4">
                    <p>
                        <FontAwesomeIcon icon={faCalendar} className="mr-2" />2
                        iunie
                    </p>
                    <p>
                        <Link
                            href="https://maps.app.goo.gl/AutjCVotMSUADPS48"
                            className="flex justify-center items-center"
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

                <p className="text-muted-foreground text-center md:w-1/2 mb-4">
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

                <div className="flex justify-center items-center mb-8">
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

                <CatrafusalePackages />
            </div>
        </main>
    )
}
