import Link from "next/link";
import ProjectCard, { ProjectCardProps } from "./ProjectCard";

const getProjects = async () => {
    const url = `${process.env.API_BASE_URL}/api/projects`
    try {
        const res = await fetch(url, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch projects");
        }

        return res.json();
    } catch (error) {
        console.log("Error loading projects: ", error);
    }
};

export default async function ProjectsList() {
    const { projects } = await getProjects();
    return projects.map((project: ProjectCardProps, index: number) => (
        <ProjectCard key={index} {...project} />
    ))

}