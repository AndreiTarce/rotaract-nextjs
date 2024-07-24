import connectMongoDB from '@/lib/mongodb';
import { ProjectRepository } from '@/repositories/projectRepository';
import { ProjectService } from '@/services/projectService';
import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from '../../utils/error-handler';

const projectRepository = new ProjectRepository();
const projectService = new ProjectService(projectRepository);

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectMongoDB();
        const { id } = params;
        const project = await projectService.getProjectByUrl(id);
        return NextResponse.json(project, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
}
