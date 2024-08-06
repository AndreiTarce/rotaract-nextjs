import { MeetingInteractor } from '@/interactors/meetingInteractor';
import connectMongoDB from '@/lib/mongodb';
import { MeetingRepository } from '@/repositories/meetingRepository';
import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from '../../utils/error-handler';
import { ValidationError } from '../../utils/errors';

const meetingInteractor = new MeetingInteractor(new MeetingRepository());

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

        await meetingInteractor.deleteMeeting(id);

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return errorHandler(error);
    }
}
