import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import background from '../assets/images/bg.png'
import { getDictionary } from '@/lib/localization'
import AboutRotaract from '@/components/ui/home/AboutRotaract'
import AboutVisio from '@/components/ui/home/AboutVisio'

export default async function Home() {
    const dict = await getDictionary('ro')
    return (
        <main className="h-fit pt-12">
            <div className="grid grid-cols-1 grid-rows-[75%_25%] gap-0 h-screen pb-28 bg-[url('../assets/images/bg.png')] bg-cover bg-center mb-8 ">
                <div className="mx-16 max-md:mx-4">
                    <h1 className="w-fit text-7xl font-extrabold max-md:text-5xl leading-none bg-gradient-to-r from-rotaract-cranberry to-rose-500 bg-clip-text text-transparent">
                        Rotaract Visio
                    </h1>
                    <span className="font-normal text-5xl max-md:text-4xl">
                        Cluj-Napoca
                    </span>
                </div>
                <div className="text-4xl flex flex-col gap-2 text-white mx-16 max-md:mx-4">
                    <span>{dict.home.CTAtext}</span>
                    <Link href="/contact" className="w-fit h-fit">
                        <Button className="w-fit text-lg bg-rotaract-cranberry text-white hover:bg-[#020817BB]">
                            {dict.home.CTAbutton}
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
            <AboutRotaract />
            <AboutVisio />
        </main>
    )
}
