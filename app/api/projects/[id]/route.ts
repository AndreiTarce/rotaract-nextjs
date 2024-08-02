import { ProjectInteractor } from '@/interactors/projectInteractor';
import connectMongoDB from '@/lib/mongodb';
import { ProjectRepository } from '@/repositories/projectRepository';
import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from '../../utils/error-handler';

const projectInteractor = new ProjectInteractor(new ProjectRepository());

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectMongoDB();
        const { id } = params;

        const project = await projectInteractor.getProjectByUrl(id);

        return NextResponse.json(project, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
}
