import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'

export interface IMemberLinks {
    facebook: string
    linkedin: string
    instagram: string
    tiktok: string
}

export interface IMember {
    _id: ObjectId
    id: number
    first_name: string
    last_name: string
    picture: string
    description: string
    role: string
    urls: IMemberLinks
    start_mandate: number
    email: string
    status: string
}

const SectionSchema = new Schema<IMemberLinks>({
    facebook: { type: String, required: false },
    linkedin: { type: String, required: false },
    instagram: { type: String, required: false },
    tiktok: { type: String, required: false },
})

export const memberSchema = new Schema<IMember>(
    {
        id: ObjectId,
        first_name: String,
        last_name: String,
        picture: String,
        description: String,
        role: String,
        urls: SectionSchema,
        start_mandate: Number,
        email: String,
        status: String,
    },
    {
        timestamps: true,
    }
)

const Member = mongoose.models.Member || mongoose.model('Member', memberSchema)

export default Member
