import { S3_BUCKET_MEMBERS_PATH, S3_BUCKET_NAME, s3Client } from '@/config/s3';
import { FileStorageInteractor } from '@/interactors/fileStorageInteractor';
import { ProjectInteractor } from '@/interactors/projectInteractor';
import { ProjectRepository } from '@/repositories/projectRepository';
import { S3Repository } from '@/repositories/S3Repository';

const storageInteractor = new FileStorageInteractor(
    new S3Repository(s3Client, S3_BUCKET_NAME, S3_BUCKET_MEMBERS_PATH)
);

const projectInteractor = new ProjectInteractor(new ProjectRepository());

export async function deleteProjectWithPictures(projectId: string) {
    const project = await projectInteractor.deleteProjectWithReturn(projectId);
    const thumbnailPictureKey = `${project?.name.toLowerCase()}_thumbnail`;
    const coverPictureKey = `${project?.name.toLowerCase()}_cover`;

    if (project) {
        await storageInteractor.deleteFile(thumbnailPictureKey);
        await storageInteractor.deleteFile(coverPictureKey);
    }
}
