import { ProjectDto } from '@/dtos/project.dto';
import { getProjects } from '@/lib/entityService';
import ProjectCard from './ProjectCard';

export default async function ProjectsList() {
    const projects = await getProjects();

    if (projects) {
        return projects.map((project: ProjectDto, index: number) => (
            <ProjectCard key={index} {...project} />
        ));
    }
}
