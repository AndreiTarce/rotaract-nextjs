import background from '@/assets/images/home_background.webp';
import { Button } from '@/components/ui/button';
import ProjectCountdown from '@/components/ui/home/ProjectCountdown';
import { getFeaturedProjects } from '@/lib/entityService';
import { IFeaturedProject } from '@/models/featuredProject';
import { Metadata } from 'next';
import dynamicImport from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Acasă | Rotaract Visio Cluj-Napoca',
    description:
        'Clubul nostru a fost chartat în data de 12 octombrie 2013, sub îndrumarea clubului Rotary Visio Cluj-Napoca . Cu o istorie de implicare comunitară de peste un deceniu, ne străduim să aducem schimbări pozitive în orașul nostru și în lumea din jurul nostru. Misiunea noastră este de a inspira și mobiliza tinerii din Cluj-Napoca pentru a se implica activ în proiecte de voluntariat, dezvoltând astfel lideri viitori și promovând serviciul în comunitate.',
    keywords: [
        'rotaract',
        'visio',
        'cluj-napoca',
        'charity',
        'rotary',
        'proiecte caritabile',
        'caritate',
        'district2241',
    ],
};

const AboutRotaract = dynamicImport(
    () => import('@/components/ui/home/AboutRotaract')
);
const AboutVisio = dynamicImport(() => import('@/components/about/AboutVisio'));
const SlideInWrapper = dynamicImport(
    () => import('@/components/ui/animation/SlideInWrapper')
);

export const dynamic = 'force-dynamic';

export default async function Home() {
    const featuredProjects =
        (await getFeaturedProjects()) as IFeaturedProject[];
    const featuredProject = featuredProjects[0];

    const today = new Date();
    const featuredProjectStartDate = new Date(featuredProject.start_date);
    const featuredProjectEndDate = new Date(featuredProject.end_date);

    return (
        <main className="h-fit pt-5 md:pt-12">
            <div className="relative h-fit">
                <Image
                    src={background}
                    alt="Rotaract Visio Members Photo"
                    className="-z-10"
                    sizes="(max-width: 808px) 200vw"
                    fill
                    style={{
                        objectFit: 'cover',
                        objectPosition: '45% 100%',
                    }}
                    priority
                />
                <div className="mr-16 flex justify-between">
                    <div className="mb-8 grid h-screen grid-cols-1 grid-rows-[75%_25%] gap-0 pb-28">
                        <div className="mx-16 max-md:mx-4">
                            <h1 className="w-fit bg-gradient-to-r from-rotaract-cranberry to-rose-500 bg-clip-text text-7xl font-extrabold leading-none text-transparent max-md:text-5xl">
                                Rotaract Visio
                            </h1>
                            <span className="text-5xl font-normal max-md:text-4xl">
                                Cluj-Napoca
                            </span>
                        </div>
                        <div className="mx-16 flex flex-col gap-2 text-4xl text-white max-md:mx-4">
                            <span>Vrei să te implici?</span>
                            <Link href="/contact" className="h-fit w-fit">
                                <Button className="w-fit bg-rotaract-cranberry text-lg text-white hover:bg-[#020817BB]">
                                    Contactează-ne
                                </Button>
                            </Link>
                        </div>
                    </div>
                    {today > featuredProjectStartDate &&
                        today < featuredProjectEndDate && (
                            <div className="max-md:hidden">
                                <ProjectCountdown project={featuredProject} />
                            </div>
                        )}
                </div>
            </div>
            <div className="mx-16 max-md:mx-4">
                {today > featuredProjectStartDate &&
                    today < featuredProjectEndDate && (
                        <div className="-mt-24 md:hidden">
                            <ProjectCountdown project={featuredProject} />
                        </div>
                    )}
                <SlideInWrapper>
                    <AboutRotaract />
                </SlideInWrapper>
                <SlideInWrapper>
                    <AboutVisio />
                </SlideInWrapper>
                {/* <SlideInWrapper>
                    <Partners />
                    </SlideInWrapper> */}
            </div>
        </main>
    );
}
