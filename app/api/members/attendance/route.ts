import connectMongoDB from '@/lib/mongodb';
import { getMemberAttendance } from '@/use-cases/members/getMemberAttendance';
import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from '../../utils/error-handler';
import { ValidationError } from '../../utils/errors';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        await connectMongoDB();
        const memberId = request.nextUrl.searchParams.get('id');
        const type = request.nextUrl.searchParams.get('type') || undefined;
        const start_date = request.nextUrl.searchParams.get('start_date') || undefined;
        const end_date = request.nextUrl.searchParams.get('end_date') || undefined;

        if (!memberId) {
            throw new ValidationError('Member ID is required');
        }

        const attendance = await getMemberAttendance(memberId, type, start_date, end_date);

        return NextResponse.json(attendance, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
}
