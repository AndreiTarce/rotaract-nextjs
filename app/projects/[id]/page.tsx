export default function Page({ params }: { params: { id: number } }) {
    return <div className="mt-24">Project {params.id}</div>
}