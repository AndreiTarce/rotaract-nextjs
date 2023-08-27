import ProjectImageCarousel from "@/components/ui/project/ProjectImageCarousel";
import { getProject } from "@/lib/entityService"
import { IProject, ISection } from "@/models/project";


type ProjectSectionProps = ISection & { key: number };
type ProjectImageProps = { key?: number, src: string };

const ProjectSection = (props: ProjectSectionProps) => (
    <section key={props.key}>
        <h2 className="text-3xl font-bold">{props.title}</h2>
        <p>{props.body}</p>
    </section>
)

const ProjectImage = (props: ProjectImageProps) => (
    <img key={props.key} src={props.src} className="w-full" />
)

export default async function Project({ params }: { params: { id: string } }) {
    const id = params.id;
    const project: IProject = await getProject(id);
    return (
        <main className="mt-24 mb- mx-16 max-md:mx-4">
            <article className="flex flex-col gap-4">
                <h1 className="text-4xl font-bold break-keep md:text-5xl lg:text-7xl">
                    {project.title}
                </h1>
                <p>
                    {project.description}
                </p>
                {project.sections.map((section, index) => <ProjectSection title={section.title} body={section.body} key={index} />)}
                <div className="lg:hidden">
                    <ProjectImageCarousel>
                        {project.images.map((image, index) => <ProjectImage key={index} src={image} />)}
                    </ProjectImageCarousel>
                </div>
                <div className="hidden lg:gap-2 lg:grid lg:grid-cols-3">
                    {project.images.map((image, index) => <div key={index} className="w-full rounded"><ProjectImage src={image} /></div>)}
                </div>
            </article>
        </main>
    );
}