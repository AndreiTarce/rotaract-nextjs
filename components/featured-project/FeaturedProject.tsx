import { FeaturedProjectInteractor } from '@/interactors/featuredProjectInteractor';
import { ProjectInteractor } from '@/interactors/projectInteractor';
import connectMongoDB from '@/lib/mongodb';
import { FeaturedProjectRepository } from '@/repositories/featuredProjectRepository';
import { ProjectRepository } from '@/repositories/projectRepository';
import FeaturedProjectCard from '../ui/home/FeaturedProjectCard';

const featuredProjectInteractor = new FeaturedProjectInteractor(new FeaturedProjectRepository());

const projectInteractor = new ProjectInteractor(new ProjectRepository());

export const dynamic = 'force-dynamic';

export default async function FeaturedProject() {
    await connectMongoDB();

    const featuredProjectInfo = await featuredProjectInteractor.getProject();
    const project = await projectInteractor.getProjectById(featuredProjectInfo.projectId);
    const featuredProject = { ...featuredProjectInfo, ...project };

    const today = new Date();
    const startDate = new Date(featuredProjectInfo.start_date);
    const endDate = new Date(featuredProjectInfo.end_date);

    if (today < startDate || today > endDate) return;

    return <FeaturedProjectCard project={featuredProject} />;
}
