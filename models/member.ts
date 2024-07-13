import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';
import { IMember, IMemberLinks } from '../interfaces/member/IMember';

const SectionSchema = new Schema<IMemberLinks>({
    facebook: { type: String, required: false },
    linkedin: { type: String, required: false },
    instagram: { type: String, required: false },
    tiktok: { type: String, required: false },
    website: { type: String, required: false },
});

export const memberSchema = new Schema<IMember>(
    {
        _id: ObjectId,
        id: Number,
        first_name: String,
        last_name: String,
        picture: String,
        description: String,
        role: String,
        urls: SectionSchema,
        start_mandate: Number,
        email: String,
        status: String,
        isBoard: Boolean,
    },
    {
        timestamps: true,
    }
);

const Member = mongoose.models.Member || mongoose.model('Member', memberSchema);

export default Member;
