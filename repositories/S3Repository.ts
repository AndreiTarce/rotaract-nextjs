import { S3_BUCKET_BASE_URL } from '@/config/s3';
import { IBlobFileStorage } from '@/interfaces/IBlobFileStorage';
import {
    DeleteObjectCommand,
    DeleteObjectCommandInput,
    PutObjectCommand,
    PutObjectCommandInput,
    S3Client,
} from '@aws-sdk/client-s3';

export class S3Repository implements IBlobFileStorage {
    private client: S3Client;
    private bucketName: string;
    private basePath: string;

    constructor(client: S3Client, bucketName: string, basePath: string) {
        this.client = client;
        this.bucketName = bucketName;
        this.basePath = basePath;
    }

    async upload(
        fileBuffer: Buffer,
        name: string,
        contentType: string
    ): Promise<string> {
        const params: PutObjectCommandInput = {
            Bucket: this.bucketName,
            Key: `${this.basePath}/${name}`,
            Body: fileBuffer,
            ContentType: contentType,
        };

        const command = new PutObjectCommand(params);
        await this.client.send(command);

        return `${S3_BUCKET_BASE_URL}/${this.basePath}/${name}`;
    }

    async delete(name: string): Promise<void> {
        const input: DeleteObjectCommandInput = {
            Bucket: this.bucketName,
            Key: `${this.basePath}/${name}`,
        };
        const command = new DeleteObjectCommand(input);
        await this.client.send(command);
    }
}
