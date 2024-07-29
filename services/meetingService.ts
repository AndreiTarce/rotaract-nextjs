import { NotFoundError } from '@/app/api/utils/errors';
import { MeetingDto, toMeetingDto } from '@/dtos/meeting.dto';
import { toMemberDto } from '@/dtos/member.dto';
import { IMeetingDocument } from '@/interfaces/meeting/IMeeting';
import {
    IMeetingRepository,
    MeetingRepositoryFilterQuery,
} from '@/interfaces/meeting/IMeetingRepository';
import { IMemberRepository } from '@/interfaces/member/IMemberRepository';

export class MeetingService {
    private meetingRepository: IMeetingRepository;
    private memberRepository: IMemberRepository;

    constructor(
        meetingRepository: IMeetingRepository,
        memberRepository: IMemberRepository
    ) {
        this.meetingRepository = meetingRepository;
        this.memberRepository = memberRepository;
    }

    async getAllMeetings() {
        const meetings = await this.meetingRepository.findAll();

        return meetings.map((meeting: IMeetingDocument) =>
            toMeetingDto(meeting)
        );
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

        const meetings = await this.meetingRepository.findAllWithQuery(
            query,
            sort
        );

        if (meetings) {
            return meetings.map((meeting: IMeetingDocument) =>
                toMeetingDto(meeting)
            );
        }

        throw new NotFoundError();
    }

    async createMeeting(meeting: Partial<MeetingDto>) {
        const members = await this.memberRepository.findAll();
        const absentMembers = members
            .filter(
                (member) =>
                    !meeting.presentMembers!.some(
                        (presentMember) => presentMember._id === member.id
                    )
            )
            .map((member) => toMemberDto(member));

        const meetingToCreate = { ...meeting, absentMembers };

        const createdMeeting =
            await this.meetingRepository.create(meetingToCreate);

        return toMeetingDto(createdMeeting);
    }

    async deleteMeeting(id: string) {
        await this.meetingRepository.delete(id);
    }
}
