import { IBlobFileStorage } from '@/interfaces/IBlobFileStorage';

export class FileStorageService {
    private repository: IBlobFileStorage;

    constructor(repository: IBlobFileStorage) {
        this.repository = repository;
    }

    async uploadFile(fileBuffer: Buffer, name: string, type: string) {
        const fileUrl = await this.repository.upload(fileBuffer, name, type);
        return fileUrl;
    }

    async deleteFile(name: string) {
        await this.repository.delete(name);
    }
}
