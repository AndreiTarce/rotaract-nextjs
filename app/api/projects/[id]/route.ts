import { ProjectInteractor } from '@/interactors/projectInteractor';
import connectMongoDB from '@/lib/mongodb';
import { ProjectRepository } from '@/repositories/projectRepository';
import { deleteProjectWithPictures } from '@/use-cases/projects/deleteProjectWithPictures';
import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from '../../utils/error-handler';
import { ValidationError } from '../../utils/errors';

const projectInteractor = new ProjectInteractor(new ProjectRepository());

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        await connectMongoDB();
        const { id } = params;

        const project = await projectInteractor.getProjectByUrl(id);

        return NextResponse.json(project, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        await connectMongoDB();

        const { id } = params;

        if (!id) {
            throw new ValidationError('ID is required');
        }

        await deleteProjectWithPictures(id);

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return errorHandler(error);
    }
}
