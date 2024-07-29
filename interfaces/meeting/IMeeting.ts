import { MemberDto } from '@/dtos/member.dto';
import { Document } from 'mongoose';

export interface IMeeting {
    type: string;
    start_date: Date;
    location: string;
    minuteAuthor: string;
    highlights: string;
    minuteUrl: string;
    duration: number;
    presentMembers: MemberDto[];
    absentMembers: MemberDto[];
}

export interface IMeetingDocument extends IMeeting, Document {}
