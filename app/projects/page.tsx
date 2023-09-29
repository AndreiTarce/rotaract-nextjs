import ProjectsList from '@/components/ui/project/Projects'
import { Separator } from '@/components/ui/separator'

export default async function Projects() {
    return (
        <main className="mt-5 md:mt-12 mx-16 max-md:mx-4 min-h-screen">
            <h1 className="w-fit text-7xl font-extrabold max-md:text-5xl leading-none bg-gradient-to-r from-rotaract-cranberry to-rose-500 bg-clip-text text-transparent mb-2">
                Proiectele noastre
            </h1>
            <p className="text-muted-foreground md:w-2/3">
                Principala noastră formă de ajutor o reprezintă proiectele pe
                care le organizăm. Prin intermediul acestora încercăm să
                facilităm cât mai mult implicarea comunității în scopuri
                caritabile. Descoperă mai jos principalele noastre proiecte!
            </p>
            <Separator className="mb-8 mt-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <ProjectsList />
            </div>
        </main>
    )
}
