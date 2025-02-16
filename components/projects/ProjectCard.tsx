import { ProjectDto } from '@/dtos/project.dto';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

const ProjectCard = ({ project }: { project: ProjectDto }) => {
    return (
        <Card className="flex max-w-full flex-[1_0_300px] flex-col overflow-hidden rounded-lg border shadow-md">
            <Link href={`projects/${project.url}`}>
                <Image
                    src={project.thumbnailImg}
                    alt={`${project.name} poster`}
                    width={600}
                    height={600}
                />
            </Link>
            <div className="flex h-full flex-col justify-between p-5">
                <div>
                    <Link href={`projects/${project.name}`}>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {project.name}
                        </h5>
                    </Link>
                    <p className="text-muted-foreground mb-3 font-normal">
                        {project.shortDescription}
                    </p>
                </div>
                <Link href={`projects/${project.url}`} className="w-fit" passHref>
                    <Button size="sm">
                        Citește mai mult
                        <svg
                            className="ml-2 h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Button>
                </Link>
            </div>
        </Card>
    );
};

export default ProjectCard;
