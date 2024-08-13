import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getProjects } from '@/lib/entityService';
import { headers } from 'next/headers';
import DashboardProjectCard from './DashboardProjectCard';

export default async function ProjectsPanel() {
    const cookies = headers().get('cookie') || undefined;
    const projects = await getProjects(cookies);

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
