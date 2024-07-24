import { IProject } from '@/interfaces/project/IProject';
import { getProjects } from '@/lib/entityService';
import ProjectCard from './ProjectCard';

export default async function ProjectsList() {
    const projects: IProject[] = await getProjects();
    return projects.map((project: IProject, index: number) => (
        <ProjectCard key={index} {...project} />
    ));
}
