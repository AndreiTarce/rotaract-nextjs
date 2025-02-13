import background from '@/assets/images/bg2.webp';
import OurCauses from '@/components/about/cause/OurCauses';
import MemberStatistics from '@/components/about/statistics/MemberStatistics';
import OurValues from '@/components/about/values/OurValues';
import { ROTARY_VISIO_WEBSITE_URL } from '@/lib/constants';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Despre noi | Rotaract Visio Cluj-Napoca',
    description:
        'Clubul nostru a fost chartat în data de 12 octombrie 2013, sub îndrumarea clubului Rotary Visio Cluj-Napoca  . Cu o istorie de implicare comunitară de peste un deceniu, ne străduim să aducem schimbări pozitive în orașul nostru și în lumea din jurul nostru.',
};

export const dynamic = 'force-dynamic';

export default function About() {
    return (
        <main className="mt-5 md:mt-12">
            <div className="relative flex h-screen w-full flex-col">
                <h1 className="mx-16 mb-4 w-fit bg-linear-to-r from-rotaract-cranberry to-rose-500 bg-clip-text text-7xl font-extrabold leading-none text-transparent max-md:mx-4 max-md:text-5xl">
                    Despre noi
                </h1>
                <p className="mx-16 mb-2 max-md:mx-4 md:w-2/3 ">
                    Clubul nostru a fost chartat în data de 12 octombrie 2013,
                    sub îndrumarea clubului{' '}
                    <Link
                        href={ROTARY_VISIO_WEBSITE_URL}
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
                <p className="mx-16 max-md:mx-4 md:w-2/3">
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
                    className="hidden md:block"
                />
                <div className="relative h-full">
                    <Image
                        src={background}
                        alt="Rotaract Visio Group Photo"
                        sizes="(max-width: 808px) 200vw"
                        style={{
                            objectFit: 'cover',
                            zIndex: '-10',
                            objectPosition: '32% bottom',
                        }}
                        fill
                        className="md:hidden"
                    />
                </div>
            </div>
            <div className="mx-16 mt-16 max-md:mx-4">
                <div className="mb-8 gap-4 max-md:flex max-md:flex-col-reverse md:grid md:grid-cols-2">
                    <div className="flex flex-col gap-4">
                        <MemberStatistics />
                        <OurCauses />
                    </div>
                    <OurValues />
                </div>
                {/* <Timeline /> */}
            </div>
        </main>
    );
}
