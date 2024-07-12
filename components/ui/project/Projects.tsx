import { IProject } from '@/interfaces/IProject';
import { getProjects } from '@/lib/entityService';

export default async function ProjectsList() {
    const projects: IProject[] = await getProjects();
    // return projects.map((project: IProject, index: number) => (
    //     <ProjectCard key={index} {...project} />
    // ));
    return <>deploy</>;
}
