import background from '@/assets/images/bg2.webp'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

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
            <div className="h-fit relative">
                <Image
                    src={background}
                    alt="Rotaract Visio Members Photo"
                    className="-z-10"
                    sizes="(max-width: 808px) 200vw"
                    fill
                    style={{
                        objectFit: 'cover',
                    }}
                    priority
                />
                <div className="grid grid-cols-1 grid-rows-[75%_25%] gap-0 h-screen pb-28 mb-8">
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
            </div>
            <SlideInWrapper>
                <AboutRotaract />
            </SlideInWrapper>
            <SlideInWrapper>
                <AboutVisio />
            </SlideInWrapper>
        </main>
    )
}
