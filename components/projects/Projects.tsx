import { ProjectDto } from '@/dtos/project.dto';
import { ProjectInteractor } from '@/interactors/projectInteractor';
import connectMongoDB from '@/lib/mongodb';
import { ProjectRepository } from '@/repositories/projectRepository';
import ProjectCard from './ProjectCard';

const projectInteractor = new ProjectInteractor(new ProjectRepository());

export default async function ProjectsList() {
    await connectMongoDB();
    const projects = await projectInteractor.getAllProjects();

    if (projects) {
        return projects.map((project: ProjectDto, index: number) => (
            <ProjectCard key={index} project={project} />
        ));
    }
}
