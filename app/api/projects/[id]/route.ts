import connectMongoDB from '@/lib/mongodb';
import { ProjectRepository } from '@/repositories/projectRepository';
import { ProjectService } from '@/services/projectService';
import { NextRequest, NextResponse } from 'next/server';

const projectRepository = new ProjectRepository();
const projectService = new ProjectService(projectRepository);

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        console.log('here');
        const { id } = params;
        await connectMongoDB();
        const project = await projectService.getProjectByUrl(id);
        return NextResponse.json(project, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
