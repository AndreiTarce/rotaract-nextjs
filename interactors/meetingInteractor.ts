import { NotFoundError } from '@/app/api/utils/errors';
import { MeetingDto, toMeetingDto } from '@/dtos/meeting.dto';
import { IPeriod } from '@/interfaces/IPeriod';
import { IMeetingDocument } from '@/interfaces/meeting/IMeeting';
import {
    IMeetingRepository,
    MeetingRepositoryFilterQuery,
} from '@/interfaces/meeting/IMeetingRepository';

export class MeetingInteractor {
    private meetingRepository: IMeetingRepository;

    constructor(meetingRepository: IMeetingRepository) {
        this.meetingRepository = meetingRepository;
    }

    async getAllMeetings() {
        const meetings = await this.meetingRepository.findAll();

        return meetings.map((meeting: IMeetingDocument) => toMeetingDto(meeting));
    }

    async getMeetingsWithQuery(
        dates?: { startDate?: Date; endDate?: Date },
        type?: string,
        sort?: 'asc' | 'desc'
    ) {
        const query: MeetingRepositoryFilterQuery = {};

        if (dates?.startDate) {
            query.start_date = { ...query.start_date, $gte: dates.startDate };
        }

        if (dates?.endDate) {
            query.start_date = { ...query.start_date, $lte: dates.endDate };
        }

        if (type) {
            query.type = type;
        }

        const meetings = await this.meetingRepository.findAllWithQuery(query, sort);

        if (meetings) {
            return meetings.map((meeting: IMeetingDocument) => toMeetingDto(meeting));
        }

        throw new NotFoundError();
    }

    async createMeeting(meeting: MeetingDto) {
        const createdMeeting = await this.meetingRepository.create(meeting);
        return toMeetingDto(createdMeeting);
    }

    async deleteMeeting(id: string) {
        await this.meetingRepository.delete(id);
    }

    async getNumberOfMeetings(type: string, period: IPeriod) {
        return this.meetingRepository.count(type, period);
    }

    async getMemberPresences(memberId: string, type: string, period: IPeriod) {
        const presences = await this.meetingRepository.aggregateMemberPresences(
            memberId,
            type,
            period
        );

        return presences[0]?.totalPresences || 0;
    }
}
