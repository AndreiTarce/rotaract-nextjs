import { PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
    },
});

export const uploadFileToS3 = async (
    file: FormDataEntryValue,
    fileBuffer: Buffer,
    path: string,
    fileName: string
) => {
    const params: PutObjectCommandInput = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${path}/${fileName}`,
        Body: fileBuffer,
        ContentType: (file as any).type,
        // ContentType:
    };

    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);
    return response;
};
