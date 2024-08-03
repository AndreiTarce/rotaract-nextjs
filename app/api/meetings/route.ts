import { MeetingInteractor } from '@/interactors/meetingInteractor';
import connectMongoDB from '@/lib/mongodb';
import { MeetingRepository } from '@/repositories/meetingRepository';
import { validateMeetingFormData } from '@/schemas/meetingSchema';
import { createMeetingWithPresentMembers } from '@/use-cases/meetings/createMeetingWithPresentMembers';
import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from '../utils/error-handler';
import { ValidationError } from '../utils/errors';

const meetingInteractor = new MeetingInteractor(new MeetingRepository());

export async function GET(request: NextRequest) {
    try {
        await connectMongoDB();

        const { dates, type, sort } = parseGetMeetingSearchParams(
            request.nextUrl.searchParams
        );

        const meetings = await meetingInteractor.getMeetingsWithQuery(
            dates,
            type,
            sort
        );

        return NextResponse.json(
            { results: meetings.length, meetings: meetings },
            { status: 200 }
        );
    } catch (error) {
        return errorHandler(error);
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectMongoDB();

        const meeting = await request.json();

        if (!meeting) {
            throw new ValidationError('Meeting is required');
        }

        validateMeetingFormData(meeting);

        const createdMeeting = await createMeetingWithPresentMembers(meeting);

        return NextResponse.json(createdMeeting, { status: 201 });
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

        await meetingInteractor.deleteMeeting(id);

        return new NextResponse(null, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
}

const parseGetMeetingSearchParams = (searchParams: URLSearchParams) => {
    const type = searchParams.get('type');
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');
    const sort = searchParams.get('sort') as 'asc' | 'desc';
    const dates: { startDate?: Date; endDate?: Date } = {};
    const query: { dates?: typeof dates; type?: string; sort?: typeof sort } =
        {};

    if (startDate) {
        dates.startDate = new Date(startDate);
    }

    if (endDate) {
        dates.endDate = new Date(endDate);
    }

    query.dates = dates;

    if (type) {
        query.type = type;
    }

    if (sort) {
        query.sort = sort;
    }

    return query;
};
