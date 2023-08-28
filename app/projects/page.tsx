import ProjectCard from "@/components/ui/project/ProjectCard";
import ProjectsList from "@/components/ui/project/Projects";
import { GoogleSignInButton } from "@/components/ui/signin/authButton";

export default async function Projects() {
    return (
        <main className="mt-28 mx-16 max-md:mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <ProjectsList />
        </main>
    )
};