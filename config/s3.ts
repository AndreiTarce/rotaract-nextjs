import { S3Client } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
    },
});

export const S3_BUCKET_BASE_URL = process.env.AWS_S3_BUCKET_BASE_URL as string;
export const S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME as string;
export const S3_BUCKET_MEMBERS_PATH = 'members';
