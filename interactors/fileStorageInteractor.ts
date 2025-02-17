import { IBlobFileStorage } from '@/interfaces/IBlobFileStorage';

export class FileStorageInteractor {
    private repository: IBlobFileStorage;

    constructor(repository: IBlobFileStorage) {
        this.repository = repository;
    }

    async uploadFile(fileBuffer: Buffer, name: string, type: string) {
        const fileUrl = await this.repository.upload(fileBuffer, name.replace(/\s/g, ''), type);
        return fileUrl;
    }

    async deleteFile(name: string) {
        await this.repository.delete(name);
    }
}
