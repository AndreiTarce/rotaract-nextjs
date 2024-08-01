import { MeetingMemberDto } from '@/dtos/meeting.dto';
import { Document } from 'mongoose';

export interface IMeeting {
    type: string;
    start_date: Date;
    location: string;
    minuteAuthor: string;
    minuteAuthorId: string;
    highlights: string;
    minuteUrl: string;
    duration: number;
    presentMembers: MeetingMemberDto[];
    absentMembers: MeetingMemberDto[];
}

export interface IMeetingMember {
    first_name: string;
    last_name: string;
    picture: string;
}

export interface IMeetingDocument
    extends Omit<IMeeting, 'presentMembers' | 'absentMembers'>,
        Document {
    presentMembers: IMeetingMemberDocument[] | MeetingMemberDto[];
    absentMembers: IMeetingMemberDocument[] | MeetingMemberDto[];
}

export interface IMeetingMemberDocument extends IMeetingMember, Document {}
