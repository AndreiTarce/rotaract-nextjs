export interface IBlobFileStorage {
    upload(fileBuffer: Buffer, name: string, contentType?: string): Promise<string>;
    delete(name: string): Promise<void>;
}
