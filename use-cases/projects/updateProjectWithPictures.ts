import { S3_BUCKET_MEMBERS_PATH, S3_BUCKET_NAME, s3Client } from '@/config/s3';
import { ProjectDto } from '@/dtos/project.dto';
import { FileStorageInteractor } from '@/interactors/fileStorageInteractor';
import { ProjectInteractor } from '@/interactors/projectInteractor';
import { ProjectRepository } from '@/repositories/projectRepository';
import { S3Repository } from '@/repositories/S3Repository';

const storageInteractor = new FileStorageInteractor(
    new S3Repository(s3Client, S3_BUCKET_NAME, S3_BUCKET_MEMBERS_PATH)
);
const projectInteractor = new ProjectInteractor(new ProjectRepository());

export async function updateProjectWithPictures({
    projectData,
    thumbnailBuffer,
    thumbnailPictureType,
    coverBuffer,
    coverPictureType,
}: {
    projectData: ProjectDto;
    thumbnailBuffer: Buffer | undefined;
    thumbnailPictureType: string;
    coverBuffer: Buffer | undefined;
    coverPictureType: string;
}) {
    const thumbnailPictureKey = `${projectData.name.toLowerCase()}_thumbnail`;
    const coverPictureKey = `${projectData.name.toLowerCase()}_cover`;

    if (thumbnailBuffer && thumbnailPictureType) {
        projectData.thumbnailImg = await storageInteractor.uploadFile(
            thumbnailBuffer,
            thumbnailPictureKey,
            thumbnailPictureType
        );
    }

    if (coverBuffer && coverPictureType) {
        projectData.coverImg = await storageInteractor.uploadFile(
            coverBuffer,
            coverPictureKey,
            coverPictureType
        );
    }

    const updatedProject = await projectInteractor.updateProject(projectData);
    return updatedProject;
}
