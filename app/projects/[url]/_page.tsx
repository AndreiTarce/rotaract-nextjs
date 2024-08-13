import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getProject } from '@/lib/entityService';
import {
    faHandHoldingDollar,
    faRibbon,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';

import { ProjectArticleBody } from '@/components/projects/ProjectArticleBody';
import ProjectImageCarousel from '@/components/projects/ProjectImageCarousel';
import { ProjectNotFound } from '@/components/projects/ProjectNotFound';
import { ProjectDto } from '@/dtos/project.dto';
import {
    IProjectPartner,
    IProjectSection,
} from '@/interfaces/project/IProject';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata | undefined> {
    const id = params.id;

    const project = await getProject(id);

    const previousImages = (await parent).openGraph?.images || [];

    if (project) {
        return {
            title: `${project.name} | Rotaract Visio Cluj-Napoca`,
            openGraph: {
                images: [project.thumbnailImg, ...previousImages],
            },
            description: project.shortDescription,
        };
    }
}

type ProjectSectionProps = IProjectSection & { key: number };
type ProjectImageProps = { key?: number; src: string };

const ProjectSection = (props: ProjectSectionProps) => (
    <section className="mt-8">
        <h2 className="mb-2 text-3xl font-bold">{props.title}</h2>
        {props.coverImg && (
            <Image
                src={props.coverImg}
                alt={`${props.title} Cover Image`}
                width={3240}
                height={1080}
                className="mb-8 rounded-lg"
            />
        )}
        <p
            className="text-muted-foreground lg:text-xl"
            dangerouslySetInnerHTML={{
                __html: props.body,
            }}
        ></p>
    </section>
);

const ProjectImage = (props: ProjectImageProps) => (
    <Image
        src={props.src}
        alt={`Project photo ${props.key}`}
        width={500}
        height={500}
        className="rounded-lg"
        loading="eager"
    />
);

export default async function Project({ params }: { params: { id: string } }) {
    const id = params.id;
    const project = (await getProject(id)) as ProjectDto;

    if (!project) {
        return <ProjectNotFound />;
    }

    return (
        <main className="mx-16 mb-8 mt-5 max-md:mx-4 md:mt-12">
            <article className="flex flex-col gap-8">
                <div className="lg:mx-48 xl:mx-72">
                    <h1 className="mb-4 break-keep text-4xl font-bold md:text-5xl lg:text-7xl">
                        {project.title}
                    </h1>
                    <Image
                        src={project.coverImg}
                        alt={`${project.title} Cover Image`}
                        width={3240}
                        height={1080}
                        className="mb-8 rounded-lg"
                        priority
                    />
                    {(project.cause_link || project.donation_link) && (
                        <>
                            <div className="mb-4 flex flex-wrap gap-4">
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
                                        className="bg-rotaract-cranberry font-semibold text-white hover:bg-rotaract-cranberry"
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
                    <ProjectArticleBody project={project} />

                    {project.partners && (
                        <Card className="mt-8 bg-dark-blue bg-opacity-20 dark:bg-light dark:bg-opacity-10">
                            <CardHeader>
                                <CardTitle className="text-3xl font-bold">
                                    Parteneri
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
                                    {project.partners.map(
                                        (
                                            partner: IProjectPartner,
                                            index: number
                                        ) => (
                                            <Link
                                                href={partner.link}
                                                target="_blank"
                                                key={index}
                                                className="relative flex flex-col items-center justify-center gap-4 self-center rounded-lg p-3 hover:bg-black hover:!bg-opacity-10 hover:dark:bg-white"
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
                        <div className="grow lg:hidden">
                            <ProjectImageCarousel>
                                {project.images.map((image, index) => (
                                    <ProjectImage key={index} src={image} />
                                ))}
                            </ProjectImageCarousel>
                        </div>
                        <div className="hidden lg:grid lg:grid-cols-5 lg:gap-2">
                            {project.images.map((image, index) => (
                                <ProjectImage src={image} key={index} />
                            ))}
                        </div>
                    </>
                )}
            </article>
        </main>
    );
}
