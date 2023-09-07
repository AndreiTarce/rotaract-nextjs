import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import background from '../assets/images/bg.png'
import { getDictionary } from '@/lib/localization'

export default async function Home() {
    const dict = await getDictionary('ro')
    return (
        <main className="relative z-0">
            <div className="h-screen flex flex-col mt-28 justify-between">
                <div className="z-10 mx-16 max-md:mx-4">
                    <h1 className="w-fit text-7xl font-extrabold max-md:text-5xl leading-none bg-gradient-to-r from-rotaract-cranberry to-rose-500 bg-clip-text text-transparent">
                        Rotaract Visio
                    </h1>
                    <span className="font-normal text-5xl max-md:text-4xl">
                        Cluj-Napoca
                    </span>
                </div>
                <div className="z-10 mx-16 max-md:mx-4 text-4xl flex flex-col gap-2 mb-48 text-white">
                    <span>{dict.home.CTAtext}</span>
                    <Link href="/contact">
                        <Button className="w-fit text-lg bg-rotaract-cranberry text-white hover:bg-[#020817BB]">
                            {dict.home.CTAbutton}
                        </Button>
                    </Link>
                </div>
                <Image
                    src={background}
                    alt="background"
                    quality={100}
                    className="brightness-75 object-cover absolute h-2/5 top-0 overflow-visible"
                />
            </div>
            <div>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
            </div>
        </main>
    )
}
