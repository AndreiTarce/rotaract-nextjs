import { CatrafusalePackageCard } from '@/components/catrafusale/PackageCard'
import CatrafusalePackages from '@/components/catrafusale/Packages'
import {
    faArrowUpRightFromSquare,
    faCalendar,
    faLocationPin,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import catrafusale_white from '@/assets/images/catrafusale_white.png'

export default function Catrafusale() {
    return (
        <main className="mt-5 md:mt-12 mx-24 max-md:mx-4 mb-8">
            <div className="flex flex-col items-center">
                <h1 className="text-8xl font-extrabold max-md:text-6xl leading-none mb-4">
                    Pachete
                </h1>

                <h2 className="md:text-6xl font-extrabold leading-none bg-gradient-to-r from-[#ffe4d2] to-[#ee8984] bg-clip-text text-transparent mb-2">
                    CATRAFU-SALE #8
                </h2>

                <div className="flex gap-6 text-muted-foreground mb-4">
                    <p>
                        <FontAwesomeIcon icon={faCalendar} className="mr-2" />2
                        iunie
                    </p>
                    <p>
                        <Link
                            href=" ttps://maps.app.goo.gl/AutjCVotMSUADPS48"
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

                <p className="text-muted-foreground text-center w-1/2 mb-4">
                    Vrei să participi la CATRAFU-SALE în calitate de seller?
                    <br /> Alege unul dintre pachetele de donații de mai jos, și
                    înscrie-te la ediția de anul acesta!{' '}
                </p>

                <div className="flex">
                    <Image src={catrafusale_white} alt="catrafusale" />
                </div>

                <CatrafusalePackages />
            </div>
        </main>
    )
}
