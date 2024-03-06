import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ProjectImageCarousel from '@/components/ui/project/ProjectImageCarousel'
import { Separator } from '@/components/ui/separator'
import { getProject } from '@/lib/entityService'
import { IProject, IProjectPartner, ISection } from '@/models/project'
import {
    faHandHoldingDollar,
    faRibbon,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'

import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const id = params.id

    const project: IProject = await getProject(id)

    const previousImages = (await parent).openGraph?.images || []

    return {
        title: `${project.title} | Rotaract Visio Cluj-Napoca`,
        openGraph: {
            images: [project.thumbnailImg, ...previousImages],
        },
        description: project.description,
    }
}

type ProjectSectionProps = ISection & { key: number }
type ProjectImageProps = { key?: number; src: string }

const ProjectSection = (props: ProjectSectionProps) => (
    <section className="mt-8">
        <h2 className="text-3xl font-bold mb-2">{props.title}</h2>
        {props.coverImg && (
            <Image
                src={props.coverImg}
                alt={`${props.title} Cover Image`}
                width={3240}
                height={1080}
                className="rounded-lg mb-8"
                priority
            />
        )}
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
            <article className="flex flex-col gap-8">
                <div className="xl:mx-72 lg:mx-48">
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
                    {(project.cause_link || project.donation_link) && (
                        <>
                            <div className="mb-4 flex gap-4 flex-wrap">
                                {project.cause_link && (
                                    <Button className="font-semibold" asChild>
                                        <Link
                                            href={{
                                                pathname: '/about',
                                                query: {
                                                    cause: project.cause_link,
                                                },
                                            }}
                                        >
                                            Vezi cauza proiectului{' '}
                                            <FontAwesomeIcon
                                                icon={faRibbon}
                                                className="ml-2"
                                            />{' '}
                                        </Link>
                                    </Button>
                                )}
                                {project.donation_link && (
                                    <Button
                                        asChild
                                        className="font-semibold bg-rotaract-cranberry text-white hover:bg-rotaract-cranberry"
                                    >
                                        <Link
                                            href={project.donation_link}
                                            target="_blank"
                                        >
                                            Donează acum
                                            <FontAwesomeIcon
                                                icon={faHandHoldingDollar}
                                                className="ml-2"
                                            />
                                        </Link>
                                    </Button>
                                )}
                            </div>
                            <Separator className="mb-2" />
                        </>
                    )}
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
                        <Card className="mt-8 bg-dark-blue dark:bg-light bg-opacity-20 dark:bg-opacity-10">
                            <CardHeader>
                                <CardTitle className="text-3xl font-bold">
                                    Parteneri
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
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
                                                            src={
                                                                partner.logoUrl
                                                            }
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
                            </CardContent>
                        </Card>
                    )}
                </div>
                {project.images && (
                    <>
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
                    </>
                )}
            </article>
        </main>
    )
}
