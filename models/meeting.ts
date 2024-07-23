import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';
import { IMemberDocument } from '../interfaces/member/IMember';
import { memberSchema } from './member';

export interface IMeeting {
    _id: ObjectId;
    type: string;
    start_date: Date;
    end_date: Date;
    location: string;
    minuteAuthor: string;
    highlights: string;
    minuteUrl: string;
    duration: number;
    presentMembers: IMemberDocument[];
    absentMembers: IMemberDocument[];
}

const meetingSchema = new Schema<IMeeting>(
    {
        type: String,
        start_date: Date,
        end_date: Date,
        location: String,
        minuteAuthor: String,
        minuteUrl: String,
        duration: Number,
        highlights: String,
        absentMembers: [memberSchema],
        presentMembers: [memberSchema],
    },
    {
        timestamps: true,
    }
);

const Meeting =
    mongoose.models.Meeting || mongoose.model('Meeting', meetingSchema);

export default Meeting;
