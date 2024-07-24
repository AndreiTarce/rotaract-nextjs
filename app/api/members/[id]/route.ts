import connectMongoDB from '@/lib/mongodb';
import { MemberRepository } from '@/repositories/memberRepository';
import { MemberService } from '@/services/memberService';
import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from '../../utils/error-handler';
import { ValidationError } from '../../utils/errors';

const memberRepository = new MemberRepository();
const memberService = new MemberService(memberRepository);

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

        const member = await memberService.getMemberById(id);
        return NextResponse.json(member, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
}
