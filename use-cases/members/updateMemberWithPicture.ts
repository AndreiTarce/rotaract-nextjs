import { S3_BUCKET_MEMBERS_PATH, S3_BUCKET_NAME, s3Client } from '@/config/s3';
import { MemberDto } from '@/dtos/member.dto';
import { FileStorageInteractor } from '@/interactors/fileStorageInteractor';
import { MemberInteractor } from '@/interactors/memberInteractor';
import {
    memberIsBoardBasedOnRole,
    memberIsCurrentPastPresident,
} from '@/lib/utils';
import { MemberRepository } from '@/repositories/memberRepository';
import { S3Repository } from '@/repositories/S3Repository';
import { validateMemberFormData } from '@/schemas/memberSchema';

const storageInteractor = new FileStorageInteractor(
    new S3Repository(s3Client, S3_BUCKET_NAME, S3_BUCKET_MEMBERS_PATH)
);

const memberInteractor = new MemberInteractor(new MemberRepository());

export async function updateMemberWithPicture(
    member: MemberDto,
    pictureBuffer?: Buffer,
    pictureType?: string
) {
    const memberData = { ...member };

    validateMemberFormData(memberData);

    const memberPictureKey = `${member.first_name.toLowerCase()}_${member.last_name.toLowerCase()}`;

    if (pictureBuffer && pictureType) {
        const memberPrictureUrl = await storageInteractor.uploadFile(
            pictureBuffer,
            memberPictureKey,
            pictureType
        );
        memberData.picture = memberPrictureUrl;
    }

    memberData.isBoard = false;
    if (
        memberIsBoardBasedOnRole(memberData) ||
        memberIsCurrentPastPresident(memberData)
    ) {
        memberData.isBoard = true;
    }

    const updatedMember = await memberInteractor.updateMember(memberData);
    return updatedMember;
}
