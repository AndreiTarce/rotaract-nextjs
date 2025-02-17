import { ProjectArticleBody } from '@/components/projects/ProjectArticleBody';
import ProjectImageCarousel from '@/components/projects/ProjectImageCarousel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PartnerInteractor } from '@/interactors/partnerInteractor';
import { ProjectInteractor } from '@/interactors/projectInteractor';
import connectMongoDB from '@/lib/mongodb';
import { PartnerRepository } from '@/repositories/partnerRepository';
import { ProjectRepository } from '@/repositories/projectRepository';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const projectInteractor = new ProjectInteractor(new ProjectRepository());
const partnerInteractor = new PartnerInteractor(new PartnerRepository());

type Props = {
    params: Promise<{ url: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
    props: Props,
    parent: ResolvingMetadata
): Promise<Metadata | undefined> {
    const params = await props.params;
    const url = params.url;

    const project = await projectInteractor.getProjectByUrl(url);

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

export default async function Project(props: {
    params: Promise<{ url: string }>;
}) {
    const params = await props.params;
    await connectMongoDB();
    const project = await projectInteractor.getProjectByUrl(params.url);
    const projectPartnerIds = project.partners.map(
        (partner) => partner.partnerId
    );
    const projectPartners =
        await partnerInteractor.getPartnersByIds(projectPartnerIds);

    return (
        <main className="mx-16 mt-5 mb-8 max-md:mx-4 md:mt-12">
            <article className="flex flex-col gap-8">
                <div className="lg:mx-48 xl:mx-72">
                    <h1 className="mb-4 text-4xl font-bold break-keep md:text-5xl lg:text-7xl">
                        {project.name}
                    </h1>
                    <Image
                        src={project.coverImg}
                        alt={`${project.name} Cover Image`}
                        width={3240}
                        height={1080}
                        className="mb-8 rounded-lg"
                        priority
                    />

                    <ProjectArticleBody body={project.body} />

                    {projectPartners && (
                        <Card className="bg-dark-blue/20 dark:bg-light/10 mt-8">
                            <CardHeader>
                                <CardTitle className="text-3xl font-bold">
                                    Parteneri
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
                                    {projectPartners.map(
                                        (partner, index: number) => (
                                            <Link
                                                href={partner.link}
                                                target="_blank"
                                                key={index}
                                                className="relative flex flex-col items-center justify-center gap-4 self-center rounded-lg p-3 hover:bg-black/10 dark:hover:bg-white/10"
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
                                    <Image
                                        key={index}
                                        src={image}
                                        alt={`Project photo ${index}`}
                                        width={500}
                                        height={500}
                                        className="rounded-lg"
                                        loading="eager"
                                    />
                                ))}
                            </ProjectImageCarousel>
                        </div>
                        <div className="hidden lg:grid lg:grid-cols-5 lg:gap-2">
                            {project.images.map((image, index) => (
                                <Image
                                    key={index}
                                    src={image}
                                    alt={`Project photo ${index}`}
                                    width={500}
                                    height={500}
                                    className="rounded-lg"
                                    loading="eager"
                                />
                            ))}
                        </div>
                    </>
                )}
            </article>
        </main>
    );
}
