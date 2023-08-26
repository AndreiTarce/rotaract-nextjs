export default function Page({ params }: { params: { id: string } }) {
    return <div className="mt-24">Project {params.id}</div>
}