import { getProject } from "@/lib/entityService"

export default async function Project({ params }: { params: { id: string } }) {
    const id = params.id;
    const project = await getProject(id);
    return (
        <main className="mt-24">
            Project {project.title}
        </main>
    );
}