import mongoose, { Schema } from 'mongoose'
import { memberSchema } from './member'
import { ObjectId } from 'mongodb'
import { IMember } from './interfaces'

export interface IMeeting {
    _id: ObjectId
    type: string
    start_date: Date
    end_date: Date
    location: string
    minuteAuthor: string
    highlights: string
    minuteUrl: string
    duration: number
    presentMembers: IMember[]
    absentMembers: IMember[]
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
)

const Meeting =
    mongoose.models.Meeting || mongoose.model('Meeting', meetingSchema)

export default Meeting
