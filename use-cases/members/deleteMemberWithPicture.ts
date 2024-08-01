import { S3_BUCKET_MEMBERS_PATH, S3_BUCKET_NAME, s3Client } from '@/config/s3';
import { FileStorageInteractor } from '@/interactors/fileStorageInteractor';
import { MemberInteractor } from '@/interactors/memberInteractor';
import { MemberRepository } from '@/repositories/memberRepository';
import { S3Repository } from '@/repositories/S3Repository';

const storageInteractor = new FileStorageInteractor(
    new S3Repository(s3Client, S3_BUCKET_NAME, S3_BUCKET_MEMBERS_PATH)
);

const memberInteractor = new MemberInteractor(new MemberRepository());

export async function deleteMemberWithPicture(memberId: string) {
    const member = await memberInteractor.deleteMemberWithReturn(memberId);
    const memberPictureKey = `${member.first_name.toLowerCase()}_${member.last_name.toLowerCase()}`;

    if (member) {
        await storageInteractor.deleteFile(memberPictureKey);
    }
}
