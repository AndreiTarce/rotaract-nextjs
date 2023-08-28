import ProjectCard from "./ProjectCard";
import { IProject } from "@/models/project";
import { getProjects } from "@/lib/entityService";

export default async function ProjectsList() {
    const { projects }: { projects: IProject[] } = await getProjects();
    return projects.map((project: IProject, index: number) => (
        <ProjectCard key={index} {...project} />
    ))
}