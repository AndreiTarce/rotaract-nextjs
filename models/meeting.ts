import mongoose, { Schema } from "mongoose";
import { IMember, memberSchema } from "./member";

export interface IMeeting {
    _id: number,
    type: string,
    start_date: Date,
    end_date: Date,
    location: string,
    minuteAuthor: string,
    minuteUrl: string,
    duration: number,
    presentMembers: IMember[],
    absentMembers: IMember[];
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
        absentMembers: [memberSchema],
        presentMembers: [memberSchema]
    },
    {
        timestamps: true,
    }
);

const Meeting = mongoose.models.Meeting || mongoose.model("Meeting", meetingSchema);

export default Meeting;