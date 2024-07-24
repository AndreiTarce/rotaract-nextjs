import connectMongoDB from '@/lib/mongodb';
import { ProjectRepository } from '@/repositories/projectRepository';
import { ProjectService } from '@/services/projectService';
import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from '../utils/error-handler';

const projectRepository = new ProjectRepository();
const projectService = new ProjectService(projectRepository);

export async function POST(request: NextRequest) {
    try {
        await connectMongoDB();
        const data = await request.json();
        const project = await projectService.createProject(data);
        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        return errorHandler(error);
    }
}

export async function GET() {
    try {
        await connectMongoDB();
        const projects = await projectService.getAllProjects();
        return NextResponse.json(projects, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
}

export async function DELETE(request: NextRequest) {
    try {
        await connectMongoDB();
        const { id } = await request.json();
        await projectService.deleteProject(id);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return errorHandler(error);
    }
}
