import ProjectImageCarousel from '@/components/ui/project/ProjectImageCarousel'
import { getProject } from '@/lib/entityService'
import { IProject, IProjectPartner, ISection } from '@/models/project'
import Image from 'next/image'
import testlogo from '@/assets/images/visio.webp'
import Link from 'next/link'

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
        loading="eager"
    />
)

export default async function Project({ params }: { params: { id: string } }) {
    const id = params.id
    const project: IProject = await getProject(id)
    return (
        <main className="mt-5 md:mt-12 mb-8 mx-16 max-md:mx-4">
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
                        priority
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
                    {project.partners && (
                        <>
                            <h2 className="mt-8 text-3xl font-bold mb-2">
                                Parteneri
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                                {project.partners.map(
                                    (
                                        partner: IProjectPartner,
                                        index: number
                                    ) => (
                                        <Link
                                            href={partner.link}
                                            target="_blank"
                                            key={index}
                                            className="relative flex flex-col items-center justify-center gap-4 self-center p-3 rounded-lg hover:bg-black hover:dark:bg-white hover:!bg-opacity-10"
                                        >
                                            {partner.logoUrl ? (
                                                <div className="grow">
                                                    <Image
                                                        src={partner.logoUrl}
                                                        alt={`${partner.name} logo`}
                                                        width={200}
                                                        height={200}
                                                        className="h-full w-auto"
                                                    />
                                                </div>
                                            ) : (
                                                <p className="font-semibold">
                                                    {partner.name}
                                                </p>
                                            )}
                                        </Link>
                                    )
                                )}
                            </div>
                        </>
                    )}
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
