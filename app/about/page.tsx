import AboutVisio from '@/components/about/AboutVisio'
import background from '@/assets/images/desprenoibg.webp'
import Image from 'next/image'

export default function About() {
    return (
        <main className="mt-12">
            <div className="w-full relative h-screen">
                <h1 className="mx-16 max-md:mx-4 w-fit text-7xl font-extrabold max-md:text-5xl leading-none bg-gradient-to-r from-rotaract-cranberry to-rose-500 bg-clip-text text-transparent mb-2">
                    Despre noi
                </h1>
                <p className="mx-16 max-md:mx-4 md:w-2/3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis minima tenetur id necessitatibus rem molestias
                    optio accusamus omnis, fugiat distinctio tempore at ad! Ab
                    illo dicta ipsam temporibus fuga fugiat.
                </p>
                <Image
                    src={background}
                    alt="Rotaract Visio Group Photo"
                    sizes="100vw"
                    fill
                    style={{ objectFit: 'cover', zIndex: '-10' }}
                    priority
                />
            </div>
            <div className="mx-16 max-md:mx-4 mt-16">
                <AboutVisio />
            </div>
        </main>
    )
}
