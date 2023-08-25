import ProjectCard, { ProjectCardProps } from "@/components/ui/project/ProjectCard";
import ProjectsList from "@/components/ui/project/Projects";

export default async function Projects() {
    const props: ProjectCardProps = {
        id: 1,
        title: "GhiozdanOK",
        description: "GhiozdanOK este un proiect de strangere de rechizite pentru elevii nevoiasi.",
        img: "https://i.ibb.co/PNBVDtt/Ghiozdan-OK-Afis.png",
    }

    return (
        <main className="mt-28 mx-16 max-md:mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <ProjectsList />
        </main>
    )
};