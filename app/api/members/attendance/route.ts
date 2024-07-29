import { getAttendance } from '@/lib/entityService';
import connectMongoDB from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from '../../utils/error-handler';
import { ValidationError } from '../../utils/errors';

export async function GET(request: NextRequest) {
    try {
        await connectMongoDB();
        const memberId = request.nextUrl.searchParams.get('id');

        if (!memberId) {
            throw new ValidationError('Member ID is required');
        }

        const attendance = await getAttendance(memberId);
        return NextResponse.json(attendance);
    } catch (error) {
        return errorHandler(error);
    }
}
