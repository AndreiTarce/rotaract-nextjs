import {
    IMeeting,
    IMeetingDocument,
    IMeetingMember,
    IMeetingMemberDocument,
} from '@/interfaces/meeting/IMeeting';

export interface MeetingDto
    extends Omit<IMeeting, 'presentMembers' | 'absentMembers'> {
    id: string;
    presentMembers: MeetingMemberDto[];
    absentMembers: MeetingMemberDto[];
}

export interface MeetingMemberDto extends IMeetingMember {
    id: string;
}

export function toMeetingDto(
    meeting: IMeetingDocument | MeetingDto
): MeetingDto {
    return {
        id: meeting.id,
        type: meeting.type,
        start_date: meeting.start_date,
        location: meeting.location,
        minuteAuthor: meeting.minuteAuthor,
        minuteAuthorId: meeting.minuteAuthorId,
        highlights: meeting.highlights,
        minuteUrl: meeting.minuteUrl,
        duration: meeting.duration,
        presentMembers: meeting.presentMembers.map((member) =>
            toMeetingMemberDto(member)
        ),
        absentMembers: meeting.absentMembers.map((member) =>
            toMeetingMemberDto(member)
        ),
    };
}

export function toMeetingMemberDto(
    member: IMeetingMemberDocument | MeetingMemberDto
): MeetingMemberDto {
    return {
        id: member.id,
        first_name: member.first_name,
        last_name: member.last_name,
        picture: member.picture,
    };
}
