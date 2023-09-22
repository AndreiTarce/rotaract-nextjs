import { Button } from '@/components/ui/button'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import background from '@/assets/images/bg2.webp'
import Image from 'next/image'

const AboutRotaract = dynamic(
    () => import('@/components/ui/home/AboutRotaract')
)

const AboutVisio = dynamic(() => import('@/components/about/AboutVisio'))
const SlideInWrapper = dynamic(
    () => import('@/components/ui/animation/SlideInWrapper')
)

export default async function Home() {
    return (
        <main className="h-fit pt-12">
            <div className="grid grid-cols-1 grid-rows-[75%_25%] gap-0 h-screen pb-28 mb-8 ">
                <Image
                    src={background}
                    alt="Rotaract Visio Members Photo"
                    className="-z-10"
                    fill
                    style={{
                        objectFit: 'cover',
                    }}
                />
                <div className="mx-16 max-md:mx-4">
                    <h1 className="w-fit text-7xl font-extrabold max-md:text-5xl leading-none bg-gradient-to-r from-rotaract-cranberry to-rose-500 bg-clip-text text-transparent">
                        Rotaract Visio
                    </h1>
                    <span className="font-normal text-5xl max-md:text-4xl">
                        Cluj-Napoca
                    </span>
                </div>
                <div className="text-4xl flex flex-col gap-2 text-white mx-16 max-md:mx-4">
                    <span>Vrei sa te implici?</span>
                    <Link href="/contact" className="w-fit h-fit">
                        <Button className="w-fit text-lg bg-rotaract-cranberry text-white hover:bg-[#020817BB]">
                            Contacteaza-ne
                        </Button>
                    </Link>
                </div>
            </div>
            {/* <Image
                src={background}
                alt="background"
                quality={100}
                className="brightness-75 absolute top-0 object-cover h-full -z-10"
            /> */}
            <SlideInWrapper>
                <AboutRotaract />
            </SlideInWrapper>
            <SlideInWrapper>
                <AboutVisio />
            </SlideInWrapper>
        </main>
    )
}
