import mongoose, { Schema } from "mongoose";

export interface IMemberLinks {
    facebook: string;
    linkedin: string;
}

export interface IMember {
    _id: number,
    id: number,
    first_name: string,
    last_name: string,
    picture: string,
    description: string,
    role: string,
    urls: IMemberLinks[];
}

const SectionSchema = new Schema<IMemberLinks>({
    facebook: { type: String, required: false },
    linkedin: { type: String, required: false }
});

const memberSchema = new Schema<IMember>(
    {
        id: Number,
        first_name: String,
        last_name: String,
        picture: String,
        description: String,
        role: String,
        urls: [SectionSchema]
    },
    {
        timestamps: true,
    }
);

const Member = mongoose.models.Member || mongoose.model("Member", memberSchema);

export default Member;