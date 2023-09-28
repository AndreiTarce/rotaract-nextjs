import ProjectImageCarousel from '@/components/ui/project/ProjectImageCarousel'
import { getProject } from '@/lib/entityService'
import { IProject, ISection } from '@/models/project'
import Image from 'next/image'

type ProjectSectionProps = ISection & { key: number }
type ProjectImageProps = { key?: number; src: string }

const ProjectSection = (props: ProjectSectionProps) => (
    <section className="mt-8">
        <h2 className="text-3xl font-bold mb-2">{props.title}</h2>
        <p
            className="lg:text-xl text-muted-foreground"
            dangerouslySetInnerHTML={{
                __html: props.body,
            }}
        ></p>
    </section>
)

const ProjectImage = (props: ProjectImageProps) => (
    <Image
        src={props.src}
        alt={`Project photo ${props.key}`}
        width={500}
        height={500}
        className="rounded-lg"
    />
)

export default async function Project({ params }: { params: { id: string } }) {
    const id = params.id
    const project: IProject = await getProject(id)
    return (
        <main className="mt-12 mb-8 mx-16 max-md:mx-4">
            <article className="flex flex-col gap-4">
                <div className="xl:mx-72 lg:mx-48 mb-8">
                    <h1 className="text-4xl font-bold break-keep md:text-5xl lg:text-7xl mb-4">
                        {project.title}
                    </h1>
                    <Image
                        src={project.coverImg}
                        alt={`${project.title} Cover Image`}
                        width={3240}
                        height={1080}
                        className="rounded-lg mb-8"
                    />
                    <p
                        className="lg:text-xl text-muted-foreground"
                        dangerouslySetInnerHTML={{
                            __html: project.description,
                        }}
                    ></p>
                    {project.sections.map((section, index) => (
                        <ProjectSection
                            title={section.title}
                            body={section.body}
                            key={index}
                        />
                    ))}
                </div>
                <div className="lg:hidden grow">
                    <ProjectImageCarousel>
                        {project.images.map((image, index) => (
                            <ProjectImage key={index} src={image} />
                        ))}
                    </ProjectImageCarousel>
                </div>
                <div className="hidden lg:gap-2 lg:grid lg:grid-cols-5">
                    {project.images.map((image, index) => (
                        <ProjectImage src={image} key={index} />
                    ))}
                </div>
            </article>
        </main>
    )
}
