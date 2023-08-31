import mongoose, { Schema } from "mongoose";

export interface IWhitelistedMember {
    _id: number,
    email: string
}

const whitelistedMemberSchema = new Schema<IWhitelistedMember>(
    {
        email: String
    },
    {
        timestamps: true,
    }
);

const WhitelistedMember = mongoose.models.WhitelistedMember || mongoose.model("WhitelistedMember", whitelistedMemberSchema);

export default WhitelistedMember;