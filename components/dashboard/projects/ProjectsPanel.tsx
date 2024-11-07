import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ProjectInteractor } from '@/interactors/projectInteractor';
import connectMongoDB from '@/lib/mongodb';
import { ProjectRepository } from '@/repositories/projectRepository';
import DashboardProjectCard from './DashboardProjectCard';

const projectInteractor = new ProjectInteractor(new ProjectRepository());

export default async function ProjectsPanel() {
    await connectMongoDB();

    const projects = await projectInteractor.getAllProjects();

    if (!projects) return;

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between pb-4">
                <CardTitle>Proiecte</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-96 w-full rounded pr-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-8">
                        {projects.map((project) => (
                            <DashboardProjectCard
                                project={project}
                                key={project.id}
                            />
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
