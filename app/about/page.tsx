import AboutVisio from '@/components/about/AboutVisio'
import background from '@/assets/images/desprenoibg.webp'
import backgroundMobile from '@/assets/images/desprenoibgmobile.webp'
import Image from 'next/image'
import MemberStatistics from '@/components/about/statistics/MemberStatistics'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import OurCauses from '@/components/about/cause/OurCauses'
import OurValues from '@/components/about/values/OurValues'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

export default function About() {
    return (
        <main className="mt-5 md:mt-12">
            <div className="w-full relative h-screen flex flex-col">
                <h1 className="mx-16 max-md:mx-4 w-fit text-7xl font-extrabold max-md:text-5xl leading-none bg-gradient-to-r from-rotaract-cranberry to-rose-500 bg-clip-text text-transparent mb-4">
                    Despre noi
                </h1>
                <p className="mx-16 max-md:mx-4 md:w-2/3 mb-2 ">
                    Clubul nostru a fost chartat în data de 12 octombrie 2013,
                    sub îndrumarea clubului{' '}
                    <Link
                        href="https://rotaryvisio.ro/"
                        target="_blank"
                        className="underline underline-offset-4"
                    >
                        Rotary Visio Cluj-Napoca{' '}
                        <FontAwesomeIcon
                            icon={faArrowUpRightFromSquare}
                            size="xs"
                        />
                    </Link>{' '}
                    . Cu o istorie de implicare comunitară de peste un deceniu,
                    ne străduim să aducem schimbări pozitive în orașul nostru și
                    în lumea din jurul nostru.
                </p>
                <p className="mx-16 max-md:mx-4 md:w-2/3 ">
                    Misiunea noastră este de a inspira și mobiliza tinerii din
                    Cluj-Napoca pentru a se implica activ în proiecte de
                    voluntariat, dezvoltând astfel lideri viitori și promovând
                    serviciul în comunitate.
                </p>
                <Image
                    src={background}
                    alt="Rotaract Visio Group Photo"
                    fill
                    style={{
                        objectFit: 'cover',
                        zIndex: '-10',
                        objectPosition: '45% bottom',
                    }}
                    priority
                    className="hidden md:block"
                />
                <div className="relative h-full">
                    <Image
                        src={backgroundMobile}
                        alt="Rotaract Visio Group Photo"
                        sizes="(max-width: 808px) 200vw"
                        style={{
                            objectFit: 'cover',
                            zIndex: '-10',
                            objectPosition: '32% bottom',
                        }}
                        fill
                        priority
                        className="md:hidden"
                    />
                </div>
            </div>
            <div className="mx-16 max-md:mx-4 mt-16">
                <div className="md:grid md:grid-cols-2 gap-4 max-md:flex max-md:flex-col-reverse">
                    <div className="flex flex-col gap-4">
                        <MemberStatistics />
                        <OurCauses />
                    </div>
                    <OurValues />
                </div>
            </div>
        </main>
    )
}
