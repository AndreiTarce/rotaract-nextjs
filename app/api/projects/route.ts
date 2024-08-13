import { ProjectDto } from '@/dtos/project.dto';
import { ProjectInteractor } from '@/interactors/projectInteractor';
import connectMongoDB from '@/lib/mongodb';
import { ProjectRepository } from '@/repositories/projectRepository';
import { updateProjectWithPictures } from '@/use-cases/projects/updateProjectWithPictures';
import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from '../utils/error-handler';
import { ValidationError } from '../utils/errors';

const projectInteractor = new ProjectInteractor(new ProjectRepository());

export async function GET() {
    try {
        await connectMongoDB();
        const projects = await projectInteractor.getAllProjects();
        return NextResponse.json(projects, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectMongoDB();
        const data = await request.json();

        const project = await projectInteractor.createProject(data);
        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        return errorHandler(error);
    }
}

export async function PUT(request: NextRequest) {
    try {
        await connectMongoDB();
        const data = await request.formData();

        const projectData = await parseProjectFormData(data);

        const updatedProject = await updateProjectWithPictures(projectData);

        return NextResponse.json(updatedProject, { status: 201 });
    } catch (error) {
        return errorHandler(error);
    }
}

const parseProjectFormData = async (formData: FormData) => {
    const basicInfo = formData.get('project');
    const thumbnailImg: File = formData.get('thumbnailImg') as File;
    const coverImg: File = formData.get('coverImg') as File;

    let thumbnailBuffer: Buffer | undefined;
    let coverBuffer: Buffer | undefined;

    if (!basicInfo) {
        throw new ValidationError('Project info is required');
    }

    const projectObject: ProjectDto = JSON.parse(basicInfo.toString());

    if (thumbnailImg) {
        thumbnailBuffer = await convertFileToBuffer(thumbnailImg);
    }

    if (coverImg) {
        coverBuffer = await convertFileToBuffer(coverImg);
    }

    return {
        projectData: projectObject,
        thumbnailBuffer: thumbnailBuffer,
        thumbnailPictureType: thumbnailImg?.type,
        coverBuffer: coverBuffer,
        coverPictureType: coverImg?.type,
    };
};

const convertFileToBuffer = async (file: File) => {
    const blob = new Blob([file]);
    const arrayBuffer = await blob.arrayBuffer();
    return Buffer.from(arrayBuffer);
};
