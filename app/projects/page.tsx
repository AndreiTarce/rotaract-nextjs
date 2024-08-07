import ProjectsList from '@/components/ui/project/Projects';
import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';

const description =
    'Principala noastră formă de ajutor o reprezintă proiectele pe care le organizăm. Prin intermediul acestora încercăm să facilităm cât mai mult implicarea comunității în scopuri caritabile. Descoperă mai jos principalele noastre proiecte!';

export const metadata: Metadata = {
    title: 'Proiecte | Rotaract Visio Cluj-Napoca',
    description: description,
};

export default async function Projects() {
    return (
        <main className="mx-16 mt-5 min-h-screen max-md:mx-4 md:mt-12">
            <h1 className="mb-2 w-fit bg-gradient-to-r from-rotaract-cranberry to-rose-500 bg-clip-text text-7xl font-extrabold leading-none text-transparent max-md:text-5xl">
                Proiectele noastre
            </h1>
            <p className="text-muted-foreground md:w-2/3">{description}</p>
            <Separator className="mb-8 mt-4" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <ProjectsList />
            </div>
        </main>
    );
}
