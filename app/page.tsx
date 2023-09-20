import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import background from '../assets/images/bg.png'
import { getDictionary } from '@/lib/localization'

export default async function Home() {
    const dict = await getDictionary('ro')
    return (
        <main className="h-full z-0 relative pt-28">
            <div className="flex flex-col justify-between h-full pb-16">
                <div className="z-10 mx-16 max-md:mx-4">
                    <h1 className="w-fit text-7xl font-extrabold max-md:text-5xl leading-none bg-gradient-to-r from-rotaract-cranberry to-rose-500 bg-clip-text text-transparent">
                        Rotaract Visio
                    </h1>
                    <span className="font-normal text-5xl max-md:text-4xl">
                        Cluj-Napoca
                    </span>
                </div>
                <div className="z-10 mx-16 max-md:mx-4 text-4xl flex flex-col gap-2 text-white">
                    <span>{dict.home.CTAtext}</span>
                    <Link href="/contact" className="w-fit">
                        <Button className="w-fit text-lg bg-rotaract-cranberry text-white hover:bg-[#020817BB]">
                            {dict.home.CTAbutton}
                        </Button>
                    </Link>
                </div>
                <Image
                    src={background}
                    alt="background"
                    quality={100}
                    className="brightness-75 absolute top-0 object-cover h-full"
                />
            </div>
        </main>
    )
}
