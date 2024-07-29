import { IMeeting, IMeetingDocument } from '@/interfaces/meeting/IMeeting';
import { Types } from 'mongoose';

export interface MeetingDto extends IMeeting {
    _id: Types.ObjectId;
}

export function toMeetingDto(meeting: IMeetingDocument): MeetingDto {
    return {
        _id: meeting._id,
        type: meeting.type,
        start_date: meeting.start_date,
        location: meeting.location,
        minuteAuthor: meeting.minuteAuthor,
        highlights: meeting.highlights,
        minuteUrl: meeting.minuteUrl,
        duration: meeting.duration,
        presentMembers: meeting.presentMembers,
        absentMembers: meeting.absentMembers,
    };
}
