import { S3_BUCKET_MEMBERS_PATH } from '@/config/constants';
import { s3Client } from '@/config/s3';
import { IMember } from '@/interfaces/member/IMember';
import connectMongoDB from '@/lib/mongodb';
import { S3Repository } from '@/repositories/S3Repository';
import { MemberRepository } from '@/repositories/memberRepository';
import { FileStorageService } from '@/services/fileStorageService';
import { MemberService } from '@/services/memberService';
import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from '../utils/error-handler';
import { ValidationError } from '../utils/errors';

const memberRepository = new MemberRepository();
const memberService = new MemberService(memberRepository);
const storageRepository = new S3Repository(
    s3Client,
    process.env.AWS_S3_BUCKET_NAME as string,
    S3_BUCKET_MEMBERS_PATH
);
const storageService = new FileStorageService(storageRepository);

export async function GET(request: NextRequest, response: NextResponse) {
    try {
        await connectMongoDB();

        const nameSearchQuery = request.nextUrl.searchParams.get('name');
        if (nameSearchQuery) {
            const members =
                await memberService.getMembersByName(nameSearchQuery);
            return NextResponse.json(members, { status: 200 });
        }

        const emailSearchQuery = request.nextUrl.searchParams.get('email');
        if (emailSearchQuery) {
            const member =
                await memberService.getMemberByEmail(emailSearchQuery);
            return NextResponse.json(member || {}, { status: 200 });
        }

        const members = await memberService.getAllMembers();

        return NextResponse.json(members, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
}

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        await connectMongoDB();

        const formData = await request.formData();
        const { memberData, memberPictureBuffer, memberPictureType } =
            await parseCreateMemberFormData(formData);

        if (memberPictureBuffer) {
            const memberPictureUrl = await storageService.uploadFile(
                memberPictureBuffer,
                `${memberData.first_name.toLowerCase()}_${memberData.last_name.toLowerCase()}`,
                memberPictureType
            );
            memberData.picture = memberPictureUrl;
        }

        const member = await memberService.createMember(memberData);

        return NextResponse.json(member, { status: 201 });
    } catch (error) {
        return errorHandler(error);
    }
}

export async function PUT(request: NextRequest, response: NextResponse) {
    try {
        await connectMongoDB();

        const formData = await request.formData();
        const { memberData, memberPictureBuffer, memberPictureType } =
            await parseCreateMemberFormData(formData);

        if (memberPictureBuffer) {
            const memberPictureUrl = await storageService.uploadFile(
                memberPictureBuffer,
                `${memberData.first_name.toLowerCase()}_${memberData.last_name.toLowerCase()}`,
                memberPictureType
            );
            memberData.picture = memberPictureUrl;
        }

        const member = await memberService.updateMember(memberData);

        return NextResponse.json(member, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
}

export async function DELETE(request: NextRequest) {
    try {
        await connectMongoDB();
        const { id } = await request.json();

        if (!id) {
            throw new ValidationError('ID is required');
        }

        const member = await memberService.deleteMemberWithReturn(id);
        if (member) {
            const memberPictureKey = `${member.first_name.toLowerCase()}_${member.last_name.toLowerCase()}`;
            await storageService.deleteFile(memberPictureKey);
        }

        return new NextResponse(null, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
}

const parseCreateMemberFormData = async (formData: FormData) => {
    const basicInfo = formData.get('member');
    let buffer: Buffer | null = null;
    const picture: File = formData.get('picture_file') as File;

    if (!basicInfo) {
        throw new ValidationError('Member info is required');
    }

    const memberObject: IMember = JSON.parse(basicInfo.toString());

    if (picture) {
        const blob = new Blob([picture]);
        const arrayBuffer = await blob.arrayBuffer();
        buffer = Buffer.from(arrayBuffer);
    }

    return {
        memberData: memberObject,
        memberPictureBuffer: buffer,
        memberPictureType: picture && picture.type,
    };
};
