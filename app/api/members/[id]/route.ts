import { MemberInteractor } from '@/interactors/memberInteractor';
import connectMongoDB from '@/lib/mongodb';
import { MemberRepository } from '@/repositories/memberRepository';
import { deleteMemberWithPicture } from '@/use-cases/members/deleteMemberWithPicture';
import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from '../../utils/error-handler';
import { ValidationError } from '../../utils/errors';

const memberInteractor = new MemberInteractor(new MemberRepository());

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectMongoDB();
        const { id } = params;

        if (!id) {
            throw new ValidationError('ID is required');
        }

        const member = await memberInteractor.getMemberById(id);
        return NextResponse.json(member, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectMongoDB();

        const { id } = params;

        if (!id) {
            throw new ValidationError('ID is required');
        }

        await deleteMemberWithPicture(id);

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return errorHandler(error);
    }
}
