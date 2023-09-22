import SlideInWrapper from '@/components/ui/animation/SlideInWrapper'
import ProjectsList from '@/components/ui/project/Projects'
import { Separator } from '@/components/ui/separator'

export default async function Projects() {
    return (
        <main className="mt-12 mx-16 max-md:mx-4 min-h-screen">
            <h1 className="w-fit text-7xl font-extrabold max-md:text-5xl leading-none bg-gradient-to-r from-rotaract-cranberry to-rose-500 bg-clip-text text-transparent mb-2">
                Proiectele noastre
            </h1>
            <p className="text-muted-foreground md:w-2/3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Doloribus odit aut illo neque corporis sapiente cum eum
                laboriosam iure unde temporibus, doloremque eos quae? Expedita
                soluta ratione adipisci magni velit.
            </p>
            <Separator className="mb-8 mt-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <ProjectsList />
            </div>
        </main>
    )
}
