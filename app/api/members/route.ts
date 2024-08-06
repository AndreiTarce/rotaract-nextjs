import { MemberDto } from '@/dtos/member.dto';
import { MemberInteractor } from '@/interactors/memberInteractor';
import connectMongoDB from '@/lib/mongodb';
import { MemberRepository } from '@/repositories/memberRepository';
import { createMemberWithPicture } from '@/use-cases/members/createMemberWithPicture';
import { updateMemberWithPicture } from '@/use-cases/members/updateMemberWithPicture';
import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from '../utils/error-handler';
import { ValidationError } from '../utils/errors';

const memberInteractor = new MemberInteractor(new MemberRepository());

export async function GET(request: NextRequest, response: NextResponse) {
    try {
        await connectMongoDB();

        const roleQuery = request.nextUrl.searchParams.get('role');
        const isBoardQuery =
            request.nextUrl.searchParams.get('is_board') === 'true'
                ? true
                : false;

        if (isBoardQuery || roleQuery) {
            const members = await memberInteractor.getMembersWithQuery({
                isBoard: isBoardQuery,
                role: roleQuery,
            });
            return NextResponse.json(members, { status: 200 });
        }

        const nameSearchQuery = request.nextUrl.searchParams.get('name');
        if (nameSearchQuery) {
            const members =
                await memberInteractor.getMembersByName(nameSearchQuery);
            return NextResponse.json(members, { status: 200 });
        }

        const emailSearchQuery = request.nextUrl.searchParams.get('email');
        if (emailSearchQuery) {
            const member =
                await memberInteractor.getMemberByEmail(emailSearchQuery);
            return NextResponse.json(member || {}, { status: 200 });
        }

        const members = await memberInteractor.getAllMembers();

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

        const member = await createMemberWithPicture(
            memberData,
            memberPictureBuffer,
            memberPictureType
        );

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

        const member = await updateMemberWithPicture(
            memberData,
            memberPictureBuffer,
            memberPictureType
        );

        return NextResponse.json(member, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
}

const parseCreateMemberFormData = async (formData: FormData) => {
    const basicInfo = formData.get('member');
    let buffer: Buffer | undefined;
    const picture: File = formData.get('picture_file') as File;

    if (!basicInfo) {
        throw new ValidationError('Member info is required');
    }

    const memberObject: MemberDto = JSON.parse(basicInfo.toString());

    if (picture) {
        const blob = new Blob([picture]);
        const arrayBuffer = await blob.arrayBuffer();
        buffer = Buffer.from(arrayBuffer);
    }

    return {
        memberData: memberObject,
        memberPictureBuffer: buffer,
        memberPictureType: picture?.type,
    };
};
