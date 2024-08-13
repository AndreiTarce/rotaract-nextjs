import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ProjectDto } from '@/dtos/project.dto';
import { getProjectPartners } from '@/use-cases/projects/getProjectPartners';
import Image from 'next/image';
import DashboardProjectDetails from './DashboardProjectDetails';

export default async function DashboardProjectCard({
    project,
}: {
    project: ProjectDto;
}) {
    const partners = await getProjectPartners(project.partners);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="relative flex flex-col items-center justify-center px-2 py-4 hover:cursor-pointer hover:bg-black hover:bg-opacity-10 dark:hover:bg-gray-50 dark:hover:bg-opacity-10">
                    <Image
                        src={project.thumbnailImg}
                        alt="Profile picture"
                        width={50}
                        height={50}
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                        unoptimized
                    />
                    <div className="mt-4 font-semibold">{project.name}</div>
                </Card>
            </DialogTrigger>
            <DialogContent className="max-w-[60%] rounded-lg max-md:w-[90%] max-md:max-w-[90%]">
                <DashboardProjectDetails
                    project={project}
                    partners={partners}
                />
            </DialogContent>
        </Dialog>
    );
}
