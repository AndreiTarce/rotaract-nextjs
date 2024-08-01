import { MemberInteractor } from '@/interactors/memberInteractor';
import connectMongoDB from '@/lib/mongodb';
import { MemberRepository } from '@/repositories/memberRepository';
import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from '../utils/error-handler';
import { ValidationError } from '../utils/errors';

const memberInteractor = new MemberInteractor(new MemberRepository());

export async function GET(request: NextRequest) {
    try {
        await connectMongoDB();

        const emailQuery = request.nextUrl.searchParams.get('email');

        if (!emailQuery) {
            throw new ValidationError('Email is required');
        }

        await memberInteractor.getMemberByEmail(emailQuery);

        return NextResponse.json(true, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
}
