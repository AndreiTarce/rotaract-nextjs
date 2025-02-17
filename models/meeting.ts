import { IMeetingDocument } from '@/interfaces/meeting/IMeeting';
import mongoose, { Schema } from 'mongoose';
import { memberSchema } from './member';

const meetingSchema = new Schema<IMeetingDocument>(
    {
        type: String,
        start_date: Date,
        location: String,
        minuteAuthor: String,
        minuteAuthorId: String,
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

const Meeting = mongoose.models.Meeting || mongoose.model('Meeting', meetingSchema);

export default Meeting;
